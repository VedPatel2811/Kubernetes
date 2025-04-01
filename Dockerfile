# Use Node.js as base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy backend source code
COPY . .

# Expose the backend port
EXPOSE 5000

# Start the backend
CMD ["node", "server.js"]
