import notion from "./client";

export default async function getUser(req, res) {
  const listUsersResponse = await notion.users.list();

  res.status(200).json({ result: listUsersResponse });
}
