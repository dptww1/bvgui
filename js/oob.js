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

function dropCard(dropEltId, dragEltId) {
    //console.log("dropCard(" + dropEltId + ", " + dragEltId + ")");

    // Remember the old top-level leader
    var oldParentElt = findTopLevelLeader("#" + dragEltId);

    $("#" + dragEltId).css( { left: 0, top: 0 } );
    $($("#" + dropEltId).find("ul")[0]).append($("#" + dragEltId));

    if ($("#" + dropEltId).hasClass("unstacks")) {
        $("#" + dragEltId).find("li").each( function(idx, childElt) { dropCard(dropEltId, childElt.id); } );
    }

    if ($("#" + dropEltId).hasClass("undepletes") && BVG.State.isDepleted(dragEltId)) {
        BVG.State.restore(dragEltId);
    }

    var newParentElt = findTopLevelLeader("#" + dragEltId);

    // Recompute the old parent element, unless it's the dragged element itself
    if (oldParentElt.id !== dragEltId) {
        computeRollupStrength(oldParentElt);
    }

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

function makeDraggable(card) {
    $("#" + card.id).draggable( {
        revert:         "invalid",
        revertDuration: 250,
        start:          createDropTargets,
        stop:           clearDropTargets
    } );
}

function createDropTargets(event, ui) {
    var ids = BVG.Server.getDropTargets(event.target.id);
    _.each(ids, function(id) {
        $("#" + id).droppable( {
            drop:       function(event, ui) { dropCard(event.target.id, ui.draggable[0].id); },
            greedy:     true,
            hoverClass: "okToDrop"
        } );

        activeDropTargets.push(id);
    });
}

function clearDropTargets(elt, event) {
    _.each(activeDropTargets, function(id) { $($("#" + id)[0]).droppable("destroy"); } );
    activeDropTargets = [];
}

function activateCard(parent, id) {
    var card = BVG.Lookup.findCardById(id);
    var container = $("#" + parent).find("ul")[0];
    var cardNode = BVG.DomUtil.mkCardNode(card);
    $(container).append(cardNode);
    syncContainers();
    $("#" + id).slideDown();
    // after DOM element is added into document, it's safe to make tooltip
    BVG.DomUtil.activateToolTip(card);
    makeDraggable(card);
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


