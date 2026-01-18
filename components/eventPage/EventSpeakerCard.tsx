import Image from "next/image";

/**
 * SpeakerCard Component
 * Displays speaker information with photo, name, role, and bio
 * Used in event detail pages when speakers are available
 *
 * @param speaker - Speaker object with photo, name, role, and bio
 */

interface SpeakerCardProps {
  speaker: {
    photo?: string;
    name: string;
    role: string;
    bio?: string | undefined;
  };
}

export function EventSpeakerCard({ speaker }: SpeakerCardProps) {
  return (
    <div className="glass rounded-2xl p-6 group hover:border-primary/30 transition-all duration-500">
      <div className="flex items-start gap-4">
        {/* Speaker Photo */}
        <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 border-2 border-border group-hover:border-primary/50 transition-colors">
          <Image
            src={speaker.photo || "/placeholder.svg"}
            alt={speaker.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Speaker Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-display font-bold mb-1 group-hover:text-primary transition-colors">
            {speaker.name}
          </h3>
          <p className="text-sm text-primary font-medium mb-2">
            {speaker.role}
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {speaker.bio}
          </p>
        </div>
      </div>
    </div>
  );
}
