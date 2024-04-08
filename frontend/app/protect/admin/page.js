import { getServerSession } from "next-auth/next";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import PanelAdmin from "components/app/components/Admin";

export default async function AdminPanel() {
  const session = await getServerSession(authOptions);
  return (
    <div className={``}>
      <PanelAdmin session={session} />
    </div>
  );
}
