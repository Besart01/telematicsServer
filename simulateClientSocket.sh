#!/bin/bash

# Configuration
HOST="localhost"
PORT="5025"
IMEI_HEX="xxxxxxxxxxxxxxxxxxx"
PACKET_HEX="hello"

# Create temporary files for binary data
IMEI_FILE=$(mktemp)
PACKET_FILE=$(mktemp)

# Convert hex to binary using printf (handles null bytes properly)
printf "%b" "$(echo "$IMEI_HEX" | sed 's/\([0-9A-F]\{2\}\)/\\x\1/gI')" > "$IMEI_FILE"
printf "%b" "$(echo "$PACKET_HEX" | sed 's/\([0-9A-F]\{2\}\)/\\x\1/gI')" > "$PACKET_FILE"

echo "Connecting to $HOST:$PORT..."
(
  # Send IMEI immediately
  cat "$IMEI_FILE"
  
  # Wait 10 seconds
  sleep 10
  
  # Send data packet
  cat "$PACKET_FILE"
  
  # Keep connection open for 5 more seconds
  sleep 5
) | nc "$HOST" "$PORT"

# Clean up
rm -f "$IMEI_FILE" "$PACKET_FILE"
echo "Test sequence completed."