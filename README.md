# 🏗 SENETH - ENS-Aware Ethereum QR Code Generator

<h4 align="center">
  <a href="https://seneth.vercel.app">Live Demo</a> |
</h4>

🧪 An open-source tool for generating beautiful, shareable Ethereum address QR codes with ENS integration. Perfect for receiving crypto payments, sharing your wallet address, or displaying your ENS identity.

⚙️ Built using NextJS, Viem, ENS resolution, and dynamic OG image generation.

## ✨ Features

- 🖼️ **ENS-Aware OG Images**: Dynamically generates social media preview images with ENS names and avatars
- 🔄 **ENS Resolution**: Automatically resolves ENS names to addresses and displays ENS avatars when available
- 🎨 **Multiple Themes**: Choose from different visual themes for your QR code
- 📱 **Mobile Friendly**: Responsive design works great on all devices
- 🔗 **Shareable Links**: Generate links that can be shared on social media with beautiful previews
- 🧩 **Blockie Fallbacks**: Uses Ethereum blockies as avatar fallbacks when ENS avatars aren't available

## 🖼️ OG Image Examples

When you share a link from SENETH, it generates a beautiful preview image that includes:

1. The ENS name (if available) or Ethereum address
2. A scannable QR code linking to the Ethereum address
3. The ENS avatar (if available) or a generated blockie avatar
4. Theme customization options

## 🚀 Getting Started

To use SENETH, simply:

1. Visit [https://seneth.vercel.app](https://seneth.vercel.app)
2. Enter an Ethereum address or ENS name
3. Choose your preferred theme
4. Share the generated link or download the QR code

## 🧑‍💻 Development

This project is built on Scaffold-ETH 2, an open-source toolkit for building Ethereum dApps.

### Requirements

Before you begin, you need to install the following tools:

- [Node (>= v20.18.3)](https://nodejs.org/en/download/)
- Yarn ([v1](https://classic.yarnpkg.com/en/docs/install/) or [v2+](https://yarnpkg.com/getting-started/install))
- [Git](https://git-scm.com/downloads)

### Local Setup

1. Clone the repository:

```bash
git clone https://github.com/technophile-04/seneth.git
cd seneth
```

2. Install dependencies:

```bash
yarn install
```

3. Start the development server:

```bash
yarn start
```

4. Visit your app on: `http://localhost:3000`

### Environment Variables

To enable ENS resolution, you'll need an Alchemy API key:

```
NEXT_PUBLIC_ALCHEMY_API_KEY=your_alchemy_api_key
```

## 🧠 How It Works

The OG image generation uses Next.js API routes with the following process:

1. Receives an Ethereum address and optional theme parameter
2. Validates the address format
3. Resolves ENS name and avatar using Viem and the Ethereum mainnet
4. Generates a QR code pointing to the Ethereum address
5. Combines all elements into a beautiful shareable image
6. Falls back to blockie avatars when ENS avatars aren't available

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.
