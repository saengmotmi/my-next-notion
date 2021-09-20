import notion from "./client";

export default async function handler(req, res) {
  const { id, next_cursor } = req.query;

  const blocks = await notion.blocks.children.list({
    block_id: id,
    start_cursor: next_cursor || undefined,
  });

  res.status(200).json({ blocks });
}
