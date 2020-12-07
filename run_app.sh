#!/bin/sh
echo 'wait 10 secs for db to start'
sleep 10
while true
do
    node index.js
    sleep 300
done