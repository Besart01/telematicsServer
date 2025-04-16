#!/bin/bash

# Configuration
HOST="localhost"
PORT="5025"
IMEI_HEX="000F333532303933303839313638383231"
PACKET_HEX="00000000000000900C010600000088494E493A323031392F372F323220373A3232205254433A323031392F372F323220373A3533205253543A32204552523A312053523A302042523A302043463A302046473A3020464C3A302054553A302F302055543A3020534D533A30204E4F4750533A303A3330204750533A31205341543A302052533A332052463A36352053463A31204D443A30010000C78F"

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