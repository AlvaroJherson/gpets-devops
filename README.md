# gpets – DevOps Technical Challenge

## Architecture
- Frontend: React + Vite
- Containerization: Docker (multi-stage)
- CI/CD: Azure DevOps Pipelines (YAML)
- Cloud Deployment: Azure Static Web Apps (Free Tier)

## CI/CD Flow
1. Code is pushed to `main`
2. Azure DevOps pipeline is triggered
3. Build stage installs dependencies and builds the app
4. Security analysis runs using `npm audit`
5. Docker image is built and tagged with Build ID and Commit SHA

> Note: The pipeline is defined as code but not executed due to Azure DevOps billing restrictions on free subscriptions.

## Docker
### Build image locally
```bash
docker build -t gpets .

