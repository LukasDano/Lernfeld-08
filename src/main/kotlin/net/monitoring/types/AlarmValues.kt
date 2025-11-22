package net.monitoring.types

import kotlinx.serialization.Serializable

@Serializable
data class AlarmValues(
    val cpu: String?,
    val mem: String?,
    val disk: String?,
)
