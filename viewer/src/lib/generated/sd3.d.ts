import * as $protobuf from "protobufjs";
import Long = require("long");
/** Namespace sd3. */
export namespace sd3 {

    /** Properties of a Cyber. */
    interface ICyber {

        /** Cyber entities */
        entities?: (sd3.Cyber.INetworkEntity[]|null);

        /** Cyber flows */
        flows?: (sd3.Cyber.ITrafficFlow[]|null);
    }

    /** Represents a Cyber. */
    class Cyber implements ICyber {

        /**
         * Constructs a new Cyber.
         * @param [properties] Properties to set
         */
        constructor(properties?: sd3.ICyber);

        /** Cyber entities. */
        public entities: sd3.Cyber.INetworkEntity[];

        /** Cyber flows. */
        public flows: sd3.Cyber.ITrafficFlow[];

        /**
         * Decodes a Cyber message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Cyber
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): sd3.Cyber;

        /**
         * Decodes a Cyber message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Cyber
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): sd3.Cyber;

        /**
         * Verifies a Cyber message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Cyber message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Cyber
         */
        public static fromObject(object: { [k: string]: any }): sd3.Cyber;

        /**
         * Creates a plain object from a Cyber message. Also converts values to other types if specified.
         * @param message Cyber
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: sd3.Cyber, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Cyber to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Cyber
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    namespace Cyber {

        /** Transport enum. */
        enum Transport {
            TRANSPORT_UNKNOWN = 0,
            TCP = 1,
            UDP = 2,
            ICMP = 3,
            IGMP = 4
        }

        /** AppProtocol enum. */
        enum AppProtocol {
            APP_UNKNOWN = 0,
            HTTP = 1,
            TLS = 2,
            DNS = 3,
            SSH = 4,
            IEEE_2030_5 = 5,
            EPHEMERAL = 6
        }

        /** Properties of a NetworkEntity. */
        interface INetworkEntity {

            /** NetworkEntity id */
            id?: (number|null);

            /** NetworkEntity ipAddress */
            ipAddress?: (string|null);

            /** NetworkEntity label */
            label?: (string|null);

            /** NetworkEntity role */
            role?: (string|null);

            /** NetworkEntity gridComponentId */
            gridComponentId?: (number|null);
        }

        /** Represents a NetworkEntity. */
        class NetworkEntity implements INetworkEntity {

            /**
             * Constructs a new NetworkEntity.
             * @param [properties] Properties to set
             */
            constructor(properties?: sd3.Cyber.INetworkEntity);

            /** NetworkEntity id. */
            public id: number;

            /** NetworkEntity ipAddress. */
            public ipAddress: string;

            /** NetworkEntity label. */
            public label: string;

            /** NetworkEntity role. */
            public role: string;

            /** NetworkEntity gridComponentId. */
            public gridComponentId: number;

            /**
             * Decodes a NetworkEntity message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns NetworkEntity
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): sd3.Cyber.NetworkEntity;

            /**
             * Decodes a NetworkEntity message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns NetworkEntity
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): sd3.Cyber.NetworkEntity;

            /**
             * Verifies a NetworkEntity message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a NetworkEntity message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns NetworkEntity
             */
            public static fromObject(object: { [k: string]: any }): sd3.Cyber.NetworkEntity;

            /**
             * Creates a plain object from a NetworkEntity message. Also converts values to other types if specified.
             * @param message NetworkEntity
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: sd3.Cyber.NetworkEntity, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this NetworkEntity to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for NetworkEntity
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a TrafficFlow. */
        interface ITrafficFlow {

            /** TrafficFlow sourceId */
            sourceId?: (number|null);

            /** TrafficFlow destId */
            destId?: (number|null);

            /** TrafficFlow timeseries */
            timeseries?: (sd3.Cyber.TrafficFlow.ITimePoint[]|null);
        }

        /** Represents a TrafficFlow. */
        class TrafficFlow implements ITrafficFlow {

            /**
             * Constructs a new TrafficFlow.
             * @param [properties] Properties to set
             */
            constructor(properties?: sd3.Cyber.ITrafficFlow);

            /** TrafficFlow sourceId. */
            public sourceId: number;

            /** TrafficFlow destId. */
            public destId: number;

            /** TrafficFlow timeseries. */
            public timeseries: sd3.Cyber.TrafficFlow.ITimePoint[];

            /**
             * Decodes a TrafficFlow message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns TrafficFlow
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): sd3.Cyber.TrafficFlow;

            /**
             * Decodes a TrafficFlow message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns TrafficFlow
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): sd3.Cyber.TrafficFlow;

            /**
             * Verifies a TrafficFlow message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a TrafficFlow message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns TrafficFlow
             */
            public static fromObject(object: { [k: string]: any }): sd3.Cyber.TrafficFlow;

            /**
             * Creates a plain object from a TrafficFlow message. Also converts values to other types if specified.
             * @param message TrafficFlow
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: sd3.Cyber.TrafficFlow, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this TrafficFlow to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for TrafficFlow
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        namespace TrafficFlow {

            /** Properties of a TimePoint. */
            interface ITimePoint {

                /** TimePoint seconds */
                seconds?: (number|null);

                /** TimePoint bytes */
                bytes?: (number|null);

                /** TimePoint packets */
                packets?: (number|null);

                /** TimePoint protocols */
                protocols?: (sd3.Cyber.TrafficFlow.TimePoint.IProtocolBreakdown[]|null);
            }

            /** Represents a TimePoint. */
            class TimePoint implements ITimePoint {

                /**
                 * Constructs a new TimePoint.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: sd3.Cyber.TrafficFlow.ITimePoint);

                /** TimePoint seconds. */
                public seconds: number;

                /** TimePoint bytes. */
                public bytes: number;

                /** TimePoint packets. */
                public packets: number;

                /** TimePoint protocols. */
                public protocols: sd3.Cyber.TrafficFlow.TimePoint.IProtocolBreakdown[];

