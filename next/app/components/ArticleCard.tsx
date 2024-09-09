import { CalendarDays } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

type ArticleProps = {
  title: string;
  fromToday: string;
  userName: string;
};

// 文字列を指定された長さに切り詰め
const omit = (text: string) => (len: number) => (ellipsis: string) =>
  text.length >= len ? text.slice(0, len - ellipsis.length) + ellipsis : text;

export default function ArticleCard({
  title,
  fromToday,
  userName,
}: ArticleProps) {
  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-lg">{omit(title)(50)("...")}</CardTitle>
        <CardDescription className="flex items-center mt-2">
          <CalendarDays className="w-4 h-4 mr-2" />
          {fromToday}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center">
          <Avatar className="h-8 w-8 mr-2">
            <AvatarImage
              src={`https://avatar.vercel.sh/${userName}`}
              alt={userName}
            />
            <AvatarFallback>{userName[0]}</AvatarFallback>
          </Avatar>
          <p className="text-sm text-muted-foreground">{userName}</p>
        </div>
      </CardContent>
    </Card>
  );
}
