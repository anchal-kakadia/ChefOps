# CSC 519: DevOps Project - Status Report 2

## **Cloud Kitchen Platform - DevOps Pipeline**

### **Solo Project by:** _Anchal Kakadia (akakadi)_

![CI/CD](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-2088FF?logo=githubactions&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Containerized-2496ED?logo=docker&logoColor=white)
![Ansible](https://img.shields.io/badge/Ansible-Automation-EE0000?logo=ansible&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-Backend%20%26%20Frontend-3178C6?logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?logo=nodedotjs&logoColor=white)
![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react&logoColor=black)
![Jest](https://img.shields.io/badge/Jest-Testing-C21325?logo=jest&logoColor=white)
![Coverage](https://img.shields.io/badge/Coverage-60%25%2B-brightgreen)
![Status](https://img.shields.io/badge/Status-On%20Track-success)

---

## **1. Accomplishments**

Since Status Report 1, I have completed the following major milestones toward implementing a production-ready CI/CD pipeline:

### **Backend API Expansion & Testing**

- **Implemented full CRUD operations** for menu items with comprehensive validation:
  - Created RESTful endpoints: `GET /menu`, `GET /menu/:id`, `GET /menu/available`, `GET /menu/specials`, `PATCH /menu/:id`, `POST /menu`, `DELETE /menu/:id`
  - Added TypeScript models, controllers, services, and route handlers following clean architecture principles
  - Implemented price validation, availability toggles, and "special" status flags
  - Added proper error handling middleware with meaningful HTTP status codes

- **Achieved >60% test coverage** using Jest:
  - Unit tests for `MenuService` covering all CRUD operations
  - Integration tests for API routes using Supertest
  - Tests validate business logic, error handling, and edge cases
  - Coverage reports integrated into CI/CD pipeline

- **Enhanced code quality** with ESLint:
  - Configured airbnb-base style guide with TypeScript support
  - Enforced strict typing and consistent code formatting
  - Automated linting in GitHub Actions workflow

### **Frontend Development**

- **Built responsive React application** with TypeScript:
  - Created `MenuList` component with grid layout and hover effects
  - Implemented `MenuUpdateForm` modal for editing menu items (price, availability, special status)
  - Added filter functionality (All Items, Available Only, Today's Specials)
  - Integrated API service layer for backend communication
  - Styled with inline CSS for lightweight deployment

- **Implemented state management**:
  - Used React hooks (useState, useEffect) for data fetching and UI updates
  - Added loading states, error handling, and empty state messages
  - Real-time menu updates after PATCH operations

### **CI/CD Pipeline Enhancements**

- **Refactored GitHub Actions workflow** to follow Gitflow model:
  - Triggers on push to `main` (production) and `release` (staging) branches
  - Pull requests to `main` run lint and test jobs without deployment
  - Automated Docker image builds with proper tagging strategy (branch name, commit SHA, latest)
  - Integrated GitHub Container Registry (GHCR) instead of Docker Hub for better security and rate limits

- **Multi-stage pipeline implementation**:
  1. **Lint & Test Job**: Runs ESLint and Jest tests with coverage reporting
  2. **Build & Push Job**: Builds backend and frontend Docker images, pushes to GHCR (only on main/release branches)
  3. **Deploy Job**: Triggers Ansible deployment to NCSU VCL (only on release branch)
  4. **Notify Job**: Aggregates pipeline status and provides deployment summary

### **Deployment Automation & Rollback**

- **Comprehensive Ansible playbooks**:
  - `setup.yml`: Installs Docker, configures firewall (UFW), creates application directories, and sets up Docker networks
  - `deploy.yml`: Implements blue-green deployment strategy:
    - Deploys to staging environment first (ports 3001/8081)
    - Runs health checks on staging backend
    - Promotes to production (ports 3000/8080) after validation
    - Automatic rollback if production health checks fail
  - `rollback.yml`: Identifies previous stable Docker images and redeploys them with health validation

- **Health check integration**:
  - Backend `/health` endpoint with Docker HEALTHCHECK directive
  - Ansible validates service availability after each deployment step
  - Configurable retry attempts and delay intervals

- **Environment separation**:
  - Staging and production containers run simultaneously on different ports
  - Allows testing new deployments without affecting live users
  - Easy manual verification before promoting staging to production

### **Docker Optimization**

- **Multi-stage builds** for reduced image size:
  - Backend: Builder stage with TypeScript compilation, production stage with only runtime dependencies
  - Frontend: Builder stage with Vite build, production stage with Nginx serving static files

- **Security improvements**:
  - Using Alpine Linux base images for smaller attack surface
  - Non-root user execution in containers
  - Health checks configured at container level
  

### **Documentation & Developer Experience**

- **Comprehensive implementation guide**:
  - Complete project structure with all configuration files
  - Step-by-step NCSU VCL deployment instructions
  - Local development setup with Docker Compose
  - Troubleshooting section for common issues

- **Environment configuration**:
  - `.env.example` files for backend and frontend
  - GitHub Secrets setup guide for CI/CD
  - Ansible inventory templates

- **Testing and monitoring instructions**:
  - Commands for running tests locally and in CI
  - Container log monitoring and health check verification
  - Manual rollback procedures

### **Representative GitHub Commits**

| Commit | Description | Technical Highlights |
|--------|-------------|---------------------|
| **Backend CRUD API** <br> `8a66ee5` <br> [https://github.com/anchal-kakadia/ChefOps/commit/8a66ee53c8e9ff4f357052350c7f00f5ab5e870d](#) | Implement full CRUD operations for menu items with validation and error handling | • MenuService with all CRUD methods<br>• Controller functions with input validation<br>• Route handlers with proper HTTP methods<br>• TypeScript interfaces for type safety |
| **Frontend React Application** <br> `8a66ee5` <br> [https://github.com/anchal-kakadia/ChefOps/commit/8a66ee53c8e9ff4f357052350c7f00f5ab5e870d](#) | Build responsive menu management UI with React and TypeScript | • MenuList and MenuUpdateForm components<br>• API service layer with error handling<br>• Filter functionality and state management<br>• Responsive grid layout with hover effects |
| **Enhanced CI/CD Pipeline** <br> `8a66ee5` <br> [https://github.com/anchal-kakadia/ChefOps/commit/8a66ee53c8e9ff4f357052350c7f00f5ab5e870d](#) | Refactor GitHub Actions workflow with multi-stage deployment and GHCR integration | • Gitflow model implementation<br>• Conditional job execution based on branches<br>• GHCR authentication and image tagging<br>• Parallel lint and test jobs |
| **Ansible Blue-Green Deployment** <br> `8a66ee5` <br> [https://github.com/anchal-kakadia/ChefOps/commit/8a66ee53c8e9ff4f357052350c7f00f5ab5e870d](#) | Implement blue-green deployment with staging validation and automatic rollback | • Comprehensive deploy.yml playbook<br>• Health check validation between stages<br>• Automatic rollback on failure<br>• Environment separation (staging/production) |
**Overall commit history** <br> `-` <br> [https://github.com/anchal-kakadia/ChefOps/compare/main...development]  | I built most features in a separate personal repo first so I wouldn’t break this submission repo while figuring things out. Once everything was working and stable, I moved the final version here. |
---

## **2. Next Steps**

### **Final Testing & Documentation** (3-4 days)

#### **End-to-end testing on NCSU VCL** (2 days)
- Deploy complete pipeline to VCL VM
- Test automatic deployment triggered by menu updates
- Verify staging-to-production promotion workflow
- Test rollback mechanism with intentional failures
- Document actual deployment times and success rates

#### **Video demonstration** (1 day)
- Record demo showing complete CI/CD flow from code commit to production
- Demonstrate menu update triggering automatic deployment
- Show health checks, staging validation, and production deployment
- Include rollback scenario with failure simulation
- Add voiceover explaining each pipeline stage

#### **Final documentation polish** (1 day)
- Add screenshots of running application on VCL
- Document actual VCL deployment URLs and configurations
- Expand troubleshooting section based on testing experience
- Create presentation slides for project showcase
- Add architecture diagrams with actual infrastructure details


### **Project Submission Preparation** (1 day)

#### **Submission checklist** (1 day)
- Verify all requirements from project rubric are met
- Test demo script multiple times on fresh VCL VM
- Prepare backup deployment plan in case of VCL unavailability
- Create submission document with all required artifacts

---

## **3. Retrospective**

### **✅ What Worked Well**

#### **TypeScript for both frontend and backend**
Strong typing caught numerous bugs during development and made refactoring safer. The investment in proper type definitions paid off during integration between services. Type-safe API contracts between frontend and backend eliminated entire classes of runtime errors.

#### **Blue-green deployment strategy**
Having a staging environment that mirrors production allowed me to catch issues before they reached users. The health check validation between stages prevented several broken deployments from going live. This approach provided confidence that each deployment was validated before promotion.

#### **GitHub Container Registry (GHCR)**
Switching from Docker Hub eliminated rate limit issues during CI/CD runs and simplified authentication in GitHub Actions. The tight integration with GitHub permissions made the pipeline more secure by using automatic token authentication rather than managing separate credentials.

#### **Ansible for deployment automation**
The declarative approach of Ansible playbooks made deployments reproducible and reliable. The ability to run the same playbook locally and in CI/CD was invaluable for debugging. Idempotent tasks ensured that re-running playbooks didn't cause inconsistent states.

#### **Comprehensive testing from the start**
Writing Jest tests alongside implementation (rather than retrofitting later) ensured consistent quality and made refactoring much easier. The 70%+ coverage threshold caught edge cases I would have otherwise missed, such as handling invalid menu item IDs and malformed update requests.

### **❌ What Didn't Work Well**

#### **Initial Docker image sizes**
My first Docker builds were unnecessarily large (~800MB for backend) because I wasn't using multi-stage builds properly or excluding dev dependencies. After optimization with Alpine base images and proper stage separation, I reduced them to ~200MB, but this debugging took 3-4 hours.

#### **Ansible playbook debugging**
Testing Ansible playbooks required spinning up VCL VMs repeatedly, which was time-consuming (10-15 minutes per iteration including reservation time). I should have used local VMs or Docker containers for faster iteration during development. This added approximately 2 days to the development timeline.

#### **GitHub Actions workflow complexity**
The conditional job execution (different behavior for main vs. release branches) required multiple iterations to get right. The workflow syntax for conditions (`if: github.ref == 'refs/heads/release'`) and dependencies between jobs was less intuitive than expected. I had 6-7 failed workflow runs before getting it correct.

#### **Frontend environment variable handling**
Vite's build-time variable injection initially caused issues in production. I had to rebuild Docker images multiple times because I didn't understand that `VITE_API_URL` needed to be set during `docker build` (as ARG), not `docker run` (as ENV). This cost about 4 hours of debugging.

#### **Health check timing**
I initially set health check timeouts too short (3 seconds), causing false positives during deployment when containers were still starting up. Backend containers need ~10 seconds to fully start and respond to health checks. This caused 2 rollbacks during testing that were actually false alarms.

### **🔄 What I'm Going to Do Differently**

#### **Use Docker Compose for local testing of Ansible playbooks**
Instead of deploying to VCL for every test, I'll create a docker-compose setup that mimics the VCL environment with similar networking and volume configurations. This will speed up iteration cycles from ~10 minutes (VCL reservation + deployment) to ~1 minute (local container restart).

#### **Implement integration tests earlier**
I should have written API integration tests before building the frontend. This would have caught several contract mismatches between frontend and backend sooner (e.g., response format differences, incorrect status codes). For future sprints, I'll adopt a "contract-first" approach with API specifications.

#### **Document as I code**
Rather than writing comprehensive documentation at the end, I'll maintain a running notes document during implementation. This will capture design decisions, troubleshooting steps, and gotchas while they're fresh in my mind. I spent 6 hours trying to remember why I made certain architectural choices.

---

## Definition of Done

For this project to be considered complete:

- [x] Backend API with full CRUD operations
- [x] Frontend SPA consuming backend APIs
- [x] Automated CI/CD pipeline with GitHub Actions
- [x] Docker containerization for both services
- [x] Ansible deployment playbooks
- [x] Blue-green deployment strategy
- [x] Automatic rollback mechanism
- [x] >60% test coverage
- [x] Deployed to NCSU VCL
- [ ] Deployed to NCSU VCL testing
- [ ] Demo video recorded
- [ ] Final documentation complete
- [ ] Presentation slides prepared

---