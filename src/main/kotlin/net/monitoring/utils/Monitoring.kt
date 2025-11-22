package net.monitoring.utils

import java.lang.management.ManagementFactory
import com.sun.management.OperatingSystemMXBean
import net.monitoring.types.MonitoringValues
import java.io.File

class Monitoring {

    data class DiskUsage(val total: Long, val used: Long, val free: Long, val percent: Double)

    private fun getCpuLoad(): Double {
        val osBean = ManagementFactory.getPlatformMXBean(
            OperatingSystemMXBean::class.java
        )
        return osBean.cpuLoad * 100
    }

    private fun getMemoryUsagePercent(): Double {
        val osBean = ManagementFactory.getPlatformMXBean(
            OperatingSystemMXBean::class.java
        )
        val total = osBean.totalMemorySize.toDouble()
        val free = osBean.freeMemorySize.toDouble()

        return (1 - (free / total)) * 100
    }

    private fun getDiskUsage(path: String = "/"): DiskUsage {
        val file = File(path)
        val total = file.totalSpace
        val free = file.freeSpace
        val used = total - free
        val percent = used.toDouble() / total.toDouble() * 100

        return DiskUsage(total, used, free, percent)
    }

    private fun getUptimeSeconds(): Long {
        return System.currentTimeMillis() / 1000 -
                ManagementFactory.getRuntimeMXBean().startTime / 1000
    }

    fun getMonitoringValues(): MonitoringValues {
        return MonitoringValues(
            cpu = getCpuLoad(),
            mem = getMemoryUsagePercent(),
            disk = getDiskUsage().percent,
            uptime = getUptimeSeconds()
        )
    }
}