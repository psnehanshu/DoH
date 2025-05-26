FROM gcr.io/distroless/nodejs22-debian12:nonroot
WORKDIR /app
COPY *.js LICENSE ./
EXPOSE 8053
CMD ["index.js"]
