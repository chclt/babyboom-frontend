import { useCallback, useRef, useState } from "react";
import RecordRTC, { RecordRTCPromisesHandler } from "recordrtc";
import IconLoadingCircle from "../assets/IconLoadingCircle.tsx";
import IconMicrophone from "../assets/IconMicrophone.tsx";
import { cn } from "../libs/utils";

interface AudioRecorderProps {
	onRecordingComplete: (audioFile: File) => void;
	className?: string;
}

export default function AudioRecorder({
	onRecordingComplete,
	className,
}: AudioRecorderProps) {
	const [isRecording, setIsRecording] = useState(false);
	const [isProcessing, setIsProcessing] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const recorderRef = useRef<RecordRTCPromisesHandler | null>(null);
	const streamRef = useRef<MediaStream | null>(null);

	const startRecording = useCallback(async () => {
		try {
			setError(null);

			// 检查浏览器支持
			if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
				throw new Error("浏览器不支持录音功能");
			}

			const stream = await navigator.mediaDevices.getUserMedia({
				audio: {
					echoCancellation: true,
					noiseSuppression: true,
					autoGainControl: true,
				},
				video: false,
			});

			streamRef.current = stream;

			const recorder = new RecordRTCPromisesHandler(stream, {
				type: "audio",
				mimeType: "audio/webm",
				recorderType: RecordRTC.StereoAudioRecorder,
				numberOfAudioChannels: 1,
				desiredSampRate: 16000,
				timeSlice: 1000,
				disableLogs: false,
			});

			recorderRef.current = recorder;
			await recorder.startRecording();
			setIsRecording(true);
		} catch (error) {
			console.error("录音失败:", error);
			const errorMessage = error instanceof Error ? error.message : "录音失败";
			setError(errorMessage);

			// 清理资源
			if (streamRef.current) {
				streamRef.current.getTracks().forEach((track) => track.stop());
				streamRef.current = null;
			}
		}
	}, []);

	const stopRecording = useCallback(async () => {
		if (!recorderRef.current || !isRecording) return;

		setIsProcessing(true);
		setError(null);

		try {
			await recorderRef.current.stopRecording();
			const blob = await recorderRef.current.getBlob();

			// 检查录音是否有效
			if (blob.size === 0) {
				throw new Error("录音文件为空");
			}

			console.log("录音完成，文件大小:", blob.size, "bytes");

			// 根据 MIME 类型确定文件扩展名
			const mimeType = blob.type;
			const extension = mimeType.includes("webm")
				? "webm"
				: mimeType.includes("mp4")
					? "mp4"
					: mimeType.includes("ogg")
						? "ogg"
						: "wav";

			// 将录音转换为 File 对象
			const audioFile = new File(
				[blob],
				`recording_${Date.now()}.${extension}`,
				{
					type: mimeType,
				},
			);

			onRecordingComplete(audioFile);
		} catch (error) {
			console.error("停止录音失败:", error);
			const errorMessage =
				error instanceof Error ? error.message : "停止录音失败";
			setError(errorMessage);
		} finally {
			// 清理资源
			if (streamRef.current) {
				streamRef.current.getTracks().forEach((track) => track.stop());
				streamRef.current = null;
			}
			recorderRef.current = null;
			setIsRecording(false);
			setIsProcessing(false);
		}
	}, [isRecording, onRecordingComplete]);

	const handleClick = useCallback(() => {
		if (isRecording) {
			stopRecording();
		} else {
			startRecording();
		}
	}, [isRecording, startRecording, stopRecording]);

	return (
		<div className="flex flex-col items-center">
			<button
				onClick={handleClick}
				disabled={isProcessing}
				className={cn(
					"flex justify-center items-center h-16 w-[4.125rem] rounded-full border border-solid",
					isRecording
						? "bg-red-500 border-red-500 text-white shadow-[0_3px_0_0_#dc2626]"
						: "bg-[#1cb0f6] border-[#1cb0f6] text-white shadow-[0_3px_0_0_#1896d1]",
					"active:translate-y-[2px] active:shadow-none",
					"disabled:opacity-50 disabled:cursor-not-allowed",
					className,
				)}
			>
				{isProcessing ? (
					<IconLoadingCircle className="size-8" />
				) : isRecording ? (
					<div className="size-6 bg-white rounded-sm" />
				) : (
					<IconMicrophone className="size-8" />
				)}
			</button>

			{error && (
				<div className="text-red-500 text-xs mt-1 text-center max-w-[4.125rem]">
					{error}
				</div>
			)}
		</div>
	);
}
