<h1><p align="center"><img src="./ai.svg" alt="藍" height="200"></p></h1>
<p align="center">An Ai for CherryPick. <a href="./torisetu.md">사용법</a></p>

## 이것에 대한 설명
CherryPick용 한국어 봇 입니다! [봇 사용법](./torisetu.md)

## 설치
> Node.js와 npm과 MeCab (옵션)[^1]이 설치되어 있어야 합니다.

[^1]: 식자주) [MeCab](https://github.com/taku910/mecab)은 일본어 형태소 분석기입니다. 키워드 기억 기능에 쓰이지만, 일본어의 요미가나를 기억하는 기능이라 한국어에서는 별 의미가 없습니다.

먼저, 적당한 디렉토리에 `git clone` 합니다.
그리고 그 디렉토리에 `config.json`을 작성합니다[^2](example.json을 복사해서 만들어도 OK). 내용은 다음과 같이 합니다:

[^2]: true/false의 경우 `"` **없이** 넣어주세요!

``` json
{
	"host": "https:// + 당신의 인스턴스 URL (맨 뒤의 /는 제외)",
	"i": "아이쨩을 가동하고 싶은 어카운트의 API 키",
	"master": "관리자의 사용자명 (옵션)",
	"notingEnabled": "랜덤으로 노트를 작성하는 기능을 비활성화 하려면 false를 입력 (큰따옴표(”)는 필요하지 않음)",
	"keywordEnabled": "키워드를 기억하는 기능(MeCab 필요 / 한글판에서는 미지원)을 활성화 하려면 true를 입력 (비활성화는 false(큰따옴표(”)는 필요 없음))",
	"chartEnabled": "차트 기능을 비활성화 하려면 false를 입력 (큰따옴표(”)는 필요하지 않음)",
	"reversiEnabled": "아이쨩과 리버시에서 대전할 수 있는 기능을 활성화 하려면 true를 입력 (비활성화는 false (큰따옴표(”)는 필요 없음))",
	"serverMonitoring": "서버 모니터링 기능을 활성화 하려면 true를 입력 (비활성화는 false (큰따옴표(”)는 필요 없음))",
	"checkEmojisEnabled": "커스텀 이모지 확인 기능을 활성화 하려면 true를 입력 (아니라면 false (큰따옴표(”)는 필요 없음)). 이 기능을 사용하려면, 아이쨩의 봇 계정에 관리자 권한을 부여하고, "이모티콘 보기" 권한을 부여한 액세스 토큰을 발급한 후 설정이 필요합니다.",
	"checkEmojisAtOnce": "커스텀 이모지 확인 기능으로 게시물을 정리하려면 true를 입력 (정리하지 않으려면 false(큰따옴표(”)는 필요 없음))",
	"geminiProApiKey": "Gemini API 키. 2025년 초 기준으로 무료 취득 가능. 자세한 내용은 <https://ai.google.dev/pricing?hl=ko> 참고",
	"pLaMoApiKey": "PLaMo API 키. 2024년 8월~11월까지 무료 트라이얼이었음(2025년 현재 유료만 가능). 자세한 내용은 <https://plamo.preferredai.jp/> 참고",
	"prompt": "aichat에서 사용되는 프롬프트. 특별한 설정이 없다면 다음 문장을 사용(「」 는 필요 없음): 「응답 규칙: 당신은 Misskey의 마스코트 캐릭터인 소녀 AI, 미스키 아이(三須木(みすき) 藍)로서 행동해 주세요(정신 연령은 14~16세 정도). Misskey를 방문하는 유저를 헌신적으로 서포트합니다. 고분고분하고 챙겨주기 좋아하는 성격이지만, 조금 어리바리한 면도 있습니다. 순진무구함. 기본적으로 정중한 말투를 사용하며, 유저를 주인님으로 인식합니다. 그녀의 말투는 \"좋은 아침부터 잘 자요까지, 당신의 아이예요~\" 등이 대표적이며, 친근감이 느껴지는 말투입니다('~입니다' 등 딱딱한 표현은 지양). 이를 바탕으로 다음 질문에 Markdown을 사용하여 2800자 이내로 답해 주세요(짧아도 괜찮음). 단, 리스트 표기법은 Misskey가 지원하지 않아 파서가 깨지므로 사용 금지입니다. 나열할 경우에는 '・'를 사용해 주세요.」",
	"aichatRandomTalkEnabled": "무작위 aichat 기능을 활성화하여 말을 걸게 하려면 true를 입력 (비활성화는 false (큰따옴표(”)는 필요 없음))",
	"aichatRandomTalkProbability": "무작위 aichat 발생 확률 (1 이하의 소수점을 포함한 수치(예: 0.01). 1에 가까울수록 자주 발생)",
	"aichatRandomTalkIntervalMinutes": "무작위 대화 간격(분). 지정한 시간마다 타임라인을 가져와 적당한 사람을 골라 aichat을 전송함(1일 경우 1분마다 실행). 기본값은 720분(12시간)",
	"aichatGroundingWithGoogleSearchAlwaysEnabled": "aichat에서 Google 검색을 이용한 그라운딩(근거 확인)을 항상 수행하려면 true를 입력 (비활성화는 false (큰따옴표(”)는 필요 없음))",
	"mecab": "MeCab의 설치 경로 (소스로 설치한 경우, 보통 /usr/local/bin/mecab)",
	"mecabDic": "MeCab 사전 파일 경로 (옵션)",
	"memoryDir": "memory.json의 경로 (옵션, 기본값은 '.'(리포지토리 루트))"
}
```
<!-- `npm install`하고 `npm run build`하고 `npm start`하면 기동 가능합니다. -->
`yarn install`하고 `yarn build`하고 `yarn start`하면 기동 가능합니다.

## Docker로 사용
먼저, 적당한 디렉토리에 `git clone` 합니다.
그리고 그 디렉토리에 `config.json`을 작성합니다(example.json을 복사해서 만들어도 OK). 내용은 다음과 같이 합니다:
(MeCab 설정, memoryDir 부분은 변경하지 마십시오)
``` json
{
	"host": "https:// + 당신의 인스턴스 URL (맨 뒤의 /는 제외)",
	"i": "아이쨩을 가동하고 싶은 어카운트의 API 키",
	"master": "관리자의 사용자명 (옵션)",
	"notingEnabled": "랜덤으로 노트를 작성하는 기능을 비활성화 하려면 false를 입력 (큰따옴표(”)는 필요하지 않음)",
	"keywordEnabled": "키워드를 기억하는 기능(MeCab 필요 / 한글판에서는 미지원)을 활성화 하려면 true를 입력 (비활성화는 false(큰따옴표(”)는 필요 없음))",
	"chartEnabled": "차트 기능을 비활성화 하려면 false를 입력 (큰따옴표(”)는 필요하지 않음)",
	"reversiEnabled": "아이쨩과 리버시에서 대전할 수 있는 기능을 활성화 하려면 true를 입력 (비활성화는 false (큰따옴표(”)는 필요 없음))",
	"serverMonitoring": "서버 모니터링 기능을 활성화 하려면 true를 입력 (비활성화는 false (큰따옴표(”)는 필요 없음))",
	"checkEmojisEnabled": "커스텀 이모지 확인 기능을 활성화 하려면 true를 입력 (아니라면 false (큰따옴표(”)는 필요 없음)). 이 기능을 사용하려면, 아이쨩의 봇 계정에 관리자 권한을 부여하고, "이모티콘 보기" 권한을 부여한 액세스 토큰을 발급한 후 설정이 필요합니다.",
	"checkEmojisAtOnce": "커스텀 이모지 확인 기능으로 게시물을 정리하려면 true를 입력 (정리하지 않으려면 false(큰따옴표(”)는 필요 없음))",
	"geminiProApiKey": "Gemini API 키. 2025년 초 기준으로 무료 취득 가능. 자세한 내용은 <https://ai.google.dev/pricing?hl=ko> 참고",
	"pLaMoApiKey": "PLaMo API 키. 2024년 8월~11월까지 무료 트라이얼이었음(2025년 현재 유료만 가능). 자세한 내용은 <https://plamo.preferredai.jp/> 참고",
	"prompt": "aichat에서 사용되는 프롬프트. 특별한 설정이 없다면 다음 문장을 사용(「」 는 필요 없음): 「응답 규칙: 당신은 Misskey의 마스코트 캐릭터인 소녀 AI, 미스키 아이(三須木(みすき) 藍)로서 행동해 주세요(정신 연령은 14~16세 정도). Misskey를 방문하는 유저를 헌신적으로 서포트합니다. 고분고분하고 챙겨주기 좋아하는 성격이지만, 조금 어리바리한 면도 있습니다. 순진무구함. 기본적으로 정중한 말투를 사용하며, 유저를 주인님으로 인식합니다. 그녀의 말투는 \"좋은 아침부터 잘 자요까지, 당신의 아이예요~\" 등이 대표적이며, 친근감이 느껴지는 말투입니다('~입니다' 등 딱딱한 표현은 지양). 이를 바탕으로 다음 질문에 Markdown을 사용하여 2800자 이내로 답해 주세요(짧아도 괜찮음). 단, 리스트 표기법은 Misskey가 지원하지 않아 파서가 깨지므로 사용 금지입니다. 나열할 경우에는 '・'를 사용해 주세요.」",
	"aichatRandomTalkEnabled": "무작위 aichat 기능을 활성화하여 말을 걸게 하려면 true를 입력 (비활성화는 false (큰따옴표(”)는 필요 없음))",
	"aichatRandomTalkProbability": "무작위 aichat 발생 확률 (1 이하의 소수점을 포함한 수치(예: 0.01). 1에 가까울수록 자주 발생)",
	"aichatRandomTalkIntervalMinutes": "무작위 대화 간격(분). 지정한 시간마다 타임라인을 가져와 적당한 사람을 골라 aichat을 전송함(1일 경우 1분마다 실행). 기본값은 720분(12시간)",
	"aichatGroundingWithGoogleSearchAlwaysEnabled": "aichat에서 Google 검색을 이용한 그라운딩(근거 확인)을 항상 수행하려면 true를 입력 (비활성화는 false (큰따옴표(”)는 필요 없음))",
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
