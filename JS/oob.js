function drawCard(side) {
    var card = Server.drawCard(side);
    if (card == null) {
        alert("Deck is empty!");
        return;
    }
    var container = $(side + "Hand").down("ul");
    var cardNode = DomUtil.mkCardNode(card);
    new Draggable(cardNode, { revert: "failure" } );
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

function domLoaded() {
  // SplitPane and Droppable interfere with each other...
//  new SplitPane("usaCadre", 16, "usaWest", 16, 16, { active: true } );
//  new SplitPane("usaWest" , 16, "usaEast", 32, 16, { active: true } );

  $A(["usaHand", "usaWest", "usaEast", "usaCadre"].concat($$(".holdsInf", ".holdsCav", ".holdsLdr"))).each(function(eltName) {
      Droppables.add($(eltName), {
          constraint:  false,
          dropOnEmpty: true,
          hoverclass:  "okToDrop",
          onDrop:      function(dragElt, dropElt, evtId) { dropCard(dropElt, dragElt); }
      });
  });

  $$(".ldr", ".inf", ".cav").each( function(elt) {
      new Draggable(elt.id, { revert: "failure" } );
  });

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
        cav: new Template("<img src='Images/cav_#{side}.png' width='18' height='12' border='0'> #{label} C#{str}"),
        inf: new Template("<img src='Images/inf_#{side}.png' width='18' height='12' border='0'> #{label} I#{str}"),
        ldr: new Template("<img src='Images/ldr_#{side}.png' width='18' height='12' border='0'> #{label} L#{str}")
    };

    return {
        mkCardNode : function(card) {
            var t = card.type;
            var n = new Element("li", { "class": _classTemplate.evaluate(card), id: card.id, style: "display:none" });
            n.update(_labelTemplates[t].evaluate(card));
            return n;
        }
    };
}();

var Server = function() {
    var usaDeck = [
        { type: "ldr", side: "usa", id: "U017", str: 1, label: "Buell" },
        { type: "inf", side: "usa", id: "U040", str: 3, label: "X Corps" }
    ];
    var csaDeck = [
        { type: "cav", side: "csa", id: "C048", str: 1, label: "Van Dorn" }
    ];

    return {
        drawCard : function(side) { return side == "usa" ? usaDeck.pop() : csaDeck.pop(); }
    };
}();
