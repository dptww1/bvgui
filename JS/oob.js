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
    var id = BVG.Server.drawCard(side).evalJSON();
    if (id == null) {
        alert("Deck is empty!");
        return;
    }
    activateCard(side + "Hand", id);
}

function dropCard(dropElt, dragElt) {
    dragElt.remove();
    dragElt.setStyle( { left: 0, top: 0 } );
    dropElt.down("ul").appendChild(dragElt);
    if (dropElt.hasClassName("unstacks")) {
        dragElt.select("li").each( function(childElt) { dropCard(dropElt, childElt); } );
    }
}

var activeDropTargets = $A();

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
    var container = $(parent).down("ul");
    var cardNode = BVG.DomUtil.mkCardNode(card);
    new Draggable(cardNode, { revert: "failure", onStart: createDropTargets, onEnd: clearDropTargets } );  // TODO: combine with fn in domLoaded()
    container.appendChild(cardNode);
    syncContainers();
    new Effect.BlindDown(cardNode, { duration: 0.15 } );
    // after DOM element is added into document, it's safe to make tooltip
    if (card.special) {
        new Tooltip(card.id, "SPECIAL: " + card.special);
    }

}

function setupSubtree(parentId, childHash) {
    $H(childHash).keys().each( function(childId) {
        activateCard(parentId, childId);

        if (typeof childHash[childId] == "object") {  // if the key's value is an object, it's a hash of subordinates
            setupSubtree(childId, childHash[childId]);

        } else { // key's value is a number, telling whether the card is at full strength (1) or not (0)

        }
    });
}

function setupGame(game) {
    $$(".oobRoot li").each( function(elt) { elt.remove(); } );
    $H(game).keys().each( function(id) {
        setupSubtree(id, game[id]);
    });

}

function loadGame() {
    var game = BVG.Server.loadGame().evalJSON();
    setupGame(game);
}

function domLoaded() {
  // SplitPane and Droppable interfere with each other...
//  new SplitPane("usaCadre", 16, "usaWest", 16, 16, { active: true } );
//  new SplitPane("usaWest" , 16, "usaEast", 32, 16, { active: true } );

  var game = BVG.Server.newGame().evalJSON();
    setupGame(game);

  $("usaDrawCardLink").href = "javascript:drawCard('usa')";
  $("csaDrawCardLink").href = "javascript:drawCard('csa')";

  new Proto.Menu({
      selector: ".inf",
      className: "menu desktop",
      menuItems: [
          { name: '[-] Deplete' },
          { name: '[+] Restore' }
      ]
  });
}


