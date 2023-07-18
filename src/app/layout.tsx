import "./globals.css";
import { Providers } from "./providers";
import NavBar from "@/components/Navigation/NavBar";

export const metadata = {
	title: "Book Store App",
	description:
		"A Bookstore Stock Management Application, Created by Techguy9078",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				<Providers>
					<NavBar>{children}</NavBar>
				</Providers>
			</body>
		</html>
	);
}
