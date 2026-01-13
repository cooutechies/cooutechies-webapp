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
import { Image as ImageIcon, Upload, Link2, Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { uploadFileToS3 } from "@/lib/uploadFileToS3";
import { toast } from "sonner";
import Image from "next/image";

interface InsertImageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onInsert: (
    url: string,
    alt: string,
    alignment: "left" | "center" | "right"
  ) => void;
}

export function InsertImageDialog({
  open,
  onOpenChange,
  onInsert,
}: InsertImageDialogProps) {
  const [url, setUrl] = useState("");
  const [alt, setAlt] = useState("");
  const [alignment, setAlignment] = useState<"left" | "center" | "right">(
    "center"
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string>("");

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    setSelectedFile(file);

    // Create preview URL
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleUploadNow = async () => {
    if (!selectedFile) return;

    setUploading(true);
    try {
      const s3Url = await uploadFileToS3(selectedFile);
      setUploadedUrl(s3Url);
      toast.success("Image uploaded successfully!");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleInsert = () => {
    const finalUrl = uploadedUrl || url;

    if (!finalUrl) {
      toast.error("Please provide an image URL or upload an image");
      return;
    }

    onInsert(finalUrl, alt || "Image", alignment);

    // Reset state
    setUrl("");
    setAlt("");
    setAlignment("center");
    setSelectedFile(null);
    setPreviewUrl("");
    setUploadedUrl("");
  };

  const handleCancel = () => {
    setUrl("");
    setAlt("");
    setAlignment("center");
    setSelectedFile(null);
    setPreviewUrl("");
    setUploadedUrl("");
    onOpenChange(false);
  };

  const currentPreview = uploadedUrl || previewUrl || url;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass border-glow max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-foreground">
            <ImageIcon className="h-5 w-5 text-primary" />
            Insert Image
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="url" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-muted/30">
            <TabsTrigger value="url" className="gap-2">
              <Link2 className="h-4 w-4" />
              From URL
            </TabsTrigger>
            <TabsTrigger value="upload" className="gap-2">
              <Upload className="h-4 w-4" />
              Upload File
            </TabsTrigger>
          </TabsList>

          {/* URL Tab */}
          <TabsContent value="url" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="image-url" className="text-muted-foreground">
                Image URL
              </Label>
              <Input
                id="image-url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="bg-muted/50 border-border/50"
              />
            </div>
          </TabsContent>

          {/* Upload Tab */}
          <TabsContent value="upload" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="image-file" className="text-muted-foreground">
                Select Image
              </Label>
              <div className="flex gap-2">
                <Input
                  id="image-file"
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="bg-muted/50 border-border/50 cursor-pointer"
                />
                {selectedFile && !uploadedUrl && (
                  <Button
                    onClick={handleUploadNow}
                    disabled={uploading}
                    variant="outline"
                    className="shrink-0"
                  >
                    {uploading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Now
                      </>
                    )}
                  </Button>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                {uploadedUrl
                  ? "✓ Image uploaded! Click 'Insert Image' to add it."
                  : selectedFile
                  ? "Click 'Upload Now' to upload before inserting, or insert directly (upload happens on send)."
                  : "Max size: 5MB. Supported formats: JPG, PNG, GIF, WebP"}
              </p>
            </div>

            {selectedFile && (
              <div className="p-3 bg-muted/20 rounded-lg border border-border/30">
                <p className="text-xs font-medium text-foreground mb-1">
                  Selected file:
                </p>
                <p className="text-xs text-muted-foreground">
                  {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)}{" "}
                  KB)
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Common Fields */}
        <div className="space-y-4 pt-4 border-t border-border/30">
          <div className="space-y-2">
            <Label htmlFor="image-alt" className="text-muted-foreground">
              Alt Text (for accessibility)
            </Label>
            <Input
              id="image-alt"
              value={alt}
              onChange={(e) => setAlt(e.target.value)}
              placeholder="Describe the image"
              className="bg-muted/50 border-border/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image-alignment" className="text-muted-foreground">
              Alignment
            </Label>
            <Select
              value={alignment}
              onValueChange={(value) =>
                setAlignment(value as "left" | "center" | "right")
              }
            >
              <SelectTrigger className="bg-muted/50 border-border/50">
                <SelectValue placeholder="Select alignment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="left">Left</SelectItem>
                <SelectItem value="center">Center</SelectItem>
                <SelectItem value="right">Right</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Preview */}
          {currentPreview && (
            <div className="p-4 bg-muted/30 rounded-xl border border-border/20">
              <p className="text-xs text-muted-foreground mb-2 flex items-center gap-2">
                Preview:
                {uploadedUrl && (
                  <span className="text-green-500 font-medium">✓ Uploaded</span>
                )}
              </p>
              <div
                style={{
                  textAlign: alignment,
                }}
              >
                <div className="relative inline-block max-h-48 w-auto">
                  <Image
                    src={currentPreview}
                    alt={alt || "Image preview"}
                    width={400}
                    height={192}
                    className="max-h-48 rounded-lg object-contain border border-border/30"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
              </div>
            </div>
          )}
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
            disabled={!url && !selectedFile && !uploadedUrl}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Insert Image
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
