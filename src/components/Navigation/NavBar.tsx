"use client";
import { ReactNode } from "react";
import {
	Box,
	Flex,
	HStack,
	IconButton,
	Button,
	useDisclosure,
	useColorModeValue,
	Stack,
	useColorMode,
	Text,
} from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import Image from "next/image";
import { usePathname } from "next/navigation";

// ##################################################
// Colours
// Kiwi (Green) #8bd346
// Green #4caf50
// Sinopia (Orange) #d64e12
// Deep Saffron (Yellow) #f9a52c
// Minion Yellow (Darker Green) #efdf48
// Battery Charged Blue (Blue) #16a4d8
// Sky Blue (Crayola) (Darker Blue) #60dbe8
// Lavender Indigo (Purple) #9b5fe0
// ##################################################

// #f44336	RGB(244, 67, 54)	Red
// #e81e63	RGB(232, 30, 99)	Pink
// #9c27b0	RGB(156, 39, 176)	Purple
// #673ab7	RGB(103, 58, 183)	Deep Purple
// #3f51b5	RGB(63, 81, 181)	Indigo
// #2196f3	RGB(33, 150, 243)	Blue
// #03a9f4	RGB(3, 169, 244)	Light Blue
// #00bcd4	RGB(0, 188, 212)	Cyan
// #009688	RGB(0, 150, 136)	Teal
// #ffeb3b	RGB(255, 235, 59)	Yellow
// #ffc107	RGB(255, 193, 7)	Amber
// #ff9800	RGB(255, 152, 0)	Orange
// #ff5722	RGB(255, 87, 34)	Deep Orange
// #795548	RGB(121, 85, 72)	Brown
// #9e9e9e	RGB(158, 158, 158)	Gray
// #607d8b	RGB(96, 125, 139)	Blue Gray

interface colorType {
	light: string;
	dark: string;
}

const Links = [
	{
		name: "Auto Add",
		href: "AutoAdd",
		color: { light: "#8bd346", dark: "#4caf50" },
	},
	{
		name: "Manual Add",
		href: "ManualAdd",
		color: { light: "#edda34", dark: "#d5c42e" },
	},
	{
		name: "Auto Remove",
		href: "AutoRemove",
		color: { light: "#8561c5", dark: "#673ab7" },
	},
	{
		name: "Search",
		href: "Search",
		color: { light: "#00a9be", dark: "#008394" },
	},
	// {
	// 	name: "Add Requests",
	// 	href: "AddRequest",
	// 	color: { light: "#B66878", dark: "#894553" },
	// },
	// {
	// 	name: "Search Requests",
	// 	href: "SearchRequests",
	// 	color: { light: "#736EA9", dark: "#554E9D" },
	// },
	{
		name: "Stats",
		href: "Stats",
		color: { light: "#ae9991", dark: "#86665a" },
	},
	{
		name: "Reports",
		href: "Reports",
		color: { light: "#836a8a", dark: "#65466D" },
	},
	{
		name: "Admin",
		href: "Admin",
		color: { light: "purple.600", dark: "purple.500" },
	},
];

export default function NavBar({ children }: { children: ReactNode }) {
	const pathname = usePathname().slice(1);
	const linkObject = Links.find((link) => link.href === pathname);

	const { colorMode, toggleColorMode } = useColorMode();
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<Box
			width={"100%"}
			height={"100%"}
			position="fixed"
			bgColor={useColorModeValue(
				linkObject?.color.dark ? linkObject?.color.dark : "white",
				linkObject?.color.dark ? linkObject?.color.dark : "gray.400"
			)}
		>
			<Box bg={useColorModeValue("gray.200", "gray.900")} px={8}>
				<Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
					<IconButton
						size={"md"}
						icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
						aria-label={"Open Menu"}
						display={{ md: "none" }}
						onClick={isOpen ? onClose : onOpen}
					/>
					<HStack spacing={8} alignItems={"center"}>
						<Link
							href={"/"}
							p={1}
							rounded={"md"}
							_hover={{
								textDecoration: "none",
								bg: useColorModeValue("gray.200", "gray.700"),
							}}
						>
							<HStack>
								<Image
									src={"/bookworm.png"}
									alt=""
									width="0"
									height="0"
									sizes="100vw"
									style={{ width: "48px", height: "auto" }}
								/>
								<Text textColor={useColorModeValue("black", "white")}>
									Book Store App
								</Text>
							</HStack>
						</Link>

						<HStack
							h={16}
							as={"nav"}
							spacing={0}
							display={{ base: "none", md: "flex" }}
							textColor={useColorModeValue("gray.900", "gray.200")}
						>
							{Links.map(({ name, href, color }, i) => (
								<DesktopNavLink
									key={i}
									href={href}
									color={color}
									currentLink={pathname}
								>
									{name}
								</DesktopNavLink>
							))}
						</HStack>
					</HStack>
					<Flex alignItems={"center"}>
						<Button onClick={toggleColorMode}>
							{colorMode === "light" ? <MoonIcon /> : <SunIcon />}
						</Button>
					</Flex>
				</Flex>

				{isOpen ? (
					<Box pb={4} display={{ md: "none" }}>
						<Stack as={"nav"} spacing={1}>
							{Links.map(({ name, href, color }, i) => (
								<MobileNavLink
									key={i}
									href={href}
									color={color}
									currentLink={pathname}
								>
									{name}
								</MobileNavLink>
							))}
						</Stack>
					</Box>
				) : null}
			</Box>

			<Box p={4}>{children}</Box>
		</Box>
	);
}

const DesktopNavLink = ({
	href,
	color,
	currentLink,
	children,
}: {
	href: string;
	color: colorType;
	currentLink: string | undefined;
	children: ReactNode;
}) => {
	const { light, dark } = color;
	return (
		<Button
			as={Link}
			w={"135px"}
			display={"flex"}
			h={"100%"}
			alignItems={"center"}
			rounded={"none"}
			bgColor={dark}
			isActive={currentLink == href}
			color={"white"}
			_active={{
				color: "black",
				bgColor: light,
			}}
			_hover={{
				textDecoration: "none",
				bg: light,
				color: "black",
			}}
			href={href}
		>
			{children}
		</Button>
	);
};

const MobileNavLink = ({
	href,
	color,
	currentLink,
	children,
}: {
	href: string;
	color: colorType;
	currentLink: string | undefined;
	children: ReactNode;
}) => {
	const { light, dark } = color;
	return (
		<Button
			as={Link}
			py={4}
			px={3}
			display={"flex"}
			h={"100%"}
			alignItems={"center"}
			rounded={"none"}
			bgColor={dark}
			isActive={currentLink == href ? true : false}
			color={"white"}
			_active={{
				color: "black",
				bgColor: light,
			}}
			_hover={{
				textDecoration: "none",
				bg: light,
				color: "black",
			}}
			href={href}
		>
			{children}
		</Button>
	);
};
