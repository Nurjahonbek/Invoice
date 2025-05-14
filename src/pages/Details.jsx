import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteById, getInvoiceById, updateById } from "../request";

import { Card, CardContent } from "@/components/ui/card";
import StatusBadge from "../components/StatusBadge";
import { Button, buttonVariants } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { toast } from "sonner";
import { tr } from "date-fns/locale";
import { useAppStore } from "../lib/zustand";

function Details() {
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [updateLoading, setUpdateLoading] = useState(false)
  const { id } = useParams();
  const { updateInvoice, setEditedData, setSheetOpen} = useAppStore()
  const [invoice, setInvoice] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate()

  function handleDelete(id){
    setDeleteLoading(true)
    deleteById(id)
    .then((res) => {
      navigate(-1)
      updateInvoice(res)
    })
    .catch(({message}) => {
      toast.error(message)
    })
    .finally(() => {
      setDeleteLoading(false)
    })
  }

  function handleUpdate(id, data){
    setUpdateLoading(true)
    updateById(id, data)
    .then((res) => {
      setInvoice([res])
      navigate(-1)
    })
    .catch(({message}) => {
      toast.error(message)
    })
    .finally(() => {
      setUpdateLoading(false)
    })
  }


  function handleEdit(data){
    setSheetOpen()
    setEditedData(data)
  }


  useEffect(() => {
    setLoading(true);
    getInvoiceById(id)
      .then((res) => {
        setInvoice(res);
      })
      .catch(({ message }) => {
        setError(message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p>loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }


  return (
    <div className="py-5">
      {JSON.stringify(invoice)}
      <div className="base-container">
        <Card>
          <CardContent className="flex">
            <div className="flex gap-5 items-center mr-auto">
              <span className="flex items-center gap-2">Status:</span>
              <StatusBadge status={invoice.status} />
            </div>
            <div className="flex gap-3">
              <Button onClick={() => {
                handleEdit(invoice)
              }} variant="ghost">Edit</Button>
              <Dialog>
                <DialogTrigger
                  className={buttonVariants({ variant: "destructive" })}
                >
                  Delete
                </DialogTrigger>
                <DialogContent aria-describedby="dialog-description">
                  <DialogHeader>
                    <DialogTitle>Confirm Deletion</DialogTitle>
                    <DialogDescription>
                    Are you sure you want to delete invoice #{invoice.invoiceId}? This action cannot be undone.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex gap-3 justify-end  ">
                    <DialogClose className={buttonVariants({variant: 'ghost'})}>
                    Cencel
                    </DialogClose>
                    <Button disabled={deleteLoading} onClick={() => handleDelete(invoice.id)} variant='destructive'>{deleteLoading ? 'Loading...' : 'Delete'}</Button>
                  </div>
                </DialogContent>
              </Dialog>

              {invoice.status === 'pending' &&
              <>
                <Button onClick={() => handleUpdate(invoice.id, {status: 'paid'})}>{updateLoading ? "Loading..." : 'Mark as Paid'}</Button>
              </>}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Details;




