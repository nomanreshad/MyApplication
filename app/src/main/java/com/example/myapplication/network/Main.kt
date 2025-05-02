package com.example.myapplication.network

import kotlinx.coroutines.runBlocking

fun main() = runBlocking {
    val videoUrl = Downloader.videoUrl["video1"]!!
    val outputPath = "downloaded_video.mp4"

    val downloader = Downloader()
    downloader.downloadVideo(videoUrl, outputPath)
}