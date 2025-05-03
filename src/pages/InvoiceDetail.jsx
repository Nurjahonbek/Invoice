import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import StatusBadge from './StatusBadge';
import Button from './Button';

const InvoiceDetails = ({ invoices, onDelete, onMarkAsPaid }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const foundInvoice = invoices.find(inv => inv.id === id);
    if (foundInvoice) {
      setInvoice(foundInvoice);
    } else {
      navigate('/');
    }
    setIsLoading(false);
  }, [id, invoices, navigate]);

  if (isLoading || !invoice) {
    return <div className="text-center py-10">Loading...</div>;
  }

  const formattedDate = new Date(invoice.createdAt).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  const dueDate = new Date(invoice.paymentDue).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  return (
    <div className="max-w-3xl mx-auto p-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-500 dark:text-gray-400 mb-6 hover:text-blue-600"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
        </svg>
        Go back
      </button>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <span className="text-gray-500 dark:text-gray-400 mr-4">Status</span>
            <StatusBadge status={invoice.status} />
          </div>
          <div className="flex space-x-2">
            <Button variant="secondary" onClick={() => navigate(`/edit/${invoice.id}`)}>
              Edit
            </Button>
            <Button variant="danger" onClick={() => onDelete(invoice.id)}>
              Delete
            </Button>
            {invoice.status === 'pending' && (
              <Button onClick={() => onMarkAsPaid(invoice.id)}>
                Mark as Paid
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white">#{invoice.id}</h3>
            <p className="text-gray-500 dark:text-gray-400">{invoice.description}</p>
          </div>

          <div className="text-gray-500 dark:text-gray-400">
            <p>{invoice.senderAddress.street}</p>
            <p>{invoice.senderAddress.city}</p>
            <p>{invoice.senderAddress.postCode}</p>
            <p>{invoice.senderAddress.country}</p>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-gray-500 dark:text-gray-400">Invoice Date</p>
              <p className="font-bold dark:text-white">{formattedDate}</p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400">Payment Due</p>
              <p className="font-bold dark:text-white">{dueDate}</p>
            </div>
          </div>

          <div>
            <p className="text-gray-500 dark:text-gray-400">Bill To</p>
            <p className="font-bold dark:text-white">{invoice.clientName}</p>
            <div className="text-gray-500 dark:text-gray-400 mt-2">
              <p>{invoice.clientAddress.street}</p>
              <p>{invoice.clientAddress.city}</p>
              <p>{invoice.clientAddress.postCode}</p>
              <p>{invoice.clientAddress.country}</p>
            </div>
          </div>

          <div>
            <p className="text-gray-500 dark:text-gray-400">Sent to</p>
            <p className="font-bold dark:text-white">{invoice.clientEmail}</p>
          </div>
        </div>

        <div className="mt-10 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
          <div className="p-6">
            <div className="hidden md:grid grid-cols-5 gap-4 mb-4 text-gray-500 dark:text-gray-400">
              <div className="col-span-2">Item Name</div>
              <div>QTY</div>
              <div>Price</div>
              <div>Total</div>
            </div>

            {invoice.items.map((item, index) => (
              <div key={index} className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4 last:mb-0">
                <div className="col-span-2 font-bold dark:text-white">{item.name}</div>
                <div className="text-gray-500 dark:text-gray-400">{item.quantity}</div>
                <div className="text-gray-500 dark:text-gray-400">£{item.price.toFixed(2)}</div>
                <div className="font-bold dark:text-white">£{item.total.toFixed(2)}</div>
              </div>
            ))}
          </div>

          <div className="bg-gray-900 text-white p-6 flex justify-between items-center">
            <span>Amount Due</span>
            <span className="text-2xl font-bold">£{invoice.total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetails;