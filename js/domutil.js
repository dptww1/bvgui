if (!BVG) { BVG = {}; }

BVG.DomUtil = function() {
    var _mkCardContainer = function(card) {
        return _.include(["ldr", "cav"], card.type) ? "<ul></ul>" : "";
    };

    var _mkClassName = function(card) {
        var classes = [card.side, card.type];

        if (card.acap) {
            classes.push("ldr_oc");
        }

        return classes.join(" ");
    };

    var _mkIcon = function(card) {
        switch(card.type) {
        case "cav":    return "<img src='Images/cav_" + card.side + ".png' width='18' height='12' border='0'>";
        case "inf":    return "<img src='Images/inf_" + card.side + ".png' width='18' height='12' border='0'>";
        case "nav":    return "<img src='Images/nav_usa.png' width='18' height='12' border='0'>";
        case "map":    return "<img src='Images/map.png' width='18' height='12' border='0'>";
        case "enigma": return "<img src='Images/enigma_" + card.side + ".png' width='18 height='12' border='0'>";
        case "ldr":
            var imgName = "ldr_" + card.side + "_" + (card.acap ? "oc" : "sub") + ".png";
            return "<img src='Images/" + imgName + "' width='18' height='12' border='0'>";
        }
        throw "_mkIcon can't handle " + card.type;
    };

    var _mkInitStr = function(card) {
        if (card.ainit === undefined || card.dinit === undefined) {
            return "";
        }

        if (card.ainit === card.dinit) {
            return "[" + card.ainit + "]";
        }

        return "[" + card.ainit + "/" + card.dinit + "]";
    };

    var _mkNameStr = function(card) {
        return card.special ? "<span class='toolTippedText'>" + card.name + "*</span>"
                            : card.name;
    };

    var _mkStrengthStr = function(card) {
        switch(card.type) {
        case "cav": return "C<span class='strength'>" + card.str + "</span>";
        case "inf": return "I<span class='strength'>" + card.str + "</span>";
        case "nav": return "N<span class='strength'>" + card.str + "</span>";
        case "ldr": return "L<span class='strength'>" + card.str + "</span> <span class='rollupStrength'></span>";
        default:    return "";
        }
        throw "_mkStrengthStr can't handle " + card.type;
    };

    return {
        findOC: function(elt) {
            return $(elt).up(".ldr_oc");
        },

        mkCardNode: function(card) {
            var n = "<li class=\"" + _mkClassName(card) + "\" id=\"" + card.id + "\" style=\"display:none\">";
            var labels = [
                _mkIcon(card),
                _mkNameStr(card),
                _mkInitStr(card),
                _mkStrengthStr(card),
                _mkCardContainer(card)
            ];
            n += labels.join(" ") + "</li>";
            return n;
        },

        activateToolTip: function(card) {
            if (card.special) {
                $($("#" + card.id).find("span.toolTippedText")[0]).tooltip({
                    bodyHandler: function() {
                        return "SPECIAL: " + card.special;
                    }
                });
            }
        },

        /**
         * Returns the card targeted by the given event; might be null.
         */
        findCardElt: function(event) {
            var elt = event.element();
            if (elt.tagName !== "LI") {
                elt = elt.up("li");
            }
            return elt;
        }
    };
}();