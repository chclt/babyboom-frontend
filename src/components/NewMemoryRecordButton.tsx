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

export default function NewMemoryRecordButton() {
	const [open, setOpen] = useState<boolean>(false);
	const [image, setImage] = useState<File | null>(null);
	const [imageObjectUrl, setImageObjectUrl] = useState<string>();

	useEffect(() => {
		if (image) {
			setImageObjectUrl(URL.createObjectURL(image));
		} else {
			if (imageObjectUrl) {
				URL.revokeObjectURL(imageObjectUrl);
				setImageObjectUrl(undefined);
			}
		}
	}, [image]);

	const [title, setTitle] = useState<string>("");
	const titleRef = useRef<HTMLInputElement>(null);

	const { mutateAsync: updateFile } = useMutation({
		...getUploadFileMutationOptions(),
	});

	const { mutateAsync: createMemoryRecord } = useMutation({
		...getCreateMemoryRecordMutationOptions(),
	});

	const handleCreateMemoryRecord = ({
		image,
		title,
	}: {
		image: File;
		title: string;
	}) => {
		return updateFile({ fileType: "image", file: image }).then((res) => {
			return createMemoryRecord({ title, imageList: [res] }).then(() => {
				setImage(null);
				setTitle("");
				queryClient.invalidateQueries({
					queryKey: getMemoryRecordListQueryOptions().queryKey,
				});
			});
		});
	};

	return (
		<>
			<div
				className={cn(
					"z-[100] fixed bottom-20 right-8 w-full flex justify-end transition-all duration-150",
					open && "translate-y-8",
				)}
			>
				<div>
					<div
						className="overflow-hidden block w-full h-4 bg-amber-300 rounded-full"
						style={{}}
					></div>
				</div>

				<motion.button
					className={cn(
						"flex justify-center items-center h-16 w-[4.125rem] rounded-full",
						"bg-[#2ec748] text-white border border-solid border-[#2ec748] shadow-[0_3px_0_0_#27aa3d]",
						"active:translate-y-[2px] active:shadow-none",
					)}
					initial={{
						opacity: 0,
						scale: 0,
					}}
					animate={{
						opacity: 1,
						scale: 1,
					}}
					exit={{
						scale: 0,
						opacity: 0,
					}}
					onClick={() => {
						if (open) {
							if (image) {
								handleCreateMemoryRecord({ image, title }).finally(() => {
									setOpen(false);
								});
							} else {
								setOpen(false);
							}
						} else {
							setOpen(true);
						}
					}}
				>
					{open ? (
						<IconCheckmark1 className={"size-9"} />
					) : (
						<IconPLusLarge className={"size-9"} />
					)}
				</motion.button>
			</div>

			<AnimatePresence>
				{open && (
					<div className="z-50 pb-16 fixed inset-0 flex flex-col justify-center items-center">
						<motion.div
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
									background: `center / cover no-repeat url(${imageObjectUrl}), #dedede`,
								}}
							/>
							<div className="w-full pb-[20%] relative">
								<div
									className={"absolute left-0 right-0 top-[20%] bottom-[-20%]"}
								>
									<input
										className="w-full h-full text-center"
										ref={titleRef}
										value={title}
										onChange={(e) => {
											setTitle(e.currentTarget.value);
										}}
									/>
								</div>
							</div>
						</motion.div>

						<div className="mt-8 flex gap-4">
							<motion.button
								initial={{
									scale: 0,
								}}
								animate={{
									scale: 1,
								}}
								exit={{
									scale: 0,
									opacity: 0,
								}}
								onClick={() => {
									titleRef.current?.focus();
								}}
							>
								<div
									className={cn(
										"flex justify-center items-center h-16 w-[4.125rem] rounded-full",
										"bg-[#ffde00] text-[#a69000] border border-solid border-[#ffde00] shadow-[0_3px_0_0_#d9bd00]",
										"active:translate-y-[2px] active:shadow-none",
									)}
								>
									<IconText1 />
								</div>
							</motion.button>

							<motion.div
								initial={{
									opacity: 0,
									scale: 0,
								}}
								animate={{
									opacity: 1,
									scale: 1,
								}}
								exit={{
									scale: 0,
									opacity: 0,
								}}
							>
								<label
									className={cn(
										"flex justify-center items-center h-16 w-[4.125rem] rounded-full border border-solid",
										"bg-[#1cb0f6] border-[#1cb0f6] text-white shadow-[0_3px_0_0_#1896d1]",
										"active:translate-y-[2px] active:shadow-none",
									)}
								>
									<FileInput
										placeholder="Upload files"
										hidden
										display="none"
										value={image}
										onChange={(payload) => {
											if (payload) setImage(payload);
										}}
									/>
									<IconImages1 />
								</label>
							</motion.div>

							{/*<motion.div*/}
							{/*	initial={{*/}
							{/*		scale: 0,*/}
							{/*	}}*/}
							{/*	animate={{*/}
							{/*		scale: 1,*/}
							{/*	}}*/}
							{/*	exit={{*/}
							{/*		scale: 0,*/}
							{/*		opacity: 0,*/}
							{/*	}}*/}
							{/*>*/}
							{/*	<label*/}
							{/*		className="flex items-center pl-[1.375rem] pr-[1.75rem] h-16 w-16 rounded-full text-white [&_svg]:size-16"*/}
							{/*		style={{*/}
							{/*			background: `center / cover no-repeat url("${imageWoolRed}")`,*/}
							{/*			boxShadow:*/}
							{/*				"inset -1px 1px 2px 0px rgba(255, 255, 255, 0.2), inset 1px -1px 2px 0px rgba(0, 0, 0, 0.15)",*/}
							{/*		}}*/}
							{/*	>*/}
							{/*		<FileInput placeholder="Upload files" hidden display="none" />*/}
							{/*		<IconText1 />*/}
							{/*		添加录音*/}
							{/*	</label>*/}
							{/*</motion.div>*/}
						</div>
					</div>
				)}
			</AnimatePresence>
		</>
	);
}
