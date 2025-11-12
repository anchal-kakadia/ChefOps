#!/usr/bin/env bash
set -euo pipefail

IMAGE_NAME="${IMAGE_NAME:-your-dockerhub-username/chefops-backend}"
IMAGE_TAG="${IMAGE_TAG:-$(git rev-parse --short HEAD)}"
BUILD_CONTEXT="${BUILD_CONTEXT:-app/backend}"

if [[ -n "${DOCKERHUB_USERNAME:-}" && -n "${DOCKERHUB_TOKEN:-}" ]]; then
  echo "Logging in to Docker Hub as ${DOCKERHUB_USERNAME}"
  echo "${DOCKERHUB_TOKEN}" | docker login --username "${DOCKERHUB_USERNAME}" --password-stdin
fi

echo "Building ${IMAGE_NAME}:${IMAGE_TAG} from ${BUILD_CONTEXT}"
docker build -t "${IMAGE_NAME}:${IMAGE_TAG}" -t "${IMAGE_NAME}:latest" "${BUILD_CONTEXT}"

echo "Pushing ${IMAGE_NAME}:${IMAGE_TAG}"
docker push "${IMAGE_NAME}:${IMAGE_TAG}"

echo "Pushing ${IMAGE_NAME}:latest"
docker push "${IMAGE_NAME}:latest"
