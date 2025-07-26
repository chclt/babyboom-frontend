import { motion } from "motion/react";
import type { MemoryRecord } from "../types";

interface MemoryRecordCardProps extends React.HTMLProps<HTMLDivElement> {
	record: MemoryRecord;
}

export default function MemoryRecordCard({ record }: MemoryRecordCardProps) {
	return (
		<div>
			<motion.div className="relative w-full transform-3d">
				<motion.div className="w-full aspect-[5/6] flex flex-col p-[6.33333%] bg-white rounded-sm backface-hidden">
					<div
						className="w-full pb-[104%] rounded-xs"
						style={{
							background: `center / cover no-repeat url(${record.image}), #dedede`,
						}}
					/>
					<div className="w-full pb-[20%] relative">
						<div
							className={"absolute left-0 right-0 top-[20%] bottom-[-20%]"}
						></div>
					</div>
				</motion.div>

				<motion.div
					className="absolute inset-0 p-[3.33333%] bg-white backface-hidden"
					style={{
						rotateY: "180deg",
					}}
				>
					{record.text}
				</motion.div>
			</motion.div>
		</div>
	);
}
