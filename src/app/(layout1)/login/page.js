"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLoginUser } from "@/api/user-api";
import { useState } from "react";
import { showMessage } from "@/components/alert-toast/toast";
import { showError } from "@/helper/errorToast";
import { useRouter } from "next/navigation";
export default function LoginForm() {
  const loginUser = useLoginUser();
  const [data, setData] = useState({ username: "", password: "" });
  const router = useRouter();
  const login = async () => {
    try {
      const { username, password } = data;
      if (!username || !password) {
        throw "please fill email and username";
      }
      const response = await loginUser.mutateAsync({
        username,
        password,
      });

      localStorage.setItem("token-user", response.token);
      showMessage("login success", "success");
      router.push("/");
    } catch (error) {
      showError(error);
    }
  };
  return (
    <div className="w-full max-w-sm m-auto ">
      <div className={"flex flex-col gap-6 min-h-screen"}>
        <Card className="my-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your username below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    type=""
                    placeholder="john"
                    required
                    onChange={(e) =>
                      setData({ ...data, username: e.target.value })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    required
                    onChange={(e) =>
                      setData({ ...data, password: e.target.value })
                    }
                  />
                </div>
                <Button
                  type="button"
                  className="w-full"
                  onClick={() => login()}
                >
                  Login
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <a href="#" className="underline underline-offset-4">
                  Sign up
                </a>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
