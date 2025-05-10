import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import StatusBadge from "./StatusBadge";
import { ArrowBigRight } from "lucide-react";
import {Skeleton} from './ui/skeleton'

function CardSkleton({ length = 7 }) {
  return (
    <div className="flex flex-col gap-4 base-container">
      {Array(length).fill(0).map((_, index) => {
        return (
          <Card className='border-2 transition-colors hover:border-accent-blue-400 border-transparent' key={index}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>
                  <Skeleton className="w-[72px] h-4 rounded-md bg-slate-300" />
                </CardTitle>
                <CardDescription>
                  <Skeleton className="w-[109px] h-5 rounded-full" />
                </CardDescription>
                <span>
                  <Skeleton className="w-[104px] h-6 rounded-full" />
                </span>
                <span>
                  <Skeleton className="w-[63px] h-6 rounded-full" />
                </span>
                <Skeleton className="w-[104px] h-9 rounded-full" />
                <ArrowBigRight className="text-[#7C5DFA]" />
              </div>
            </CardHeader>
          </Card>
        );
      })}
    </div>
  );
}

export default CardSkleton;
