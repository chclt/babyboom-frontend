import { useState, useRef, useEffect } from "react";

interface SimpleAudioPlayerProps {
	audioFile: File;
	className?: string;
}

export default function SimpleAudioPlayer({
	audioFile,
	className,
}: SimpleAudioPlayerProps) {
	const [error, setError] = useState<string | null>(null);
	const audioRef = useRef<HTMLAudioElement>(null);

	// 创建音频 URL
	const audioUrl = URL.createObjectURL(audioFile);

	// 清理 URL 对象
	useEffect(() => {
		return () => {
			URL.revokeObjectURL(audioUrl);
		};
	}, [audioUrl]);

	const handleError = () => {
		setError("音频文件无法加载");
	};

	const handleCanPlay = () => {
		setError(null);
	};

	return (
		<div className={`p-4 border rounded-lg ${className || ""}`}>
			<audio
				ref={audioRef}
				src={audioUrl}
				onError={handleError}
				onCanPlay={handleCanPlay}
				controls
			/>

			{error && <div className="text-red-500 text-sm mt-2">⚠️ {error}</div>}

			<div className="text-xs text-gray-500 mt-2">
				{audioFile.name} ({Math.round(audioFile.size / 1024)}KB)
			</div>
		</div>
	);
}
