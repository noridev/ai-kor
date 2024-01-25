<h1><p align="center"><img src="./ai.svg" alt="藍" height="200"></p></h1>
<p align="center">An Ai for CherryPick. <a href="./torisetu.md">사용법</a></p>

## 이것에 대한 설명
CherryPick용 한국어 봇 입니다! [봇 사용법](./torisetu.md)

## 설치
> Node.js와 npm과 MeCab (옵션)[^1]이 설치되어 있어야 합니다.

[^1]: 식자주) [MeCab](https://github.com/taku910/mecab)은 일본어 형태소 분석기입니다. 키워드 기억 기능에 쓰이지만, 일본어의 요미가나를 기억하는 기능이라 한국어에서는 별 의미가 없습니다.

먼저, 적당한 디렉토리에 `git clone` 합니다.
그리고 그 디렉토리에 `config.json`을 작성합니다[^2]. 내용은 다음과 같이 합니다:

[^2]: true/false의 경우 `"` **없이** 넣어주세요!

``` json
{
	"host": "https:// + 당신의 인스턴스 URL (맨 뒤의 /는 제외)",
	"i": "아이쨩을 가동하고 싶은 어카운트의 API 키",
	"master": "관리자의 사용자명 (옵션)",
	"notingEnabled": "랜덤으로 노트를 작성하는 기능을 비활성화 하려면 false 를 입력",
	"keywordEnabled": "키워드를 기억하는 기능을 (MeCab 필요 / 한글판에서는 미지원) 활성화 하려면 true 를 입력 (비활성화는 false)",
	"chartEnabled": "차트 기능을 비활성화 하려면 false 를 입력해 주세요",
	"reversiEnabled": "아이쨩과 리버시에서 대전할 수 있는 기능을 활성화 하려면 true 를 입력 (비활성화는 false)",
	"serverMonitoring": "서버 모니터링 기능을 활성화 하려면 true 를 입력 (비활성화는 false)",
	"checkEmojisEnabled": "커스텀 이모지 확인 기능을 활성화 하려면 true 를 입력 (아니라면 false)",
	"checkEmojisAtOnce": "커스텀 이모지 확인 기능으로 게시물을 정리하려면 true 를 입력 (정리하지 않으려면 false)",
	"mecab": "MeCab의 설치 경로 (소스로 설치한 경우, 보통 /usr/local/bin/mecab)",
	"mecabDic": "MeCab 사전 파일 경로 (옵션)",
	"memoryDir": "memory.json의 경로 (옵션, 기본값은 '.'(리포지토리 루트입니다))"
}
```
<!-- `npm install`하고 `npm run build`하고 `npm start`하면 기동 가능합니다. -->
`yarn install`하고 `yarn build`하고 `yarn start`하면 기동 가능합니다.

## Docker로 사용
먼저, 적당한 디렉토리에 `git clone` 합니다.
그리고 그 디렉토리에 `config.json`을 작성합니다. 내용은 다음과 같이 합니다:
(MeCab 설정, memoryDir 부분은 변경하지 마십시오)
``` json
{
	"host": "https:// + 당신의 인스턴스 URL (맨 뒤의 /는 제외)",
	"i": "아이쨩을 가동하고 싶은 어카운트의 API 키",
	"master": "관리자의 사용자명 (옵션)",
	"notingEnabled": "랜덤으로 노트를 작성하는 기능을 비활성화 하려면 false 를 입력",
	"keywordEnabled": "키워드를 기억하는 기능을 (MeCab 필요 / 한글판에서는 미지원) 활성화 하려면 true 를 입력 (비활성화는 false)",
	"chartEnabled": "차트 기능을 비활성화 하려면 false 를 입력해 주세요",
	"reversiEnabled": "아이쨩과 리버시에서 대전할 수 있는 기능을 활성화 하려면 true 를 입력 (비활성화는 false)",
	"serverMonitoring": "서버 모니터링 기능을 활성화 하려면 true 를 입력 (비활성화는 false)",
	"checkEmojisEnabled": "커스텀 이모지 확인 기능을 활성화 하려면 true 를 입력 (아니라면 false)",
	"checkEmojisAtOnce": "커스텀 이모지 확인 기능으로 게시물을 정리하려면 true 를 입력 (정리하지 않으려면 false)",
	"mecab": "/usr/bin/mecab",
	"mecabDic": "/usr/lib/x86_64-linux-gnu/mecab/dic/mecab-ipadic-neologd/",
	"memoryDir": "data"
}
```
`docker-compose build`하고 `docker-compose up` 하면 기동 가능합니다.
`docker-compose.yml`의 `enable_mecab`를 `0`으로 하면, MeCab을 설치하지 않습니다. (메모리가 적은 환경 등)


## 폰트
일부 기능에는 폰트가 필요합니다. 아이쨩에는 폰트가 포함되어 있지 않으므로 직접 폰트를 인스톨 디렉토리에 `font.ttf`라는 파일명으로 설치해주세요.

## 기억
아이쨩은 기억의 보존에 인메모리 데이터베이스를 사용하고 있으며, 아이쨩의 인스톨 디렉토리에 `memory.json`이라는 이름으로 영속화됩니다.

## 한국어 번역
- 역: [@narve@madost.one](https://madost.one/@narve), [@noridev@kokonect.link](https://kokonect.link/@noridev)
- 식/가벼운 커스텀: [@chocologic@madost.one](https://madost.one/@chocologic), [@noridev@kokonect.link](https://kokonect.link/@noridev)

## 라이센스
MIT. Originally developed by [Syuilo](https://github.com/syuilo/ai).

## Awards
<img src="./WorksOnMyMachine.png" alt="Works on my machine" height="120">
