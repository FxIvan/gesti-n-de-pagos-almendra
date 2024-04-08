import Link from "next/link";

export default function HeaderNoAuth() {
  <div className="container mx-auto">
    <div className="text-end">
      <Link href="/login">Login</Link>
    </div>
  </div>;
}
