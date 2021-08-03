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
          borderColor: "#ff6600",
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
