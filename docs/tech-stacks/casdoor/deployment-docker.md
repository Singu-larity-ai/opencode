---
title: Deploying with Docker
source: https://casdoor.org/docs/deployment/docker
description: Deploying Casdoor with Docker or Docker Compose, with optional reverse proxy configurations.
---

# Deploying with Docker

This page describes deploying Casdoor with Docker or Docker Compose, with optional reverse proxy (Traefik, Nginx, Caddy) configs.

## Prerequisites

- Docker
- Docker Compose (for the compose method)
- A domain pointing to your server (for reverse proxy setups)

## Deployment options

### Using Docker Compose

```yaml
services:
  casdoor:
    image: casbin/casdoor:latest
    container_name: casdoor
    restart: unless-stopped
    ports:
      - "8000:8000"
    environment:
      - GIN_MODE=release
    volumes:
      - ./conf:/conf
      - ./logs:/logs
    networks:
      - casdoor-network
networks:
  casdoor-network:
    driver: bridge
```

Start the service:

```
docker-compose up -d
```

### Using Docker Run

```
docker run -d \
  --name casdoor \
  --restart unless-stopped \
  -p 8000:8000 \
  -v $(pwd)/conf:/conf \
  -v $(pwd)/logs:/logs \
  -e GIN_MODE=release \
  casbin/casdoor:latest
```

## Reverse Proxy Configuration

### Traefik with Docker Labels

Configure with labels for automatic HTTPS via Let's Encrypt.

### Nginx with Let's Encrypt

Configure Nginx as reverse proxy with certbot for SSL certificates.

### Caddy with Automatic HTTPS

Caddy automatically handles HTTPS with Let's Encrypt.

## Configuration

1. Create directories: `mkdir -p conf logs`
2. Download config files:
   ```
   wget https://raw.githubusercontent.com/casdoor/casdoor/master/conf/app.conf -O conf/app.conf
   wget https://raw.githubusercontent.com/casdoor/casdoor/master/init_data.json.template -O conf/init_data.json
   ```
3. Edit `conf/app.conf` to match your environment

## Testing

After deployment:

- **Docker Run/Compose only**: `http://your-server-ip:8000`
- **With Reverse Proxy**: `https://your-domain.com`

Sign in as **built-in/admin** / **123**.
