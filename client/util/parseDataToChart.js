const parseDatatoChart = (data) => {
  const result = { labels: [], datasets: [{ label: '', lineTension: 0, data: [], backgroundColor: 'rgba(0, 98, 196, 0.70)' }] };

  // array of objects. each object is a json-coverage commit.
  data.map((commitObject, index) => { // eslint-disable-line
    const splitDate = commitObject.commitDate.slice(0, -1).split('T');
    const date = splitDate[0];
    const porcentage = commitObject.testCoveragePorcentage.total.lines.pct;

    result.labels.push(date);
    result.datasets[0].label = commitObject.branch;
    result.datasets[0].data.push(porcentage);
  });
  return result;
};

export default parseDatatoChart;

// backgroundColor: '#0c888e'
