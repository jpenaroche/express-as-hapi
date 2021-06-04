FROM alpine:3.12

ARG USER=express \ 
    GROUP=express \ 
    port=3000 \ 
    host=0.0.0.0 \ 
    db_name= \ 
    user= \
    password= \ 
    express-password= \
    auth0-domain= \ 
    auth0-client-id= \
    auth0-secret=

ENV USER=${USER}
ENV GROUP=${GROUP}

RUN addgroup -S ${GROUP} && adduser -S ${USER} -G ${GROUP}

WORKDIR /home/express-app

RUN apk add nodejs npm curl --no-cache

ENV env=production

COPY --chown=${USER}:${GROUP}  . . 

RUN npm i -y && npm cache clean --force && npm run compile

RUN printf "PORT=${port}\nHOST=${host}\nDB_NAME=${db_name}\nDB_USER=${user}\nDB_PASSWORD=${password}\n" > .env
RUN printf "STRATEGY_PASSWORD=${express-password}\nAUTH0_DOMAIN=${auth0-domain}\nAUTH0_CLIENTID=${auth0-client-id}\nAUTH0_SECRET=${auth0-secret}" >> .env

USER ${USER}

EXPOSE ${port}/tcp

HEALTHCHECK --interval=5m --timeout=3s \
    CMD curl -f http://${host}:${port} || exit 1

ENTRYPOINT NODE_ENV=${env} node ./build/src/main.js