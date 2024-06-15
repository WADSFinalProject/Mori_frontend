import React from 'react';

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, shipmentId }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-40"></div>
      <div className="bg-white p-6 rounded-lg z-50">
        <h2 className="text-lg font-bold">Are you sure you want to delete?</h2>
        <p className="text-sm text-gray-500 mt-2">Deleted shipment can’t be recovered and data must be re-inputted for recovery.</p>
        <div className="mt-4 flex justify-end">
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded-lg mr-2"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-[#CD4848] text-white rounded-lg"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;