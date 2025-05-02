package com.example.myapplication.feature.clock.presentation.components

import android.os.Build
import androidx.annotation.RequiresApi
import androidx.compose.animation.animateColorAsState
import androidx.compose.animation.core.tween
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import java.time.LocalDateTime

@RequiresApi(Build.VERSION_CODES.O)
@Composable
fun BackgroundGradient(
    time: LocalDateTime,
    modifier: Modifier = Modifier
) {
    val hour = time.hour
    val colors = when (hour) {
        in 5..11 -> listOf(
            Color(0xFF1A237E), // Deep Blue
            Color(0xFF0D47A1)  // Royal Blue
        )
        in 12..16 -> listOf(
            Color(0xFF1976D2), // Light Blue
            Color(0xFF64B5F6)  // Sky Blue
        )
        in 17..20 -> listOf(
            Color(0xFF4527A0), // Deep Purple
            Color(0xFF7E57C2)  // Purple
        )
        else -> listOf(
            Color(0xFF000051), // Dark Blue
            Color(0xFF1A237E)  // Deep Blue
        )
    }

    val gradientColors by animateColorAsState(
        targetValue = colors.first(),
        animationSpec = tween(durationMillis = 1000),
        label = "gradientColors"
    )

    Box(
        modifier = modifier
            .fillMaxSize()
            .background(
                brush = Brush.verticalGradient(
                    colors = colors
                )
            )
    )
} 