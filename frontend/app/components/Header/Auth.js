"use client";
import { signOut } from "next-auth/react";
export default function HeaderAuth() {
  const logoutHandler = async () => {
    await signOut({
      callbackUrl: `http://localhost:3000/auth/login`,
    });
  };

  return (
    <div className="container mx-auto">
      <div className="w-full text-end py-8 px-4">
        <buttton
          onClick={() => logoutHandler()}
          className="text-md font-semibold leading-6 text-gray-900 cursor-pointer"
        >
          Salir
        </buttton>
      </div>
    </div>
  );
}
