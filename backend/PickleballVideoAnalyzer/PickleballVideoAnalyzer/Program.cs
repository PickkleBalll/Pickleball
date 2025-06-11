using System;
using System.Diagnostics;
using System.Net.Http;
using System.Text;
using System.IO;
using System.Threading.Tasks;

class Program
{
    const string ApiKey = "AIzaSyBzHUlC8XQSlOgxg30nGodJYgskpzvzEA0"; // Chỉ nên dùng key test
    const string GeminiUrl = "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=" + ApiKey;

    static async Task Main(string[] args)
    {
        Console.OutputEncoding = Encoding.UTF8;

        // Đường dẫn tới file video thực sự (ví dụ .mp4)
        string videoPath = @"C:\Users\MANH\Downloads\Download.MP4";
        string outputImage = "frame_001.jpg";

        Console.WriteLine("Dang trich xuat anh tu video...");

        if (!File.Exists(videoPath))
        {
            Console.WriteLine("Video khong ton tai: " + videoPath);
            return;
        }

        ExtractFrame(videoPath, outputImage);

        if (!File.Exists(outputImage))
        {
            Console.WriteLine("Khong trich xuat duoc anh.");
            return;
        }

        Console.WriteLine("Anh da duoc trich xuat. Dang gui anh den Gemini de phan tich...");
        string result = await AnalyzeImageWithGemini(outputImage);
        string jsonFile = @"analysis_result.json";

        // Copy kết quả vào thư mục public của React
        string reactPublicPath = Path.Combine(@"C:\Users\MANH\Pickleball\frontend\public", jsonFile);

        // Ghi kết quả JSON cả vào thư mục local và React
        File.WriteAllText(jsonFile, result);
        File.Copy(jsonFile, reactPublicPath, true); // true = ghi đè nếu có

        Console.WriteLine("\nKet qua phan tich tu AI:\n");
        Console.WriteLine(result);
    }

    static void ExtractFrame(string videoPath, string outputImage)
    {
        var ffmpeg = new Process();
        ffmpeg.StartInfo.FileName = "ffmpeg";

        // Trích frame tại 0.5 giây tránh video ngắn bị lỗi
        ffmpeg.StartInfo.Arguments = $"-ss 00:00:00.5 -i \"{videoPath}\" -vframes 1 \"{outputImage}\" -y";

        ffmpeg.StartInfo.RedirectStandardOutput = true;
        ffmpeg.StartInfo.RedirectStandardError = true;
        ffmpeg.StartInfo.UseShellExecute = false;
        ffmpeg.StartInfo.CreateNoWindow = true;

        ffmpeg.Start();

        string stderr = ffmpeg.StandardError.ReadToEnd(); // ✅ Đọc lỗi nếu có
        ffmpeg.WaitForExit();

        if (!File.Exists(outputImage))
        {
            Console.WriteLine("FFmpeg khong tao duoc anh. Chi tiet loi:");
            Console.WriteLine(stderr);
        }
    }

    static async Task<string> AnalyzeImageWithGemini(string imagePath)
    {
        byte[] imageBytes = File.ReadAllBytes(imagePath);
        string base64Image = Convert.ToBase64String(imageBytes);

        var jsonPayload = $@"
{{
  ""contents"": [{{
    ""parts"": [
      {{
        ""text"": ""Phân tích kỹ thuật đánh pickleball trong ảnh này. Hãy nhận xét tư thế, kỹ thuật, và đề xuất cải thiện nếu có.""
      }},
      {{
        ""inlineData"": {{
          ""mimeType"": ""image/jpeg"",
          ""data"": ""{base64Image}""
        }}
      }}
    ]
  }}],
  ""generationConfig"": {{
    ""temperature"": 0.4,
    ""maxOutputTokens"": 1024
  }}
}}";

        using var client = new HttpClient();
        var request = new StringContent(jsonPayload, Encoding.UTF8, "application/json");

        HttpResponseMessage response = await client.PostAsync(GeminiUrl, request);
        string responseText = await response.Content.ReadAsStringAsync();

        if (!response.IsSuccessStatusCode)
        {
            return $"Loi khi gui den Gemini. Status: {response.StatusCode}\nChi tiet: {responseText}";
        }

        return responseText;
    }
}
