import FilePicker from "@/components/FilePicker";
import { Button, Card, CardBody, CardFooter, CardHeader, Image } from "@nextui-org/react"

export default function Home() {
	return (
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
			<div className="inline-block max-w-lg text-center justify-center">
        <h1 className="text-2xl font-bold mb-3">Connect your wallet and mint NFTs!</h1>
		    <FilePicker />
	    {/* <p className="m-3">OR</p>
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
    </Card> */}
			</div>
		</section>
	);
}
