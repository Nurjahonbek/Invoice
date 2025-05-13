import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getInvoiceById } from "../request";

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

function Details() {
  const { id } = useParams();
  const [invoice, setInvoice] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    getInvoiceById("/invoices", id)
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
              <Button variant="ghost">Edit</Button>
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
                    <Button variant='destructive'>Delete</Button>
                  </div>
                </DialogContent>
              </Dialog>

              {/* <Button variant="destructive"></Button> */}
              <Button>Mark as Paid</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Details;
