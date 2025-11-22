/**
 * Erstellt die Tabelle in dem entsprechenden Container
 */
function setUpOnStart() {
    const element = document.getElementById("MonitorTable");
    element.appendChild(createSimpleTable());
}

/**
 * Zeigt alle aktuellen Werte aus dem Backend in der Tabelle an
 */
async function setValuesInTable() {
    const result = await getMonitorValues();

    const cpuColumn = document.getElementById("cpuColumn");
    const memColumn = document.getElementById("memColumn");
    const diskColumn = document.getElementById("diskColumn");
    const uptimeColumn = document.getElementById("uptimeColumn");

    const cpu = result.cpu;
    const mem = result.mem;
    const disk = result.disk;
    const uptime = result.uptime;

    cpuColumn.textContent = cpu.toString();
    memColumn.textContent = mem.toString();
    diskColumn.textContent = disk.toString();
    uptimeColumn.textContent = uptime.toString();
}

/**
 * Prüft auf Alarme und sendet eine Notification, wenn nötig
 */
async function checkForAlarms(){
    const alarmValues = await getAlarmValues();

    Object.entries(alarmValues).forEach(([_, value]) => {
        showAlarmNotificationIfNeeded(value);
    });
}

/**
 * Schickt eine Alarm-Notification wenn nötig
 * @param {string} alarmText Der Text der in der Fehlermeldung angezeigt werden soll
 */
function showAlarmNotificationIfNeeded(alarmText) {
    if (alarmText === null) return;

    const config = {
        type: notificationTypes.error,
        text: alarmText
    }

    if (typeof(alarmText) === "string") sendNotification(config);
}

function getCurrentURL() {
    const url = window.location.href;
    const urlParts = url.split("/");
    return urlParts[0];
}

function setUpKeyBoardControl() {
    document.addEventListener("keydown", (event) => {
        if (event.key === "F1") {
            event.preventDefault();
            openDatabaseView();
        }
    });
}
