package com.example.myapplication.feature.clock.presentation.components

import android.os.Build
import androidx.annotation.RequiresApi
import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.animation.core.tween
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.layout.size
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.drawscope.DrawScope
import androidx.compose.ui.graphics.drawscope.rotate
import androidx.compose.ui.unit.dp
import java.time.LocalDateTime

@RequiresApi(Build.VERSION_CODES.O)
@Composable
fun AnalogClock(
    time: LocalDateTime,
    modifier: Modifier = Modifier,
    size: Float = 300f,
    color: Color = Color.White
) {
    val hourAngle by animateFloatAsState(
        targetValue = calculateHourAngle(time),
        animationSpec = tween(durationMillis = 300),
        label = "hourAngle"
    )
    
    val minuteAngle by animateFloatAsState(
        targetValue = calculateMinuteAngle(time),
        animationSpec = tween(durationMillis = 300),
        label = "minuteAngle"
    )
    
    val secondAngle by animateFloatAsState(
        targetValue = calculateSecondAngle(time),
        animationSpec = tween(durationMillis = 300),
        label = "secondAngle"
    )

    Canvas(
        modifier = modifier.size(size.dp)
    ) {
        // Draw clock face
        drawCircle(
            color = color.copy(alpha = 0.1f),
            radius = size / 2
        )

        // Draw hour markers
        for (i in 0..11) {
            rotate(i * 30f) {
                drawLine(
                    color = color,
                    start = Offset(0f, -size / 2 + 20f),
                    end = Offset(0f, -size / 2 + 40f),
                    strokeWidth = 4f,
                    cap = StrokeCap.Round
                )
            }
        }

        // Draw hands
        drawClockHand(
            angle = hourAngle,
            length = size * 0.4f,
            width = 8f,
            color = color
        )

        drawClockHand(
            angle = minuteAngle,
            length = size * 0.5f,
            width = 4f,
            color = color
        )

        drawClockHand(
            angle = secondAngle,
            length = size * 0.6f,
            width = 2f,
            color = color.copy(alpha = 0.8f)
        )
    }
}

private fun DrawScope.drawClockHand(
    angle: Float,
    length: Float,
    width: Float,
    color: Color
) {
    rotate(angle) {
        drawLine(
            color = color,
            start = Offset(0f, 0f),
            end = Offset(0f, -length),
            strokeWidth = width,
            cap = StrokeCap.Round
        )
    }
}

@RequiresApi(Build.VERSION_CODES.O)
private fun calculateHourAngle(time: LocalDateTime): Float {
    val hour = time.hour % 12
    val minute = time.minute
    return (hour * 30f) + (minute * 0.5f) // 30 degrees per hour + 0.5 degrees per minute
}

@RequiresApi(Build.VERSION_CODES.O)
private fun calculateMinuteAngle(time: LocalDateTime): Float {
    return time.minute * 6f // 6 degrees per minute
}

@RequiresApi(Build.VERSION_CODES.O)
private fun calculateSecondAngle(time: LocalDateTime): Float {
    return time.second * 6f // 6 degrees per second
}