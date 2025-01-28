#!/bin/bash

BIBAPI_VERSION=${BIBAPI_VERSION:1.0.1-dev}
BIBAPI_HOST=${BIBAPI_HOST:-https://bib-dev.inist.fr/api}

/kaniko/executor \
  --context "${CI_PROJECT_DIR}" \
  --dockerfile "${CI_PROJECT_DIR}/packages/api/Dockerfile" \
  --destination "vxnexus-registry.intra.inist.fr:8083/bibcnrs/api:1.0.1" \

/kaniko/executor \
  --context "${CI_PROJECT_DIR}" \
  --dockerfile "${CI_PROJECT_DIR}/packages/front/Dockerfile" \
  --destination "vxnexus-registry.intra.inist.fr:8083/bibcnrs/front:${BIBAPI_VERSION}" \
  --build-arg BIBAPI_HOST="${BIBAPI_HOST}" \

/kaniko/executor \
  --context "${CI_PROJECT_DIR}" \
  --dockerfile "${CI_PROJECT_DIR}/packages/admin/Dockerfile" \
  --destination "vxnexus-registry.intra.inist.fr:8083/bibcnrs/admin:${BIBAPI_VERSION}" \
  --build-arg BIBAPI_HOST="${BIBAPI_HOST}"