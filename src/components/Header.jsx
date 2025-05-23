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
import  Form  from "./Form";
import InvoiceCards from "./InvoiceCards";
import { addInvoice } from "../request";

const info ={
  "createdAt": "2021-08-18",
      "paymentDue": "2021-08-19",
      "description": "Graphic Design",
      "paymentTerms": 1,
      "clientName": "John Wick",
      "clientEmail": "alexgrim@mail.com",
      "status": "paid",
      "senderAddress": {
        "street": "19 Union Terrace",
        "city": "London",
        "postCode": "E1 3EZ",
        "country": "United Kingdom"
      },
      "clientAddress": {
        "street": "84 Church Way",
        "city": "Bradford",
        "postCode": "BD1 9PB",
        "country": "United Kingdom"
      },
      "items": [
        {
          "id": "b896eea8-fb6a-486e-a91e-87d7df708d1f",
          "name": "Banner Design",
          "quantity": 1,
          "price": 156,
          "total": 156
        }
      ]
}

function Header() {
  const { setSheetOpen} = useAppStore()
  const { setFilter } = useAppStore();
  const { filter, invoices } = useAppStore();
  const [items, setItems] = useState({
    draft: false,
    paid: false,
    pending: false,
  });

  useEffect(() => {
    const query = queryGenerator(items);
    setFilter(query);
  }, [JSON.stringify(items)]);

  function handleChange(key) {
    setItems((prev) => {
      return { ...prev, [key]: !prev[key] };
    });
  }

  return (
    <div className="base-container flex items-center max-sm:gap-18 justify-between py-10">
      <div>
        <h1 className="font-bold max-sm:mb-2 text-3xl">Invoices</h1>
        <p>There are {invoices.length} total invoices</p>
      </div>

      <div className="max-sm:flex-col max-sm">

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="ml-auto mr-10" variant="outline">
            Filter by status
            <ArrowBigDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40">
          <DropdownMenuLabel>Status</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <div className="flex flex-col">
            {Object.entries(items).map(([key, value]) => {
              return (
                <label
                key={key}
                className={`${buttonVariants({
                  variant: "ghost",
                })} justify-start capitalize`}
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

        <Button className='rounded-full max-sm:mt-3 p-5'  onClick={setSheetOpen}>
        <PlusCircleIcon />
        New Invoices
        </Button>

            </div>
    </div>
  );
}

export default Header;
