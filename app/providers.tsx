"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { useRouter } from 'next/navigation'
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { Toaster } from 'react-hot-toast';

import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  midnightTheme,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  polygonAmoy,
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";

const config = getDefaultConfig({
  appName: 'nft-dapp',
  projectId: 'nft-dapp',
  chains: [polygonAmoy],
});

export interface ProvidersProps {
	children: React.ReactNode;
	themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();
  const queryClient = new QueryClient();

	return (
		<NextUIProvider navigate={router.push}>
			<NextThemesProvider {...themeProps}>
			<WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={midnightTheme({
            overlayBlur: 'large',
          })}
        >
			{children}
      <Toaster
        position="bottom-right"
        reverseOrder={false}
      />
			</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
		</NextThemesProvider>
		</NextUIProvider>
	);
}
