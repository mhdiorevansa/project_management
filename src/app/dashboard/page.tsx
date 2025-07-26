"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import createBrowserSupabaseClient from "@/lib/supabase/browser-client";
import { useRouter } from "nextjs-toploader/app";
import { useState } from "react";
import { toast } from "sonner";

export default function DashboardPage() {
	const router = useRouter();
	const [openDialog, setOpenDialog] = useState(false);
	const [loading, setLoading] = useState(false);

	async function handleLogout() {
		setLoading(true);
		const { error } = await createBrowserSupabaseClient.auth.signOut();
		setLoading(false);
		if (error) {
			console.error(error);
			toast.error("An error occurred");
		} else {
			toast.success("Logout successfully");
			router.push("/login");
		}
		setOpenDialog(false);
	}

	return (
		<section className="p-6">
			<Dialog open={openDialog} onOpenChange={setOpenDialog}>
				<DialogTrigger asChild>
					<Button variant="destructive" className="cursor-pointer">
						Logout
					</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Logout User</DialogTitle>
						<DialogDescription>Are you sure you want to logout?</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<DialogClose asChild>
							<Button variant="outline" className="cursor-pointer">
								Cancel
							</Button>
						</DialogClose>
						<Button
							type="button"
							onClick={handleLogout}
							variant={"destructive"}
							className={`${loading ? "cursor-no-drop" : "cursor-pointer"}`}
							disabled={loading}>
							{loading ? "Logging out..." : "Logout"}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</section>
	);
}
