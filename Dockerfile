FROM node:19.5.0-alpine
WORKDIR /app 
COPY package.json . 
RUN NODE_ENV=development 
RUN npm i
COPY . .
EXPOSE 5173 
CMD ["npm", "run", "dev"]
