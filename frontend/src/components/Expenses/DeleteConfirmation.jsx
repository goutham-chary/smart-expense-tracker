import { AlertTriangle } from 'lucide-react';

const DeleteConfirmation = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
        <div className="flex flex-col items-center text-center">
          <div className="bg-red-100 rounded-full p-4 mb-4">
            <AlertTriangle className="w-12 h-12 text-red-600" />
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Delete Transaction?
          </h2>

          <p className="text-gray-600 mb-6">
            Are you sure you want to delete this transaction? This action cannot be undone.
          </p>

          <div className="flex gap-3 w-full">
            <button
              onClick={onCancel}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
