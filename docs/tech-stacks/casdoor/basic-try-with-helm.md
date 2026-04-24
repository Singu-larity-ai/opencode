---
title: Try with Helm
source: https://casdoor.org/docs/basic/try-with-helm
description: How to deploy Casdoor on Kubernetes using Helm charts.
---

# Try with Helm

This page describes how to deploy Casdoor on Kubernetes using Helm.

## Prerequisites

- A running Kubernetes cluster (1.19+)
- Helm v3.8+

## Installation

### Step 1: Install the Casdoor chart

```
helm install casdoor oci://registry-1.docker.io/casbin/casdoor-helm-charts --version <version>
```

### Step 2: Access Casdoor

After installation, use the service URL provided by your cluster to access Casdoor.

## Customization

Key parameters in values.yaml:

| Parameter | Description | Default Value |
|-----------|-------------|---------------|
| `replicaCount` | Number of replicas | `1` |
| `image.repository` | Repository for Docker image | `casbin` |
| `image.tag` | Tag for Docker image | `""` |
| `config` | Configuration settings | See values.yaml |
| `database.driver` | Database driver | `sqlite` |
| `database.host` | Database host | `""` |
| `service.type` | Kubernetes service type | `ClusterIP` |
| `service.port` | Port number | `8000` |
| `ingress.enabled` | Enable Ingress | `false` |

## Exposing Casdoor

### Option 1: Ingress (classic)

Enable and configure Ingress with nginx class:

```yaml
ingress:
  enabled: true
  className: nginx
  annotations:
    cert-manager.io/cluster-issuer: letsencrypt-prod
  hosts:
    - host: casdoor.example.com
      paths:
        - path: /
          pathType: Prefix
  tls:
    - secretName: casdoor-tls
      hosts:
        - casdoor.example.com
```

### Option 2: Gateway API (modern)

The Kubernetes Gateway API is supported. See the full documentation for HTTPRoute configuration.

## Managing the deployment

Upgrade:

```
helm upgrade casdoor oci://registry-1.docker.io/casbin/casdoor-helm-charts --version <version>
```

Uninstall:

```
helm uninstall casdoor
```
