FROM node:12

# Create app directory
WORKDIR /opt/auction-bidder-system

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

# EXPOSE 8080 -> we are exposing port while running docker

CMD [ "node", "server.babel.js" ]

#build command
#docker build -t subramanian/bidder-system .
#run command
# docker run -p 49160:8080 -d subramanian/bidder-system
