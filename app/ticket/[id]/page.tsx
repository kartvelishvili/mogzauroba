import TicketDetailClient from './TicketDetailClient';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function TicketPage({ params }: PageProps) {
  const { id } = await params;
  return <TicketDetailClient ticketId={id} />;
}
