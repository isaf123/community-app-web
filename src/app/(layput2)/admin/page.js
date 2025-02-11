"use client";
import { useEffect, useState } from "react";
import { usePostListAdmin } from "@/api/admin-api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate, trimText } from "@/helper/text";
import Pagination from "@/components/Pagination";
import { Pencil, CircleX } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogAction,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Textarea } from "@/components/ui/textarea";
import { useRef } from "react";
import { useUpdatePost, useDeletePost } from "@/api/admin-api";
import { showMessage } from "@/components/alert-toast/toast";
import Cookies from "js-cookie";
export default function AdminPage() {
  const [page, setPage] = useState(1);
  const { data } = usePostListAdmin(page);
  const postList = data?.data;
  const count = postList?.count;
  const updateRef = useRef();
  const updatePost = useUpdatePost();
  const deletePost = useDeletePost();
  const token = Cookies.get("token-user");

  const postUpdate = async (post_id) => {
    try {
      const response = await updatePost.mutateAsync({
        post_id,
        token,
        content: updateRef.current.value,
      });
      showMessage("update success", "success");
    } catch (error) {
      console.log(error);
    }
  };

  const postDelete = async (post_id) => {
    try {
      const response = await deletePost.mutateAsync({
        post_id,
        token,
      });
      showMessage("delete success", "success");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>title</TableHead>
            <TableHead>creator</TableHead>
            <TableHead>create date</TableHead>
            <TableHead>tags</TableHead>
            <TableHead>content</TableHead>
            <TableHead>edit</TableHead>
            <TableHead>delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {postList?.data?.map((val, i) => {
            return (
              <TableRow key={i}>
                <TableCell>{val.title}</TableCell>
                <TableCell>{val.User.username}</TableCell>
                <TableCell>{formatDate(val.created_at)}</TableCell>
                <TableCell>{val.tags}</TableCell>
                <TableCell>{trimText(val.content, 38)}</TableCell>
                <TableCell>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline">
                        <Pencil />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>{val.title}</AlertDialogTitle>
                        <AlertDialogDescription>
                          edit post
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <Textarea
                        defaultValue={val.content}
                        className="min-h-[220px]"
                        ref={updateRef}
                      />
                      <AlertDialogFooter>
                        <AlertDialogCancel>cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => postUpdate(val.post_id)}
                        >
                          update
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
                <TableCell>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive">
                        <CircleX />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogTitle>{val.title}</AlertDialogTitle>
                      <AlertDialogDescription>
                        delete this post ?
                      </AlertDialogDescription>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-red-600 hover:bg-red-400"
                          onClick={() => postDelete(val.post_id)}
                        >
                          delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <div className="flex justify-end">
        <Pagination maxPage={count} page={page} setPage={setPage}></Pagination>
      </div>
    </div>
  );
}
