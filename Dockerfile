FROM node:20

WORKDIR /book-management

COPY package.json .
RUN npm install
COPY . .

#waiting for mysql server to be ready
CMD bash -c "sleep 60 && npm run knex:migrate && sleep 10 && npm run knex:seed && sleep 10 && npm start"