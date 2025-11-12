# ChefOps Ansible Deployment

This playbook deploys the ChefOps backend container onto a Docker-enabled host.

## Usage

Update `inventory.ini` with the address of your target host, then run:

```bash
ansible-playbook -i inventory.ini deploy.yml
```

By default, the playbook pulls the tag defined in `chefops_docker_tag`. To roll back to the previously known-good release, set `chefops_use_previous=true`:

```bash
ansible-playbook -i inventory.ini deploy.yml -e chefops_use_previous=true
```

After deployment, the playbook validates the `/menu` endpoint using Ansible's `uri` module.

Configure Docker Hub credentials via environment variables (`DOCKERHUB_USERNAME` / `DOCKERHUB_TOKEN`) or Ansible Vault for production usage.
