/**
 * Core Team List Content Component - Enhanced Card Design
 * Displays team members in an improved card layout with better interactions
 */

import type { CoreTeamMember } from "@/types/core-team.types";
import { Github, Twitter, Linkedin, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import DeleteCoreTeamButton from "./delete-core-team-button";

interface CoreTeamListContentProps {
  members: CoreTeamMember[];
}

export default function CoreTeamListContent({
  members,
}: CoreTeamListContentProps) {
  return (
    <>
      {members.map((member, index) => (
        <div key={member._id.toString()} className="group relative fade-in">
          {/* Glow effect on hover */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-3xl opacity-0 group-hover:opacity-20 blur transition-all duration-500" />

          {/* Main card container */}
          <div className="relative glass rounded-3xl overflow-hidden border border-border/50 hover:border-border transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5">
            {/* Profile image section with overlay effects */}
            <div className="relative h-56 w-full overflow-hidden bg-gradient-to-br from-primary/10 via-primary/5 to-secondary/10">
              {member.profileImage ? (
                <>
                  <Image
                    src={member.profileImage}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </>
              ) : (
                /* Fallback gradient when no image */
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl font-bold text-primary/20">
                    {member.name.charAt(0)}
                  </div>
                </div>
              )}

              {/* Floating social links on hover */}
              {Object.keys(member.socialLinks).length > 0 && (
                <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                  {member.socialLinks.github && (
                    <Link
                      href={member.socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl glass border border-border/50 hover:border-primary hover:bg-primary/10 text-foreground transition-all hover:scale-110"
                      aria-label="GitHub"
                    >
                      <Github className="h-4 w-4" />
                    </Link>
                  )}
                  {member.socialLinks.twitter && (
                    <Link
                      href={member.socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl glass border border-border/50 hover:border-primary hover:bg-primary/10 text-foreground transition-all hover:scale-110"
                      aria-label="Twitter"
                    >
                      <Twitter className="h-4 w-4" />
                    </Link>
                  )}
                  {member.socialLinks.linkedin && (
                    <Link
                      href={member.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl glass border border-border/50 hover:border-primary hover:bg-primary/10 text-foreground transition-all hover:scale-110"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="h-4 w-4" />
                    </Link>
                  )}
                </div>
              )}
            </div>

            {/* Content section */}
            <div className="p-6 space-y-4">
              {/* Name and role with enhanced typography */}
              <div className="space-y-1.5">
                <h3 className="text-xl font-display font-bold text-foreground leading-tight group-hover:text-primary transition-colors">
                  {member.name}
                </h3>
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
                  <p className="text-xs font-semibold text-primary">
                    {member.role}
                  </p>
                </div>
              </div>

              {/* About section with line clamp */}
              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 min-h-[3.75rem]">
                {member.about}
              </p>

              {/* Action buttons with improved layout */}
              <div className="flex items-center gap-2 pt-4 border-t border-border/30">
                <Link
                  href={`/admin/core-team/edit/${member._id}`}
                  className="flex-1"
                >
                  <Button
                    variant="outline"
                    className="w-full group/btn hover:text-foreground  hover:border-primary/50 transition-all"
                  >
                    <span>Edit</span>
                    <ExternalLink className="h-3.5 w-3.5 ml-2 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                  </Button>
                </Link>
                <DeleteCoreTeamButton
                  memberId={member._id.toString()}
                  memberName={member.name}
                />
              </div>
            </div>

            {/* Bottom accent bar with animated gradient */}
            <div className="h-1 bg-gradient-to-r from-primary via-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        </div>
      ))}
    </>
  );
}
