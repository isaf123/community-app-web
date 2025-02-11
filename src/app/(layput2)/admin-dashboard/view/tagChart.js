"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  ResponsiveContainer,
} from "recharts";
import { useUserChart } from "@/api/admin-api";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { convertDate } from "@/helper/text";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import { useTagChart } from "@/api/admin-api";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-2))",
  },
};

export function TagChart({ className, date }) {
  const { data, isLoading } = useTagChart(date?.from, date?.to);
  const dataTag = data?.data;

  if (isLoading) {
    return (
      <div width="100%" height={300} className={className}>
        <Skeleton className="w-full h-[420px]" />;
      </div>
    );
  }
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Tag Post</CardTitle>
        <CardDescription>
          {/* {convertDate(startDate)} - {convertDate(endDate)} */}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <ChartContainer config={chartConfig}>
            <BarChart data={dataTag}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="tag"
                tickLine={false}
                tickMargin={11}
                axisLine={false}
                // tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Bar dataKey="count" fill="var(--color-desktop)" radius={8} />
            </BarChart>
          </ChartContainer>
        </ResponsiveContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing total user join the app
        </div>
      </CardFooter>
    </Card>
  );
}
