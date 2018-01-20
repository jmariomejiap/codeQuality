const parseDatatoChart = (data) => {
  const result = { labels: [], datasets: [{ label: '', data: [], backgroundColor: 'rgba(4, 90,200, 0.72)' }] };

  data.map((commitObject) => { // eslint-disable-line 
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
