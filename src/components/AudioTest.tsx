import { useState } from "react";
import AudioRecorder from "./AudioRecorder";
import SimpleAudioPlayer from "./SimpleAudioPlayer";

export default function AudioTest() {
	const [audioFile, setAudioFile] = useState<File | null>(null);

	const handleRecordingComplete = (file: File) => {
		console.log("录音完成:", file);
		console.log("文件类型:", file.type);
		console.log("文件大小:", file.size);
		setAudioFile(file);
	};

	return (
		<div className="p-8 max-w-md mx-auto">
			<h2 className="text-2xl font-bold mb-6">音频测试</h2>

			<div className="space-y-6">
				<div>
					<h3 className="text-lg font-semibold mb-3">录音功能</h3>
					<AudioRecorder onRecordingComplete={handleRecordingComplete} />
				</div>

				{audioFile && (
					<div>
						<h3 className="text-lg font-semibold mb-3">播放功能</h3>
						<SimpleAudioPlayer audioFile={audioFile} />
					</div>
				)}

				<div className="bg-gray-100 p-4 rounded-lg">
					<h3 className="text-lg font-semibold mb-2">调试信息</h3>
					<div className="text-sm space-y-1">
						<div>浏览器: {navigator.userAgent}</div>
						<div>
							支持 getUserMedia: {!!navigator.mediaDevices?.getUserMedia}
						</div>
						<div>支持 MediaRecorder: {!!window.MediaRecorder}</div>
						{audioFile && (
							<>
								<div>文件类型: {audioFile.type}</div>
								<div>文件大小: {audioFile.size} bytes</div>
								<div>文件名: {audioFile.name}</div>
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
