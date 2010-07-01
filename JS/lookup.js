if (BVG == undefined) {
    var BVG = {};
}

BVG.Lookup = function() {
    return {
        Cards: {},

        findCardById: function(id) {
            return BVG.Lookup.Cards[id.charAt(0) === "U" ? "usa" : "csa"][id];
        }
    };
}();

BVG.Lookup.Cards.csa = {
  C001: {
    id: "C001", name: "Map D (CSA)", side: "csa", type: "map"
  },
  C002: {
    id: "C002", name: "Map E (CSA)", side: "csa", type: "map"
  },
  C003: {
    id: "C003", name: "Miracle From God", side: "csa", type: "enigma"
  },
  C004: {
    id: "C004", name: "Tidewater Militia", side: "csa", type: "inf", str: 2, theater: "e"   // TODO: both theaters
  },
  C005: {
    id: "C005", name: "La Belle Rebelle", side: "csa", type: "enigma"
  },
  C006: {
    id: "C006", name: "Beauregard", side: "csa", type: "ldr", str: 2, ainit: 1, dinit: 1, acap: 3, ccap: 0, scap: 0, wontsub: true, politics: "d",
    special: "Won't subordinate. May be returned to your hand during Step 1 or Step 2, even if replaced, (unless sacked or wounded)."
  },
  C007: {
    id: "C007", name: "Pickett", side: "csa", type: "inf", str: 2, theater: "e"
  },
  C008: {
    id: "C008", name: "J Johnston", side: "csa", type: "ldr", str: 2, ainit: 1, dinit: 2, acap: 3, ccap: 0, scap: 3, wontsub: true, politics: "d",
    special: "Won't subordinate, except to Beauregard."
  },
  C009: {
    id: "C009", name: "Stonewall", side: "csa", type: "inf", str: 2, theater: "e"
  },
  C010: {
    id: "C010", name: "Ewell", side: "csa", type: "inf", str: 2, theater: "e"
  },
  C011: {
    id: "C011", name: "Lovell", side: "csa", type: "inf", str: 1, theater: "w"
  },
  C012: {
    id: "C012", name: "Pillow", side: "csa", type: "inf", str: 1, theater: "w"
  },
  C013: {
    id: "C013", name: "Cheatham", side: "csa", type: "inf", str: 2, theater: "w"
  },
  C014: {
    id: "C014", name: "A Johnston", side: "csa", type: "ldr", str: 4, ainit: 1, dinit: 1, acap: 3, ccap: 0, scap: 0, wontsub: true, politics: "f",
    special: "Won't subordinate."
  },
  C015: {
    id: "C015", name: "Cleburne", side: "csa", type: "inf", str: 3, theater: "w"
  },
  C016: {
    id: "C016", name: "Buckner", side: "csa", type: "inf", str: 1, theater: "w"
  },
  C017: {
    id: "C017", name: "Polk", side: "csa", type: "ldr", str: 1, ainit: 0, dinit: 0, acap: 0, ccap: 2, scap: 2, politics: "f"
  },
  C018: {
    id: "C018", name: "Buckner", side: "csa", type: "ldr", str: 2, ainit: 1, dinit: 1, acap: 0, ccap: 2, scap: 2
  },
  C019: {
    id: "C019", name: "Ironclads", side: "csa", type: "enigma"
  },
  C020: {
    id: "C020", name: "The Slows", side: "csa", type: "enigma"
  },
  C021: {
    id: "C021", name: "Jackson", side: "csa", type: "ldr", str: 3, ainit: 2, dinit: 2, acap: 0, ccap: 5, scap: 5,
    special: "Can rejoin a command to defend."
  },
  C022: {
    id: "C022", name: "D H Hill", side: "csa", type: "inf", str: 2, theater: "e"
  },
  C023: {
    id: "C023", name: "Hardee", side: "csa", type: "ldr", str: 2, ainit: 2, dinit: 2, acap: 0, ccap: 4, scap: 4
  },
  C024: {
    id: "C024", name: "Hindman", side: "csa", type: "inf", str: 1, theater: "w"
  },
  C025: {
    id: "C025", name: "Map H (CSA)", side: "csa", type: "map"
  },
  C026: {
    id: "C026", name: "Bragg", side: "csa", type: "ldr", str: 0, ainit: 2, dinit: 2, acap: 3, ccap: 0, scap: 3, politics: "f",
    special: "Treats General's Battle as a Stalemate."
  },
  C027: {
    id: "C027", name: "Map F (CSA)", side: "csa", type: "map"
  },
  C028: {
    id: "C028", name: "Stewart", side: "csa", type: "inf", str: 2, theater: "w"
  },
  C029: {
    id: "C029", name: "Breckinridge", side: "csa", type: "inf", str: 1, theater: "w"
  },
  C030: {
    id: "C030", name: "McLaw", side: "csa", type: "inf", str: 1, theater: "e"
  },
  C031: {
    id: "C031", name: "Map C (CSA)", side: "csa", type: "map"
  },
  C032: {
    id: "C032", name: "Magruder", side: "csa", type: "ldr", str: 0, ainit: 0, dinit: 0, acap: 0, ccap: 4, scap: 4, politics: "d"
  },
  C033: {
    id: "C033", name: "Anderson", side: "csa", type: "inf", str: 2, theater: "e"
  },
  C034: {
    id: "C034", name: "A P Hill", side: "csa", type: "inf", str: 2, theater: "e"
  },
  C035: {
    id: "C035", name: "Hood", side: "csa", type: "inf", str: 3, theater: "e", // TODO: both theaters
    special: "Before CSA Late War, must take at least one step loss when attacking if the CSA suffers any losses."
  },
  C036: {
    id: "C036", name: "Map G (CSA)", side: "csa", type: "map"
  },
  C037: {
    id: "C037", name: "Map I (CSA)", side: "csa", type: "map"
  },
  C038: {
    id: "C038", name: "R E Lee", side: "csa", type: "ldr", str: 4, ainit: 2, dinit: 2, acap: 3, ccap: 0, scap: 0, wontsub: true, politics: "f",
    special: "Won't subordinate."
  },
  C039: {
    id: "C039", name: "Kirby Smith", side: "csa", type: "ldr", str: 1, ainit: 2, dinit: 2, acap: 0, ccap: 3, scap: 3, politics: "d"
  },
  C040: {
    id: "C040", name: "Copperheads", side: "csa", type: "enigma"
  },
  C041: {
    id: "C041", name: "Longstreet", side: "csa", type: "ldr", str: 4, ainit: 1, dinit: 1, acap: 0, ccap: 5, scap: 5
  },
  C042: {
    id: "C042", name: "Stevenson", side: "csa", type: "inf", str: 1, theater: "w"
  },
  C043: {
    id: "C043", name: "Price", side: "csa", type: "ldr", str: 0, ainit: 2, dinit: 2, acap: 0, ccap: 2, scap: 2
  },
  C044: {
    id: "C044", name: "Forrest", side: "csa", type: "cav", str: 5, ainit: 2, dinit: 2,
    special: "Western Theater only.  2 steps.  Can't pair with Wheeler."
  },
  C045: {
    id: "C045", name: "Stuart", side: "csa", type: "cav", str: 2, ainit: 1, dinit: 1
  },
  C046: {
    id: "C046", name: "Heth", side: "csa", type: "inf", str: 1, theater: "w"
  },
  C047: {
    id: "C047", name: "Ransom", side: "csa", type: "inf", str: 2, theater: "e"
  },
  C048: {
    id: "C048", name: "Van Dorn", side: "csa", type: "cav", str: 1, ainit: 2, dinit: 2,
    special: "Remove when CSA enters Late War."
  },
  C049: {
    id: "C049", name: "Maury", side: "csa", type: "inf", str: 2, theater: "w"
  },
  C050: {
    id: "C050", name: "Pemberton", side: "csa", type: "ldr", str: 0, ainit: 1, dinit: 1, acap: 0, ccap: 3, scap: 3, // TODO: verify
    special: "Can't be replaced from cadre."
  },
  C051: {
    id: "C051", name: "Wheeler", side: "csa", type: "cav", str: 2, ainit: 2, dinit: 2,
    special: "Can't pair with Forrest."
  },
  C052: {
    id: "C052", name: "Smith", side: "csa", type: "inf", str: 1, theater: "w"
  },
  C053: {
    id: "C053", name: "Loring", side: "csa", type: "inf", str: 2, theater: "w"
  },
  C054: {
    id: "C054", name: "Forney", side: "csa", type: "inf", str: 1, theater: "w"
  },
  C055: {
    id: "C055", name: "Bowen", side: "csa", type: "inf", str: 1, theater: "w"
  },
  C056: {
    id: "C056", name: "Ewell", side: "csa", type: "ldr", str: 1, ainit: 1, dinit: 1, acap: 0, ccap: 3, scap: 3
  },
  C057: {
    id: "C057", name: "Map J (CSA)", side: "csa", type: "map"
  },
  C058: {
    id: "C058", name: "A P Hill", side: "csa", type: "ldr", str: 1, ainit: 1, dinit: 1, acap: 0, ccap: 3, scap: 3
  },
  C059: {
    id: "C059", name: "French", side: "csa", type: "inf", str: 1, theater: "w"
  },
  C060: {
    id: "C060", name: "Walker", side: "csa", type: "inf", str: 2, theater: "w"
  },
  C061: {
    id: "C061", name: "Draft Riots", side: "csa", type: "enigma"
  },
  C062: {
    id: "C062", name: "Rebel Yell", side: "csa", type: "enigma"
  },
  C063: {
    id: "C063", name: "D H Hill", side: "csa", type: "ldr", str: 2, ainit: 1, dinit: 1, acap: 0, ccap: 3, scap: 3
  },
  C064: {
    id: "C064", name: "Maury", side: "csa", type: "ldr", str: 2, ainit: 1, dinit: 1, acap: 0, ccap: 2, scap: 2
  },
  C065: {
    id: "C065", name: "Preston", side: "csa", type: "inf", str: 1, theater: "w"
  },
  C066: {
    id: "C066", name: "Partisan Rangers", side: "csa", type: "enigma"
  },
  C067: {
    id: "C067", name: "Digging for the South", side: "csa", type: "enigma"
  },
  C068: {
    id: "C068", name: "Map K (CSA)", side: "csa", type: "map"
  },
  C069: {
    id: "C069", name: "Hood", side: "csa", type: "ldr", str: 1, ainit: 2, dinit: 0, acap: 3, ccap: 0, scap: 3, politics: "f"
  },
  C070: {
    id: "C070", name: "Breckinridge", side: "csa", type: "ldr", str: 2, ainit: 1, dinit: 1, acap: 0, ccap: 3, scap: 3
  },
  C071: {
    id: "C071", name: "Degataga", side: "csa", type: "enigma"
  },
  C072: {
    id: "C072", name: "Early", side: "csa", type: "ldr", str: 1, ainit: 2, dinit: 1, acap: 0, ccap: 3, scap: 3
  },
  C073: {
    id: "C073", name: "Walthall", side: "csa", type: "inf", str: 2, theater: "w"
  },
  C074: {
    id: "C074", name: "Hoke", side: "csa", type: "inf", str: 1, theater: "e"
  },
  C075: {
    id: "C075", name: "Anderson", side: "csa", type: "ldr", str: 2, ainit: 1, dinit: 1, acap: 0, ccap: 2, scap: 2
  },
  C076: {
    id: "C076", name: "S D Lee", side: "csa", type: "ldr", str: 3, ainit: 1, dinit: 1, acap: 0, ccap: 3, scap: 3
  },
  C077: {
    id: "C077", name: "Stuart", side: "csa", type: "ldr", str: 2, ainit: 1, dinit: 1, acap: 0, ccap: 3, scap: 3
  },
  C078: {
    id: "C078", name: "Gordon", side: "csa", type: "inf", str: 2, theater: "e"
  },
  C079: {
    id: "C079", name: "Cheatham", side: "csa", type: "ldr", str: 2, ainit: 1, dinit: 1, acap: 0, ccap: 3, scap: 3
  },
  C080: {
    id: "C080", name: "Gordon", side: "csa", type: "ldr", str: 2, ainit: 2, dinit: 2, acap: 0, ccap: 3, scap: 3, politics: "f"
  }
};

