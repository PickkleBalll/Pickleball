import React from 'react';
import { useNavigate } from 'react-router-dom';
import kid from '@/assets/Image/13.jpg';
import basic from '@/assets/Image/3.jpg';
import advanced from '@/assets/Image/15.jpg';

interface CourseInfoProps {
  imgSrc: string;
  altText: string;
  title: string;
  price: string;
}

const CourseInfo: React.FC<CourseInfoProps> = ({ imgSrc, altText, title, price }) => {
  const navigate = useNavigate();

  const handleChoose = () => {
    navigate('/payment');
  };

  return (
    <div className="flex p-6 w-3xl space-x-20 bg-white rounded-full">
      <img className="w-44 h-44 rounded-full" src={imgSrc} alt={altText} />
      <div className="flex flex-col space-y-12 pt-6">
        <p className="text-4xl">{title}</p>
        <div className="flex space-x-44">
          <p className="pl-5 text-3xl font-extralight">{price}</p>
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
  return (
    <section className="mx-[350px] mb-10 space-y-10">
      <CourseInfo imgSrc={kid} altText="course for kid" title="Courses for kids" price="0.99$" />
      <CourseInfo imgSrc={basic} altText="basic course" title="Basic Courses" price="0.99$" />
      <CourseInfo imgSrc={advanced} altText="advanced course" title="Advanced Courses" price="0.99$" />
    </section>
  );
};

export default Payment;
