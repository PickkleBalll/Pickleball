// File: AnalyzeController.cs (ASP.NET Core Web API)

using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using System.Text;
using System.Text.Json;

namespace PickleballVideoAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AnalyzeController : ControllerBase
    {
        const string ApiKey = "AIzaSyBzHUlC8XQSlOgxg30nGodJYgskpzvzEA0";
        const string GeminiUrl = "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=" + ApiKey;

        /// <summary>
        /// Upload a pickleball video and receive AI analysis.
        /// </summary>
        /// <param name="video">Video file (.mp4)</param>
        /// <returns>AI analysis result</returns>
        [HttpPost(Name = "AnalyzeVideo")]
        [ProducesResponseType(typeof(object), 200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> Analyze([FromForm] IFormFile video)
        {
            if (video == null || video.Length == 0)
                return BadRequest("Video khong hop le.");

            string tempDir = Path.GetTempPath();
            string videoPath = Path.Combine(tempDir, video.FileName);
            string framePath = Path.Combine(tempDir, "frame_001.jpg");

            using (var stream = new FileStream(videoPath, FileMode.Create))
            {
                await video.CopyToAsync(stream);
            }

            var ffmpeg = new Process();
            ffmpeg.StartInfo.FileName = "ffmpeg";
            ffmpeg.StartInfo.Arguments = $"-ss 00:00:00.5 -i \"{videoPath}\" -vframes 1 \"{framePath}\" -y";
            ffmpeg.StartInfo.RedirectStandardOutput = true;
            ffmpeg.StartInfo.RedirectStandardError = true;
            ffmpeg.StartInfo.UseShellExecute = false;
            ffmpeg.StartInfo.CreateNoWindow = true;
            ffmpeg.Start();
            string error = await ffmpeg.StandardError.ReadToEndAsync();
            ffmpeg.WaitForExit();

            if (!System.IO.File.Exists(framePath))
                return StatusCode(500, "Khong trich xuat duoc anh tu video.\n" + error);

            var resultText = await AnalyzeImageWithGemini(framePath);
            return Ok(new { result = resultText });
        }

        private async Task<string> AnalyzeImageWithGemini(string imagePath)
        {
            byte[] imageBytes = System.IO.File.ReadAllBytes(imagePath);
            string base64Image = Convert.ToBase64String(imageBytes);

            var payload = new
            {
                contents = new[]
                {
                    new
                    {
                        parts = new object[]
                        {
                            new { text = "Phan tich ky thuat danh pickleball trong anh nay. Hay nhan xet tu the, ky thuat, va de xuat cai thien neu co." },
                            new
                            {
                                inlineData = new
                                {
                                    mimeType = "image/jpeg",
                                    data = base64Image
                                }
                            }
                        }
                    }
                },
                generationConfig = new
                {
                    temperature = 0.4,
                    maxOutputTokens = 1024
                }
            };

            using var client = new HttpClient();
            var request = new StringContent(JsonSerializer.Serialize(payload), Encoding.UTF8, "application/json");
            var response = await client.PostAsync(GeminiUrl, request);
            var json = await response.Content.ReadAsStringAsync();

            if (!response.IsSuccessStatusCode)
                return $"Loi tu Gemini: {response.StatusCode}\n{json}";

            using var doc = JsonDocument.Parse(json);
            return doc.RootElement
                      .GetProperty("candidates")[0]
                      .GetProperty("content")
                      .GetProperty("parts")[0]
                      .GetProperty("text")
                      .GetString();
        }
    }
}
