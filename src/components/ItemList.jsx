import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { PlayCircle, TrashIcon } from 'lucide-react';
import { toast } from 'sonner';
import { Input } from './ui/input';
import { useAppStore } from '../lib/zustand';

function ItemList({ info }) {
  const { setItems, setTotalAmountDue } = useAppStore();
  const [localItems, setLocalItems] = useState(
    info?.length
      ? info
      : [
          {
            id: crypto.randomUUID(),
            name: 'Banner Design',
            quantity: 1,
            price: 156,
          },
        ]
  );

  const [total, setTotal] = useState(0);



  useEffect(() => {
    const calcTotal = localItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotal(calcTotal);
  }, [localItems]);

  useEffect(() => {
    setItems(localItems);
    setTotalAmountDue(total);
  }, [localItems, total, setItems, setTotalAmountDue]);


  useEffect(() => {
    if (info && Array.isArray(info)) {
      setLocalItems(info);
    }
  }, [JSON.stringify(info)]);

  useEffect(() => {
    setItems(localItems);
  }, [localItems, setItems]);

  function handleChange(e, id) {
    const { name, value } = e.target;
    setLocalItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              [name]: name === 'name' ? value : +value,
            }
          : item
      )
    );
  }

  function handleClick(type, id) {
    if (type === 'add') {
      const lastItem = localItems.at(-1);
      if (lastItem.name.trim() !== '') {
        setLocalItems((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            name: '',
            quantity: 1,
            price: 0,
          },
        ]);
      } else {
        toast.info('Oxirgi item nomini kiriting');
      }
    } else if (type === 'delete') {
      if (localItems.length === 1) {
        toast.info("Eng kamida bitta element bo'lishi kerak");
      } else {
        setLocalItems((prev) => prev.filter((item) => item.id !== id));
      }
    }
  }

  return (
    <div className="pb-5">
      <h3 className="font-bold text-lg mb-4">Item List</h3>
      <div className="flex justify-between items-center font-bold mb-2">
        <span>Item Name</span>
        <span>Qty</span>
        <span>Price</span>
        <span>Total</span>
        <span>Action</span>
      </div>
      <ul className="flex flex-col gap-4 mb-5">
        {localItems.map(({ name, quantity, price, id }) => (
          <li className="flex items-center justify-between gap-2" key={id}>
            <Input
              name="name"
              onChange={(e) => handleChange(e, id)}
              value={name}
              className="w-[210px]"
              type="text"
              placeholder="Item Name"
            />
            <Input
              name="quantity"
              onChange={(e) => handleChange(e, id)}
              value={quantity}
              className="w-[100px]"
              type="number"
              placeholder="Qty"
              min={1}
            />
            <Input
              name="price"
              onChange={(e) => handleChange(e, id)}
              value={price}
              className="w-[100px]"
              type="number"
              placeholder="Price"
              min={0}
            />
            <span className="w-[80px] text-center">
              {(price * quantity).toFixed(2)}
            </span>
            <Button
              type="button"
              onClick={() => handleClick('delete', id)}
              variant="destructive"
              size="icon"
            >
              <TrashIcon />
            </Button>
          </li>
        ))}
      </ul>
      <div className="flex justify-end font-bold text-lg mb-3">
        Total: <span className="ml-2">{total.toFixed(2)}</span>
      </div>
      <Button
        type="button"
        onClick={() => handleClick('add')}
        variant="secondary"
        className="w-full"
      >
        <PlayCircle className="mr-2" /> Add New Item
      </Button>
    </div>
  );
}

export default ItemList;
