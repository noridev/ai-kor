FROM node:16-alpine

ENV NODE_ENV=production

WORKDIR /aibot-korean

COPY . ./

RUN apk add --no-cache build-base g++ cairo-dev jpeg-dev pango-dev giflib-dev && \
	npm install && npm run build

CMD ["npm", "start"]
