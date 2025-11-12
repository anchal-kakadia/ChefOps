# CSC 519: DevOps Project

## **Cloud Kitchen Platform - DevOps Pipeline Proposal**

### **Solo Project by:** *Anchal Kakadia (akakadi)*

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

## **Status Report - 1**

### **1. Team Members & Responsibilities**

**Solo project:** All work completed by Anchal Kakadia.

- Backend: Developed Express.js API, /menu endpoint, Docker packaging, testing, and linting.
- Frontend: Built minimal Vite/React SPA to consume backend APIs, handle error/empty states, and render menu items responsively.
- CI/CD & Deployment: Configured GitHub Actions workflow, Docker build/push automation, and Ansible deployment with rollback and health checks.

### **2. Accomplishments**

- Delivered a working minimal MERN app with backend /menu endpoint returning sample menu data.
- Backend exported for reuse in testing and production entry points.
- Unit testing and linting configured for backend; Jest tests ensure correct API responses.
- Frontend SPA fetches backend /menu endpoint, renders responsive cards, and manages error/loading states.
- Implemented CI/CD pipeline:
- GitHub Actions workflow runs on pull requests and merges to release.
- ESLint and Jest run automatically.
- Backend Docker image built, tagged, and pushed to Docker Hub.
- Deployment automation via Ansible:
- Pulls Docker images from Docker Hub.
- Runs containers and validates service availability.
- Supports rollback using previous stable Docker tags.
- Local development verified:
    - Backend runs on configurable port.
    - Frontend fetches from local backend or environment-specified URL.
    - Optional Docker build and Ansible deployment tested for local VM or cloud host.

**Representative GitHub commits:**

- Initialized Backend  - 87d57f4cb0aebdc98becec03933763993789c556
- Frontend minimal SPA integration - c65eedfc845df56d4955218622e60b110523a710
- CI/CD workflow & Ansible deployment - e5fdab3d189aa9e2129ca91c978f05781d1c53b9 & 655877d6dccade04743e2369a15e2a5500ae0913

### **3. Next Steps**

**1. Backend Enhancements**

- Expand /menu endpoint into full CRUD API for menu items: create, read, update, delete.
- Add admin authentication and role-based access control for secure updates.
- Implement price and availability triggers so that any changes in menu items can trigger the CI/CD pipeline automatically.
- Write additional unit and integration tests for the new API endpoints to ensure stability.
- Time estimate: 1 week for API expansion and triggers.

**2. CI/CD Pipeline Improvements**

- Extend GitHub Actions workflow to automatically trigger builds when menu item prices or availability change.
- Add integration tests in the pipeline to validate end-to-end backend and frontend functionality.
- According to Gitflow model, a typical CI/CD setup should trigger deployment to production on the main branch, not the release branch, so need to fix that.
- Implement multi-stage Docker builds for optimized image size and faster deployment.
- Time estimate: 1 week.

**5. Deployment and Rollback Enhancements**

- Expand Ansible playbook to:
    - Support rolling updates without downtime.
    - Redeploy previous stable Docker image automatically if health check fails.
    - Validate backend API availability using /menu after deployment.
    - Add host environment tagging in inventory for staging vs production deployment.
    - Time estimate: 2-3 days.


**Overall Estimated Completion:** ~2 weeks for all planned enhancements, including backend APIs, frontend admin features, CI/CD pipeline improvements, and deployment automation.

### **4. Retrospective**

**What worked well:**

- TDD for backend made API validation reliable.
- Dockerized backend with CI/CD workflow ensures consistent deployment.
- Minimal frontend SPA successfully integrates with backend APIs.

**What didn’t work well:**

- Rollup optional dependency bug on Apple Silicon required node\_modules and lockfile cleanup.
- Initial CI/CD testing gaps: Some workflow steps needed manual validation initially, particularly for rollback and health checks, highlighting the need for more robust automated testing.

**Lessons learned / improvements:**

- Automate rollback testing and include validation steps for multiple environments to ensure smoother deployments.
- Maintain clear instructions for both local development and deployment processes, including troubleshooting common environment-specific issues.
- Anticipate platform-specific package issues and provide preemptive instructions or fixes in project docs.