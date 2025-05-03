import StatusBadge from './StatusBadge';

const InvoiceItem = ({ invoice, onClick }) => {
  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div
      className="flex items-center justify-between p-6 mb-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-transparent hover:border-blue-500 transition-all cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center space-x-6">
        <span className="font-bold text-gray-900 dark:text-white">#{invoice.id}</span>
        <span className="text-gray-500 dark:text-gray-400">
          Due {formatDate(invoice.paymentDue)}
        </span>
        <span className="text-gray-500 dark:text-gray-400">{invoice.clientName}</span>
      </div>

      <div className="flex items-center space-x-4">
        <span className="font-bold text-lg text-gray-900 dark:text-white">
          £{invoice.total.toFixed(2)}
        </span>
        <StatusBadge status={invoice.status} />
        <svg width="7" height="10" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1L5 5L1 9" stroke="#7C5DFA" strokeWidth="2"/>
        </svg>
      </div>
    </div>
  );
};

export default InvoiceItem;