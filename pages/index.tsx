import { useState, useEffect } from "react";
import getConfig from "next/config";
import {
  Block as BlockType,
  Page as PageType,
  PersonUser as PersonUserType,
} from "@notionhq/client/build/src/api-types";

import Header from "components/Header";
import UserInfo from "components/UserInfo";
import Content from "components/Content";
import { fetcher } from "utils/api";

const { publicRuntimeConfig } = getConfig();
const initPage: string = publicRuntimeConfig.NOTION_PAGE_ID;

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

    async function getBlocks(id: string, cursor?: string) {
      const url = !cursor
        ? `/api/notion/blocks?id=${id}`
        : `/api/notion/blocks?id=${id}&next_cursor=${cursor}`;

      const { next_cursor, results } = await (await fetcher(url)).blocks;

      const filteredBlocks = results.filter((block) => block.type !== "unsupported");
      if (next_cursor) getBlocks(id, next_cursor);

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

Home.getInitialProps = async function () {
  return {};
};
