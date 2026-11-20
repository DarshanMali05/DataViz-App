
let categories = [];
let values = [];
let myChart = null;

function addData() {
    let category = document.getElementById("category").value.trim();
    let value = Number(document.getElementById("value").value);

    if (category === "" || document.getElementById("value").value === "" || !Number.isFinite(value) || value < 0) {
        alert("Please enter a valid category and value.");
        return;
    }

    categories.push(category);
    values.push(value);

    document.getElementById("category").value = "";
    document.getElementById("value").value = "";

    updateTable();
    drawChart();
}

function updateTable() {
    let table = document.getElementById("dataTable");
    table.innerHTML = "";

    categories.forEach((category, index) => {
        table.innerHTML += `
            <tr>
                <td>${category.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;")}</td>
                <td>${values[index]}</td>
                <td>
                    <button onclick="deleteData(${index})">Delete</button>
                </td>
            </tr>
        `;
    });
}

function deleteData(index) {
    categories.splice(index, 1);
    values.splice(index, 1);

    updateTable();
    drawChart();
}

function drawChart() {
    const ctx = document.getElementById("myChart");
    const type = document.getElementById("chartType").value;

    if (myChart) {
        myChart.destroy();
    }

    if (categories.length === 0) {
        return;
    }

    myChart = new Chart(ctx, {
        type: type,
        data: {
            labels: categories,
            datasets: [{
                label: "Values",
                data: values,
                backgroundColor: [
                    "#2563eb",
                    "#f97316",
                    "#16a34a",
                    "#9333ea",
                    "#eab308",
                    "#ec4899"
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: type === "pie"
                }
            }
        }
    });
}
