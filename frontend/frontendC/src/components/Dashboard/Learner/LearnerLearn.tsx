import React, { useEffect, useState } from 'react';
import axios from "axios";
import { uploadLearnerVideo, getLearnerVideos } from '@/services/learnerVideoService';
import { getLearnerByUserId } from '@/services/learnerService';
interface Video {
  id: string;
  videoUrl: string;
  feedback: string;
}

const LearnerLearn: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  const learnerId = currentUser?.id;

  const fetchVideos = async () => {
    try {
const videoData = await getLearnerVideos(learnerId);
setVideos(videoData as Video[]); // ✅ ép kiểu rõ ràng
    } catch (err) {
      console.error('Lỗi khi lấy video:', err);
    }
  };

  useEffect(() => {
    if (learnerId) fetchVideos();
  }, [learnerId]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

const handleUpload = async (file: File) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
  const userId = currentUser?.id;

  if (!userId) {
    alert("Bạn chưa đăng nhập");
    return;
  }

  try {
    console.log("👉 userId:", userId);

    // Lấy learnerId từ userId
    const learnerData = await getLearnerByUserId(userId);
    const learnerId = learnerData?.id;
    console.log("👉 learnerId:", learnerId);

    if (!learnerId) throw new Error("Không tìm thấy learnerId");

    // ✅ Tạo formData để debug
    const formData = new FormData();
    formData.append("LearnerId", learnerId);
    formData.append("File", file);
    formData.append("Description", "Test mô tả");

    console.log("👉 formData entries:");
    for (let pair of formData.entries()) {
      console.log(`   ${pair[0]}:`, pair[1]);
    }

    // Gọi API
    const response = await axios.post(
      "https://localhost:5001/api/learnervideo/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log("✅ Upload thành công:", response.data);

    // Cập nhật video
const updatedVideos = (await getLearnerVideos(learnerId)) as Video[];
setVideos(updatedVideos);

  } catch (err: any) {
    console.error("❌ Lỗi khi tải video:", err);
    console.error("❌ Full Axios error response:", err.response);
    alert(err?.response?.data?.message || "Upload thất bại");
  }
};



  return (
    <section className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-4">Upload Your Training Video</h1>

      <div className="flex items-center gap-4 mb-6">
        <input type="file" accept="video/*" onChange={handleFileChange} />
        <button
  onClick={() => selectedFile && handleUpload(selectedFile)}
   className="bg-[#d5f25d] text-black font-semibold px-4 py-2 rounded-full border border-black"
  disabled={loading}
>
  {loading ? 'Uploading...' : 'Upload Video'}
</button>

      </div>

      <h2 className="text-2xl font-semibold mb-4">Your Uploaded Videos</h2>
      <div className="space-y-6">
        {videos.map((video) => (
          <div
            key={video.id}
            className="p-4 border border-gray-300 rounded-xl bg-white shadow-sm"
          >
            <video controls width="100%" className="rounded-lg mb-2">
              <source src={video.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <p className="text-sm text-gray-700">
              <strong>Feedback:</strong> {video.feedback || 'No feedback yet'}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LearnerLearn;
