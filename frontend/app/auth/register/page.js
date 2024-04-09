"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

export default function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const errorUrl = searchParams.get("error");

  useEffect(() => {
    if (errorUrl) {
      const decodedErrorMessage = atob(errorUrl);
      myToast({
        variant: "danger",
        children: decodedErrorMessage,
      });
      router.replace("/auth/login");
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const registerHandler = async (e) => {
    e.preventDefault();
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      })
        .then(async (res) => {
          return res.json();
        })
        .then(async (data) => {
          if (data.status) {
            await signIn("credentials", {
              email: form.email,
              password: form.password,
              redirect: false,
            });
            router.push("/protect/admin");
          }
        });
    } catch (error) {
      console.error("Exception during login:", error);
    }
  };

  return (
    <div className="p-6 bg-white shadow-md h-screen text-center items-center flex justify-center">
      <div className="flex flex-col items-center">
        <form>
          <input
            className="text-black w-full px-4 py-3 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
            type="text"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <input
            className="text-black w-full px-4 py-3 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
          <button
            type="submit"
            className=" bg-black hover:bg-blue-600 text-white font-bold py-3 rounded-lg focus:outline-none focus:shadow-outline"
            onClick={registerHandler}
          >
            <span className="flex justify-between items-center py-2 px-4">
              Registrarse
            </span>
          </button>
        </form>
      </div>
    </div>
  );
}
