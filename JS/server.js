if (!BVG) { BVG = {}; }

/*
 * Interface to game server.  This is a client-side implementation mock for UI development
 * purposes; eventually it will be swapped out for a implementation that uses true HTTP
 * calls in its methods.
 *
 * The methods here can use regular JS parameters because they are responsible for creating
 * the underlying HTTP requests.  The return values from these methods will be JSON hashes.
 * The keys and values in those hashes will be specific to the method call, but all returned
 * hashes will include the following:
 *
 * key: "type"
 * value: "moveCard", "newGame", "endTurn", etc
 *
 * key: "gameEvent"
 * value: {
 *     side:    "usa" or "csa",
 *     id:      1..n
 *     canUndo: true or false
 * }
 */
BVG.Server = function() {
    var drawPile = {
        usa: [],
        csa: []
    };

    var findById = function(id) {
        return BVG.Lookup.findCardById(id);
    };

    var idOf = function(elt) { return elt.id; };

    var markInPlay = function(inPlayHash, cardHash) {
        cardHash.keys().each( function(id) {
            inPlayHash[id] = 1;
            if (typeof cardHash.get(id) === "object") {
                markInPlay(inPlayHash, cardHash.get(id));
            }
            // can ignore the "else" case of the card having no subordinates
        });
    };

    var initDrawPile = function(gameState) {
        // Figure out which cards are already in play, so don't belong in the draw pile
        var inPlay = {};
        markInPlay(inPlay, gameState);

        $A(["csa", "usa"]).each( function(side) {
            drawPile[side] = [];

            $H(BVG.Lookup.Cards[side]).keys().each( function (id) {
                if (!inPlay[id]) {
                    drawPile[side].push(id);
                }
            });

            // TODO: This works for the historical game; should shuffle for a random game
            drawPile[side].sort( function(a, b) { return a < b ? -1 : a === b ? 0 : 1; });
            drawPile[side] = drawPile[side].reverse();
        });
    };

    return {
        drawCard: function(side) { return Object.toJSON(drawPile[side].pop()); },

        loadGame: function() {
            var gameState = $H({
                usaHand: $H({ U001: 1, U002: 1, U003: 1, U004: 1, U005: 1 }),
                usaWest: $H({
                    U019: $H({
                        U067: $H({ U020: 1, U050: 0 }),
                        U056: $H({ U039: 1, U049: 1 }),
                        U021: 1
                    }),
                    U062: $H({
                        U053: 1,
                        U063: $H({ U009: 1 }),
                        U008: $H({ U024: 0, U037: 1 })
                    })
                }),
                csaHand: $H({ C001: 1, C002: 1, C003: 1, C004: 1, C013: 1, C045: 1 }),
                csaWest: $H({
                    C038: $H({
                        C058: $H({ C028: 1 }),
                        C039: $H({ C042: 1 }),
                        C018: $H({ C049: 1 }),
                        C044: 1
                    }),
                    C032: $H({ C059: 1 })
                })
            });

            initDrawPile(gameState);
            return Object.toJSON(gameState);
        },

        newGame: function() {
            var gameState = $H({
                usaHand: $H({ U001: 1, U002: 1, U003: 1, U004: 1, U005: 1 }),
                csaHand: $H({ C001: 1, C002: 1, C003: 1, C004: 1 })
            });

            initDrawPile(gameState);

            return Object.toJSON(gameState);
        },

        getDropTargets: function(eltId) {
            var side = eltId.charAt(0) === "U" ? "usa" : "csa";

            var elt = $(eltId);  // TODO: wrap element, shouldn't be using DOM here

            var ids = $A();

            var card = findById(eltId);
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
