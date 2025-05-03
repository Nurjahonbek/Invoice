import { useState } from 'react';
import InvoiceItem from './InvoiceItem';

const InvoiceList = ({ invoices, onInvoiceClick }) => {
  const [filter, setFilter] = useState('all');

  const filteredInvoices = invoices.filter(invoice =>
    filter === 'all' || invoice.status === filter
  );

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold dark:text-white">Invoices</h2>
          <p className="text-gray-500 dark:text-gray-400">
            {filteredInvoices.length} {filteredInvoices.length === 1 ? 'invoice' : 'invoices'}
          </p>
        </div>

        <div className="relative">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="appearance-none bg-transparent border-none pr-8 py-1 font-medium focus:outline-none focus:ring-0 dark:text-white"
          >
            <option value="all">Filter by status</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="draft">Draft</option>
          </select>
          <svg className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
      </div>

      {filteredInvoices.length > 0 ? (
        filteredInvoices.map(invoice => (
          <InvoiceItem
            key={invoice.id}
            invoice={invoice}
            onClick={() => onInvoiceClick(invoice.id)}
          />
        ))
      ) : (
        <div className="text-center py-16">
          <img src="/empty.svg" alt="No invoices" className="mx-auto w-48 h-48" />
          <h3 className="mt-6 text-xl font-bold dark:text-white">No invoices</h3>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Create a new invoice by clicking the <br /> "New Invoice" button
          </p>
        </div>
      )}
    </div>
  );
};

export default InvoiceList;