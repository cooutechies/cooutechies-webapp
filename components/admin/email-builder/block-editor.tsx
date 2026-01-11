"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Trash2,
  GripVertical,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import type { EmailBlock } from "@/types/email-builder.types";

interface BlockEditorProps {
  blocks: EmailBlock[];
  onUpdateBlock: (id: string, updates: Partial<EmailBlock>) => void;
  onDeleteBlock: (id: string) => void;
  onReorderBlocks: (fromIndex: number, toIndex: number) => void;
}

export function BlockEditor({
  blocks,
  onUpdateBlock,
  onDeleteBlock,
  onReorderBlocks,
}: BlockEditorProps) {
  return (
    <div className="space-y-4">
      {blocks.map((block, index) => (
        <Card
          key={block.id}
          className="border-border/50 bg-muted/20 hover:bg-muted/30 transition-colors"
        >
          <div className="p-4">
            {/* Block Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <GripVertical className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-semibold text-foreground capitalize">
                  {block.type}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  onClick={() => index > 0 && onReorderBlocks(index, index - 1)}
                  disabled={index === 0}
                  variant="ghost"
                  size="sm"
                >
                  <ChevronUp className="h-4 w-4" />
                </Button>
                <Button
                  onClick={() => index < blocks.length - 1 && onReorderBlocks(index, index + 1)}
                  disabled={index === blocks.length - 1}
                  variant="ghost"
                  size="sm"
                >
                  <ChevronDown className="h-4 w-4" />
                </Button>
                <Button
                  onClick={() => onDeleteBlock(block.id)}
                  variant="ghost"
                  size="sm"
                  className="text-red-500 hover:text-red-600 hover:bg-red-500/10"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Block Content */}
            <div className="space-y-3">
              {block.type === 'heading' && (
                <HeadingBlockEditor block={block} onUpdate={onUpdateBlock} />
              )}
              {block.type === 'text' && (
                <TextBlockEditor block={block} onUpdate={onUpdateBlock} />
              )}
              {block.type === 'image' && (
                <ImageBlockEditor block={block} onUpdate={onUpdateBlock} />
              )}
              {block.type === 'button' && (
                <ButtonBlockEditor block={block} onUpdate={onUpdateBlock} />
              )}
              {block.type === 'link' && (
                <LinkBlockEditor block={block} onUpdate={onUpdateBlock} />
              )}
              {block.type === 'divider' && (
                <DividerBlockEditor block={block} onUpdate={onUpdateBlock} />
              )}
              {block.type === 'spacer' && (
                <SpacerBlockEditor block={block} onUpdate={onUpdateBlock} />
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

// Individual Block Editors

function HeadingBlockEditor({
  block,
  onUpdate,
}: {
  block: Extract<EmailBlock, { type: 'heading' }>;
  onUpdate: (id: string, updates: Partial<EmailBlock>) => void;
}) {
  return (
    <>
      <div>
        <Label className="text-xs text-muted-foreground">Content</Label>
        <Input
          value={block.content}
          onChange={(e) => onUpdate(block.id, { content: e.target.value })}
          className="mt-1 bg-background/50 border-border/50"
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label className="text-xs text-muted-foreground">Level</Label>
          <Select
            value={block.level}
            onValueChange={(value) => onUpdate(block.id, { level: value as any })}
          >
            <SelectTrigger className="mt-1 bg-background/50 border-border/50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="h1">H1</SelectItem>
              <SelectItem value="h2">H2</SelectItem>
              <SelectItem value="h3">H3</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">Alignment</Label>
          <Select
            value={block.align}
            onValueChange={(value) => onUpdate(block.id, { align: value as any })}
          >
            <SelectTrigger className="mt-1 bg-background/50 border-border/50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="left">Left</SelectItem>
              <SelectItem value="center">Center</SelectItem>
              <SelectItem value="right">Right</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        <Label className="text-xs text-muted-foreground">Color (optional)</Label>
        <Input
          type="color"
          value={block.color || '#ffffff'}
          onChange={(e) => onUpdate(block.id, { color: e.target.value })}
          className="mt-1 h-10 bg-background/50 border-border/50"
        />
      </div>
    </>
  );
}

function TextBlockEditor({
  block,
  onUpdate,
}: {
  block: Extract<EmailBlock, { type: 'text' }>;
  onUpdate: (id: string, updates: Partial<EmailBlock>) => void;
}) {
  return (
    <>
      <div>
        <Label className="text-xs text-muted-foreground">Content</Label>
        <Textarea
          value={block.content}
          onChange={(e) => onUpdate(block.id, { content: e.target.value })}
          rows={4}
          className="mt-1 bg-background/50 border-border/50"
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label className="text-xs text-muted-foreground">Alignment</Label>
          <Select
            value={block.align}
            onValueChange={(value) => onUpdate(block.id, { align: value as any })}
          >
            <SelectTrigger className="mt-1 bg-background/50 border-border/50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="left">Left</SelectItem>
              <SelectItem value="center">Center</SelectItem>
              <SelectItem value="right">Right</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">Color (optional)</Label>
          <Input
            type="color"
            value={block.color || '#e2e8f0'}
            onChange={(e) => onUpdate(block.id, { color: e.target.value })}
            className="mt-1 h-10 bg-background/50 border-border/50"
          />
        </div>
      </div>
    </>
  );
}

function ImageBlockEditor({
  block,
  onUpdate,
}: {
  block: Extract<EmailBlock, { type: 'image' }>;
  onUpdate: (id: string, updates: Partial<EmailBlock>) => void;
}) {
  return (
    <>
      <div>
        <Label className="text-xs text-muted-foreground">Image URL</Label>
        <Input
          value={block.url}
          onChange={(e) => onUpdate(block.id, { url: e.target.value })}
          placeholder="https://example.com/image.jpg"
          className="mt-1 bg-background/50 border-border/50"
        />
      </div>
      <div>
        <Label className="text-xs text-muted-foreground">Alt Text</Label>
        <Input
          value={block.alt}
          onChange={(e) => onUpdate(block.id, { alt: e.target.value })}
          placeholder="Description of the image"
          className="mt-1 bg-background/50 border-border/50"
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label className="text-xs text-muted-foreground">Width (px, optional)</Label>
          <Input
            type="number"
            value={block.width || ''}
            onChange={(e) => onUpdate(block.id, { width: e.target.value ? parseInt(e.target.value) : undefined })}
            placeholder="600"
            className="mt-1 bg-background/50 border-border/50"
          />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">Alignment</Label>
          <Select
            value={block.align}
            onValueChange={(value) => onUpdate(block.id, { align: value as any })}
          >
            <SelectTrigger className="mt-1 bg-background/50 border-border/50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="left">Left</SelectItem>
              <SelectItem value="center">Center</SelectItem>
              <SelectItem value="right">Right</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        <Label className="text-xs text-muted-foreground">Link URL (optional)</Label>
        <Input
          value={block.link || ''}
          onChange={(e) => onUpdate(block.id, { link: e.target.value })}
          placeholder="https://example.com"
          className="mt-1 bg-background/50 border-border/50"
        />
      </div>
    </>
  );
}

function ButtonBlockEditor({
  block,
  onUpdate,
}: {
  block: Extract<EmailBlock, { type: 'button' }>;
  onUpdate: (id: string, updates: Partial<EmailBlock>) => void;
}) {
  return (
    <>
      <div>
        <Label className="text-xs text-muted-foreground">Button Text</Label>
        <Input
          value={block.text}
          onChange={(e) => onUpdate(block.id, { text: e.target.value })}
          className="mt-1 bg-background/50 border-border/50"
        />
      </div>
      <div>
        <Label className="text-xs text-muted-foreground">Link URL</Label>
        <Input
          value={block.url}
          onChange={(e) => onUpdate(block.id, { url: e.target.value })}
          placeholder="https://example.com"
          className="mt-1 bg-background/50 border-border/50"
        />
      </div>
      <div>
        <Label className="text-xs text-muted-foreground">Alignment</Label>
        <Select
          value={block.align}
          onValueChange={(value) => onUpdate(block.id, { align: value as any })}
        >
          <SelectTrigger className="mt-1 bg-background/50 border-border/50">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="left">Left</SelectItem>
            <SelectItem value="center">Center</SelectItem>
            <SelectItem value="right">Right</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label className="text-xs text-muted-foreground">Background Color</Label>
          <Input
            type="color"
            value={block.backgroundColor || '#22c55e'}
            onChange={(e) => onUpdate(block.id, { backgroundColor: e.target.value })}
            className="mt-1 h-10 bg-background/50 border-border/50"
          />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">Text Color</Label>
          <Input
            type="color"
            value={block.textColor || '#ffffff'}
            onChange={(e) => onUpdate(block.id, { textColor: e.target.value })}
            className="mt-1 h-10 bg-background/50 border-border/50"
          />
        </div>
      </div>
    </>
  );
}

function LinkBlockEditor({
  block,
  onUpdate,
}: {
  block: Extract<EmailBlock, { type: 'link' }>;
  onUpdate: (id: string, updates: Partial<EmailBlock>) => void;
}) {
  return (
    <>
      <div>
        <Label className="text-xs text-muted-foreground">Link Text</Label>
        <Input
          value={block.text}
          onChange={(e) => onUpdate(block.id, { text: e.target.value })}
          className="mt-1 bg-background/50 border-border/50"
        />
      </div>
      <div>
        <Label className="text-xs text-muted-foreground">URL</Label>
        <Input
          value={block.url}
          onChange={(e) => onUpdate(block.id, { url: e.target.value })}
          placeholder="https://example.com"
          className="mt-1 bg-background/50 border-border/50"
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label className="text-xs text-muted-foreground">Alignment</Label>
          <Select
            value={block.align}
            onValueChange={(value) => onUpdate(block.id, { align: value as any })}
          >
            <SelectTrigger className="mt-1 bg-background/50 border-border/50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="left">Left</SelectItem>
              <SelectItem value="center">Center</SelectItem>
              <SelectItem value="right">Right</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">Color</Label>
          <Input
            type="color"
            value={block.color || '#22c55e'}
            onChange={(e) => onUpdate(block.id, { color: e.target.value })}
            className="mt-1 h-10 bg-background/50 border-border/50"
          />
        </div>
      </div>
    </>
  );
}

function DividerBlockEditor({
  block,
  onUpdate,
}: {
  block: Extract<EmailBlock, { type: 'divider' }>;
  onUpdate: (id: string, updates: Partial<EmailBlock>) => void;
}) {
  return (
    <div>
      <Label className="text-xs text-muted-foreground">Color</Label>
      <Input
        type="color"
        value={block.color || '#94a3b8'}
        onChange={(e) => onUpdate(block.id, { color: e.target.value })}
        className="mt-1 h-10 bg-background/50 border-border/50"
      />
    </div>
  );
}

function SpacerBlockEditor({
  block,
  onUpdate,
}: {
  block: Extract<EmailBlock, { type: 'spacer' }>;
  onUpdate: (id: string, updates: Partial<EmailBlock>) => void;
}) {
  return (
    <div>
      <Label className="text-xs text-muted-foreground">Height (px)</Label>
      <Input
        type="number"
        value={block.height}
        onChange={(e) => onUpdate(block.id, { height: parseInt(e.target.value) || 32 })}
        min="8"
        max="200"
        step="8"
        className="mt-1 bg-background/50 border-border/50"
      />
    </div>
  );
}
