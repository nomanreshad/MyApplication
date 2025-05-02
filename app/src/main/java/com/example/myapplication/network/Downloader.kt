package com.example.myapplication.network

import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.Job
import kotlinx.coroutines.cancelAndJoin
import kotlinx.coroutines.coroutineScope
import kotlinx.coroutines.delay
import kotlinx.coroutines.isActive
import kotlinx.coroutines.joinAll
import kotlinx.coroutines.launch
import kotlinx.coroutines.sync.Mutex
import kotlinx.coroutines.withContext
import okhttp3.OkHttpClient
import okhttp3.Request
import java.io.File
import java.io.FileOutputStream
import java.io.RandomAccessFile
import java.util.concurrent.atomic.AtomicLong

class Downloader {

    companion object {
        val videoUrl = mapOf(
            "video1" to "https://www.xnxx.com/video-1coxiz17/max_fills_ultimate_curve_appeal",
            "video2" to "https://www.xnxx.com/video-1d1wy9aa/curvy_hotwife_knew_this_was_just_sex_but_she_loved_it_too_much",
            "video3" to "https://www.xnxx.com/video-1c19u513/reality_kings_-_nika_venom_damion_dayski_-_my_tits_can_t_fit"
        )
    }

    suspend fun downloadVideo(
        url: String,
        outputPath: String
    ) = withContext(Dispatchers.IO) {
        val client = OkHttpClient()

        val request = Request.Builder()
            .url(url)
            .build()

        println("Starting download...")

        client.newCall(request).execute().use { response ->
            if (!response.isSuccessful) throw Exception("Failed to download file: ${response.code}")

            val inputStream = response.body?.byteStream()
            val outputFile = File(outputPath)
            val outputStream = FileOutputStream(outputFile)

            val buffer = ByteArray(8 * 1024) // 8KB buffer for fast speed
            var bytesRead: Int

            inputStream.use { input ->
                outputStream.use { output ->
                    while (input?.read(buffer).also { bytesRead = it ?: -1 } != -1) {
                        output.write(buffer, 0, bytesRead)
                    }
                    output.flush()
                }
            }

            println("Download completed! Saved to $outputPath")
        }
    }

    suspend fun parallelDownload(
        url: String,
        outputPath: String,
        numberOfThreads: Int
    ) = withContext(Dispatchers.IO) {
        val client = OkHttpClient()

        // Get file size
        val headRequest = Request.Builder()
            .url(url)
            .head()
            .build()

        val contentLength = client.newCall(headRequest).execute().use { response ->
            response.header("Content-Length")?.toLongOrNull()
        } ?: throw Exception("Couldn't fetch content length!")

        println("Total file size: $contentLength bytes")

        // Prepare output file
        val file = RandomAccessFile(outputPath, "rw")
        file.setLength(contentLength)
        file.close()

        val partSize = contentLength / numberOfThreads
        val downloadedBytes = AtomicLong(0)
        val mutex = Mutex()

        val progressJob = launch {
            while (isActive) {
                val progress = downloadedBytes.get() * 100 / contentLength
                print("\rDownloading: $progress% completed")
                delay(500)
            }
        }

        coroutineScope {
            val jobs = mutableListOf<Job>()

            for (i in 0 until numberOfThreads) {
                val start = i * partSize
                val end = if (i == numberOfThreads - 1) contentLength - 1 else (start + partSize - 1)

                val job = launch {
                    downloadPartWithProgress(client, url, outputPath, start, end, downloadedBytes, mutex, i)
                }
                jobs.add(job)
            }

            jobs.joinAll()
        }

        progressJob.cancelAndJoin()

        println("\nDownload completed successfully!")
    }

    private suspend fun downloadPartWithProgress(
        client: OkHttpClient,
        url: String,
        outputPath: String,
        start: Long,
        end: Long,
        downloadedBytes: AtomicLong,
        mutex: Mutex,
        partNumber: Int
    ) = withContext(Dispatchers.IO) {
        println("\nDownloading part $partNumber: bytes $start-$end")

        val request = Request.Builder()
            .url(url)
            .addHeader("Range", "bytes=$start-$end")
            .build()

        client.newCall(request).execute().use { response ->
            if (!response.isSuccessful) throw Exception("Failed to download part $partNumber: ${response.code}")

            val inputStream = response.body?.byteStream()
            val file = RandomAccessFile(outputPath, "rw")
            file.seek(start)

            val buffer = ByteArray(8 * 1024)
            var bytesRead: Int

            inputStream.use { input ->
                file.use { output ->
                    while (input?.read(buffer).also { bytesRead = it ?: -1 } != -1) {
                        output.write(buffer, 0, bytesRead)
                        downloadedBytes.addAndGet(bytesRead.toLong())
                    }
                }
            }
        }

        println("\nPart $partNumber downloaded.")
    }
}
