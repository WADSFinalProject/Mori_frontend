import React, { useState } from 'react';
import qris from '../../../assets/qris.png';
import gopay from '../../../assets/gopay.png';
import ovo from '../../../assets/ovo.jpeg';

const Invoice = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const paymentLogos = {
    'QRIS': qris,
    'GOPAY': gopay,
    'OVO': ovo
  };

  const handlePaymentChange = (event) => {
    setSelectedPaymentMethod(event.target.value);
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 max-w-4xl mx-auto bg-white shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Invoice #102018</h1>
          <p className="text-sm text-gray-500">07/08/2024, 03:27 A.M.</p>
        </div>
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 md:pr-8">
            <div className="mb-6">
              <h2 className="text-xl font-semibold">Booking Summary</h2>
              <p className="text-red-500 mb-2 mt-2">2 Batches</p>
              <div className="flex justify-between items-center mb-2 mt-5">
                <p className='font-bold'>BATCH #10201 <span className="text-gray-500">30kg</span></p>
                <p>IDR 545,000.00</p>
              </div>
              <div className="flex justify-between items-center mb-4 mt-4">
                <p className='font-bold'>BATCH #10201 <span className="text-gray-500">32kg</span></p>
                <p>IDR 555,000.00</p>
              </div>
              <div className="flex justify-between items-center border-t-2 pt-2 mb-2 mt-3">
                <p className='mt-5'>Subtotal</p>
                <p className='mt-5'>Rp 1,100,000.00</p>
              </div>
              <div className="flex justify-between items-center mb-4">
                <p>Shipping</p>
                <p>FREE</p>
              </div>
              <div className="flex justify-between items-center text-lg">
                <p>Total Amount Due</p>
                <p className='font-bold'>Rp 1,100,000.00</p>
              </div>
            </div>
          </div>
          <div className="border-l border-gray-300 mx-4"></div>
          <div className="md:w-1/2 md:pl-8">
            {submitted ? (
              <div>
                <div className="mb-6">
                  <p className="text-left text-lg font-bold text-red-700">PAY BEFORE MAY 8, 2024 AT 03:27 A.M.</p>
                </div>
                <div className="text-left">
                  {selectedPaymentMethod && (
                    <img
                      src={paymentLogos[selectedPaymentMethod]}
                      alt={selectedPaymentMethod}
                      className="w-23 h-10 mb-4"
                    />
                  )}
                  <p className="mt-3 mb-3">Virtual Account Number</p>
                  <p className="text-lg font-bold">8808014592355271</p>
                  <p className='mt-3 mb-3'>Virtual Account Name</p>
                  <p className="text-lg font-bold">Mori</p>
                  <p className='mt-3 mb-3'>Amount to Pay</p>
                  <p className="text-2xl font-bold">IDR 1,100,000.00</p>
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-6 mt-3">
                  <p className="text-center text-l font-bold mb-2 text-black">PAY BEFORE MAY 8, 2024 AT 03:27 A.M.</p>
                  <p className="text-center text-3xl font-bold text-red-700">IDR 1,100,000.00</p>
                </div>
                <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                <div className="space-y-4">
                  <div className="border p-4 rounded-md">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="payment"
                        value="QRIS"
                        id="qris"
                        className="mr-2"
                        onChange={handlePaymentChange}
                      />
                      <label htmlFor="qris" className="flex items-center">
                        QRIS
                        <span className="ml-2 flex space-x-2">
                          <img src={qris} alt="QRIS" className="w-13 h-5" />
                        </span>
                      </label>
                    </div>
                  </div>
                  <div className="border p-4 rounded-md">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="payment"
                        value="GOPAY"
                        id="gopay"
                        className="mr-2"
                        onChange={handlePaymentChange}
                      />
                      <label htmlFor="gopay" className="flex items-center">
                        GOPAY
                        <span className="ml-2 flex space-x-2">
                          <img src={gopay} alt="GOPAY" className="w-18 h-7" />
                        </span>
                      </label>
                    </div>
                  </div>
                  <div className="border p-4 rounded-md">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="payment"
                        value="OVO"
                        id="ovo"
                        className="mr-2"
                        onChange={handlePaymentChange}
                      />
                      <label htmlFor="ovo" className="flex items-center">
                        OVO
                        <span className="ml-2 flex space-x-2">
                          <img src={ovo} alt="OVO" className="w-13 h-4" />
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleSubmit}
                  className="mt-6 bg-blue-500 text-white py-2 px-4 rounded"
                >
                  Submit
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
