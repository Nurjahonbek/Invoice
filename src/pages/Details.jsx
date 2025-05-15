import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteById, getInvoiceById, updateById } from "../request";
import { Button, buttonVariants } from "@/components/ui/button";
import StatusBadge from "../components/StatusBadge";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { useAppStore } from "../lib/zustand";

function Details() {
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateInvoice, setEditedData, setSheetOpen } = useAppStore();
  const [invoice, setInvoice] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    getInvoiceById(id)
      .then((res) => setInvoice(res))
      .catch(({ message }) => setError(message))
      .finally(() => setLoading(false));
  }, [id]);

  function handleDelete(id) {
    setDeleteLoading(true);
    deleteById(id)
      .then((res) => {
        updateInvoice(res);
        navigate(-1);
      })
      .catch(({ message }) => toast.error(message))
      .finally(() => setDeleteLoading(false));
  }

  function handleUpdate(id, data) {
    setUpdateLoading(true);
    updateById(id, data)
      .then((res) => {
        setInvoice(res);
        navigate(-1);
      })
      .catch(({ message }) => toast.error(message))
      .finally(() => setUpdateLoading(false));
  }

  function handleEdit(data) {
    setSheetOpen();
    setEditedData(data);
  }

  console.log(invoice);


  if (loading) return <p className="base-container">Loading...</p>;
  if (error) return <p  className="base-container">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <button onClick={() => navigate(-1)} className="text-[15px] font-medium text-violet-600  hover:underline">
        ⬅️ Go back
      </button>

      <div className="bg-white rounded-lg shadow-xl p-6 flex justify-between items-center border border-gray-200">
        <div className="flex items-center gap-4">
          <span className="text-gray-700 text-sm font-medium">Status:</span>
          <StatusBadge status={invoice.status} />
        </div>
        <div className="flex gap-4">
          <Button variant="outline" onClick={() => handleEdit(invoice)}>Edit</Button>
          <Dialog>
            <DialogTrigger className={buttonVariants({ variant: "destructive" })}>Delete</DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete invoice # {invoice.id}
                </DialogDescription>
              </DialogHeader>
              <div className="flex justify-end gap-3">
                <DialogClose className={buttonVariants({ variant: "ghost" })}>Cancel</DialogClose>
                <Button variant="destructive" onClick={() => handleDelete(invoice.id)} disabled={deleteLoading}>
                  {deleteLoading ? "Deleting..." : "Delete"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          {invoice.status === "pending" && (
            <Button onClick={() => handleUpdate(invoice.id, { status: "paid" })}>
              {updateLoading ? "Loading..." : "Mark as Paid"}
            </Button>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-xl p-6 space-y-6 border border-gray-200">
        <div className="flex justify-between flex-wrap">
          <div>
            <h2 className="font-bold text-xl text-gray-800">#{invoice.id}</h2>
            <p className="text-sm text-gray-500">{invoice.description}</p>
          </div>
          <div className="text-base text-right ">
            <p className="text-[#7E88C3] ">{invoice.senderAddress?.street}</p>
            <p className="text-[#7E88C3] ">{invoice.senderAddress?.city}</p>
            <p className="text-[#7E88C3] ">{invoice.senderAddress?.postCode}</p>
            <p className="text-[#7E88C3] ">{invoice.senderAddress?.country}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6 text-sm">
          <div>
            <p className="text-[#7E88C3] ">Invoice Date</p>
            <p className="font-bold text-base text-[#0C0E16]">{invoice.createdAt}</p>
            <p className="text-[#7E88C3] mt-4">Payment Due</p>
            <p className="font-bold text-[#0C0E16] text-base">{invoice.paymentDue}</p>
          </div>

          <div>
            <p className="text-[#7E88C3]">Bill To</p>
            <p className="font-bold text-base text-[#0C0E16]">{invoice.clientName}</p>
            <p className="text-[#7E88C3] text-sm ">{invoice.clientAddress?.street}</p>
            <p className="text-[#7E88C3] text-sm ">{invoice.clientAddress?.city}</p>
            <p className="text-[#7E88C3] text-sm ">{invoice.clientAddress?.postCode}</p>
            <p className="text-[#7E88C3] text-sm ">{invoice.clientAddress?.country}</p>
          </div>

          <div>
            <p className="text-gray-500">Sent to</p>
            <p className="font-bold text-base text-[#0C0E16]">{invoice.clientEmail}</p>
          </div>
        </div>

        <div className="bg-gray-100 p-6 rounded-lg">
          <div className="grid grid-cols-4 font-semibold text-sm pb-3 border-b border-gray-300">
            <p className="text-[#7E88C3]" >Item Name</p>
            <p className="text-[#7E88C3] text-center">QTY.</p>
            <p className="text-[#7E88C3] text-right">Price</p>
            <p className="text-[#7E88C3] text-right">Total</p>
          </div>
          <div className="space-y-3 mt-4">
            {invoice.items?.map((item, i) => (
              <div className="grid grid-cols-4 text-sm" key={i}>
                <p>{item.name}</p>
                <p className="text-center">{item.quantity}</p>
                <p className="text-right">£ {parseFloat(item.price).toFixed(2)}</p>
                <p className="text-right font-bold">£ {(parseFloat(item.price) * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
          <div className="bg-[#373B53] text-white mt-5 px-6 py-4 rounded-lg flex justify-between items-center">
            <span className="text-white">Amount Due</span>
            <span className="text-xl font-bold">£ {invoice.total?.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
