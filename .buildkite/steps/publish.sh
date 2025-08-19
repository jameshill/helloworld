#!/bin/bash

set -e

export TOKEN=$(buildkite-agent secret get PUBLISH_PACKAGES_TOKEN)
echo "hello world"
