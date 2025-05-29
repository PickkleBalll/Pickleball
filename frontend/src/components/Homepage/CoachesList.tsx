import React from 'react';

export default function CoachesList() {
    return (
        <section className="px-6 py-10">
            <h2 className="text-xl font-semibold mb-4">Coaches</h2>
            <div className="flex gap-4 overflow-x-auto">
                <img src="/coach1.png" alt="Coach 1" className="w-40 rounded-lg" />
                <img src="/coach2.png" alt="Coach 2" className="w-40 rounded-lg" />
                <img src="/coach3.png" alt="Coach 3" className="w-40 rounded-lg" />
            </div>
        </section>
    );
}
