import { Page, TitlePropertyValue, RichTextText, File } from "@notionhq/client/build/src/api-types";

interface HeaderProps {
  page: Page;
  children?: React.ReactNode;
}

export default function Header({ page }: HeaderProps) {
  return (
    <div>
      <img
        alt="header"
        src={(page.cover as File).file.url}
        style={{ width: "100vw", height: "300px" }}
      />
      <p>{((page.properties.title as TitlePropertyValue).title[0] as RichTextText).text.content}</p>
    </div>
  );
}
