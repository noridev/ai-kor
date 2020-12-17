export type Note = {
	id: string;
	text: string | null;
	reply: any | null;
	poll?: {
		choices: {
			votes: number;
			text: string;
		}[];
		expiredAfter: number;
		multiple: boolean;
	} | null;
	user: User;
};

type User = {
	id: string;
	name: string;
	username: string;
	host: string | null;
}