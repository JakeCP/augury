// Days of the moon and favourable hours (PLAN §7). Greek transcribed
// from Hercher printed p. 3 (hercher-pages/p016.png); our English per
// docs/STYLE.md. slot is our machine-readable grouping of the printed
// advice: morning | evening | all-day | third-hour | do-not-use.
// moonAdvice is the 30 English strings in day order, ready to inject
// into isPropitious(date, { moonAdvice }) (js/sortes.js).
// favourableHours: weekday is JS getDay() numbering (0 = Sunday);
// hour is the Byzantine day-hour counted from sunrise (Hercher
// printed p. 3) — the same values as FAVOURABLE_HOURS in js/sortes.js.
// Field licences: licences export below.
export const moonSource = "Hercher 1863, printed p. 3 (hercher-pages/p016.png)";
export const moonDays = [
  {
    "day": 1,
    "grc": "πρωΐας",
    "en": "in the morning",
    "slot": "morning"
  },
  {
    "day": 2,
    "grc": "δείλης",
    "en": "in the evening",
    "slot": "evening"
  },
  {
    "day": 3,
    "grc": "μὴ χρῶ",
    "en": "do not use",
    "slot": "do-not-use"
  },
  {
    "day": 4,
    "grc": "δι' ὅλης τῆς ἡμέρας",
    "en": "through the whole day",
    "slot": "all-day"
  },
  {
    "day": 5,
    "grc": "μὴ χρῶ",
    "en": "do not use",
    "slot": "do-not-use"
  },
  {
    "day": 6,
    "grc": "δι' ὅλης τῆς ἡμέρας",
    "en": "through the whole day",
    "slot": "all-day"
  },
  {
    "day": 7,
    "grc": "πρωΐας",
    "en": "in the morning",
    "slot": "morning"
  },
  {
    "day": 8,
    "grc": "μὴ χρῶ",
    "en": "do not use",
    "slot": "do-not-use"
  },
  {
    "day": 9,
    "grc": "δείλης",
    "en": "in the evening",
    "slot": "evening"
  },
  {
    "day": 10,
    "grc": "δείλης",
    "en": "in the evening",
    "slot": "evening"
  },
  {
    "day": 11,
    "grc": "δείλης",
    "en": "in the evening",
    "slot": "evening"
  },
  {
    "day": 12,
    "grc": "δείλης",
    "en": "in the evening",
    "slot": "evening"
  },
  {
    "day": 13,
    "grc": "πρωΐας",
    "en": "in the morning",
    "slot": "morning"
  },
  {
    "day": 14,
    "grc": "δείλης",
    "en": "in the evening",
    "slot": "evening"
  },
  {
    "day": 15,
    "grc": "πρωΐας",
    "en": "in the morning",
    "slot": "morning"
  },
  {
    "day": 16,
    "grc": "ὥρᾳ τρίτῃ",
    "en": "at the third hour",
    "slot": "third-hour"
  },
  {
    "day": 17,
    "grc": "δείλης",
    "en": "in the evening",
    "slot": "evening"
  },
  {
    "day": 18,
    "grc": "ὥρᾳ τρίτῃ",
    "en": "at the third hour",
    "slot": "third-hour"
  },
  {
    "day": 19,
    "grc": "μὴ χρῶ",
    "en": "do not use",
    "slot": "do-not-use"
  },
  {
    "day": 20,
    "grc": "μὴ χρῶ",
    "en": "do not use",
    "slot": "do-not-use"
  },
  {
    "day": 21,
    "grc": "πρωΐας",
    "en": "in the morning",
    "slot": "morning"
  },
  {
    "day": 22,
    "grc": "πρωΐας",
    "en": "in the morning",
    "slot": "morning"
  },
  {
    "day": 23,
    "grc": "δείλης",
    "en": "in the evening",
    "slot": "evening"
  },
  {
    "day": 24,
    "grc": "μὴ χρῶ",
    "en": "do not use",
    "slot": "do-not-use"
  },
  {
    "day": 25,
    "grc": "δείλης",
    "en": "in the evening",
    "slot": "evening"
  },
  {
    "day": 26,
    "grc": "δείλης",
    "en": "in the evening",
    "slot": "evening"
  },
  {
    "day": 27,
    "grc": "μὴ χρῶ",
    "en": "do not use",
    "slot": "do-not-use"
  },
  {
    "day": 28,
    "grc": "δείλης",
    "en": "in the evening",
    "slot": "evening"
  },
  {
    "day": 29,
    "grc": "δείλης",
    "en": "in the evening",
    "slot": "evening"
  },
  {
    "day": 30,
    "grc": "δείλης",
    "en": "in the evening",
    "slot": "evening"
  }
];
export const moonAdvice = [
  "in the morning",
  "in the evening",
  "do not use",
  "through the whole day",
  "do not use",
  "through the whole day",
  "in the morning",
  "do not use",
  "in the evening",
  "in the evening",
  "in the evening",
  "in the evening",
  "in the morning",
  "in the evening",
  "in the morning",
  "at the third hour",
  "in the evening",
  "at the third hour",
  "do not use",
  "do not use",
  "in the morning",
  "in the morning",
  "in the evening",
  "do not use",
  "in the evening",
  "in the evening",
  "do not use",
  "in the evening",
  "in the evening",
  "in the evening"
];
export const favourableHours = [
  {
    "weekdayGrc": "κυριακή",
    "weekdayEn": "Sunday",
    "weekday": 0,
    "hour": 3,
    "grc": "τὴν μὲν κυριακὴν ἐν ὥρᾳ τρίτῃ",
    "en": "the Lord's day at the third hour"
  },
  {
    "weekdayGrc": "τρίτη",
    "weekdayEn": "Tuesday",
    "weekday": 2,
    "hour": 3,
    "grc": "τὴν δὲ τρίτην ἐν ὥρᾳ τρίτῃ",
    "en": "the third day at the third hour"
  },
  {
    "weekdayGrc": "πέμπτη",
    "weekdayEn": "Thursday",
    "weekday": 4,
    "hour": 5,
    "grc": "τὴν δὲ πέμπτην ἐν ὥρᾳ πέμπτῃ",
    "en": "the fifth day at the fifth hour"
  },
  {
    "weekdayGrc": "σάββατον",
    "weekdayEn": "Saturday",
    "weekday": 6,
    "hour": 6,
    "grc": "τὸ δὲ σάββατον ἐν ὥρᾳ ἕκτῃ",
    "en": "the Sabbath at the sixth hour"
  }
];

export const licences = {
  "grc": "Public domain — Greek text as printed in R. Hercher, Astrampsychi Oraculorum Decades CIII (Berlin, 1863), transcribed from page images",
  "en": "CC BY 4.0 — Augury (Jake Proctor)"
};
