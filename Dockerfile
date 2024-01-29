# Étape de construction
FROM node:18 as build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build --prod
RUN npm cache clean --force

# Étape de production
FROM nginx:alpine
COPY --from=build /app/dist/interfaceweb /usr/share/nginx/html
EXPOSE 80
