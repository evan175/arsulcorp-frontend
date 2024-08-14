#!/bin/bash

# Create the environments directory if it doesn't exist
mkdir -p src/environments

# Write the environment.ts file
cat <<EOT > src/environments/environment.ts
export const environment = {
  apiUrl: '$apiUrl',
  cognito: JSON.parse('$cognito')
};
EOT