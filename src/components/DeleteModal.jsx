const DeleteModal = ({ invoiceId, onCancel, onConfirm }) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
          <h3 className="text-xl font-bold mb-4 dark:text-white">Confirm Deletion</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Are you sure you want to delete invoice #{invoiceId}? This action cannot be undone.
          </p>
          <div className="flex justify-end space-x-4">
            <button
              onClick={onCancel}
              className="px-6 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-full font-medium"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-full font-medium"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  };

  export default DeleteModal;