# Use the Node.js base image
FROM node:18-alpine

# Set the /app directory as the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy application code into the container
COPY ./src ./src
COPY ./public ./public

# Build the application
RUN npm run build

# Expose the application port
EXPOSE 3000

# Command to start the application
CMD ["npm", "start"]
