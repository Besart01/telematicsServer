import { ProtocolParser, parseIMEI, Data, GPRS } from 'complete-teltonika-parser';

export class TeltonikaParser {
    static processPacket(packet: Buffer) {
        const packetString = packet.toString('hex');
        
        // Check if this is an IMEI packet (17 bytes = 34 hex chars)
        if (packet.length === 17) {
            try {
                const imei = parseIMEI(packetString);
                return {
                    type: 'imei' as const,
                    imei,
                    raw: packetString
                };
            } catch (error: unknown) {
                const errorMessage = error instanceof Error ? error.message : 'Unknown error';
                throw new Error(`IMEI parsing error: ${errorMessage}`);
            }
        } else {
            try {
                const parsed = new ProtocolParser(packetString, false, (e: unknown) => {
                    const errorMessage = e instanceof Error ? e.message : 'Unknown IO Element error';
                    console.error('IO Element parsing error:', errorMessage);
                });

                return {
                    type: 'data' as const,
                    data: parsed,
                    raw: packetString
                };
            } catch (error: unknown) {
                const errorMessage = error instanceof Error ? error.message : 'Unknown error';
                throw new Error(`Data packet parsing error: ${errorMessage}`);
            }
        }
    }

    static parseDataPacket(packet: string): Data {
        try {
            const parsed = new ProtocolParser(packet, false, (e: unknown) => {
                const errorMessage = e instanceof Error ? e.message : 'Unknown IO Element error';
                console.error('IO Element parsing error:', errorMessage);
            });
            
            if (parsed.CodecType !== 'data sending') {
                throw new Error('Expected data sending packet');
            }

            return parsed.Content as Data;
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            throw new Error(`Data packet parsing failed: ${errorMessage}`);
        }
    }

    static parseGPRSPacket(packet: string): GPRS {
        try {
            const parsed = new ProtocolParser(packet, false, (e: unknown) => {
                const errorMessage = e instanceof Error ? e.message : 'Unknown IO Element error';
                console.error('IO Element parsing error:', errorMessage);
            });
            
            if (parsed.CodecType !== 'GPRS messages') {
                throw new Error('Expected GPRS packet');
            }

            return parsed.Content as GPRS;
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            throw new Error(`GPRS packet parsing failed: ${errorMessage}`);
        }
    }
}

export type ParsedResult = ReturnType<typeof TeltonikaParser.processPacket>;