"use client";

import { ChevronsUpDown, LogOut } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import createBrowserSupabaseClient from "@/lib/supabase/browser-client";
import { toast } from "sonner";
import { useRouter } from "nextjs-toploader/app";
import { Profile } from "@/types/profile";

export function NavUser() {
	const { isMobile } = useSidebar();
	const [loading, setLoading] = useState(false);
	const [showDialog, setShowDialog] = useState(false);
	const [profile, setProfile] = useState<Profile | null>(null);
	const router = useRouter();

	async function handleLogout() {
		setLoading(true);
		const { error } = await createBrowserSupabaseClient.auth.signOut();
		setLoading(false);
		if (error) {
			console.error(error);
			toast.error("An error occurred");
			return;
		}
		toast.success("Logout successfully");
		router.push("/login");
	}

	useEffect(() => {
		async function fetchProfileUser() {
			const {
				data: { user },
				error: errorAuth,
			} = await createBrowserSupabaseClient.auth.getUser();
			if (errorAuth) {
				console.error(errorAuth);
				toast.error("An error occurred");
				return;
			}
			const { data: profile, error: errorProfile } = await createBrowserSupabaseClient
				.from("user_profiles")
				.select("*")
				.eq("id", user?.id)
				.single();
			if (errorProfile) {
				console.error(errorProfile);
				toast.error("An error occurred");
				return;
			}
			setProfile(profile);
		}
		fetchProfileUser();
	}, []);

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size="lg"
							className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
							<Avatar className="h-8 w-8 rounded-lg">
								<AvatarImage src="/avatars/shadcn.jpg" alt="abdel" />
								<AvatarFallback className="rounded-lg">
									{profile?.full_name?.charAt(0).toUpperCase()}
								</AvatarFallback>
							</Avatar>
							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate font-medium">{profile?.full_name}</span>
								<span className="truncate text-xs">{profile?.email}</span>
							</div>
							<ChevronsUpDown className="ml-auto size-4" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
						side={isMobile ? "bottom" : "right"}
						align="end"
						sideOffset={4}>
						<DropdownMenuLabel className="p-0 font-normal">
							<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
								<Avatar className="h-8 w-8 rounded-lg">
									<AvatarImage src="/avatars/shadcn.jpg" alt="abdel" />
									<AvatarFallback className="rounded-lg">
										{profile?.full_name?.charAt(0).toUpperCase()}
									</AvatarFallback>
								</Avatar>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-medium">{profile?.full_name}</span>
									<span className="truncate text-xs">{profile?.email}</span>
								</div>
							</div>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem onClick={() => setShowDialog(true)}>
							<LogOut />
							Logout
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
				<Dialog open={showDialog} onOpenChange={setShowDialog}>
					<DialogContent className="sm:max-w-[425px]">
						<DialogHeader>
							<DialogTitle>Confirmation Logout</DialogTitle>
							<DialogDescription>Are you sure you want to logout?</DialogDescription>
						</DialogHeader>
						<DialogFooter>
							<DialogClose asChild>
								<Button variant="outline" disabled={loading} onClick={() => setShowDialog(false)}>
									Cancel
								</Button>
							</DialogClose>
							<Button
								variant="destructive"
								className={`${loading ? "cursor-no-drop" : "cursor-pointer"}`}
								disabled={loading}
								onClick={handleLogout}>
								{loading ? "Logging out..." : "Logout"}
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
