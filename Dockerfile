FROM denoland/deno:alpine

WORKDIR /app

COPY . .

EXPOSE 3000

CMD ["task", "start"]
