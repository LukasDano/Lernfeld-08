/**
 * @returns {HTMLTableElement} Das Tabellen-Element
 */
function createSimpleTable() {
    const table = document.createElement("table");
    table.classList.add("custom-table");

    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");

    const headers = ["CPU Usage", "Memory Usage", "Disk Usage", "Uptime"];
    headers.forEach(text => {
        const th = document.createElement("th");
        th.textContent = text;
        headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");
    const valueRow = document.createElement("tr");

    ["cpuColumn", "memColumn", "diskColumn", "uptimeColumn"].forEach(id => {
        const td = document.createElement("td");
        td.id = id;
        valueRow.appendChild(td);
    });

    tbody.appendChild(valueRow);
    table.appendChild(tbody);

    return table;
}

/**
 * Erstellt die Komponente, um den Festplatten speicher anzuzeigen
 */
async function createDiskspaceChart() {
    const container = document.querySelector(".diskspace-chart");

    const monitorValues = await getMonitorValues();
    const labels = ["OCCUPIED", "FREE"];
    const data = [monitorValues.disk, (100 - monitorValues.disk)];

    new Chart(container, {
        type: "doughnut",
        data: {
            labels: labels,
            datasets: [{
                label: "Disk Usage",
                data: data,
                backgroundColor: ["#00ffff", "#5100ff"], //TODO: Hier Frabe anpassen
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                },
                title: {
                    display: true,
                    text: 'Disk Usage'
                }
            }
        }
    });
}

/**
 * Erstellt die Komponente, um einen bestimmten Wert in einem Diagramm anzuzeigen
 * @param {ChartInfos} chartInfos Alle benötigten Informationen, um ein Line Chart zu erstellen
 */
async function createLineChart(chartInfos) {
    const container = document.querySelector(chartInfos.class);

    const labels = [];
    const data = {
        labels: labels,
        datasets: [{
            label: chartInfos.chartName,
            data: [],
            borderColor: chartInfos.graphColor,
            tension: 0.1
        }]
    };

    const config = {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            animation: false,
            maintainAspectRatio: false,
            scales: {
                x: {
                    title: { display: true, text: chartInfos.xText }
                },
                y: {
                    beginAtZero: true,
                    title: { display: true, text: chartInfos.yText }
                }
            }
        }
    };

    const myChart = new Chart(container, config);
    let seconds = 2.5;

    setTimeout(() => {
        setInterval(async () => {
            const monitorValues = await getMonitorValues();

            const graphValues = {
                "mem": monitorValues.mem,
                "cpu": monitorValues.cpu
            };

            if (graphValues[chartInfos.type] > 50 && !getBooleanCookie(chartInfos.type)) {
                const config = {
                    type: notificationTypes.warning,
                    text: chartInfos.type + " ist über 50% ausgelastet"
                }
                setCookieForOneMinute(chartInfos.type, true);
                sendNotification(config)
            }

            labels.push(seconds.toFixed(1) + 's');
            data.datasets[0].data.push(graphValues[chartInfos.type]);

            if (labels.length > 30) {
                labels.shift();
                data.datasets[0].data.shift();
            }

            myChart.update();
            seconds += 0.5;
        }, 500);
    }, 2500);
}