                /**
                 * Decodes a TimePoint message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns TimePoint
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): sd3.Cyber.TrafficFlow.TimePoint;

                /**
                 * Decodes a TimePoint message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns TimePoint
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): sd3.Cyber.TrafficFlow.TimePoint;

                /**
                 * Verifies a TimePoint message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a TimePoint message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns TimePoint
                 */
                public static fromObject(object: { [k: string]: any }): sd3.Cyber.TrafficFlow.TimePoint;

                /**
                 * Creates a plain object from a TimePoint message. Also converts values to other types if specified.
                 * @param message TimePoint
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: sd3.Cyber.TrafficFlow.TimePoint, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this TimePoint to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for TimePoint
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            namespace TimePoint {

                /** Properties of a ProtocolBreakdown. */
                interface IProtocolBreakdown {

                    /** ProtocolBreakdown transport */
                    transport?: (sd3.Cyber.Transport|null);

                    /** ProtocolBreakdown app */
                    app?: (sd3.Cyber.AppProtocol|null);

                    /** ProtocolBreakdown bytes */
                    bytes?: (number|null);

                    /** ProtocolBreakdown packets */
                    packets?: (number|null);

                    /** ProtocolBreakdown rstCount */
                    rstCount?: (number|null);
                }

                /** Represents a ProtocolBreakdown. */
                class ProtocolBreakdown implements IProtocolBreakdown {

                    /**
                     * Constructs a new ProtocolBreakdown.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: sd3.Cyber.TrafficFlow.TimePoint.IProtocolBreakdown);

                    /** ProtocolBreakdown transport. */
                    public transport: sd3.Cyber.Transport;

                    /** ProtocolBreakdown app. */
                    public app: sd3.Cyber.AppProtocol;

                    /** ProtocolBreakdown bytes. */
                    public bytes: number;

                    /** ProtocolBreakdown packets. */
                    public packets: number;

                    /** ProtocolBreakdown rstCount. */
                    public rstCount: number;

                    /**
                     * Decodes a ProtocolBreakdown message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns ProtocolBreakdown
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): sd3.Cyber.TrafficFlow.TimePoint.ProtocolBreakdown;

                    /**
                     * Decodes a ProtocolBreakdown message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns ProtocolBreakdown
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): sd3.Cyber.TrafficFlow.TimePoint.ProtocolBreakdown;

                    /**
                     * Verifies a ProtocolBreakdown message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a ProtocolBreakdown message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns ProtocolBreakdown
                     */
                    public static fromObject(object: { [k: string]: any }): sd3.Cyber.TrafficFlow.TimePoint.ProtocolBreakdown;

                    /**
                     * Creates a plain object from a ProtocolBreakdown message. Also converts values to other types if specified.
                     * @param message ProtocolBreakdown
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: sd3.Cyber.TrafficFlow.TimePoint.ProtocolBreakdown, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this ProtocolBreakdown to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };

                    /**
                     * Gets the default type url for ProtocolBreakdown
                     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                     * @returns The default type url
                     */
                    public static getTypeUrl(typeUrlPrefix?: string): string;
                }
            }
        }
    }

    /** Properties of a Scenario. */
    interface IScenario {

        /** Scenario name */
        name?: (string|null);

        /** Scenario lines */
        lines?: (sd3.Scenario.ILine[]|null);

        /** Scenario transformers */
        transformers?: (sd3.Scenario.ITransformer[]|null);

        /** Scenario loads */
        loads?: (sd3.Scenario.ILoad[]|null);

        /** Scenario buses */
        buses?: (sd3.Scenario.IBus[]|null);

        /** Scenario breakers */
        breakers?: (sd3.Scenario.IBreaker[]|null);

        /** Scenario circuits */
        circuits?: (sd3.Scenario.ICircuit[]|null);

        /** Scenario regulators */
        regulators?: (sd3.Scenario.IRegulator[]|null);

        /** Scenario capacitors */
        capacitors?: (sd3.Scenario.ICapacitor[]|null);

        /** Scenario startTime */
        startTime?: (number|Long|null);

        /** Scenario endTime */
        endTime?: (number|Long|null);

        /** Scenario cyber */
        cyber?: (sd3.ICyber|null);

        /** Scenario batteries */
        batteries?: (sd3.Scenario.IBattery[]|null);

        /** Scenario buildings */
        buildings?: (sd3.Scenario.IBuilding[]|null);
    }

    /** Represents a Scenario. */
    class Scenario implements IScenario {

        /**
         * Constructs a new Scenario.
         * @param [properties] Properties to set
         */
        constructor(properties?: sd3.IScenario);

        /** Scenario name. */
        public name: string;

        /** Scenario lines. */
        public lines: sd3.Scenario.ILine[];

        /** Scenario transformers. */
        public transformers: sd3.Scenario.ITransformer[];

        /** Scenario loads. */
        public loads: sd3.Scenario.ILoad[];

        /** Scenario buses. */
        public buses: sd3.Scenario.IBus[];

        /** Scenario breakers. */
        public breakers: sd3.Scenario.IBreaker[];

        /** Scenario circuits. */
        public circuits: sd3.Scenario.ICircuit[];

        /** Scenario regulators. */
        public regulators: sd3.Scenario.IRegulator[];

        /** Scenario capacitors. */
        public capacitors: sd3.Scenario.ICapacitor[];

        /** Scenario startTime. */
        public startTime: (number|Long);

        /** Scenario endTime. */
        public endTime: (number|Long);

        /** Scenario cyber. */
        public cyber?: (sd3.ICyber|null);

        /** Scenario batteries. */
        public batteries: sd3.Scenario.IBattery[];

        /** Scenario buildings. */
        public buildings: sd3.Scenario.IBuilding[];

        /**
         * Decodes a Scenario message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Scenario
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): sd3.Scenario;

        /**
         * Decodes a Scenario message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Scenario
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): sd3.Scenario;

        /**
         * Verifies a Scenario message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Scenario message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Scenario
         */
        public static fromObject(object: { [k: string]: any }): sd3.Scenario;

        /**
         * Creates a plain object from a Scenario message. Also converts values to other types if specified.
         * @param message Scenario
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: sd3.Scenario, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Scenario to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Scenario
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    namespace Scenario {

        /** Properties of a Line. */
        interface ILine {

            /** Line id */
            id?: (number|null);

