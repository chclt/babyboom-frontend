import { Dialog, FileInput } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import IconArrowRotateRightLeft from "../assets/IconArrowRotateRightLeft.tsx";
import IconCheckmark1 from "../assets/IconCheckmark1.tsx";
import IconCircleCheck from "../assets/IconCircleCheck.tsx";
import IconImages1 from "../assets/IconImages1.tsx";
import IconLoadingCircle from "../assets/IconLoadingCircle.tsx";
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
import AudioPlayer from "./AudioPlayer.tsx";
import AudioRecorder from "./AudioRecorder.tsx";

export default function NewMemoryRecordButton() {
	const [open, setOpen] = useState<boolean>(false);
	const [image, setImage] = useState<File | null>(null);
	const [imageObjectUrl, setImageObjectUrl] = useState<string>();
	const [audioFile, setAudioFile] = useState<File | null>(null);

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

	const [text, setText] = useState<string>("");
	const textRef = useRef<HTMLTextAreaElement>(null);

	const { mutateAsync: updateFile } = useMutation({
		...getUploadFileMutationOptions(),
	});

	const { mutateAsync: createMemoryRecord, isPending: isCreating } =
		useMutation({
			...getCreateMemoryRecordMutationOptions(),
		}); 

	const handleCreateMemoryRecord = ({
		image,
		audio,
		title, 
		text,
	}: {
		image?: File;
		audio?: File;
		title: string;
		text: string;
	}) => {
		const uploadPromises: Promise<string>[] = [];

		if (image) {
			uploadPromises.push(updateFile({ fileType: "image", file: image }));
		}

		if (audio) {
			uploadPromises.push(updateFile({ fileType: "audio", file: audio }));
		}

		return Promise.all(uploadPromises).then((results) => {
			// 根据上传的文件类型，将结果分别处理
			const imageList = results.slice(0, image ? 1 : 0);

			const audioList = results.slice(image ? 1 : 0);

			return createMemoryRecord({
				title,
				imageList,
				audioList, 
				text,
			}).then(() => {
				setImage(null);
				setAudioFile(null);
				setTitle("");
				setText("");
				queryClient.invalidateQueries({
					queryKey: getMemoryRecordListQueryOptions().queryKey,
				});
			});
		});
	};

	const [flipped, setFlipped] = useState<boolean>(false);

	useEffect(() => {
		if (flipped) {
			textRef.current?.focus();
		}
	}, [flipped]);

	return (
		<>
			<div
				className={cn(
					"z-[100] fixed bottom-20 right-8 w-full flex justify-end ",
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
						"flex justify-center items-center h-16 w-[4.125rem] rounded-full transition-transform",
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
							if (image || audioFile) {
								handleCreateMemoryRecord({
									image: image || undefined,
									audio: audioFile || undefined,
									title,
									text,
								}).finally(() => {
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
					) : isCreating ? (
						<IconLoadingCircle className={"size-9"} />
					) : (
						<IconPLusLarge className={"size-9"} />
					)}
				</motion.button>
			</div>

			<AnimatePresence>
				{open && (
					<div className="z-50 pb-16 fixed inset-0 flex flex-col justify-center items-center">
						<motion.div
							className="-z-1 absolute inset-0 backdrop-blur-xl backdrop-saturate-150"
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

						<div
							className="z-20 relative transition-all duration-150"
							style={{
								transformStyle: "preserve-3d",
								backfaceVisibility: "hidden",
								willChange: "all",
								transform: `rotateY(${flipped ? "180deg" : "0deg"})`,
							}}
						>
							<motion.div
								className="w-72 aspect-[5/6] flex flex-col p-5 bg-white shadow-xl rounded-sm "
								style={{
									willChange: "all",
									transformStyle: "preserve-3d",
									backfaceVisibility: "hidden",
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
										className={
											"absolute left-0 right-0 top-[20%] bottom-[-20%]"
										}
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

							<motion.div
								className="absolute top-0 left-0 w-72 aspect-[5/6] flex flex-col p-5 bg-white shadow-xl rounded-sm "
								style={{
									willChange: "all",
									transformStyle: "preserve-3d",
									backfaceVisibility: "hidden",
									rotateY: "180deg",
									translateZ: "-1px",
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
									className="w-full pb-[104%] rounded-xs relative"
									style={{
										background: `#333`,
									}}
								>
									<textarea
										className="absolute top-0 left-0 p-2 w-full h-full text-[#eee]"
										ref={textRef}
										value={text}
										onChange={(e) => {
											setText(e.currentTarget.value);
										}}
									/>
								</div>
								<div className="w-full pb-[20%] relative">
									<div
										className={
											"absolute left-0 right-0 top-[20%] bottom-[-20%]"
										}
									></div>
								</div>
							</motion.div>
						</div>

						<div className="relative mt-8 flex gap-4">
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

							<motion.button
								className="absolute top-0 -right-16	"
								initial={{
									opacity: 0,
								}}
								animate={{
									opacity: 1,
									transition: {
										delay: 0.5,
									},
								}}
								exit={{
									opacity: 0,
								}}
								onClick={() => {
									setFlipped((prev) => !prev);
								}}
							>
								<div
									className={cn(
										"flex justify-center items-center h-8 w-8 rounded-full",
										"bg-[#fff] text-[#a69000] border border-solid border-[#fff] shadow-[0_3px_0_0_#ddd]",
										"active:translate-y-[2px] active:shadow-none",
									)}
								>
									<IconArrowRotateRightLeft className="size-5" />
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
								<AudioRecorder
									onRecordingComplete={(file) => setAudioFile(file)}
									className="h-16 w-[4.125rem]"
								/>
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

						{/* 音频播放器 */}
						{audioFile && (
							<motion.div
								className="mt-4"
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
								<AudioPlayer audioFile={audioFile} />
							</motion.div>
						)}
					</div>
				)}
			</AnimatePresence>
		</>
	);
}
