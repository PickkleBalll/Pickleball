<<<<<<< HEAD
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  const goToSignIn = () => {
    navigate('/signin');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="bg-white p-10 rounded shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-6">Welcome to Our Platform</h1>
        <p className="mb-8">Please sign in to access your dashboard.</p>
        <button
          onClick={goToSignIn}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md text-lg"
        >
          Sign In
        </button>
      </div>
    </div>
  );
=======
// pages/Homepage.tsx
import Header from '../components/Homepage/Header';
import Hero from '../components/Homepage/Hero';
import Courses from '../components/Homepage/Courses';
import CoachPromotion from '../components/Homepage/CoachPromotion';
import CoachesList from '../components/Homepage/CoachesList';
import BlogSection from '../components/Homepage/BlogSection';
import Contact from '../components/Common/Contact';

export default function Homepage() {
    return (
        <>
            <Header />
            <Hero />
            <Courses />
            <CoachPromotion />
            <CoachesList />
            <BlogSection />
            <Contact />
        </>
    );
>>>>>>> origin/dev.thientrang
}
