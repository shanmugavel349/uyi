#!/bin/bash
echo "🚀 Starting UYIR Mobile Public HTTPS Tunnel..."
echo "Connecting to tunnel service (No password required)..."
ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -R 80:localhost:5173 nokey@localhost.run
