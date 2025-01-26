"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ThumbsUp } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { trimText } from "@/helper/text";
import { useLikeUnlikePost, usePostList } from "@/api/post-api";
import { useState } from "react";
import { formatDate } from "@/helper/text";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { usePostComment } from "@/api/post-api";
import { useUser } from "@/contexts/userContext";
export default function PostList() {
  const [tags, setTags] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const postList = usePostList(tags);
  const postComment = usePostComment();
  const likeUnlikePost = useLikeUnlikePost();
  const postData = postList.data?.data;
  const user = useUser();

  const postLikeUnlike = async (post_id) => {
    try {
      const token = localStorage.getItem("token-user");
      const response = await likeUnlikePost.mutateAsync({
        post_id,
        token,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const commentPostUser = async (post_id) => {
    try {
      const token = localStorage.getItem("token-user");
      const response = await postComment.mutateAsync({
        post_id,
        content: commentInput,
        token,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {postData?.map((val, i) => {
        return (
          <Card className="md:w-[670px] m-auto mt-5 p-3" key={i}>
            <CardHeader>
              <CardTitle className="text-xl">
                {trimText(val.title, 120)}
              </CardTitle>

              <CardDescription className="text-gray-800 font-semibold flex items-center justify-between pr-5">
                <div>
                  <p>{val.User.username}</p>
                  <p className="text-xs opacity-85">
                    {formatDate(val.created_at)}
                  </p>
                </div>
                {user && (
                  <div className="flex gap-4 items-center">
                    <div className="mt-1">
                      {val.Like.length} <span> like</span>
                    </div>
                    {val.Like.some((item) => item.user_id === user?.id) ? (
                      <ThumbsUp
                        className={"text-blue-700 hover:cursor-pointer size-5"}
                        onClick={() => postLikeUnlike(val.post_id)}
                      />
                    ) : (
                      <ThumbsUp
                        className={
                          "hover:text-blue-700 hover:cursor-pointer size-5"
                        }
                        onClick={() => postLikeUnlike(val.post_id)}
                      />
                    )}
                  </div>
                )}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-5">{trimText(val.content, 500)}</p>
              <h3 className="font-bold text-md mb-3">Comments</h3>
              {user && (
                <div className="flex items-center gap-3 mb-4">
                  <Input onChange={(e) => setCommentInput(e.target.value)} />
                  <Button
                    className="text-sm py-0 "
                    variant=""
                    onClick={() => commentPostUser(val.post_id)}
                  >
                    Comment
                  </Button>
                </div>
              )}
              {val.Comment.length ? (
                val?.Comment.map((val, i) => {
                  return (
                    <div key={i}>
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-semibold opacity-65">
                          {val.User.username}
                        </p>
                        <p className="text-xs">{formatDate(val.created_at)}</p>
                      </div>
                      <p className="text-sm">{trimText(val.content, 265)}</p>
                      <Separator className="my-3" />
                    </div>
                  );
                })
              ) : (
                <div className="text-sm">no comment yet</div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
