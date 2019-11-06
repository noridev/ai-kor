import autobind from 'autobind-decorator';
import Module from '../../module';
import Message from '../../message';
import serifs from '../../serifs';
import * as seedrandom from 'seedrandom';
import { blessing, itemPrefixes, items } from './vocabulary';

export default class extends Module {
	public readonly name = 'fortune';

	@autobind
	public install() {
		return {
			mentionHook: this.mentionHook
		};
	}

	@autobind
	private async mentionHook(msg: Message) {
		if (msg.includes(['점', '점괘', '운세', '오미쿠지', '사주', '팔자'])) {
			const date = new Date();
			const seed = `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}@${msg.userId}`;
			const rng = seedrandom(seed);
			const omikuji = blessing[Math.floor(rng() * blessing.length)];
			const itemPrefix = Math.floor(rng() * 5) != 0 ? itemPrefixes[Math.floor(rng() * itemPrefixes.length)] : '';
			const item = items[Math.floor(rng() * items.length)];
			msg.reply(`**${omikuji}🎉**\n럭키 아이템: ${itemPrefix} ${item}`, serifs.fortune.cw(msg.friend.name));
			return true;
		} else {
			return false;
		}
	}
}
