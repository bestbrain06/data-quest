// ===============================
// BAR CHART BUILDER
// ===============================

// Select elements

const dataInputs = document.getElementById("dataInputs");

const addRowButton = document.getElementById("addRow");

const resetButton = document.getElementById("resetChart");

const highestDisplay = document.getElementById("highest");

const lowestDisplay = document.getElementById("lowest");

const differenceDisplay = document.getElementById("difference");

const totalDisplay = document.getElementById("total");

const interpretationText = document.getElementById("interpretationText");

const chartCanvas = document.getElementById("barChart");

// Store chart

let barChart;

// ===============================
// CREATE DATA ROW
// ===============================

function createDataRow(category = "", value = "") {
  const row = document.createElement("div");

  row.classList.add("data-row");

  row.innerHTML = `

    <input 
      type="text" 
      class="category-input"
      placeholder="Category"
      value="${category}"
    >


    <input 
      type="number"
      class="value-input"
      placeholder="Value"
      value="${value}"
    >


    <button class="delete-row">
      ✕
    </button>

  `;

  dataInputs.appendChild(row);

  // Listen for changes

  row.querySelectorAll("input").forEach((input) => {
    input.addEventListener("input", updateChart);
  });

  // Delete button

  row.querySelector(".delete-row").addEventListener("click", () => {
    row.remove();

    updateChart();
  });
}

// ===============================
// GET DATA
// ===============================

function getChartData() {
  const rows = document.querySelectorAll(".data-row");

  let labels = [];

  let values = [];

  rows.forEach((row) => {
    const category = row.querySelector(".category-input").value;

    const value = Number(row.querySelector(".value-input").value);

    if (category !== "" && value > 0) {
      labels.push(category);

      values.push(value);
    }
  });

  return {
    labels,

    values,
  };
}

// ===============================
// CREATE / UPDATE CHART
// ===============================

function updateChart() {
  const data = getChartData();

  if (barChart) {
    barChart.destroy();
  }

  barChart = new Chart(chartCanvas, {
    type: "bar",

    data: {
      labels: data.labels,

      datasets: [
        {
          label: "Frequency",

          data: data.values,

          borderWidth: 1,
        },
      ],
    },

    options: {
      responsive: true,

      maintainAspectRatio: false,

      scales: {
        y: {
          beginAtZero: true,

          ticks: {
            precision: 0,
          },
        },
      },

      plugins: {
        legend: {
          display: true,
        },

        tooltip: {
          enabled: true,
        },
      },
    },
  });

  updateInterpretation(data.labels, data.values);
}

// ===============================
// INTERPRETATION
// ===============================

function updateInterpretation(labels, values) {
  if (values.length === 0) {
    highestDisplay.textContent = "-";

    lowestDisplay.textContent = "-";

    differenceDisplay.textContent = "-";

    totalDisplay.textContent = "-";

    interpretationText.textContent =
      "Enter data to generate an interpretation.";

    return;
  }

  let highestIndex = values.indexOf(Math.max(...values));

  let lowestIndex = values.indexOf(Math.min(...values));

  let highestValue = values[highestIndex];

  let lowestValue = values[lowestIndex];

  let difference = highestValue - lowestValue;

  let total = values.reduce((a, b) => a + b, 0);

  highestDisplay.textContent = `${labels[highestIndex]} (${highestValue})`;

  lowestDisplay.textContent = `${labels[lowestIndex]} (${lowestValue})`;

  differenceDisplay.textContent = difference;

  totalDisplay.textContent = total;

  interpretationText.innerHTML = `

<strong>${labels[highestIndex]}</strong>
has the highest frequency with 
<strong>${highestValue}</strong>.


<br><br>


<strong>${labels[lowestIndex]}</strong>
has the lowest frequency with
<strong>${lowestValue}</strong>.


<br><br>


The difference between the highest and lowest values is
<strong>${difference}</strong>.


<br><br>


A total of
<strong>${total}</strong>
items were recorded.

`;
}

// ===============================
// BUTTON EVENTS
// ===============================

addRowButton.addEventListener("click", () => {
  createDataRow();
});

resetButton.addEventListener("click", () => {
  dataInputs.innerHTML = "";

  createDataRow();

  updateChart();
});

// ===============================
// INITIAL DATA
// ===============================

createDataRow("Mathematics", 20);

createDataRow("Science", 15);

createDataRow("English", 10);

createDataRow("ICT", 5);

updateChart();
