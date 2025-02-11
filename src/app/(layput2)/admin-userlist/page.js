"use client";
import { useUserList } from "@/api/admin-api";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Pagination from "@/components/Pagination";
export default function userList() {
  const [page, setPage] = useState(1);
  const userList = useUserList(page);
  const listUser = userList?.data;
  const count = listUser?.count;

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>name</TableHead>
            <TableHead>username</TableHead>
            <TableHead>created date</TableHead>
            <TableHead>total post</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {userList ? (
            listUser?.data?.map((val, i) => {
              return (
                <TableRow key={i}>
                  <TableCell>{val.name}</TableCell>
                  <TableCell>{val.username}</TableCell>
                  <TableCell>{val.created_at}</TableCell>
                  <TableCell>{val._count.post}</TableCell>
                </TableRow>
              );
            })
          ) : (
            <></>
          )}
        </TableBody>
      </Table>
      <div className="flex justify-end">
        <Pagination maxPage={count} page={page} setPage={setPage} />
      </div>
    </div>
  );
}
