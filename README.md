<h1><p align="center"><img src="./ai.svg" alt="藍" height="200"></p></h1>
<p align="center">An Ai for Misskey. <a href="./torisetu.md">사용법</a></p>

## 이것에 대한 설명
미스키용 한국어 봇 입니다! [봇 사용법](https://gitlab.com/chocological00/aibot-korean/blob/master/torisetu.md)

## 인스톨
> Node.js와 npm과 MeCab (옵션)[^1]이 인스톨 되어있어야 합니다.

[^1]: 식자주) MeCab은 일본어 형태소 분석기 같은걸로 보이는데요, 한국어는 지원되지 않아요 ;ㅅ;

먼저 적당한 디렉토리에 `git clone`을 합니다.
그리고 그 디렉토리에 `config.json`을 작성합니다. 내용은 다음과 같이 합니다:
``` json
{
	"host": "https:// + 당신의 인스턴스 URL (맨 뒤의 /는 제외)",
	"i": "아이쨩을 가동하고 싶은 어카운트의 API키",
	"keywordEnabled": "키워드를 기억하는 기능을 (MeCab 필요) 활성화 할 경우에는 true (아니라면 false)",
	"chartEnabled": "차트 기능을 활성화 하지 않을 때에는 false",
	"reversiEnabled": "아이쨩과 리버시에서 대전할 수 있는 기능을 활성화 하고 싶은 경우에 true (아니라면 false)",
	"serverMonitoring": "서버 감시 기능 활성화는 true (아니라면 false)",
	"mecab": "MeCab의 인스톨 경로 (소스에서 인스톨 하였을 경우, 보통 /usr/local/bin/mecab)"
}
```
`npm install`하고 `npm run build`하고 `npm start`하면 기동 가능합니다.

## 폰트
일부 기능에는 폰트가 필요합니다. 아이쨩에는 폰트가 포함되어 있지 않으므로 직접 폰트를 인스톨 디렉토리에 `font.ttf`라는 파일명으로 설치해주세요.

## 기억
아이쨩은 기억의 보존에 인메모리 데이터베이스를 사용하고 있으며, 아이쨩의 인스톨 디렉토리에 `memory.json`이라는 이름으로 영속화됩니다.

## 한국어 번역
- 역: [@narve@madost.one](https://madost.one/@narve)
- 식/가벼운 커스텀: [@chocologic@madost.one](https://madost.one/@chocologic)

## 라이센스
MIT. Originally developed by [Syuilo](https://github.com/syuilo/ai).

## Awards
<img src="./WorksOnMyMachine.png" alt="Works on my machine" height="120">
