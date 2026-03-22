import type { Metadata } from 'next';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: 'ჩვენს შესახებ | About Us',
  description: 'Mogzauroba.com — ქართული სამოგზაურო პლატფორმა. ავიაბილეთები, სასტუმროები, ტურები და ტრანსფერები.',
};

export default function AboutPage() {
  return <AboutClient />;
}
