"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "lucide-react";

interface InsertLinkDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onInsert: (url: string, text: string) => void;
}

export function InsertLinkDialog({
  open,
  onOpenChange,
  onInsert,
}: InsertLinkDialogProps) {
  const [url, setUrl] = useState("");
  const [text, setText] = useState("");

  const handleInsert = () => {
    onInsert(url, text);
    setUrl("");
    setText("");
  };

  const handleCancel = () => {
    setUrl("");
    setText("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass border-glow max-w-lg max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-foreground">
            <Link className="h-5 w-5 text-primary" />
            Insert Link
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="link-url" className="text-muted-foreground">
              URL
            </Label>
            <Input
              id="link-url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="bg-muted/50 border-border/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="link-text" className="text-muted-foreground">
              Link Text (optional)
            </Label>
            <Input
              id="link-text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Click here"
              className="bg-muted/50 border-border/50"
            />
            <p className="text-xs text-muted-foreground">
              Leave empty to apply link to selected text
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={handleCancel}
            className="border-border/50"
          >
            Cancel
          </Button>
          <Button
            onClick={handleInsert}
            disabled={!url}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Insert Link
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
