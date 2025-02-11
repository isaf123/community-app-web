"use client";

import { UserChart } from "./view/userChart";
import { TagChart } from "./view/tagChart";
import { DatePickerWithRange } from "@/components/DateRange";
import { useState } from "react";
import { useDashboardStat } from "@/api/admin-api";
import OverView from "@/components/overView";
import { UsersRound, Send, Tag } from "lucide-react";
import { PostChart } from "./view/postChart";
export default function dashboardAdmin() {
  const [date, setDate] = useState(undefined);
  const { data } = useDashboardStat(date?.from, date?.to);
  const stat = data?.data;
  return (
    <div className="min-h-screen">
      <DatePickerWithRange className={"mb-4"} date={date} setDate={setDate} />
      <div className="flex gap-2 justify-between mb-4">
        <OverView
          className="flex-1"
          count={stat?.user}
          title={"User"}
          description={"Overall user join c-app"}
        >
          <UsersRound className="size-5" />
        </OverView>
        <OverView
          className="flex-1"
          count={stat?.post}
          title={"Post"}
          description={"All post created"}
        >
          <Send className="size-5" />
        </OverView>
        <OverView
          className="flex-1"
          count={stat?.tag}
          title={"Tags"}
          description={"Tag used"}
        >
          <Tag className="size-5" />
        </OverView>
      </div>
      <div className="flex w-full gap-6 mb-4">
        <UserChart className="flex-1 min-w-fit" date={date} />
        <TagChart className="  flex-1 min-w-fit" date={date} />
      </div>
      <div className="flex -w-full gap-6">
        <PostChart className="flex-1 min-w-fit" date={date} />
        <PostChart className="flex-1 min-w-fit" date={date} />
      </div>
    </div>
  );
}
