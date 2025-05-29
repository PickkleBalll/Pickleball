import React from 'react';

export default function Courses() {
    return (
        <section className="px-6 py-10 bg-white">
            <h2 className="text-2xl font-bold mb-4">Our Courses</h2>
            <p className="text-gray-700 mb-6 max-w-xl">
                Pickleball courses are designed for players of all ages and skill levels
                to learn, improve, and enjoy the game. Whether you&#39;re a complete
                beginner or looking to compete in tournaments, our structured classes
                help you build skills step-by-step. You&#39;ll master everything from
                basic serves and footwork to advanced strategies and game tactics. Each
                course is led by certified coaches who focus on technique, consistency,
                and fun. We also offer private lessons, youth programs, and
                video-assisted feedback to help you grow faster. With a friendly and
                inclusive learning environment, you&#39;ll feel confident on the court
                in no time. Join us to experience one of the fastest-growing sports in
                the world!
            </p>
            <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gray-100 p-4 rounded">📘 Basic Course</div>
                <div className="bg-gray-100 p-4 rounded">📗 Skill Course</div>
                <div className="bg-gray-100 p-4 rounded">📕 Advanced Course</div>
            </div>
        </section>
    );
}