FROM debian:bullseye
RUN apt-get update && apt-get upgrade -y && \
    apt-get install -y nodejs \
    npm
RUN apt-get install -y python3 python3-pip
WORKDIR /threat-detecter-ui
# Upload code
COPY package.json /threat-detecter-ui/
RUN npm install -g npm@latest
RUN rm -rf node_modules
RUN npm install
COPY public/ /threat-detecter-ui/public/
COPY src/ /threat-detecter-ui/src/
RUN ls src
RUN npm install -D extract-text-webpack-plugin@next
RUN npm run build
# Expose port to run on
EXPOSE 80
CMD npm start
