import React, { useEffect, useState } from "react";
import ItemList from "./ItemList";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { prepareData } from "../lib/utils";
import { useAppStore } from "../lib/zustand";
import { addInvoice, updateById } from "../request";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";

function Form({ info, setSheetOpen }) {
  const { items: zustandItems, setItems } = useAppStore();

  useEffect(() => {
    if (info && info.items) {
      setItems(info.items);
    }
  }, [info, setItems]);

  const navigate = useNavigate();
  const { setInvoices, updateInvoice } = useAppStore();
  const [sending, setSending] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const result = {
      senderAddress: {},
      clientAddress: {},
      items: zustandItems,
    };

    formData.forEach((value, key) => {
      if (key.startsWith("senderAddress-")) {
        const subKey = key.replace("senderAddress-", "");
        result.senderAddress[subKey] = value;
      } else if (key.startsWith("clientAddress-")) {
        const subKey = key.replace("clientAddress-", "");
        result.clientAddress[subKey] = value;
      } else if (
        key === "quantity" ||
        key === "price" ||
        key === "paymentTerms"
      ) {
        result[key] = Number(value);
      } else {
        result[key] = value;
      }
    });

    result.total = zustandItems.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );

    const btnId = e.nativeEvent.submitter.id;
    if (btnId === "draft") {
      result.status = "draft";
    } else {
      result.status = "pending";
    }

    const readyData = prepareData(result);

    setSending({
      mode: btnId === "edit" ? "edit" : "add",
      data: readyData,
    });
  }

  useEffect(() => {
    if (sending) {
      setLoading(true);
      if (sending.mode === "add") {
        addInvoice(sending.data)
          .then((res) => {
            toast.success("Successfully added ✅");
            setTimeout(() => {
              window.location.reload()

            }, 1370);
            setSheetOpen(false);
            updateInvoice(res);
          })
          .catch(({ message }) => {
            toast.error(message);
          })
          .finally(() => {
            setLoading(false);
            setSending(null);
          });
      } else if (sending.mode === "edit") {
        updateById(info.id, sending.data)
          .then((res) => {
            toast.success("Successfully edited ✅");
            setSheetOpen(false);
            navigate(-1);
            updateInvoice(res);
          })
          .catch(({ message }) => {
            toast.error(message);
          })
          .finally(() => {
            setLoading(false);
            setSending(null);
          });
      }
    }
  }, [sending, info, navigate, setSheetOpen, updateInvoice]);

  return (
    <form onSubmit={handleSubmit} className="p-4 max-sm:ml-0 ml-5 pt-14">
      {/* Bill From */}
      <div className="mb-10">
        <h3 className="text-2xl mb-5 font-medium">Bill From</h3>
        <div className="flex flex-col gap-5">
          <div className="grid w-full max-w-full items-center gap-1.5">
            <Label htmlFor="senderAddress-street">Street Address</Label>
            <Input
              type="text"
              defaultValue={info?.senderAddress?.street || ""}
              name="senderAddress-street"
              id="senderAddress-street"
              placeholder="Street Address"
            />
          </div>

          <div className="flex justify-between gap-5">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="senderAddress-city">City</Label>
              <Input
                type="text"
                id="senderAddress-city"
                name="senderAddress-city"
                placeholder="City"
                defaultValue={info?.senderAddress?.city || ""}
              />
            </div>

            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="senderAddress-postcode">Post code</Label>
              <Input
                type="text"
                id="senderAddress-postcode"
                name="senderAddress-postcode"
                placeholder="Post code"
                defaultValue={info?.senderAddress?.postCode || ""}
              />
            </div>

            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="senderAddress-country">Country</Label>
              <Input
                type="text"
                id="senderAddress-country"
                name="senderAddress-country"
                placeholder="Country"
                defaultValue={info?.senderAddress?.country || ""}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bill To */}
      <div className="mb-10">
        <h3 className="text-2xl font-medium mb-5">Bill To</h3>
        <div className="flex flex-col gap-5 mb-5">
          <div className="grid w-full max-w-full items-center gap-1.5">
            <Label htmlFor="clientName">Client's Name</Label>
            <Input
              type="text"
              id="clientName"
              name="clientName"
              placeholder="Client's Name"
              defaultValue={info?.clientName || ""}
            />
          </div>

          <div className="grid w-full max-w-full items-center gap-1.5">
            <Label htmlFor="clientEmail">Client's Email</Label>
            <Input
              type="email"
              id="clientEmail"
              name="clientEmail"
              placeholder="Client's Email"
              defaultValue={info?.clientEmail || ""}
            />
          </div>

          <div className="grid w-full max-w-full items-center gap-1.5">
            <Label htmlFor="clientAddress-street">Street Address</Label>
            <Input
              type="text"
              id="clientAddress-street"
              name="clientAddress-street"
              placeholder="Client's Street Address"
              defaultValue={info?.clientAddress?.street || ""}
            />
          </div>
        </div>

        <div className="flex sm:flex-row justify-between gap-5 flex-col">
        <div className="flex justify-between gap-5">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="clientAddress-city">City</Label>
            <Input
              type="text"
              id="clientAddress-city"
              name="clientAddress-city"
              placeholder="City"
              defaultValue={info?.clientAddress?.city || ""}
            />
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="clientAddress-postcode">Post code</Label>
            <Input
              type="text"
              id="clientAddress-postcode"
              name="clientAddress-postcode"
              placeholder="Post code"
              defaultValue={info?.clientAddress?.postCode || ""}
            />
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="clientAddress-country">Country</Label>
            <Input
              type="text"
              id="clientAddress-country"
              name="clientAddress-country"
              placeholder="Country"
              defaultValue={info?.clientAddress?.country || ""}
            />
          </div>
        </div>

        </div>
      </div>

      {/* Invoice Details */}
      <div className="flex flex-col gap-5 mb-10">
        <div className="flex gap-10 items-end">
          <div className="grid w-full max-w-full items-center gap-1.5">
            <Label htmlFor="createdAt">Invoice date</Label>
            <Input
              type="date"
              id="createdAt"
              name="createdAt"
              placeholder="Invoice date"
              defaultValue={info?.createdAt || ""}
            />
          </div>

          <Select
            name="paymentTerms"
            defaultValue={info?.paymentTerms?.toString() || "30"}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select payment terms" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Terms</SelectLabel>
                <SelectItem value="1">Net 1 Day</SelectItem>
                <SelectItem value="7">Net 7 Days</SelectItem>
                <SelectItem value="14">Net 14 Days</SelectItem>
                <SelectItem value="30">Net 30 Days</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="grid w-full max-w-full items-center gap-1.5">
          <Label htmlFor="description">Project description</Label>
          <Input
            type="text"
            id="description"
            name="description"
            placeholder="Project description"
            defaultValue={info?.description || ""}
          />
        </div>
      </div>

      <ItemList info={info?.items} />

      {info ? (
        <div className="flex justify-end mt-10 gap-5">
          <Button variant="outline">Cancel</Button>
          <Button className="rounded-2xl p-5" id="edit" disabled={loading}>
            {loading ? (
              <div className="flex items-center gap-5">
                <span>loading</span>
                <ThreeDots
                  visible={true}
                  height="80"
                  width="80"
                  color="#0f0"
                  radius="9"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{ transform: "scale(2.2)" }}
                  wrapperClass=""
                />
              </div>
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      ) : (
        <div className="flex max-sm:gap-3 justify-end mt-10 gap-5">
          <Button type="button" variant="outline">
            Discard
          </Button>
          <Button className='cursor-pointer' id="draft" disabled={loading} variant="secondary">
              Save as Draft
          </Button>
          <Button className='cursor-pointer' disabled={loading} id="pending">
            {loading ? (
              <div className="flex items-center gap-5">
                <span>loading</span>
                <ThreeDots
                  visible={true}
                  height="80"
                  width="80"
                  color="#0f0"
                  radius="9"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{ transform: "scale(2.2)" }}
                  wrapperClass=""
                />
              </div>
            ) : (
              "Save & Send"
            )}
          </Button>
        </div>
      )}
    </form>
  );
}

export default Form;
