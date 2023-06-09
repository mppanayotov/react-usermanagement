FROM node:lts-alpine
RUN mkdir /project
WORKDIR /project
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
EXPOSE 4200
CMD ["npm", "start"]
