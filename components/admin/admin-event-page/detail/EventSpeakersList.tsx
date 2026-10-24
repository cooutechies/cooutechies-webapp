import { SpeakerCard } from "@/components/admin/speaker-card";
import { getImageUrl } from "@/lib/utils";

interface Speaker {
  name: string;
  role: string;
  bio?: string;
  photo?: any;
}

interface EventSpeakersListProps {
  speakers?: Speaker[];
}

export function EventSpeakersList({ speakers }: EventSpeakersListProps) {
  if (!speakers || speakers.length === 0) return null;

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-3xl font-display font-bold">
          <span className="text-gradient">Featured Speakers</span>
        </h2>
        <p className="text-muted-foreground mt-2">
          Meet the experts speaking at this event
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {speakers.map((speaker, index) => (
          <SpeakerCard
            key={index}
            name={speaker.name}
            role={speaker.role}
            bio={speaker.bio}
            photo={getImageUrl(speaker.photo)}
          />
        ))}
      </div>
    </div>
  );
}
