import React from 'react';

const Payment: React.FC = () => {
  return (
    <section>
      <div>
        <div>
          <p>PICKLEBALL</p>
          <p>Paymnent Summary</p>
          <p>Please review the following details for this transaction</p>
        </div>
        <table>
          <thead>
            <th>Description</th>
            <th>Itemsprice</th>
          </thead>
          <tbody>
            <tr>
              <th>Advanced Course</th>
              <th>0.99$</th>
            </tr>
            <tr>
              <th>Total</th>
              <th>0.99$</th>
            </tr>
          </tbody>
        </table>
        <div>
          <p>Billing Information</p>
          <p>Enter your payment details below</p>
        </div>
        <div>
          <p>Payment Method</p>
          <p className="text-red-600">*</p>
        </div>
        <div>CONFIRM</div>
      </div>
    </section>
  );
};
export default Payment;
