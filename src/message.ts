import { bindThis } from '@/decorators.js';
import chalk from 'chalk';

import 藍 from '@/ai.js';
import Friend from '@/friend.js';
import type { User } from '@/misskey/user.js';
import includes from '@/utils/includes.js';
import or from '@/utils/or.js';
import config from '@/config.js';
import { sleep } from '@/utils/sleep.js';

export default class Message {
	private ai: 藍;
	private messageOrNote: any;
	public isDm: boolean;

	public get id(): string {
		return this.messageOrNote.id;
	}

	public get user(): User {
		return this.messageOrNote.user;
	}

	public get userId(): string {
		return this.messageOrNote.userId;
	}

	public get text(): string {
		return this.messageOrNote.text;
	}

	public get quoteId(): string | null {
		return this.messageOrNote.renoteId;
	}

	public get visibility(): string {
		return this.messageOrNote.visibility;
	}

	/**
	 * メンション部分を除いたテキスト本文
	 */
	public get extractedText(): string {
		const host = new URL(config.host).host.replace(/\./g, '\\.');
		return this.text
			.replace(new RegExp(`^@${this.ai.account.username}@${host}\\s`, 'i'), '')
			.replace(new RegExp(`^@${this.ai.account.username}\\s`, 'i'), '')
			.trim();
	}

	public get replyId(): string {
		return this.messageOrNote.replyId;
	}

	public friend: Friend;

	constructor(ai: 藍, messageOrNote: any, isDm: boolean) {
		this.ai = ai;
		this.messageOrNote = messageOrNote;
		this.isDm = isDm;

		this.friend = new Friend(ai, { user: this.user });

		// メッセージなどに付いているユーザー情報は省略されている場合があるので完全なユーザー情報を持ってくる
		this.ai.api('users/show', {
			userId: this.userId
		}).then(user => {
			this.friend.updateUser(user);
		});
	}

	@bindThis
	public async reply(text: string | null, opts?: {
		file?: any;
		cw?: string;
		renote?: string;
		immediate?: boolean;
	}) {
		if (text == null) return;

		this.ai.log(`>>> Sending reply to ${chalk.underline(this.id)}`);

		if (!opts?.immediate) {
			await sleep(2000);
		}

		if (this.isDm) {
			return await this.ai.sendMessage(this.messageOrNote.userId, {
				text: text,
				fileId: opts?.file?.id
			});
		} else {
			return await this.ai.post({
				visibility: this.messageOrNote.visibility,
				replyId: this.messageOrNote.id,
				text: text,
				fileIds: opts?.file ? [opts?.file.id] : undefined,
				cw: opts?.cw,
				renoteId: opts?.renote
			});
		}
	}

	@bindThis
	public includes(words: string[]): boolean {
		return includes(this.text.replace(/\s/g,''), words);
	}

	@bindThis
	public or(words: (string | RegExp)[]): boolean {
		return or(this.text, words);
	}

	public is(words: (string | RegExp)[]): boolean
	{
		for(let word of words)
		{
			if(typeof word === 'object')
			{
				if(word.test(this.text)) return true;
			}
			else if(word === this.text) return true;
		}
		return false;
	}
}
