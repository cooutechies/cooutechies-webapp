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
import { MousePointerClick } from "lucide-react";

interface InsertButtonDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onInsert: (
    text: string,
    url: string,
    bgColor: string,
    textColor: string
  ) => void;
}

export function InsertButtonDialog({
  open,
  onOpenChange,
  onInsert,
}: InsertButtonDialogProps) {
  const [text, setText] = useState("Click Here");
  const [url, setUrl] = useState("");
  const [bgColor, setBgColor] = useState("#22c55e");
  const [textColor, setTextColor] = useState("#ffffff");

  const handleInsert = () => {
    onInsert(text, url, bgColor, textColor);
    setText("Click Here");
    setUrl("");
    setBgColor("#22c55e");
    setTextColor("#ffffff");
  };

  const handleCancel = () => {
    setText("Click Here");
    setUrl("");
    setBgColor("#22c55e");
    setTextColor("#ffffff");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass border-glow max-w-lg max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-foreground">
            <MousePointerClick className="h-5 w-5 text-primary" />
            Insert Button
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="button-text" className="text-muted-foreground">
              Button Text
            </Label>
            <Input
              id="button-text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Click Here"
              className="bg-muted/50 border-border/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="button-url" className="text-muted-foreground">
              Link URL
            </Label>
            <Input
              id="button-url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="bg-muted/50 border-border/50"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="bg-color" className="text-muted-foreground">
                Background Color
              </Label>
              <div className="flex gap-2">
                <Input
                  id="bg-color"
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-12 h-10 p-1 bg-muted/50 border-border/50 cursor-pointer"
                />
                <Input
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="flex-1 bg-muted/50 border-border/50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="text-color" className="text-muted-foreground">
                Text Color
              </Label>
              <div className="flex gap-2">
                <Input
                  id="text-color"
                  type="color"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="w-12 h-10 p-1 bg-muted/50 border-border/50 cursor-pointer"
                />
                <Input
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="flex-1 bg-muted/50 border-border/50"
                />
              </div>
            </div>
          </div>

          {/* Enhanced Preview */}
          <div className="p-6 bg-muted/30 rounded-xl border border-border/20">
            <p className="text-xs text-muted-foreground mb-4">Preview:</p>
            <div className="text-center">
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                style={{
                  display: "inline-block",
                  padding: "0 36px",
                  backgroundColor: bgColor,
                  color: textColor,
                  borderRadius: "10px",
                  fontWeight: 700,
                  fontSize: "18px",
                  lineHeight: "54px",
                  textDecoration: "none",
                  border: `2px solid ${bgColor}`,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  minWidth: "180px",
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = "0.9";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = "1";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {text || "Button Text"}
              </a>
            </div>
            <p className="text-xs text-muted-foreground mt-3 text-center">
              This is how your button will appear in emails
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
            disabled={!text || !url}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Insert Button
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