            /** Line timeseries */
            timeseries?: (sd3.Scenario.Line.ITimePoint[]|null);
        }

        /** Represents a Line. */
        class Line implements ILine {

            /**
             * Constructs a new Line.
             * @param [properties] Properties to set
             */
            constructor(properties?: sd3.Scenario.ILine);

            /** Line id. */
            public id: number;

            /** Line timeseries. */
            public timeseries: sd3.Scenario.Line.ITimePoint[];

            /**
             * Decodes a Line message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Line
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): sd3.Scenario.Line;

            /**
             * Decodes a Line message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Line
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): sd3.Scenario.Line;

            /**
             * Verifies a Line message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Line message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Line
             */
            public static fromObject(object: { [k: string]: any }): sd3.Scenario.Line;

            /**
             * Creates a plain object from a Line message. Also converts values to other types if specified.
             * @param message Line
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: sd3.Scenario.Line, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Line to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for Line
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        namespace Line {

            /** Properties of a TimePoint. */
            interface ITimePoint {

                /** TimePoint seconds */
                seconds?: (number|null);

                /** TimePoint voltage */
                voltage?: (number|null);

                /** TimePoint current */
                current?: (number|null);

                /** TimePoint activePower */
                activePower?: (number|null);

                /** TimePoint reactivePower */
                reactivePower?: (number|null);
            }

            /** Represents a TimePoint. */
            class TimePoint implements ITimePoint {

                /**
                 * Constructs a new TimePoint.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: sd3.Scenario.Line.ITimePoint);

                /** TimePoint seconds. */
                public seconds: number;

                /** TimePoint voltage. */
                public voltage: number;

                /** TimePoint current. */
                public current: number;

                /** TimePoint activePower. */
                public activePower: number;

                /** TimePoint reactivePower. */
                public reactivePower: number;

                /**
                 * Decodes a TimePoint message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns TimePoint
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): sd3.Scenario.Line.TimePoint;

                /**
                 * Decodes a TimePoint message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns TimePoint
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): sd3.Scenario.Line.TimePoint;

                /**
                 * Verifies a TimePoint message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a TimePoint message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns TimePoint
                 */
                public static fromObject(object: { [k: string]: any }): sd3.Scenario.Line.TimePoint;

                /**
                 * Creates a plain object from a TimePoint message. Also converts values to other types if specified.
                 * @param message TimePoint
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: sd3.Scenario.Line.TimePoint, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this TimePoint to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for TimePoint
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }
        }

        /** Properties of a Transformer. */
        interface ITransformer {

            /** Transformer id */
            id?: (number|null);

            /** Transformer timeseries */
            timeseries?: (sd3.Scenario.Transformer.ITimePoint[]|null);
        }

        /** Represents a Transformer. */
        class Transformer implements ITransformer {

            /**
             * Constructs a new Transformer.
             * @param [properties] Properties to set
             */
            constructor(properties?: sd3.Scenario.ITransformer);

            /** Transformer id. */
            public id: number;

            /** Transformer timeseries. */
            public timeseries: sd3.Scenario.Transformer.ITimePoint[];

            /**
             * Decodes a Transformer message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Transformer
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): sd3.Scenario.Transformer;

            /**
             * Decodes a Transformer message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Transformer
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): sd3.Scenario.Transformer;

            /**
             * Verifies a Transformer message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Transformer message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Transformer
             */
            public static fromObject(object: { [k: string]: any }): sd3.Scenario.Transformer;

            /**
             * Creates a plain object from a Transformer message. Also converts values to other types if specified.
             * @param message Transformer
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: sd3.Scenario.Transformer, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Transformer to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for Transformer
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        namespace Transformer {

            /** Properties of a TimePoint. */
            interface ITimePoint {

                /** TimePoint seconds */
                seconds?: (number|null);

                /** TimePoint voltage */
                voltage?: (number|null);

                /** TimePoint current */
                current?: (number|null);

                /** TimePoint activePower */
                activePower?: (number|null);

                /** TimePoint reactivePower */
                reactivePower?: (number|null);
            }

            /** Represents a TimePoint. */
            class TimePoint implements ITimePoint {

                /**
                 * Constructs a new TimePoint.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: sd3.Scenario.Transformer.ITimePoint);

                /** TimePoint seconds. */
                public seconds: number;

                /** TimePoint voltage. */
                public voltage: number;

                /** TimePoint current. */
                public current: number;

                /** TimePoint activePower. */
                public activePower: number;

                /** TimePoint reactivePower. */
                public reactivePower: number;

                /**
                 * Decodes a TimePoint message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns TimePoint
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): sd3.Scenario.Transformer.TimePoint;

                /**
                 * Decodes a TimePoint message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns TimePoint
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): sd3.Scenario.Transformer.TimePoint;

                /**
                 * Verifies a TimePoint message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a TimePoint message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns TimePoint
                 */
                public static fromObject(object: { [k: string]: any }): sd3.Scenario.Transformer.TimePoint;

                /**
                 * Creates a plain object from a TimePoint message. Also converts values to other types if specified.
                 * @param message TimePoint
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: sd3.Scenario.Transformer.TimePoint, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this TimePoint to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for TimePoint
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }
        }

        /** Properties of a Load. */
        interface ILoad {

            /** Load id */
            id?: (number|null);

            /** Load timeseries */
            timeseries?: (sd3.Scenario.Load.ITimePoint[]|null);
        }

        /** Represents a Load. */
        class Load implements ILoad {

            /**
             * Constructs a new Load.
             * @param [properties] Properties to set
             */
            constructor(properties?: sd3.Scenario.ILoad);

            /** Load id. */
            public id: number;

            /** Load timeseries. */
            public timeseries: sd3.Scenario.Load.ITimePoint[];

            /**
             * Decodes a Load message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Load
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): sd3.Scenario.Load;

            /**
             * Decodes a Load message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Load
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): sd3.Scenario.Load;

            /**
             * Verifies a Load message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Load message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Load
             */
            public static fromObject(object: { [k: string]: any }): sd3.Scenario.Load;

