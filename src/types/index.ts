export interface MemoryRecord {
	id: string;
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
	audioList: {
		url: string;
	}[];
	text?: string;
	title?: string;

	createTime: string;
}
