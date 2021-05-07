FROM registry.semaphoreci.com/node:14
RUN mkdir -p /opt/app
WORKDIR /opt/app
RUN adduser app
COPY ./ .
RUN npm install --no-package-lock
RUN chown -R app /opt/app
USER app
EXPOSE 3000
ENTRYPOINT [ "npm", "run", "start" ]