import autobind from 'autobind-decorator';
import Module from '@/module';
import Message from '@/message';
import serifs from '@/serifs';

const hands = [
	'๐',
	'๐',
	'๐',
	'๐',
	'โ',
	['๐ค', '๐ค'],
	['๐ค', '๐ค'],
	'๐ค',
	'โ',
	'๐ค',
	'๐ค',
	'๐',
	'๐',
	'๐',
	['๐', '๐'],
	['๐', '๐'],
	'๐',
	'๐',
	'โ',
	['โ', '๐ค'],
	'๐',
	'๐',
	'๐',
	'๐ค',
	'๐ช',
	['๐ช', 'โ'],
	'๐'
]

const faces = [
	'๐',
	'๐',
	'๐',
	'๐',
	'๐',
	'๐',
	'๐',
	'๐คฃ',
	'โบ๏ธ',
	'๐',
	'๐',
	'๐',
	'๐',
	'๐',
	'๐',
	'๐',
	'๐ฅฐ',
	'๐',
	'๐',
	'๐',
	'๐',
	'๐',
	'๐',
	'๐',
	'๐',
	'๐คช',
	'๐คจ',
	'๐ง',
	'๐ค',
	'๐',
	'๐คฉ',
	'๐ฅณ',
	'๐',
	'๐',
	'๐',
	'๐',
	'๐',
	'๐',
	'๐',
	'โน๏ธ',
	'๐ฃ',
	'๐',
	'๐ซ',
	'๐ฉ',
	'๐ฅบ',
	'๐ข',
	'๐ญ',
	'๐ค',
	'๐ ',
	'๐ก',
	'๐คฌ',
	'๐คฏ',
	'๐ณ',
	'๐ฑ',
	'๐จ',
	'๐ฐ',
	'๐ฅ',
	'๐',
	'๐ค',
	'๐ค',
	'๐คญ',
	'๐คซ',
	'๐คฅ',
	'๐ถ',
	'๐',
	'๐',
	'๐ฌ',
	'๐',
	'๐ฏ',
	'๐ฆ',
	'๐ง',
	'๐ฎ',
	'๐ฒ',
	'๐ด',
	'๐คค',
	'๐ช',
	'๐ต',
	'๐ค',
	'๐ฅด',
	'๐คข',
	'๐คฎ',
	'๐คง',
	'๐ท',
	'๐ค',
	'๐ค',
	'๐ค',
	'๐ค ',
	'๐ฟ',
	'๐ค',
	'๐ฝ'
]

export default class extends Module {
	public readonly name = 'emoji';

	@autobind
	public install() {
		return {
			mentionHook: this.mentionHook
		};
	}

	@autobind
	private async mentionHook(msg: Message) {
		if (msg.includes(['์ด๋ชจํฐ์ฝ', '์ด๋ชจ์ง', '์ค๋์์ฝ', '๊ฐ์ฐจ', '๊ฐ์ฑ ', 'emoji'])) {
			const hand = hands[Math.floor(Math.random() * hands.length)];
			const face = faces[Math.floor(Math.random() * faces.length)];
			const emoji = Array.isArray(hand) ? hand[0] + face + hand[1] : hand + face + hand;
			msg.reply(serifs.emoji.suggest(emoji));
			return true;
		} else {
			return false;
		}
	}
}
