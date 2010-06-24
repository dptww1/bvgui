if (!BVG) { BVG = {}; }

BVG.Server = function() {
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

            var card = findCard(eltId);
            switch (card.type) {
            case "inf":
                // Generic containers
                ids = ids.concat($A(["Hand", "West", "East", "Cadre"]).collect( function(str) { return side + str; } ));

                // Infantry can go to any friendly active leader
                ids = ids.concat($$("." + side + "Active .ldr").collect(idOf));
                break;

            case "cav":
                // Generic containers
                ids = ids.concat($A(["Hand", "West", "East", "Cadre"]).collect( function(str) { return side + str; } ));

                // Cavalry can go to any active top-level leader
                ids = ids.concat($$("." + side + "Active > .oobRoot > .ldr").collect(idOf));

                // Or to a top-level cavalry
                ids = ids.concat($$("." + side + "Active > .oobRoot > .cav").collect(idOf));
                break;

            case "ldr":
                // Generic containers
                ids = ids.concat($A(["Hand", "West", "East", "Cadre"]).collect( function(str) { return side + str; } ));

                // WONTSUB leaders need no further processing, as they must be top-level.
                // But if the leader will subordinate, then can go to any friendly active top-level leader
                if (!card.wontsub) {
                    ids = ids.concat($$("." + side + "Active > .oobRoot > .ldr_oc").collect(idOf));
                }

                break;

            case "nav":
                // Generic containers
                ids = ids.concat($A(["usaHand", "usaWest", "usaEast"]));  // includes hand Just In Case
                break;

            case "enigma":
                break;
            }

            return ids;
        }
    };
}();
