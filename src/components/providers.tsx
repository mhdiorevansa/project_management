"use client";

import NextTopLoader from "nextjs-toploader";

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<>
			<NextTopLoader
				color="#171717" // biru dope
				initialPosition={0.08}
				crawlSpeed={200}
				height={4}
				crawl={true}
				showSpinner={false}
				easing="ease"
				speed={200}
			/>
			{children}
		</>
	);
}
