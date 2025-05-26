# Dough-DoH (A simple DNS-over-HTTPS server)

Pronounced like [dodo](https://en.wikipedia.org/wiki/Dodo).

![Dodo](./dodo.jpg)

[Possibly Roelant Savery](https://commons.wikimedia.org/wiki/File:Edwards%27_Dodo.jpg), Public domain, via Wikimedia Commons

---

This is a simple DNS-over-HTTPS (DoH) server written in JavaScript (Node.js). It has no external dependencies and is designed to be easy to run and use.

It implements the API proposed in [RFC 8484](https://datatracker.ietf.org/doc/html/rfc8484), which is supported by all major web browsers by default.

Note: It uses [Google Public DNS](https://developers.google.com/speed/public-dns/) as the upstream resolver.

## Running the server

I have included a Dockerfile to make it easy to run the server in a container. You can also run it directly with Node.js.

### Using Docker

```bash
docker build -t doh-server .
docker run -p 443:8053 doh-server
```

### Using Node.js

```bash
node index.js
```

## Configuration

You can configure the server by setting environment variables. The following variables are supported:

- `PORT`: The port to listen on (default: `8053`).

# Why use this?

Do you want to prevent your ISP or network administrator from spying on your DNS queries? Then DNS-over-HTTPS is a great solution. It encrypts your DNS queries, making it harder for third parties to see what websites you are visiting.

But have they blocked the major DoH providers like Cloudflare or Google? This server can be used to bypass those restrictions by running it on your own machines or VPS which can be easily rented from providers like DigitalOcean, Linode, OVH, or a cloud provider like AWS or Fly.io.

All major web browsers support DoH, so you can easily configure them to use this server as your DNS resolver.