            /**
             * Creates a plain object from a Load message. Also converts values to other types if specified.
             * @param message Load
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: sd3.Scenario.Load, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Load to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for Load
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        namespace Load {

            /** Properties of a TimePoint. */
            interface ITimePoint {

                /** TimePoint seconds */
                seconds?: (number|null);

                /** TimePoint voltage */
                voltage?: (number|null);

                /** TimePoint current */
                current?: (number|null);

                /** TimePoint activePower */
                activePower?: (number|null);

                /** TimePoint reactivePower */
                reactivePower?: (number|null);
            }

            /** Represents a TimePoint. */
            class TimePoint implements ITimePoint {

                /**
                 * Constructs a new TimePoint.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: sd3.Scenario.Load.ITimePoint);

                /** TimePoint seconds. */
                public seconds: number;

                /** TimePoint voltage. */
                public voltage: number;

                /** TimePoint current. */
                public current: number;

                /** TimePoint activePower. */
                public activePower: number;

                /** TimePoint reactivePower. */
                public reactivePower: number;

                /**
                 * Decodes a TimePoint message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns TimePoint
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): sd3.Scenario.Load.TimePoint;

                /**
                 * Decodes a TimePoint message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns TimePoint
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): sd3.Scenario.Load.TimePoint;

                /**
                 * Verifies a TimePoint message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a TimePoint message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns TimePoint
                 */
                public static fromObject(object: { [k: string]: any }): sd3.Scenario.Load.TimePoint;

                /**
                 * Creates a plain object from a TimePoint message. Also converts values to other types if specified.
                 * @param message TimePoint
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: sd3.Scenario.Load.TimePoint, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this TimePoint to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for TimePoint
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }
        }

        /** Properties of a Bus. */
        interface IBus {

            /** Bus id */
            id?: (number|null);

            /** Bus timeseries */
            timeseries?: (sd3.Scenario.Bus.ITimePoint[]|null);
        }

        /** Represents a Bus. */
        class Bus implements IBus {

            /**
             * Constructs a new Bus.
             * @param [properties] Properties to set
             */
            constructor(properties?: sd3.Scenario.IBus);

            /** Bus id. */
            public id: number;

            /** Bus timeseries. */
            public timeseries: sd3.Scenario.Bus.ITimePoint[];

            /**
             * Decodes a Bus message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Bus
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): sd3.Scenario.Bus;

            /**
             * Decodes a Bus message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Bus
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): sd3.Scenario.Bus;

            /**
             * Verifies a Bus message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Bus message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Bus
             */
            public static fromObject(object: { [k: string]: any }): sd3.Scenario.Bus;

            /**
             * Creates a plain object from a Bus message. Also converts values to other types if specified.
             * @param message Bus
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: sd3.Scenario.Bus, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Bus to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for Bus
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        namespace Bus {

            /** Properties of a TimePoint. */
            interface ITimePoint {

                /** TimePoint seconds */
                seconds?: (number|null);

                /** TimePoint voltage */
                voltage?: (number|null);
            }

            /** Represents a TimePoint. */
            class TimePoint implements ITimePoint {

                /**
                 * Constructs a new TimePoint.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: sd3.Scenario.Bus.ITimePoint);

                /** TimePoint seconds. */
                public seconds: number;

                /** TimePoint voltage. */
                public voltage: number;

                /**
                 * Decodes a TimePoint message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns TimePoint
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): sd3.Scenario.Bus.TimePoint;

                /**
                 * Decodes a TimePoint message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns TimePoint
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): sd3.Scenario.Bus.TimePoint;

                /**
                 * Verifies a TimePoint message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a TimePoint message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns TimePoint
                 */
                public static fromObject(object: { [k: string]: any }): sd3.Scenario.Bus.TimePoint;

                /**
                 * Creates a plain object from a TimePoint message. Also converts values to other types if specified.
                 * @param message TimePoint
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: sd3.Scenario.Bus.TimePoint, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this TimePoint to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for TimePoint
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }
        }

        /** Properties of a Breaker. */
        interface IBreaker {

            /** Breaker id */
            id?: (number|null);

            /** Breaker timeseries */
            timeseries?: (sd3.Scenario.Breaker.ITimePoint[]|null);
        }

        /** Represents a Breaker. */
        class Breaker implements IBreaker {

            /**
             * Constructs a new Breaker.
             * @param [properties] Properties to set
             */
            constructor(properties?: sd3.Scenario.IBreaker);

            /** Breaker id. */
            public id: number;

            /** Breaker timeseries. */
            public timeseries: sd3.Scenario.Breaker.ITimePoint[];

            /**
             * Decodes a Breaker message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Breaker
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): sd3.Scenario.Breaker;

            /**
             * Decodes a Breaker message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Breaker
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): sd3.Scenario.Breaker;

            /**
             * Verifies a Breaker message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Breaker message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Breaker
             */
            public static fromObject(object: { [k: string]: any }): sd3.Scenario.Breaker;

            /**
             * Creates a plain object from a Breaker message. Also converts values to other types if specified.
             * @param message Breaker
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: sd3.Scenario.Breaker, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Breaker to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for Breaker
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        namespace Breaker {

            /** Properties of a TimePoint. */
            interface ITimePoint {

                /** TimePoint seconds */
                seconds?: (number|null);

                /** TimePoint voltage */
                voltage?: (number|null);

                /** TimePoint current */
                current?: (number|null);

                /** TimePoint power */
                power?: (number|null);

                /** TimePoint status */
                status?: (boolean|null);
            }

            /** Represents a TimePoint. */
            class TimePoint implements ITimePoint {

                /**
                 * Constructs a new TimePoint.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: sd3.Scenario.Breaker.ITimePoint);

                /** TimePoint seconds. */
                public seconds: number;

                /** TimePoint voltage. */
                public voltage: number;

                /** TimePoint current. */
                public current: number;

                /** TimePoint power. */
                public power: number;

                /** TimePoint status. */
                public status: boolean;

                /**
                 * Decodes a TimePoint message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns TimePoint
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): sd3.Scenario.Breaker.TimePoint;

                /**
                 * Decodes a TimePoint message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns TimePoint
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): sd3.Scenario.Breaker.TimePoint;

                /**
                 * Verifies a TimePoint message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a TimePoint message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns TimePoint
                 */
                public static fromObject(object: { [k: string]: any }): sd3.Scenario.Breaker.TimePoint;

