// Simple rule-based subject classifier.
// Replace or extend later with ML model if needed.

const subjectKeywords = {
  "Physics": [
    "newton", "force", "acceleration", "velocity", "momentum", "thermodynamics",
    "energy", "gravity", "kinetic", "potential", "electricity", "magnetic", "quantum"
  ],
  "Biology": [
    "photosynthesis", "cell", "mitosis", "meiosis", "enzyme", "dna", "rna",
    "evolution", "ecosystem", "organism", "chlorophyll", "respiration", "protein"
  ],
  "Chemistry": [
    "mole", "molarity", "chemical", "reaction", "acid", "base", "ph", "organic",
    "periodic", "stoichiometry", "catalyst", "oxidation", "reduction"
  ],
  "Mathematics": [
    "integral", "derivative", "matrix", "vector", "algebra", "calculus",
    "probability", "statistics", "equation", "theorem", "geometry", "trigonometry"
  ],
  "History": [
    "war", "revolution", "treaty", "empire", "dynasty", "constitution",
    "world war", "ancient", "medieval", "colonial", "president", "king"
  ],
  "Geography": [
    "continent", "latitude", "longitude", "river", "mountain", "climate", "capital",
    "population", "country", "island"
  ],
  "Computer Science": [
    "algorithm", "data structure", "binary", "recursion", "queue", "stack",
    "database", "sql", "python", "javascript", "sorting", "hash", "tree", "graph"
  ],
  "Language": [
    "grammar", "vocabulary", "sentence", "noun", "verb", "translation",
    "syntax", "pronunciation", "literature", "poem"
  ]
};

function detectSubject(text) {
  if (!text || typeof text !== 'string') return 'General';
  const s = text.toLowerCase();
  const scores = {};

  for (const [subject, keywords] of Object.entries(subjectKeywords)) {
    for (const kw of keywords) {
      if (s.includes(kw.toLowerCase())) {
        scores[subject] = (scores[subject] || 0) + 1;
      }
    }
  }

  const entries = Object.entries(scores);
  if (entries.length === 0) {
    // heuristic fallbacks
    if (s.match(/\d+\/\d+|\d+\s*%|solve|integral|derivative|equation|prove/)) return 'Mathematics';
    if (s.match(/photosynthesis|plant|chlorophyll/)) return 'Biology';
    if (s.match(/newton|force|acceleration/)) return 'Physics';
    return 'General';
  }

  entries.sort((a,b) => b[1] - a[1]);
  return entries[0][0];
}

module.exports = { detectSubject };