BVG.Lookup.Cards.usa = {
  U001: {
      id: "U001", name: "Map A (USA)", side: "usa", type: "map"
  },
  U002: {
      id: "U002", name: "Map B (USA)", side: "usa", type: "map"
  },
  U003: {
    id: "U003", name: "The Devil's Own Luck", side: "usa", type: "enigma"
  },
  U004: {
    id: "U004", name: "Dept of Washington", side: "usa", type: "ldr", str: 10, ainit: 2, dinit: 2, wontsub: true, ccap: 99,  // TODO: type? wontsub?
    special: "Defends Washington only.  Acts as leader though unaffected by leader combat results.  May temporarily subordinate to another command."
  },
  U005: {
    id: "U005", name: "Porter", side: "usa", type: "nav", str: 3
  },
  U006: {
    id: "U006", name: "Habeus Corpus", side: "usa", type: "enigma"
  },
  U007: {
    id: "U007", name: "Foote", side: "usa", type: "nav", str: 3
  },
  U008: {
    id: "U008", name: "McDowell", side: "usa", type: "ldr", str: 1, ainit: 1, dinit: 1, acap: 0, ccap: 2, scap: 2, politics: "d"
  },
  U009: {
    id: "U009", name: "I Corps", side: "usa", type: "inf", str: 4, theater: "e"
  },
  U010: {
    id: "U010", name: "XII Corps", side: "usa", type: "inf", str: 3, theater: "e"
  },
  U011: {
    id: "U011", name: "McClellan", side: "usa", type: "ldr", str: 0, ainit: 0, dinit: 0, acap: 0, ccap: 6, scap: 0, wontsub: true, politics: "d",
    special: "Won't subordinate."
  },
  U012: {
      id: "U012", name: "Map C (neutral)", side: "usa", type: "map"
  },
  U013: {
    id: "U013", name: "Banks", side: "usa", type: "ldr", str: 0, ainit: 1, dinit: 1, acap: 0, ccap: 3, scap: 3, wontsub: true,
    special: "Won't subordinate. Can be returned to your hand during Step 1 or 2 of your turn, even if replaced."
  },
  U014: {
    id: "U014", name: "Halleck", side: "usa", type: "ldr", str: 1, ainit: 0, dinit: 1, acap: 2, ccap: 0, scap: 0, wontsub: true, politics: "f",
    special: "Won't subordinate."
  },
  U015: {
    id: "U015", name: "XI Corps", side: "usa", type: "inf", str: 2, theater: "e",
    special: "1 step only."
  },
  U016: {
    id: "U016", name: "VIII Corps", side: "usa", type: "inf", str: 4, theater: "e",
    special: "Dept of Washington or independent only."
  },
  U017: {
    id: "U017", name: "Buell", side: "usa", type: "ldr", str: 1, ainit: 0, dinit: 1, acap: 0, ccap: 3, scap: 2,
    special: "Discarded if sacked as a result of battle."
  },
  U018: {
    id: "U018", name: "XIV Corps", side: "usa", type: "inf", str: 5, theater: "w"
  },
  U019: {
    id: "U019", name: "Grant", side: "usa", type: "ldr", str: 4, ainit: 2, dinit: 2, acap: 2, ccap: 1, scap: 2, politics: "f",
    special: "If combat result is Soldier's Battle, Grant always takes (or holds) his city (etc.), even if he doesn't win the battle."
  },
  U020: {
    id: "U020", name: "XIII Corps", side: "usa", type: "inf", str: 4, theater: "w"
  },
  U021: {
    id: "U021", name: "XV Corps", side: "usa", type: "inf", str: 5, theater: "w"
  },
  U022: {
      id: "U022", name: "Map H (USA)", side: "usa", type: "map"
  },
  U023: {
    id: "U023", name: "Monitor", side: "usa", type: "enigma"
  },
  U024: {
    id: "U024", name: "II Corps", side: "usa", type: "inf", str: 5, theater: "e"
  },
  U025: {
    id: "U024", name: "III Corps", side: "usa", type: "inf", str: 3, theater: "e"
  },
  U026: {
    id: "U026", name: "Map F (USA)", side: "usa", type: "map"
  },
  U027: {
    id: "U027", name: "IV Corps", side: "usa", type: "inf", str: 3, theater: "e",
    special: "(Optional) Can't attack until Late War."
  },
  U028: {
    id: "U028", name: "V Corps", side: "usa", type: "inf", str: 5, theater: "e"
  },
  U029: {
    id: "U029", name: "Map I (USA)", side: "usa", type: "map"
  },
  U030: {
    id: "U030", name: "VI Corps", side: "usa", type: "inf", str: 5, theater: "e"
  },
  U031: {
    id: "U031", name: "Map J (USA)", side: "usa", type: "map"
  },
  U032: {
    id: "U032", name: "Butler", side: "usa", type: "ldr", str: 1, ainit: 1, dinit: 1, acap: 0, ccap: 2, scap: 2
  },
  U033: {
    id: "U033", name: "XIX Corps", side: "usa", type: "inf", str: 3, theater: "e"
  },
  U034: {
    id: "U034", name: "Pope", side: "usa", type: "ldr", str: 1, ainit: 1, dinit: 1, acap: 0, ccap: 5, scap: 0, wontsub: true, politics: "d",
    special: "Won't subordinate."
  },
  U035: {
    id: "U035", name: "Farragut", side: "usa", type: "nav", str: 3
  },
  U036: {
    id: "U036", name: "IX Corps", side: "usa", type: "inf", str: 4, theater: "e"
  },
  U037: {
    id: "U037", name: "XX Corps", side: "usa", type: "inf", str: 5, theater: "w"
  },
  U038: {
    id: "U038", name: "John Brown's Body", side: "usa", type: "enigma"
  },
  U039: {
    id: "U039", name: "XXI Corps", side: "usa", type: "inf", str: 4, theater: "w"
  },
  U040: {
    id: "U040", name: "X Corps", side: "usa", type: "inf", str: 3, theater: "e"
  },
  U041: {
    id: "U041", name: "Special Orders No. 191", side: "usa", type: "enigma"
  },
  U042: {
    id: "U042", name: "XVIII Corps", side: "usa", type: "inf", str: 3, theater: "e"
  },
  U043: {
    id: "U043", name: "Rosecrans", side: "usa", type: "ldr", str: 1, ainit: 1, dinit: 1, acap: 0, ccap: 3, scap: 0, wontsub: true, politics: "d",
    special: "Won't subordinate."
  },
  U044: {
    id: "U044", name: "VII Corps", side: "usa", type: "inf", str: 3, theater: "e",
    special: "Can't attack"
  },
  U045: {
    id: "U045", name: "Map G (USA)", side: "usa", type: "map"
  },
  U046: {
    id: "U046", name: "Burnside", side: "usa", type: "ldr", str: 0, ainit: 1, dinit: 1, acap: 0, ccap: 5, scap: 0, wontsub: true,
    special: "Won't subordinate."
  },
  U047: {
    id: "U047", name: "Wilson", side: "usa", type: "cav", str: 1, ainit: 1, dinit: 1, theater: "w"
  },
  U048: {
    id: "U048", name: "Old Abe", side: "usa", type: "enigma"
  },
  U049: {
    id: "U049", name: "XVI Corps", side: "usa", type: "inf", str: 2, theater: "w",
    special: "Two steps, str 1 if depleted.  If alone or paired with a cavalry, counts toward preventing cavalry raids."
  },
  U050: {
    id: "U050", name: "XVII Corps", side: "usa", type: "inf", str: 4, theater: "w"
  },
  U051: {
    id: "U051", name: "Emancipation Proclamation", side: "usa", type: "enigma"
  },
  U052: {
    id: "U052", name: "Hooker", side: "usa", type: "ldr", str: 2, ainit: 2, dinit: 1, acap: 0, ccap: 5, scap: 2,
    special: "Always loses Soldier's Battles."
  },
  U053: {
    id: "U053", name: "Stoneman", side: "usa", type: "cav", str: 1, ainit: 0, dinit: 0, theater: "e"
  },
  U054: {
    id: "U054", name: "Grierson", side: "usa", type: "cav", str: 2, ainit: 2, dinit: 2, theater: "w"
  },
  U055: {
    id: "U055", name: "XXII Corps", side: "usa", type: "inf", str: 5, theater: "e",
    special: "Must be assigned to the Dept of Washington."
  },
  U056: {
    id: "U056", name: "Meade", side: "usa", type: "ldr", str: 3, ainit: 1, dinit: 2, acap: 0, ccap: 5, scap: 3
  },
  U057: {
    id: "U057", name: "Pauline Cushman", side: "usa", type: "enigma"
  },
  U058: {
    id: "U058", name: "Reserve Corps", side: "usa", type: "inf", str: 5, theater: "w",
    special: "Available for one turn only. If it survives the turn (even depleted), get three free Restores at the end of the turn."
  },
  U059: {
    id: "U059", name: "XXIII Corps", side: "usa", type: "inf", str: 4, theater: "w"
  },
  U060: {
    id: "U060", name: "Blue Mountain Boys", side: "usa", type: "enigma"
  },
  U061: {
    id: "U061", name: "Swamp Angel", side: "usa", type: "enigma"
  },
  U062: {
    id: "U062", name: "Sherman", side: "usa", type: "ldr", str: 2, ainit: 2, dinit: 2, acap: 2, ccap: 0, scap: 2,
    special: "Political Favor if Grant is in the game."
  },
  U063: {
    id: "U063", name: "Thomas", side: "usa", type: "ldr", str: 3, ainit: 1, dinit: 2, acap: 0, ccap: 5, scap: 3
  },
  U064: {
      id: "U064", name: "Map C (USA)", side: "usa", type: "map"
  },
  U065: {
    id: "U065", name: "The Freedom Sickness", side: "usa", type: "enigma"
  },
  U066: {
      id: "U066", name: "Map K (USA)", side: "usa", type: "map"
  },
  U067: {
    id: "U067", name: "McPherson", side: "usa", type: "ldr", str: 2, ainit: 1, dinit: 1, acap: 0, ccap: 5, scap: 3, latewar: true
  },
  U068: {
    id: "U068", name: "Infernal Machines", side: "usa", type: "enigma"
  },
  U069: {
    id: "U069", name: "Sheridan", side: "usa", type: "cav", str: 3, theater: "e", ainit: 2, dinit: 2, acap: 0, ccap: 3, scap: 3, latewar: true,
    special: "If unassigned, can command up to 3 infantry corps (but no additional cavalry)."
  },
  U070: {
    id: "U070", name: "Howard", side: "usa", type: "ldr", str: 1, ainit: 1, dinit: 1, acap: 0, ccap: 4, scap: 3, latewar: true, politics: "f"
  },
  U071: {
    id: "U071", name: "Ord", side: "usa", type: "ldr", str: 2, ainit: 1, dinit: 1, acap: 0, ccap: 3, scap: 2, latewar: true
  },
  U072: {
    id: "U072", name: "1864 Elections", side: "usa", type: "enigma"
  },
  U073: {
    id: "U073", name: "Slocum", side: "usa", type: "ldr", str: 2, ainit: 1, dinit: 1, acap: 0, ccap: 2, scap: 2, latewar: true,
    special: "Won't serve in same command as Hooker."
  },
  U074: {
    id: "U074", name: "XXIV Corps", side: "usa", type: "inf", str: 3, theater: "e", latewar: true
  },
  U075: {
    id: "U075", name: "XXV Corps", side: "usa", type: "inf", str: 4, theater: "e", latewar: true
  },
  U076: {
    id: "U076", name: "Provisional Corps", side: "usa", type: "inf", str: 5, theater: "e",
    special: "Available for one turn only. If it survives the turn (even depleted), get three free Restores at the end of the turn."
  }
};