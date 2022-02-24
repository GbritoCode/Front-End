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

export const CliStatusChart = {
  data: (label, chartData) => {
    return {
      labels: label,
      datasets: [
        {
          label: "FUPs",
          fill: true,
          backgroundColor: "rgba(72,72,176,0.0)",
          hoverBackgroundColor: "rgba(72,72,176,0.1)",
          borderColor: ["red", "#ff6600", "yellow", "#4ede6b"],
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
            "rgba(255, 102, 46, 0)",
            "rgba(227, 41, 181, 0)",
            "rgba(100, 58, 250, 0)",
            "rgba(41, 167, 227, 0)",
            "rgba(26, 255, 117, 0)",
            "rgba(255, 228, 43, 0)",
            "rgba(227, 100, 39, 0)",
            "rgba(60, 123, 230, 0)",
            "rgba(28, 255, 109, 0)",
            "rgba(250, 61, 40, 0)",
            "rgba(255, 228, 43, 0)",
            "rgba(230, 42, 90, 0)",
            "rgba(255, 140, 43, 0)"
          ],
          hoverBackgroundColor: [
            "rgba(255, 102, 46, 0.1)",
            "rgba(227, 41, 181, 0.1)",
            "rgba(100, 58, 250, 0.1)",
            "rgba(41, 167, 227, 0.1)",
            "rgba(26, 255, 117, 0.1)",
            "rgba(255, 228, 43, 0.1)",
            "rgba(227, 100, 39, 0.1)",
            "rgba(60, 123, 230, 0.1)",
            "rgba(28, 255, 109, 0.1)",
            "rgba(250, 61, 40, 0.1)",
            "rgba(255, 228, 43, 0.1)",
            "rgba(230, 42, 90, 0.1)",
            "rgba(255, 140, 43, 0.1)"
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

export const bigChartLines = {
  data: (chartLine, chartLine2, chartLine3, chartLine4, label) => {
    return {
      labels: label,
      datasets: [
        {
          label: "Saldo",
          fill: true,
          backgroundColor: "#f5f5f5",
          borderColor: "#2DA9FC",
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: "#427BFF",
          pointBorderColor: "rgba(255,255,255,0)",
          pointHoverBackgroundColor: "#427BFF",
          pointBorderWidth: 10,
          pointHoverRadius: 2,
          pointHoverBorderWidth: 7.5,
          pointRadius: 2,
          data: chartLine
        },
        {
          label: "SaldoPrev",
          fill: true,
          backgroundColor: "#f5f5f5",
          borderColor: "#F5CB09",
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: "#FFA70E",
          pointBorderColor: "rgba(255,255,255,0)",
          pointHoverBackgroundColor: "#FFA70E",
          pointBorderWidth: 10,
          pointHoverRadius: 2,
          pointHoverBorderWidth: 7.5,
          pointRadius: 2,
          data: chartLine2
        },
        {
          label: "Saída",
          fill: true,
          backgroundColor: "#f5f5f5",
          borderColor: "#F05151",
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: "#F00501",
          pointBorderColor: "rgba(255,255,255,0)",
          pointHoverBackgroundColor: "#F00501",
          pointBorderWidth: 10,
          pointHoverRadius: 2,
          pointHoverBorderWidth: 7.5,
          pointRadius: 2,
          data: chartLine3
        },
        {
          label: "Entrada",
          fill: true,
          backgroundColor: "#f5f5f5",
          borderColor: "#72F54E",
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: "#5CC23F",
          pointBorderColor: "rgba(255,255,255,0)",
          pointHoverBackgroundColor: "#5CC23F",
          pointBorderWidth: 10,
          pointHoverRadius: 2,
          pointHoverBorderWidth: 7.5,
          pointRadius: 2,
          data: chartLine4
        }
      ]
    };
  },
  options: {
    plugins: {
      autocolors: false,
      annotation: {
        annotations: {
          line1: {
            type: "line",
            yMin: 0,
            yMax: 0,
            borderColor: "rgb(255, 99, 132)",
            borderWidth: 2
          }
        }
      }
    },
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
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: "rgba(29,140,248,0.0)",
            zeroLineColor: "transparent"
          },
          ticks: {
            suggestedMin: 60,
            suggestedMax: 125,
            padding: 20,
            fontColor: "#9a9a9a"
          }
        }
      ],
      xAxes: [
        {
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: "rgba(29,140,248,0.1)",
            zeroLineColor: "transparent"
          },
          ticks: {
            padding: 20,
            fontColor: "#9a9a9a"
          }
        }
      ]
    }
  }
};

export const barCharts = {
  options: {
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
  },
  orangeBarChart: (label, chartData) => {
    return {
      labels: label,
      datasets: [
        {
          label: "Parcelas",
          fill: true,
          backgroundColor: "rgba(72,72,176,0.1)",
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
  redBarChart: (label, chartData) => {
    return {
      labels: label,
      datasets: [
        {
          label: "Parcelas",
          fill: true,
          backgroundColor: "rgba(72,72,176,0.1)",
          hoverBackgroundColor: "rgba(72,72,176,0.1)",
          borderColor: "#ff0000",
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          data: chartData
        }
      ]
    };
  },

  greenBarChart: (label, chartData) => {
    return {
      labels: label,
      datasets: [
        {
          label: "Parcelas",
          fill: true,
          backgroundColor: "rgba(72, 72, 176, 0.1)",
          hoverBackgroundColor: "rgba(72, 72, 176, 0.1)",
          borderColor: "#009933",
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          data: chartData
        }
      ]
    };
  }
};
