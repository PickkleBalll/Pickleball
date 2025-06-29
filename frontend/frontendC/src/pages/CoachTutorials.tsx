import React, { useEffect, useState } from 'react';
import {
  getTutorials,
  createTutorial,
  updateTutorial,
  deleteTutorial,
  Tutorial,
} from '@/services/tutorialService';

const Tutorials: React.FC = () => {
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [editingTutorial, setEditingTutorial] = useState<Tutorial | null>(null);
  const [form, setForm] = useState({ title: '', description: '', videoUrl: '' });

  // Fetch tutorials on mount
  const fetchTutorials = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getTutorials();
      setTutorials(data);
    } catch (err) {
      console.error(err);
      setError('Lỗi khi tải danh sách tutorials');
    } finally {
      setLoading(false);
    }
  };

useEffect(() => {
  console.log('Danh sách tutorials:');
  tutorials.forEach((tut) => {
    console.log(`- ${tut.title}:`, tut);
  });
}, [tutorials]);


  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title.trim()) return alert('Tiêu đề không được để trống');
    if (!form.videoUrl.trim()) return alert('Video URL không được để trống');

    setLoading(true);
    try {
      if (editingTutorial) {
        const updated = await updateTutorial(editingTutorial.id, form);
        setTutorials((prev) =>
          prev.map((t) => (t.id === updated.id ? updated : t))
        );
        setEditingTutorial(null);
      } else {
        const created = await createTutorial(form);
        setTutorials((prev) => [created, ...prev]);
      }
      setForm({ title: '', description: '', videoUrl: '' });
    } catch (err) {
      console.error(err);
      alert('Lỗi khi lưu tutorial');
    } finally {
      setLoading(false);
    }
  };

  const onEdit = (tutorial: Tutorial) => {
    setEditingTutorial(tutorial);
    setForm({
      title: tutorial.title,
      description: tutorial.description,
      videoUrl: tutorial.videoUrl,
    });
  };

  const onCancelEdit = () => {
    setEditingTutorial(null);
    setForm({ title: '', description: '', videoUrl: '' });
  };

  const onDelete = async (id: string) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa tutorial này không?')) return;
    setLoading(true);
    try {
      await deleteTutorial(id);
      setTutorials((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error(err);
      alert('Lỗi khi xóa tutorial');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <button
  onClick={fetchTutorials}
  className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded mb-4"
>
  Tải lại tutorials
</button>

      <h1 className="text-3xl font-bold mb-6 text-center">Quản lý Tutorials</h1>

      {/* Form tạo / chỉnh sửa */}
      <form
        onSubmit={onSubmit}
        className="bg-white p-6 rounded-lg shadow-md mb-10 space-y-4"
      >
        <h2 className="text-xl font-semibold">
          {editingTutorial ? 'Chỉnh sửa Tutorial' : 'Tạo Tutorial mới'}
        </h2>

        <div>
          <label className="block font-medium mb-1" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={form.title}
            onChange={onChange}
            disabled={loading}
          />
        </div>

        <div>
          <label className="block font-medium mb-1" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            className="w-full border border-gray-300 rounded px-3 py-2"
            rows={3}
            value={form.description}
            onChange={onChange}
            disabled={loading}
          />
        </div>

        <div>
          <label className="block font-medium mb-1" htmlFor="videoUrl">
            Video URL
          </label>
          <input
            type="text"
            id="videoUrl"
            name="videoUrl"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={form.videoUrl}
            onChange={onChange}
            disabled={loading}
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            {editingTutorial ? 'Cập nhật' : 'Tạo mới'}
          </button>
          {editingTutorial && (
            <button
              type="button"
              onClick={onCancelEdit}
              className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
              disabled={loading}
            >
              Hủy
            </button>
          )}
        </div>
      </form>

      {/* Hiển thị danh sách */}
      {loading && <p>Đang tải dữ liệu...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {tutorials.length === 0 && !loading ? (
        <p className="text-gray-500">Không có tutorial nào.</p>
      ) : (
        <ul className="space-y-4">
          {tutorials.map((tut) => (
            <li
              key={tut.id}
              className="bg-white p-4 rounded-lg shadow-md flex justify-between items-start"
            >
              <div className="space-y-1">
                <h3 className="text-lg font-bold">{tut.title}</h3>
                <p className="text-gray-700">{tut.description}</p>
                <a
                  href={tut.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  Xem video
                </a>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => onEdit(tut)}
                  className="bg-yellow-400 hover:bg-yellow-500 px-3 py-1 rounded"
                >
                  Sửa
                </button>
                <button
                  onClick={() => onDelete(tut.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  Xóa
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Tutorials;
