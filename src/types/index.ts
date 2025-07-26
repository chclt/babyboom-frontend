export interface MemoryRecord {
	image?: string;
	imageList: {
		analysis?: string;
		createTime?: string;
		id?: string;
		isDeleted?: number;
		logId?: string;
		updateTime?: string;
		url?: string;
		userId?: string;
	}[];
	audio?: string;
	text?: string;

	createAt: string;
}
