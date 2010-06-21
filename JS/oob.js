function drawCard(side) {
    var card = Server.drawCard(side).evalJSON();
    if (card == null) {
        alert("Deck is empty!");
        return;
    }
    var container = $(side + "Hand").down("ul");
    var cardNode = DomUtil.mkCardNode(card);
    new Draggable(cardNode, { revert: "failure", onStart: createDropTargets, onEnd: clearDropTargets } );  // TODO: combine with fn in domLoaded()
    container.appendChild(cardNode);
    new Effect.BlindDown(cardNode, { duration: 0.5 } );
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
    var ids = $A(Server.getDropTargets(o.element.id));
    ids.each( function(id) {
        var elt = $(id);
        Droppables.add(elt, {
          constraint:  false,
          dropOnEmpty: true,
          hoverclass:  "okToDrop",
          onDrop:      function(dragElt, dropElt, evtId) { dropCard(dropElt, dragElt); }
        });
    });
}

function clearDropTargets(elt, event) {
    activeDropTargets.each( function(elt) { Droppables.remove(elt); } );
    activeDropTargets.clear();
}

function domLoaded() {
  // SplitPane and Droppable interfere with each other...
//  new SplitPane("usaCadre", 16, "usaWest", 16, 16, { active: true } );
//  new SplitPane("usaWest" , 16, "usaEast", 32, 16, { active: true } );

  $$(".ldr", ".inf", ".cav").each( function(elt) {
      new Draggable(elt.id, {
          revert: "failure",
          onStart: createDropTargets,
          onEnd:   clearDropTargets
      });
  });

  Server.newGame();

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

var DomUtil = function() {
    var _classTemplate = new Template("#{side} #{type}");

    var _labelTemplates = {
        cav:     new Template("<img src='Images/cav_#{side}.png' width='18' height='12' border='0'> #{name} C#{str}"),
        inf:     new Template("<img src='Images/inf_#{side}.png' width='18' height='12' border='0'> #{name} I#{str}"),
        ldr_oc:  new Template("<img src='Images/ldr_#{side}_oc.png' width='18' height='12' border='0'> #{name} L#{str}<ul></ul>"),
        ldr_sub: new Template("<img src='Images/ldr_#{side}_sub.png' width='18' height='12' border='0'> #{name} L#{str}<ul></ul>"),
        nav:     new Template("#{name} N#{str}"),
        map:     new Template("#{name}"),
        enigma:  new Template("<img src='Images/enigma_#{side}.png' width='18 height='12' border='0'> #{name}")
    };

    return {
        mkCardNode : function(card) {
            var t = card.type;
            if (t === "ldr") {
                t = card.acap ? "ldr_oc" : "ldr_sub";
            }
            var n = new Element("li", { "class": _classTemplate.evaluate(card), id: card.id, style: "display:none" });
            n.update(_labelTemplates[t].evaluate(card));
            return n;
        }
    };
}();

var Server = function() {
    var usaCards = [];
    var csaCards = [];

    var findCard = function(id) {
        return BVGLOOKUP.Cards[id.charAt(0) == "U" ? "USA" : "CSA"][id];
    };

    var idOf = function(elt) { return elt.id; };

    return {
        drawCard: function(side) { return Object.toJSON(side == "usa" ? usaCards.pop() : csaCards.pop()); },

        newGame: function() {
            // Put cards refs in the draw decks.  Don't add cards which are already on the display
            $H(BVGLOOKUP.Cards.USA).keys().each( function(id) {
                if ($(id) == null) {
                    usaCards.push(BVGLOOKUP.Cards.USA[id]);
                }
            });

            $H(BVGLOOKUP.Cards.CSA).keys().each( function(id) {
                if ($(id) == null) {
                    csaCards.push(BVGLOOKUP.Cards.CSA[id]);
                }
            });

            [usaCards, csaCards].each( function(deck) {
                deck.sort( function(a, b) { return a < b ? 1 : a === b ? 0 : -1; });
            });

            usaCards = usaCards.reverse();
            csaCards = csaCards.reverse();
        },

        getDropTargets: function(eltId) {
            var side = eltId.charAt(0) === "U" ? "usa" : "csa";

            var elt = $(eltId);  // TODO: wrap element, shouldn't be using DOM here

            var ids = $A();

            // Generic Containers (TODO: logic is not applicable for Enigmas, Navy!back)
            ids = ids.concat($A(["Hand", "West", "East", "Cadre"]).collect( function(str) { return side + str; } ));

            switch (findCard(eltId).type) {
            case "inf":
                // Infantry can go to any friendly active leader
                ids = ids.concat($$("." + side + "Active .ldr").collect(idOf));
                break;

            case "cav":
                // Cavalry can go to any active top-level leader
                ids = ids.concat($$("." + side + "Active > .oobRoot > .ldr").collect(idOf));

                // Or to a top-level cavalry
                ids = ids.concat($$("." + side + "Active > .oobRoot > .cav").collect(idOf));
                break;

            case "ldr":
                break;

            case "nav":
                break;

            case "enigma":
                break;
            }

            return ids;
        }
    };
}();
