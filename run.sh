#!/usr/bin/env bash
docker build -t probot-clean . && \
docker run -it --rm -v $(pwd):/www --name probot-clean probot-clean

