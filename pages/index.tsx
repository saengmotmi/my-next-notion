import { useState, useEffect } from "react";
import getConfig from "next/config";
import {
  Block as BlockType,
  Page as PageType,
  PersonUser as PersonUserType,
} from "@notionhq/client/build/src/api-types";

import UserInfo from "components/UserInfo";
import Content from "components/Content";

const { publicRuntimeConfig } = getConfig();

async function fetcher(url: string) {
  return await fetch(url).then((res) => res.json());
}

export default function Home() {
  const [user, setUser] = useState<PersonUserType | null>();
  const [page, setPage] = useState<PageType | null>();
  const [blocks, setBlocks] = useState<BlockType[]>([]);

  useEffect(() => {
    async function getUser() {
      const { result } = await fetcher("/api/notion/user");
      const [user] = result.results;

      setUser(user);
    }

    async function getPage() {
      const { page } = await fetcher("/api/notion/page");

      setPage(page);
    }

    const initPage: string = publicRuntimeConfig.NOTION_PAGE_ID;
    async function getBlocks(id: string, next_cursor?: string) {
      let blocks;

      if (!next_cursor) {
        blocks = await (await fetcher(`/api/notion/blocks?id=${id}`)).blocks;
      } else {
        blocks = await (
          await fetcher(`/api/notion/blocks?id=${id}&next_cursor=${next_cursor}`)
        ).blocks;
      }

      const filteredBlocks = blocks.results.filter((block) => block.type !== "unsupported");
      if (blocks.next_cursor) {
        getBlocks(id, blocks.next_cursor);
      }
      setBlocks((prev) => [...prev, ...filteredBlocks]);
    }

    getUser();
    getPage();
    getBlocks(initPage);
  }, []);

  if (!user) return <>User Loading...</>;
  if (!blocks.length) return <>Contents Loading...</>;
  if (!page) return <>Page Loading...</>;

  return (
    <div>
      <Header page={page} />
      <UserInfo user={user} />
      {blocks.map((block, idx) => (
        <Content key={idx} block={block} />
      ))}
    </div>
  );
}

interface HeaderProps {
  page: PageType;
  children?: React.ReactNode;
}

function Header({ page }: HeaderProps) {
  return (
    <div>
      <img alt="header" src={page.cover.file.url} style={{ width: "100vw", height: "300px" }} />
      <p>{page.properties.title.title[0].text.content}</p>
    </div>
  );
}
