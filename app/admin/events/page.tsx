import { Button } from "@/components/ui/button";
import { Plus, Sparkles } from "lucide-react";
import Link from "next/link";
import { EventsListAdmin } from "@/components/admin/admin-event-page/EventsListAdmin";
import { AdminPageLayout } from "@/components/admin/shared/admin-page-layout";

export const metadata = {
  title: "Events",
  description: "Manage events and registrations",
};

export default function EventsPage() {
  return (
    <AdminPageLayout
      title="Events"
      description="Manage your events and registrations"
      icon={<Sparkles className="h-5 w-5 text-primary" />}
      actionButton={
        <Button asChild className="bg-primary hover:bg-primary/90">
          <Link href="/admin/events/new">
            <Plus className="h-4 w-4 mr-2" />
            New Event
          </Link>
        </Button>
      }
    >
      {/* Content - Now Client Component */}
      <EventsListAdmin />
    </AdminPageLayout>
  );
}
