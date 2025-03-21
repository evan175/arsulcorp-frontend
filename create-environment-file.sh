#!/bin/bash

mkdir -p frontend/src/environments

cat <<EOT > frontend/src/environments/environment.ts
export const environment = {
  apiUrl: '$apiUrl',
  testApiUrl: '$testApiUrl',
  cognito: JSON.parse('$cognito'),
  s3Url: '$s3Url'
};
EOT