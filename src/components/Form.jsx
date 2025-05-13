import React from "react";
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
  } from "@/components/ui/select"
import { prepareData } from "../lib/utils";

function Form({info}) {
  const {
    senderAddress,
    clientAddress,
    clientEmail,
    clientName,
    paymentTerms,
    description,
    paymentDue,
    createdAt,
    items
    } = info || {};

    function handleSubmit(e){
        e.preventDefault()
        const formData = new FormData(e.target)
        const result = {status: e.nativeEvent.submitter.id}
        formData.forEach((value, key) => {
          if(key === 'quantity' || key === 'price' || key === 'paymentTerms'){
            result[key] = Number(value)
          }
          else{
            result[key] = value

          }
        })
        const readyData = prepareData(result)
    }

  return (
    <form onSubmit={handleSubmit} className="p-4 ml-5 pt-14">
      <div className="mb-10">
        <h3 className="text-2xl mb-5 font-medium">Bill From </h3>
        <div className="flex flex-col gap-5">
          <div className="grid w-full max-w-full items-center gap-1.5">
            <Label htmlFor="senderAddress-street">Street Address</Label>
            <Input
              type="text"
              defaultValue={info && senderAddress.street}
              name="senderAddress-street"
              id="senderAddress-street"
              placeholder="Street Addres"
            />
          </div>

          <div className="flex justify-between gap-5">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="senderAddress-city">City</Label>
              <Input
                defaultValue={info && senderAddress.city}
                name="senderAddress-city"
                type="text"
                id="senderAddress-city"
                placeholder="City"
              />
            </div>

            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="senderAddress-postCode">Post code</Label>
              <Input
                defaultValue={info && senderAddress.postCode}
                name="senderAddress-postcode"
                type="text"
                id="senderAddress-postcode"
                placeholder="Post code"
              />
            </div>

            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="senderAddress-country">Country</Label>
              <Input
                defaultValue={info && senderAddress.country}
                type="text"
                name="senderAddress-country"
                id="senderAddress-country"
                placeholder="Country"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mb-10">
        <h3 className="text-2xl font-medium mb-5">Bill To</h3>
        <div className="flex flex-col gap-5 mb-5">
          <div className="grid w-full max-w-full items-center gap-1.5">
            <Label htmlFor="clientName">Client's Name</Label>
            <Input
            defaultValue={info && clientName}
              type="text"
              name="clientName"
              id="clientName"
              placeholder="Client's Name"
            />
          </div>

          <div className="grid w-full max-w-full items-center gap-1.5">
            <Label htmlFor="clientEmail">Client's Email</Label>
            <Input
              defaultValue={info && clientEmail}
              type="email"
              name="clientEmail"
              id="clientEmail"
              placeholder="Client's Email"
            />
          </div>

          <div className="grid w-full max-w-full items-center gap-1.5">
            <Label htmlFor="clientAddress">Street Address</Label>
            <Input
              defaultValue={info && clientAddress}
              type="text"
              name="clientAddress"
              id="clientAddress"
              placeholder="Client's Address"
            />
          </div>
        </div>

        <div className="flex justify-between gap-5">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="clientAddress-city">City</Label>
            <Input
              defaultValue={info && clientAddress.city}
              name="clientAddress-city"
              type="text"
              id="clientAddress-city"
              placeholder="City"
            />
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="clientAddress-postcode">Post code</Label>
            <Input
              defaultValue={info && clientAddress.postCode}
              name="clientAddress-postcode"
              type="text"
              id="clientAddress-postcode"
              placeholder="Post code"
            />
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="clientAddress-country">Country</Label>
            <Input
              type="text"
              defaultValue={info && clientAddress.country}
              name="clientAddress-country"
              id="clientAddress-country"
              placeholder="Country"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5 mb-10">
        <div className="flex gap-10 items-end">

        <div className="grid w-full max-w-full items-center gap-1.5">
          <Label htmlFor="createdAt">Invoice date</Label>
          <Input
            type="date"
            defaultValue={info && createdAt}
            id="createdAt"
            name="createdAt"
            placeholder="Invoice date"
            />
        </div>
        <Select name='paymentTerms' defaultValue={info && paymentTerms.toString()}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Terms</SelectLabel>
          <SelectItem value="1">Net 1 Day</SelectItem>
          <SelectItem value="7">Net 7 Day</SelectItem>
          <SelectItem value="14">Net 14 Day</SelectItem>
          <SelectItem value="30">Net 30 Day</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
          </div>
        <div className="grid w-full max-w-full items-center gap-1.5">
          <Label htmlFor="description">Project description</Label>
          <Input
            defaultValue={info && description}
            type="text"
            id="description"
            name="description"
            placeholder="Project description"
          />
        </div>
      </div>

      <ItemList  info={info && info.items}/>

      {info ? (
        <div className="flex justify-end mt-10 gap-5">
        <Button variant={'outline'}>Cencel</Button>
        <Button onSubmit={handleSubmit}>Save Changes</Button>
      </div>
      ) : (
      <div className="flex justify-end mt-10 gap-5">
        <Button type='button' variant={'outline'}>Discard</Button>
        <Button id="draft" variant={'secondary'}>Save as Draft</Button>
        <Button id='pending'>Save & Send</Button>
      </div>
      )}

    </form>
  );
}

export default Form;
