import type {DefinedInitialDataOptions, UseQueryOptions} from "@tanstack/react-query";
import {z} from "zod";
import type {MemoryRecord} from "../types";
import {_mock} from "../_mock";

const MemoryRecordListRequestSchema = z.object({})
const MemoryRecordListResponseSchema = z.object({
  data: z.array(z.custom<MemoryRecord>())
})
type MemoryRecordListResponse = z.infer<typeof MemoryRecordListResponseSchema>

export function getMemoryRecordListQueryOptions(): DefinedInitialDataOptions<MemoryRecord[]> {
  return {
    queryKey: ['MemoryRecordList'],
    queryFn: () => _mock.memoryRecordList,
    initialData: []
  }
}