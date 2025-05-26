FROM gcr.io/distroless/nodejs22-debian12:nonroot

WORKDIR /app

COPY index.js .

EXPOSE 8053

CMD ["node", "index.js"]
