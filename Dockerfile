FROM node:12


RUN apt-get update && apt-get install -y dos2unix

#app directory
WORKDIR /usr/src/app

#install the dependencies before the app code stuff to make use of cached layers
COPY package*.json ./

RUN npm install

COPY . .

#convert line endings for windows to unix
RUN dos2unix run_app.sh

# CMD ["node", "index.js"]

CMD [ "sh", "run_app.sh" ]

