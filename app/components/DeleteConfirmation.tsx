import React from 'react';

interface DeleteConfirmationProps {
    onClose: () => void;
    onConfirm: () => Promise<void>;
    isLoading: boolean;
}

export const DeleteConfirmation = ({ onClose, onConfirm, isLoading }: DeleteConfirmationProps) => {

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h3 className="text-lg font-medium mb-4">Confirm Deletion</h3>
        <p className="mb-6">Are you sure you want to delete this request? This action cannot be undone.</p>
        
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:bg-red-400"
          >
            {isLoading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
};