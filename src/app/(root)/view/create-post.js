"use client";
import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { useCreatePost } from "@/api/post-api";
import { showMessage } from "@/components/alert-toast/toast";
import { showError } from "@/helper/errorToast";
import Cookies from "js-cookie";
export default function CreatePost(props) {
  const [post, setPost] = useState({ title: "", content: "", tags: [] });
  const inputRef = useRef(null);
  const createPost = useCreatePost();

  const handleTags = () => {
    if (inputRef.current.value) {
      const newArr = [...post.tags, inputRef.current.value.replace(/\s+/g, "")];
      setPost({ ...post, tags: newArr });
      inputRef.current.value = "";
    }
  };

  const createPostUser = async () => {
    try {
      const { title, content, tags } = post;

      if (!title | !content | !tags.length) throw "please fill all field";
      const token = Cookies.get("token-user");
      const response = await createPost.mutateAsync({
        title,
        content,
        tags,
        token,
      });
      showMessage(response.message, "success");
    } catch (error) {
      console.log(error);
      showError(error);
    }
  };
  return (
    <Card x-chunk="dashboard-07-chunk-0 " className=" md:w-[670px] mb-8 m-auto">
      <CardHeader>
        <CardTitle className="font-extrabold">Create your post here</CardTitle>
        <CardDescription>
          post your thought to connect to community
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="grid gap-3">
            <div className="grid gap-3">
              <Label htmlFor="description">Post</Label>
              <Input
                id="title"
                type="text"
                className="w-full"
                placeholder="Title"
                onChange={(e) => {
                  setPost({ ...post, title: e.target.value });
                }}
              />
            </div>
            <Textarea
              id="description"
              placeholder="Content"
              className="min-h-32"
              onChange={(e) => {
                setPost({ ...post, content: e.target.value });
              }}
            />
            <div className="flex gap-2">
              <Input
                ref={inputRef}
                id="tags"
                type="text"
                className="w-full"
                placeholder="Tag"
              />
              <Button variant="secondary" onClick={handleTags}>
                add Tags
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {post.tags.length ? (
                post.tags.map((val, i) => {
                  return (
                    <Badge key={i} variant={"secondary"}>
                      <button
                        className="flex gap-2"
                        onClick={() => {
                          const newTags = post.tags.filter(
                            (data) => data !== val
                          );
                          setPost({ ...post, tags: newTags });
                        }}
                      >
                        <p>{val}</p>
                        <p className="hover:cursor-pointer text-red-600">x</p>
                      </button>
                    </Badge>
                  );
                })
              ) : (
                <></>
              )}
            </div>
            <Button onClick={createPostUser}>Create Your Post</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
