"use client";

import { useState } from "react";

interface AddressActionsProps {
  address: string;
}

export const AddressActions = ({ address }: AddressActionsProps) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareAddress = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `Send ETH to ${address.slice(0, 6)}...${address.slice(-4)}`,
          text: `Scan the QR code to send ETH directly to ${address}`,
          url: window.location.href,
        })
        .catch(error => console.error("Error sharing:", error));
    } else {
      copyToClipboard();
    }
  };

  return (
    <div className="mt-8 flex gap-4">
      <button className="btn btn-primary" onClick={copyToClipboard}>
        {copied ? "Copied!" : "Copy Link"}
      </button>

      <button className="btn btn-outline" onClick={shareAddress}>
        Share
      </button>
    </div>
  );
};
