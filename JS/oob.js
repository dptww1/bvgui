var draggable;

function domLoaded() {
  $A(["cadre", "usaWest"]).each(function(eltName) {
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


  $$(".inf", ".cav").each( function(elt) {
      new Draggable(elt.id, { revert: "failure" } );
  });
}

