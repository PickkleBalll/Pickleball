import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  onClose: () => void;
  onUpgrade: () => void;
}

const UpgradeModal: React.FC<Props> = ({ onClose, onUpgrade }) => {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-xl p-6 shadow-xl w-full max-w-md text-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Upgrade to Premium
          </h2>
          <p className="text-gray-600 mb-4 text-sm">
            You’ve reached the free preview limit.
          </p>

          {/* Quảng cáo tiện ích */}
          <p className="text-gray-700 mb-6 text-sm">
            By upgrading to <strong>Premium</strong>, you’ll unlock:
            <ul className="mt-2 text-left list-disc list-inside text-gray-600 text-sm">
              <li>Unlimited access to all coaching videos</li>
              <li>Personalized AI feedback on your performance</li>
              <li>Download and watch offline</li>
              <li>Priority booking with top-rated coaches</li>
            </ul>
          </p>

          <div className="flex justify-center gap-4">
            <button
              onClick={onUpgrade}
              className="bg-blue-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-700 transition"
            >
              Upgrade Now
            </button>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              Maybe later
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default UpgradeModal;
