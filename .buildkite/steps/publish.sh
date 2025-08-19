#!/bin/bash

set -e

export TOKEN=$(buildkite-agent secret get PUBLISH_PACKAGES_TOKEN)
echo "hello world"

npm set //packages.buildkite.com/test-engine-sandbox/hello-world/npm/:_authToken $TOKEN
npm pack
npm publish
