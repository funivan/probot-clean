#!/usr/bin/env bash
docker build -t probot-clean . && \
docker run -it  -p 127.0.0.1:3000:3000 --rm -v $(pwd):/www --name probot-clean probot-clean

