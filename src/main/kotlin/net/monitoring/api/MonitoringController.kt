package net.monitoring.api

import kotlinx.serialization.json.Json
import net.monitoring.utils.Alarme
import net.monitoring.utils.Logger
import net.monitoring.utils.Monitoring
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class MonitoringController {

    @GetMapping("/monitor")
    fun getMonitoring(): String {
        val monitoringValues  = Monitoring().getMonitoringValues()
        return Json.encodeToString(monitoringValues)
    }

    @GetMapping("/alarme")
    fun getAlarme(): String {
        val monitoringValues  = Monitoring().getMonitoringValues()
        val alarmValues = Alarme().checkForCriticalValues(monitoringValues)
        return Json.encodeToString(alarmValues)
    }

    @GetMapping("/monitor/log")
    fun getMonitoringAndLogValues(): String {
        val monitoringValues  = Monitoring().getMonitoringValues()
        Logger().logMonitoringValuesAsCSV(monitoringValues)
        return Json.encodeToString(monitoringValues)
    }
}