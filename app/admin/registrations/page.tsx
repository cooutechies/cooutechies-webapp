/**
 * Enhanced Registrations Page - Server Component
 * Displays community registrations in an elegant list with full details visible
 */

import { getCommunityRegistrations } from "@/app/actions/registrations";
import RegistrationsPagination from "@/components/admin/registrations-pagination";
import {
  Users,
  Mail,
  GraduationCap,
  MapPin,
  Calendar,
  Code,
  Target,
  MessageSquare,
  Sparkles,
  Building2,
} from "lucide-react";

interface PageProps {
  searchParams: {
    page?: string;
  };
}

export default async function RegistrationsPage({ searchParams }: PageProps) {
  const currentPage = Number(searchParams.page) || 1;
  const limit = 10;

  const response = await getCommunityRegistrations(currentPage, limit);
  const registrations = response.success
    ? response.data?.registrations || []
    : [];
  const total = response.success ? response.data?.total || 0 : 0;
  const totalPages = response.success ? response.data?.pages || 1 : 1;

  return (
    <div className="flex flex-col h-full relative overflow-hidden">
      {/* Background effects matching overview page */}
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
      <div className="absolute top-0 right-0 w-125 h-125 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-100 h-100 bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Header with glassmorphic effect */}
      <div className=" z-10 px-6 py-6 border-b border-border/50 sticky top-0 glass backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-linear-to-br from-primary/20 to-secondary/20">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-bold">
                <span className="text-gradient">Community Registrations</span>
              </h1>
              <p className="text-muted-foreground text-sm mt-0.5">
                {total} total {total === 1 ? "member" : "members"} registered
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 overflow-auto relative z-10">
        <div className="space-y-4 max-w-6xl mx-auto">
          {registrations.length === 0 ? (
            <div className="glass rounded-2xl border-glow p-12">
              <div className="flex flex-col items-center justify-center">
                <div className="p-4 rounded-2xl bg-muted/50 mb-4">
                  <Users className="h-8 w-8 text-muted-foreground/50" />
                </div>
                <p className="text-muted-foreground text-sm font-medium">
                  No registrations yet
                </p>
                <p className="text-muted-foreground/70 text-xs mt-1">
                  Registrations will appear here once students join
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Registrations List */}
              <div className="space-y-4">
                {registrations.map((registration, index) => (
                  <div
                    key={registration._id.toString()}
                    className="glass rounded-xl overflow-hidden border-glow hover:shadow-xl transition-all duration-300"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {/* Main Info Bar */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 bg-linear-to-r from-primary/5 via-transparent to-secondary/5 border-b border-border/30">
                      <div className="flex items-center gap-4 flex-1">
                        {/* Avatar Circle */}
                        <div className="w-12 h-12 rounded-full bg-linear-to-br from-primary/30 to-secondary/30 flex items-center justify-center shrink-0 border-2 border-primary/20">
                          <span className="text-lg font-display font-bold text-gradient">
                            {registration.firstName[0]}
                            {registration.lastName[0]}
                          </span>
                        </div>

                        {/* Name and Email */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-display font-bold text-foreground mb-1">
                            {registration.firstName} {registration.lastName}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Mail className="h-3.5 w-3.5 shrink-0" />
                            <span className="truncate">
                              {registration.email}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Status and Date */}
                      <div className="flex items-center gap-4 shrink-0">
                        <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground">
                          <Calendar className="h-3.5 w-3.5" />
                          {new Date(registration.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            }
                          )}
                        </div>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-green-500/20 text-green-600 dark:text-green-400 border border-green-500/30 whitespace-nowrap">
                          <Sparkles className="h-3 w-3" />
                          {registration.status}
                        </span>
                      </div>
                    </div>

                    {/* Details Grid */}
                    <div className="p-5">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-5">
                        {/* Department */}
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-lg bg-blue-500/10 shrink-0 mt-0.5">
                            <Building2 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-muted-foreground mb-1">
                              Department
                            </p>
                            <p className="text-sm font-semibold text-foreground">
                              {registration.department || "-"}
                            </p>
                          </div>
                        </div>

                        {/* Level */}
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-lg bg-cyan-500/10 shrink-0 mt-0.5">
                            <GraduationCap className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-muted-foreground mb-1">
                              Level
                            </p>
                            <p className="text-sm font-semibold text-foreground">
                              {registration.level || "-"}
                            </p>
                          </div>
                        </div>

                        {/* Campus */}
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-lg bg-purple-500/10 shrink-0 mt-0.5">
                            <MapPin className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-muted-foreground mb-1">
                              Campus
                            </p>
                            <p className="text-sm font-semibold text-foreground">
                              {registration.campus || "-"}
                            </p>
                          </div>
                        </div>

                        {/* Tech Skills */}
                        <div className="flex items-start gap-3 md:col-span-3">
                          <div className="p-2 rounded-lg bg-green-500/10 shrink-0 mt-0.5">
                            <Code className="h-4 w-4 text-green-600 dark:text-green-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-muted-foreground mb-1">
                              Current Tech Skills
                            </p>
                            <p className="text-sm text-foreground leading-relaxed">
                              {registration.techSkills || "-"}
                            </p>
                          </div>
                        </div>

                        {/* Aspiring Skills */}
                        <div className="flex items-start gap-3 md:col-span-3">
                          <div className="p-2 rounded-lg bg-orange-500/10 shrink-0 mt-0.5">
                            <Target className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-muted-foreground mb-1">
                              Aspiring Skills
                            </p>
                            <p className="text-sm text-foreground leading-relaxed">
                              {registration.aspiringSkills || "-"}
                            </p>
                          </div>
                        </div>

                        {/* Reason - Full Width */}
                        <div className="flex items-start gap-3 md:col-span-3 p-4 rounded-lg bg-muted/30 border border-border/30">
                          <div className="p-2 rounded-lg bg-primary/10 shrink-0 mt-0.5">
                            <MessageSquare className="h-4 w-4 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-muted-foreground mb-2">
                              Reason for Joining
                            </p>
                            <p className="text-sm text-foreground leading-relaxed">
                              {registration.reason || "-"}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Mobile Date */}
                      <div className="sm:hidden mt-4 pt-4 border-t border-border/30">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Calendar className="h-3.5 w-3.5" />
                          Registered on{" "}
                          {new Date(registration.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            }
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="glass rounded-2xl p-6 border-glow mt-6">
                  <RegistrationsPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
