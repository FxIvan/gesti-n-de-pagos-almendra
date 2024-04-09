import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import LoginScreen from "components/app/components/Login";

export default async function Login() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/protect/admin");
  }

  return (
    <div>
      <LoginScreen />
    </div>
  );
}
