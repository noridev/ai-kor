import autobind from 'autobind-decorator';
import { HandlerResult } from '../../ai';
import Module from '../../module';
import Message from '../../message';
import serifs, { getSerif } from '../../serifs';
import getDate from '../../utils/get-date';

const titles = ['님', '씨', '군', '당신', '쨩', '양', '선생님', '센세'];

const invalidChars = ['@', '#', '*', ':', '(', '[', '　'];

export default class extends Module {
	public readonly name = 'core';

	@autobind
	public install() {
		return {
			mentionHook: this.mentionHook,
			contextHook: this.contextHook
		};
	}

	@autobind
	private async mentionHook(msg: Message) {
		if (!msg.text) return false;

		return (
			this.setName(msg) ||
			this.greet(msg) ||
			this.erait(msg) ||
			this.omedeto(msg) ||
			this.nadenade(msg) ||
			this.kawaii(msg) ||
			this.suki(msg) ||
			this.hug(msg) ||
			this.humu(msg) ||
			this.batou(msg) ||
			this.itai(msg) ||
			this.ote(msg) ||
			this.ponkotu(msg) ||
			this.rmrf(msg) ||
			this.shutdown(msg)
		);
	}

	@autobind
	private setName(msg: Message): boolean  {
		if (!msg.text) return false;
		if (!msg.includes(['고불러줘', '라불러줘', '로불러줘'])) return false;
		if (msg.text.startsWith('라고 불러줘')||msg.text.startsWith('라 불러줘')||msg.text.startsWith('로 불러줘')) return false;

		// メッセージのみ
		if (!msg.isDm) return true;

		if (msg.friend.love < 5) {
			msg.reply(serifs.core.requireMoreLove);
			return true;
		}

		let name = msg.text.match(/^(.+?)((라((고 불러)|( 불러)))|(로 불러))(( 줘)|(줘))/)[1];
		if(name.endsWith('으')) name = name.substr(0, name.length - 1);
		else if(name.endsWith('이')) name = name.substr(0, name.length - 1);

		if (name.length > 10) {
			msg.reply(serifs.core.tooLong);
			return true;
		}

		if (invalidChars.some(c => name.includes(c))) {
			msg.reply(serifs.core.invalidName);
			return true;
		}

		const withSan = titles.some(t => name.endsWith(t));

		if (withSan) {
			msg.friend.updateName(name);
			msg.reply(serifs.core.setNameOk(name));
		} else {
			msg.reply(serifs.core.san).then(reply => {
				this.subscribeReply(msg.userId, msg.isDm, msg.isDm ? msg.userId : reply.id, {
					name: name
				});
			});
		}

		return true;
	}

	@autobind
	private greet(msg: Message): boolean {
		if (msg.text == null) return false;

		const incLove = () => {
			//#region 1日に1回だけ親愛度を上げる
			const today = getDate();

			const data = msg.friend.getPerModulesData(this);

			if (data.lastGreetedAt == today) return;

			data.lastGreetedAt = today;
			msg.friend.setPerModulesData(this, data);

			msg.friend.incLove();
			//#endregion
		};

		// 末尾のエクスクラメーションマーク
		const tension = (msg.text.match(/[！!]{2,}/g) || [''])
			.sort((a, b) => a.length < b.length ? 1 : -1)[0]
			.substr(1);

		if (msg.includes(['안녕', '안뇽', '하이'])) {
			msg.reply(serifs.core.hello(msg.friend.name));
			incLove();
			return true;
		}

		if (msg.includes(['좋은밤', '좋은저녁'])) {
			msg.reply(serifs.core.helloNight(msg.friend.name));
			incLove();
			return true;
		}

		if (msg.includes(['좋은아침', '쫀아', '모닝', '모우닝', '몬잉', '모운잉'])) {
			msg.reply(serifs.core.goodMorning(tension, msg.friend.name));
			incLove();
			return true;
		}

		if (msg.includes(['꿈꾸', '쫀밤', '좋은밤', '오야스미', '잘자', '주무세요', '굿나잇', '굿나잇'])) {
			msg.reply(serifs.core.goodNight(msg.friend.name));
			incLove();
			return true;
		}

		if (msg.includes(['다녀', '갔다올'])) {
			msg.reply(
				msg.friend.love >= 7
					? serifs.core.itterassyai.love(msg.friend.name)
					: serifs.core.itterassyai.normal(msg.friend.name));
			incLove();
			return true;
		}

		if (msg.includes(['다녀왔', '갔다왔', '집왔', '집옴', '갔다옴'])) {
			msg.reply(
				msg.friend.love >= 15 ? serifs.core.okaeri.love2(msg.friend.name) :
				msg.friend.love >= 7 ? getSerif(serifs.core.okaeri.love(msg.friend.name)) :
				serifs.core.okaeri.normal(msg.friend.name));
			incLove();
			return true;
		}

		return false;
	}

