import React from "react";
import { useAuth } from "react-oidc-context";

// Define the props interface for LoginModal
interface LoginModalProps {
    isOpen: boolean; // Determines if the modal is open
    onClose: () => void; // Callback to close the modal
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
    const auth = useAuth();
    if (!isOpen) return null; // Don't render the modal if it's not open

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
                <h2 className="text-lg/2 font-bold mb-4">Please log in to continue.</h2>
                <button
                    onClick={() => auth.signinRedirect() }
                    className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-900"
                >
                    Login
                </button>
                <div className="flex justify-center space-x-4 hyperlink cursor-pointer mt-3">
                    <button
                        onClick={onClose}
                        className="text-xs text-green-900 hover:underline"
                    >
                        Cancel
                    </button>
                </div>
                
            </div>
        </div>
    );
};

export default LoginModal;