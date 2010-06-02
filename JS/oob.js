var draggable;

function domLoaded() {
  $A(["cadre", "usaWest"].concat($$(".holdsInf", ".holdsCav", ".holdsLdr"))).each(function(eltName) {
      Droppables.add($(eltName), {
          constraint:  false,
          dropOnEmpty: true,
          hoverclass:  "okToDrop",
          onDrop:      function(dragElt, dropElt, evtId) {
              dragElt.remove();
              dragElt.setStyle( { left: 0, top: 0 } );
              dropElt.down("ul").appendChild(dragElt);
          }
      });
  });


  $$(".ldr", ".inf", ".cav").each( function(elt) {
      new Draggable(elt.id, { revert: "failure" } );
  });

  new Proto.Menu({
      selector: ".inf",
      className: "menu desktop",
      menuItems: [
          { name: 'Deplete' },
          { name: 'Restore' }
      ]
  });
}

