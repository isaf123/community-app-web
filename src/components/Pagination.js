import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Pagination = ({ page, setPage, maxPage }) => {
  return (
    <div className=" flex gap-4 text-2xl">
      <Button
        disabled={page == 1}
        className={"border bg-white shadow-m px-3 py-3"}
        onClick={() => {
          if (page > 1) {
            setPage(page - 1);
          }
        }}
      >
        <ChevronLeft className="text-black hover:text-white"></ChevronLeft>
      </Button>

      <Button
        disabled={page == maxPage}
        className={"border bg-white  shadow-md opacity-100 px-3 py-3"}
        onClick={() => {
          if (page < maxPage) {
            setPage(page + 1);
          }
        }}
      >
        <ChevronRight className="text-black hover:text-white"></ChevronRight>
      </Button>
    </div>
  );
};

export default Pagination;
