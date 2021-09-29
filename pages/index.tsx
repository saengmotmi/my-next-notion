import { AppContext } from "next/app";
import {
  Block as BlockType,
  Page as PageType,
  PersonUser as PersonUserType,
} from "@notionhq/client/build/src/api-types";

import Header from "components/Header";
import UserInfo from "components/UserInfo";
import Content from "components/Content";
import { fetcher } from "utils/api";

// const { publicRuntimeConfig } = getConfig();
// const initPage: string = publicRuntimeConfig.NOTION_PAGE_ID;

interface HomeProps {
  user: PersonUserType;
  page: PageType;
  blocks: BlockType[];
  children?: React.ReactNode;
}

export default function Home({ user, page, blocks }: HomeProps) {
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

export const getStaticProps = async function (context: AppContext) {
  async function getUser() {
    const { result } = await fetcher("/api/notion/user");
    return result.results[0];
  }

  async function getPage() {
    return await (
      await fetcher("/api/notion/page")
    ).page;
  }

  async function getBlocks(id: string) {
    let blocks: BlockType[] = [];

    return new Promise((resolve) => {
      (async function getBlock(id: string, cursor?: string) {
        const isFirstCalled = !cursor;

        const url = isFirstCalled
          ? `/api/notion/blocks?id=${id}`
          : `/api/notion/blocks?id=${id}&next_cursor=${cursor}`;

        const { next_cursor, results } = await (await fetcher(url)).blocks;

        const supportedBlocks = results.filter((block: BlockType) => block.type !== "unsupported");
        blocks = blocks.concat(supportedBlocks);

        if (next_cursor) {
          getBlock(id, next_cursor);
        } else {
          return resolve(blocks);
        }
      })(id);
    });
  }

  const user = await getUser();
  const page = await getPage();
  const blocks = await getBlocks(process.env.NOTION_PAGE_ID);

  return { props: { user, page, blocks } };
};
