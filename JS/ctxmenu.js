/*
 * This isn't generic context menu code, but rather BvG-specific context menu handling.
 */
if (BVG == undefined) {
    var BVG = {};
}

BVG.CtxMenu = function() {
    var unitCtxMenu = [
        {
            Flip :  function(menuItem, menu) {
                BVG.State.flip(this.id);
                computeRollupStrength(findTopLevelLeader(this));
            }
        },

        $.contextMenu.separator,

        {
            Deplete : function(menuItem, menu) {
                BVG.State.deplete(this.id);
                computeRollupStrength(findTopLevelLeader(this));
            }
        },

        {
            Restore : function(menuItem, menu) {
                BVG.State.restore(this.id);
                computeRollupStrength(findTopLevelLeader(this));
            }
        }
    ];

    return {
        addTo: function(cardElt) {
            $(cardElt).contextMenu(unitCtxMenu, {

                beforeShow: function() {
                    var elt = this.target;

                    if (elt === undefined) {
                        return false;
                    }
                    if (elt.nodeName.toUpperCase() !== "LI") {  // event target might be child of the card node
                        elt = $(elt).parent().closest("li");
                    }

                    var card = BVG.Lookup.findCardById(elt.id);

                    // This array omits the separator, so items[1] == Deplete
                    var items = $(this.menu).find('.context-menu-item');

                    // Only inf/cav/ldr are flippable, and then only in west/east/cadre (TODO)
                    $(items[0]).toggleClass("context-menu-item-disabled", !_.include(["inf", "cav", "ldr"], card.type));

                    // Only undepleted units in an active area with a depleted strength are depletable
                    $(items[1]).toggleClass("context-menu-item-disabled", !(typeof(card.depstr) === "number" &&
                                                                            !BVG.State.isDepleted(elt.id) &&
                                                                            $(elt).parent().closest("div." + card.side + "Active") !== undefined));

                    // Only depleted units are restorable
                    $(items[2]).toggleClass("context-menu-item-disabled", !BVG.State.isDepleted(elt.id));

                    return true;
                }
            });
        }
    };
}();

//  new Proto.Menu({  TODO
//      selector: ["#usa", "#csa"], TODO
//      className: "menu desktop",  TODO
//      beforeShow: function(e) {   TODO
//      }
//  });
