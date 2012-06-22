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
    var json = BVG.Server.drawCard(side).evalJSON();
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
    var top = (startElt != null && startElt.hasClassName("ldr")) ? startElt : null;
    for (var elt = startElt; elt != null; elt = elt.up("li")) {
        if (elt.hasClassName("ldr")) {
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

    if (dropElt.hasClassName("unstacks")) {
        dragElt.select("li").each( function(childElt) { dropCard(dropElt, childElt); } );
    }

    if (dropElt.hasClassName("undepletes") && BVG.State.isDepleted(dragElt.id)) {
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

    if (!elt.hasClassName("ldr")) {
        debugger;
    }

    var cs = parseInt(elt.down(".strength").textContent, 10);  // TODO: textContent vs innerText vs innerHTML
    var initCs = cs;
    elt.select("li").each( function(childElt) {
        var card = BVG.Lookup.findCardById(childElt.id);
        cs += BVG.State.isFlipped(childElt.id) ? 0 : BVG.State.isDepleted(childElt.id) ? card.depstr : card.str;
    });
    elt.down(".rollupStrength").update(cs > initCs ? "(" + cs + ")" : "");
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
    BVG.DomUtil.activateToolTip(card);
    computeRollupStrength(findTopLevelLeader(cardNode));
}

function setupSubtree(parentId, childHash) {
    $H(childHash).keys().each( function(childId) {
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
      selector: ["#usa", "#csa"],
      className: "menu desktop",
      beforeShow: function(e) {
          var elt = e.element();
          if (elt.tagName !== "LI") {  // event target might be child of the card node
              elt = elt.up("li");
          }

          // Turn off all menus, until proven otherwise
          this.menuItems.each( function(item) {
              if (!item.separator) {
                  BVG.DomUtil.setMenuItemState($$("li > a[title='" + item.name + "']")[0], false);
              }
          });

          if (elt === undefined) {
              return;
          }

          var card = BVG.Lookup.findCardById(elt.id);

          // Only inf/cav/ldr are flippable, and then only in west/east/cadre (TODO)
          BVG.DomUtil.setMenuItemState($$("li > a[title='Flip']")[0], $A(["inf", "cav", "ldr"]).include(card.type));

          // Only undepleted units in an active area with a depleted strength are depletable
          BVG.DomUtil.setMenuItemState($$("li > a[title='Deplete']")[0],
                                       typeof(card.depstr) === "number" &&
                                       !BVG.State.isDepleted(elt.id) &&
                                       elt.up("div." + card.side + "Active") !== undefined);

          // Only depleted units are restorable
          BVG.DomUtil.setMenuItemState($$("li > a[title='Restore']")[0], BVG.State.isDepleted(elt.id));
      },
      menuItems: $A([
          {
              name: 'Flip',
              callback: function(ev) {
                  var elt = BVG.DomUtil.findCardElt(ev);
                  BVG.State.flip(elt.id);
                  computeRollupStrength(findTopLevelLeader(elt));
              }
          },
          { separator: true },
          {
              name: 'Deplete',
              callback: function(ev) {
                  var elt = BVG.DomUtil.findCardElt(ev);
                  BVG.State.deplete(elt.id);
                  computeRollupStrength(findTopLevelLeader(elt));
              }
          },
          {
              name: 'Restore',
              callback: function(ev) {
                  var elt = BVG.DomUtil.findCardElt(ev);
                  BVG.State.restore(elt.id);
                  computeRollupStrength(findTopLevelLeader(elt));
              }
          }
      ])
  });
}


