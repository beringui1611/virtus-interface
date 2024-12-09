import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { createAppKit } from '@reown/appkit/react';
import { CreateConnectorFn, http, WagmiProvider } from 'wagmi';
import { polygon } from '@reown/appkit/networks';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import "./input.css";
import { coinbaseWallet, injected, walletConnect } from 'wagmi/connectors';

const queryClient = new QueryClient();
const projectId = `${import.meta.env.VITE_API_KEY}`;

const metadata = {
  name: 'Virtus',
  description: 'Virtush your new method to learn english!',
  url: 'https://payment.virtuscoin.org/',
  icons: [''], 
};

const connectors: CreateConnectorFn[] = [];
connectors.push(walletConnect({projectId, metadata, showQrModal: true}));
connectors.push(injected({shimDisconnect: true}))
connectors.push(coinbaseWallet({
  appName: metadata.name,
  appLogoUrl: metadata.icons[0]
}))

const networks = [polygon];

const wagmiAdapter = new WagmiAdapter({
  transports: {
    [polygon.id]: http()
  },
  connectors,
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
