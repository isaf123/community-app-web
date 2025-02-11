"use client";
import { useUser } from "@/contexts/userContext";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function Topbar() {
  const user = useUser();
  const router = useRouter();
  if (user) {
    return (
      <div className="w-full h-[76px] bg-slate-50 shadow-md  top-0 flex justify-between items-center px-8 fixed z-50">
        <p className="text-4xl font-extrabold italic text-blue-500">
          c<span className="font-semibold text-xl text-gray-600">-post</span>
        </p>
        <div className="flex items-center gap-4">
          <h3> {user.username}</h3>
          <Button
            onClick={() => {
              Cookies.remove("token-user");
              window.location.reload();
            }}
          >
            Logout
          </Button>
        </div>
      </div>
    );
  }
  return (
    <div className="w-full h-[76px] bg-slate-50 shadow-md  top-0 flex justify-between items-center px-8 fixed z-50">
      <p className="text-4xl font-extrabold italic text-blue-500">
        c<span className="font-semibold text-xl text-gray-600">-post</span>
      </p>
      <div className="flex items-center gap-4">
        <Button onClick={() => router.push("/login")}>Login</Button>
        <Button onClick={() => router.push("/register")}>Register</Button>
      </div>
    </div>
  );
}
