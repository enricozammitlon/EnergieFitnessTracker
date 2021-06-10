FROM alpine:3.9
COPY . .

RUN apk update && apk add --no-cache nmap && \
    echo @edge http://nl.alpinelinux.org/alpine/edge/community >> /etc/apk/repositories && \
    echo @edge http://nl.alpinelinux.org/alpine/edge/main >> /etc/apk/repositories && \
    apk update && \
    apk add --no-cache \
      chromium \
      harfbuzz \
      "freetype" \
      ttf-freefont \
      nss \
      nodejs \
      nodejs-npm \
      bash \
      git && \
    npm install && npm install -G heroku
COPY . .