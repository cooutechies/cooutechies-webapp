import { getCoreTeamMemberById } from "@/app/actions/core-team";
import CoreTeamForm from "../../../../../components/admin/core-team/core-team-form";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import CoreTeamError from "@/components/admin/core-team/core-team-error";

import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const { id } = await params;
  const response = await getCoreTeamMemberById(id);

  return {
    title:
      response.success && response.data
        ? `Edit ${response.data.name}`
        : "Edit Team Member",
    description: "Update team member profile information",
  };
}

export default async function EditCoreTeamPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  const response = await getCoreTeamMemberById(id);

  if (!response.success || !response.data) {
    return <CoreTeamError />;
  }

  // Serialize the member data to plain object
  const member = {
    name: response.data.name,
    role: response.data.role,
    about: response.data.about,
    profileImage: response.data.profileImage,
    socialLinks: {
      github: response.data.socialLinks?.github || "",
      twitter: response.data.socialLinks?.twitter || "",
      linkedin: response.data.socialLinks?.linkedin || "",
    },
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/admin/core-team">
          <Button className="mb-8 gap-2  ">
            <ChevronLeft className="h-4 w-4" />
            Back to Core Team
          </Button>
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-display font-bold text-foreground">
            Edit Team Member
          </h1>
          <p className="text-muted-foreground mt-2">
            Update {member.name}&apos;s profile information
          </p>
        </div>

        <CoreTeamForm initialData={member} memberId={id} isEditing={true} />
      </div>
    </main>
  );
}
