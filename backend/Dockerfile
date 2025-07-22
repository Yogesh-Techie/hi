FROM node:18
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source
COPY . .

# Expose port & run
EXPOSE 4000
CMD ["node", "app.js"]
