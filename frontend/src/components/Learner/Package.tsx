import React from 'react';
import { CheckCircle2 } from 'lucide-react'; // icon đẹp
import { useNavigate } from 'react-router-dom';

const PremiumPromo: React.FC = () => {
  const navigate = useNavigate();

  const handleUpgrade = () => {
    navigate('/payment'); // hoặc route khác để thanh toán
  };

  return (
    <div className="bg-gradient-to-br from-yellow-100 to-white border border-yellow-400 rounded-3xl p-8 shadow-lg w-full max-w-3xl mx-auto mt-10 space-y-6">
      <h2 className="text-3xl font-bold text-center text-gray-800">
        🚀 Unlock Your Full Potential with <span className="text-yellow-500">Premium</span>
      </h2>

      <ul className="text-gray-700 space-y-4 px-6 text-base">
        <li className="flex items-start space-x-3">
          <CheckCircle2 className="text-green-500 mt-1" size={20} />
          <span>Unlimited access to all coaching videos</span>
        </li>
        <li className="flex items-start space-x-3">
          <CheckCircle2 className="text-green-500 mt-1" size={20} />
          <span>Personalized AI feedback on your performance</span>
        </li>
        <li className="flex items-start space-x-3">
          <CheckCircle2 className="text-green-500 mt-1" size={20} />
          <span>Download videos and watch offline</span>
        </li>
        <li className="flex items-start space-x-3">
          <CheckCircle2 className="text-green-500 mt-1" size={20} />
          <span>Priority booking with top-rated coaches</span>
        </li>
      </ul>

      <div className="flex justify-center pt-2">
        <button
          onClick={handleUpgrade}
          className="bg-yellow-400 hover:bg-yellow-500 text-white px-6 py-2 rounded-full text-lg font-medium shadow-md transition"
        >
          Upgrade to Premium – Just $0.99
        </button>
      </div>
    </div>
  );
};

export default PremiumPromo;
