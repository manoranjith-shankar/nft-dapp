# Basic Nft Dapp

### Install dependencies

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

## contracts

Replace .env.example to .env and add PRIV_KEY (wallet key) and API_KEY for provider (alchemy, Infura)

```shell
cd backend
npx hardhat ignition deploy ./ignition/modules/NftContract.ts --network <NETWORK_NAME>
```

This will deploy the contract module to the specified network (hardhat.config.ts)
## Technologies Used

- [Next.js 14](https://nextjs.org/docs/getting-started)
- [NextUI v2](https://nextui.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Tailwind Variants](https://tailwind-variants.org)
- [TypeScript](https://www.typescriptlang.org/)
- [Framer Motion](https://www.framer.com/motion/)
- [next-themes](https://github.com/pacocoursey/next-themes)

## License

Licensed under the [MIT license](https://github.com/nextui-org/next-app-template/blob/main/LICENSE).