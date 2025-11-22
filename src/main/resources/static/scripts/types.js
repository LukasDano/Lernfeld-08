/**
 * @typedef {"mem" | "cpu"} ChartType
 */

/**
 * @typedef {"info" | "warning" | "error" | "success"} NotificationType
 */

/**
 * @typedef {Object} MonitoringValues
 * @property {number} cpu
 * @property {number} mem
 * @property {number} uptime
 * @property {number[]} disk
 */

/**
 * @typedef {Object} ChartInfos
 * @property {string} class
 * @property {string} chartName
 * @property {string} graphColor
 * @property {string} xText
 * @property {string} yText
 * @property {ChartType} type
 */

/**
 * @typedef {Object} AlarmValues
 * @property {string} alarmCpu
 * @property {string} alarmMem
 * @property {string} alarmDisk
 */

/**
 * @typedef {Object} NotificationConfig
 * @property {NotificationType} type
 * @property {string} text
 */

/**
 * @typedef {[string, string, number, string]} AlarmDatabaseEntries
 */
