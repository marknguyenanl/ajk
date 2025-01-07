// Interface

export interface TaskProps {
	id?: string;
	title?: string;
	description?: string;
	parentId?: string;
	phase?: string;
	layer?: string;
	context?: string;
	time?: string;
	energy?: string;
	sequence?: number;
	createdAt?: string;
	updatedAt?: string;
	isCompleted?: boolean;
	isCalendar?: boolean;
}

export interface TasksProps {
	items: TaskProps[];
}
