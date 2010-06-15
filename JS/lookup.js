var BVGLOOKUP = {
    Cards: {}
};

BVGLOOKUP.Cards.USA = {
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
    id: "U004", name: "Dept of Washington", side: "usa", type: "wash", str: 10, ainit: 2, dinit: 2, wontsub: true, ccap: 99,
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
    id: "U011", name: "McClellan", side: "usa", type: "ldr", str: 0, ainit: 0, dinit: 0, acap: 0, ccap: 6, scap: 0, wontsub: true, politics: "d"
  },
  U012: {
      id: "U012", name: "Map C (neutral)", side: "usa", type: "map"
  },
  U013: {
    id: "U013", name: "Banks", side: "usa", type: "ldr", str: 0, ainit: 1, dinit: 1, acap: 0, ccap: 3, scap: 3, wontsub: true,
    special: "Can be returned to your hand during Step 1 or 2 of your turn, even if replaced."
  },
  U014: {
    id: "U014", name: "Halleck", side: "usa", type: "ldr", str: 1, ainit: 0, dinit: 1, acap: 2, ccap: 0, scap: 0, wontsub: true, politics: "f"
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
    id: "U034", name: "Pope", side: "usa", type: "ldr", str: 1, ainit: 1, dinit: 1, acap: 0, ccap: 5, scap: 0, wontsub: true, politics: "d"
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
    id: "U043", name: "Rosecrans", side: "usa", type: "ldr", str: 1, ainit: 1, dinit: 1, acap: 0, ccap: 3, scap: 0, wontsub: true, politics: "d"
  },
  U044: {
    id: "U044", name: "VII Corps", side: "usa", type: "inf", str: 3, theater: "e",
    special: "Can't attack"
  },
  U045: {
    id: "U045", name: "Map G (USA)", side: "usa", type: "map"
  },
  U046: {
    id: "U046", name: "Burnside", side: "usa", type: "ldr", str: 0, ainit: 1, dinit: 1, acap: 0, ccap: 5, scap: 0, wontsub: true
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