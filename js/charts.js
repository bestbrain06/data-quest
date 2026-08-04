// ===============================
// DATA REPRESENTATION CHARTS
// ===============================

// Wait until the page loads completely
document.addEventListener("DOMContentLoaded", function () {
  // ===============================
  // BAR CHART
  // ===============================

  const barChart = document.getElementById("barChart");

  if (barChart) {
    new Chart(barChart, {
      type: "bar",

      data: {
        labels: ["Mathematics", "Science", "English", "ICT"],

        datasets: [
          {
            label: "Number of Students",

            data: [20, 15, 10, 5],

            borderWidth: 1,
          },
        ],
      },

      options: {
        responsive: true,

        plugins: {
          title: {
            display: true,

            text: "Favourite Subjects of Students",
          },
        },

        scales: {
          y: {
            beginAtZero: true,

            title: {
              display: true,

              text: "Number of Students",
            },
          },

          x: {
            title: {
              display: true,

              text: "Subjects",
            },
          },
        },
      },
    });
  }

  // ===============================
  // PIE CHART WITH LABELS
  // ===============================

  const pieChart = document.getElementById("pieChart");

  if (pieChart) {
    new Chart(pieChart, {
      type: "pie",

      data: {
        labels: ["Reading", "Sports", "Music", "Gaming"],

        datasets: [
          {
            label: "Students",

            data: [
              40,

              30,

              20,

              10,
            ],

            borderWidth: 1,
          },
        ],
      },

      plugins: [ChartDataLabels],

      options: {
        responsive: true,

        plugins: {
          title: {
            display: true,

            text: "Favourite School Activities",
          },

          legend: {
            position: "right",
          },

          datalabels: {
            color: "#ffffff",

            font: {
              weight: "bold",

              size: 14,
            },

            formatter: function (value, context) {
              const total = context.dataset.data.reduce(
                (sum, number) => sum + number,

                0,
              );

              const percentage = ((value / total) * 100).toFixed(0);

              return (
                context.chart.data.labels[context.dataIndex] +
                "\n" +
                percentage +
                "%"
              );
            },
          },
        },
      },
    });
  }

  // ===============================
  // LINE GRAPH
  // ===============================

  const lineChart = document.getElementById("lineChart");

  if (lineChart) {
    new Chart(lineChart, {
      type: "line",

      data: {
        labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],

        datasets: [
          {
            label: "Temperature (°C)",

            data: [
              28,

              30,

              32,

              31,

              29,
            ],

            borderWidth: 2,

            tension: 0.3,
          },
        ],
      },

      options: {
        responsive: true,

        plugins: {
          title: {
            display: true,

            text: "Temperature Trend Over Five Days",
          },
        },

        scales: {
          y: {
            beginAtZero: false,
          },
        },
      },
    });
  }
});
