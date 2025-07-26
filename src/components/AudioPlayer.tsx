import { useState, useRef, useEffect } from "react";
import { cn } from "../libs/utils";

interface AudioPlayerProps {
	audioFile: File;
	className?: string;
}

export default function AudioPlayer({
	audioFile,
	className,
}: AudioPlayerProps) {
	const [isPlaying, setIsPlaying] = useState(false);
	const [duration, setDuration] = useState(0);
	const [currentTime, setCurrentTime] = useState(0);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const audioRef = useRef<HTMLAudioElement>(null);

	// 当音频文件改变时重置状态
	useEffect(() => {
		setIsLoading(true);
		setError(null);
		setIsPlaying(false);
		setCurrentTime(0);
		setDuration(0);
	}, [audioFile]);

	const handleLoadedMetadata = () => {
		if (audioRef.current) {
			setDuration(audioRef.current.duration);
			setIsLoading(false);
		}
	};

	const handleTimeUpdate = () => {
		if (audioRef.current) {
			setCurrentTime(audioRef.current.currentTime);
		}
	};

	const handlePlayPause = async () => {
		if (!audioRef.current) return;

		try {
			if (isPlaying) {
				audioRef.current.pause();
				setIsPlaying(false);
			} else {
				// 尝试播放
				await audioRef.current.play();
				setIsPlaying(true);
			}
		} catch (err) {
			console.error("播放失败:", err);
			setError("播放失败，请检查音频文件");
			setIsPlaying(false);
		}
	};

	const handleEnded = () => {
		setIsPlaying(false);
		setCurrentTime(0);
	};

	const handleError = (e: React.SyntheticEvent<HTMLAudioElement, Event>) => {
		console.error("音频加载错误:", e);
		setError("音频文件无法加载");
		setIsLoading(false);
	};

	const formatTime = (time: number) => {
		if (isNaN(time)) return "0:00";
		const minutes = Math.floor(time / 60);
		const seconds = Math.floor(time % 60);
		return `${minutes}:${seconds.toString().padStart(2, "0")}`;
	};

	const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newTime = parseFloat(e.target.value);
		if (audioRef.current && !isNaN(newTime)) {
			audioRef.current.currentTime = newTime;
			setCurrentTime(newTime);
		}
	};

	// 创建音频 URL
	const audioUrl = URL.createObjectURL(audioFile);

	// 清理 URL 对象
	useEffect(() => {
		return () => {
			URL.revokeObjectURL(audioUrl);
		};
	}, [audioUrl]);

	return (
		<div
			className={cn("flex flex-col gap-2 p-3 bg-gray-50 rounded-lg", className)}
		>
			<audio
				ref={audioRef}
				src={audioUrl}
				onLoadedMetadata={handleLoadedMetadata}
				onTimeUpdate={handleTimeUpdate}
				onEnded={handleEnded}
				onError={handleError}
				preload="metadata"
			/>

			{error && <div className="text-red-500 text-sm mb-2">⚠️ {error}</div>}

			<div className="flex items-center gap-3">
				<button
					onClick={handlePlayPause}
					disabled={isLoading || !!error}
					className={cn(
						"flex justify-center items-center w-10 h-10 rounded-full text-white",
						isLoading || error
							? "bg-gray-400 cursor-not-allowed"
							: "bg-blue-500 hover:bg-blue-600",
					)}
				>
					{isLoading ? (
						<div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
					) : isPlaying ? (
						<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
							<path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
						</svg>
					) : (
						<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
							<path d="M8 5v14l11-7z" />
						</svg>
					)}
				</button>

				<div className="flex-1">
					<input
						type="range"
						min="0"
						max={duration || 0}
						value={currentTime}
						onChange={handleSeek}
						disabled={isLoading || !!error}
						className={cn(
							"w-full h-2 rounded-lg appearance-none cursor-pointer slider",
							isLoading || error
								? "bg-gray-300 cursor-not-allowed"
								: "bg-gray-200",
						)}
					/>
				</div>

				<div className="text-sm text-gray-600 min-w-[60px] text-right">
					{formatTime(currentTime)} / {formatTime(duration)}
				</div>
			</div>

			<div className="text-xs text-gray-500">
				{audioFile.name} ({Math.round(audioFile.size / 1024)}KB)
			</div>
		</div>
	);
}
