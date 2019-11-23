#!/usr/bin/env bash

browserify example/example.ts -o example/example.dist.js -p [ tsify --noImplicitAny ]
rimraf dist/*.tmp-*