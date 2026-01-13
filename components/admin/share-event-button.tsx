"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Share2, Check } from "lucide-react";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ShareEventButtonProps {
  shareUrl: string;
}

export function ShareEventButton({ shareUrl }: ShareEventButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success("Link Copied!", {
        description: "Event registration link copied to clipboard",
      });

      // Reset copied state after 2 seconds
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      toast.error("Failed to copy", {
        description: "Could not copy link to clipboard",
      });
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={handleCopyLink}
            variant="outline"
            size="default"
            className="gap-2 bg-linear-to-r from-primary/10 to-secondary/10 border-primary/30 hover:from-primary/20 hover:to-secondary/20 transition-all"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                <span className="hidden sm:inline">Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="h-4 w-4" />
                <span className="hidden sm:inline">Share Event</span>
              </>
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-xs">Copy registration link</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
