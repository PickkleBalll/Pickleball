import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllCourses } from '@/services/courseService';

interface Course {
  packageId: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  coach: {
    id: string;
    fullName: string;
  };
}

interface CourseInfoProps {
  course: Course;
}

const CourseInfo: React.FC<CourseInfoProps> = ({ course }) => {
  const navigate = useNavigate();

  const handleChoose = () => {
    navigate(`/payment/${course.packageId}`);
  };

  return (
    <div className="flex p-6 w-3xl space-x-20 bg-white rounded-full">
      <img
        className="w-44 h-44 rounded-full object-cover"
        src={course.imageUrl}
        alt={course.title}
      />
      <div className="flex flex-col space-y-12 pt-6">
        <p className="text-4xl">{course.title}</p>
        <div className="flex space-x-44">
          <p className="pl-5 text-3xl font-extralight">${course.price}</p>
          <div
            onClick={handleChoose}
            className="flex justify-center items-center w-24 border rounded-full text-lg font-light cursor-pointer hover:bg-black hover:text-white"
          >
            CHOOSE
          </div>
        </div>
      </div>
    </div>
  );
};

const Payment: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getAllCourses();
        setCourses(data);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <section className="mx-[350px] mb-10 space-y-10">
      {courses.map((course) => (
        <CourseInfo key={course.packageId} course={course} />
      ))}
    </section>
  );
};

export default Payment;
