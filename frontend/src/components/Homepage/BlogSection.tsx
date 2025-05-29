import React from 'react';

export default function BlogSection() {
    return (
        <section className="px-6 py-10 bg-orange-100">
            <h2 className="text-xl font-semibold mb-4">Blog</h2>
            <p className="text-gray-700 mb-4">Tips and insights on how to train, play, and stay motivated with pickleball.</p>
            <img src="/blog-image.png" alt="Blog" className="rounded-lg" />
        </section>
    );
}
