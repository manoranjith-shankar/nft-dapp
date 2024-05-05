import FilePicker from "@/components/FilePicker";

export default function Home() {
	return (
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
			<div className="inline-block max-w-lg text-center justify-center">
        <h1 className="text-2xl font-bold mb-3">Connect your wallet and mint NFTs!</h1>
		    <FilePicker />
			</div>
		</section>
	);
}
