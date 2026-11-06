// TEST FIXTURE — invented stub data for testing the Sortes mechanism.
// This is NOT Hercher's text, not real Greek, and must never be shipped as
// content. The real transcription (92 questions, 103 decades, prophet table)
// arrives in phase 4 as data/sortes-*.js. Every string here is prefixed
// FIXTURE so it cannot be mistaken for an ancient answer.
//
// Shape under test (PLAN.md §7):
//   questions: [{ n, grc, en, themes: [] }]
//   table:     [{ sum, prophet: {grc, en}, interpretation: {grc, en}, decade }]
//   decades:   [{ n, lines: [{ grc, en, answersQuestion, apparatus, filler }] x10 }]

// Sums 13..26. Decade = sum, except the two routes of Hercher's worked
// examples (q16 k5 -> s21 -> decade 8; q16 k10 -> s26 -> decade 58), mirrored
// here as *arithmetic only* against invented answers.
const OVERRIDES = { 21: 8, 26: 58 };
const decadeForSum = (s) => OVERRIDES[s] ?? s;

export const fixtureQuestions = [
  { n: 12, grc: 'FIXTURE-Q12-GRC', en: 'FIXTURE question twelve?', themes: ['fixture'] },
  { n: 13, grc: 'FIXTURE-Q13-GRC', en: 'FIXTURE is it the hour to ask?', themes: ['fixture'] },
  { n: 16, grc: 'FIXTURE-Q16-GRC', en: 'FIXTURE will I advance?', themes: ['fixture'] },
];

export const fixtureTable = Array.from({ length: 14 }, (_, i) => {
  const sum = 13 + i;
  return {
    sum,
    prophet: { grc: 'FIXTURE-PROPHET-GRC', en: `FIXTURE Prophet ${sum}` },
    interpretation: { grc: 'FIXTURE-INTERP-GRC', en: `FIXTURE interpretation ${sum}` },
    decade: decadeForSum(sum),
  };
});

// Which (decade, line) each fixture consultation reaches, so generated lines
// can carry a matching semantic tag. (Real tags are read off the Greek first.)
const reachedBy = new Map();
for (const q of fixtureQuestions.map((x) => x.n)) {
  for (let k = 1; k <= 10; k += 1) {
    reachedBy.set(`${decadeForSum(q + k)}:${k}`, q);
  }
}

const decadeNumbers = [...new Set(fixtureTable.map((r) => r.decade)), 99]; // 99: wholly unreachable
export const fixtureDecades = decadeNumbers.map((n) => ({
  n,
  lines: Array.from({ length: 10 }, (_, i) => {
    const tag = reachedBy.get(`${n}:${i + 1}`) ?? null;
    return {
      grc: `FIXTURE-GRC decade ${n} line ${i + 1}`,
      en: tag === null
        ? `FIXTURE filler answer (decade ${n} line ${i + 1})`
        : `FIXTURE answer to question ${tag} (decade ${n} line ${i + 1})`,
      answersQuestion: tag,
      apparatus: null,
      filler: tag === null,
    };
  }),
}));

export const fixtureData = {
  questions: fixtureQuestions,
  table: fixtureTable,
  decades: fixtureDecades,
};

export function cloneFixture() {
  return JSON.parse(JSON.stringify(fixtureData));
}
