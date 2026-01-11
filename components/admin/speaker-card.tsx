import Image from "next/image";
import { Card } from "@/components/ui/card";

interface SpeakerProps {
  name: string;
  role: string;
  bio: string;
  photo: string;
}

export function SpeakerCard({ name, role, bio, photo }: SpeakerProps) {
  return (
    <Card className="overflow-hidden border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
      {/* Speaker Photo */}
      <div className="relative w-full h-48 bg-muted overflow-hidden">
        <Image
          src={photo || "/placeholder.svg?height=200&width=300&query=speaker"}
          alt={name}
          fill
          className="object-cover"
        />
      </div>

      {/* Speaker Info */}
      <div className="p-4 space-y-3">
        <div>
          <h3 className="text-lg font-bold text-foreground">{name}</h3>
          <p className="text-sm text-primary font-medium">{role}</p>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">{bio}</p>
      </div>
    </Card>
  );
}
