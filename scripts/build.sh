#!/usr/bin/env bash

tsc
browserify src/keyframes.ts -o dist/keyframes.umd.js -p [ tsify --noImplicitAny ]
uglifyjs --compress --mangle -- dist/keyframes.js > dist/keyframes.min.js
uglifyjs --compress --mangle -- dist/keyframes.umd.js > dist/keyframes.dist.js