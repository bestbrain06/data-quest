// ===============================
// PIE CHART BUILDER
// ===============================

// Register Chart.js datalabel plugin
Chart.register(ChartDataLabels);

const pieCanvas = document.getElementById("pieChart");

let pieChart;

// Default colours
const chartColors = [
  "#2563eb",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#06b6d4",
  "#ec4899",
  "#84cc16",
];

// ===============================
// GET DATA FROM INPUTS
// ===============================

function getData() {
  const rows = document.querySelectorAll(".data-row");

  let labels = [];
  let values = [];

  rows.forEach((row) => {
    const category = row.querySelector(".category-input").value.trim();

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
// CREATE / UPDATE PIE CHART
// ===============================

function createPieChart(labels, values) {
  if (pieChart) {
    pieChart.destroy();
  }

  pieChart = new Chart(pieCanvas, {
    type: "pie",

    data: {
      labels: labels,

      datasets: [
        {
          data: values,

          backgroundColor: labels.map(
            (_, index) => chartColors[index % chartColors.length],
          ),

          borderWidth: 2,

          borderColor: "#ffffff",
        },
      ],
    },

    options: {
      responsive: true,

      maintainAspectRatio: true,

      plugins: {
        legend: {
          position: "bottom",
        },

        datalabels: {
          color: "#ffffff",

          font: {
            weight: "bold",

            size: 14,
          },

          formatter: (value, context) => {
            const total = context.dataset.data.reduce((a, b) => a + b, 0);

            const percentage = ((value / total) * 100).toFixed(1);

            return `${context.chart.data.labels[context.dataIndex]}\n${percentage}%`;
          },
        },

        tooltip: {
          callbacks: {
            label: function (context) {
              const total = values.reduce((a, b) => a + b, 0);

              const percent = ((context.raw / total) * 100).toFixed(1);

              return `${context.label}: ${context.raw} (${percent}%)`;
            },
          },
        },
      },
    },
  });
}

// ===============================
// UPDATE CALCULATION TABLE
// ===============================

function updateTable(labels, values) {
  const tbody = document.querySelector("#calculationTable tbody");

  tbody.innerHTML = "";

  const total = values.reduce((a, b) => a + b, 0);

  labels.forEach((label, index) => {
    const frequency = values[index];

    const percentage = ((frequency / total) * 100).toFixed(1);

    const angle = ((frequency / total) * 360).toFixed(1);

    tbody.innerHTML += `

        <tr>

            <td>${label}</td>

            <td>${frequency}</td>

            <td>${percentage}%</td>

            <td>${angle}°</td>

        </tr>

        `;
  });
}

// ===============================
// UPDATE INTERPRETATION
// ===============================

function updateInterpretation(labels, values) {
  const total = values.reduce((a, b) => a + b, 0);

  const largest = Math.max(...values);

  const smallest = Math.min(...values);

  const largestIndex = values.indexOf(largest);

  const smallestIndex = values.indexOf(smallest);

  const largestAngle = ((largest / total) * 360).toFixed(1);

  document.getElementById("totalFrequency").textContent = total;

  document.getElementById("largestSector").textContent =
    `${labels[largestIndex]} (${largest})`;

  document.getElementById("smallestSector").textContent =
    `${labels[smallestIndex]} (${smallest})`;

  document.getElementById("largestAngle").textContent = `${largestAngle}°`;

  document.getElementById("pieInsight").innerHTML = `

    <strong>${labels[largestIndex]}</strong>
    has the largest sector because it has the highest frequency.

    <br><br>

    It represents 

    <strong>
    ${((largest / total) * 100).toFixed(1)}%
    </strong>

    of the whole data.

    `;
}

// ===============================
// CREATE QUESTIONS
// ===============================

function generateChallenge(labels, values) {
  const total = values.reduce((a, b) => a + b, 0);

  const largest = Math.max(...values);

  const largestName = labels[values.indexOf(largest)];

  const smallest = Math.min(...values);

  const smallestName = labels[values.indexOf(smallest)];

  document.getElementById("challengeContainer").innerHTML = `


    <div class="challenge-card">

    <p>
    Which category has the largest sector?
    </p>

    <strong>
    ${largestName}
    </strong>

    </div>



    <div class="challenge-card">

    <p>
    Which category has the smallest sector?
    </p>

    <strong>
    ${smallestName}
    </strong>

    </div>



    <div class="challenge-card">

    <p>
    What percentage of the data belongs to ${largestName}?
    </p>


    <strong>
    ${((largest / total) * 100).toFixed(1)}%
    </strong>


    </div>


    `;
}

// ===============================
// MASTER UPDATE FUNCTION
// ===============================

function updateEverything() {
  const { labels, values } = getData();

  if (values.length === 0) {
    return;
  }

  createPieChart(labels, values);

  updateTable(labels, values);

  updateInterpretation(labels, values);

  generateChallenge(labels, values);
}

// ===============================
// ADD CATEGORY
// ===============================

document.getElementById("addRow").addEventListener("click", () => {
  const container = document.getElementById("dataInputs");

  container.insertAdjacentHTML(
    "beforeend",

    `

        <div class="data-row">


        <input 
        type="text"
        placeholder="Category"
        class="category-input"
        >


        <input
        type="number"
        placeholder="Frequency"
        class="value-input"
        >


        </div>

        `,
  );
});

// ===============================
// RESET
// ===============================

document.getElementById("resetChart").addEventListener("click", () => {
  document.getElementById("dataInputs").innerHTML = `


    <div class="data-row">


    <input 
    type="text"
    placeholder="Category"
    class="category-input"
    >


    <input
    type="number"
    placeholder="Frequency"
    class="value-input"
    >


    </div>


    `;

  if (pieChart) {
    pieChart.destroy();
  }

  document.querySelector("#calculationTable tbody").innerHTML = "";
});

// ===============================
// LIVE UPDATE
// ===============================

document.addEventListener("input", updateEverything);

// Initial load
updateEverything();
