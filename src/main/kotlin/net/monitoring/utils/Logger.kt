package net.monitoring.utils

import net.monitoring.types.MonitoringValues
import java.nio.file.Path
import java.nio.file.Files
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter

class Logger {

    private val monitoringHeader = listOf("Timestamp", "CPU (%)", "Memory (%)", "Disk (%)", "Uptime")
    private val alarmeHeader = listOf("Timestamp", "alarm_type", "value", "message")

    /** Erstellt CSV-Datei, wenn sie fehlt, und schreibt die Kopfzeile **/
    private fun createCSVFileIfDoesntExists(filePath: Path, header: List<String>) {
        val file = filePath.toFile()

        if (!file.exists()) {
            file.parentFile?.mkdirs()
            file.createNewFile()

            // Header schreiben
            Files.newBufferedWriter(filePath).use { writer ->
                writer.write(header.joinToString(","))
                writer.newLine()
            }
        }
    }

    /** Fügt eine Messzeile hinzu */
    fun logMonitoringValuesAsCSV(logValues: MonitoringValues, filePath: Path = Path.of("csv/status_log.csv")) {
        createCSVFileIfDoesntExists(filePath = filePath, header = monitoringHeader)

        val timestamp = LocalDateTime.now()
            .format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"))

        val csvLine = listOf(
            timestamp,
            logValues.cpu.toString(),
            logValues.mem.toString(),
            logValues.disk.toString(),
            logValues.uptime.toString()
        ).joinToString(",")

        Files.newBufferedWriter(filePath, Charsets.UTF_8, java.nio.file.StandardOpenOption.APPEND).use { writer ->
            writer.write(csvLine)
            writer.newLine()
        }
    }

    /** Fügt eine Messzeile hinzu */
    fun logAlarmValuesAsCSV(alarmType: String, value: String, message: String, filePath: Path = Path.of("csv/alarm_log.csv")) {
        createCSVFileIfDoesntExists(filePath = filePath, header = alarmeHeader)

        val timestamp = LocalDateTime.now()
            .format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"))

        val csvLine = listOf(
            timestamp,
            alarmType,
            value,
            message,
        ).joinToString(",")

        Files.newBufferedWriter(filePath, Charsets.UTF_8, java.nio.file.StandardOpenOption.APPEND).use { writer ->
            writer.write(csvLine)
            writer.newLine()
        }
    }
}
