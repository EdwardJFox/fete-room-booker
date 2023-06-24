# Dockerfile

# ENV from Railway
ARG DATABASE_URL

# Use node alpine as it's a small node image
FROM --platform=linux/amd64 node:16-alpine

RUN bash -c 'echo -e "$DATABASE_URL"'

# Create the directory on the node image 
# where our Next.js app will live
RUN mkdir -p /app

# Set /app as the working directory
WORKDIR /app

# Copy package.json and package-lock.json
# to the /app working directory
COPY package*.json /app

# Prisma working directory
COPY prisma ./prisma/

# Install dependencies in /app
RUN npm install

RUN npx prisma generate

# Copy the rest of our Next.js folder into /app
COPY . /app

RUN npx prisma migrate deploy

# Ensure port 3000 is accessible to our system
EXPOSE 3000

RUN npm run build

CMD ["npm", "run", "start"]