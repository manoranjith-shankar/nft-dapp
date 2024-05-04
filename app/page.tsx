import FilePicker from "@/components/FilePicker";
import { Button, Card, CardBody, CardFooter, CardHeader, Image, Input } from "@nextui-org/react"


export default function Home() {
	return (
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
			<div className="inline-block max-w-lg text-center justify-center">
			<Card className="py-4">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <h4 className="font-bold text-large">Mint BYC NFTs</h4>
      </CardHeader>
      <CardBody className="py-2">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src="https://nextui.org/images/hero-card-complete.jpeg"
          width={400}
        />
      </CardBody>
	  <CardFooter className="justify-center">
		<Button className="w-full">Mint NFT</Button>
	  </CardFooter>
    </Card>
	<p className="m-3">OR</p>
	<Card className="py-4">
  <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
    <h4 className="font-bold text-large">Mint Your NFT</h4>
  </CardHeader>
  <CardBody className="grid grid-cols-2 gap-2">
	<div>
		<FilePicker />
	</div>
	<div>
		<Input placeholder="Enter NFT Name" className="mb-3" />
		<Input placeholder="Enter Symbol" className="mb-3" />
		<Input placeholder="Enter Description" className="mb-3" />
		<Input placeholder="IPFS Link" className="mb-3" />
	</div>
  </CardBody>
  <CardFooter className="justify-center">
    <Button className="w-full">Mint NFT</Button>
  </CardFooter>
</Card>
			</div>
		</section>
	);
}
