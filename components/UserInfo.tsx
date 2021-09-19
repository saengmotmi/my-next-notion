import { PersonUser } from "@notionhq/client/build/src/api-types";

interface UserInfoProps {
  user: PersonUser;
  children?: React.ReactNode;
}

export default function UserInfo({ user }: UserInfoProps) {
  return (
    <>
      <p>{user.name}</p>
      <img alt="profile" src={user.avatar_url} />
      <p>{user.person.email}</p>
    </>
  );
}
