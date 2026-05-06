# Troubleshooting

Common issues and solutions for DClaw Building.

## Quick Diagnostics

```bash
# Check app pods
kubectl get pods -n dclaw-building

# Check logs
kubectl logs -n dclaw-building deployment/dclaw-building-backend

# Check database
kubectl get clusters -n dclaw-building
```

## Sections

- [Common Issues](./common-issues)
- [FAQ](./faq)
