// pages/Homepage.tsx
import Header from '../components/Homepage/Header';
import Hero from '../components/Homepage/Hero';
import Courses from '../components/Homepage/Courses';
import CoachPromotion from '../components/Homepage/CoachPromotion';
import CoachesList from '../components/Homepage/CoachesList';
import BlogSection from '../components/Homepage/BlogSection';
import Contact from '../components/Homepage/Contact';

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
}
