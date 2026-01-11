export type BlockType =
  | "heading"
  | "text"
  | "image"
  | "button"
  | "divider"
  | "spacer"
  | "link";

export type TextAlign = "left" | "center" | "right";
export type HeadingLevel = "h1" | "h2" | "h3";

export interface BaseBlock {
  id: string;
  type: BlockType;
  order: number;
}

export interface HeadingBlock extends BaseBlock {
  type: "heading";
  content: string;
  level: HeadingLevel;
  align: TextAlign;
  color?: string;
}

export interface TextBlock extends BaseBlock {
  type: "text";
  content: string;
  align: TextAlign;
  color?: string;
}

export interface ImageBlock extends BaseBlock {
  type: "image";
  url: string;
  alt: string;
  width?: number;
  align: TextAlign;
  link?: string;
}

export interface ButtonBlock extends BaseBlock {
  type: "button";
  text: string;
  url: string;
  align: TextAlign;
  backgroundColor?: string;
  textColor?: string;
}

export interface DividerBlock extends BaseBlock {
  type: "divider";
  color?: string;
}

export interface SpacerBlock extends BaseBlock {
  type: "spacer";
  height: number;
}

export interface LinkBlock extends BaseBlock {
  type: "link";
  text: string;
  url: string;
  align: TextAlign;
  color?: string;
}

export type EmailBlock =
  | HeadingBlock
  | TextBlock
  | ImageBlock
  | ButtonBlock
  | DividerBlock
  | SpacerBlock
  | LinkBlock;

export interface EmailTemplate {
  subject: string;
  blocks: EmailBlock[];
}
