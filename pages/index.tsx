import { useState, useEffect } from "react";
import UserInfo from "components/UserInfo";
import { Block, Page, PersonUser } from "@notionhq/client/build/src/api-types";

export default function Home() {
  const [user, setUser] = useState<PersonUser | null>();
  const [page, setPage] = useState<Page | null>();
  const [blocks, setBlocks] = useState<Block[] | null>();

  useEffect(() => {
    async function getUser() {
      const { result } = await fetch("/api/notion/user").then((res) => res.json());
      const [user] = result.results;

      console.log(result);

      setUser(user);
    }

    async function getPage() {
      const { page, blocks } = await fetch("/api/notion/page").then((res) => res.json());
      console.log(
        page,
        blocks.results.filter((block) => block.type !== "unsupported")
      );

      setPage(page);
      setBlocks(blocks);
    }

    getUser();
    getPage();
  }, []);

  if (!user) return <>User Loading...</>;

  return (
    <div>
      <UserInfo user={user} />
    </div>
  );
}
