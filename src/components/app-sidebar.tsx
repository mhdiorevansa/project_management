"use client";

import * as React from "react";
import { BookOpen, Bot, LayoutDashboard, Settings2 } from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
	navMain: [
		{
			title: "Dashboard",
			url: "/dashboard",
			icon: LayoutDashboard,
		},
		{
			title: "Models",
			url: "/models",
			icon: Bot,
		},
		{
			title: "Documentation",
			url: "#",
			icon: BookOpen,
		},
		{
			title: "Settings",
			url: "#",
			icon: Settings2,
		},
	],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<TeamSwitcher />
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={data.navMain} />
			</SidebarContent>
			<SidebarFooter>
				<NavUser />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
