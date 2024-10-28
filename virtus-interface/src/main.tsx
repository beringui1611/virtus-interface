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

  const projectId = import.meta.env.VITE_API_KEY;

  const metadata = {
    name: 'Virtus Metaverse',
    description: 'Virtush your school english in metaverse!🚀',
    url: 'https://virtush.vercel.app/',
    icons: ['']
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
