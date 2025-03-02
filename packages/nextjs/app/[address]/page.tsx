import { Metadata } from "next";
import { isAddress } from "viem";
import { AddressActions } from "~~/components/qr-code/AddressActions";
import { Address } from "~~/components/scaffold-eth";

type Props = {
  params: {
    address: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const address = params.address;
  const isValidAddress = isAddress(address);

  // Default title and description
  const title = isValidAddress
    ? `Send ETH to ${address.slice(0, 6)}...${address.slice(-4)}`
    : "Invalid Ethereum Address";

  // Base URL - replace with your actual domain in production
  const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : "http://localhost:3000";

  // OG image URL
  const ogImageUrl = isValidAddress
    ? `${baseUrl}/api/og?address=${address}`
    : `${baseUrl}/api/og?address=0x0000000000000000000000000000000000000000`;

  return {
    metadataBase: new URL(baseUrl),
    title,
    openGraph: {
      title,
      type: "website",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `QR Code for ${address}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      images: [ogImageUrl],
    },
  };
}

export default function AddressPage({ params }: Props) {
  const address = params.address;
  const isValidAddress = isAddress(address);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-5">
      <div className="max-w-2xl w-full bg-base-200 rounded-3xl shadow-xl overflow-hidden">
        <div className="p-8 flex flex-col items-center">
          <h1 className="text-3xl font-bold mb-6 text-center">
            {isValidAddress ? "Send ETH to this Address" : "Invalid Ethereum Address"}
          </h1>
          {isValidAddress ? (
            <>
              <div className="mb-8 p-6 bg-white rounded-2xl shadow-lg">
                <img
                  src={`/api/og?address=${address}`}
                  alt={`QR Code for ${address}`}
                  width={400}
                  height={400}
                  className="mx-auto"
                />
              </div>

              <div className="mb-6 text-center">
                <p className="text-lg mb-2">Ethereum Address:</p>
                <div className="flex justify-center">
                  <Address address={address} size="lg" />
                </div>
              </div>

              <div className="text-center text-base-content/70">
                <p>Scan this QR code with your Ethereum wallet to send ETH directly to this address.</p>
                <p className="mt-2">Share this page with anyone who wants to send you ETH!</p>
              </div>

              <AddressActions address={address} />
            </>
          ) : (
            <div className="text-center text-error p-4">
              <p>The provided address is not a valid Ethereum address.</p>
              <p className="mt-2">Please check the URL and try again.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
