import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { PlayCircle, TrashIcon } from 'lucide-react';
import { toast } from 'sonner';
import { Input } from './ui/input';
import { useAppStore } from '../lib/zustand';

function ItemList({info}) {
  const {setItems} = useAppStore()
  const [localItems, setLocalItems] = useState(info ? info : [
    {
      id: crypto.randomUUID(),
      name: "Banner Design",
      quantity: 1,
      price: 156,
      get total() {
        return this.price * this.quantity;
      }
    }
  ]);

  useEffect(() => {
    setLocalItems(localItems)
  }, [JSON.stringify(localItems)])

  function handleChange(e, id) {
    const { name, value } = e.target;
    const changedItem = localItems.find((el) => el.id === id);

    changedItem[name] = name === "name" ? value : +value;
    setLocalItems((prev) =>
      prev.map((el) => (el.id === changedItem.id ? changedItem : el))
    );
  }

  function handleClick(type, id) {
    if (type === 'add') {
      if (localItems.at(-1).name.trim() !== "") {
        setLocalItems((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            name: "",
            quantity: 1,
            price: 0,
            get total() {
              return +this.price * +this.quantity;
            }
          }
        ]);
      } else {
        toast.info("Oxirgi item nomini kiriting");
      }
    } else if (type === 'delete') {
      if (localItems.length === 1) {
        toast.info("Eng kamida bitta element bo'lishi kerak");
      } else {
        const filtered = localItems.filter((el) => el.id !== id);
        setLocalItems(filtered);
      }
    }
  }

  return (
    <div className='pb-5'>
      <h3 className='font-bold text-lg mb-4'>Item List</h3>
      <div className='flex justify-between items-center font-semibold mb-2'>
        <span>Item Name</span>
        <span>Qty</span>
        <span>Price</span>
        <span>Total</span>
      </div>
      <ul className='flex flex-col gap-4 mb-5'>
        {localItems.map(({ name, quantity, price, total, id }) => (
          <li className='flex items-center justify-between gap-2' key={id}>
            <Input
              name="name"
              onChange={(e) => handleChange(e, id)}
              value={name}
              className='w-[210px]'
              type='text'
              placeholder='Item Name'
            />
            <Input
              name="quantity"
              onChange={(e) => handleChange(e, id)}
              value={quantity}
              className='w-[100px]'
              type='number'
              placeholder='Qty'
            />
            <Input
              name="price"
              onChange={(e) => handleChange(e, id)}
              value={price}
              className='w-[100px]'
              type='number'
              placeholder='Price'
            />
            <span className='w-[80px] text-center'>{total.toFixed(2)}</span>
            <Button type="button" onClick={() => handleClick("delete", id)} variant='destructive' size='icon'>
              <TrashIcon />
            </Button>
          </li>
        ))}
      </ul>
      <Button type="button" onClick={() => handleClick("add")} variant='secondary' className='w-full'>
        <PlayCircle className='mr-2' /> Add New Item
      </Button>
    </div>
  );
}

export default ItemList;
