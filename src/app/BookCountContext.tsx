import axios from "axios";
import {
	useState,
	useCallback,
	useMemo,
	createContext,
	useEffect,
} from "react";

export const BookCountContext = createContext<BookCountContext>(
	undefined as never
);

interface BookCountContext {
	currentBookCount: string;
	getBookCount: (response: any) => Promise<void>;
}

export default function BookCountProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [currentBookCount, setCurrentBookCount] = useState<string>("");

	const getBookCount = useCallback(async () => {
		const responseBookCount = await axios.get("/api/BookAPI/BookCount");
		setCurrentBookCount(responseBookCount.data);
	}, []);

	const contextValue = useMemo(
		() => ({
			currentBookCount,
			getBookCount,
		}),
		[currentBookCount, getBookCount]
	);

	useEffect(() => {
		getBookCount();
	}, []);

	return (
		<BookCountContext.Provider value={contextValue}>
			{children}
		</BookCountContext.Provider>
	);
}
