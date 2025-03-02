import { ImageResponse } from "next/og";
import QRCode from "qrcode";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const address = searchParams.get("address") || "0x0000000000000000000000000000000000000000";
    const qrCodeData = await QRCode.toDataURL(`ethereum:${address}`, {
      errorCorrectionLevel: "H",
      margin: 0,
      width: 300,
    });

    return new ImageResponse(
      (
        <div
          style={{
            background: "white",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            position: "relative",
          }}
        >
          {/* Background with gradient */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
              opacity: 0.1,
            }}
          />

          {/* QR Code */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "40px",
              background: "white",
              borderRadius: "24px",
              boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
            }}
          >
            <img width="200" height="200" src={qrCodeData} alt="QR Code" />
          </div>

          {/* Address Text */}
          <div
            style={{
              marginTop: "40px",
              fontSize: "32px",
              fontWeight: "bold",
              color: "#1f2937",
            }}
          >
            {`${address.slice(0, 6)}...${address.slice(-4)}`}
          </div>

          <div
            style={{
              marginTop: "20px",
              fontSize: "24px",
              color: "#6b7280",
            }}
          >
            Scan to send ETH
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
