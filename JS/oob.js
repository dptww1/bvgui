var draggable;

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
      new Draggable(elt.id, { revert: "failure", zindex: 1500 } );
  });

  new Proto.Menu({
      selector: ".inf",
      className: "menu desktop",
      menuItems: [
          { name: '[-] Deplete' },
          { name: '[+] Restore' }
      ]
  });
}

