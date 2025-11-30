import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: 1,
			staleTime: 5000,
		},
	},
});

async function main() {
	const { worker } = await import("./mocks/node");
	await worker.start();

	const root = createRoot(document.getElementById("root")!);
	root.render(
		<StrictMode>
			<BrowserRouter>
				<QueryClientProvider client={queryClient}>
					<App />
				</QueryClientProvider>
			</BrowserRouter>
		</StrictMode>
	);
}

main();
