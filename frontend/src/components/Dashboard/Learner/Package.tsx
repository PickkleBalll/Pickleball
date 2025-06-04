import React from 'react';
import kid from '@/assets/Image/13.jpg';
import basic from '@/assets/Image/3.jpg';
import advanced from '@/assets/Image/15.jpg';

const Package: React.FC = () => {
  return (
    <section className="mx-[350px] mb-10 space-y-10">
      <div className="flex p-6 w-3xl space-x-20 bg-white rounded-full">
        <img className="w-44 h-44 rounded-full" src={kid} alt="course for kid" />
        <div className="flex flex-col space-y-12 pt-6">
          <p className='text-4xl'>Courses for kids</p>
          <div className='flex space-x-44'>
            <p className='pl-5 text-3xl font-extralight'>0.99$</p>
            <div className="flex justify-center items-center w-24 border rounded-full text-lg font-light cursor-pointer hover:bg-black hover:text-white">CHOOSE</div>
          </div>
        </div>
      </div>

      <div className="flex p-6 w-3xl space-x-20 bg-white rounded-full">
        <img className="w-44 h-44 rounded-full" src={basic} alt="course for kid" />
        <div className="flex flex-col space-y-12 pt-6">
          <p className='text-4xl'>Courses for kids</p>
          <div className='flex space-x-44'>
            <p className='pl-5 text-3xl font-extralight'>0.99$</p>
            <div className="flex justify-center items-center w-24 border rounded-full text-lg font-light cursor-pointer hover:bg-black hover:text-white">CHOOSE</div>
          </div>
        </div>
      </div>

      <div className="flex p-6 w-3xl space-x-20 bg-white rounded-full">
        <img className="w-44 h-44 rounded-full" src={advanced} alt="course for kid" />
        <div className="flex flex-col space-y-12 pt-6">
          <p className='text-4xl'>Courses for kids</p>
          <div className='flex space-x-44'>
            <p className='pl-5 text-3xl font-extralight'>0.99$</p>
            <div className="flex justify-center items-center w-24 border rounded-full text-lg font-light cursor-pointer hover:bg-black hover:text-white">CHOOSE</div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Package;
