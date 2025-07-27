import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import createServerSupabaseClient from "@/lib/supabase/server-client";
import { CircleDot, ClipboardList, List, Users } from "lucide-react";
import { toast } from "sonner";

export default async function DashboardPage() {
	let greetings: string;
	const time: string = new Intl.DateTimeFormat("id-ID", {
		hour: "2-digit",
		timeZone: "Asia/Jakarta",
		hour12: false,
	}).format(new Date());
	if (time >= "00:00" && time < "11:00") {
		greetings = "Good Morning";
	} else if (time > "11" && time < "15:00") {
		greetings = "Good Afternoon";
	} else if (time > "15:00" && time < "18:00") {
		greetings = "Good Evening";
	} else {
		greetings = "Good Night";
	}
	const {
		data: { user },
		error: errorGetUser,
	} = await createServerSupabaseClient.auth.getUser();
	if (errorGetUser) {
		toast.error("Error getting user");
		console.error(errorGetUser);
		return;
	}
	const { data: profileUser, error: errorGetProfile } = await createServerSupabaseClient
		.from("user_profiles")
		.select("*")
		.eq("id", user?.id)
		.single();
	if (errorGetProfile) {
		toast.error("Error getting profile");
		console.error(errorGetProfile);
		return;
	}

	return (
		<section className="space-y-4">
			<h1 className="text-xl">
				{greetings}, {profileUser?.full_name}
			</h1>
			<div className="grid md:grid-cols-2 gap-4 ">
				<Card className="w-full h-[19rem] border overflow-auto no-scrollbar">
					<CardHeader>
						<CardTitle>Recent Tasks</CardTitle>
						<CardDescription>
							List of your recent tasks. You can view details of task by clicking the task name.
						</CardDescription>
						<ul className="space-y-2">
							<li className="flex items-center gap-x-2">
								<List size={18} /> <span className="text-sm">Task 1</span>
							</li>
							<li className="flex items-center gap-x-2">
								<List size={18} /> <span className="text-sm">Task 2</span>
							</li>
						</ul>
					</CardHeader>
				</Card>
				<Card className="w-full h-[19rem] border overflow-auto no-scrollbar">
					<CardHeader>
						<CardTitle>Agenda</CardTitle>
						<CardDescription>
							Here is your agenda for the upcoming week. Stay organized and plan your tasks
							efficiently.
						</CardDescription>
						<ul className="space-y-2">
							<li className="flex items-center gap-x-2">
								<ClipboardList size={18} />{" "}
								<span className="text-sm">16/10/2025 (Meeting with Lesto)</span>
							</li>
							<li className="flex items-center gap-x-2">
								<ClipboardList size={18} />{" "}
								<span className="text-sm">21/11/2025 (Meeting with Saipul)</span>
							</li>
						</ul>
					</CardHeader>
				</Card>
				<Card className="w-full h-[19rem] border overflow-auto no-scrollbar">
					<CardHeader>
						<CardTitle>Teams</CardTitle>
						<CardDescription>
							List of teams you are part of. You can view details of team by clicking the team name.
						</CardDescription>
						<ul className="space-y-2">
							<li className="flex items-center gap-x-2">
								<Users size={18} /> <span className="text-sm">Nganggur Team</span>
							</li>
							<li className="flex items-center gap-x-2">
								<Users size={18} /> <span className="text-sm">Abdel Team</span>
							</li>
						</ul>
					</CardHeader>
				</Card>
				<Card className="w-full h-[19rem] border overflow-auto no-scrollbar">
					<CardHeader>
						<CardTitle>Priorities</CardTitle>
						<CardDescription>
							Here are your priorities. You can view details of task by clicking the task name.
						</CardDescription>
						<ul className="space-y-2">
							<li className="flex items-center gap-x-2">
								<CircleDot size={18} /> <span className="text-sm">Make auth feature</span>
							</li>
							<li className="flex items-center gap-x-2">
								<CircleDot size={18} /> <span className="text-sm">Make task feature</span>
							</li>
						</ul>
					</CardHeader>
				</Card>
			</div>
		</section>
	);
}
