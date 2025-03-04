import { ImageResponse } from "next/og";
import { blo } from "blo";
import QRCode from "qrcode";
import { Address, createPublicClient, getAddress, http, isAddress } from "viem";
import { mainnet } from "viem/chains";
import { normalize } from "viem/ens";
import { getAlchemyHttpUrl } from "~~/utils/scaffold-eth";

const alchemyHttpUrl = getAlchemyHttpUrl(mainnet.id);
const rpcUrl = alchemyHttpUrl;
const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(rpcUrl),
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const address = searchParams.get("address") || "0x0000000000000000000000000000000000000000";
    const theme = searchParams.get("theme") || "default";

    if (!isAddress(address)) {
      return new Response("Invalid Ethereum address format", { status: 400 });
    }

    const checksumAddress = getAddress(address);

    const qrCodeData = await QRCode.toDataURL(`ethereum:${checksumAddress}`, {
      errorCorrectionLevel: "H",
      margin: 1,
      width: 400,
      color: {
        dark: "#000000FF",
        light: "#FFFFFFFF",
      },
    });

    let ensName = null;
    try {
      ensName = await publicClient.getEnsName({ address: checksumAddress as Address });
    } catch (error) {
      console.error("Error resolving ENS name:", error);
    }

    // Try to resolve ENS avatar if we have an ENS name
    let avatarUrl = null;
    if (ensName) {
      try {
        avatarUrl = await publicClient.getEnsAvatar({ name: normalize(ensName) });
      } catch (error) {
        console.error("Error resolving ENS avatar:", error);
      }
    }

    // Fallback to blockie avatar if no ENS avatar
    const blockieUrl = blo(checksumAddress as `0x${string}`);
    const finalAvatarUrl = avatarUrl || blockieUrl;

    // Theme colors
    const themes = {
      default: {
        primary: "#627EEA", // Ethereum blue
        secondary: "#3C3C3D", // Ethereum dark
        gradient: "linear-gradient(135deg, #627EEA 0%, #8A92B2 100%)",
        text: "#1F2937",
        subtext: "#6B7280",
      },
      purple: {
        primary: "#7B3FE4",
        secondary: "#452981",
        gradient: "linear-gradient(135deg, #7B3FE4 0%, #A78BFA 100%)",
        text: "#1F2937",
        subtext: "#6B7280",
      },
      dark: {
        primary: "#3C3C3D",
        secondary: "#1F2937",
        gradient: "linear-gradient(135deg, #3C3C3D 0%, #111827 100%)",
        text: "#F9FAFB",
        subtext: "#D1D5DB",
      },
    };

    const colors = themes[theme as keyof typeof themes] || themes.default;

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
            fontFamily: "Inter, sans-serif",
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
              background: colors.gradient,
              opacity: theme === "dark" ? 1 : 0.1,
            }}
          />

          {/* Content container */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "55px",
              maxWidth: "90%",
              position: "relative",
            }}
          >
            {/* Ethereum Logo */}
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: "120px",
                height: "120px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                width="40"
                height="76"
                viewBox="0 0 256 417"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid"
              >
                <path fill={colors.primary} d="M127.961 0l-2.795 9.5v275.668l2.795 2.79 127.962-75.638z" />
                <path fill={colors.secondary} d="M127.962 0L0 212.32l127.962 75.639V154.158z" />
                <path fill={colors.primary} d="M127.961 312.187l-1.575 1.92v98.199l1.575 4.6L256 236.587z" />
                <path fill={colors.secondary} d="M127.962 416.905v-104.72L0 236.585z" />
                <path fill="#8A92B2" d="M127.961 287.958l127.96-75.637-127.96-58.162z" />
                <path fill="#62688F" d="M0 212.32l127.96 75.638v-133.8z" />
              </svg>
            </div>

            {/* QR Code with Avatar */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "12px",
                background: theme === "dark" ? "#1F2937" : "white",
                borderRadius: "24px",
                boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
                border: `4px solid ${colors.primary}`,
                position: "relative",
              }}
            >
              {/* QR Code */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img width="400" height="400" src={qrCodeData} alt="QR Code" />

              {/* Avatar Overlay */}
              <div
                style={{
                  position: "absolute",
                  top: "53%",
                  left: "23.5%",
                  transform: "translate(-50%, -50%)",
                  width: "95px",
                  height: "95px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={finalAvatarUrl}
                  width="100%"
                  height="100%"
                  alt="Avatar"
                  style={{
                    borderRadius: "50%",
                  }}
                />
              </div>
            </div>

            {/* Address or ENS Name Text */}
            <div
              style={{
                marginTop: "32px",
                fontSize: "36px",
                fontWeight: "bold",
                color: colors.text,
                textAlign: "center",
              }}
            >
              {ensName || `${checksumAddress.slice(0, 6)}...${checksumAddress.slice(-6)}`}
            </div>
            <div
              style={{
                marginTop: "16px",
                fontSize: "24px",
                color: colors.subtext,
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 4L10.59 5.41L16.17 11H4V13H16.17L10.59 18.59L12 20L20 12L12 4Z" fill={colors.subtext} />
              </svg>
              Scan to send ETH
            </div>
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
    return new Response(`Failed to generate the image: ${e.message}`, {
      status: 500,
    });
  }
}
