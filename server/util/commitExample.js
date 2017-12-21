
const commitExample = {
  total: {
    lines: {
      total: 480,
      covered: 345,
      skipped: 0,
      pct: 71.88,
    },
    statements: {
      total: 775,
      covered: 623,
      skipped: 19,
      pct: 80.39,
    },
    functions: {
      total: 161,
      covered: 85,
      skipped: 0,
      pct: 52.8,
    },
    branches: {
      total: 241,
      covered: 149,
      skipped: 11,
      pct: 61.83,
    },
    linesCovered: {
      1: 82,
      2: 69,
      3: 37,
      56: 6,
      151: 3,
    },
  },
};

const invalidExample = {
  total: {
    lines: {
      total: 480,
      covered: 345,
      skipped: 0,
      pct: 71.88,
    },
    statements: {
      total: 775,
      covered: 623,
      skipped: 19,
      pct: 80.39,
    },
    branches: {
      total: 241,
      covered: 149,
      skipped: 11,
      pct: 61.83,
    },
    linesCovered: {
      1: 82,
      2: 69,
      3: 37,
      56: 6,
      151: 3,
    },
  },
};


export { commitExample, invalidExample };
