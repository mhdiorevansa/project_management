"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import createBrowserSupabaseClient from "@/lib/supabase/browser-client";
import Link from "next/link";
import { useRouter } from "nextjs-toploader/app";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

export default function RegisterPage() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);

	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setLoading(true);
		const { error } = await createBrowserSupabaseClient.auth.signUp({
			email,
			password,
		});
		setLoading(false);
		if (password.length < 6) {
			toast.warning("Password must be at least 6 characters");
			return;
		} else if (error) {
			if (error.message === "User already registered") {
				toast.warning("User already registered");
				return;
			} else {
				console.error(error);
				toast.error("An error occurred");
				return;
			}
		}
		toast.success("Login successfully");
		router.push("/dashboard");
	}

	return (
		<section className="w-full h-screen flex justify-center items-center">
			<Card className="w-full max-w-sm">
				<CardHeader className="text-center">
					<CardTitle className="text-xl">Register Account</CardTitle>
					<CardDescription>Enter your email below to rehister to your account</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit}>
						<div className="flex flex-col gap-6">
							<div className="grid gap-2">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									type="email"
									name="email"
									onChange={(e) => setEmail(e.target.value)}
									placeholder="user@example.com"
									required
								/>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="password">Password</Label>
								<Input
									id="password"
									name="password"
									type="password"
									onChange={(e) => setPassword(e.target.value)}
									placeholder="••••••"
									required
								/>
							</div>
						</div>
						<div className="space-y-2 mt-4">
							<Button
								type="submit"
								className={`w-full ${loading ? "cursor-no-drop" : "cursor-pointer"}`}
								disabled={loading}>
								{loading ? "Registering..." : "Register"}
							</Button>
							<Button asChild variant={"outline"} className="w-full" disabled={loading}>
								<Link href="/login">Login</Link>
							</Button>
						</div>
					</form>
				</CardContent>
			</Card>
		</section>
	);
}
