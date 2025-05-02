package com.example.myapplication.feature.clock.presentation

import java.time.LocalDateTime

sealed interface ClockAction {
    data object Toggle24HourFormat : ClockAction
    data object ToggleAnalogClock : ClockAction
    data object ToggleDigitalClock : ClockAction
    data object ToggleDateDisplay : ClockAction
    data class UpdateTime(val time: LocalDateTime) : ClockAction
}