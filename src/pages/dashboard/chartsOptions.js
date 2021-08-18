export const barChart_1 = {
  data: (label, chartData) => {
    return {
      labels: label,
      datasets: [
        {
          label: "FUPs",
          fill: true,
          backgroundColor: "rgba(72,72,176,0.0)",
          hoverBackgroundColor: "rgba(72,72,176,0.1)",
          borderColor: ["red", "#ff6600", "#4ede6b"],
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          data: chartData
        }
      ]
    };
  },
  options: {
    // onClick: (evt, element) => {
    //   if (element.length > 0) {
    //     console.log(element, element[0]._datasetInde);
    //     // you can also get dataset of your selected element
    //   }
    // },
    maintainAspectRatio: false,
    legend: {
      display: false
    },
    tooltips: {
      backgroundColor: "#f5f5f5",
      titleFontColor: "#333",
      bodyFontColor: "#666",
      bodySpacing: 4,
      xPadding: 12,
      mode: "nearest",
      intersect: 0,
      position: "nearest"
    },
    responsive: true,
    scales: {
      yAxes: [
        {
          gridLines: {
            drawBorder: false,
            color: "rgba(225,78,202,0.1)",
            zeroLineColor: "transparent"
          },
          ticks: {
            suggestedMin: 0,
            suggestedMax: 6,
            padding: 1,
            fontColor: "#9e9e9e"
          }
        }
      ],
      xAxes: [
        {
          gridLines: {
            drawBorder: false,
            color: "rgba(225,78,202,0.1)",
            zeroLineColor: "transparent"
          },
          ticks: {
            padding: 20,
            fontColor: "#9e9e9e"
          }
        }
      ]
    }
  }
};

export const doughnutChart_1 = {
  data: (label, chartData) => {
    return {
      labels: label,
      datasets: [
        {
          label: "FUPs",
          fill: true,
          backgroundColor: "rgba(72,72,176,0.0)",
          hoverBackgroundColor: "rgba(72,72,176,0.1)",
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)"
          ],
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          data: chartData
        }
      ]
    };
  },
  options: {
    // onClick: (evt, element) => {
    //   if (element.length > 0) {
    //     console.log(element, element[0]._datasetInde);
    //     // you can also get dataset of your selected element
    //   }
    // },
    maintainAspectRatio: false,
    legend: {
      display: false
    },
    tooltips: {
      backgroundColor: "#f5f5f5",
      titleFontColor: "#333",
      bodyFontColor: "#666",
      bodySpacing: 4,
      xPadding: 12,
      mode: "nearest",
      intersect: 0,
      position: "nearest"
    },
    responsive: true,
    scales: {
      yAxes: [],
      xAxes: []
    }
  }
};
