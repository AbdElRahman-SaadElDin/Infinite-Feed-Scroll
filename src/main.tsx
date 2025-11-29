import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: 1,
			staleTime: 5000,
		},
	},
});

async function main() {
	if (import.meta.env.DEV) {
		const { worker } = await import("./mocks/node");
		await worker.start();
	}

	const root = createRoot(document.getElementById("root")!);
	root.render(
		<StrictMode>
			<QueryClientProvider client={queryClient}>
				<App />
			</QueryClientProvider>
		</StrictMode>
	);
}

main();