	@autobind
	private erait(msg: Message): boolean {
		const match = msg.extractedText.match(/(.+?)(했으니까(( 칭찬해)|(칭찬해)))/);
		if (match) {
			msg.reply(getSerif(serifs.core.erait.specify(match[1], msg.friend.name)));
			return true;
		}

		const match2 = msg.extractedText.match(/(.+?)할((거)|(꺼)|( 거)|( 꺼))(니까(( 칭찬해)|(칭찬해)))/);
		if (match2) {
			msg.reply(getSerif(serifs.core.erait.specify(match2[1], msg.friend.name)));
			return true;
		}

		if (!msg.includes(['칭찬해'])) return false;

		msg.reply(getSerif(serifs.core.erait.general(msg.friend.name)));

		return true;
	}

	@autobind
	private omedeto(msg: Message): boolean {
		if (!msg.includes(['축하해'])) return false;

		msg.reply(serifs.core.omedeto(msg.friend.name));

		return true;
	}

	@autobind
	private nadenade(msg: Message): boolean {
		if (!msg.includes(['쓰담쓰담'])) return false;

		// メッセージのみ
		if (!msg.isDm) return true;

		//#region 1日に1回だけ親愛度を上げる(嫌われてない場合のみ)
		if (msg.friend.love >= 0) {
			const today = getDate();

			const data = msg.friend.getPerModulesData(this);

			if (data.lastNadenadeAt != today) {
				data.lastNadenadeAt = today;
				msg.friend.setPerModulesData(this, data);

				msg.friend.incLove();
			}
		}
		//#endregion

		msg.reply(getSerif(
			msg.friend.love >= 10 ? serifs.core.nadenade.love3 :
			msg.friend.love >= 5 ? serifs.core.nadenade.love2 :
			msg.friend.love <= -15 ? serifs.core.nadenade.hate4 :
			msg.friend.love <= -10 ? serifs.core.nadenade.hate3 :
			msg.friend.love <= -5 ? serifs.core.nadenade.hate2 :
			msg.friend.love <= -1 ? serifs.core.nadenade.hate1 :
			serifs.core.nadenade.normal
		));

		return true;
	}

	@autobind
	private kawaii(msg: Message): boolean {
		if (!msg.includes(['귀여워', '기여어'])) return false;

		// メッセージのみ
		if (!msg.isDm) return true;

		msg.reply(getSerif(
			msg.friend.love >= 5 ? serifs.core.kawaii.love :
			msg.friend.love <= -3 ? serifs.core.kawaii.hate :
			serifs.core.kawaii.normal));

		return true;
	}

	@autobind
	private suki(msg: Message): boolean {
		if (!msg.or(['좋아해'])) return false;

		// メッセージのみ
		if (!msg.isDm) return true;

		msg.reply(
			msg.friend.love >= 5 ? (msg.friend.name ? serifs.core.suki.love(msg.friend.name) : serifs.core.suki.normal) :
			msg.friend.love <= -3 ? serifs.core.suki.hate :
			serifs.core.suki.normal);

		return true;
	}

