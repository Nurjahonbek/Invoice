import { clsx } from "clsx";
import { FunnelIcon, RussianRuble } from "lucide-react";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function queryGenerator(obj){
  let result = ""
  Object.entries(obj).forEach(([key, value]) =>{
    if(value){
      if(result.length){
        result += `|${key}`
      }
      else{
        result += `${key}`
      }
    }
  })
  return result;
}