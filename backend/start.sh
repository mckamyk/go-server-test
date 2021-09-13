#!/bin/bash

cd backend
nodemon --watch './**/*.go' --signal SIGTERM --exec '"go" run ./main.go || exit 1'
