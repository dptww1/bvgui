if (!BVG) { BVG = {}; }

/**
 * Client-side representation of changeable game state.
 */
BVG.State = function() {
    /*
     * Used as a set.  Index by card id.
     */
    var depletions = null;
    var flips      = null;

    return {
        /*
         * Initializes all changeable game state.
         */
        initialize: function() {
            depletions = {};
            flips      = {};
        },

        /**
         * Depletes a given card.
         */
        deplete: function(id) {
            var card = BVG.Lookup.findCardById(id);
            if (typeof(card.depstr) == "undefined") {
                throw "tried to deplete a undepletable card " + id;
            }
            if (depletions[id]) {
                throw "tried to deplete an already-depleted card " + id;
            }

            depletions[id] = 1;
            $("#" + id).addClass("depleted");
        },

        /**
         * Restores a given card.
         */
        restore: function(id) {
            var card = BVG.Lookup.findCardById(id);
            if (depletions[id] !== 1)
                throw "tried to deplete an undepleted card " + id;
            delete depletions[id];
            $("#" + id).removeClass("depleted");
        },

        /**
         * Determines if given card is depleted or not.
         */
        isDepleted: function(id) {
            return depletions[id] === 1;
        },

        /**
         * Toggles the flip state of the given card.
         */
        flip: function(id) {
            if (this.isFlipped(id)) {
                delete flips[id];
                $("#" + id).removeClass("flipped");
            } else { // not flipped
                flips[id] = 1;
                $("#" + id).addClass("flipped");
            }
        },

        /**
         * Determines if given card if flipped or not.
         */
        isFlipped: function(id) {
            return flips[id] === 1;
        }
    };
}();
