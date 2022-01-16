FROM node:16-alpine

# Add the following line to allow create-react-app running in docker container
ENV CI=true

WORKDIR /app
COPY package.json ./
RUN npm install
COPY ./ ./

CMD ["npm", "start"]