                /**
                 * Creates a plain object from a TimePoint message. Also converts values to other types if specified.
                 * @param message TimePoint
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: sd3.Scenario.Breaker.TimePoint, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this TimePoint to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for TimePoint
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }
        }

        /** Properties of a Regulator. */
        interface IRegulator {

            /** Regulator id */
            id?: (number|null);

            /** Regulator timeseries */
            timeseries?: (sd3.Scenario.Regulator.ITimePoint[]|null);
        }

        /** Represents a Regulator. */
        class Regulator implements IRegulator {

            /**
             * Constructs a new Regulator.
             * @param [properties] Properties to set
             */
            constructor(properties?: sd3.Scenario.IRegulator);

            /** Regulator id. */
            public id: number;

            /** Regulator timeseries. */
            public timeseries: sd3.Scenario.Regulator.ITimePoint[];

            /**
             * Decodes a Regulator message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Regulator
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): sd3.Scenario.Regulator;

            /**
             * Decodes a Regulator message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Regulator
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): sd3.Scenario.Regulator;

            /**
             * Verifies a Regulator message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Regulator message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Regulator
             */
            public static fromObject(object: { [k: string]: any }): sd3.Scenario.Regulator;

            /**
             * Creates a plain object from a Regulator message. Also converts values to other types if specified.
             * @param message Regulator
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: sd3.Scenario.Regulator, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Regulator to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for Regulator
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        namespace Regulator {

            /** Properties of a TimePoint. */
            interface ITimePoint {

                /** TimePoint seconds */
                seconds?: (number|null);

                /** TimePoint voltage */
                voltage?: (number|null);

                /** TimePoint current */
                current?: (number|null);

                /** TimePoint power */
                power?: (number|null);

                /** TimePoint status */
                status?: (number|null);
            }

            /** Represents a TimePoint. */
            class TimePoint implements ITimePoint {

                /**
                 * Constructs a new TimePoint.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: sd3.Scenario.Regulator.ITimePoint);

                /** TimePoint seconds. */
                public seconds: number;

                /** TimePoint voltage. */
                public voltage: number;

                /** TimePoint current. */
                public current: number;

                /** TimePoint power. */
                public power: number;

                /** TimePoint status. */
                public status: number;

                /**
                 * Decodes a TimePoint message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns TimePoint
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): sd3.Scenario.Regulator.TimePoint;

                /**
                 * Decodes a TimePoint message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns TimePoint
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): sd3.Scenario.Regulator.TimePoint;

                /**
                 * Verifies a TimePoint message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a TimePoint message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns TimePoint
                 */
                public static fromObject(object: { [k: string]: any }): sd3.Scenario.Regulator.TimePoint;

                /**
                 * Creates a plain object from a TimePoint message. Also converts values to other types if specified.
                 * @param message TimePoint
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: sd3.Scenario.Regulator.TimePoint, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this TimePoint to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for TimePoint
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }
        }

        /** Properties of a Capacitor. */
        interface ICapacitor {

            /** Capacitor id */
            id?: (number|null);

            /** Capacitor timeseries */
            timeseries?: (sd3.Scenario.Capacitor.ITimePoint[]|null);
        }

        /** Represents a Capacitor. */
        class Capacitor implements ICapacitor {

            /**
             * Constructs a new Capacitor.
             * @param [properties] Properties to set
             */
            constructor(properties?: sd3.Scenario.ICapacitor);

            /** Capacitor id. */
            public id: number;

            /** Capacitor timeseries. */
            public timeseries: sd3.Scenario.Capacitor.ITimePoint[];

            /**
             * Decodes a Capacitor message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Capacitor
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): sd3.Scenario.Capacitor;

            /**
             * Decodes a Capacitor message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Capacitor
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): sd3.Scenario.Capacitor;

            /**
             * Verifies a Capacitor message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Capacitor message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Capacitor
             */
            public static fromObject(object: { [k: string]: any }): sd3.Scenario.Capacitor;

            /**
             * Creates a plain object from a Capacitor message. Also converts values to other types if specified.
             * @param message Capacitor
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: sd3.Scenario.Capacitor, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Capacitor to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for Capacitor
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        namespace Capacitor {

            /** Properties of a TimePoint. */
            interface ITimePoint {

                /** TimePoint seconds */
                seconds?: (number|null);

                /** TimePoint voltage */
                voltage?: (number|null);

                /** TimePoint current */
                current?: (number|null);

                /** TimePoint power */
                power?: (number|null);
            }

            /** Represents a TimePoint. */
            class TimePoint implements ITimePoint {

                /**
                 * Constructs a new TimePoint.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: sd3.Scenario.Capacitor.ITimePoint);

                /** TimePoint seconds. */
                public seconds: number;

                /** TimePoint voltage. */
                public voltage: number;

                /** TimePoint current. */
                public current: number;

                /** TimePoint power. */
                public power: number;

                /**
                 * Decodes a TimePoint message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns TimePoint
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): sd3.Scenario.Capacitor.TimePoint;

                /**
                 * Decodes a TimePoint message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns TimePoint
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): sd3.Scenario.Capacitor.TimePoint;

                /**
                 * Verifies a TimePoint message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a TimePoint message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns TimePoint
                 */
                public static fromObject(object: { [k: string]: any }): sd3.Scenario.Capacitor.TimePoint;

                /**
                 * Creates a plain object from a TimePoint message. Also converts values to other types if specified.
                 * @param message TimePoint
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: sd3.Scenario.Capacitor.TimePoint, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this TimePoint to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for TimePoint
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }
        }

        /** Properties of a Circuit. */
        interface ICircuit {

            /** Circuit id */
            id?: (number|null);

            /** Circuit timeseries */
            timeseries?: (sd3.Scenario.Circuit.ITimePoint[]|null);
        }

        /** Represents a Circuit. */
        class Circuit implements ICircuit {

