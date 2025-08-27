# Use official Node.js LTS image
FROM node:22.18.0-alpine3.22

# Create app directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source files
COPY . .

# Expose the app port
EXPOSE 3000

# Start the Node.js app
CMD ["npm", "start"]
