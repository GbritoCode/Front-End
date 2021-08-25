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
          borderColor: ["red", "#ff6600", "#4ede6b", "yellow"],
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
          backgroundColor: [
            "rgba(255, 102, 46, 0.8)",
            "rgba(227, 41, 181, 0.8)",
            "rgba(100, 58, 250, 0.8)",
            "rgba(41, 167, 227, 0.8)",
            "rgba(26, 255, 117, 0.8)",
            "rgba(255, 228, 43, 0.8)",
            "rgba(227, 100, 39, 0.8)",
            "rgba(60, 123, 230, 0.8)",
            "rgba(28, 255, 109, 0.8)",
            "rgba(250, 61, 40, 0.8)",
            "rgba(255, 228, 43, 0.8)",
            "rgba(230, 42, 90, 0.8)",
            "rgba(255, 140, 43, 0.8)"
          ],
          hoverBackgroundColor: [
            "rgba(255, 102, 46, 1)",
            "rgba(227, 41, 181, 1)",
            "rgba(100, 58, 250, 1)",
            "rgba(41, 167, 227, 1)",
            "rgba(26, 255, 117, 1)",
            "rgba(255, 228, 43, 1)",
            "rgba(227, 100, 39, 1)",
            "rgba(60, 123, 230, 1)",
            "rgba(28, 255, 109, 1)",
            "rgba(250, 61, 40, 1)",
            "rgba(255, 228, 43, 1)",
            "rgba(230, 42, 90, 1)",
            "rgba(255, 140, 43, 1)"
          ],
          borderColor: [
            "rgba(255, 102, 46, 1)",
            "rgba(227, 41, 181, 1)",
            "rgba(100, 58, 250, 1)",
            "rgba(41, 167, 227, 1)",
            "rgba(26, 255, 117, 1)",
            "rgba(255, 228, 43, 1)",
            "rgba(227, 100, 39, 1)",
            "rgba(60, 123, 230, 1)",
            "rgba(28, 255, 109, 1)",
            "rgba(250, 61, 40, 1)",
            "rgba(255, 228, 43, 1)",
            "rgba(230, 42, 90, 1)",
            "rgba(255, 140, 43, 1)"
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
