import { useState } from 'react';

const InvoiceForm = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState(initialData || {
    id: '',
    createdAt: new Date().toISOString().split('T')[0],
    paymentDue: '',
    description: '',
    paymentTerms: 7,
    clientName: '',
    clientEmail: '',
    status: 'pending',
    senderAddress: { street: '', city: '', postCode: '', country: '' },
    clientAddress: { street: '', city: '', postCode: '', country: '' },
    items: [],
    total: 0
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.clientName || !formData.clientEmail) {
      alert('Mijoz nomi va emaili kiritilishi shart');
      return;
    }
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 dark:bg-gray-900 p-6 rounded-lg">
      {/* Bill From Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Bill From</h3>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Street Address
          </label>
          <input
            type="text"
            value={formData.senderAddress.street}
            onChange={(e) => setFormData({
              ...formData,
              senderAddress: {
                ...formData.senderAddress,
                street: e.target.value
              }
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-800 dark:border-gray-600"
          />
        </div>

        {/* Qolgan form maydonlari shu tarzda qo'shiladi */}

      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200"
        >
          Bekor qilish
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Saqlash
        </button>
      </div>
    </form>
  );
};

export default InvoiceForm;