import { bindThis } from '@/decorators.js';
import Module from '@/module.js';
import Message from '@/message.js';
import serifs from '@/serifs.js';
import { safeForInterpolate } from '@/utils/safe-for-interpolate.js';

const titles = ['님', '씨', '군', '당신', '쨩', '양', '선생님', '센세'];

export default class extends Module {
	public readonly name = 'core';

	@bindThis
	public install() {
		return {
			mentionHook: this.mentionHook,
			contextHook: this.contextHook
		};
	}

	@bindThis
	private async mentionHook(msg: Message) {
		if (!msg.text) return false;

		return (
			this.transferBegin(msg) ||
			this.transferEnd(msg) ||
			this.setName(msg) ||
			this.modules(msg) ||
			this.version(msg)
		);
	}

	@bindThis
	private transferBegin(msg: Message): boolean  {
		if (!msg.text) return false;
		if (!msg.includes(['인계', '이사', '계이'])) return false;

		// チャットのみ
		if (!msg.isChat) {
			msg.reply(serifs.core.transferNeedDm);
			return true;
		}

		const code = msg.friend.generateTransferCode();

		msg.reply(serifs.core.transferCode(code));

		return true;
	}

	@bindThis
	private transferEnd(msg: Message): boolean  {
		if (!msg.text) return false;
		if (!msg.text.startsWith('"') || !msg.text.endsWith('"')) return false;

		const code = msg.text.substring(1, msg.text.length - 1);

		const succ = msg.friend.transferMemory(code);

		if (succ) {
			msg.reply(serifs.core.transferDone(msg.friend.name));
		} else {
			msg.reply(serifs.core.transferFailed);
		}

		return true;
	}

	@bindThis
	private setName(msg: Message): boolean  {
		if (!msg.text) return false;
		if (!msg.includes(['고불러줘', '라불러줘', '로불러줘'])) return false;
		if (msg.text.startsWith('라고 불러줘')||msg.text.startsWith('라 불러줘')||msg.text.startsWith('로 불러줘')) return false;

		if (msg.friend.love < 5) {
			msg.reply(serifs.core.requireMoreLove);
			return true;
		}

		let nameExp = msg.extractedText.match(/\s*(.+?)((라((고 불러)|( 불러)))|(로 불러))(( 줘)|(줘))/);
		if (!nameExp) return false;
		let name: string = nameExp[1];
		if (name.endsWith('으')) name = name.substr(0, name.length - 1);
		else if (name.endsWith('이')) name = name.substr(0, name.length - 1);

		if (name.length > 10) {
			msg.reply(serifs.core.tooLong);
			return true;
		}

		if (!safeForInterpolate(name)) {
			msg.reply(serifs.core.invalidName);
			return true;
		}

		const withSan = titles.some(t => name.endsWith(t));

		if (withSan) {
			msg.friend.updateName(name);
			msg.reply(serifs.core.setNameOk(name));
		} else {
			msg.reply(serifs.core.san).then(reply => {
				this.subscribeReply(msg.userId, msg.isChat, msg.isChat ? msg.userId : reply.id, {
					name: name
				});
			});
		}

		return true;
	}

	@bindThis
	private modules(msg: Message): boolean  {
		if (!msg.text) return false;
		if (!msg.or(['modules'])) return false;

		let text = '```\n';

		for (const m of this.ai.modules) {
			text += `${m.name}\n`;
		}

		text += '```';

		msg.reply(text, {
			immediate: true
		});

		return true;
	}

	@bindThis
	private version(msg: Message): boolean  {
		if (!msg.text) return false;
		if (!msg.or(['v', 'version', '버전'])) return false;

		msg.reply(`\`\`\`\nv${this.ai.version}\n\`\`\``, {
			immediate: true
		});

		return true;
	}

	@bindThis
	private async contextHook(key: any, msg: Message, data: any) {
		if (msg.text == null) return;

		const done = () => {
			msg.reply(serifs.core.setNameOk(msg.friend.name));
			this.unsubscribeReply(key);
		};

		if (msg.text.includes('응')) {
			msg.friend.updateName(data.name + '님');
			done();
		} else if (msg.text.includes('아니')) {
			msg.friend.updateName(data.name);
			done();
		} else {
			msg.reply(serifs.core.yesOrNo).then(reply => {
				this.subscribeReply(msg.userId, msg.isChat, reply.id, data);
			});
		}
	}
}
