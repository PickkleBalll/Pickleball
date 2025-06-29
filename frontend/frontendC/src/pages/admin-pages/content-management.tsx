import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  getAllCoaches,
} from "@/services/courseAdminService";

interface CoachProfile {
  id: string;
  fullName: string;
  specialty: string;
  email: string;
  phoneNumber: string;
  gender: string;
  dateOfBirth: string;
  isVerified: boolean;
  createdAt: string;
}

interface CoursePackage {
  packageId: string;
  title: string;
  price: number;
  description: string;
  imageUrl: string;
  createdAt: string;
  coachId: string;
  coach: CoachProfile | null;
}

const CourseManagement = () => {
  const [courses, setCourses] = useState<CoursePackage[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState<CoursePackage | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [coaches, setCoaches] = useState<CoachProfile[]>([]); // 👈 coach list

  useEffect(() => {
    loadCourses();
    loadCoaches();
  }, []);

  const loadCourses = async () => {
    const data = await getAllCourses();
    setCourses(data as CoursePackage[]);
  };

  const loadCoaches = async () => {
    const data = await getAllCoaches();
    setCoaches(data as CoachProfile[]);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this course?")) {
      await deleteCourse(id);
      loadCourses();
    }
  };

  const handleSave = async () => {
    if (selectedCourse?.packageId) {
      await updateCourse(selectedCourse.packageId, selectedCourse);
    } else {
      await createCourse(selectedCourse);
    }
    setShowModal(false);
    setSelectedCourse(null);
    loadCourses();
  };

  const filteredCourses = courses.filter((c) =>
    c.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-3 w-full box-title">
      <div className="p-6 space-y-3 bg-gray-100 min-h-screen">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-black mb-3">COURSES</h2>
          <div className="flex items-center gap-4 mb-3">
            <div className="relative">
              <FiSearch className="absolute right-2 top-1/2 transform -translate-y-1/2 text-black" />
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-2 pr-3 py-2 border border-gray-300 rounded text-sm text-gray-700 focus:outline-none"
              />
            </div>
            <FaUserCircle className="text-gray-700 text-3xl cursor-pointer hover:text-black" />
          </div>
        </div>

        <div className="flex justify-between items-center mb-3">
          <h2 className="text-3xl font-bold">COURSE MANAGEMENT</h2>
          <button
            onClick={() => {
              setSelectedCourse({
                packageId: "",
                title: "",
                price: 0,
                description: "",
                imageUrl: "",
                createdAt: new Date().toISOString(),
                coachId: "",
                coach: null,
              });
              setShowModal(true);
            }}
            className="bg-lime-400 hover:bg-lime-500 text-black px-4 py-2 rounded-full"
          >
            + Add Course
          </button>
        </div>

        <table className="w-full border rounded text-left">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3">#</th>
              <th>Title</th>
              <th>Coach</th>
              <th>Price</th>
              <th>Created</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredCourses.map((course, index) => (
              <tr key={course.packageId} className="border-t">
                <td className="p-3">{index + 1}</td>
                <td>{course.title}</td>
                <td>{course.coach?.fullName}</td>
                <td>${course.price}</td>
                <td>{new Date(course.createdAt).toLocaleDateString()}</td>
                <td>
                  <button
                    className="text-blue-600 mr-2"
                    onClick={() => {
                      setSelectedCourse(course);
                      setShowModal(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500"
                    onClick={() => handleDelete(course.packageId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {showModal && selectedCourse && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-lg">
              <h2 className="text-xl font-semibold mb-4">{selectedCourse.packageId ? "Edit" : "Add"} Course</h2>
              <input
                className="w-full mb-2 p-2 border rounded"
                placeholder="Title"
                value={selectedCourse.title}
                onChange={(e) =>
                  setSelectedCourse({ ...selectedCourse, title: e.target.value })
                }
              />
              <input
                className="w-full mb-2 p-2 border rounded"
                placeholder="Image URL"
                value={selectedCourse.imageUrl}
                onChange={(e) =>
                  setSelectedCourse({ ...selectedCourse, imageUrl: e.target.value })
                }
              />
              <textarea
                className="w-full mb-2 p-2 border rounded"
                placeholder="Description"
                value={selectedCourse.description}
                onChange={(e) =>
                  setSelectedCourse({ ...selectedCourse, description: e.target.value })
                }
              />
              <input
                type="number"
                className="w-full mb-2 p-2 border rounded"
                placeholder="Price"
                value={selectedCourse.price}
                onChange={(e) =>
                  setSelectedCourse({ ...selectedCourse, price: Number(e.target.value) })
                }
              />

              {/* Dropdown Coach */}
              <select
                className="w-full mb-4 p-2 border rounded"
                value={selectedCourse.coachId}
                onChange={(e) =>
                  setSelectedCourse({ ...selectedCourse, coachId: e.target.value })
                }
              >
                <option value="">-- Select Coach --</option>
                {coaches.map((coach) => (
                  <option key={coach.id} value={coach.id}>
                    {coach.fullName}
                  </option>
                ))}
              </select>

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => {
                    setShowModal(false);
                    setSelectedCourse(null);
                  }}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseManagement;
