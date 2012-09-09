if (!BVG) { BVG = {}; }

BVG.Logger = function() {
    var log = null;

    return {
        initialize: function() {
            log = [];
        },

        drawCard: function(id) {
            log.push({ action: "drawCard", card: id });
            $("#log").append("Draw Card " + id + "<br/>");
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
            $("#log").append("Move Card " + id + " from " + fromId + " to " + toId + "<br/>");
        },

        newGame: function() {
            log.push({
                action: "newGame"
            });
            $("#log").append("New Game<br>");
        }
    };
}();