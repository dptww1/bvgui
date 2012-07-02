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
    var gameEventId = 1;
    var drawPile = {
        usa: [],
        csa: []
    };

    var findById = function(id) {
        return BVG.Lookup.findCardById(id);
    };

    var idOf = function(elt) { return elt.id; };

    var markInPlay = function(inPlayHash, cardHash) {
        _.each(_.keys(cardHash), function(id) {
            inPlayHash[id] = 1;
            if (typeof cardHash[id] === "object") {
                markInPlay(inPlayHash, cardHash[id]);
            }
            // can ignore the "else" case of the card having no subordinates
        });
    };

    var initGame = function(gameState) {
        gameEventId = 1;

        // Figure out which cards are already in play, so don't belong in the draw pile
        var inPlay = {};
        markInPlay(inPlay, gameState);

        _.each(["csa", "usa"], function(side) {
            drawPile[side] = [];

            _.each(_.keys(BVG.Lookup.Cards[side]), function (id) {
                if (!inPlay[id]) {
                    drawPile[side].push(id);
                };
            });

            // TODO: This works for the historical game; should shuffle for a random game
            drawPile[side].sort( function(a, b) { return a < b ? -1 : a === b ? 0 : 1; });
            drawPile[side] = drawPile[side].reverse();
        });
    };

    return {
        drawCard: function(side) {
            return JSON.stringify({
                type:      "drawCard",
                cardId:    drawPile[side].pop(),
                gameEvent: {
                    side:    side,
                    id:      gameEventId++,
                    canUndo: true
                }
            });
        },

        moveCard: function(side, cardId, fromId, toID, canUndo) {

        },

        loadGame: function() {
            var gameState = {
                usaHand: { U001: 1, U002: 1, U003: 1, U004: 1, U005: 1 },
                usaWest: {
                    U019: {
                        U067: { U020: 1, U050: 0 },
                        U056: { U039: 1, U049: 1 },
                        U021: 1
                    },
                    U062: {
                        U053: 1,
                        U063: { U009: 1 },
                        U008: { U024: 0, U037: 1 }
                    }
                },
                csaHand: { C001: 1, C002: 1, C003: 1, C004: 1, C013: 1, C045: 1 },
                csaWest: {
                    C038: {
                        C058: { C028: 1 },
                        C039: { C042: 1 },
                        C018: { C049: 1 },
                        C044: 1
                    },
                    C032: { C059: 1 }
                }
            };

            initGame(gameState);
            return JSON.stringify(gameState);
        },

        newGame: function() {
            var gameState = {
                usaHand: { U001: 1, U002: 1, U003: 1, U004: 1, U005: 1 },
                csaHand: { C001: 1, C002: 1, C003: 1, C004: 1 }
            };

            initGame(gameState);

            return JSON.stringify(gameState);
        },

        getDropTargets: function(eltId) {
            var side = eltId.charAt(0) === "U" ? "usa" : "csa";

            var elt = $("#" + eltId);  // TODO: wrap element, shouldn't be using DOM here

            var ids = [];

            var card = findById(eltId);
            switch (card.type) {
            case "inf":
                // Generic containers
                ids = ids.concat(_.collect(["Hand", "West", "East", "Cadre"], function(str) { return side + str; } ));

                // Infantry can go to any friendly active leader
                ids = ids.concat(_.collect($("." + side + "Active .ldr"), idOf));
                break;

            case "cav":
                // Generic containers
                ids = ids.concat(_.collect(["Hand", "West", "East", "Cadre"], function(str) { return side + str; } ));

                // Cavalry can go to any active top-level leader
                ids = ids.concat(_.collect($("." + side + "Active > .oobRoot > .ldr"), idOf));

                // Or to a top-level cavalry
                ids = ids.concat(_.collect($("." + side + "Active > .oobRoot > .cav"), idOf));
                break;

            case "ldr":
                // Generic containers
                ids = ids.concat(_.collect(["Hand", "West", "East", "Cadre"], function(str) { return side + str; } ));

                // WONTSUB leaders need no further processing, as they must be top-level.
                // But if the leader will subordinate, then can go to any friendly active top-level leader
                if (!card.wontsub) {
                    ids = ids.concat(_.collect($("." + side + "Active > .oobRoot > .ldr_oc"), idOf));
                }

                break;

            case "nav":
                // Generic containers
                ids = ids.concat(["usaHand", "usaWest", "usaEast"]);  // includes hand Just In Case
                break;

            case "enigma":
                break;
            }

            //console.log("getDropTargets(" + eltId + ") = [" + ids.join(",") + "]");
            return ids;
        }
    };
}();
