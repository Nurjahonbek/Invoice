import { createContext, useContext, useState, useEffect } from 'react';

const InvoiceContext = createContext();

export const InvoiceProvider = ({ children }) => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const savedInvoices = localStorage.getItem('invoices');
    if (savedInvoices) setInvoices(JSON.parse(savedInvoices));
  }, []);

  const addInvoice = (newInvoice) => {
    const updated = [...invoices, newInvoice];
    setInvoices(updated);
    localStorage.setItem('invoices', JSON.stringify(updated));
  };

  return (
    <InvoiceContext.Provider value={{ invoices, addInvoice }}>
      {children}
    </InvoiceContext.Provider>
  );
};

export const useInvoices = () => useContext(InvoiceContext);

