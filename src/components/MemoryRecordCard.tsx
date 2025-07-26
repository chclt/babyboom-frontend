import { motion } from "motion/react";
import type { MemoryRecord } from "../types";
import Polaraid from "./Polaraid";

interface MemoryRecordCardProps extends React.HTMLProps<HTMLDivElement> {
	record: MemoryRecord;
}

export default function MemoryRecordCard({
	record,
	...props
}: MemoryRecordCardProps) {
	return (
		<div {...props}>
			<Polaraid
				image={record.imageList![0].url!}
				title={record.title}
				text={record.text}
				className="w-full"			/>
		</div>
	);
}
