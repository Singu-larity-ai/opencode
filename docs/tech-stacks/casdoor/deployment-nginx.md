---
title: Deploying behind Nginx
source: https://casdoor.org/docs/deployment/nginx
description: How to deploy Casdoor behind Nginx reverse proxy with configuration steps for production environments.
---

# Deploying behind Nginx

In production, the Casdoor backend serves the frontend static files and the API. You can put [Nginx](https://www.nginx.com/) in front of it to proxy all traffic for your domain to the backend port.

## 1. Build frontend static files[​](#1-build-frontend-static-files "Direct link to 1. Build frontend static files")

With Casdoor cloned and configured (see [Server installation](/docs/basic/server-installation)), build the frontend:

- Yarn
- npm

```
yarn install && yarn run build
```

```
npm install && npm run build
```

## 2. Run the backend[​](#2-run-the-backend "Direct link to 2. Run the backend")

```
go run main.go
```

Or build and run:

```
go build && ./casdoor
```

## 3. Configure Nginx[​](#3-configure-nginx "Direct link to 3. Configure Nginx")

Edit your Nginx config and add a `server` block:

```
server {
    listen 80;
    server_name YOUR_DOMAIN_NAME;

    location / {
        proxy_set_header    Host            $http_host;
        proxy_set_header    X-Real-IP       $remote_addr;
        proxy_set_header    X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_redirect      off;
        proxy_pass http://127.0.0.1:8000;
    }
}
```

Next, restart your Nginx process. Run:

```
nginx -s reload
```

## 4. Test[​](#4-test "Direct link to 4. Test")

Visit `http://YOUR_DOMAIN_NAME` in your favorite browser.
