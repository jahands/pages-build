#!/bin/bash

function log_memory {
    while $true; do
        cat /proc/meminfo
        sleep 1
    done
}

log_memory &

npm start