
const commitDummyGenerator = (projectId, branchName, date, commitTotal, author = 'dummyAuthor', message = 'dummy') => {
  return {
    projectId,
    branch: branchName,
    commitDate: date,
    statementsCoveragePorcentage: commitTotal,
    functionsCoveragePorcentage: 80,
    branchesCoveragePorcentage: 80,
    linesCoveragePorcentage: 80,
    fullTestCoverage: {
      lines: {
        total: 480,
        covered: 345,
        skipped: 0,
        pct: 80,
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
    author,
    gitCommitHash: 'dummyHash',
    message,
  };
};

export default commitDummyGenerator;
