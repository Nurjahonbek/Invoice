import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Arrow, DropdownMenuCheckboxItem } from "@radix-ui/react-dropdown-menu";
import { Button, buttonVariants } from "./ui/button";
import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { queryGenerator } from "../lib/utils";
import { ArrowBigDown, PlusCircleIcon } from "lucide-react";
import { useAppStore } from "../lib/zustand";

function Header() {
  const { setFilter } = useAppStore();
  const { filter } = useAppStore();
  const [items, setItems] = useState({ draft: false, paid: false, pending: false });

  useEffect(() => {
    const query = queryGenerator(items)
    setFilter(query);
  }, [JSON.stringify(items)]);

  function handleChange(key) {
    setItems((prev) => {
      return { ...prev, [key]: !prev[key] };
    });
  }

  return (
    <div className='base-container flex items-center justify-between py-10'>
      <div>
        <h1 className="font-bold text-3xl">Invoices</h1>
        <p>There are 7 total invoices</p>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className='ml-auto mr-10' variant="outline">
            Filter by status
            <ArrowBigDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Status</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <div className="flex flex-col">
            {Object.entries(items).map(([key, value]) => {
              return (
                <label
                  key={key}
                  className={`${buttonVariants({ variant: "ghost" })} justify-start capitalize`}
                  htmlFor={key}
                >
                  <Checkbox
                    onCheckedChange={() => handleChange(key)}
                    checked={value}
                    id={key}
                  />
                  {key}
                </label>
              );
            })}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button>
        <PlusCircleIcon />
        New Invoices
      </Button>
    </div>
  );
}

export default Header;
