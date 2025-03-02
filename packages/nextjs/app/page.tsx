import { AddressForm } from "~~/components/qr-code/AddressForm";

export default function Home() {
  return (
    <div className="flex items-center flex-col flex-grow pt-10">
      <div className="px-5 w-full md:max-w-3xl">
        <h1 className="text-center mb-8">
          <span className="block text-4xl font-bold">ETH QR Code Generator</span>
          <span className="block text-xl mt-2">Share your Ethereum address with a QR code</span>
        </h1>
        <AddressForm />
        <div className="mt-16 bg-base-300 rounded-3xl p-6 md:p-10">
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-center">How It Works</h2>
            <p>
              This tool generates a shareable link with a QR code for your Ethereum address. When someone scans the QR
              code with their Ethereum wallet, they can easily send ETH to your address.
            </p>
            <ol className="list-decimal list-inside space-y-2 mt-4">
              <li>Enter your Ethereum address in the form above</li>
              <li>Get a shareable link with your QR code</li>
              <li>Share the link with anyone who wants to send you ETH</li>
              <li>They can scan the QR code with their wallet app to send ETH directly to your address</li>
            </ol>
            <p className="mt-4">
              When you share the link on social media, it will automatically display a preview image with your QR code!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
