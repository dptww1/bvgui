if (!BVG) { BVG = {}; }

BVG.Logger = function() {
    var log = null;

    return {
        initialize: function() {
            log = [];
        },

        message: function(playerId, message) {
            log.push({ action: "message", player: playerId, message: message });
        },

        moveCard: function(canUndo, id, fromId, toId) {
            log.push({
                action:  "moveCard",
                card:    id,
                from:    fromId,
                to:      toId,
                canUndo: canUndo
            });
        }
    };
}();