"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { isAddress } from "viem";
import { AddressInput } from "~~/components/scaffold-eth";

export const AddressForm = () => {
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!address) {
      setError("Please enter an Ethereum address");
      return;
    }

    // Check if valid address
    if (!isAddress(address)) {
      setError("Invalid Ethereum address format");
      return;
    }

    // Clear error and redirect
    setError("");
    router.push(`/${address}`);
  };

  return (
    <div className="bg-base-200 rounded-3xl shadow-lg p-6 md:p-10">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text text-lg">Your Ethereum Address</span>
          </label>
          <AddressInput
            name="address"
            placeholder="0x..."
            value={address}
            onChange={value => {
              setAddress(value as string);
              if (error) setError("");
            }}
          />
          {error && <p className="text-error text-sm mt-1">{error}</p>}
        </div>

        <button type="submit" className="btn btn-primary mt-2">
          Generate QR Code
        </button>

        <div className="text-center text-sm text-base-content/70 mt-2">
          Or try an example:
          <div className="flex flex-wrap gap-2 justify-center mt-2">
            <Link href="/0x34aA3F359A9D614239015126635CE7732c18fDF3" className="link link-primary">
              Example Address
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};
