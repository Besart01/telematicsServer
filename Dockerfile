# Use official Node image
FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Build the TypeScript project
RUN npm run build

# Expose the port your server listens to (adjust if needed)
EXPOSE 3000

# Start the app
CMD [ "node", "dist/server.js" ]
