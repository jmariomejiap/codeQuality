import moment from 'moment';
const parseDatatoChart = (data) => {
  const result = { labels: [], datasets: [{ label: ' %', lineTension: 0, data: [], borderColor: '#808080', backgroundColor: 'rgba(28, 33, 60, 0.60)' }] };

  // array of objects. each object is a json-coverage commit.
  data.map((commitObject, index) => { // eslint-disable-line
    const commitDate = moment(commitObject.commitDate).format('MMM DD,  YYYY');
    const porcentage = commitObject.statementsCoveragePorcentage;

    result.labels.push(commitDate);
    // result.datasets[0].label = commitObject.branch;
    result.datasets[0].data.push(porcentage);
  });
  return result;
};

export default parseDatatoChart;

// 'rgba(0, 98, 196, 0.70)' blue
// 'rgba(0, 172, 57, 0.70)' green
// '#B3B7B8' grey
// 'rgba(83, 89, 106, 0.55)' nice greyBlue
