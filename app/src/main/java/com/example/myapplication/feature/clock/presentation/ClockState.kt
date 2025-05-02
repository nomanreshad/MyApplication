package com.example.myapplication.feature.clock.presentation

import android.os.Build
import androidx.annotation.RequiresApi
import java.time.LocalDateTime

@RequiresApi(Build.VERSION_CODES.O)
data class ClockState(
    val currentTime: LocalDateTime = LocalDateTime.now(),
    val is24HourFormat: Boolean = true,
    val showAnalogClock: Boolean = true,
    val showDigitalClock: Boolean = true,
    val showDate: Boolean = true,
    val backgroundColor: Long = 0xFF000000 // Will be used for gradient background
) 