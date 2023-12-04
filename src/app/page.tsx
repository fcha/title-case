import Link from "next/link";

import { CreatePost } from "~/app/_components/create-post";
import { api } from "~/trpc/server";

export default async function Home() {
	const hello = await api.post.hello.query({ text: "from tRPC" });

	return (
		<main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
			<div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
				<h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
					Title Case
				</h1>
				<CrudShowcase />
			</div>
		</main>
	);
}

async function CrudShowcase() {
	const latestPost = await api.post.getLatest.query();

	return (
		<div className="w-full max-w-xs">
			{latestPost ? (
				<p>Your most recent text: <br /> {latestPost.name}</p>
			) : (
				<p>You have text.</p>
			)}
			<br />
			<CreatePost />
		</div>
	);
}
