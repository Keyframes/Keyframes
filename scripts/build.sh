#!/usr/bin/env bash

tsc
mv dist/keyframes.js dist/keyframes.tmp-x.js
uglifyjs --beautify --compress=drop_console=true -- dist/keyframes.tmp-x.js > dist/keyframes.js
browserify src/keyframes.ts -o dist/keyframes.umd.js -p [ tsify --noImplicitAny ]
uglifyjs --compress=drop_console=true --mangle -- dist/keyframes.umd.js > dist/keyframes.dist.js
rimraf dist/*.tmp-*