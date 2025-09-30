FROM mcr.microsoft.com/playwright:v1.55.0-noble
WORKDIR /ProjectHome
COPY . .
RUN apt-get update &&\
    apt-get install -y openjdk-17-jre-headless &&\
    npm install &&\
    npx playwright install --with-deps
ENV JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
ENV CI=true
ENV commandToRunTests="npx playwright test --project=chromium"
CMD ["sh", "-c", "$commandToRunTests"]
