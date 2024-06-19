import React from "react";

const NoteModal = ({ isOpen, onClose, notes = {} }) => {
  if (!isOpen) return null;

  const {
    Note = "No note available",
    Date: noteDate = "N/A",
    TimeAccepted = "N/A",
    TotalWeight = "N/A",
  } = notes;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg max-w-md mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Reception Note</h2>
        <div className="mb-4">
          <p className="text-lg font-medium">Note:</p>
          <p className="text-lg">{Note}</p>
        </div>
        <div className="mb-4">
          <p className="text-lg font-medium">Date:</p>
          <p className="text-lg">{new Date(noteDate).toLocaleString()}</p>
        </div>
        <div className="mb-4">
          <p className="text-lg font-medium">Time Accepted:</p>
          <p className="text-lg">{new Date(TimeAccepted).toLocaleString()}</p>
        </div>
        <div className="mb-4">
          <p className="text-lg font-medium">Total Weight:</p>
          <p className="text-lg">{TotalWeight}</p>
        </div>
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default NoteModal;
