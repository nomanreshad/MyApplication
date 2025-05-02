package com.example.myapplication.feature.clock.presentation

import android.os.Build
import androidx.annotation.RequiresApi
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import androidx.lifecycle.viewmodel.compose.viewModel
import com.example.myapplication.feature.clock.presentation.components.AnalogClock
import com.example.myapplication.feature.clock.presentation.components.BackgroundGradient
import com.example.myapplication.feature.clock.presentation.components.DigitalClock
import com.example.myapplication.ui.theme.MyApplicationTheme

@RequiresApi(Build.VERSION_CODES.O)
@Composable
fun ClockScreenRoot(
    viewModel: ClockViewModel = viewModel()
) {
    val state by viewModel.state.collectAsStateWithLifecycle()

    ClockScreen(
        state = state,
        onAction = viewModel::onAction
    )
}

@RequiresApi(Build.VERSION_CODES.O)
@Composable
fun ClockScreen(
    state: ClockState,
    onAction: (ClockAction) -> Unit
) {
    Box(
        modifier = Modifier.fillMaxSize(),
        contentAlignment = Alignment.Center
    ) {
        BackgroundGradient(time = state.currentTime)
        
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(16.dp),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center
        ) {
            if (state.showAnalogClock) {
                AnalogClock(
                    time = state.currentTime,
                    modifier = Modifier.padding(bottom = 32.dp)
                )
            }
            
            if (state.showDigitalClock) {
                DigitalClock(
                    time = state.currentTime,
                    is24HourFormat = state.is24HourFormat
                )
            }
        }
    }
}

@RequiresApi(Build.VERSION_CODES.O)
@Preview
@Composable
private fun ClockScreenPreview() {
    MyApplicationTheme {
        ClockScreen(
            state = ClockState(
                is24HourFormat = false
            ),
            onAction = {}
        )
    }
}