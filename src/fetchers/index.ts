import type {
	DefaultError,
	DefinedInitialDataOptions,
	UseMutationOptions,
	UseQueryOptions,
} from "@tanstack/react-query";
import { z } from "zod";
import { _mock } from "../_mock";
import request from "../libs/request.ts";
import type { MemoryRecord } from "../types";

const MemoryRecordListRequestSchema = z.object({});
const MemoryRecordListResponseSchema = z.object({
	data: z.array(z.custom<MemoryRecord>()),
});
type MemoryRecordListResponse = z.infer<typeof MemoryRecordListResponseSchema>;

export function getMemoryRecordListQueryOptions(): DefinedInitialDataOptions<
	MemoryRecord[]
> {
	return {
		queryKey: ["MemoryRecordList"],
		queryFn: () =>
			request.post("/log/list", { date: null }).then((res) => {
				return res.data.data;
			}),
		initialData: [],
	};
}

const CreateMemoryRecordRequestSchema = z.object({
	imageList: z.array(z.string()),
	audioList: z.array(z.string()),
	title: z.string().optional(),
	text: z.string().optional(),
});
type CreateMemoryRecordRequest = z.infer<
	typeof CreateMemoryRecordRequestSchema
>;
export function getCreateMemoryRecordMutationOptions(): UseMutationOptions<
	unknown,
	DefaultError,
	CreateMemoryRecordRequest
> {
	return {
		mutationKey: ["CreateMemoryRecord"],
		mutationFn: ({
			imageList,
			text,
			title,
			audioList,
		}: CreateMemoryRecordRequest) =>
			request.post("/log", { imageList, text, title, audioList }),
	};
}

const UploadFileRequestSchema = z.object({
	fileType: z.enum(["image", "audio"]),
	file: z.instanceof(File),
});
type UploadFileRequest = z.infer<typeof UploadFileRequestSchema>;

export function getUploadFileMutationOptions(): UseMutationOptions<
	string,
	DefaultError,
	UploadFileRequest
> {
	return {
		mutationKey: ["UploadFile"],
		mutationFn: ({ fileType, file }: UploadFileRequest) => {
			const formData = new FormData();
			formData.append("fileType", fileType);
			formData.append("file", file);

			return request
				.post<{ data: string }>("/log/file", formData)
				.then((res) => res.data.data);
		},
	};
}

const LogBoomResponseSchema = z.object({
	log: z.custom<MemoryRecord>(),
	usedImage: z.string(),
	description: z.string(),
});

type LogBoomResponse = z.infer<typeof LogBoomResponseSchema>;

export function getLogBoomQueryOptions(): UseQueryOptions<LogBoomResponse> {
	return {
		queryKey: ["LogBoom"],
		queryFn: () =>
			request
				.get<{ data: LogBoomResponse }>("/log/boom")
				.then((res) => res.data.data),
		refetchOnWindowFocus: false,
	};
}
