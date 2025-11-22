/**
 * @returns {string} Den HTML Code für das Modal Komponente
 */
function databaseView() {
    return `
        <div class="databaseOverlay" id="databaseOverlay"></div>
        <div class="database-form" id="database-form">
            <form class="form-container">
                <span class="close" onclick="closeDatabaseView()">&times;</span>
                <h1>Alarm Database</h1>

                <div class="text-center scrollable" id="alarms"></div>

            </form>
        </div>
    `;
}

async function createHTMLTableForAlarmsDatabase() {
    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");

    table.classList.add("custom-table");

    const thTimeStamp = document.createElement("th");
    thTimeStamp.textContent = "Timestamp";
    headerRow.appendChild(thTimeStamp);

    const thType = document.createElement("th");
    thType.textContent = "Type";
    headerRow.appendChild(thType);

    const thValue = document.createElement("th");
    thValue.textContent = "Value";
    headerRow.appendChild(thValue);

    const thMessage = document.createElement("th");
    thMessage.textContent = "Message";
    headerRow.appendChild(thMessage);

    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");

    const databaseValues = await getAlarmsInDatabase();

    databaseValues.forEach((alarm) => {
        const [timestamp, type, value, message] = alarm;
        const row = document.createElement("tr");

        const tdTimestamp = document.createElement("td");
        tdTimestamp.textContent = timestamp;

        const tdType = document.createElement("td");
        tdType.textContent = type;

        const tdValue = document.createElement("td");
        tdValue.textContent = value;

        const tdMessage = document.createElement("td");
        tdMessage.textContent = message;

        row.appendChild(tdTimestamp);
        row.appendChild(tdType);
        row.appendChild(tdValue);
        row.appendChild(tdMessage);

        tbody.appendChild(row);
    });

    table.appendChild(tbody);

    const shortcuts = document.getElementById("alarms");
    if (!shortcuts) return
    
    shortcuts.innerHTML = "";
    shortcuts.appendChild(table);
}

async function openDatabaseView() {
    document.getElementById("databaseOverlay").style.display = "block";
    document.getElementById("database-form").style.display = "block";

    await createHTMLTableForAlarmsDatabase();

    document.getElementById("databaseOverlay").addEventListener("pointerdown", () => {
        closeDatabaseView();
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            event.preventDefault();
            closeDatabaseView();
        }
    });

}

function closeDatabaseView() {
    document.getElementById("databaseOverlay").style.display = "none";
    document.getElementById("database-form").style.display = "none";
}

function setUpDatabaseView() {
    const databaseViewContainer = document.getElementById("databaseView");
    databaseViewContainer.innerHTML = databaseView();
}