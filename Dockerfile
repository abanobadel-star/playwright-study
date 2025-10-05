FROM mcr.microsoft.com/playwright:v1.55.0-noble

WORKDIR /ProjectHome

# Install dependencies
COPY package*.json ./
RUN apt-get update && \
    apt-get install -y openjdk-17-jre-headless fonts-noto fonts-noto-color-emoji fonts-roboto fonts-liberation fonts-dejavu-core && \
    npm install && \
    npx playwright install --with-deps

# Copy project files
COPY . .

ENV JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
ENV CI=true

CMD ["npx", "playwright", "test", "--project=chromium", "--reporter=html"]

