import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { createAppKit } from '@reown/appkit/react';
import { WagmiProvider } from 'wagmi';
import { polygonAmoy } from '@reown/appkit/networks';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import "./input.css";

const queryClient = new QueryClient();
  const projectId = 'd0fabd839f326af2c9241437db44d734';

  const metadata = {
    name: 'AppKit',
    description: 'AppKit Example',
    url: 'https://virtus-interface.vercel.app/',
    icons: [ " "]
  }

  const networks = [polygonAmoy];

  const wagmiAdapter = new WagmiAdapter({
    networks,
    projectId,
    ssr:true
  });
  

  createAppKit({
    adapters: [wagmiAdapter],
    networks: [polygonAmoy],
    projectId,
    metadata,
    features: {
      analytics: true
    }
  });




createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
    <QueryClientProvider client={queryClient}> 
      <App/>
    </QueryClientProvider>
  </WagmiProvider>
  </StrictMode>,
)
