FROM node:14.16.1-alpine
RUN mkdir -p /opt/app
WORKDIR /opt/app
RUN adduser app
COPY ./ .
RUN npm install --no-package-lock
RUN chown -R app /opt/app
USER app
EXPOSE $PORT
ENTRYPOINT [ "npm", "run", "start" ]