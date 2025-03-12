import React from 'react';

interface LimitModalProps {
    isOpen: boolean;
    onClose: () => void;
    onUpgrade: () => void;
}

const FeatureLimitModal: React.FC<LimitModalProps> = ({ isOpen, onClose, onUpgrade }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center" style={{zIndex: '3'}}>
            <div className="bg-white p-6 rounded-lg max-w-md text-center">
                <h2 className="text-2xl font-bold mb-4">Upgrade to Pro</h2>
                <p className="mb-6">
                    You've reached the limit for free features. Upgrade to Pro to unlock unlimited notes and more!
                </p>
                <button
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent event propagation
                        onUpgrade();
                    }}
                    className="bg-blue-600 text-white px-6 py-2 rounded mr-4 hover:bg-blue-700"
                >
                    Upgrade Now
                </button>
                <button
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent event propagation
                        onClose();
                    }}
                    className="bg-gray-300 text-black px-6 py-2 rounded hover:bg-gray-400"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default FeatureLimitModal;