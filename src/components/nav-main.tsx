"use client";

import { type LucideIcon } from "lucide-react";
import {
	SidebarGroup,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavMain({
	items,
}: {
	items: {
		title: string;
		url: string;
		icon?: LucideIcon;
		isActive?: boolean;
	}[];
}) {
	const pathName = usePathname();
	return (
		<SidebarGroup>
			<SidebarMenu>
				{items.map((item) => (
					<SidebarMenuItem
						key={item.title}
						className={`${pathName === item.url ? "bg-sidebar-accent rounded-xl" : ""}`}>
						<SidebarMenuButton asChild tooltip={item.title}>
							<Link href={item.url}>
								{item.icon && <item.icon />}
								<span>{item.title}</span>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				))}
			</SidebarMenu>
		</SidebarGroup>
	);
}
