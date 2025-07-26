import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { getLogBoomQueryOptions } from "../fetchers/index.ts";
import Polaraid from "../components/Polaraid.tsx";
import { cn } from "../libs/utils.ts";
import queryClient from "../libs/queryClient.ts";

export const Route = createFileRoute("/boom")({
	component: PageComponent,
});

function PageComponent() {
	const { data, isFetching } = useQuery(getLogBoomQueryOptions());

	return (
		<>
			{data && (
				<div className="p-8 flex flex-col gap-6">
					<Polaraid
						image={data.log.imageList?.[0]?.url ?? ""}
						audio={data.log.audioList?.[0]?.url ?? ""}
						title={data.log.title}
						text={data.description}
						className="w-full"
					/>

					<p>{data.description}</p>
				</div>
			)}
			<div className="fixed bottom-20 right-8 flex justify-end">
				<button
					className={cn(
						"flex justify-center items-center h-16 px-6 rounded-full border border-solid",
						"bg-[#2ec748] text-white border border-solid border-[#2ec748] shadow-[0_3px_0_0_#27aa3d]",
						"active:translate-y-[2px] active:shadow-none",
					)}
					onClick={() => {
						queryClient.invalidateQueries({
							queryKey: getLogBoomQueryOptions().queryKey,
						});
					}}
				>
					{isFetching ? "正在抽取回忆" : "换一张"}
				</button>
			</div>
		</>
	);
}
