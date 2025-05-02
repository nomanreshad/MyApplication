package com.example.myapplication.feature.clock.presentation

import android.os.Build
import androidx.annotation.RequiresApi
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch
import java.time.LocalDateTime

@RequiresApi(Build.VERSION_CODES.O)
class ClockViewModel : ViewModel() {
    private val _state = MutableStateFlow(ClockState())
    val state = _state.asStateFlow()

    init {
        startTimeUpdates()
    }

    @RequiresApi(Build.VERSION_CODES.O)
    private fun startTimeUpdates() {
        viewModelScope.launch {
            while (true) {
                _state.update { it.copy(
                    currentTime = LocalDateTime.now()
                ) }
                delay(1000) // Update every second
            }
        }
    }

    fun onAction(action: ClockAction) {
        when (action) {
            is ClockAction.Toggle24HourFormat -> {
                _state.update { it.copy(
                    is24HourFormat = !_state.value.is24HourFormat
                ) }
            }
            is ClockAction.ToggleAnalogClock -> {
                _state.update { it.copy(
                    showAnalogClock = !_state.value.showAnalogClock
                ) }
            }
            is ClockAction.ToggleDigitalClock -> {
                _state.update { it.copy(
                    showDigitalClock = !_state.value.showDigitalClock
                ) }
            }
            is ClockAction.ToggleDateDisplay -> {
                _state.update { it.copy(
                    showDate = !_state.value.showDate
                ) }
            }
            is ClockAction.UpdateTime -> {
                _state.update { it.copy(
                    currentTime = action.time
                ) }
            }
        }
    }
} 