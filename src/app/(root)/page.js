"use client";
import * as React from "react";
import CreatePost from "./view/create-post";
import PostList from "./view/post-list";
import { useUser } from "@/contexts/userContext";

export default function HomePage(props) {
  const user = useUser();

  return (
    <div className="min-h-screen py-32 w-full m-auto md:w-[670px]">
      {user ? <CreatePost /> : <></>}
      <PostList />
    </div>
  );
}
``;
