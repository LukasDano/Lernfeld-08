package net.monitoring.utils

import net.monitoring.types.AlarmValues
import net.monitoring.types.MonitoringValues

class Alarme {
    fun checkForCriticalValues(currentValues: MonitoringValues): AlarmValues {
        return AlarmValues(
            cpu = checkCPU(currentValues.cpu),
            mem = checkMemory(currentValues.mem),
            disk = checkDisk(currentValues.disk)
        )
    }

    private fun checkCPU(cpu: Double): String? {
        if (cpu >= 90) {
            val message = "CPU IST ZU ÜBER 90% AUSGELASTET"

            Logger().logAlarmValuesAsCSV(
                alarmType = "CPU",
                value = cpu.toString(),
                message = message
            )

            return message
        }
        else return null
    }

    private fun checkMemory(mem: Double): String? {
        if (mem >= 90) {
            val message = "ARBEITSSPEICHER IST ZU ÜBER 90% AUSGELASTET"

            Logger().logAlarmValuesAsCSV(
                alarmType = "MEM",
                value = mem.toString(),
                message = message
            )

            return message
        }
        else return null
    }

    private fun checkDisk(disk: Double): String? {
        if (disk >= 90) {
            val message = "SPEICHERPLATZ IST ZU ÜBER 90% BELEGT"

            Logger().logAlarmValuesAsCSV(
                alarmType = "DISK",
                value = disk.toString(),
                message = message
            )

            return message
        }
        else return null
    }
}