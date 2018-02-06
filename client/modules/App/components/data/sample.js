export const lineGraphSample = {
  labels: ['01/12/2018', '01/22/2018', '02/02/2018', '02/05/2018', '02/08/2018', '02/11/2018', '02/15/2018'],
  datasets: [{
    label: 'master',
    data: [50, 69, 63, 77, 76, 80, 97],
    // backgroundColor: '#00e4e4', // 'rgb(248, 233, 229)', // 'rgba(4, 90,200, 0.52)',
    backgroundColor: 'rgba(0, 98, 196, 0.70)',
    lineTension: 0,
    // fill: false,
  }],
};

export const dataGraphBar = {
  data: {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'Octorber', 'November', 'December'],
    datasets: [{
      backgroundColor: [
        '#2ecc71', // light green
        '#3498db', // light blue
        '#f1c40f', // yellow
        '#e74c3c', // red
        '#34495e', // dark grey
        '#303F9F',
        '#2ecc71', // light green
        '#3498db', // light blue
        '#f1c40f', // yellow
        '#e74c3c', // red
        '#34495e', // dark grey
        '#303F9F',
      ],
      data: [28, 19, 12, 17, 23, 13, 15, 12, 30, 40, 22, 29],
    }],
  },
  options: {
    legend: { display: false },
    maintainAspectRatio: false,
    title: {
      display: true,
      text: 'Project ____ activity in "2017"',
    },
  },
};

export const dataTeam = {
  labels: ['Neo', 'Morpheus', 'Trinity', 'Smith', 'Oracle'],
  datasets: [{
    label: 'Population (millions)',
    backgroundColor: [
      '#2ecc71', // light green
      '#3498db', // light blue
      '#f1c40f', // yellow
      '#e74c3c', // red
      '#34495e', // dark grey
    ],
    data: [28, 19, 12, 17, 23],
  }],
};
