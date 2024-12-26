import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { createAppKit } from '@reown/appkit/react';
import { http, WagmiProvider } from 'wagmi';
import { polygon } from '@reown/appkit/networks';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import "./input.css";
import "../i18n/i18n.ts";

const queryClient = new QueryClient();
const projectId = `${import.meta.env.VITE_API_KEY}`;

const metadata = {
  name: 'Virtus',
  description: 'Virtush your new method to learn english!',
  url: 'https://payment.virtuscoin.org/',
  icons: ['https://payment.virtuscoin.org/assets/nftasset-Bwxklj9w.webp'], 
};
const networks = [polygon];

const wagmiAdapter = new WagmiAdapter({
  transports: {
    [polygon.id]: http()
  },
  networks,
  projectId: projectId,
  
});

createAppKit({
  adapters: [wagmiAdapter],
  networks: [polygon],
  projectId: projectId,
  metadata,
  features: {
    analytics: true,
    socials:false,
    email:false,
  },
  defaultNetwork: polygon
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </WagmiProvider>
  </StrictMode>
); 
