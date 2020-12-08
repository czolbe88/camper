#!/bin/sh
echo 'wait 30 secs for db to start'
sleep 30
while true
do
    node index.js
    sleep 300
done