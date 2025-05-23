import React, { useState, useEffect } from 'react';
import { getInvoices } from '../request/index';
import CardSkleton from './CardSkleton';
import MyCard from './MyCard';
import { useAppStore } from '../lib/zustand';
import NotFoundComponent from './NotFoundComponent';

function InvoiceCards() {
  const { filter, invoices, setInvoices } = useAppStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    getInvoices(filter)
      .then((res) => {
        setInvoices(res);
      })
      .catch(({ message }) => {
        setError(message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [filter]);

  if (loading) {
    return <CardSkleton />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if(invoices.length == 0){
    return <NotFoundComponent />
  }
  return (
    <div className="base-container flex flex-col gap-4">
      {invoices.map((el) => {
        const { total, createdAt, status, id, clientName } = el;

        return (
          <MyCard
            total={total}
            createdAt={createdAt}
            status={status}
            clientName={clientName}
            key={id}
            id={id}
          />
        );
      })}
    </div>
  );
}

export default InvoiceCards;
