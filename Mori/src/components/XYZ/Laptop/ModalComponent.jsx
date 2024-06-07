import React from "react";

const ModalComponent = ({ isOpen, onClose, selectedBatches }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-md p-10 w-1/3 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="font-vietnam text-xl font-semibold tracking-tighter text-black mb-1">
          You have successfully booked these batches:
        </p>
        <p className="font-semibold mb-3 text-[#A7AD6F] tracking-tighter text-xl font-vietnam">
          {selectedBatches.join(", ")}
        </p>
        <p className="mb-6 font-vietnam font-normal text-base tracking-tight">
          Please finish your payment{" "}
          <span style={{ color: "#CD4848" }}>before 24 hours</span> to avoid
          automatic cancellation of your booking slot.
        </p>
        <button
          className="bg-[#CD4848] text-white font-vietnam text-base font-medium py-3 px-7 rounded-md hover:bg-[#CD4848]/85 hover:transition-colors"
          onClick={() => alert("Invoice will be shown here.")}
        >
          VIEW INVOICE
        </button>
      </div>
    </div>
  );
};

export default ModalComponent;
