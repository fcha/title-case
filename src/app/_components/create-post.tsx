"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "~/trpc/react";

export function CreatePost() {
	const router = useRouter();
	const [name, setName] = useState("");

	const createPost = api.post.create.useMutation({
		onSuccess: () => {
			router.refresh();
			setName("");
		},
	});

	return (
		<form
			onChange={(e) => {
				e.preventDefault();
				createPost.mutate({ name });
			}}
			className="flex flex-col gap-2"
		>
			<textarea
				placeholder="Text"
				value={name}
				onChange={(e) => setName(e.target.value)}
				className="textarea text-pink-500 textarea-bordered textarea-lg w-full"
		/>
		</form>
	);
}
