package net.monitoring.types

import kotlinx.serialization.Serializable

@Serializable
data class MonitoringValues(
    val cpu: Double,
    val mem: Double,
    val disk: Double,
    val uptime: Long,
)
