import { AnimatePresence, motion } from "motion/react";
import type { MemoryRecord } from "../types";
import Polaraid from "./Polaraid";
import { useState } from "react";

interface MemoryRecordCardProps extends React.HTMLProps<HTMLDivElement> {
	record: MemoryRecord;
}

export default function MemoryRecordCard({
	record,
	...props
}: MemoryRecordCardProps) {
	const [open, setOpen] = useState(false);

	return (
		<div {...props}>
			<Polaraid
				image={record.imageList?.[0]?.url ?? ''}
				title={record.title}
				text={record.text}
				className="w-full"
				onClick={() => {
					setOpen(true);
				}}
			/>

			{/* <AnimatePresence>
				{open && (
					<div className="z-50 pb-16 fixed inset-0 flex flex-col justify-center items-center">
						<motion.div
							className="-z-1 absolute inset-0 bg-red backdrop-blur-xl backdrop-saturate-150"
							initial={{
								opacity: 0,
							}}
							animate={{
								opacity: 1,
							}}
							exit={{
								opacity: 0,
							}}
						></motion.div>

						<motion.div
							className="w-72 aspect-[5/6] flex flex-col p-5 bg-white shadow-xl rounded-sm"
							style={{
								willChange: "all",
							}}
							initial={{
								opacity: 0,
								scale: 0,
								translateY: "50%",
							}}
							animate={{
								opacity: 1,
								scale: 1,
								translateY: "0%",
							}}
							exit={{
								scale: 0,
								opacity: 0,
								translateY: "-50%",
							}}
						>
							<div
								className="w-full pb-[104%] rounded-xs"
								style={{
									background: `center / cover no-repeat url(${record.imageList?.[0]?.url}), #dedede`,
								}}
							/>
							<div className="w-full pb-[20%] relative">
								<div
									className={"absolute left-0 right-0 top-[20%] bottom-[-20%]"}
								>
									<div className="text-2xl font-bold">{record.title}</div>
								</div>
							</div>
						</motion.div>
					</div>
				)}
			</AnimatePresence> */}
		</div>
	);
}
