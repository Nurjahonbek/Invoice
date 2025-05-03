import { useState } from 'react';
import { useInvoices } from '../context/InvoiceContext';
import { useTheme } from '../context/ThemeContext';
import InvoiceItem from '../components/InvoiceItem';
import NewInvoice from './NewInvoice';

const HomePage = () => {
  const { invoices } = useInvoices();
  const { darkMode, toggleDarkMode } = useTheme();
  const [showNewInvoice, setShowNewInvoice] = useState(false);
  const [filter, setFilter] = useState('all');

  // Filter invoices based on status
  const filteredInvoices = invoices.filter(invoice =>
    filter === 'all' || invoice.status === filter
  );

  return (
    <div className="container mx-auto p-4">
      {/* Header section */}
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold dark:text-white">Invoices</h1>
          <p className="text-gray-500 dark:text-gray-400">
            {filteredInvoices.length} {filteredInvoices.length === 1 ? 'invoice' : 'invoices'}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {/* Filter dropdown */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-gray-100 dark:bg-gray-700 rounded-md px-3 py-2"
          >
            <option value="all">All</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="draft">Draft</option>
          </select>

          {/* Dark mode toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
            aria-label="Toggle dark mode"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>

          {/* New invoice button */}
          <button
            onClick={() => setShowNewInvoice(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full flex items-center gap-2"
          >
            <span>+</span>
            <span>New Invoice</span>
          </button>
        </div>
      </header>

      {/* Invoices list */}
      <div className="grid gap-4">
        {filteredInvoices.length > 0 ? (
          filteredInvoices.map(invoice => (
            <InvoiceItem
              key={invoice.id}
              invoice={invoice}
              onClick={() => console.log('View invoice', invoice.id)}
            />
          ))
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500 dark:text-gray-400">No invoices found</p>
          </div>
        )}
      </div>

      {/* New invoice modal */}
      {showNewInvoice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-2xl p-6">
            <NewInvoice onClose={() => setShowNewInvoice(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;



