if (BVG == undefined) {
    var BVG = {};
}

function syncContainers() {
    // Heights fails because adding a new card increases the height of the xxxHand element,
    // even if no expansion is necessary. TODO: workaround
/*
    // Heights
    $A(["usa", "csa"]).each( function(side) {
        var maxHeight = 0;
        $A(["Hand", "West", "East", "Cadre"]).each( function(column) {
            maxHeight = Math.max(maxHeight, $(side + column).getHeight());
        });
        $A(["Hand", "West", "East", "Cadre"]).each( function(column) {
            $(side + column).setStyle({ height: maxHeight + "px"});
        });
    });
*/

    // Same problem with widths
/*
    // Widths
    $A(["Hand", "West", "East", "Cadre"]).each( function(column) {
        var maxWidth = 0;
        $A(["usa", "csa"]).each( function(side) {
            maxWidth = Math.max(maxWidth, $(side + column).getWidth());
        });

        $A(["usa", "csa"]).each( function(side) {
            $(side + column).setStyle({ width: maxWidth + "px"});
        });
    });
*/
}

function drawCard(side) {
    var json = JSON.parse(BVG.Server.drawCard(side));
    if (json.type == "drawCard") {
        var id = json.cardId;
        if (id == null) {
            alert("Deck is empty!");
            return;
        }

        activateCard(side + "Hand", id);

    } else {
        debugger;
    }
}

function findTopLevelLeader(startElt) {
    var top = (startElt != null && $(startElt).hasClass("ldr")) ? startElt : null;
    for (var elt = startElt; elt; elt = $(elt).parents("li")[0]) {
        if ($(elt).hasClass("ldr")) {
            top = elt;
        }
    }
    return top;
}

function dropCard(dropElt, dragElt) {
    // Remember the old top-level leader
    var oldParentElt = findTopLevelLeader(dragElt);

    dragElt.remove();

    // Recompute the old parent element, unless it's the dragged element itself
    if (oldParentElt !== dragElt) {
        computeRollupStrength(oldParentElt);
    }

    dragElt.setStyle( { left: 0, top: 0 } );
    dropElt.down("ul").appendChild(dragElt);

    if ($(dropElt).hasClass("unstacks")) {
        dragElt.select("li").each( function(childElt) { dropCard(dropElt, childElt); } );
    }

    if ($(dropElt).hasClass("undepletes") && BVG.State.isDepleted(dragElt.id)) {
        BVG.State.restore(dragElt.id);
    }

    var newParentElt = findTopLevelLeader(dragElt);

    // Recompute the strength of the top level leader incorporating the dragged element, even
    // if the latter *is* a top level leader.
    computeRollupStrength(newParentElt);
}

function computeRollupStrength(elt) {
    if (elt == null) {
        return;
    }

    if (!$(elt).hasClass("ldr")) {
        debugger;
    }

    var cs = parseInt($(elt).find(".strength")[0].textContent, 10);  // TODO: textContent vs innerText vs innerHTML
    var initCs = cs;
    $(elt).find("li").each( function(idx, childElt) {
        var card = BVG.Lookup.findCardById(childElt.id);
        cs += BVG.State.isFlipped(childElt.id) ? 0 : BVG.State.isDepleted(childElt.id) ? card.depstr : card.str;
    });
    $($(elt).find(".rollupStrength")[0]).text(cs > initCs ? "(" + cs + ")" : "");
}

var activeDropTargets = [];

function createDropTargets(o, event) {
    var ids = $A(BVG.Server.getDropTargets(o.element.id));
    ids.each( function(id) {
        var elt = $(id);
        Droppables.add(elt, {
          constraint:  false,
          dropOnEmpty: true,
          hoverclass:  "okToDrop",
          onDrop:      function(dragElt, dropElt, evtId) { dropCard(dropElt, dragElt); }
        });
        activeDropTargets.push(elt);
    });
}

function clearDropTargets(elt, event) {
    activeDropTargets.each( function(elt) { Droppables.remove(elt); } );
    activeDropTargets.clear();
}

function activateCard(parent, id) {
    var card = BVG.Lookup.findCardById(id);
    var container = $("#" + parent).find("ul")[0];
    var cardNode = BVG.DomUtil.mkCardNode(card);
//TODO    new Draggable(cardNode, { revert: "failure", onStart: createDropTargets, onEnd: clearDropTargets } );  // TODO: combine with fn in domLoaded()
    $(container).append(cardNode);
    syncContainers();
    $("#" + id).show();
    // after DOM element is added into document, it's safe to make tooltip
    BVG.DomUtil.activateToolTip(card);
    BVG.CtxMenu.addTo("#" + card.id);
    computeRollupStrength(findTopLevelLeader($(container).children()[0]));
}

function setupSubtree(parentId, childHash) {
    _.each(_.keys(childHash), function(childId) {
        activateCard(parentId, childId);

        if (typeof childHash[childId] === "object") {  // if the key's value is an object, it's a hash of subordinates
            setupSubtree(childId, childHash[childId]);

        } else { // key's value is a number, telling whether the card is at full strength (1) or not (0)
            if (parseInt(childHash[childId], 10) !== 1) {
                BVG.State.deplete(childId);
            }
        }
    });
}

function setupGame(game) {
    BVG.State.initialize();

    $(".oobRoot li").each( function(idx, elt) { $(elt).remove(); } );
    _.each(_.keys(game), function(id) {
        setupSubtree(id, game[id]);
    });
}

function loadGame() {
    var game = JSON.parse(BVG.Server.loadGame());
    setupGame(game);
}

function domLoaded() {
  // SplitPane and Droppable interfere with each other...
//  new SplitPane("usaCadre", 16, "usaWest", 16, 16, { active: true } );
//  new SplitPane("usaWest" , 16, "usaEast", 32, 16, { active: true } );

    var game = JSON.parse(BVG.Server.newGame());
    setupGame(game);

    $("#usaDrawCardLink").attr("href", "javascript:drawCard('usa')");
    $("#csaDrawCardLink").attr("href", "javascript:drawCard('csa')");
}


