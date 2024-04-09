import { redirect } from "next/navigation";
const redirectPanelAdmin = () => {
  return redirect("/auth/login");
};

export default function Home() {
  redirectPanelAdmin();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24"></main>
  );
}
