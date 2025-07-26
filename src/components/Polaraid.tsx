import { useElementSize } from "@mantine/hooks";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "../libs/utils";
import { useState } from "react";
import IconImages1 from "../assets/IconImages1";
import IconVoice1 from "../assets/IconVoice1";

interface PolaraidProps {
	image: string;
	title?: string;
	text?: string;
	audio?: string;

	className?: string;
	onClick?: () => void;
}

export default function Polaraid({
	image,
	title,
	text,
	audio,

	className,
	...props
}: PolaraidProps) {
	const { ref, width, height } = useElementSize();

	return (
		<motion.div
			ref={ref}
			className={cn(
				"w-72 aspect-[5/6] flex flex-col p-[6.33333%] bg-white shadow-xl rounded-[3px]",
				className,
			)}
			style={{
				transformStyle: "preserve-3d",
				boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.1)",
				fontSize: `calc(${width}px / 13)`,
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
			{...props}
		>
			<div
				className="w-full pb-[104%] rounded-xs relative"
				style={{
					background: `center / cover no-repeat url(${image}), #dedede`,
				}}
			>
				{audio && (
					<div className="absolute p-1 right-2 bottom-2 flex items-center justify-center text-black/75 bg-white/50 rounded-full">
						<IconVoice1 className="w-4 h-4" />
					</div>
				)}
			</div>
			<div className="w-full pb-[20%] relative">
				<div
					className={
						"absolute left-0 right-0 top-[20%] bottom-[-20%] flex items-center justify-center"
					}
				>
					<div className="text-center text-gray-700">{title}</div>
				</div>
			</div>
		</motion.div>
	);
}
