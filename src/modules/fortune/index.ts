import { bindThis } from '@/decorators.js';
import Module from '@/module.js';
import Message from '@/message.js';
import serifs from '@/serifs.js';
import seedrandom from 'seedrandom';
import { genItem } from '@/vocabulary.js';

export const blessing = [
	'아이쨩흉',
	'기가흉',
	'메가흉',
	'슈퍼흉',
	'대대흉',
	'대흉',
	'흉',
	'중흉',
	'소흉',
	'길',
	'대길',
];


export default class extends Module {
	public readonly name = 'fortune';

	@bindThis
	public install() {
		return {
			mentionHook: this.mentionHook
		};
	}

	@bindThis
	private async mentionHook(msg: Message) {
		if (msg.includes(['점', '점괘', '운세', '오미쿠지', '사주', '팔자'])) {
			const date = new Date();
			const seed = `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}@${msg.userId}`;
			const rng = seedrandom(seed);
			const omikuji = blessing[Math.floor(rng() * blessing.length)];
			const item = genItem(rng);
			msg.reply(`**${omikuji}🎉**\n럭키 아이템: ${item}`, {
				cw: serifs.fortune.cw(msg.friend.name)
			});
			return true;
		} else {
			return false;
		}
	}
}
