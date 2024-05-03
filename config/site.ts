export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "nft-dapp",
	description: "NFT dapp example on ethereum sepolia",
	navItems: [
		{
			label: "Mint",
			href: "/",
		},
    {
      label: "View",
      href: "/view-nfts",
    },
	],
};