            /**
             * Constructs a new Circuit.
             * @param [properties] Properties to set
             */
            constructor(properties?: sd3.Scenario.ICircuit);

            /** Circuit id. */
            public id: number;

            /** Circuit timeseries. */
            public timeseries: sd3.Scenario.Circuit.ITimePoint[];

            /**
             * Decodes a Circuit message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Circuit
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): sd3.Scenario.Circuit;

            /**
             * Decodes a Circuit message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Circuit
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): sd3.Scenario.Circuit;

            /**
             * Verifies a Circuit message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Circuit message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Circuit
             */
            public static fromObject(object: { [k: string]: any }): sd3.Scenario.Circuit;

            /**
             * Creates a plain object from a Circuit message. Also converts values to other types if specified.
             * @param message Circuit
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: sd3.Scenario.Circuit, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Circuit to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for Circuit
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        namespace Circuit {

            /** Properties of a TimePoint. */
            interface ITimePoint {

                /** TimePoint seconds */
                seconds?: (number|null);

                /** TimePoint netLoad */
                netLoad?: (number|null);

                /** TimePoint netReactiveLoad */
                netReactiveLoad?: (number|null);
            }

            /** Represents a TimePoint. */
            class TimePoint implements ITimePoint {

                /**
                 * Constructs a new TimePoint.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: sd3.Scenario.Circuit.ITimePoint);

                /** TimePoint seconds. */
                public seconds: number;

                /** TimePoint netLoad. */
                public netLoad: number;

                /** TimePoint netReactiveLoad. */
                public netReactiveLoad: number;

                /**
                 * Decodes a TimePoint message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns TimePoint
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): sd3.Scenario.Circuit.TimePoint;

                /**
                 * Decodes a TimePoint message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns TimePoint
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): sd3.Scenario.Circuit.TimePoint;

                /**
                 * Verifies a TimePoint message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a TimePoint message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns TimePoint
                 */
                public static fromObject(object: { [k: string]: any }): sd3.Scenario.Circuit.TimePoint;

                /**
                 * Creates a plain object from a TimePoint message. Also converts values to other types if specified.
                 * @param message TimePoint
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: sd3.Scenario.Circuit.TimePoint, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this TimePoint to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for TimePoint
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }
        }

        /** Properties of a Battery. */
        interface IBattery {

            /** Battery id */
            id?: (number|null);

            /** Battery timeseries */
            timeseries?: (sd3.Scenario.Battery.ITimePoint[]|null);
        }

        /** Represents a Battery. */
        class Battery implements IBattery {

            /**
             * Constructs a new Battery.
             * @param [properties] Properties to set
             */
            constructor(properties?: sd3.Scenario.IBattery);

            /** Battery id. */
            public id: number;

            /** Battery timeseries. */
            public timeseries: sd3.Scenario.Battery.ITimePoint[];

            /**
             * Decodes a Battery message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Battery
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): sd3.Scenario.Battery;

            /**
             * Decodes a Battery message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Battery
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): sd3.Scenario.Battery;

            /**
             * Verifies a Battery message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Battery message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Battery
             */
            public static fromObject(object: { [k: string]: any }): sd3.Scenario.Battery;

            /**
             * Creates a plain object from a Battery message. Also converts values to other types if specified.
             * @param message Battery
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: sd3.Scenario.Battery, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Battery to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for Battery
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        namespace Battery {

            /** BatteryStatus enum. */
            enum BatteryStatus {
                IDLE = 0,
                DISCHARGING = 1,
                CHARGING = 2
            }

            /** Properties of a TimePoint. */
            interface ITimePoint {

                /** TimePoint seconds */
                seconds?: (number|null);

                /** TimePoint receivedSignal */
                receivedSignal?: (number|null);

                /** TimePoint status */
                status?: (sd3.Scenario.Battery.BatteryStatus|null);

                /** TimePoint stateOfCharge */
                stateOfCharge?: (number|null);

                /** TimePoint activePower */
                activePower?: (number|null);

                /** TimePoint reactivePower */
                reactivePower?: (number|null);
            }

            /** Represents a TimePoint. */
            class TimePoint implements ITimePoint {

                /**
                 * Constructs a new TimePoint.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: sd3.Scenario.Battery.ITimePoint);

                /** TimePoint seconds. */
                public seconds: number;

                /** TimePoint receivedSignal. */
                public receivedSignal: number;

                /** TimePoint status. */
                public status: sd3.Scenario.Battery.BatteryStatus;

                /** TimePoint stateOfCharge. */
                public stateOfCharge: number;

                /** TimePoint activePower. */
                public activePower: number;

                /** TimePoint reactivePower. */
                public reactivePower: number;

                /**
                 * Decodes a TimePoint message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns TimePoint
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): sd3.Scenario.Battery.TimePoint;

                /**
                 * Decodes a TimePoint message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns TimePoint
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): sd3.Scenario.Battery.TimePoint;

                /**
                 * Verifies a TimePoint message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a TimePoint message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns TimePoint
                 */
                public static fromObject(object: { [k: string]: any }): sd3.Scenario.Battery.TimePoint;

                /**
                 * Creates a plain object from a TimePoint message. Also converts values to other types if specified.
                 * @param message TimePoint
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: sd3.Scenario.Battery.TimePoint, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this TimePoint to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for TimePoint
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }
        }

        /** Properties of a Building. */
        interface IBuilding {

            /** Building id */
            id?: (number|null);

            /** Building timeseries */
            timeseries?: (sd3.Scenario.Building.ITimePoint[]|null);
        }

        /** Represents a Building. */
        class Building implements IBuilding {

            /**
             * Constructs a new Building.
             * @param [properties] Properties to set
             */
            constructor(properties?: sd3.Scenario.IBuilding);

            /** Building id. */
            public id: number;

            /** Building timeseries. */
            public timeseries: sd3.Scenario.Building.ITimePoint[];

            /**
             * Decodes a Building message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Building
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): sd3.Scenario.Building;

            /**
             * Decodes a Building message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Building
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): sd3.Scenario.Building;

            /**
             * Verifies a Building message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Building message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Building
             */
            public static fromObject(object: { [k: string]: any }): sd3.Scenario.Building;

