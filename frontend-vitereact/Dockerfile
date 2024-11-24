FROM node:18-alpine

WORKDIR /app

COPY . /app

RUN npm install

RUN npm run build

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

# Study this part
# If you're serving a production build, you'll need to modify your Dockerfile to copy over the build folder and serve it:
# Copy code
# FROM nginx:alpine
# COPY build /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]