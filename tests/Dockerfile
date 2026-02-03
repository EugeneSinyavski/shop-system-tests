FROM mcr.microsoft.com/playwright:v1.57.0-jammy

WORKDIR /app

RUN apt-get update && \
    apt-get install -y locales fonts-liberation fonts-noto-cjk && \
    locale-gen ru_RU.UTF-8
    
ENV LANG ru_RU.UTF-8
ENV LANGUAGE ru_RU:ru
ENV LC_ALL ru_RU.UTF-8


COPY package.json package-lock.json* ./


RUN npm install


COPY . .


CMD ["npm", "test"]