            /**
             * Creates a plain object from a Building message. Also converts values to other types if specified.
             * @param message Building
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: sd3.Scenario.Building, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Building to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for Building
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        namespace Building {

            /** Properties of a TimePoint. */
            interface ITimePoint {

                /** TimePoint seconds */
                seconds?: (number|null);

                /** TimePoint power */
                power?: (number|null);

                /** TimePoint netPower */
                netPower?: (number|null);

                /** TimePoint purchasedPower */
                purchasedPower?: (number|null);

                /** TimePoint surplusPower */
                surplusPower?: (number|null);
            }

            /** Represents a TimePoint. */
            class TimePoint implements ITimePoint {

                /**
                 * Constructs a new TimePoint.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: sd3.Scenario.Building.ITimePoint);

                /** TimePoint seconds. */
                public seconds: number;

                /** TimePoint power. */
                public power: number;

                /** TimePoint netPower. */
                public netPower: number;

                /** TimePoint purchasedPower. */
                public purchasedPower: number;

                /** TimePoint surplusPower. */
                public surplusPower: number;

                /**
                 * Decodes a TimePoint message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns TimePoint
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): sd3.Scenario.Building.TimePoint;

                /**
                 * Decodes a TimePoint message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns TimePoint
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): sd3.Scenario.Building.TimePoint;

                /**
                 * Verifies a TimePoint message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a TimePoint message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns TimePoint
                 */
                public static fromObject(object: { [k: string]: any }): sd3.Scenario.Building.TimePoint;

                /**
                 * Creates a plain object from a TimePoint message. Also converts values to other types if specified.
                 * @param message TimePoint
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: sd3.Scenario.Building.TimePoint, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this TimePoint to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for TimePoint
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }
        }
    }

    /** Properties of a BusConnection. */
    interface IBusConnection {

        /** BusConnection busId */
        busId?: (number|null);

        /** BusConnection phaseA */
        phaseA?: (boolean|null);

        /** BusConnection phaseB */
        phaseB?: (boolean|null);

        /** BusConnection phaseC */
        phaseC?: (boolean|null);
    }

    /** Represents a BusConnection. */
    class BusConnection implements IBusConnection {

        /**
         * Constructs a new BusConnection.
         * @param [properties] Properties to set
         */
        constructor(properties?: sd3.IBusConnection);

        /** BusConnection busId. */
        public busId: number;

        /** BusConnection phaseA. */
        public phaseA: boolean;

        /** BusConnection phaseB. */
        public phaseB: boolean;

        /** BusConnection phaseC. */
        public phaseC: boolean;

        /**
         * Decodes a BusConnection message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BusConnection
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): sd3.BusConnection;

        /**
         * Decodes a BusConnection message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BusConnection
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): sd3.BusConnection;

        /**
         * Verifies a BusConnection message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BusConnection message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BusConnection
         */
        public static fromObject(object: { [k: string]: any }): sd3.BusConnection;

        /**
         * Creates a plain object from a BusConnection message. Also converts values to other types if specified.
         * @param message BusConnection
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: sd3.BusConnection, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BusConnection to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for BusConnection
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a Feeder. */
    interface IFeeder {

        /** Feeder sourceBusId */
        sourceBusId?: (number|null);

        /** Feeder lines */
        lines?: (sd3.Feeder.ILine[]|null);

        /** Feeder loads */
        loads?: (sd3.Feeder.ILoad[]|null);

        /** Feeder capacitors */
        capacitors?: (sd3.Feeder.ICapacitor[]|null);

        /** Feeder regulators */
        regulators?: (sd3.Feeder.IRegulator[]|null);

        /** Feeder transformers */
        transformers?: (sd3.Feeder.ITransformer[]|null);

        /** Feeder buses */
        buses?: (sd3.Feeder.IBus[]|null);
    }

    /** Represents a Feeder. */
    class Feeder implements IFeeder {

        /**
         * Constructs a new Feeder.
         * @param [properties] Properties to set
         */
        constructor(properties?: sd3.IFeeder);

        /** Feeder sourceBusId. */
        public sourceBusId: number;

        /** Feeder lines. */
        public lines: sd3.Feeder.ILine[];

        /** Feeder loads. */
        public loads: sd3.Feeder.ILoad[];

        /** Feeder capacitors. */
        public capacitors: sd3.Feeder.ICapacitor[];

        /** Feeder regulators. */
        public regulators: sd3.Feeder.IRegulator[];

        /** Feeder transformers. */
        public transformers: sd3.Feeder.ITransformer[];

        /** Feeder buses. */
        public buses: sd3.Feeder.IBus[];

        /**
         * Decodes a Feeder message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Feeder
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): sd3.Feeder;

        /**
         * Decodes a Feeder message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Feeder
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): sd3.Feeder;

        /**
         * Verifies a Feeder message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Feeder message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Feeder
         */
        public static fromObject(object: { [k: string]: any }): sd3.Feeder;

        /**
         * Creates a plain object from a Feeder message. Also converts values to other types if specified.
         * @param message Feeder
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: sd3.Feeder, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Feeder to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Feeder
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    namespace Feeder {

        /** Properties of a Bus. */
        interface IBus {

            /** Bus id */
            id?: (number|null);

            /** Bus x */
            x?: (number|null);

            /** Bus y */
            y?: (number|null);
        }

        /** Represents a Bus. */
        class Bus implements IBus {

            /**
             * Constructs a new Bus.
             * @param [properties] Properties to set
             */
            constructor(properties?: sd3.Feeder.IBus);

            /** Bus id. */
            public id: number;

            /** Bus x. */
            public x: number;

            /** Bus y. */
            public y: number;

            /**
             * Decodes a Bus message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Bus
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): sd3.Feeder.Bus;

            /**
             * Decodes a Bus message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Bus
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): sd3.Feeder.Bus;

            /**
             * Verifies a Bus message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Bus message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Bus
             */
            public static fromObject(object: { [k: string]: any }): sd3.Feeder.Bus;

            /**
             * Creates a plain object from a Bus message. Also converts values to other types if specified.
             * @param message Bus
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: sd3.Feeder.Bus, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Bus to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for Bus
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a Line. */
        interface ILine {

