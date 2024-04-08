import { getServerSession } from "next-auth/next";
import { authOptions } from "../../api/auth/[...nextauth]/route";

import HeaderAuth from "./Auth";
import HeaderNoAuth from "./NoAuth";

export default async function Header() {
  const session = await getServerSession(authOptions);
  return <div>{session ? <HeaderAuth /> : <HeaderNoAuth />}</div>;
}
