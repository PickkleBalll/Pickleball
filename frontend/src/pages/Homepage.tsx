import Header from '../components/Homepage/Header';
import Hero from '../components/Homepage/Hero';
import Courses from '../components/Homepage/Courses';
import CoachPromotion from '../components/Homepage/CoachPromotion';
import CoachesList from '../components/Homepage/CoachesList';
import BlogSection from '../components/Homepage/BlogSection';
import Contact from '../components/Common/Contact';

export default function Homepage() {
  return (
    <section className='mx-10'>
      <Header />
      <Hero />
      <Courses />
      <CoachPromotion />
      <CoachesList />
      <BlogSection />
      <Contact />
    </section>
  );
}