            /** Line id */
            id?: (number|null);

            /** Line fromBus */
            fromBus?: (sd3.IBusConnection|null);

            /** Line toBus */
            toBus?: (sd3.IBusConnection|null);

            /** Line lengthMeters */
            lengthMeters?: (number|null);

            /** Line switch */
            "switch"?: (boolean|null);

            /** Line enabled */
            enabled?: (boolean|null);
        }

        /** Represents a Line. */
        class Line implements ILine {

            /**
             * Constructs a new Line.
             * @param [properties] Properties to set
             */
            constructor(properties?: sd3.Feeder.ILine);

            /** Line id. */
            public id: number;

            /** Line fromBus. */
            public fromBus?: (sd3.IBusConnection|null);

            /** Line toBus. */
            public toBus?: (sd3.IBusConnection|null);

            /** Line lengthMeters. */
            public lengthMeters: number;

            /** Line switch. */
            public switch: boolean;

            /** Line enabled. */
            public enabled: boolean;

            /**
             * Decodes a Line message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Line
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): sd3.Feeder.Line;

            /**
             * Decodes a Line message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Line
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): sd3.Feeder.Line;

            /**
             * Verifies a Line message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Line message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Line
             */
            public static fromObject(object: { [k: string]: any }): sd3.Feeder.Line;

            /**
             * Creates a plain object from a Line message. Also converts values to other types if specified.
             * @param message Line
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: sd3.Feeder.Line, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Line to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for Line
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a Load. */
        interface ILoad {

            /** Load id */
            id?: (number|null);

            /** Load bus */
            bus?: (sd3.IBusConnection|null);
        }

        /** Represents a Load. */
        class Load implements ILoad {

            /**
             * Constructs a new Load.
             * @param [properties] Properties to set
             */
            constructor(properties?: sd3.Feeder.ILoad);

            /** Load id. */
            public id: number;

            /** Load bus. */
            public bus?: (sd3.IBusConnection|null);

            /**
             * Decodes a Load message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Load
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): sd3.Feeder.Load;

            /**
             * Decodes a Load message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Load
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): sd3.Feeder.Load;

            /**
             * Verifies a Load message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Load message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Load
             */
            public static fromObject(object: { [k: string]: any }): sd3.Feeder.Load;

            /**
             * Creates a plain object from a Load message. Also converts values to other types if specified.
             * @param message Load
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: sd3.Feeder.Load, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Load to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for Load
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a Capacitor. */
        interface ICapacitor {

            /** Capacitor id */
            id?: (number|null);

            /** Capacitor bus */
            bus?: (sd3.IBusConnection|null);
        }

        /** Represents a Capacitor. */
        class Capacitor implements ICapacitor {

            /**
             * Constructs a new Capacitor.
             * @param [properties] Properties to set
             */
            constructor(properties?: sd3.Feeder.ICapacitor);

            /** Capacitor id. */
            public id: number;

            /** Capacitor bus. */
            public bus?: (sd3.IBusConnection|null);

            /**
             * Decodes a Capacitor message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Capacitor
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): sd3.Feeder.Capacitor;

            /**
             * Decodes a Capacitor message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Capacitor
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): sd3.Feeder.Capacitor;

            /**
             * Verifies a Capacitor message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Capacitor message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Capacitor
             */
            public static fromObject(object: { [k: string]: any }): sd3.Feeder.Capacitor;

            /**
             * Creates a plain object from a Capacitor message. Also converts values to other types if specified.
             * @param message Capacitor
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: sd3.Feeder.Capacitor, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Capacitor to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for Capacitor
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a Regulator. */
        interface IRegulator {

            /** Regulator id */
            id?: (number|null);

            /** Regulator transformerId */
            transformerId?: (number|null);

            /** Regulator phaseA */
            phaseA?: (boolean|null);

            /** Regulator phaseB */
            phaseB?: (boolean|null);

            /** Regulator phaseC */
            phaseC?: (boolean|null);
        }

        /** Represents a Regulator. */
        class Regulator implements IRegulator {

            /**
             * Constructs a new Regulator.
             * @param [properties] Properties to set
             */
            constructor(properties?: sd3.Feeder.IRegulator);

            /** Regulator id. */
            public id: number;

            /** Regulator transformerId. */
            public transformerId: number;

            /** Regulator phaseA. */
            public phaseA: boolean;

            /** Regulator phaseB. */
            public phaseB: boolean;

            /** Regulator phaseC. */
            public phaseC: boolean;

            /**
             * Decodes a Regulator message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Regulator
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): sd3.Feeder.Regulator;

            /**
             * Decodes a Regulator message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Regulator
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): sd3.Feeder.Regulator;

            /**
             * Verifies a Regulator message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Regulator message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Regulator
             */
            public static fromObject(object: { [k: string]: any }): sd3.Feeder.Regulator;

            /**
             * Creates a plain object from a Regulator message. Also converts values to other types if specified.
             * @param message Regulator
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: sd3.Feeder.Regulator, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Regulator to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for Regulator
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a Transformer. */
        interface ITransformer {

            /** Transformer id */
            id?: (number|null);

            /** Transformer busConnections */
            busConnections?: (sd3.IBusConnection[]|null);
        }

        /** Represents a Transformer. */
        class Transformer implements ITransformer {

            /**
             * Constructs a new Transformer.
             * @param [properties] Properties to set
             */
            constructor(properties?: sd3.Feeder.ITransformer);

            /** Transformer id. */
            public id: number;

            /** Transformer busConnections. */
            public busConnections: sd3.IBusConnection[];

            /**
             * Decodes a Transformer message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Transformer
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): sd3.Feeder.Transformer;

            /**
             * Decodes a Transformer message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Transformer
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): sd3.Feeder.Transformer;

            /**
             * Verifies a Transformer message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Transformer message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Transformer
             */
            public static fromObject(object: { [k: string]: any }): sd3.Feeder.Transformer;

            /**
             * Creates a plain object from a Transformer message. Also converts values to other types if specified.
             * @param message Transformer
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: sd3.Feeder.Transformer, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Transformer to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for Transformer
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }
    }
}
