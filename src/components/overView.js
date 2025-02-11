"use client";
import { Card, CardHeader, CardContent, CardTitle } from "./ui/card";
import { UsersRound } from "lucide-react";
export default function OverView({
  className,
  count,
  children,
  title,
  description,
}) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {children}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{count ? count : "-"}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
