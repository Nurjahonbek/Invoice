import { useState, useEffect } from 'react';
import { useInvoices } from '../context/InvoiceContext';

const NewInvoice = ({ onClose }) => {
  const { addInvoice } = useInvoices();
  const [formData, setFormData] = useState({
    id: '',
    createdAt: new Date().toISOString().split('T')[0],
    paymentDue: '',
    description: '',
    paymentTerms: 7,
    clientName: '',
    clientEmail: '',
    status: 'pending',
    senderAddress: {
      street: '',
      city: '',
      postCode: '',
      country: ''
    },
    clientAddress: {
      street: '',
      city: '',
      postCode: '',
      country: ''
    },
    items: [],
    total: 0
  });

  // Generate random ID for new invoice
  useEffect(() => {
    const randomId = Math.random().toString(36).substring(2, 8).toUpperCase();
    setFormData(prev => ({ ...prev, id: randomId }));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddressChange = (type, field, value) => {
    setFormData(prev => ({
      ...prev,
      [`${type}Address`]: {
        ...prev[`${type}Address`],
        [field]: value
      }
    }));
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...formData.items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };

    // Recalculate total
    updatedItems[index].total = updatedItems[index].quantity * updatedItems[index].price;

    setFormData(prev => ({
      ...prev,
      items: updatedItems,
      total: updatedItems.reduce((sum, item) => sum + item.total, 0)
    }));
  };

  const addNewItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [
        ...prev.items,
        { name: '', quantity: 1, price: 0, total: 0 }
      ]
    }));
  };

  const removeItem = (index) => {
    const updatedItems = formData.items.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      items: updatedItems,
      total: updatedItems.reduce((sum, item) => sum + item.total, 0)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.clientName || !formData.clientEmail) {
      alert('Client name and email are required');
      return;
    }

    addInvoice(formData);
    onClose();
  };

  return (
    <div className="relative">
      <h2 className="text-2xl font-bold mb-6 dark:text-white">New Invoice</h2>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Bill From Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">Bill From</h3>

          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-400">Street Address</label>
            <input
              type="text"
              value={formData.senderAddress.street}
              onChange={(e) => handleAddressChange('sender', 'street', e.target.value)}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              required
            />
          </div>

          {/* City, Post Code, Country fields for sender */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-400">City</label>
              <input
                type="text"
                value={formData.senderAddress.city}
                onChange={(e) => handleAddressChange('sender', 'city', e.target.value)}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                required
              />
            </div>
            {/* Add similar fields for Post Code and Country */}
          </div>
        </div>

        {/* Bill To Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">Bill To</h3>

          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-400">Client's Name</label>
            <input
              type="text"
              name="clientName"
              value={formData.clientName}
              onChange={handleInputChange}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-400">Client's Email</label>
            <input
              type="email"
              name="clientEmail"
              value={formData.clientEmail}
              onChange={handleInputChange}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              required
            />
          </div>

          {/* Client address fields similar to sender */}
        </div>

        {/* Invoice Details */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">Invoice Details</h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-400">Invoice Date</label>
              <input
                type="date"
                name="createdAt"
                value={formData.createdAt}
                onChange={handleInputChange}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-400">Payment Terms</label>
              <select
                name="paymentTerms"
                value={formData.paymentTerms}
                onChange={handleInputChange}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              >
                <option value="1">Net 1 Day</option>
                <option value="7">Net 7 Days</option>
                <option value="14">Net 14 Days</option>
                <option value="30">Net 30 Days</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-400">Project Description</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              required
            />
          </div>
        </div>

        {/* Item List */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">Item List</h3>

          {formData.items.map((item, index) => (
            <div key={index} className="grid grid-cols-12 gap-4 items-end">
              <div className="col-span-5">
                <label className="block text-sm font-medium mb-1 dark:text-gray-400">Item Name</label>
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  required
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium mb-1 dark:text-gray-400">Qty</label>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value))}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  required
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium mb-1 dark:text-gray-400">Price</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={item.price}
                  onChange={(e) => handleItemChange(index, 'price', parseFloat(e.target.value))}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  required
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium mb-1 dark:text-gray-400">Total</label>
                <div className="p-2 dark:text-gray-300">
                  £{item.total.toFixed(2)}
                </div>
              </div>

              <div className="col-span-1">
                <button
                  type="button"
                  onClick={() => removeItem(index)}
                  className="p-2 text-red-500 hover:text-red-700"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addNewItem}
            className="w-full py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded font-medium"
          >
            + Add New Item
          </button>
        </div>

        {/* Total Amount */}
        <div className="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <span className="text-gray-600 dark:text-gray-400">Amount Due</span>
          <span className="text-2xl font-bold dark:text-white">
            £{formData.total.toFixed(2)}
          </span>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-full font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium"
          >
            Save & Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewInvoice;