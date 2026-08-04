// =====================================
// LINE CHART BUILDER
// =====================================

// Get elements

const dataInputs = document.getElementById("dataInputs");

const addRowButton = document.getElementById("addRow");

const resetButton = document.getElementById("resetChart");

const highestText = document.getElementById("highest");

const lowestText = document.getElementById("lowest");

const trendText = document.getElementById("trend");

const changeText = document.getElementById("change");

const interpretationText = document.getElementById("interpretationText");

const canvas = document.getElementById("lineChart");

// Chart variable

let lineChart;

// =====================================
// CREATE INITIAL ROW
// =====================================

function createRow() {
  const row = document.createElement("div");

  row.className = "data-row";

  row.innerHTML = `

    <input 
      type="text"
      placeholder="Time Period"
      class="category-input"
    >


    <input
      type="number"
      placeholder="Value"
      class="value-input"
    >


    <button class="delete-row">
      ×
    </button>

  `;

  dataInputs.appendChild(row);

  attachEvents(row);
}

// =====================================
// ATTACH INPUT EVENTS
// =====================================

function attachEvents(row) {
  const inputs = row.querySelectorAll("input");

  inputs.forEach((input) => {
    input.addEventListener("input", updateChart);
  });

  const deleteButton = row.querySelector(".delete-row");

  deleteButton.addEventListener("click", () => {
    row.remove();

    updateChart();
  });
}

// =====================================
// GET DATA
// =====================================

function getData() {
  const rows = document.querySelectorAll(".data-row");

  let labels = [];

  let values = [];

  rows.forEach((row) => {
    const category = row.querySelector(".category-input").value;

    const value = Number(row.querySelector(".value-input").value);

    if (category && !isNaN(value)) {
      labels.push(category);

      values.push(value);
    }
  });

  return {
    labels,
    values,
  };
}

// =====================================
// CREATE CHART
// =====================================

function createChart() {
  lineChart = new Chart(canvas, {
    type: "line",

    data: {
      labels: [],

      datasets: [
        {
          label: "Data Values",

          data: [],

          borderColor: "#2563eb",

          backgroundColor: "rgba(37,99,235,0.15)",

          borderWidth: 3,

          tension: 0.4,

          fill: true,

          pointRadius: 6,

          pointBackgroundColor: "#2563eb",
        },
      ],
    },

    options: {
      responsive: true,

      maintainAspectRatio: false,

      scales: {
        y: {
          beginAtZero: true,
        },
      },

      plugins: {
        legend: {
          display: true,
        },
      },
    },
  });
}

// =====================================
// UPDATE CHART
// =====================================

function updateChart() {
  const data = getData();

  lineChart.data.labels = data.labels;

  lineChart.data.datasets[0].data = data.values;

  lineChart.update();

  updateAnalysis(data.labels, data.values);
}

// =====================================
// ANALYSIS
// =====================================

function updateAnalysis(labels, values) {
  if (values.length === 0) {
    highestText.textContent = "-";

    lowestText.textContent = "-";

    trendText.textContent = "-";

    changeText.textContent = "-";

    interpretationText.textContent = "Add data to analyse your line chart.";

    return;
  }

  const max = Math.max(...values);

  const min = Math.min(...values);

  const maxIndex = values.indexOf(max);

  const minIndex = values.indexOf(min);

  highestText.textContent = `${labels[maxIndex]} (${max})`;

  lowestText.textContent = `${labels[minIndex]} (${min})`;

  const change = values[values.length - 1] - values[0];

  changeText.textContent = change > 0 ? `+${change}` : change;

  let trend;

  if (change > 0) {
    trend = "Increasing";
  } else if (change < 0) {
    trend = "Decreasing";
  } else {
    trend = "No Change";
  }

  trendText.textContent = trend;

  interpretationText.textContent = `The chart shows an ${trend.toLowerCase()} trend. 
    The value changed from ${values[0]} 
    to ${values[values.length - 1]}, 
    giving an overall change of ${change}.`;
}

// =====================================
// RESET
// =====================================

function resetChart() {
  dataInputs.innerHTML = "";

  createRow();

  lineChart.data.labels = [];

  lineChart.data.datasets[0].data = [];

  lineChart.update();

  updateAnalysis([], []);
}

// =====================================
// BUTTON EVENTS
// =====================================

addRowButton.addEventListener("click", createRow);

resetButton.addEventListener("click", resetChart);

// =====================================
// START APPLICATION
// =====================================

createRow();

createChart();
