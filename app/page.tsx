import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";
import { prisma } from "@/lib/prisma";

export default async function Home() {
	const session = await getServerSession(options);

	if (!session) {
		return (
			<div className="flex justify-center mt-10">
				Not logged in to see this
			</div>
		);
	}

	const user = await prisma.tGUser.findUnique({
		where: {
			id: session.user.id,
		},
	});

	return (
		<div className="flex flex-col items-center mt-10">
			<h1>{user?.name}</h1>
			<h1 className="truncate max-w-[300px]">{user?.image}</h1>
			<h1>{user?.id}</h1>
			<h1>{user?.createdAt.getTime()}</h1>
		</div>
	);
}
