---
title: Try with Docker
source: https://casdoor.org/docs/basic/try-with-docker
description: How to run Casdoor using Docker containers for quick testing and production deployments.
---

# Try with Docker

## Requirements

### Hardware

- **Building the image:** At least **2 GB** RAM
- **Running the pre-built image:** At least **100 MB** RAM

### Docker

Use [Docker](https://docs.docker.com/get-docker/) (engine **>= 17.05**).

## Choosing an image

Two images are available on Docker Hub:

| Image | Contents | Use case |
|-------|----------|----------|
| [casdoor-all-in-one](https://hub.docker.com/r/casbin/casdoor-all-in-one) | Casdoor + embedded SQLite | Quick try-out only; **not for production** |
| [casdoor](https://hub.docker.com/r/casbin/casdoor) | Casdoor only | Connect to your own database; suitable for production |

### Option 1: All-in-one (toy database)

```
docker run -p 8000:8000 casbin/casdoor-all-in-one
```

Open [http://localhost:8000](http://localhost:8000) and sign in with **built-in/admin** / **123**.

### Option 2: Standard image with your config

```
docker run \
  -e driverName=mysql \
  -e dataSourceName='user:password@tcp(x.x.x.x:3306)/' \
  -p 8000:8000 \
  casbin/casdoor:latest
```

### Option 3: Docker Compose

```
docker-compose up
```

## Testing

After deployment, visit [http://localhost:8000](http://localhost:8000) (or with your domain) and sign in as **built-in/admin** / **123**.
