FROM node:12

# Create app directory
WORKDIR /opt/auction-bidder-system

COPY package*.json ./

RUN mkdir -p /docker-logs/bidder

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production
ENV NODE_ENV development
ENV APP_NAME bidder
ENV PORT 8080
ENV MYSQL_PWD 123456
ENV MYSQL_HOST 172.17.0.4
# Bundle app source
COPY . .

EXPOSE 8080

CMD [ "node", "bidder-system/server.babel.js" ]

#build command
# sudo docker build -t subramanian/auction-bidder-system .

#run command
# sudo docker run -p 8080:8080 -d subramanian/auction-bidder-system
