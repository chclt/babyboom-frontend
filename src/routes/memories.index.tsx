import { useToggle } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { degrees } from "motion/react";
import { useMemo, useState } from "react";
import IconCircleQuestionmark from "../assets/IconCircleQuestionmark.tsx";
import IconLayoutGrid from "../assets/IconLayoutGrid.tsx";
import IconTimeFiles from "../assets/IconTimeFiles.tsx";
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
import { cn } from "../libs/utils.ts";
import MemoryRecordDetail from "../components/MemoryRecordDetail.tsx";
import type { MemoryRecord } from "../types/index.ts";
import { record } from "zod";
import dayjs from "dayjs";

export const Route = createFileRoute("/memories/")({
	component: PageComponent,
});
function PageComponent() {
	const { data: memoryRecords } = useQuery(getMemoryRecordListQueryOptions());

	const [view, toggleView] = useToggle(["grid", "timeline"]);

	const [layout, toggleLayout] = useToggle([
		"grid-cols-2 gap-2",
		"grid-cols-3 gap-1.5",
		"grid-cols-4 gap-0 [&>*]:-mt-8 mt-8",
		"grid-cols-1 gap-2",
	]);

	const [randomDegree, toggleRandomDegree] = useToggle([3, 3, 5, 1]);

	const [open, setOpen] = useState(false);
	const [openedRecord, setOpenedRecord] = useState<MemoryRecord | null>(null);

	return (
		<>
			<div className=" pb-64 flex flex-col">
				<div className="z-10 sticky top-0 right-0 p-4 flex items-center justify-between text-neutral-800">
					{/* <div className="z-50 gradient-blur absolute left-0 top-0 h-24 w-full  pointer-events-none bg-red">
						<div
							className="z-[1] absolute inset-0 backdrop-blur-[0.5px]"
							style={{
								mask: "linear-gradient(0deg, transparent 0, #000 12.5%, #000 25%, transparent 37.5%)",
							}}
						/>
						<div
							className="z-[2] absolute inset-0 backdrop-blur-[1px]"
							style={{
								mask: "linear-gradient(0deg, transparent 0, #000 12.5%, #000 25%, transparent 37.5%)",
							}}
						/>
						<div
							className="z-[3] absolute inset-0 backdrop-blur-[1.5px]"
							style={{
								mask: "linear-gradient(0deg, transparent 0, #000 12.5%, #000 25%, transparent 37.5%)",
							}}
						/>
						<div
							className="z-[4] absolute inset-0 backdrop-blur-[3px]"
							style={{
								mask: "linear-gradient(0deg, transparent 0, #000 12.5%, #000 25%, transparent 37.5%)",
							}}
						/>
						<div
							className="z-[5] absolute inset-0 backdrop-blur-[4px]"
							style={{
								mask: "linear-gradient(0deg, transparent 0, #000 12.5%, #000 25%, transparent 37.5%)",
							}}
						/>
						<div
							className="z-[6] absolute inset-0 backdrop-blur-[6px]"
							style={{
								mask: "linear-gradient(0deg, transparent 0, #000 12.5%, #000 25%, transparent 37.5%)",
							}}
						/>
						<div
							className="z-[7] absolute inset-0 backdrop-blur-[8px]"
							style={{
								mask: "linear-gradient(0deg, transparent 0, #000 12.5%, #000 25%, transparent 37.5%)",
							}}
						/>
						<div
							className="z-[8] absolute inset-0 backdrop-blur-[10px]"
							style={{
								mask: "linear-gradient(0deg, transparent 0, #000 12.5%, #000 25%, transparent 37.5%)",
							}}
						/>
					</div> */}

					<h1 className="text-2xl font-bold">
						{view === "grid" ? "全部照片" : "时间线"}
					</h1>
					<div
						className={cn(
							"px-2 self-end flex items-center justify-center bg-white rounded-full",
							"border border-solid border-white shadow-[0_3px_0_0_#ddd]",
						)}
					>
						<button
							className="size-12 flex items-center justify-center"
							onClick={() => toggleView()}
						>
							<IconTimeFiles />
						</button>

						<button className="size-12 flex items-center justify-center">
							<IconLayoutGrid
								onClick={() => {
									toggleLayout();
									toggleRandomDegree();
								}}
							/>
						</button>
						<button className="size-12 flex items-center justify-center">
							<IconCircleQuestionmark />
						</button>
					</div>
				</div>

				{view === "timeline" &&
					memoryRecords.map((record) => {
						const degree = randomDegree
							? (Math.random() * 2 - 1) * randomDegree
							: 0;

						if (!record.imageList?.[0]?.url) {
							return null;
						}
						return (
							<div key={record.id} className="flex flex-col gap-2 p-4">
								<h2 className="text-lg font-bold">
									{dayjs(record.createTime).format("YYYY-MM-DD HH:mm")}
								</h2>
								<p>{record.text}</p>
								<ol
									className={cn("p-2 grid transition-all duration-150", layout)}
								>
									<MemoryRecordCard
										record={record}
										className="transition-all duration-150"
										style={{ transform: `rotate(${degree}deg)` }}
										onClick={() => {
											setOpen(true);
											setOpenedRecord(record);
										}}
									/>
								</ol>
							</div>
						);
					})}

				{view === "grid" && (
					<ol className={cn("p-2 grid transition-all duration-150", layout)}>
						{memoryRecords.map((record) => {
							if (record.imageList?.length) {
								const degree = randomDegree
									? (Math.random() * 2 - 1) * randomDegree
									: 0;

								return (
									<MemoryRecordCard
										record={record}
										className="transition-all duration-150"
										style={{ transform: `rotate(${degree}deg)` }}
										onClick={() => {
											setOpen(true);
											setOpenedRecord(record);
										}}
									/>
								);
							}
						})}
					</ol>
				)}
			</div>

			<NewMemoryRecordButton />
			{openedRecord && (
				<MemoryRecordDetail
					open={open}
					onClose={() => setOpen(false)}
					record={openedRecord}
				/>
			)}
		</>
	);
}
