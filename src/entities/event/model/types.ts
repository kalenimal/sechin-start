export type EventType = 'demo-day' | 'closed-pitch' | 'webinar';

export const eventTypeLabels: Record<EventType, string> = {
  'demo-day': 'Демо-день',
  'closed-pitch': 'Закрытый питч',
  webinar: 'Вебинар',
};

export type AgendaItem = {
  start: string;
  end: string;
  title: string;
  text: string;
  speaker?: { name: string; role: string; photo: string };
};

export type Participant = { name: string; role: string; photo: string };

export type PlatformEvent = {
  id: string;
  type: EventType;
  title: string;
  shortDescription: string;
  description: string;
  startsAt: string;
  location: string;
  image: string;
  banner: string;
  agenda: AgendaItem[];
  participants: Participant[];
  participantsMore: number;
};
