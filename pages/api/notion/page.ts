import notion from "./client";

const pageId = process.env.NOTION_PAGE_ID;

export default async function handler(req, res) {
  const page = await notion.pages.retrieve({
    page_id: pageId,
  });

  const blocks = await notion.blocks.children.list({
    block_id: pageId,
  });

  res.status(200).json({ page, blocks });
}
