# Dockerfile


# Use node alpine as it's a small node image
FROM --platform=linux/amd64 node:16-alpine

# ENV from Railway
ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

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

RUN npx prisma migrate deploy

# Copy the rest of our Next.js folder into /app
COPY . /app

# Ensure port 3000 is accessible to our system
EXPOSE 3000

RUN npm run build

CMD ["npm", "run", "start"]