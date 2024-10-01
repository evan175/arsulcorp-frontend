#!/bin/bash

# Create the environments directory if it doesn't exist
mkdir -p frontend/src/environments

# Write the environment.ts file
cat <<EOT > frontend/src/environments/environment.ts
export const environment = {
  apiUrl: '$apiUrl',
  cognito: JSON.parse('$cognito'),
  s3Url: '$s3Url'
};
EOT