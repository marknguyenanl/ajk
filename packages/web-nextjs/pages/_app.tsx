import StoreProvider from "@/app/StoreProvider";
import Layout from "@/components/layout";
import "@/styles/globals.css";

export default function MyApp({
	Component,
	pageProps,
}: { Component: any; pageProps: any }) {
	return (
		<StoreProvider>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</StoreProvider>
	);
}
