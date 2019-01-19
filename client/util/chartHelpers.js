import moment from 'moment';
import _ from 'lodash';

export const findScore = arrayCommits => {
  const lastCommit = arrayCommits[arrayCommits.length - 1];
  const score = lastCommit.statementsCoveragePorcentage;
  return score;
};

// helper function
export const findTooltipData = (arrayCommits, positionTooltip) => {
  const currentCommitObject = arrayCommits[positionTooltip];
  return {
    author: currentCommitObject.author,
    message: currentCommitObject.message
  };
};

// use to dinamicly generate Y axis
export const findYAxesMin = arrayCommits => {
  const sortedByScore = _.sortBy(arrayCommits, [
    objA => objA.statementsCoveragePorcentage
  ]);
  const min = sortedByScore[0].statementsCoveragePorcentage;
  return min;
};

// use to determine X-axis for box coloring
export const findLastLabel = arrayCommits => {
  const last = arrayCommits[arrayCommits.length - 1];
  const label = moment(last.commitDate).format('MMM DD,  YYYY');
  return label;
};
