#!/bin/bash

touch should_log.txt

function log_memory {
    while test -f should_log.txt; do
        # cat /proc/meminfo
        echo hi
        sleep 1
    done
}

log_memory &

npm start

rm should_log.txt