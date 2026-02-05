import React, { useState, useEffect } from "react";
import { CheckCircle, X } from "lucide-react";

interface SuccessToastProps {
  message?: string;
  error?: string;

  onClose: () => void;
}
const SuccessToast = ({
  message = "Thank you for subscribing!Please check your inbox.",
  error,
  onClose,
}: SuccessToastProps) => {
  return (
    <div className="toast toast-top toast-center z-50 animate-[slideInLeft_0.5s_ease-out] py-12">
      <div className="alert alert-success bg-base-300 text-base-content border-success rounded-box flex items-center gap-3 border-l-4 p-4 shadow-lg">
        {!error && <CheckCircle className="text-success size-6" />}
        {error && <CheckCircle className="text-error size-6" />}
        <div>
          <h3 className="font-bold">{error ? "Error!" : "Success!"}</h3>
          {error && <div className="text-error text-xs">{error}</div>}
          {!error && <div className="text-xs">{message}</div>}
        </div>
        <button
          onClick={onClose}
          className="btn btn-ghost btn-xs btn-circle ml-auto"
        >
          <X className="size-4" />
        </button>
      </div>
    </div>
  );
};

export default SuccessToast;
