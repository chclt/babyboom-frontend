import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import MemoryRecordCard from "../components/MemoryRecordCard.tsx";
import NewMemoryRecordButton from "../components/NewMemoryRecordButton.tsx";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../components/ui/dialog";
import { getMemoryRecordListQueryOptions } from "../fetchers";

export const Route = createFileRoute("/memories/")({
	component: PageComponent,
});

function PageComponent() {
	const { data: memoryRecords } = useQuery(getMemoryRecordListQueryOptions());

	return (
		<>
			<div className="bg-[#eee]">
				<ol className="p-2 grid grid-cols-2 gap-2">
					{memoryRecords.map((record) => (
						<MemoryRecordCard record={record} />
					))}
				</ol>
				<Link to={"/memories/create"}> + </Link>
			</div>

			<NewMemoryRecordButton />
		</>
	);
}
