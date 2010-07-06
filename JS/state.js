if (!BVG) { BVG = {}; }

/**
 * Client-side representation of changeable game state.
 */
BVG.State = function() {
    /*
     * Used as a set.  Index by card id.
     */
    var depletions = null;

    return {
        /*
         * Initializes all changeable game state.
         */
        initialize: function() {
            depletions = $H({});
        },

        /**
         * Depletes a given card.
         */
        deplete: function(id) {
            var card = BVG.Lookup.findCardById(id);
            if (!card.depstr)
                throw "tried to deplete a undepletable card " + id;
            if (depletions.get(id))
                throw "tried to deplete an already-depleted card " + id;
            depletions.set(id, 1);
            $(id).addClassName("depleted");
        },

        /**
         * Restores a given card.
         */
        restore: function(id) {
            var card = BVG.Lookup.findCardById(id);
            if (depletions.get(id) !== 1)
                throw "tried to deplete an undepleted card " + id;
            depletions.unset(id);
            $(id).removeClassName("depleted");
        },

        /**
         * Determines if given card is depleted or not.
         */
        isDepleted: function(id) {
            return depletions.get(id) === 1;
        }
    };
}();
