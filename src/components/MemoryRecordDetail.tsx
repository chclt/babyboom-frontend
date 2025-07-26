import { Dialog, FileInput } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import IconCheckmark1 from "../assets/IconCheckmark1.tsx";
import IconCircleCheck from "../assets/IconCircleCheck.tsx";
import IconImages1 from "../assets/IconImages1.tsx";
import IconPLusLarge from "../assets/IconPLusLarge.tsx";
import IconText1 from "../assets/IconText1.tsx";
import imageWoolAmber from "../assets/wool_amber.png";
import imageWoolGreen from "../assets/wool_green.png";
import imageWoolRed from "../assets/wool_red.png";
import {
	getCreateMemoryRecordMutationOptions,
	getMemoryRecordListQueryOptions,
	getUploadFileMutationOptions,
} from "../fetchers/index.ts";
import queryClient from "../libs/queryClient.ts";
import { cn } from "../libs/utils.ts";
import type { MemoryRecord } from "../types/index.ts";

export default function MemoryRecordDetail({
	record,
	open,
	onClose,
}: {
	record: MemoryRecord;
	open: boolean;
	onClose: () => void;
}) {
	console.log(open);

	return (
		<>
			<AnimatePresence>
				{open && (
					<div className="z-[300] pb-16 fixed inset-0 flex flex-col justify-center items-center">
						{/* <motion.div
							className="-z-1 absolute inset-0 bg-red/20 backdrop-blur-xl backdrop-saturate-150"
							initial={{
								opacity: 0,
							}}
							animate={{
								opacity: 1,
							}}
							exit={{
								opacity: 0,
							}}
							onClick={(e) => {
								if (e.target === e.currentTarget) {
									onClose();
								}
							}}
						></motion.div> */}

						<motion.div
							className="relative"
							style={{
								transformStyle: "preserve-3d",
								backfaceVisibility: "hidden",
								willChange: "all",
							}}
							initial={{
								translateY: "100%",
								rotateY: "0deg",
							}}
							animate={{
								translateY: "0%",
								rotateY: "180deg",
								transition: { duration: 0.5 },
							}}
							exit={{
								translateY: "-100vh",
								rotateY: "0deg",
								transition: {},
							}}
						>
							<motion.div className="w-72 aspect-[5/6] flex flex-col p-5 bg-white shadow-xl rounded-sm">
								<div
									className="w-full pb-[104%] rounded-xs"
									style={{
										background: `center / cover no-repeat url(${record.imageList?.[0]?.url ?? ""}), #dedede`,
									}}
								/>
								<div className="w-full pb-[20%] relative">
									<div
										className={
											"absolute left-0 right-0 top-[20%] bottom-[-20%] flex items-center justify-center"
										}
									>
										<div className="text-center text-gray-700">
											{record.title}
										</div>
									</div>
								</div>
							</motion.div>

							<motion.div
								className="absolute top-0 left-0 w-72 aspect-[5/6] flex flex-col p-5 bg-white shadow-xl rounded-sm"
								style={{
									rotateY: "180deg",
									transformStyle: "preserve-3d",
									backfaceVisibility: "hidden",
								}}
							>
								<div
									className="w-full pb-[104%] rounded-xs p-2 relative"
									style={{
										background: `#333`,
									}}
								>
									<div className="absolute top-0 left-0 w-full h-full text-[#eee] p-2">
										{record.text}
									</div>
								</div>
								<div className="w-full pb-[20%] relative"></div>
							</motion.div>
						</motion.div>
					</div>
				)}
			</AnimatePresence>
		</>
	);
}
