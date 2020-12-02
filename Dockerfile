FROM node:12
#app directory
WORKDIR /usr/src/app

#install the dependencies before the app code stuff to make use of cached layers
COPY package*.json ./

RUN npm install

#RUN npm ci --only=production 

COPY . .

CMD ["node", "index.js"]

