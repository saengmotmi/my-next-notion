import { useState, useEffect } from "react";
import {
  Block,
  ParagraphBlock,
  HeadingOneBlock,
  HeadingTwoBlock,
  HeadingThreeBlock,
  BulletedListItemBlock,
  NumberedListItemBlock,
  ToDoBlock,
  ToggleBlock,
  ChildPageBlock,
  EmbedBlock,
  BookmarkBlock,
  ImageBlock,
  VideoBlock,
  FileBlock,
  PDFBlock,
  AudioBlock,
  UnsupportedBlock,
} from "@notionhq/client/build/src/api-types";

export interface ContentProps {
  block: Block;
  children?: React.ReactNode;
}

export default function Content({ block }: ContentProps) {
  return <div>{switcher(block)}</div>;
}

function switcher(block) {
  switch (block.type) {
    case "paragraph":
      return <ParagraphContent block={block} />;
    // case "heading_1":
    //   return block as HeadingOneBlock;
    case "heading_2":
      return <Heading2Content block={block} />;
    // case "heading_3":
    //   return block as HeadingThreeBlock;
    case "bulleted_list_item":
      return <BulletContent block={block} />;
    // case "numbered_list_item":
    //   return block as NumberedListItemBlock;
    // case "to_do":
    //   return block as ToDoBlock;
    case "toggle":
      return <ToggleContent block={block} />;
    // case "child_page":
    //   return block as ChildPageBlock;
    // case "embed":
    //   return block as EmbedBlock;
    // case "bookmark":
    //   return block as BookmarkBlock;
    // case "image":
    //   return block as ImageBlock;
    // case "video":
    //   return block as VideoBlock;
    // case "file":
    //   return block as FileBlock;
    // case "pdf":
    //   return block as PDFBlock;
    // case "audio":
    //   return block as AudioBlock;
    // case "unsupported":
    //   return block as UnsupportedBlock;
  }
}

function ParagraphContent({ block }: { block: ParagraphBlock }) {
  return <div>{block.paragraph.text.map((p) => p.plain_text)}</div>;
}

function Heading2Content({ block }: { block: HeadingTwoBlock }) {
  return <h2>{block.heading_2.text.map((h) => h.plain_text)}</h2>;
}

function BulletContent({ block }: { block: BulletedListItemBlock }) {
  return (
    <ol style={{ marginBottom: "10px" }}>
      {block.bulleted_list_item.text.map((b, idx) => (
        <a key={idx} href={b.href}>
          {b.plain_text}
        </a>
      ))}
    </ol>
  );
}

function ToggleContent({ block }: { block: ToggleBlock }) {
  const [children, setChildren] = useState<Block[] | null>(null);

  useEffect(() => {
    async function getChildrenBlocks() {
      const { blocks } = await fetch(`/api/notion/blocks?id=${block.id}`).then((res) => res.json());

      setChildren(blocks.results);
    }

    if (block.has_children) getChildrenBlocks();
  }, []);

  return (
    <>
      <div>{block.toggle.text.map((t) => t.plain_text)}</div>
      {children?.map((b) => switcher(b))}
    </>
  );
}
