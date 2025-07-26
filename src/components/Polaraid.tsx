import { useElementSize } from "@mantine/hooks";
import { motion } from "motion/react";
import { cn } from "../libs/utils";

interface PolaraidProps {
	image: string;
	title?: string;
	text?: string;

	className: string;
}

export default function Polaraid({
	image,
	title,
	text,
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
				className="w-full pb-[104%] rounded-xs"
				style={{
					background: `center / cover no-repeat url(${image}), #dedede`,
				}}
			/>
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
