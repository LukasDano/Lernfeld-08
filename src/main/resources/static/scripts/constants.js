/** @type {ChartInfos} */
const memoryChart = {
    "class": ".mem-usage-chart",
    "chartName": "Memory Usage",
    "graphColor": "#4800ff", //TODO: Hier Frabe anpassen
    "xText": "Zeit (S)",
    "yText": "Memory (%)",
    "type": "mem"
};

/** @type {ChartInfos} */
const cpuChart = {
    "class": ".cpu-usage-chart",
    "chartName": "CPU Usage",
    "graphColor": "#00ffd0", //TODO: Hier Frabe anpassen
    "xText": "Zeit (S)",
    "yText": "CPU (%)",
    "type": "cpu"
};

const notificationIcon = {
    "info": 'fa-solid fa-circle-info',
    "warning": 'fa-solid fa-triangle-exclamation',
    "error": 'fa-solid fa-circle-exclamation',
    "success": 'fa-solid fa-circle-check'
};

/** @type {{[key: string]: NotificationType}} */
const notificationTypes = {
    "info": 'info',
    "warning": 'warning',
    "error": 'error',
    "success": 'success'
};
