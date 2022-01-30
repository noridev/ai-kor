FROM node:16-alpine

ENV NODE_ENV=production

WORKDIR /aibot-korean

COPY . ./

RUN apk add --no-cache build-base g++ cairo-dev jpeg-dev pango-dev giflib-dev tini && \
	npm install && npm run build

ENTRYPOINT ["/sbin/tini", "--"]

CMD ["npm", "start"]
