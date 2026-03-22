import HotelDetailClient from './HotelDetailClient';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function HotelPage({ params }: PageProps) {
  const { id } = await params;
  return <HotelDetailClient hotelId={id} />;
}
