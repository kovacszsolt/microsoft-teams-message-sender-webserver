FROM node:current-alpine3.15
COPY . /app
WORKDIR /app
RUN npm install
RUN chmod +x /app/command.sh
ENTRYPOINT ["/bin/sh","/app/command.sh"]

