const { jsx } = require("react/jsx-runtime");

/**
 * @returns {Promise<MonitoringValues>} Die aktuellen Werte aus dem Backend
 */
async function getMonitorValues() {
    const url = getCurrentURL();
    const response = await fetch( url + "monitor");
    const result = await response.json();

    return {
        cpu: result.cpu,
        mem: result.mem,
        disk: result.disk,
        uptime: result.uptime
    }
}

/**
 * Zieht die Headline aus dem Backend und setzt sie in das entsprechende HTML Element
 * @returns {Promise<string>} Die Headline
 */
async function setHeadlineFormBackend() {
    const url = getCurrentURL();
    const response = await fetch( url + "headline");
    const headline = await response.text();

    document.title = headline;
    const element = document.getElementById("PageHeadline");
    element.textContent = headline;
    return headline;
}

/**
 * @returns {Promise<AlarmValues>} Die aktuellen Werte aus dem Backend
 */
async function getAlarmValues() {
    const url = getCurrentURL();
    const response = await fetch( url + "alarme");
    const result = await response.json();

    return {
        alarmCpu: result.cpu,
        alarmMem: result.mem,
        alarmDisk: result.disk
    }
}

/**
 * @returns {Promise<AlarmDatabaseEntries>} Die aktuellen Werte aus der Datenbank
 */
async function getAlarmsInDatabase() {
    const url = getCurrentURL();
    const response = await fetch( url + "database/alarms")
    return await response.json();
}

/**
 * Schreibt die Werte aus der Datenbank in die Browser-Konsole
 */
function printAlarmsInDatabase() {
    const url = getCurrentURL();
    fetch( url + "database/alarms").then(response => response.json()).then(result => console.log(result));
}