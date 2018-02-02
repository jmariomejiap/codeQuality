const parseDatatoChart = (data) => {
  const colors = ['#ddc0be', 'rgba(4, 90,200, 0.42)', 'rgba(195, 60, 84, 0.69)', 'rgba(173,225,51,0.66)', 'rgba(273,225,51,0.66)'];
  const result = { labels: [], datasets: [] };

  data.map((commitObject, index) => { // eslint-disable-line
    const splitDate = commitObject.commitDate.slice(0, -1).split('T');
    const date = splitDate[0];
    const porcentage = commitObject.testCoveragePorcentage.total.lines.pct;

    if (result.labels.indexOf(date) === -1) {
      result.labels.push(date);
    }

    // { label: '', data: [], backgroundColor: '' }
    const currentDataSet = result.datasets.filter((obj) => obj.label === commitObject.branch);

    if (currentDataSet.length === 0) {
      const set = {
        label: commitObject.branch,
        data: [porcentage],
        // backgroundColor: colors[index],
      };
      result.datasets.push(set);
      return null;
    }

    result.datasets.map((dataSetObject, i) => { // eslint-disable-line
      if (dataSetObject.label === commitObject.branch) {
        result.datasets[i].label = commitObject.branch;
        result.datasets[i].data.push(porcentage);
        result.datasets[i].backgroundColor = colors[i];
      }
    });
  });
  return result;
};

export default parseDatatoChart;
