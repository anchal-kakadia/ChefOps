# CSC 519: DevOps Project

## **Cloud Kitchen Platform - DevOps Pipeline Proposal**

### **Solo Project by:** _Anchal Kakadia (akakadi)_

---

## **Problem Statement & Description**

### **The Problem**

Cloud kitchen platforms must frequently update live menus because dishes may go out of stock (maybe due to ingredient shortages), and today’s specials or seasonal offerings change quite often.  
In many existing systems, these updates require **manual deployment**, configuration edits on production servers, or even full restarts.

Such manual processes lead to:

- Inconsistent environments
- Downtime during meal rush hours
- Increased risk of untested updates reaching production

---

### **Why Is It Important?**

For a cloud kitchen, **uptime and menu accuracy are critical**.  
If unavailable items remain visible, customers place invalid orders that later must be canceled thus wasting time and breaking trust.

Manual redeployments also cause:

- Reduced developer productivity
- Inconsistent environments
- Late-night emergency fixes

The DevOps challenge: enable **atomic, consistent, and rapid deployments** of frequent updates so that the the platform is continuously available and stable.

---

# **Solution**

A complete CI/CD implementation demonstrating automated deployments across Development, Staging, and Production environments using GitHub Actions, Docker, and Ansible.

---

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Architecture](#architecture)
- [Technology Stack](#technology-stack)
- [Setup Instructions](#setup-instructions)
- [Project Requirements Checklist](#project-requirements-checklist)
- [Security Implementation (Bonus)](#security-implementation-bonus)
- [Pipeline Workflow](#pipeline-workflow)
- [Environment Details](#environment-details)
- [Deployment Process](#deployment-process)
- [Rollback Procedure](#rollback-procedure)
- [Testing the Pipeline](#testing-the-pipeline)
- [Troubleshooting](#troubleshooting)

---

## 🎯 Project Overview

ChefOps is a restaurant menu management system that demonstrates a production-grade CI/CD pipeline implementing Gitflow workflow with automated deployments to three separate environments. The project showcases DevOps best practices including containerization, infrastructure as code, automated testing, and continuous deployment.

### Key Features

-  **Gitflow Workflow**: Development → Release → Main branches
-  **Three Environments**: Dev, Staging, Production
-  **Automated CI/CD**: GitHub Actions with quality gates
-  **Containerization**: Docker-based deployments
-  **Infrastructure as Code**: Ansible playbooks
-  **Health Checks**: Automated deployment verification
-  **Rollback Capability**: Quick reversion to previous versions

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        GitHub Repository                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │ development  │→ │   release    │→ │     main     │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                     GitHub Actions Pipeline                      │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌───────────┐ │
│  │    Lint    │→ │    Test    │→ │   Build    │→ │  Deploy   │ │
│  │  (ESLint)  │  │   (Jest)   │  │  (Docker)  │  │ (Ansible) │ │
│  └────────────┘  └────────────┘  └────────────┘  └───────────┘ │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│              NCSU VCL Node (Self-Hosted Runner)                  │
│  ┌──────────────────┐  ┌──────────────────┐  ┌────────────────┐│
│  │  Development     │  │     Staging      │  │   Production   ││
│  │  Port: 3001/8001 │  │  Port: 3002/8002 │  │  Port: 3000/80 ││
│  └──────────────────┘  └──────────────────┘  └────────────────┘│
└─────────────────────────────────────────────────────────────────┘
```
CREDIT: Used AI to generate this diagram
---

## 💻 Technology Stack

### Backend
- **Runtime**: Node.js 18
- **Framework**: Express.js
- **Language**: TypeScript
- **Testing**: Jest
- **Linting**: ESLint

### Frontend
- **Framework**: React + Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite

### DevOps Tools
- **CI/CD**: GitHub Actions
- **Containerization**: Docker
- **Container Registry**: GitHub Container Registry (GHCR)
- **Configuration Management**: Ansible
- **Infrastructure**: NCSU VCL Ubuntu VM
- **Version Control**: Git (Gitflow)

---

## 🚀 Setup Instructions

### Prerequisites

- Ubuntu 20.04+ VM (NCSU VCL)
- Docker installed (no sudo required)
- GitHub repository with Actions enabled
- SSH access to VCL node

### Step 1: Clone Repository

```bash
git clone https://github.com/your-username/ChefOps.git
cd ChefOps
```

### Step 2: Configure GitHub Secrets

Navigate to: **Repository Settings → Secrets and variables → Actions → New repository secret**

Add the following secrets:

| Secret Name | Description | Example Value |
|------------|-------------|---------------|
| `JWT_SECRET` | JWT token secret | `openssl rand -base64 32` |
| `GITHUB_TOKEN` | Auto-provided by GitHub | (Automatic) |

### Step 3: Setup Self-Hosted Runner

1. Go to: **Repository Settings → Actions → Runners → New self-hosted runner**
2. Follow the instructions to install runner on VCL node:

```bash
# On VCL node
mkdir actions-runner && cd actions-runner
curl -o actions-runner-linux-x64-2.311.0.tar.gz -L \
  https://github.com/actions/runner/releases/download/v2.311.0/actions-runner-linux-x64-2.311.0.tar.gz
tar xzf ./actions-runner-linux-x64-2.311.0.tar.gz

# Configure the runner
./config.sh --url https://github.com/your-username/ChefOps --token YOUR_TOKEN

# Install and start as a service
sudo ./svc.sh install
sudo ./svc.sh start
```

### Step 4: Initialize Infrastructure with Ansible

```bash
# On your local machine
cd ansible

# Create inventory file
cat > inventory.ini << EOF
[vcl]
csc519-109-host.csc.ncsu.edu ansible_user=your-username
EOF

# Run setup playbook
ansible-playbook -i inventory.ini playbooks/setup.yml
```

This will:
-  Verify Docker access
-  Create application directories
-  Create Docker network (`chefops-network`)
-  Prepare environment for deployments

### Step 5: Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### Step 6: Create Initial Branches

```bash
# Clone the repository
git clone https://github.com/your-username/ChefOps.git
cd ChefOps

# You're now on main. View all remote branches:
git branch -r

# Output should show:
#   origin/HEAD -> origin/main
#   origin/development
#   origin/main
#   origin/release

# Checkout development branch (creates local tracking branch)
git checkout development

# Checkout release branch (creates local tracking branch)
git checkout release

# Return to main
git checkout main

# Verify all branches exist locally
git branch
# Output:
#   development
#   main
#   release
```

### Step 7: Configure Branch Protection Rules

Protect your branches to enforce proper Gitflow workflow:

#### For `main` Branch:
1. Go to **Settings → Branches → Add rule**
2. Branch name pattern: `main`
3. Enable:
   -  **Require a pull request before merging** (0-1 approvals for solo)
   -  **Require status checks to pass before merging**
     - Select: `Lint and Test`
     - Select: `Build Images (PR Validation)`
   -  **Require branches to be up to date before merging**
4. Click **Create**

#### For `release` Branch:
1. Click **Add rule** again
2. Branch name pattern: `release`
3. Enable same settings as `main`
4. Click **Create**

#### For `development` Branch:
1. Click **Add rule** again
2. Branch name pattern: `development`
3. Enable same settings (can set approvals to 0 for dev)
4. Click **Create**

**Test Branch Protection:**
```bash
# This should fail (protected branch)
git checkout main
echo "test" >> README.md
git commit -am "Test protection"
git push origin main
# Expected: Error - protected branch

# This should work (via PR)
git checkout -b test/protection
git push origin test/protection
# Create PR via GitHub UI → Should work ✓
```

### Step 8: Test Local Development

```bash
# Start backend
cd backend
npm run dev

# Start frontend (new terminal)
cd frontend
npm run dev
```

Visit: `http://localhost:5173`

---

## 🔒 Branch Protection Rules

This repository implements strict branch protection rules to enforce proper Gitflow workflow and maintain code quality.

### Protected Branches

| Branch | Purpose | Protection Level | Direct Push | Status Checks Required |
|--------|---------|------------------|-------------|----------------------|
| `main` | Production | 🔴 Strict | ❌ Blocked |  Required |
| `release` | Staging | 🟡 Moderate | ❌ Blocked |  Required |
| `development` | Development | 🟢 Standard | ❌ Blocked |  Required |

### Protection Rules Applied

#### All Protected Branches:
-  **Require pull request before merging**
  - Prevents direct commits
  - Enforces code review process
  - Approvals: 0-1 (configurable for team size)

-  **Require status checks to pass**
  - `Lint and Test` must pass
  - `Build Images (PR Validation)` must pass
  - Branches must be up to date before merging

### Why Branch Protection?

1. **Prevents Accidents**: No accidental direct pushes to production
2. **Enforces Quality**: All code must pass CI/CD checks
3. **Maintains History**: Linear history makes debugging easier
4. **Team Safety**: Even admins follow the rules
5. **Industry Standard**: Production-grade workflow practices

### Development Workflow with Protection

```bash
# ❌ This will FAIL (protected branch)
git checkout main
git commit -am "Quick fix"
git push origin main
# Error: protected branch update failed

#  This is the CORRECT way
git checkout development
git checkout -b feature/my-feature
git commit -am "Add feature"
git push origin feature/my-feature
# Create PR via GitHub UI
# Wait for checks to pass ✓
# Merge PR (triggers deployment)
```
---

##  Project Requirements Checklist

### Core Requirements

#### 1. **Gitflow Workflow** 
- [x] Three branches: `development`, `release`, `main`
- [x] Feature branches merge into `development`
- [x] `development` promotes to `release` via PR
- [x] `release` promotes to `main` via PR
- [x] Clear separation between environments
- [x] **Branch protection rules enforced on all branches**

#### 2. **CI/CD Pipeline** 
- [x] Automated linting (ESLint)
- [x] Automated testing (Jest with coverage)
- [x] Docker image building
- [x] Automated deployments
- [x] GitHub Actions workflow implemented

#### 3. **Quality Gates** 
- [x] ESLint code quality checks
- [x] Jest unit tests with coverage reporting
- [x] Docker build validation on PRs (no push)
- [x] Health check endpoints verification post-deployment
- [x] Deployment only proceeds if all checks pass

#### 4. **Multiple Environments** 
- [x] **Development**: `http://csc519-109-host.csc.ncsu.edu:8001` (Backend: 3001)
- [x] **Staging**: `http://csc519-109-host.csc.ncsu.edu:8002` (Backend: 3002)
- [x] **Production**: `http://csc519-109-host.csc.ncsu.edu` (Backend: 3000)
- [x] Environment-specific configurations
- [x] Isolated Docker containers per environment

#### 5. **Infrastructure as Code** 
- [x] Ansible playbooks for infrastructure setup
- [x] Ansible playbooks for deployment automation
- [x] Ansible playbooks for rollback capability
- [x] Version-controlled infrastructure configuration

#### 6. **Containerization** 
- [x] Backend Dockerized
- [x] Frontend Dockerized
- [x] Images pushed to GitHub Container Registry
- [x] Environment-specific image tags
- [x] Proper Docker networking

#### 7. **Pull Request Workflow** 
- [x] PRs trigger validation (lint + test + build)
- [x] PRs do NOT trigger deployments
- [x] Only merges trigger deployments
- [x] Clear feedback on PR status
- [x] **Branch protection enforces PR-only workflow**

#### 8. **Deployment Automation** 
- [x] Push to `development` → Auto-deploy to Dev
- [x] Merge PR to `release` → Auto-deploy to Staging
- [x] Merge PR to `main` → Auto-deploy to Production
- [x] Zero manual intervention required

#### 9. **Health Checks** 
- [x] `/health` endpoint on backend
- [x] Automated health verification after deployment
- [x] Deployment fails if health check fails
- [x] 15 retry attempts with 2-second delays

#### 10. **Rollback Capability** 
- [x] Ansible rollback playbook implemented
- [x] Can revert to any previous image version
- [x] Lists available versions before rollback
- [x] Requires manual confirmation for safety

---

## 🔒 Security Implementation (Bonus +1%)

### 1. **GitHub Secrets Management** 

**Implementation:**
- All sensitive credentials stored in GitHub Secrets
- JWT_SECRET never exposed in code or logs
- Docker registry credentials secured
- Environment variables injected at runtime only

**Evidence:**
```yaml
# In .github/workflows/ci-cd.yml
docker run -d --name chefops-backend \
  -e JWT_SECRET=${{ secrets.JWT_SECRET }} \
  -e NODE_ENV=production \
  ...
```

**Benefits:**
-  Prevents credential leakage in version control
-  Centralized secret management
-  Encrypted at rest in GitHub
-  Only accessible to authorized workflows
-  Audit trail of secret usage

### 2. **Health Check Endpoints** 

**Implementation:**
```typescript
// Backend health check endpoint
app.get('/health', (_req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString() 
  });
});
```

**Automated Verification:**
```bash
# In deployment script
for i in {1..15}; do
  if curl -f http://localhost:3000/health 2>/dev/null; then
    echo " Backend is healthy!"
    break
  fi
  sleep 2
done
```

**Benefits:**
-  Ensures service is running before completing deployment
-  Prevents deploying broken containers
-  Provides monitoring/alerting capability
-  Enables load balancer health checks
-  Zero-downtime deployment verification

### 3. **Principle of Least Privilege** 

**Implementation:**
- GitHub Actions uses minimal required permissions
- Self-hosted runner has Docker access only (no sudo)
- Secrets only accessible to specific workflows
- Container registries use scoped access tokens

**Evidence:**
```yaml
permissions:
  contents: read
  packages: write
```

### 4. **Isolated Environments** 

**Implementation:**
- Each environment runs in separate Docker containers
- Dedicated ports per environment
- Separate Docker networks (if needed)
- Environment-specific configurations

**Benefits:**
-  Production isolation from dev/staging
-  Prevents cross-contamination
-  Independent scaling
-  Secure testing without production impact

### 5. **Secure Image Management** 

**Implementation:**
- Images tagged with commit SHA (immutable)
- Private GitHub Container Registry
- Automated image pruning
- No latest tag in production (version pinning)

**Evidence:**
```yaml
BACKEND_IMAGE="ghcr.io/user/chefops-backend:prod-5cfa8e9df"
```
---

## 🔄 Pipeline Workflow

### For Pull Requests (Any Branch)

```
1. Developer creates PR
   ↓
2. GitHub Actions Triggered
   ├─ Run ESLint ✓
   ├─ Run Jest Tests ✓
   └─ Build Docker Images (no push) ✓
   ↓
3. PR shows status:  All checks passed
   ↓
4. Ready to merge (NO DEPLOYMENT)
```

### For Push to Development Branch

```
1. Code merged to development
   ↓
2. GitHub Actions Pipeline
   ├─ Lint & Test ✓
   ├─ Build Images (dev-<sha>) ✓
   ├─ Push to GHCR ✓
   └─ Deploy to Development ✓
   ↓
3. Health Check Verification
   ↓
4. Development Environment Updated
   URL: http://csc519-109-host.csc.ncsu.edu:8001
```

### For Push to Release Branch

```
1. PR merged: development → release
   ↓
2. GitHub Actions Pipeline
   ├─ Lint & Test ✓
   ├─ Build Images (staging-<sha>) ✓
   ├─ Push to GHCR ✓
   └─ Deploy to Staging ✓
   ↓
3. Health Check Verification
   ↓
4. Staging Environment Updated
   URL: http://csc519-109-host.csc.ncsu.edu:8002
```

### For Push to Main Branch

```
1. PR merged: release → main
   ↓
2. GitHub Actions Pipeline
   ├─ Lint & Test ✓
   ├─ Build Images (prod-<sha>) ✓
   ├─ Push to GHCR ✓
   └─ Deploy to Production ✓
   ↓
3. Health Check Verification
   ↓
4. Production Environment Updated
   URL: http://csc519-109-host.csc.ncsu.edu
```

---

## 🌍 Environment Details

### Development Environment
- **Purpose**: Active development and testing
- **Branch**: `development`
- **Frontend**: Port 8001
- **Backend**: Port 3001
- **URL**: `http://csc519-109-host.csc.ncsu.edu:8001`
- **Container Names**: `chefops-frontend-dev`, `chefops-backend-dev`
- **Image Tags**: `dev-<commit-sha>`, `dev-latest`
- **Deployment**: Automatic on push to `development`

### Staging Environment
- **Purpose**: Pre-production validation and QA
- **Branch**: `release`
- **Frontend**: Port 8002
- **Backend**: Port 3002
- **URL**: `http://csc519-109-host.csc.ncsu.edu:8002`
- **Container Names**: `chefops-frontend-staging`, `chefops-backend-staging`
- **Image Tags**: `staging-<commit-sha>`, `staging-latest`
- **Deployment**: Automatic on push to `release`

### Production Environment
- **Purpose**: Live production system
- **Branch**: `main`
- **Frontend**: Port 80
- **Backend**: Port 3000
- **URL**: `http://csc519-109-host.csc.ncsu.edu`
- **Container Names**: `chefops-frontend`, `chefops-backend`
- **Image Tags**: `prod-<commit-sha>`, `prod-latest`
- **Deployment**: Automatic on push to `main`

---

## ⏮️ Rollback Procedure

### View Available Versions

```bash
# SSH to VCL node
ssh user@csc519-109-host.csc.ncsu.edu

# View available images
docker images | grep chefops
```

### Rollback Production

```bash
# On your local machine with Ansible installed
cd ansible

ansible-playbook playbooks/rollback.yml \
  -i inventory.ini \
  -e "rollback_target=production" \
  -e "rollback_backend_image=ghcr.io/user/chefops-backend:prod-abc123" \
  -e "rollback_frontend_image=ghcr.io/user/chefops-frontend:prod-abc123"
```

### Rollback Staging

```bash
ansible-playbook playbooks/rollback.yml \
  -i inventory.ini \
  -e "rollback_target=staging" \
  -e "rollback_backend_image=ghcr.io/user/chefops-backend:staging-xyz789" \
  -e "rollback_frontend_image=ghcr.io/user/chefops-frontend:staging-xyz789"
```

### Rollback Development

```bash
ansible-playbook playbooks/rollback.yml \
  -i inventory.ini \
  -e "rollback_target=development" \
  -e "rollback_backend_image=ghcr.io/user/chefops-backend:dev-def456" \
  -e "rollback_frontend_image=ghcr.io/user/chefops-frontend:dev-def456"
```
---

## 📊 Project Statistics

- **Total Branches**: 3 (development, release, main)
- **Environments**: 3 (Dev, Staging, Production)
- **Docker Containers**: 6 (3 backend + 3 frontend)
- **Docker Images**: 6+ (versioned by commit SHA)
- **Deployment Time**: ~2-3 minutes per environment
- **Quality Gates**: 2 (ESLint, Jest)
- **Health Check Retries**: 15 (30 seconds total)

---

## 🎓 Learning Outcomes

This project demonstrates:

1. **CI/CD Principles**: Automated testing, building, and deployment
2. **Gitflow Workflow**: Branch-based development strategy
3. **Infrastructure as Code**: Ansible playbooks for reproducible infrastructure
4. **Containerization**: Docker for consistent deployments
5. **Environment Management**: Separate dev, staging, production
6. **Quality Assurance**: Automated testing and validation
7. **DevOps Best Practices**: Health checks, rollbacks, monitoring
8. **Security**: Secret management, isolated environments

---

## 📝 Additional Notes

### Important Files

- `.github/workflows/ci-cd.yml` - Main CI/CD pipeline
- `ansible/playbooks/setup.yml` - Infrastructure setup
- `ansible/playbooks/deploy.yml` - Deployment automation (if separate)
- `ansible/playbooks/rollback.yml` - Rollback procedure
- `backend/Dockerfile` - Backend container definition
- `frontend/Dockerfile` - Frontend container definition

---

## 🤝 Contributing

This is an academic project. For improvements or suggestions:

1. Fork the repository
2. Create feature branch
3. Make changes
4. Submit pull request
5. Watch the CI/CD pipeline work! 🚀

---

## 📄 License

This project is part of CSC DevOps coursework at NC State University.

---

## 👥 Team

- **Developer**: Anchal Kakadia
- **Course**: CSC DevOps
- **Institution**: North Carolina State University
- **Semester**: Fall 2025

---