	@autobind
	private hug(msg: Message): boolean {
		if (!msg.or(['규', '무규', /^(안아줘)?$/])) return false;

		// メッセージのみ
		if (!msg.isDm) return true;

		//#region 前のハグから1分経ってない場合は返信しない
		// これは、「ハグ」と言って「ぎゅー」と返信したとき、相手が
		// それに対してさらに「ぎゅー」と返信するケースがあったため。
		// そうするとその「ぎゅー」に対してもマッチするため、また
		// 藍がそれに返信してしまうことになり、少し不自然になる。
		// これを防ぐために前にハグしてから少し時間が経っていないと
		// 返信しないようにする
		const now = Date.now();

		const data = msg.friend.getPerModulesData(this);

		if (data.lastHuggedAt != null) {
			if (now - data.lastHuggedAt < (1000 * 60)) return true;
		}

		data.lastHuggedAt = now;
		msg.friend.setPerModulesData(this, data);
		//#endregion

		msg.reply(
			msg.friend.love >= 5 ? serifs.core.hug.love :
			msg.friend.love <= -3 ? serifs.core.hug.hate :
			serifs.core.hug.normal);

		return true;
	}

	@autobind
	private humu(msg: Message): boolean {
		if (!msg.includes(['밟아줘'])) return false;

		// メッセージのみ
		if (!msg.isDm) return true;

		msg.reply(
			msg.friend.love >= 5 ? serifs.core.humu.love :
			msg.friend.love <= -3 ? serifs.core.humu.hate :
			serifs.core.humu.normal);

		return true;
	}

	@autobind
	private batou(msg: Message): boolean {
		if (!msg.includes(['매도해줘', '욕해줘'])) return false;

		// メッセージのみ
		if (!msg.isDm) return true;

		msg.reply(
			msg.friend.love >= 5 ? serifs.core.batou.love :
			msg.friend.love <= -5 ? serifs.core.batou.hate :
			serifs.core.batou.normal);

		return true;
	}

	@autobind
	private itai(msg: Message): boolean {
		if (!msg.or(['아파'])) return false;

		// メッセージのみ
		if (!msg.isDm) return true;

		msg.reply(serifs.core.itai(msg.friend.name));

		return true;
	}

	@autobind
	private ote(msg: Message): boolean {
		if (!msg.is(['손'])) return false;

		// メッセージのみ
		if (!msg.isDm) return true;

		msg.reply(
			msg.friend.love >= 10 ? serifs.core.ote.love2 :
			msg.friend.love >= 5 ? serifs.core.ote.love1 :
			serifs.core.ote.normal);

		return true;
	}

	@autobind
	private ponkotu(msg: Message): boolean | HandlerResult {
		if (!msg.includes(['바보'])) return false;

		msg.friend.decLove();

		return {
			reaction: 'angry'
		};
	}

	@autobind
	private rmrf(msg: Message): boolean | HandlerResult {
		if (!msg.includes(['rm-rf'])) return false;

		msg.friend.decLove();

		return {
			reaction: 'angry'
		};
	}

	@autobind
	private shutdown(msg: Message): boolean | HandlerResult {
		if (!msg.includes(['shutdown'])) return false;

		msg.reply(serifs.core.shutdown);

		return {
			reaction: 'confused'
		};
	}

	@autobind
	private async contextHook(msg: Message, data: any) {
		if (msg.text == null) return;

		const done = () => {
			msg.reply(serifs.core.setNameOk(msg.friend.name));
			this.unsubscribeReply(msg.userId);
		};

		if (msg.text.includes('응')) {
			msg.friend.updateName(data.name + '님');
			done();
		} else if (msg.text.includes('아니')) {
			msg.friend.updateName(data.name);
			done();
		} else {
			msg.reply(serifs.core.yesOrNo).then(reply => {
				this.subscribeReply(msg.userId, msg.isDm, reply.id, data);
			});
		}
	}
}
