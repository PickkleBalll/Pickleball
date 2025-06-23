import React from 'react';

const Payment: React.FC = () => {
  return (
    <section className="flex justify-center mb-10 bg-payment">
      <div className="flex flex-col w-[500px] bg-[#f5f5f5] rounded-4xl border shadow-lg">
        <div className="px-7 py-3 bg-black rounded-t-4xl text-3xl text-white font-light">
          <p>PICKLEBALL</p>
        </div>
        <div className=" px-8 space-y-5">
          <div className="w-full bg-black text-white"></div>
          <div>
            <p className="text-2xl">Paymnent Summary</p>
            <p className="text-base font-light">
              Please review the following details for this transaction
            </p>
          </div>
          <div className="bg-gray-100 p-4 rounded-2xl w-full">
            <table className="w-full border-separate border-spacing-0 rounded-xl overflow-hidden bg-white">
              <thead>
                <tr className="bg-white">
                  <th className="text-left px-6 py-4 text-lg">Description</th>
                  <th className="text-right px-6 py-4 text-lg">Item Price</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-gray-200">
                  <td className="px-6 py-4 text-left">Advanced Course</td>
                  <td className="px-6 py-4 text-right">0.99$</td>
                </tr>
                <tr className="border-t border-gray-200">
                  <td className="px-6 py-4 text-right font-semibold" colSpan={1}>
                    Total
                  </td>
                  <td className="px-6 py-4 text-right font-semibold">0.99$</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div>
            <p className="text-2xl">Billing Information</p>
            <p className="text-base font-light">Enter your payment details below</p>
          </div>
          <div className="flex">
            <p>Payment Method</p>
            <p className="text-red-600">*</p>
          </div>
          <div className="flex items-center justify-center mb-4 mx-36 border bg-[#d5f25d] rounded-full h-10 text-xl font-semibold cursor-pointer">
            CONFIRM
          </div>
        </div>
      </div>
    </section>
  );
};
export default Payment;
