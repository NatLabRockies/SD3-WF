/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import $protobuf from "protobufjs/minimal.js";

// Common aliases
const $Reader = $protobuf.Reader, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const sd3 = $root.sd3 = (() => {

    /**
     * Namespace sd3.
     * @exports sd3
     * @namespace
     */
    const sd3 = {};

    sd3.Cyber = (function() {

        /**
         * Properties of a Cyber.
         * @memberof sd3
         * @interface ICyber
         * @property {Array.<sd3.Cyber.INetworkEntity>|null} [entities] Cyber entities
         * @property {Array.<sd3.Cyber.ITrafficFlow>|null} [flows] Cyber flows
         */

        /**
         * Constructs a new Cyber.
         * @memberof sd3
         * @classdesc Represents a Cyber.
         * @implements ICyber
         * @constructor
         * @param {sd3.ICyber=} [properties] Properties to set
         */
        function Cyber(properties) {
            this.entities = [];
            this.flows = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Cyber entities.
         * @member {Array.<sd3.Cyber.INetworkEntity>} entities
         * @memberof sd3.Cyber
         * @instance
         */
        Cyber.prototype.entities = $util.emptyArray;

        /**
         * Cyber flows.
         * @member {Array.<sd3.Cyber.ITrafficFlow>} flows
         * @memberof sd3.Cyber
         * @instance
         */
        Cyber.prototype.flows = $util.emptyArray;

        /**
         * Decodes a Cyber message from the specified reader or buffer.
         * @function decode
         * @memberof sd3.Cyber
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {sd3.Cyber} Cyber
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Cyber.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.sd3.Cyber();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.entities && message.entities.length))
                            message.entities = [];
                        message.entities.push($root.sd3.Cyber.NetworkEntity.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 2: {
                        if (!(message.flows && message.flows.length))
                            message.flows = [];
                        message.flows.push($root.sd3.Cyber.TrafficFlow.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                default:
                    reader.skipType(tag & 7, long);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Cyber message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof sd3.Cyber
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {sd3.Cyber} Cyber
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Cyber.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Cyber message.
         * @function verify
         * @memberof sd3.Cyber
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Cyber.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.entities != null && message.hasOwnProperty("entities")) {
                if (!Array.isArray(message.entities))
                    return "entities: array expected";
                for (let i = 0; i < message.entities.length; ++i) {
                    let error = $root.sd3.Cyber.NetworkEntity.verify(message.entities[i], long + 1);
                    if (error)
                        return "entities." + error;
                }
            }
            if (message.flows != null && message.hasOwnProperty("flows")) {
                if (!Array.isArray(message.flows))
                    return "flows: array expected";
                for (let i = 0; i < message.flows.length; ++i) {
                    let error = $root.sd3.Cyber.TrafficFlow.verify(message.flows[i], long + 1);
                    if (error)
                        return "flows." + error;
                }
            }
            return null;
        };

        /**
         * Creates a Cyber message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof sd3.Cyber
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {sd3.Cyber} Cyber
         */
        Cyber.fromObject = function fromObject(object, long) {
            if (object instanceof $root.sd3.Cyber)
                return object;
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.sd3.Cyber();
            if (object.entities) {
                if (!Array.isArray(object.entities))
                    throw TypeError(".sd3.Cyber.entities: array expected");
                message.entities = [];
                for (let i = 0; i < object.entities.length; ++i) {
                    if (typeof object.entities[i] !== "object")
                        throw TypeError(".sd3.Cyber.entities: object expected");
                    message.entities[i] = $root.sd3.Cyber.NetworkEntity.fromObject(object.entities[i], long + 1);
                }
            }
            if (object.flows) {
                if (!Array.isArray(object.flows))
                    throw TypeError(".sd3.Cyber.flows: array expected");
                message.flows = [];
                for (let i = 0; i < object.flows.length; ++i) {
                    if (typeof object.flows[i] !== "object")
                        throw TypeError(".sd3.Cyber.flows: object expected");
                    message.flows[i] = $root.sd3.Cyber.TrafficFlow.fromObject(object.flows[i], long + 1);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a Cyber message. Also converts values to other types if specified.
         * @function toObject
         * @memberof sd3.Cyber
         * @static
         * @param {sd3.Cyber} message Cyber
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Cyber.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults) {
                object.entities = [];
                object.flows = [];
            }
            if (message.entities && message.entities.length) {
                object.entities = [];
                for (let j = 0; j < message.entities.length; ++j)
                    object.entities[j] = $root.sd3.Cyber.NetworkEntity.toObject(message.entities[j], options);
            }
            if (message.flows && message.flows.length) {
                object.flows = [];
                for (let j = 0; j < message.flows.length; ++j)
                    object.flows[j] = $root.sd3.Cyber.TrafficFlow.toObject(message.flows[j], options);
            }
            return object;
        };

        /**
         * Converts this Cyber to JSON.
         * @function toJSON
         * @memberof sd3.Cyber
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Cyber.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Cyber
         * @function getTypeUrl
         * @memberof sd3.Cyber
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Cyber.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/sd3.Cyber";
        };

        /**
         * Transport enum.
         * @name sd3.Cyber.Transport
         * @enum {number}
         * @property {number} TRANSPORT_UNKNOWN=0 TRANSPORT_UNKNOWN value
         * @property {number} TCP=1 TCP value
         * @property {number} UDP=2 UDP value
         * @property {number} ICMP=3 ICMP value
         * @property {number} IGMP=4 IGMP value
         */
        Cyber.Transport = (function() {
            const valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "TRANSPORT_UNKNOWN"] = 0;
            values[valuesById[1] = "TCP"] = 1;
            values[valuesById[2] = "UDP"] = 2;
            values[valuesById[3] = "ICMP"] = 3;
            values[valuesById[4] = "IGMP"] = 4;
            return values;
        })();

        /**
         * AppProtocol enum.
         * @name sd3.Cyber.AppProtocol
         * @enum {number}
         * @property {number} APP_UNKNOWN=0 APP_UNKNOWN value
         * @property {number} HTTP=1 HTTP value
         * @property {number} TLS=2 TLS value
         * @property {number} DNS=3 DNS value
         * @property {number} SSH=4 SSH value
         * @property {number} IEEE_2030_5=5 IEEE_2030_5 value
         * @property {number} EPHEMERAL=6 EPHEMERAL value
         */
        Cyber.AppProtocol = (function() {
            const valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "APP_UNKNOWN"] = 0;
            values[valuesById[1] = "HTTP"] = 1;
            values[valuesById[2] = "TLS"] = 2;
            values[valuesById[3] = "DNS"] = 3;
            values[valuesById[4] = "SSH"] = 4;
            values[valuesById[5] = "IEEE_2030_5"] = 5;
            values[valuesById[6] = "EPHEMERAL"] = 6;
            return values;
        })();

        Cyber.NetworkEntity = (function() {

            /**
             * Properties of a NetworkEntity.
             * @memberof sd3.Cyber
             * @interface INetworkEntity
             * @property {number|null} [id] NetworkEntity id
             * @property {string|null} [ipAddress] NetworkEntity ipAddress
             * @property {string|null} [label] NetworkEntity label
             * @property {string|null} [role] NetworkEntity role
             * @property {number|null} [gridComponentId] NetworkEntity gridComponentId
             */

            /**
             * Constructs a new NetworkEntity.
             * @memberof sd3.Cyber
             * @classdesc Represents a NetworkEntity.
             * @implements INetworkEntity
             * @constructor
             * @param {sd3.Cyber.INetworkEntity=} [properties] Properties to set
             */
            function NetworkEntity(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * NetworkEntity id.
             * @member {number} id
             * @memberof sd3.Cyber.NetworkEntity
             * @instance
             */
            NetworkEntity.prototype.id = 0;

            /**
             * NetworkEntity ipAddress.
             * @member {string} ipAddress
             * @memberof sd3.Cyber.NetworkEntity
             * @instance
             */
            NetworkEntity.prototype.ipAddress = "";

            /**
             * NetworkEntity label.
             * @member {string} label
             * @memberof sd3.Cyber.NetworkEntity
             * @instance
             */
            NetworkEntity.prototype.label = "";

            /**
             * NetworkEntity role.
             * @member {string} role
             * @memberof sd3.Cyber.NetworkEntity
             * @instance
             */
            NetworkEntity.prototype.role = "";

            /**
             * NetworkEntity gridComponentId.
             * @member {number} gridComponentId
             * @memberof sd3.Cyber.NetworkEntity
             * @instance
             */
            NetworkEntity.prototype.gridComponentId = 0;

            /**
             * Decodes a NetworkEntity message from the specified reader or buffer.
             * @function decode
             * @memberof sd3.Cyber.NetworkEntity
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {sd3.Cyber.NetworkEntity} NetworkEntity
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            NetworkEntity.decode = function decode(reader, length, error, long) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (long === undefined)
                    long = 0;
                if (long > $Reader.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.sd3.Cyber.NetworkEntity();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.id = reader.uint32();
                            break;
                        }
                    case 2: {
                            message.ipAddress = reader.string();
                            break;
                        }
                    case 3: {
                            message.label = reader.string();
                            break;
                        }
                    case 4: {
                            message.role = reader.string();
                            break;
                        }
                    case 5: {
                            message.gridComponentId = reader.uint32();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7, long);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a NetworkEntity message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof sd3.Cyber.NetworkEntity
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {sd3.Cyber.NetworkEntity} NetworkEntity
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            NetworkEntity.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a NetworkEntity message.
             * @function verify
             * @memberof sd3.Cyber.NetworkEntity
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            NetworkEntity.verify = function verify(message, long) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    return "maximum nesting depth exceeded";
                if (message.id != null && message.hasOwnProperty("id"))
                    if (!$util.isInteger(message.id))
                        return "id: integer expected";
                if (message.ipAddress != null && message.hasOwnProperty("ipAddress"))
                    if (!$util.isString(message.ipAddress))
                        return "ipAddress: string expected";
                if (message.label != null && message.hasOwnProperty("label"))
                    if (!$util.isString(message.label))
                        return "label: string expected";
                if (message.role != null && message.hasOwnProperty("role"))
                    if (!$util.isString(message.role))
                        return "role: string expected";
                if (message.gridComponentId != null && message.hasOwnProperty("gridComponentId"))
                    if (!$util.isInteger(message.gridComponentId))
                        return "gridComponentId: integer expected";
                return null;
            };

            /**
             * Creates a NetworkEntity message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof sd3.Cyber.NetworkEntity
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {sd3.Cyber.NetworkEntity} NetworkEntity
             */
            NetworkEntity.fromObject = function fromObject(object, long) {
                if (object instanceof $root.sd3.Cyber.NetworkEntity)
                    return object;
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let message = new $root.sd3.Cyber.NetworkEntity();
                if (object.id != null)
                    message.id = object.id >>> 0;
                if (object.ipAddress != null)
                    message.ipAddress = String(object.ipAddress);
                if (object.label != null)
                    message.label = String(object.label);
                if (object.role != null)
                    message.role = String(object.role);
                if (object.gridComponentId != null)
                    message.gridComponentId = object.gridComponentId >>> 0;
                return message;
            };

            /**
             * Creates a plain object from a NetworkEntity message. Also converts values to other types if specified.
             * @function toObject
             * @memberof sd3.Cyber.NetworkEntity
             * @static
             * @param {sd3.Cyber.NetworkEntity} message NetworkEntity
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            NetworkEntity.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.id = 0;
                    object.ipAddress = "";
                    object.label = "";
                    object.role = "";
                    object.gridComponentId = 0;
                }
                if (message.id != null && message.hasOwnProperty("id"))
                    object.id = message.id;
                if (message.ipAddress != null && message.hasOwnProperty("ipAddress"))
                    object.ipAddress = message.ipAddress;
                if (message.label != null && message.hasOwnProperty("label"))
                    object.label = message.label;
                if (message.role != null && message.hasOwnProperty("role"))
                    object.role = message.role;
                if (message.gridComponentId != null && message.hasOwnProperty("gridComponentId"))
                    object.gridComponentId = message.gridComponentId;
                return object;
            };

            /**
             * Converts this NetworkEntity to JSON.
             * @function toJSON
             * @memberof sd3.Cyber.NetworkEntity
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            NetworkEntity.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for NetworkEntity
             * @function getTypeUrl
             * @memberof sd3.Cyber.NetworkEntity
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            NetworkEntity.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/sd3.Cyber.NetworkEntity";
            };

            return NetworkEntity;
        })();

        Cyber.TrafficFlow = (function() {

            /**
             * Properties of a TrafficFlow.
             * @memberof sd3.Cyber
             * @interface ITrafficFlow
             * @property {number|null} [sourceId] TrafficFlow sourceId
             * @property {number|null} [destId] TrafficFlow destId
             * @property {Array.<sd3.Cyber.TrafficFlow.ITimePoint>|null} [timeseries] TrafficFlow timeseries
             */

            /**
             * Constructs a new TrafficFlow.
             * @memberof sd3.Cyber
             * @classdesc Represents a TrafficFlow.
             * @implements ITrafficFlow
             * @constructor
             * @param {sd3.Cyber.ITrafficFlow=} [properties] Properties to set
             */
            function TrafficFlow(properties) {
                this.timeseries = [];
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * TrafficFlow sourceId.
             * @member {number} sourceId
             * @memberof sd3.Cyber.TrafficFlow
             * @instance
             */
            TrafficFlow.prototype.sourceId = 0;

            /**
             * TrafficFlow destId.
             * @member {number} destId
             * @memberof sd3.Cyber.TrafficFlow
             * @instance
             */
            TrafficFlow.prototype.destId = 0;

            /**
             * TrafficFlow timeseries.
             * @member {Array.<sd3.Cyber.TrafficFlow.ITimePoint>} timeseries
             * @memberof sd3.Cyber.TrafficFlow
             * @instance
             */
            TrafficFlow.prototype.timeseries = $util.emptyArray;

            /**
             * Decodes a TrafficFlow message from the specified reader or buffer.
             * @function decode
             * @memberof sd3.Cyber.TrafficFlow
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {sd3.Cyber.TrafficFlow} TrafficFlow
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TrafficFlow.decode = function decode(reader, length, error, long) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (long === undefined)
                    long = 0;
                if (long > $Reader.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.sd3.Cyber.TrafficFlow();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.sourceId = reader.uint32();
                            break;
                        }
                    case 2: {
                            message.destId = reader.uint32();
                            break;
                        }
                    case 3: {
                            if (!(message.timeseries && message.timeseries.length))
                                message.timeseries = [];
                            message.timeseries.push($root.sd3.Cyber.TrafficFlow.TimePoint.decode(reader, reader.uint32(), undefined, long + 1));
                            break;
                        }
                    default:
                        reader.skipType(tag & 7, long);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a TrafficFlow message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof sd3.Cyber.TrafficFlow
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {sd3.Cyber.TrafficFlow} TrafficFlow
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TrafficFlow.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a TrafficFlow message.
             * @function verify
             * @memberof sd3.Cyber.TrafficFlow
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            TrafficFlow.verify = function verify(message, long) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    return "maximum nesting depth exceeded";
                if (message.sourceId != null && message.hasOwnProperty("sourceId"))
                    if (!$util.isInteger(message.sourceId))
                        return "sourceId: integer expected";
                if (message.destId != null && message.hasOwnProperty("destId"))
                    if (!$util.isInteger(message.destId))
                        return "destId: integer expected";
                if (message.timeseries != null && message.hasOwnProperty("timeseries")) {
                    if (!Array.isArray(message.timeseries))
                        return "timeseries: array expected";
                    for (let i = 0; i < message.timeseries.length; ++i) {
                        let error = $root.sd3.Cyber.TrafficFlow.TimePoint.verify(message.timeseries[i], long + 1);
                        if (error)
                            return "timeseries." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a TrafficFlow message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof sd3.Cyber.TrafficFlow
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {sd3.Cyber.TrafficFlow} TrafficFlow
             */
            TrafficFlow.fromObject = function fromObject(object, long) {
                if (object instanceof $root.sd3.Cyber.TrafficFlow)
                    return object;
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let message = new $root.sd3.Cyber.TrafficFlow();
                if (object.sourceId != null)
                    message.sourceId = object.sourceId >>> 0;
                if (object.destId != null)
                    message.destId = object.destId >>> 0;
                if (object.timeseries) {
                    if (!Array.isArray(object.timeseries))
                        throw TypeError(".sd3.Cyber.TrafficFlow.timeseries: array expected");
                    message.timeseries = [];
                    for (let i = 0; i < object.timeseries.length; ++i) {
                        if (typeof object.timeseries[i] !== "object")
                            throw TypeError(".sd3.Cyber.TrafficFlow.timeseries: object expected");
                        message.timeseries[i] = $root.sd3.Cyber.TrafficFlow.TimePoint.fromObject(object.timeseries[i], long + 1);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from a TrafficFlow message. Also converts values to other types if specified.
             * @function toObject
             * @memberof sd3.Cyber.TrafficFlow
             * @static
             * @param {sd3.Cyber.TrafficFlow} message TrafficFlow
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            TrafficFlow.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.arrays || options.defaults)
                    object.timeseries = [];
                if (options.defaults) {
                    object.sourceId = 0;
                    object.destId = 0;
                }
                if (message.sourceId != null && message.hasOwnProperty("sourceId"))
                    object.sourceId = message.sourceId;
                if (message.destId != null && message.hasOwnProperty("destId"))
                    object.destId = message.destId;
                if (message.timeseries && message.timeseries.length) {
                    object.timeseries = [];
                    for (let j = 0; j < message.timeseries.length; ++j)
                        object.timeseries[j] = $root.sd3.Cyber.TrafficFlow.TimePoint.toObject(message.timeseries[j], options);
                }
                return object;
            };

            /**
             * Converts this TrafficFlow to JSON.
             * @function toJSON
             * @memberof sd3.Cyber.TrafficFlow
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            TrafficFlow.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for TrafficFlow
             * @function getTypeUrl
             * @memberof sd3.Cyber.TrafficFlow
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            TrafficFlow.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/sd3.Cyber.TrafficFlow";
            };

            TrafficFlow.TimePoint = (function() {

                /**
                 * Properties of a TimePoint.
                 * @memberof sd3.Cyber.TrafficFlow
                 * @interface ITimePoint
                 * @property {number|null} [seconds] TimePoint seconds
                 * @property {number|null} [bytes] TimePoint bytes
                 * @property {number|null} [packets] TimePoint packets
                 * @property {Array.<sd3.Cyber.TrafficFlow.TimePoint.IProtocolBreakdown>|null} [protocols] TimePoint protocols
                 */

                /**
                 * Constructs a new TimePoint.
                 * @memberof sd3.Cyber.TrafficFlow
                 * @classdesc Represents a TimePoint.
                 * @implements ITimePoint
                 * @constructor
                 * @param {sd3.Cyber.TrafficFlow.ITimePoint=} [properties] Properties to set
                 */
                function TimePoint(properties) {
                    this.protocols = [];
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * TimePoint seconds.
                 * @member {number} seconds
                 * @memberof sd3.Cyber.TrafficFlow.TimePoint
                 * @instance
                 */
                TimePoint.prototype.seconds = 0;

                /**
                 * TimePoint bytes.
                 * @member {number} bytes
                 * @memberof sd3.Cyber.TrafficFlow.TimePoint
                 * @instance
                 */
                TimePoint.prototype.bytes = 0;

                /**
                 * TimePoint packets.
                 * @member {number} packets
                 * @memberof sd3.Cyber.TrafficFlow.TimePoint
                 * @instance
                 */
                TimePoint.prototype.packets = 0;

                /**
                 * TimePoint protocols.
                 * @member {Array.<sd3.Cyber.TrafficFlow.TimePoint.IProtocolBreakdown>} protocols
                 * @memberof sd3.Cyber.TrafficFlow.TimePoint
                 * @instance
                 */
                TimePoint.prototype.protocols = $util.emptyArray;

                /**
                 * Decodes a TimePoint message from the specified reader or buffer.
                 * @function decode
                 * @memberof sd3.Cyber.TrafficFlow.TimePoint
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {sd3.Cyber.TrafficFlow.TimePoint} TimePoint
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                TimePoint.decode = function decode(reader, length, error, long) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (long === undefined)
                        long = 0;
                    if (long > $Reader.recursionLimit)
                        throw Error("maximum nesting depth exceeded");
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.sd3.Cyber.TrafficFlow.TimePoint();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.seconds = reader.uint32();
                                break;
                            }
                        case 2: {
                                message.bytes = reader.uint32();
                                break;
                            }
                        case 3: {
                                message.packets = reader.uint32();
                                break;
                            }
                        case 4: {
                                if (!(message.protocols && message.protocols.length))
                                    message.protocols = [];
                                message.protocols.push($root.sd3.Cyber.TrafficFlow.TimePoint.ProtocolBreakdown.decode(reader, reader.uint32(), undefined, long + 1));
                                break;
                            }
                        default:
                            reader.skipType(tag & 7, long);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a TimePoint message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof sd3.Cyber.TrafficFlow.TimePoint
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {sd3.Cyber.TrafficFlow.TimePoint} TimePoint
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                TimePoint.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a TimePoint message.
                 * @function verify
                 * @memberof sd3.Cyber.TrafficFlow.TimePoint
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                TimePoint.verify = function verify(message, long) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (long === undefined)
                        long = 0;
                    if (long > $util.recursionLimit)
                        return "maximum nesting depth exceeded";
                    if (message.seconds != null && message.hasOwnProperty("seconds"))
                        if (!$util.isInteger(message.seconds))
                            return "seconds: integer expected";
                    if (message.bytes != null && message.hasOwnProperty("bytes"))
                        if (!$util.isInteger(message.bytes))
                            return "bytes: integer expected";
                    if (message.packets != null && message.hasOwnProperty("packets"))
                        if (!$util.isInteger(message.packets))
                            return "packets: integer expected";
                    if (message.protocols != null && message.hasOwnProperty("protocols")) {
                        if (!Array.isArray(message.protocols))
                            return "protocols: array expected";
                        for (let i = 0; i < message.protocols.length; ++i) {
                            let error = $root.sd3.Cyber.TrafficFlow.TimePoint.ProtocolBreakdown.verify(message.protocols[i], long + 1);
                            if (error)
                                return "protocols." + error;
                        }
                    }
                    return null;
                };

                /**
                 * Creates a TimePoint message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof sd3.Cyber.TrafficFlow.TimePoint
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {sd3.Cyber.TrafficFlow.TimePoint} TimePoint
                 */
                TimePoint.fromObject = function fromObject(object, long) {
                    if (object instanceof $root.sd3.Cyber.TrafficFlow.TimePoint)
                        return object;
                    if (long === undefined)
                        long = 0;
                    if (long > $util.recursionLimit)
                        throw Error("maximum nesting depth exceeded");
                    let message = new $root.sd3.Cyber.TrafficFlow.TimePoint();
                    if (object.seconds != null)
                        message.seconds = object.seconds >>> 0;
                    if (object.bytes != null)
                        message.bytes = object.bytes >>> 0;
                    if (object.packets != null)
                        message.packets = object.packets >>> 0;
                    if (object.protocols) {
                        if (!Array.isArray(object.protocols))
                            throw TypeError(".sd3.Cyber.TrafficFlow.TimePoint.protocols: array expected");
                        message.protocols = [];
                        for (let i = 0; i < object.protocols.length; ++i) {
                            if (typeof object.protocols[i] !== "object")
                                throw TypeError(".sd3.Cyber.TrafficFlow.TimePoint.protocols: object expected");
                            message.protocols[i] = $root.sd3.Cyber.TrafficFlow.TimePoint.ProtocolBreakdown.fromObject(object.protocols[i], long + 1);
                        }
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a TimePoint message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof sd3.Cyber.TrafficFlow.TimePoint
                 * @static
                 * @param {sd3.Cyber.TrafficFlow.TimePoint} message TimePoint
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                TimePoint.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.arrays || options.defaults)
                        object.protocols = [];
                    if (options.defaults) {
                        object.seconds = 0;
                        object.bytes = 0;
                        object.packets = 0;
                    }
                    if (message.seconds != null && message.hasOwnProperty("seconds"))
                        object.seconds = message.seconds;
                    if (message.bytes != null && message.hasOwnProperty("bytes"))
                        object.bytes = message.bytes;
                    if (message.packets != null && message.hasOwnProperty("packets"))
                        object.packets = message.packets;
                    if (message.protocols && message.protocols.length) {
                        object.protocols = [];
                        for (let j = 0; j < message.protocols.length; ++j)
                            object.protocols[j] = $root.sd3.Cyber.TrafficFlow.TimePoint.ProtocolBreakdown.toObject(message.protocols[j], options);
                    }
                    return object;
                };

                /**
                 * Converts this TimePoint to JSON.
                 * @function toJSON
                 * @memberof sd3.Cyber.TrafficFlow.TimePoint
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                TimePoint.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for TimePoint
                 * @function getTypeUrl
                 * @memberof sd3.Cyber.TrafficFlow.TimePoint
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                TimePoint.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/sd3.Cyber.TrafficFlow.TimePoint";
                };

                TimePoint.ProtocolBreakdown = (function() {

                    /**
                     * Properties of a ProtocolBreakdown.
                     * @memberof sd3.Cyber.TrafficFlow.TimePoint
                     * @interface IProtocolBreakdown
                     * @property {sd3.Cyber.Transport|null} [transport] ProtocolBreakdown transport
                     * @property {sd3.Cyber.AppProtocol|null} [app] ProtocolBreakdown app
                     * @property {number|null} [bytes] ProtocolBreakdown bytes
                     * @property {number|null} [packets] ProtocolBreakdown packets
                     * @property {number|null} [rstCount] ProtocolBreakdown rstCount
                     */

                    /**
                     * Constructs a new ProtocolBreakdown.
                     * @memberof sd3.Cyber.TrafficFlow.TimePoint
                     * @classdesc Represents a ProtocolBreakdown.
                     * @implements IProtocolBreakdown
                     * @constructor
                     * @param {sd3.Cyber.TrafficFlow.TimePoint.IProtocolBreakdown=} [properties] Properties to set
                     */
                    function ProtocolBreakdown(properties) {
                        if (properties)
                            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * ProtocolBreakdown transport.
                     * @member {sd3.Cyber.Transport} transport
                     * @memberof sd3.Cyber.TrafficFlow.TimePoint.ProtocolBreakdown
                     * @instance
                     */
                    ProtocolBreakdown.prototype.transport = 0;

                    /**
                     * ProtocolBreakdown app.
                     * @member {sd3.Cyber.AppProtocol} app
                     * @memberof sd3.Cyber.TrafficFlow.TimePoint.ProtocolBreakdown
                     * @instance
                     */
                    ProtocolBreakdown.prototype.app = 0;

                    /**
                     * ProtocolBreakdown bytes.
                     * @member {number} bytes
                     * @memberof sd3.Cyber.TrafficFlow.TimePoint.ProtocolBreakdown
                     * @instance
                     */
                    ProtocolBreakdown.prototype.bytes = 0;

                    /**
                     * ProtocolBreakdown packets.
                     * @member {number} packets
                     * @memberof sd3.Cyber.TrafficFlow.TimePoint.ProtocolBreakdown
                     * @instance
                     */
                    ProtocolBreakdown.prototype.packets = 0;

                    /**
                     * ProtocolBreakdown rstCount.
                     * @member {number} rstCount
                     * @memberof sd3.Cyber.TrafficFlow.TimePoint.ProtocolBreakdown
                     * @instance
                     */
                    ProtocolBreakdown.prototype.rstCount = 0;

                    /**
                     * Decodes a ProtocolBreakdown message from the specified reader or buffer.
                     * @function decode
                     * @memberof sd3.Cyber.TrafficFlow.TimePoint.ProtocolBreakdown
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {sd3.Cyber.TrafficFlow.TimePoint.ProtocolBreakdown} ProtocolBreakdown
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    ProtocolBreakdown.decode = function decode(reader, length, error, long) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        if (long === undefined)
                            long = 0;
                        if (long > $Reader.recursionLimit)
                            throw Error("maximum nesting depth exceeded");
                        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.sd3.Cyber.TrafficFlow.TimePoint.ProtocolBreakdown();
                        while (reader.pos < end) {
                            let tag = reader.uint32();
                            if (tag === error)
                                break;
                            switch (tag >>> 3) {
                            case 1: {
                                    message.transport = reader.int32();
                                    break;
                                }
                            case 2: {
                                    message.app = reader.int32();
                                    break;
                                }
                            case 3: {
                                    message.bytes = reader.uint32();
                                    break;
                                }
                            case 4: {
                                    message.packets = reader.uint32();
                                    break;
                                }
                            case 5: {
                                    message.rstCount = reader.uint32();
                                    break;
                                }
                            default:
                                reader.skipType(tag & 7, long);
                                break;
                            }
                        }
                        return message;
                    };

                    /**
                     * Decodes a ProtocolBreakdown message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof sd3.Cyber.TrafficFlow.TimePoint.ProtocolBreakdown
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {sd3.Cyber.TrafficFlow.TimePoint.ProtocolBreakdown} ProtocolBreakdown
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    ProtocolBreakdown.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies a ProtocolBreakdown message.
                     * @function verify
                     * @memberof sd3.Cyber.TrafficFlow.TimePoint.ProtocolBreakdown
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    ProtocolBreakdown.verify = function verify(message, long) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (long === undefined)
                            long = 0;
                        if (long > $util.recursionLimit)
                            return "maximum nesting depth exceeded";
                        if (message.transport != null && message.hasOwnProperty("transport"))
                            switch (message.transport) {
                            default:
                                return "transport: enum value expected";
                            case 0:
                            case 1:
                            case 2:
                            case 3:
                            case 4:
                                break;
                            }
                        if (message.app != null && message.hasOwnProperty("app"))
                            switch (message.app) {
                            default:
                                return "app: enum value expected";
                            case 0:
                            case 1:
                            case 2:
                            case 3:
                            case 4:
                            case 5:
                            case 6:
                                break;
                            }
                        if (message.bytes != null && message.hasOwnProperty("bytes"))
                            if (!$util.isInteger(message.bytes))
                                return "bytes: integer expected";
                        if (message.packets != null && message.hasOwnProperty("packets"))
                            if (!$util.isInteger(message.packets))
                                return "packets: integer expected";
                        if (message.rstCount != null && message.hasOwnProperty("rstCount"))
                            if (!$util.isInteger(message.rstCount))
                                return "rstCount: integer expected";
                        return null;
                    };

                    /**
                     * Creates a ProtocolBreakdown message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof sd3.Cyber.TrafficFlow.TimePoint.ProtocolBreakdown
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {sd3.Cyber.TrafficFlow.TimePoint.ProtocolBreakdown} ProtocolBreakdown
                     */
                    ProtocolBreakdown.fromObject = function fromObject(object, long) {
                        if (object instanceof $root.sd3.Cyber.TrafficFlow.TimePoint.ProtocolBreakdown)
                            return object;
                        if (long === undefined)
                            long = 0;
                        if (long > $util.recursionLimit)
                            throw Error("maximum nesting depth exceeded");
                        let message = new $root.sd3.Cyber.TrafficFlow.TimePoint.ProtocolBreakdown();
                        switch (object.transport) {
                        default:
                            if (typeof object.transport === "number") {
                                message.transport = object.transport;
                                break;
                            }
                            break;
                        case "TRANSPORT_UNKNOWN":
                        case 0:
                            message.transport = 0;
                            break;
                        case "TCP":
                        case 1:
                            message.transport = 1;
                            break;
                        case "UDP":
                        case 2:
                            message.transport = 2;
                            break;
                        case "ICMP":
                        case 3:
                            message.transport = 3;
                            break;
                        case "IGMP":
                        case 4:
                            message.transport = 4;
                            break;
                        }
                        switch (object.app) {
                        default:
                            if (typeof object.app === "number") {
                                message.app = object.app;
                                break;
                            }
                            break;
                        case "APP_UNKNOWN":
                        case 0:
                            message.app = 0;
                            break;
                        case "HTTP":
                        case 1:
                            message.app = 1;
                            break;
                        case "TLS":
                        case 2:
                            message.app = 2;
                            break;
                        case "DNS":
                        case 3:
                            message.app = 3;
                            break;
                        case "SSH":
                        case 4:
                            message.app = 4;
                            break;
                        case "IEEE_2030_5":
                        case 5:
                            message.app = 5;
                            break;
                        case "EPHEMERAL":
                        case 6:
                            message.app = 6;
                            break;
                        }
                        if (object.bytes != null)
                            message.bytes = object.bytes >>> 0;
                        if (object.packets != null)
                            message.packets = object.packets >>> 0;
                        if (object.rstCount != null)
                            message.rstCount = object.rstCount >>> 0;
                        return message;
                    };

                    /**
                     * Creates a plain object from a ProtocolBreakdown message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof sd3.Cyber.TrafficFlow.TimePoint.ProtocolBreakdown
                     * @static
                     * @param {sd3.Cyber.TrafficFlow.TimePoint.ProtocolBreakdown} message ProtocolBreakdown
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    ProtocolBreakdown.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        let object = {};
                        if (options.defaults) {
                            object.transport = options.enums === String ? "TRANSPORT_UNKNOWN" : 0;
                            object.app = options.enums === String ? "APP_UNKNOWN" : 0;
                            object.bytes = 0;
                            object.packets = 0;
                            object.rstCount = 0;
                        }
                        if (message.transport != null && message.hasOwnProperty("transport"))
                            object.transport = options.enums === String ? $root.sd3.Cyber.Transport[message.transport] === undefined ? message.transport : $root.sd3.Cyber.Transport[message.transport] : message.transport;
                        if (message.app != null && message.hasOwnProperty("app"))
                            object.app = options.enums === String ? $root.sd3.Cyber.AppProtocol[message.app] === undefined ? message.app : $root.sd3.Cyber.AppProtocol[message.app] : message.app;
                        if (message.bytes != null && message.hasOwnProperty("bytes"))
                            object.bytes = message.bytes;
                        if (message.packets != null && message.hasOwnProperty("packets"))
                            object.packets = message.packets;
                        if (message.rstCount != null && message.hasOwnProperty("rstCount"))
                            object.rstCount = message.rstCount;
                        return object;
                    };

                    /**
                     * Converts this ProtocolBreakdown to JSON.
                     * @function toJSON
                     * @memberof sd3.Cyber.TrafficFlow.TimePoint.ProtocolBreakdown
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    ProtocolBreakdown.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    /**
                     * Gets the default type url for ProtocolBreakdown
                     * @function getTypeUrl
                     * @memberof sd3.Cyber.TrafficFlow.TimePoint.ProtocolBreakdown
                     * @static
                     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                     * @returns {string} The default type url
                     */
                    ProtocolBreakdown.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                        if (typeUrlPrefix === undefined) {
                            typeUrlPrefix = "type.googleapis.com";
                        }
                        return typeUrlPrefix + "/sd3.Cyber.TrafficFlow.TimePoint.ProtocolBreakdown";
                    };

                    return ProtocolBreakdown;
                })();

                return TimePoint;
            })();

            return TrafficFlow;
        })();

        return Cyber;
    })();

    sd3.Scenario = (function() {

        /**
         * Properties of a Scenario.
         * @memberof sd3
         * @interface IScenario
         * @property {string|null} [name] Scenario name
         * @property {Array.<sd3.Scenario.ILine>|null} [lines] Scenario lines
         * @property {Array.<sd3.Scenario.ITransformer>|null} [transformers] Scenario transformers
         * @property {Array.<sd3.Scenario.ILoad>|null} [loads] Scenario loads
         * @property {Array.<sd3.Scenario.IBus>|null} [buses] Scenario buses
         * @property {Array.<sd3.Scenario.IBreaker>|null} [breakers] Scenario breakers
         * @property {Array.<sd3.Scenario.ICircuit>|null} [circuits] Scenario circuits
         * @property {Array.<sd3.Scenario.IRegulator>|null} [regulators] Scenario regulators
         * @property {Array.<sd3.Scenario.ICapacitor>|null} [capacitors] Scenario capacitors
         * @property {number|Long|null} [startTime] Scenario startTime
         * @property {number|Long|null} [endTime] Scenario endTime
         * @property {sd3.ICyber|null} [cyber] Scenario cyber
         * @property {Array.<sd3.Scenario.IBattery>|null} [batteries] Scenario batteries
         * @property {Array.<sd3.Scenario.IBuilding>|null} [buildings] Scenario buildings
         */

        /**
         * Constructs a new Scenario.
         * @memberof sd3
         * @classdesc Represents a Scenario.
         * @implements IScenario
         * @constructor
         * @param {sd3.IScenario=} [properties] Properties to set
         */
        function Scenario(properties) {
            this.lines = [];
            this.transformers = [];
            this.loads = [];
            this.buses = [];
            this.breakers = [];
            this.circuits = [];
            this.regulators = [];
            this.capacitors = [];
            this.batteries = [];
            this.buildings = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Scenario name.
         * @member {string} name
         * @memberof sd3.Scenario
         * @instance
         */
        Scenario.prototype.name = "";

        /**
         * Scenario lines.
         * @member {Array.<sd3.Scenario.ILine>} lines
         * @memberof sd3.Scenario
         * @instance
         */
        Scenario.prototype.lines = $util.emptyArray;

        /**
         * Scenario transformers.
         * @member {Array.<sd3.Scenario.ITransformer>} transformers
         * @memberof sd3.Scenario
         * @instance
         */
        Scenario.prototype.transformers = $util.emptyArray;

        /**
         * Scenario loads.
         * @member {Array.<sd3.Scenario.ILoad>} loads
         * @memberof sd3.Scenario
         * @instance
         */
        Scenario.prototype.loads = $util.emptyArray;

        /**
         * Scenario buses.
         * @member {Array.<sd3.Scenario.IBus>} buses
         * @memberof sd3.Scenario
         * @instance
         */
        Scenario.prototype.buses = $util.emptyArray;

        /**
         * Scenario breakers.
         * @member {Array.<sd3.Scenario.IBreaker>} breakers
         * @memberof sd3.Scenario
         * @instance
         */
        Scenario.prototype.breakers = $util.emptyArray;

        /**
         * Scenario circuits.
         * @member {Array.<sd3.Scenario.ICircuit>} circuits
         * @memberof sd3.Scenario
         * @instance
         */
        Scenario.prototype.circuits = $util.emptyArray;

        /**
         * Scenario regulators.
         * @member {Array.<sd3.Scenario.IRegulator>} regulators
         * @memberof sd3.Scenario
         * @instance
         */
        Scenario.prototype.regulators = $util.emptyArray;

        /**
         * Scenario capacitors.
         * @member {Array.<sd3.Scenario.ICapacitor>} capacitors
         * @memberof sd3.Scenario
         * @instance
         */
        Scenario.prototype.capacitors = $util.emptyArray;

        /**
         * Scenario startTime.
         * @member {number|Long} startTime
         * @memberof sd3.Scenario
         * @instance
         */
        Scenario.prototype.startTime = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Scenario endTime.
         * @member {number|Long} endTime
         * @memberof sd3.Scenario
         * @instance
         */
        Scenario.prototype.endTime = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Scenario cyber.
         * @member {sd3.ICyber|null|undefined} cyber
         * @memberof sd3.Scenario
         * @instance
         */
        Scenario.prototype.cyber = null;

        /**
         * Scenario batteries.
         * @member {Array.<sd3.Scenario.IBattery>} batteries
         * @memberof sd3.Scenario
         * @instance
         */
        Scenario.prototype.batteries = $util.emptyArray;

        /**
         * Scenario buildings.
         * @member {Array.<sd3.Scenario.IBuilding>} buildings
         * @memberof sd3.Scenario
         * @instance
         */
        Scenario.prototype.buildings = $util.emptyArray;

        /**
         * Decodes a Scenario message from the specified reader or buffer.
         * @function decode
         * @memberof sd3.Scenario
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {sd3.Scenario} Scenario
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Scenario.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.sd3.Scenario();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.name = reader.string();
                        break;
                    }
                case 2: {
                        if (!(message.lines && message.lines.length))
                            message.lines = [];
                        message.lines.push($root.sd3.Scenario.Line.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 3: {
                        if (!(message.transformers && message.transformers.length))
                            message.transformers = [];
                        message.transformers.push($root.sd3.Scenario.Transformer.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 4: {
                        if (!(message.loads && message.loads.length))
                            message.loads = [];
                        message.loads.push($root.sd3.Scenario.Load.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 5: {
                        if (!(message.buses && message.buses.length))
                            message.buses = [];
                        message.buses.push($root.sd3.Scenario.Bus.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 6: {
                        if (!(message.breakers && message.breakers.length))
                            message.breakers = [];
                        message.breakers.push($root.sd3.Scenario.Breaker.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 7: {
                        if (!(message.circuits && message.circuits.length))
                            message.circuits = [];
                        message.circuits.push($root.sd3.Scenario.Circuit.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 8: {
                        if (!(message.regulators && message.regulators.length))
                            message.regulators = [];
                        message.regulators.push($root.sd3.Scenario.Regulator.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 9: {
                        if (!(message.capacitors && message.capacitors.length))
                            message.capacitors = [];
                        message.capacitors.push($root.sd3.Scenario.Capacitor.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 10: {
                        message.startTime = reader.uint64();
                        break;
                    }
                case 11: {
                        message.endTime = reader.uint64();
                        break;
                    }
                case 12: {
                        message.cyber = $root.sd3.Cyber.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                case 13: {
                        if (!(message.batteries && message.batteries.length))
                            message.batteries = [];
                        message.batteries.push($root.sd3.Scenario.Battery.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 14: {
                        if (!(message.buildings && message.buildings.length))
                            message.buildings = [];
                        message.buildings.push($root.sd3.Scenario.Building.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                default:
                    reader.skipType(tag & 7, long);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Scenario message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof sd3.Scenario
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {sd3.Scenario} Scenario
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Scenario.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Scenario message.
         * @function verify
         * @memberof sd3.Scenario
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Scenario.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.name != null && message.hasOwnProperty("name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            if (message.lines != null && message.hasOwnProperty("lines")) {
                if (!Array.isArray(message.lines))
                    return "lines: array expected";
                for (let i = 0; i < message.lines.length; ++i) {
                    let error = $root.sd3.Scenario.Line.verify(message.lines[i], long + 1);
                    if (error)
                        return "lines." + error;
                }
            }
            if (message.transformers != null && message.hasOwnProperty("transformers")) {
                if (!Array.isArray(message.transformers))
                    return "transformers: array expected";
                for (let i = 0; i < message.transformers.length; ++i) {
                    let error = $root.sd3.Scenario.Transformer.verify(message.transformers[i], long + 1);
                    if (error)
                        return "transformers." + error;
                }
            }
            if (message.loads != null && message.hasOwnProperty("loads")) {
                if (!Array.isArray(message.loads))
                    return "loads: array expected";
                for (let i = 0; i < message.loads.length; ++i) {
                    let error = $root.sd3.Scenario.Load.verify(message.loads[i], long + 1);
                    if (error)
                        return "loads." + error;
                }
            }
            if (message.buses != null && message.hasOwnProperty("buses")) {
                if (!Array.isArray(message.buses))
                    return "buses: array expected";
                for (let i = 0; i < message.buses.length; ++i) {
                    let error = $root.sd3.Scenario.Bus.verify(message.buses[i], long + 1);
                    if (error)
                        return "buses." + error;
                }
            }
            if (message.breakers != null && message.hasOwnProperty("breakers")) {
                if (!Array.isArray(message.breakers))
                    return "breakers: array expected";
                for (let i = 0; i < message.breakers.length; ++i) {
                    let error = $root.sd3.Scenario.Breaker.verify(message.breakers[i], long + 1);
                    if (error)
                        return "breakers." + error;
                }
            }
            if (message.circuits != null && message.hasOwnProperty("circuits")) {
                if (!Array.isArray(message.circuits))
                    return "circuits: array expected";
                for (let i = 0; i < message.circuits.length; ++i) {
                    let error = $root.sd3.Scenario.Circuit.verify(message.circuits[i], long + 1);
                    if (error)
                        return "circuits." + error;
                }
            }
            if (message.regulators != null && message.hasOwnProperty("regulators")) {
                if (!Array.isArray(message.regulators))
                    return "regulators: array expected";
                for (let i = 0; i < message.regulators.length; ++i) {
                    let error = $root.sd3.Scenario.Regulator.verify(message.regulators[i], long + 1);
                    if (error)
                        return "regulators." + error;
                }
            }
            if (message.capacitors != null && message.hasOwnProperty("capacitors")) {
                if (!Array.isArray(message.capacitors))
                    return "capacitors: array expected";
                for (let i = 0; i < message.capacitors.length; ++i) {
                    let error = $root.sd3.Scenario.Capacitor.verify(message.capacitors[i], long + 1);
                    if (error)
                        return "capacitors." + error;
                }
            }
            if (message.startTime != null && message.hasOwnProperty("startTime"))
                if (!$util.isInteger(message.startTime) && !(message.startTime && $util.isInteger(message.startTime.low) && $util.isInteger(message.startTime.high)))
                    return "startTime: integer|Long expected";
            if (message.endTime != null && message.hasOwnProperty("endTime"))
                if (!$util.isInteger(message.endTime) && !(message.endTime && $util.isInteger(message.endTime.low) && $util.isInteger(message.endTime.high)))
                    return "endTime: integer|Long expected";
            if (message.cyber != null && message.hasOwnProperty("cyber")) {
                let error = $root.sd3.Cyber.verify(message.cyber, long + 1);
                if (error)
                    return "cyber." + error;
            }
            if (message.batteries != null && message.hasOwnProperty("batteries")) {
                if (!Array.isArray(message.batteries))
                    return "batteries: array expected";
                for (let i = 0; i < message.batteries.length; ++i) {
                    let error = $root.sd3.Scenario.Battery.verify(message.batteries[i], long + 1);
                    if (error)
                        return "batteries." + error;
                }
            }
            if (message.buildings != null && message.hasOwnProperty("buildings")) {
                if (!Array.isArray(message.buildings))
                    return "buildings: array expected";
                for (let i = 0; i < message.buildings.length; ++i) {
                    let error = $root.sd3.Scenario.Building.verify(message.buildings[i], long + 1);
                    if (error)
                        return "buildings." + error;
                }
            }
            return null;
        };

        /**
         * Creates a Scenario message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof sd3.Scenario
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {sd3.Scenario} Scenario
         */
        Scenario.fromObject = function fromObject(object, long) {
            if (object instanceof $root.sd3.Scenario)
                return object;
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.sd3.Scenario();
            if (object.name != null)
                message.name = String(object.name);
            if (object.lines) {
                if (!Array.isArray(object.lines))
                    throw TypeError(".sd3.Scenario.lines: array expected");
                message.lines = [];
                for (let i = 0; i < object.lines.length; ++i) {
                    if (typeof object.lines[i] !== "object")
                        throw TypeError(".sd3.Scenario.lines: object expected");
                    message.lines[i] = $root.sd3.Scenario.Line.fromObject(object.lines[i], long + 1);
                }
            }
            if (object.transformers) {
                if (!Array.isArray(object.transformers))
                    throw TypeError(".sd3.Scenario.transformers: array expected");
                message.transformers = [];
                for (let i = 0; i < object.transformers.length; ++i) {
                    if (typeof object.transformers[i] !== "object")
                        throw TypeError(".sd3.Scenario.transformers: object expected");
                    message.transformers[i] = $root.sd3.Scenario.Transformer.fromObject(object.transformers[i], long + 1);
                }
            }
            if (object.loads) {
                if (!Array.isArray(object.loads))
                    throw TypeError(".sd3.Scenario.loads: array expected");
                message.loads = [];
                for (let i = 0; i < object.loads.length; ++i) {
                    if (typeof object.loads[i] !== "object")
                        throw TypeError(".sd3.Scenario.loads: object expected");
                    message.loads[i] = $root.sd3.Scenario.Load.fromObject(object.loads[i], long + 1);
                }
            }
            if (object.buses) {
                if (!Array.isArray(object.buses))
                    throw TypeError(".sd3.Scenario.buses: array expected");
                message.buses = [];
                for (let i = 0; i < object.buses.length; ++i) {
                    if (typeof object.buses[i] !== "object")
                        throw TypeError(".sd3.Scenario.buses: object expected");
                    message.buses[i] = $root.sd3.Scenario.Bus.fromObject(object.buses[i], long + 1);
                }
            }
            if (object.breakers) {
                if (!Array.isArray(object.breakers))
                    throw TypeError(".sd3.Scenario.breakers: array expected");
                message.breakers = [];
                for (let i = 0; i < object.breakers.length; ++i) {
                    if (typeof object.breakers[i] !== "object")
                        throw TypeError(".sd3.Scenario.breakers: object expected");
                    message.breakers[i] = $root.sd3.Scenario.Breaker.fromObject(object.breakers[i], long + 1);
                }
            }
            if (object.circuits) {
                if (!Array.isArray(object.circuits))
                    throw TypeError(".sd3.Scenario.circuits: array expected");
                message.circuits = [];
                for (let i = 0; i < object.circuits.length; ++i) {
                    if (typeof object.circuits[i] !== "object")
                        throw TypeError(".sd3.Scenario.circuits: object expected");
                    message.circuits[i] = $root.sd3.Scenario.Circuit.fromObject(object.circuits[i], long + 1);
                }
            }
            if (object.regulators) {
                if (!Array.isArray(object.regulators))
                    throw TypeError(".sd3.Scenario.regulators: array expected");
                message.regulators = [];
                for (let i = 0; i < object.regulators.length; ++i) {
                    if (typeof object.regulators[i] !== "object")
                        throw TypeError(".sd3.Scenario.regulators: object expected");
                    message.regulators[i] = $root.sd3.Scenario.Regulator.fromObject(object.regulators[i], long + 1);
                }
            }
            if (object.capacitors) {
                if (!Array.isArray(object.capacitors))
                    throw TypeError(".sd3.Scenario.capacitors: array expected");
                message.capacitors = [];
                for (let i = 0; i < object.capacitors.length; ++i) {
                    if (typeof object.capacitors[i] !== "object")
                        throw TypeError(".sd3.Scenario.capacitors: object expected");
                    message.capacitors[i] = $root.sd3.Scenario.Capacitor.fromObject(object.capacitors[i], long + 1);
                }
            }
            if (object.startTime != null)
                if ($util.Long)
                    (message.startTime = $util.Long.fromValue(object.startTime)).unsigned = true;
                else if (typeof object.startTime === "string")
                    message.startTime = parseInt(object.startTime, 10);
                else if (typeof object.startTime === "number")
                    message.startTime = object.startTime;
                else if (typeof object.startTime === "object")
                    message.startTime = new $util.LongBits(object.startTime.low >>> 0, object.startTime.high >>> 0).toNumber(true);
            if (object.endTime != null)
                if ($util.Long)
                    (message.endTime = $util.Long.fromValue(object.endTime)).unsigned = true;
                else if (typeof object.endTime === "string")
                    message.endTime = parseInt(object.endTime, 10);
                else if (typeof object.endTime === "number")
                    message.endTime = object.endTime;
                else if (typeof object.endTime === "object")
                    message.endTime = new $util.LongBits(object.endTime.low >>> 0, object.endTime.high >>> 0).toNumber(true);
            if (object.cyber != null) {
                if (typeof object.cyber !== "object")
                    throw TypeError(".sd3.Scenario.cyber: object expected");
                message.cyber = $root.sd3.Cyber.fromObject(object.cyber, long + 1);
            }
            if (object.batteries) {
                if (!Array.isArray(object.batteries))
                    throw TypeError(".sd3.Scenario.batteries: array expected");
                message.batteries = [];
                for (let i = 0; i < object.batteries.length; ++i) {
                    if (typeof object.batteries[i] !== "object")
                        throw TypeError(".sd3.Scenario.batteries: object expected");
                    message.batteries[i] = $root.sd3.Scenario.Battery.fromObject(object.batteries[i], long + 1);
                }
            }
            if (object.buildings) {
                if (!Array.isArray(object.buildings))
                    throw TypeError(".sd3.Scenario.buildings: array expected");
                message.buildings = [];
                for (let i = 0; i < object.buildings.length; ++i) {
                    if (typeof object.buildings[i] !== "object")
                        throw TypeError(".sd3.Scenario.buildings: object expected");
                    message.buildings[i] = $root.sd3.Scenario.Building.fromObject(object.buildings[i], long + 1);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a Scenario message. Also converts values to other types if specified.
         * @function toObject
         * @memberof sd3.Scenario
         * @static
         * @param {sd3.Scenario} message Scenario
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Scenario.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults) {
                object.lines = [];
                object.transformers = [];
                object.loads = [];
                object.buses = [];
                object.breakers = [];
                object.circuits = [];
                object.regulators = [];
                object.capacitors = [];
                object.batteries = [];
                object.buildings = [];
            }
            if (options.defaults) {
                object.name = "";
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.startTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.startTime = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.endTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.endTime = options.longs === String ? "0" : 0;
                object.cyber = null;
            }
            if (message.name != null && message.hasOwnProperty("name"))
                object.name = message.name;
            if (message.lines && message.lines.length) {
                object.lines = [];
                for (let j = 0; j < message.lines.length; ++j)
                    object.lines[j] = $root.sd3.Scenario.Line.toObject(message.lines[j], options);
            }
            if (message.transformers && message.transformers.length) {
                object.transformers = [];
                for (let j = 0; j < message.transformers.length; ++j)
                    object.transformers[j] = $root.sd3.Scenario.Transformer.toObject(message.transformers[j], options);
            }
            if (message.loads && message.loads.length) {
                object.loads = [];
                for (let j = 0; j < message.loads.length; ++j)
                    object.loads[j] = $root.sd3.Scenario.Load.toObject(message.loads[j], options);
            }
            if (message.buses && message.buses.length) {
                object.buses = [];
                for (let j = 0; j < message.buses.length; ++j)
                    object.buses[j] = $root.sd3.Scenario.Bus.toObject(message.buses[j], options);
            }
            if (message.breakers && message.breakers.length) {
                object.breakers = [];
                for (let j = 0; j < message.breakers.length; ++j)
                    object.breakers[j] = $root.sd3.Scenario.Breaker.toObject(message.breakers[j], options);
            }
            if (message.circuits && message.circuits.length) {
                object.circuits = [];
                for (let j = 0; j < message.circuits.length; ++j)
                    object.circuits[j] = $root.sd3.Scenario.Circuit.toObject(message.circuits[j], options);
            }
            if (message.regulators && message.regulators.length) {
                object.regulators = [];
                for (let j = 0; j < message.regulators.length; ++j)
                    object.regulators[j] = $root.sd3.Scenario.Regulator.toObject(message.regulators[j], options);
            }
            if (message.capacitors && message.capacitors.length) {
                object.capacitors = [];
                for (let j = 0; j < message.capacitors.length; ++j)
                    object.capacitors[j] = $root.sd3.Scenario.Capacitor.toObject(message.capacitors[j], options);
            }
            if (message.startTime != null && message.hasOwnProperty("startTime"))
                if (typeof message.startTime === "number")
                    object.startTime = options.longs === String ? String(message.startTime) : message.startTime;
                else
                    object.startTime = options.longs === String ? $util.Long.prototype.toString.call(message.startTime) : options.longs === Number ? new $util.LongBits(message.startTime.low >>> 0, message.startTime.high >>> 0).toNumber(true) : message.startTime;
            if (message.endTime != null && message.hasOwnProperty("endTime"))
                if (typeof message.endTime === "number")
                    object.endTime = options.longs === String ? String(message.endTime) : message.endTime;
                else
                    object.endTime = options.longs === String ? $util.Long.prototype.toString.call(message.endTime) : options.longs === Number ? new $util.LongBits(message.endTime.low >>> 0, message.endTime.high >>> 0).toNumber(true) : message.endTime;
            if (message.cyber != null && message.hasOwnProperty("cyber"))
                object.cyber = $root.sd3.Cyber.toObject(message.cyber, options);
            if (message.batteries && message.batteries.length) {
                object.batteries = [];
                for (let j = 0; j < message.batteries.length; ++j)
                    object.batteries[j] = $root.sd3.Scenario.Battery.toObject(message.batteries[j], options);
            }
            if (message.buildings && message.buildings.length) {
                object.buildings = [];
                for (let j = 0; j < message.buildings.length; ++j)
                    object.buildings[j] = $root.sd3.Scenario.Building.toObject(message.buildings[j], options);
            }
            return object;
        };

        /**
         * Converts this Scenario to JSON.
         * @function toJSON
         * @memberof sd3.Scenario
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Scenario.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Scenario
         * @function getTypeUrl
         * @memberof sd3.Scenario
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Scenario.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/sd3.Scenario";
        };

        Scenario.Line = (function() {

            /**
             * Properties of a Line.
             * @memberof sd3.Scenario
             * @interface ILine
             * @property {number|null} [id] Line id
             * @property {Array.<sd3.Scenario.Line.ITimePoint>|null} [timeseries] Line timeseries
             */

            /**
             * Constructs a new Line.
             * @memberof sd3.Scenario
             * @classdesc Represents a Line.
             * @implements ILine
             * @constructor
             * @param {sd3.Scenario.ILine=} [properties] Properties to set
             */
            function Line(properties) {
                this.timeseries = [];
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Line id.
             * @member {number} id
             * @memberof sd3.Scenario.Line
             * @instance
             */
            Line.prototype.id = 0;

            /**
             * Line timeseries.
             * @member {Array.<sd3.Scenario.Line.ITimePoint>} timeseries
             * @memberof sd3.Scenario.Line
             * @instance
             */
            Line.prototype.timeseries = $util.emptyArray;

            /**
             * Decodes a Line message from the specified reader or buffer.
             * @function decode
             * @memberof sd3.Scenario.Line
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {sd3.Scenario.Line} Line
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Line.decode = function decode(reader, length, error, long) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (long === undefined)
                    long = 0;
                if (long > $Reader.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.sd3.Scenario.Line();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.id = reader.uint32();
                            break;
                        }
                    case 2: {
                            if (!(message.timeseries && message.timeseries.length))
                                message.timeseries = [];
                            message.timeseries.push($root.sd3.Scenario.Line.TimePoint.decode(reader, reader.uint32(), undefined, long + 1));
                            break;
                        }
                    default:
                        reader.skipType(tag & 7, long);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Line message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof sd3.Scenario.Line
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {sd3.Scenario.Line} Line
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Line.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Line message.
             * @function verify
             * @memberof sd3.Scenario.Line
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Line.verify = function verify(message, long) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    return "maximum nesting depth exceeded";
                if (message.id != null && message.hasOwnProperty("id"))
                    if (!$util.isInteger(message.id))
                        return "id: integer expected";
                if (message.timeseries != null && message.hasOwnProperty("timeseries")) {
                    if (!Array.isArray(message.timeseries))
                        return "timeseries: array expected";
                    for (let i = 0; i < message.timeseries.length; ++i) {
                        let error = $root.sd3.Scenario.Line.TimePoint.verify(message.timeseries[i], long + 1);
                        if (error)
                            return "timeseries." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a Line message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof sd3.Scenario.Line
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {sd3.Scenario.Line} Line
             */
            Line.fromObject = function fromObject(object, long) {
                if (object instanceof $root.sd3.Scenario.Line)
                    return object;
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let message = new $root.sd3.Scenario.Line();
                if (object.id != null)
                    message.id = object.id >>> 0;
                if (object.timeseries) {
                    if (!Array.isArray(object.timeseries))
                        throw TypeError(".sd3.Scenario.Line.timeseries: array expected");
                    message.timeseries = [];
                    for (let i = 0; i < object.timeseries.length; ++i) {
                        if (typeof object.timeseries[i] !== "object")
                            throw TypeError(".sd3.Scenario.Line.timeseries: object expected");
                        message.timeseries[i] = $root.sd3.Scenario.Line.TimePoint.fromObject(object.timeseries[i], long + 1);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from a Line message. Also converts values to other types if specified.
             * @function toObject
             * @memberof sd3.Scenario.Line
             * @static
             * @param {sd3.Scenario.Line} message Line
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Line.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.arrays || options.defaults)
                    object.timeseries = [];
                if (options.defaults)
                    object.id = 0;
                if (message.id != null && message.hasOwnProperty("id"))
                    object.id = message.id;
                if (message.timeseries && message.timeseries.length) {
                    object.timeseries = [];
                    for (let j = 0; j < message.timeseries.length; ++j)
                        object.timeseries[j] = $root.sd3.Scenario.Line.TimePoint.toObject(message.timeseries[j], options);
                }
                return object;
            };

            /**
             * Converts this Line to JSON.
             * @function toJSON
             * @memberof sd3.Scenario.Line
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Line.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for Line
             * @function getTypeUrl
             * @memberof sd3.Scenario.Line
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            Line.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/sd3.Scenario.Line";
            };

            Line.TimePoint = (function() {

                /**
                 * Properties of a TimePoint.
                 * @memberof sd3.Scenario.Line
                 * @interface ITimePoint
                 * @property {number|null} [seconds] TimePoint seconds
                 * @property {number|null} [voltage] TimePoint voltage
                 * @property {number|null} [current] TimePoint current
                 * @property {number|null} [activePower] TimePoint activePower
                 * @property {number|null} [reactivePower] TimePoint reactivePower
                 */

                /**
                 * Constructs a new TimePoint.
                 * @memberof sd3.Scenario.Line
                 * @classdesc Represents a TimePoint.
                 * @implements ITimePoint
                 * @constructor
                 * @param {sd3.Scenario.Line.ITimePoint=} [properties] Properties to set
                 */
                function TimePoint(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * TimePoint seconds.
                 * @member {number} seconds
                 * @memberof sd3.Scenario.Line.TimePoint
                 * @instance
                 */
                TimePoint.prototype.seconds = 0;

                /**
                 * TimePoint voltage.
                 * @member {number} voltage
                 * @memberof sd3.Scenario.Line.TimePoint
                 * @instance
                 */
                TimePoint.prototype.voltage = 0;

                /**
                 * TimePoint current.
                 * @member {number} current
                 * @memberof sd3.Scenario.Line.TimePoint
                 * @instance
                 */
                TimePoint.prototype.current = 0;

                /**
                 * TimePoint activePower.
                 * @member {number} activePower
                 * @memberof sd3.Scenario.Line.TimePoint
                 * @instance
                 */
                TimePoint.prototype.activePower = 0;

                /**
                 * TimePoint reactivePower.
                 * @member {number} reactivePower
                 * @memberof sd3.Scenario.Line.TimePoint
                 * @instance
                 */
                TimePoint.prototype.reactivePower = 0;

                /**
                 * Decodes a TimePoint message from the specified reader or buffer.
                 * @function decode
                 * @memberof sd3.Scenario.Line.TimePoint
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {sd3.Scenario.Line.TimePoint} TimePoint
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                TimePoint.decode = function decode(reader, length, error, long) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (long === undefined)
                        long = 0;
                    if (long > $Reader.recursionLimit)
                        throw Error("maximum nesting depth exceeded");
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.sd3.Scenario.Line.TimePoint();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.seconds = reader.uint32();
                                break;
                            }
                        case 2: {
                                message.voltage = reader.float();
                                break;
                            }
                        case 3: {
                                message.current = reader.float();
                                break;
                            }
                        case 4: {
                                message.activePower = reader.float();
                                break;
                            }
                        case 5: {
                                message.reactivePower = reader.float();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7, long);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a TimePoint message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof sd3.Scenario.Line.TimePoint
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {sd3.Scenario.Line.TimePoint} TimePoint
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                TimePoint.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a TimePoint message.
                 * @function verify
                 * @memberof sd3.Scenario.Line.TimePoint
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                TimePoint.verify = function verify(message, long) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (long === undefined)
                        long = 0;
                    if (long > $util.recursionLimit)
                        return "maximum nesting depth exceeded";
                    if (message.seconds != null && message.hasOwnProperty("seconds"))
                        if (!$util.isInteger(message.seconds))
                            return "seconds: integer expected";
                    if (message.voltage != null && message.hasOwnProperty("voltage"))
                        if (typeof message.voltage !== "number")
                            return "voltage: number expected";
                    if (message.current != null && message.hasOwnProperty("current"))
                        if (typeof message.current !== "number")
                            return "current: number expected";
                    if (message.activePower != null && message.hasOwnProperty("activePower"))
                        if (typeof message.activePower !== "number")
                            return "activePower: number expected";
                    if (message.reactivePower != null && message.hasOwnProperty("reactivePower"))
                        if (typeof message.reactivePower !== "number")
                            return "reactivePower: number expected";
                    return null;
                };

                /**
                 * Creates a TimePoint message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof sd3.Scenario.Line.TimePoint
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {sd3.Scenario.Line.TimePoint} TimePoint
                 */
                TimePoint.fromObject = function fromObject(object, long) {
                    if (object instanceof $root.sd3.Scenario.Line.TimePoint)
                        return object;
                    if (long === undefined)
                        long = 0;
                    if (long > $util.recursionLimit)
                        throw Error("maximum nesting depth exceeded");
                    let message = new $root.sd3.Scenario.Line.TimePoint();
                    if (object.seconds != null)
                        message.seconds = object.seconds >>> 0;
                    if (object.voltage != null)
                        message.voltage = Number(object.voltage);
                    if (object.current != null)
                        message.current = Number(object.current);
                    if (object.activePower != null)
                        message.activePower = Number(object.activePower);
                    if (object.reactivePower != null)
                        message.reactivePower = Number(object.reactivePower);
                    return message;
                };

                /**
                 * Creates a plain object from a TimePoint message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof sd3.Scenario.Line.TimePoint
                 * @static
                 * @param {sd3.Scenario.Line.TimePoint} message TimePoint
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                TimePoint.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults) {
                        object.seconds = 0;
                        object.voltage = 0;
                        object.current = 0;
                        object.activePower = 0;
                        object.reactivePower = 0;
                    }
                    if (message.seconds != null && message.hasOwnProperty("seconds"))
                        object.seconds = message.seconds;
                    if (message.voltage != null && message.hasOwnProperty("voltage"))
                        object.voltage = options.json && !isFinite(message.voltage) ? String(message.voltage) : message.voltage;
                    if (message.current != null && message.hasOwnProperty("current"))
                        object.current = options.json && !isFinite(message.current) ? String(message.current) : message.current;
                    if (message.activePower != null && message.hasOwnProperty("activePower"))
                        object.activePower = options.json && !isFinite(message.activePower) ? String(message.activePower) : message.activePower;
                    if (message.reactivePower != null && message.hasOwnProperty("reactivePower"))
                        object.reactivePower = options.json && !isFinite(message.reactivePower) ? String(message.reactivePower) : message.reactivePower;
                    return object;
                };

                /**
                 * Converts this TimePoint to JSON.
                 * @function toJSON
                 * @memberof sd3.Scenario.Line.TimePoint
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                TimePoint.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for TimePoint
                 * @function getTypeUrl
                 * @memberof sd3.Scenario.Line.TimePoint
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                TimePoint.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/sd3.Scenario.Line.TimePoint";
                };

                return TimePoint;
            })();

            return Line;
        })();

        Scenario.Transformer = (function() {

            /**
             * Properties of a Transformer.
             * @memberof sd3.Scenario
             * @interface ITransformer
             * @property {number|null} [id] Transformer id
             * @property {Array.<sd3.Scenario.Transformer.ITimePoint>|null} [timeseries] Transformer timeseries
             */

            /**
             * Constructs a new Transformer.
             * @memberof sd3.Scenario
             * @classdesc Represents a Transformer.
             * @implements ITransformer
             * @constructor
             * @param {sd3.Scenario.ITransformer=} [properties] Properties to set
             */
            function Transformer(properties) {
                this.timeseries = [];
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Transformer id.
             * @member {number} id
             * @memberof sd3.Scenario.Transformer
             * @instance
             */
            Transformer.prototype.id = 0;

            /**
             * Transformer timeseries.
             * @member {Array.<sd3.Scenario.Transformer.ITimePoint>} timeseries
             * @memberof sd3.Scenario.Transformer
             * @instance
             */
            Transformer.prototype.timeseries = $util.emptyArray;

            /**
             * Decodes a Transformer message from the specified reader or buffer.
             * @function decode
             * @memberof sd3.Scenario.Transformer
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {sd3.Scenario.Transformer} Transformer
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Transformer.decode = function decode(reader, length, error, long) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (long === undefined)
                    long = 0;
                if (long > $Reader.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.sd3.Scenario.Transformer();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.id = reader.uint32();
                            break;
                        }
                    case 2: {
                            if (!(message.timeseries && message.timeseries.length))
                                message.timeseries = [];
                            message.timeseries.push($root.sd3.Scenario.Transformer.TimePoint.decode(reader, reader.uint32(), undefined, long + 1));
                            break;
                        }
                    default:
                        reader.skipType(tag & 7, long);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Transformer message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof sd3.Scenario.Transformer
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {sd3.Scenario.Transformer} Transformer
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Transformer.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Transformer message.
             * @function verify
             * @memberof sd3.Scenario.Transformer
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Transformer.verify = function verify(message, long) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    return "maximum nesting depth exceeded";
                if (message.id != null && message.hasOwnProperty("id"))
                    if (!$util.isInteger(message.id))
                        return "id: integer expected";
                if (message.timeseries != null && message.hasOwnProperty("timeseries")) {
                    if (!Array.isArray(message.timeseries))
                        return "timeseries: array expected";
                    for (let i = 0; i < message.timeseries.length; ++i) {
                        let error = $root.sd3.Scenario.Transformer.TimePoint.verify(message.timeseries[i], long + 1);
                        if (error)
                            return "timeseries." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a Transformer message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof sd3.Scenario.Transformer
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {sd3.Scenario.Transformer} Transformer
             */
            Transformer.fromObject = function fromObject(object, long) {
                if (object instanceof $root.sd3.Scenario.Transformer)
                    return object;
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let message = new $root.sd3.Scenario.Transformer();
                if (object.id != null)
                    message.id = object.id >>> 0;
                if (object.timeseries) {
                    if (!Array.isArray(object.timeseries))
                        throw TypeError(".sd3.Scenario.Transformer.timeseries: array expected");
                    message.timeseries = [];
                    for (let i = 0; i < object.timeseries.length; ++i) {
                        if (typeof object.timeseries[i] !== "object")
                            throw TypeError(".sd3.Scenario.Transformer.timeseries: object expected");
                        message.timeseries[i] = $root.sd3.Scenario.Transformer.TimePoint.fromObject(object.timeseries[i], long + 1);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from a Transformer message. Also converts values to other types if specified.
             * @function toObject
             * @memberof sd3.Scenario.Transformer
             * @static
             * @param {sd3.Scenario.Transformer} message Transformer
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Transformer.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.arrays || options.defaults)
                    object.timeseries = [];
                if (options.defaults)
                    object.id = 0;
                if (message.id != null && message.hasOwnProperty("id"))
                    object.id = message.id;
                if (message.timeseries && message.timeseries.length) {
                    object.timeseries = [];
                    for (let j = 0; j < message.timeseries.length; ++j)
                        object.timeseries[j] = $root.sd3.Scenario.Transformer.TimePoint.toObject(message.timeseries[j], options);
                }
                return object;
            };

            /**
             * Converts this Transformer to JSON.
             * @function toJSON
             * @memberof sd3.Scenario.Transformer
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Transformer.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for Transformer
             * @function getTypeUrl
             * @memberof sd3.Scenario.Transformer
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            Transformer.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/sd3.Scenario.Transformer";
            };

            Transformer.TimePoint = (function() {

                /**
                 * Properties of a TimePoint.
                 * @memberof sd3.Scenario.Transformer
                 * @interface ITimePoint
                 * @property {number|null} [seconds] TimePoint seconds
                 * @property {number|null} [voltage] TimePoint voltage
                 * @property {number|null} [current] TimePoint current
                 * @property {number|null} [activePower] TimePoint activePower
                 * @property {number|null} [reactivePower] TimePoint reactivePower
                 */

                /**
                 * Constructs a new TimePoint.
                 * @memberof sd3.Scenario.Transformer
                 * @classdesc Represents a TimePoint.
                 * @implements ITimePoint
                 * @constructor
                 * @param {sd3.Scenario.Transformer.ITimePoint=} [properties] Properties to set
                 */
                function TimePoint(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * TimePoint seconds.
                 * @member {number} seconds
                 * @memberof sd3.Scenario.Transformer.TimePoint
                 * @instance
                 */
                TimePoint.prototype.seconds = 0;

                /**
                 * TimePoint voltage.
                 * @member {number} voltage
                 * @memberof sd3.Scenario.Transformer.TimePoint
                 * @instance
                 */
                TimePoint.prototype.voltage = 0;

                /**
                 * TimePoint current.
                 * @member {number} current
                 * @memberof sd3.Scenario.Transformer.TimePoint
                 * @instance
                 */
                TimePoint.prototype.current = 0;

                /**
                 * TimePoint activePower.
                 * @member {number} activePower
                 * @memberof sd3.Scenario.Transformer.TimePoint
                 * @instance
                 */
                TimePoint.prototype.activePower = 0;

                /**
                 * TimePoint reactivePower.
                 * @member {number} reactivePower
                 * @memberof sd3.Scenario.Transformer.TimePoint
                 * @instance
                 */
                TimePoint.prototype.reactivePower = 0;

                /**
                 * Decodes a TimePoint message from the specified reader or buffer.
                 * @function decode
                 * @memberof sd3.Scenario.Transformer.TimePoint
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {sd3.Scenario.Transformer.TimePoint} TimePoint
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                TimePoint.decode = function decode(reader, length, error, long) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (long === undefined)
                        long = 0;
                    if (long > $Reader.recursionLimit)
                        throw Error("maximum nesting depth exceeded");
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.sd3.Scenario.Transformer.TimePoint();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.seconds = reader.uint32();
                                break;
                            }
                        case 2: {
                                message.voltage = reader.float();
                                break;
                            }
                        case 3: {
                                message.current = reader.float();
                                break;
                            }
                        case 4: {
                                message.activePower = reader.float();
                                break;
                            }
                        case 5: {
                                message.reactivePower = reader.float();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7, long);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a TimePoint message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof sd3.Scenario.Transformer.TimePoint
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {sd3.Scenario.Transformer.TimePoint} TimePoint
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                TimePoint.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a TimePoint message.
                 * @function verify
                 * @memberof sd3.Scenario.Transformer.TimePoint
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                TimePoint.verify = function verify(message, long) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (long === undefined)
                        long = 0;
                    if (long > $util.recursionLimit)
                        return "maximum nesting depth exceeded";
                    if (message.seconds != null && message.hasOwnProperty("seconds"))
                        if (!$util.isInteger(message.seconds))
                            return "seconds: integer expected";
                    if (message.voltage != null && message.hasOwnProperty("voltage"))
                        if (typeof message.voltage !== "number")
                            return "voltage: number expected";
                    if (message.current != null && message.hasOwnProperty("current"))
                        if (typeof message.current !== "number")
                            return "current: number expected";
                    if (message.activePower != null && message.hasOwnProperty("activePower"))
                        if (typeof message.activePower !== "number")
                            return "activePower: number expected";
                    if (message.reactivePower != null && message.hasOwnProperty("reactivePower"))
                        if (typeof message.reactivePower !== "number")
                            return "reactivePower: number expected";
                    return null;
                };

                /**
                 * Creates a TimePoint message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof sd3.Scenario.Transformer.TimePoint
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {sd3.Scenario.Transformer.TimePoint} TimePoint
                 */
                TimePoint.fromObject = function fromObject(object, long) {
                    if (object instanceof $root.sd3.Scenario.Transformer.TimePoint)
                        return object;
                    if (long === undefined)
                        long = 0;
                    if (long > $util.recursionLimit)
                        throw Error("maximum nesting depth exceeded");
                    let message = new $root.sd3.Scenario.Transformer.TimePoint();
                    if (object.seconds != null)
                        message.seconds = object.seconds >>> 0;
                    if (object.voltage != null)
                        message.voltage = Number(object.voltage);
                    if (object.current != null)
                        message.current = Number(object.current);
                    if (object.activePower != null)
                        message.activePower = Number(object.activePower);
                    if (object.reactivePower != null)
                        message.reactivePower = Number(object.reactivePower);
                    return message;
                };

                /**
                 * Creates a plain object from a TimePoint message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof sd3.Scenario.Transformer.TimePoint
                 * @static
                 * @param {sd3.Scenario.Transformer.TimePoint} message TimePoint
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                TimePoint.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults) {
                        object.seconds = 0;
                        object.voltage = 0;
                        object.current = 0;
                        object.activePower = 0;
                        object.reactivePower = 0;
                    }
                    if (message.seconds != null && message.hasOwnProperty("seconds"))
                        object.seconds = message.seconds;
                    if (message.voltage != null && message.hasOwnProperty("voltage"))
                        object.voltage = options.json && !isFinite(message.voltage) ? String(message.voltage) : message.voltage;
                    if (message.current != null && message.hasOwnProperty("current"))
                        object.current = options.json && !isFinite(message.current) ? String(message.current) : message.current;
                    if (message.activePower != null && message.hasOwnProperty("activePower"))
                        object.activePower = options.json && !isFinite(message.activePower) ? String(message.activePower) : message.activePower;
                    if (message.reactivePower != null && message.hasOwnProperty("reactivePower"))
                        object.reactivePower = options.json && !isFinite(message.reactivePower) ? String(message.reactivePower) : message.reactivePower;
                    return object;
                };

                /**
                 * Converts this TimePoint to JSON.
                 * @function toJSON
                 * @memberof sd3.Scenario.Transformer.TimePoint
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                TimePoint.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for TimePoint
                 * @function getTypeUrl
                 * @memberof sd3.Scenario.Transformer.TimePoint
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                TimePoint.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/sd3.Scenario.Transformer.TimePoint";
                };

                return TimePoint;
            })();

            return Transformer;
        })();

        Scenario.Load = (function() {

            /**
             * Properties of a Load.
             * @memberof sd3.Scenario
             * @interface ILoad
             * @property {number|null} [id] Load id
             * @property {Array.<sd3.Scenario.Load.ITimePoint>|null} [timeseries] Load timeseries
             */

            /**
             * Constructs a new Load.
             * @memberof sd3.Scenario
             * @classdesc Represents a Load.
             * @implements ILoad
             * @constructor
             * @param {sd3.Scenario.ILoad=} [properties] Properties to set
             */
            function Load(properties) {
                this.timeseries = [];
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Load id.
             * @member {number} id
             * @memberof sd3.Scenario.Load
             * @instance
             */
            Load.prototype.id = 0;

            /**
             * Load timeseries.
             * @member {Array.<sd3.Scenario.Load.ITimePoint>} timeseries
             * @memberof sd3.Scenario.Load
             * @instance
             */
            Load.prototype.timeseries = $util.emptyArray;

            /**
             * Decodes a Load message from the specified reader or buffer.
             * @function decode
             * @memberof sd3.Scenario.Load
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {sd3.Scenario.Load} Load
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Load.decode = function decode(reader, length, error, long) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (long === undefined)
                    long = 0;
                if (long > $Reader.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.sd3.Scenario.Load();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.id = reader.uint32();
                            break;
                        }
                    case 2: {
                            if (!(message.timeseries && message.timeseries.length))
                                message.timeseries = [];
                            message.timeseries.push($root.sd3.Scenario.Load.TimePoint.decode(reader, reader.uint32(), undefined, long + 1));
                            break;
                        }
                    default:
                        reader.skipType(tag & 7, long);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Load message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof sd3.Scenario.Load
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {sd3.Scenario.Load} Load
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Load.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Load message.
             * @function verify
             * @memberof sd3.Scenario.Load
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Load.verify = function verify(message, long) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    return "maximum nesting depth exceeded";
                if (message.id != null && message.hasOwnProperty("id"))
                    if (!$util.isInteger(message.id))
                        return "id: integer expected";
                if (message.timeseries != null && message.hasOwnProperty("timeseries")) {
                    if (!Array.isArray(message.timeseries))
                        return "timeseries: array expected";
                    for (let i = 0; i < message.timeseries.length; ++i) {
                        let error = $root.sd3.Scenario.Load.TimePoint.verify(message.timeseries[i], long + 1);
                        if (error)
                            return "timeseries." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a Load message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof sd3.Scenario.Load
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {sd3.Scenario.Load} Load
             */
            Load.fromObject = function fromObject(object, long) {
                if (object instanceof $root.sd3.Scenario.Load)
                    return object;
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let message = new $root.sd3.Scenario.Load();
                if (object.id != null)
                    message.id = object.id >>> 0;
                if (object.timeseries) {
                    if (!Array.isArray(object.timeseries))
                        throw TypeError(".sd3.Scenario.Load.timeseries: array expected");
                    message.timeseries = [];
                    for (let i = 0; i < object.timeseries.length; ++i) {
                        if (typeof object.timeseries[i] !== "object")
                            throw TypeError(".sd3.Scenario.Load.timeseries: object expected");
                        message.timeseries[i] = $root.sd3.Scenario.Load.TimePoint.fromObject(object.timeseries[i], long + 1);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from a Load message. Also converts values to other types if specified.
             * @function toObject
             * @memberof sd3.Scenario.Load
             * @static
             * @param {sd3.Scenario.Load} message Load
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Load.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.arrays || options.defaults)
                    object.timeseries = [];
                if (options.defaults)
                    object.id = 0;
                if (message.id != null && message.hasOwnProperty("id"))
                    object.id = message.id;
                if (message.timeseries && message.timeseries.length) {
                    object.timeseries = [];
                    for (let j = 0; j < message.timeseries.length; ++j)
                        object.timeseries[j] = $root.sd3.Scenario.Load.TimePoint.toObject(message.timeseries[j], options);
                }
                return object;
            };

            /**
             * Converts this Load to JSON.
             * @function toJSON
             * @memberof sd3.Scenario.Load
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Load.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for Load
             * @function getTypeUrl
             * @memberof sd3.Scenario.Load
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            Load.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/sd3.Scenario.Load";
            };

            Load.TimePoint = (function() {

                /**
                 * Properties of a TimePoint.
                 * @memberof sd3.Scenario.Load
                 * @interface ITimePoint
                 * @property {number|null} [seconds] TimePoint seconds
                 * @property {number|null} [voltage] TimePoint voltage
                 * @property {number|null} [current] TimePoint current
                 * @property {number|null} [activePower] TimePoint activePower
                 * @property {number|null} [reactivePower] TimePoint reactivePower
                 */

                /**
                 * Constructs a new TimePoint.
                 * @memberof sd3.Scenario.Load
                 * @classdesc Represents a TimePoint.
                 * @implements ITimePoint
                 * @constructor
                 * @param {sd3.Scenario.Load.ITimePoint=} [properties] Properties to set
                 */
                function TimePoint(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * TimePoint seconds.
                 * @member {number} seconds
                 * @memberof sd3.Scenario.Load.TimePoint
                 * @instance
                 */
                TimePoint.prototype.seconds = 0;

                /**
                 * TimePoint voltage.
                 * @member {number} voltage
                 * @memberof sd3.Scenario.Load.TimePoint
                 * @instance
                 */
                TimePoint.prototype.voltage = 0;

                /**
                 * TimePoint current.
                 * @member {number} current
                 * @memberof sd3.Scenario.Load.TimePoint
                 * @instance
                 */
                TimePoint.prototype.current = 0;

                /**
                 * TimePoint activePower.
                 * @member {number} activePower
                 * @memberof sd3.Scenario.Load.TimePoint
                 * @instance
                 */
                TimePoint.prototype.activePower = 0;

                /**
                 * TimePoint reactivePower.
                 * @member {number} reactivePower
                 * @memberof sd3.Scenario.Load.TimePoint
                 * @instance
                 */
                TimePoint.prototype.reactivePower = 0;

                /**
                 * Decodes a TimePoint message from the specified reader or buffer.
                 * @function decode
                 * @memberof sd3.Scenario.Load.TimePoint
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {sd3.Scenario.Load.TimePoint} TimePoint
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                TimePoint.decode = function decode(reader, length, error, long) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (long === undefined)
                        long = 0;
                    if (long > $Reader.recursionLimit)
                        throw Error("maximum nesting depth exceeded");
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.sd3.Scenario.Load.TimePoint();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.seconds = reader.uint32();
                                break;
                            }
                        case 2: {
                                message.voltage = reader.float();
                                break;
                            }
                        case 3: {
                                message.current = reader.float();
                                break;
                            }
                        case 4: {
                                message.activePower = reader.float();
                                break;
                            }
                        case 5: {
                                message.reactivePower = reader.float();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7, long);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a TimePoint message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof sd3.Scenario.Load.TimePoint
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {sd3.Scenario.Load.TimePoint} TimePoint
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                TimePoint.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a TimePoint message.
                 * @function verify
                 * @memberof sd3.Scenario.Load.TimePoint
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                TimePoint.verify = function verify(message, long) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (long === undefined)
                        long = 0;
                    if (long > $util.recursionLimit)
                        return "maximum nesting depth exceeded";
                    if (message.seconds != null && message.hasOwnProperty("seconds"))
                        if (!$util.isInteger(message.seconds))
                            return "seconds: integer expected";
                    if (message.voltage != null && message.hasOwnProperty("voltage"))
                        if (typeof message.voltage !== "number")
                            return "voltage: number expected";
                    if (message.current != null && message.hasOwnProperty("current"))
                        if (typeof message.current !== "number")
                            return "current: number expected";
                    if (message.activePower != null && message.hasOwnProperty("activePower"))
                        if (typeof message.activePower !== "number")
                            return "activePower: number expected";
                    if (message.reactivePower != null && message.hasOwnProperty("reactivePower"))
                        if (typeof message.reactivePower !== "number")
                            return "reactivePower: number expected";
                    return null;
                };

                /**
                 * Creates a TimePoint message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof sd3.Scenario.Load.TimePoint
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {sd3.Scenario.Load.TimePoint} TimePoint
                 */
                TimePoint.fromObject = function fromObject(object, long) {
                    if (object instanceof $root.sd3.Scenario.Load.TimePoint)
                        return object;
                    if (long === undefined)
                        long = 0;
                    if (long > $util.recursionLimit)
                        throw Error("maximum nesting depth exceeded");
                    let message = new $root.sd3.Scenario.Load.TimePoint();
                    if (object.seconds != null)
                        message.seconds = object.seconds >>> 0;
                    if (object.voltage != null)
                        message.voltage = Number(object.voltage);
                    if (object.current != null)
                        message.current = Number(object.current);
                    if (object.activePower != null)
                        message.activePower = Number(object.activePower);
                    if (object.reactivePower != null)
                        message.reactivePower = Number(object.reactivePower);
                    return message;
                };

                /**
                 * Creates a plain object from a TimePoint message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof sd3.Scenario.Load.TimePoint
                 * @static
                 * @param {sd3.Scenario.Load.TimePoint} message TimePoint
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                TimePoint.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults) {
                        object.seconds = 0;
                        object.voltage = 0;
                        object.current = 0;
                        object.activePower = 0;
                        object.reactivePower = 0;
                    }
                    if (message.seconds != null && message.hasOwnProperty("seconds"))
                        object.seconds = message.seconds;
                    if (message.voltage != null && message.hasOwnProperty("voltage"))
                        object.voltage = options.json && !isFinite(message.voltage) ? String(message.voltage) : message.voltage;
                    if (message.current != null && message.hasOwnProperty("current"))
                        object.current = options.json && !isFinite(message.current) ? String(message.current) : message.current;
                    if (message.activePower != null && message.hasOwnProperty("activePower"))
                        object.activePower = options.json && !isFinite(message.activePower) ? String(message.activePower) : message.activePower;
                    if (message.reactivePower != null && message.hasOwnProperty("reactivePower"))
                        object.reactivePower = options.json && !isFinite(message.reactivePower) ? String(message.reactivePower) : message.reactivePower;
                    return object;
                };

                /**
                 * Converts this TimePoint to JSON.
                 * @function toJSON
                 * @memberof sd3.Scenario.Load.TimePoint
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                TimePoint.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for TimePoint
                 * @function getTypeUrl
                 * @memberof sd3.Scenario.Load.TimePoint
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                TimePoint.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/sd3.Scenario.Load.TimePoint";
                };

                return TimePoint;
            })();

            return Load;
        })();

        Scenario.Bus = (function() {

            /**
             * Properties of a Bus.
             * @memberof sd3.Scenario
             * @interface IBus
             * @property {number|null} [id] Bus id
             * @property {Array.<sd3.Scenario.Bus.ITimePoint>|null} [timeseries] Bus timeseries
             */

            /**
             * Constructs a new Bus.
             * @memberof sd3.Scenario
             * @classdesc Represents a Bus.
             * @implements IBus
             * @constructor
             * @param {sd3.Scenario.IBus=} [properties] Properties to set
             */
            function Bus(properties) {
                this.timeseries = [];
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Bus id.
             * @member {number} id
             * @memberof sd3.Scenario.Bus
             * @instance
             */
            Bus.prototype.id = 0;

            /**
             * Bus timeseries.
             * @member {Array.<sd3.Scenario.Bus.ITimePoint>} timeseries
             * @memberof sd3.Scenario.Bus
             * @instance
             */
            Bus.prototype.timeseries = $util.emptyArray;

            /**
             * Decodes a Bus message from the specified reader or buffer.
             * @function decode
             * @memberof sd3.Scenario.Bus
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {sd3.Scenario.Bus} Bus
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Bus.decode = function decode(reader, length, error, long) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (long === undefined)
                    long = 0;
                if (long > $Reader.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.sd3.Scenario.Bus();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.id = reader.uint32();
                            break;
                        }
                    case 2: {
                            if (!(message.timeseries && message.timeseries.length))
                                message.timeseries = [];
                            message.timeseries.push($root.sd3.Scenario.Bus.TimePoint.decode(reader, reader.uint32(), undefined, long + 1));
                            break;
                        }
                    default:
                        reader.skipType(tag & 7, long);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Bus message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof sd3.Scenario.Bus
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {sd3.Scenario.Bus} Bus
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Bus.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Bus message.
             * @function verify
             * @memberof sd3.Scenario.Bus
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Bus.verify = function verify(message, long) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    return "maximum nesting depth exceeded";
                if (message.id != null && message.hasOwnProperty("id"))
                    if (!$util.isInteger(message.id))
                        return "id: integer expected";
                if (message.timeseries != null && message.hasOwnProperty("timeseries")) {
                    if (!Array.isArray(message.timeseries))
                        return "timeseries: array expected";
                    for (let i = 0; i < message.timeseries.length; ++i) {
                        let error = $root.sd3.Scenario.Bus.TimePoint.verify(message.timeseries[i], long + 1);
                        if (error)
                            return "timeseries." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a Bus message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof sd3.Scenario.Bus
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {sd3.Scenario.Bus} Bus
             */
            Bus.fromObject = function fromObject(object, long) {
                if (object instanceof $root.sd3.Scenario.Bus)
                    return object;
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let message = new $root.sd3.Scenario.Bus();
                if (object.id != null)
                    message.id = object.id >>> 0;
                if (object.timeseries) {
                    if (!Array.isArray(object.timeseries))
                        throw TypeError(".sd3.Scenario.Bus.timeseries: array expected");
                    message.timeseries = [];
                    for (let i = 0; i < object.timeseries.length; ++i) {
                        if (typeof object.timeseries[i] !== "object")
                            throw TypeError(".sd3.Scenario.Bus.timeseries: object expected");
                        message.timeseries[i] = $root.sd3.Scenario.Bus.TimePoint.fromObject(object.timeseries[i], long + 1);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from a Bus message. Also converts values to other types if specified.
             * @function toObject
             * @memberof sd3.Scenario.Bus
             * @static
             * @param {sd3.Scenario.Bus} message Bus
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Bus.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.arrays || options.defaults)
                    object.timeseries = [];
                if (options.defaults)
                    object.id = 0;
                if (message.id != null && message.hasOwnProperty("id"))
                    object.id = message.id;
                if (message.timeseries && message.timeseries.length) {
                    object.timeseries = [];
                    for (let j = 0; j < message.timeseries.length; ++j)
                        object.timeseries[j] = $root.sd3.Scenario.Bus.TimePoint.toObject(message.timeseries[j], options);
                }
                return object;
            };

            /**
             * Converts this Bus to JSON.
             * @function toJSON
             * @memberof sd3.Scenario.Bus
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Bus.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for Bus
             * @function getTypeUrl
             * @memberof sd3.Scenario.Bus
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            Bus.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/sd3.Scenario.Bus";
            };

            Bus.TimePoint = (function() {

                /**
                 * Properties of a TimePoint.
                 * @memberof sd3.Scenario.Bus
                 * @interface ITimePoint
                 * @property {number|null} [seconds] TimePoint seconds
                 * @property {number|null} [voltage] TimePoint voltage
                 */

                /**
                 * Constructs a new TimePoint.
                 * @memberof sd3.Scenario.Bus
                 * @classdesc Represents a TimePoint.
                 * @implements ITimePoint
                 * @constructor
                 * @param {sd3.Scenario.Bus.ITimePoint=} [properties] Properties to set
                 */
                function TimePoint(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * TimePoint seconds.
                 * @member {number} seconds
                 * @memberof sd3.Scenario.Bus.TimePoint
                 * @instance
                 */
                TimePoint.prototype.seconds = 0;

                /**
                 * TimePoint voltage.
                 * @member {number} voltage
                 * @memberof sd3.Scenario.Bus.TimePoint
                 * @instance
                 */
                TimePoint.prototype.voltage = 0;

                /**
                 * Decodes a TimePoint message from the specified reader or buffer.
                 * @function decode
                 * @memberof sd3.Scenario.Bus.TimePoint
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {sd3.Scenario.Bus.TimePoint} TimePoint
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                TimePoint.decode = function decode(reader, length, error, long) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (long === undefined)
                        long = 0;
                    if (long > $Reader.recursionLimit)
                        throw Error("maximum nesting depth exceeded");
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.sd3.Scenario.Bus.TimePoint();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.seconds = reader.uint32();
                                break;
                            }
                        case 2: {
                                message.voltage = reader.float();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7, long);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a TimePoint message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof sd3.Scenario.Bus.TimePoint
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {sd3.Scenario.Bus.TimePoint} TimePoint
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                TimePoint.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a TimePoint message.
                 * @function verify
                 * @memberof sd3.Scenario.Bus.TimePoint
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                TimePoint.verify = function verify(message, long) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (long === undefined)
                        long = 0;
                    if (long > $util.recursionLimit)
                        return "maximum nesting depth exceeded";
                    if (message.seconds != null && message.hasOwnProperty("seconds"))
                        if (!$util.isInteger(message.seconds))
                            return "seconds: integer expected";
                    if (message.voltage != null && message.hasOwnProperty("voltage"))
                        if (typeof message.voltage !== "number")
                            return "voltage: number expected";
                    return null;
                };

                /**
                 * Creates a TimePoint message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof sd3.Scenario.Bus.TimePoint
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {sd3.Scenario.Bus.TimePoint} TimePoint
                 */
                TimePoint.fromObject = function fromObject(object, long) {
                    if (object instanceof $root.sd3.Scenario.Bus.TimePoint)
                        return object;
                    if (long === undefined)
                        long = 0;
                    if (long > $util.recursionLimit)
                        throw Error("maximum nesting depth exceeded");
                    let message = new $root.sd3.Scenario.Bus.TimePoint();
                    if (object.seconds != null)
                        message.seconds = object.seconds >>> 0;
                    if (object.voltage != null)
                        message.voltage = Number(object.voltage);
                    return message;
                };

                /**
                 * Creates a plain object from a TimePoint message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof sd3.Scenario.Bus.TimePoint
                 * @static
                 * @param {sd3.Scenario.Bus.TimePoint} message TimePoint
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                TimePoint.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults) {
                        object.seconds = 0;
                        object.voltage = 0;
                    }
                    if (message.seconds != null && message.hasOwnProperty("seconds"))
                        object.seconds = message.seconds;
                    if (message.voltage != null && message.hasOwnProperty("voltage"))
                        object.voltage = options.json && !isFinite(message.voltage) ? String(message.voltage) : message.voltage;
                    return object;
                };

                /**
                 * Converts this TimePoint to JSON.
                 * @function toJSON
                 * @memberof sd3.Scenario.Bus.TimePoint
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                TimePoint.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for TimePoint
                 * @function getTypeUrl
                 * @memberof sd3.Scenario.Bus.TimePoint
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                TimePoint.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/sd3.Scenario.Bus.TimePoint";
                };

                return TimePoint;
            })();

            return Bus;
        })();

        Scenario.Breaker = (function() {

            /**
             * Properties of a Breaker.
             * @memberof sd3.Scenario
             * @interface IBreaker
             * @property {number|null} [id] Breaker id
             * @property {Array.<sd3.Scenario.Breaker.ITimePoint>|null} [timeseries] Breaker timeseries
             */

            /**
             * Constructs a new Breaker.
             * @memberof sd3.Scenario
             * @classdesc Represents a Breaker.
             * @implements IBreaker
             * @constructor
             * @param {sd3.Scenario.IBreaker=} [properties] Properties to set
             */
            function Breaker(properties) {
                this.timeseries = [];
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Breaker id.
             * @member {number} id
             * @memberof sd3.Scenario.Breaker
             * @instance
             */
            Breaker.prototype.id = 0;

            /**
             * Breaker timeseries.
             * @member {Array.<sd3.Scenario.Breaker.ITimePoint>} timeseries
             * @memberof sd3.Scenario.Breaker
             * @instance
             */
            Breaker.prototype.timeseries = $util.emptyArray;

            /**
             * Decodes a Breaker message from the specified reader or buffer.
             * @function decode
             * @memberof sd3.Scenario.Breaker
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {sd3.Scenario.Breaker} Breaker
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Breaker.decode = function decode(reader, length, error, long) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (long === undefined)
                    long = 0;
                if (long > $Reader.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.sd3.Scenario.Breaker();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.id = reader.uint32();
                            break;
                        }
                    case 2: {
                            if (!(message.timeseries && message.timeseries.length))
                                message.timeseries = [];
                            message.timeseries.push($root.sd3.Scenario.Breaker.TimePoint.decode(reader, reader.uint32(), undefined, long + 1));
                            break;
                        }
                    default:
                        reader.skipType(tag & 7, long);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Breaker message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof sd3.Scenario.Breaker
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {sd3.Scenario.Breaker} Breaker
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Breaker.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Breaker message.
             * @function verify
             * @memberof sd3.Scenario.Breaker
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Breaker.verify = function verify(message, long) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    return "maximum nesting depth exceeded";
                if (message.id != null && message.hasOwnProperty("id"))
                    if (!$util.isInteger(message.id))
                        return "id: integer expected";
                if (message.timeseries != null && message.hasOwnProperty("timeseries")) {
                    if (!Array.isArray(message.timeseries))
                        return "timeseries: array expected";
                    for (let i = 0; i < message.timeseries.length; ++i) {
                        let error = $root.sd3.Scenario.Breaker.TimePoint.verify(message.timeseries[i], long + 1);
                        if (error)
                            return "timeseries." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a Breaker message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof sd3.Scenario.Breaker
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {sd3.Scenario.Breaker} Breaker
             */
            Breaker.fromObject = function fromObject(object, long) {
                if (object instanceof $root.sd3.Scenario.Breaker)
                    return object;
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let message = new $root.sd3.Scenario.Breaker();
                if (object.id != null)
                    message.id = object.id >>> 0;
                if (object.timeseries) {
                    if (!Array.isArray(object.timeseries))
                        throw TypeError(".sd3.Scenario.Breaker.timeseries: array expected");
                    message.timeseries = [];
                    for (let i = 0; i < object.timeseries.length; ++i) {
                        if (typeof object.timeseries[i] !== "object")
                            throw TypeError(".sd3.Scenario.Breaker.timeseries: object expected");
                        message.timeseries[i] = $root.sd3.Scenario.Breaker.TimePoint.fromObject(object.timeseries[i], long + 1);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from a Breaker message. Also converts values to other types if specified.
             * @function toObject
             * @memberof sd3.Scenario.Breaker
             * @static
             * @param {sd3.Scenario.Breaker} message Breaker
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Breaker.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.arrays || options.defaults)
                    object.timeseries = [];
                if (options.defaults)
                    object.id = 0;
                if (message.id != null && message.hasOwnProperty("id"))
                    object.id = message.id;
                if (message.timeseries && message.timeseries.length) {
                    object.timeseries = [];
                    for (let j = 0; j < message.timeseries.length; ++j)
                        object.timeseries[j] = $root.sd3.Scenario.Breaker.TimePoint.toObject(message.timeseries[j], options);
                }
                return object;
            };

            /**
             * Converts this Breaker to JSON.
             * @function toJSON
             * @memberof sd3.Scenario.Breaker
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Breaker.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for Breaker
             * @function getTypeUrl
             * @memberof sd3.Scenario.Breaker
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            Breaker.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/sd3.Scenario.Breaker";
            };

            Breaker.TimePoint = (function() {

                /**
                 * Properties of a TimePoint.
                 * @memberof sd3.Scenario.Breaker
                 * @interface ITimePoint
                 * @property {number|null} [seconds] TimePoint seconds
                 * @property {number|null} [voltage] TimePoint voltage
                 * @property {number|null} [current] TimePoint current
                 * @property {number|null} [power] TimePoint power
                 * @property {boolean|null} [status] TimePoint status
                 */

                /**
                 * Constructs a new TimePoint.
                 * @memberof sd3.Scenario.Breaker
                 * @classdesc Represents a TimePoint.
                 * @implements ITimePoint
                 * @constructor
                 * @param {sd3.Scenario.Breaker.ITimePoint=} [properties] Properties to set
                 */
                function TimePoint(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * TimePoint seconds.
                 * @member {number} seconds
                 * @memberof sd3.Scenario.Breaker.TimePoint
                 * @instance
                 */
                TimePoint.prototype.seconds = 0;

                /**
                 * TimePoint voltage.
                 * @member {number} voltage
                 * @memberof sd3.Scenario.Breaker.TimePoint
                 * @instance
                 */
                TimePoint.prototype.voltage = 0;

                /**
                 * TimePoint current.
                 * @member {number} current
                 * @memberof sd3.Scenario.Breaker.TimePoint
                 * @instance
                 */
                TimePoint.prototype.current = 0;

                /**
                 * TimePoint power.
                 * @member {number} power
                 * @memberof sd3.Scenario.Breaker.TimePoint
                 * @instance
                 */
                TimePoint.prototype.power = 0;

                /**
                 * TimePoint status.
                 * @member {boolean} status
                 * @memberof sd3.Scenario.Breaker.TimePoint
                 * @instance
                 */
                TimePoint.prototype.status = false;

                /**
                 * Decodes a TimePoint message from the specified reader or buffer.
                 * @function decode
                 * @memberof sd3.Scenario.Breaker.TimePoint
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {sd3.Scenario.Breaker.TimePoint} TimePoint
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                TimePoint.decode = function decode(reader, length, error, long) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (long === undefined)
                        long = 0;
                    if (long > $Reader.recursionLimit)
                        throw Error("maximum nesting depth exceeded");
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.sd3.Scenario.Breaker.TimePoint();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.seconds = reader.uint32();
                                break;
                            }
                        case 3: {
                                message.voltage = reader.float();
                                break;
                            }
                        case 4: {
                                message.current = reader.float();
                                break;
                            }
                        case 5: {
                                message.power = reader.float();
                                break;
                            }
                        case 6: {
                                message.status = reader.bool();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7, long);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a TimePoint message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof sd3.Scenario.Breaker.TimePoint
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {sd3.Scenario.Breaker.TimePoint} TimePoint
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                TimePoint.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a TimePoint message.
                 * @function verify
                 * @memberof sd3.Scenario.Breaker.TimePoint
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                TimePoint.verify = function verify(message, long) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (long === undefined)
                        long = 0;
                    if (long > $util.recursionLimit)
                        return "maximum nesting depth exceeded";
                    if (message.seconds != null && message.hasOwnProperty("seconds"))
                        if (!$util.isInteger(message.seconds))
                            return "seconds: integer expected";
                    if (message.voltage != null && message.hasOwnProperty("voltage"))
                        if (typeof message.voltage !== "number")
                            return "voltage: number expected";
                    if (message.current != null && message.hasOwnProperty("current"))
                        if (typeof message.current !== "number")
                            return "current: number expected";
                    if (message.power != null && message.hasOwnProperty("power"))
                        if (typeof message.power !== "number")
                            return "power: number expected";
                    if (message.status != null && message.hasOwnProperty("status"))
                        if (typeof message.status !== "boolean")
                            return "status: boolean expected";
                    return null;
                };

                /**
                 * Creates a TimePoint message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof sd3.Scenario.Breaker.TimePoint
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {sd3.Scenario.Breaker.TimePoint} TimePoint
                 */
                TimePoint.fromObject = function fromObject(object, long) {
                    if (object instanceof $root.sd3.Scenario.Breaker.TimePoint)
                        return object;
                    if (long === undefined)
                        long = 0;
                    if (long > $util.recursionLimit)
                        throw Error("maximum nesting depth exceeded");
                    let message = new $root.sd3.Scenario.Breaker.TimePoint();
                    if (object.seconds != null)
                        message.seconds = object.seconds >>> 0;
                    if (object.voltage != null)
                        message.voltage = Number(object.voltage);
                    if (object.current != null)
                        message.current = Number(object.current);
                    if (object.power != null)
                        message.power = Number(object.power);
                    if (object.status != null)
                        message.status = Boolean(object.status);
                    return message;
                };

                /**
                 * Creates a plain object from a TimePoint message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof sd3.Scenario.Breaker.TimePoint
                 * @static
                 * @param {sd3.Scenario.Breaker.TimePoint} message TimePoint
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                TimePoint.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults) {
                        object.seconds = 0;
                        object.voltage = 0;
                        object.current = 0;
                        object.power = 0;
                        object.status = false;
                    }
                    if (message.seconds != null && message.hasOwnProperty("seconds"))
                        object.seconds = message.seconds;
                    if (message.voltage != null && message.hasOwnProperty("voltage"))
                        object.voltage = options.json && !isFinite(message.voltage) ? String(message.voltage) : message.voltage;
                    if (message.current != null && message.hasOwnProperty("current"))
                        object.current = options.json && !isFinite(message.current) ? String(message.current) : message.current;
                    if (message.power != null && message.hasOwnProperty("power"))
                        object.power = options.json && !isFinite(message.power) ? String(message.power) : message.power;
                    if (message.status != null && message.hasOwnProperty("status"))
                        object.status = message.status;
                    return object;
                };

                /**
                 * Converts this TimePoint to JSON.
                 * @function toJSON
                 * @memberof sd3.Scenario.Breaker.TimePoint
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                TimePoint.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for TimePoint
                 * @function getTypeUrl
                 * @memberof sd3.Scenario.Breaker.TimePoint
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                TimePoint.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/sd3.Scenario.Breaker.TimePoint";
                };

                return TimePoint;
            })();

            return Breaker;
        })();

        Scenario.Regulator = (function() {

            /**
             * Properties of a Regulator.
             * @memberof sd3.Scenario
             * @interface IRegulator
             * @property {number|null} [id] Regulator id
             * @property {Array.<sd3.Scenario.Regulator.ITimePoint>|null} [timeseries] Regulator timeseries
             */

            /**
             * Constructs a new Regulator.
             * @memberof sd3.Scenario
             * @classdesc Represents a Regulator.
             * @implements IRegulator
             * @constructor
             * @param {sd3.Scenario.IRegulator=} [properties] Properties to set
             */
            function Regulator(properties) {
                this.timeseries = [];
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Regulator id.
             * @member {number} id
             * @memberof sd3.Scenario.Regulator
             * @instance
             */
            Regulator.prototype.id = 0;

            /**
             * Regulator timeseries.
             * @member {Array.<sd3.Scenario.Regulator.ITimePoint>} timeseries
             * @memberof sd3.Scenario.Regulator
             * @instance
             */
            Regulator.prototype.timeseries = $util.emptyArray;

            /**
             * Decodes a Regulator message from the specified reader or buffer.
             * @function decode
             * @memberof sd3.Scenario.Regulator
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {sd3.Scenario.Regulator} Regulator
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Regulator.decode = function decode(reader, length, error, long) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (long === undefined)
                    long = 0;
                if (long > $Reader.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.sd3.Scenario.Regulator();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.id = reader.uint32();
                            break;
                        }
                    case 2: {
                            if (!(message.timeseries && message.timeseries.length))
                                message.timeseries = [];
                            message.timeseries.push($root.sd3.Scenario.Regulator.TimePoint.decode(reader, reader.uint32(), undefined, long + 1));
                            break;
                        }
                    default:
                        reader.skipType(tag & 7, long);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Regulator message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof sd3.Scenario.Regulator
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {sd3.Scenario.Regulator} Regulator
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Regulator.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Regulator message.
             * @function verify
             * @memberof sd3.Scenario.Regulator
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Regulator.verify = function verify(message, long) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    return "maximum nesting depth exceeded";
                if (message.id != null && message.hasOwnProperty("id"))
                    if (!$util.isInteger(message.id))
                        return "id: integer expected";
                if (message.timeseries != null && message.hasOwnProperty("timeseries")) {
                    if (!Array.isArray(message.timeseries))
                        return "timeseries: array expected";
                    for (let i = 0; i < message.timeseries.length; ++i) {
                        let error = $root.sd3.Scenario.Regulator.TimePoint.verify(message.timeseries[i], long + 1);
                        if (error)
                            return "timeseries." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a Regulator message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof sd3.Scenario.Regulator
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {sd3.Scenario.Regulator} Regulator
             */
            Regulator.fromObject = function fromObject(object, long) {
                if (object instanceof $root.sd3.Scenario.Regulator)
                    return object;
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let message = new $root.sd3.Scenario.Regulator();
                if (object.id != null)
                    message.id = object.id >>> 0;
                if (object.timeseries) {
                    if (!Array.isArray(object.timeseries))
                        throw TypeError(".sd3.Scenario.Regulator.timeseries: array expected");
                    message.timeseries = [];
                    for (let i = 0; i < object.timeseries.length; ++i) {
                        if (typeof object.timeseries[i] !== "object")
                            throw TypeError(".sd3.Scenario.Regulator.timeseries: object expected");
                        message.timeseries[i] = $root.sd3.Scenario.Regulator.TimePoint.fromObject(object.timeseries[i], long + 1);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from a Regulator message. Also converts values to other types if specified.
             * @function toObject
             * @memberof sd3.Scenario.Regulator
             * @static
             * @param {sd3.Scenario.Regulator} message Regulator
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Regulator.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.arrays || options.defaults)
                    object.timeseries = [];
                if (options.defaults)
                    object.id = 0;
                if (message.id != null && message.hasOwnProperty("id"))
                    object.id = message.id;
                if (message.timeseries && message.timeseries.length) {
                    object.timeseries = [];
                    for (let j = 0; j < message.timeseries.length; ++j)
                        object.timeseries[j] = $root.sd3.Scenario.Regulator.TimePoint.toObject(message.timeseries[j], options);
                }
                return object;
            };

            /**
             * Converts this Regulator to JSON.
             * @function toJSON
             * @memberof sd3.Scenario.Regulator
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Regulator.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for Regulator
             * @function getTypeUrl
             * @memberof sd3.Scenario.Regulator
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            Regulator.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/sd3.Scenario.Regulator";
            };

            Regulator.TimePoint = (function() {

                /**
                 * Properties of a TimePoint.
                 * @memberof sd3.Scenario.Regulator
                 * @interface ITimePoint
                 * @property {number|null} [seconds] TimePoint seconds
                 * @property {number|null} [voltage] TimePoint voltage
                 * @property {number|null} [current] TimePoint current
                 * @property {number|null} [power] TimePoint power
                 * @property {number|null} [status] TimePoint status
                 */

                /**
                 * Constructs a new TimePoint.
                 * @memberof sd3.Scenario.Regulator
                 * @classdesc Represents a TimePoint.
                 * @implements ITimePoint
                 * @constructor
                 * @param {sd3.Scenario.Regulator.ITimePoint=} [properties] Properties to set
                 */
                function TimePoint(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * TimePoint seconds.
                 * @member {number} seconds
                 * @memberof sd3.Scenario.Regulator.TimePoint
                 * @instance
                 */
                TimePoint.prototype.seconds = 0;

                /**
                 * TimePoint voltage.
                 * @member {number} voltage
                 * @memberof sd3.Scenario.Regulator.TimePoint
                 * @instance
                 */
                TimePoint.prototype.voltage = 0;

                /**
                 * TimePoint current.
                 * @member {number} current
                 * @memberof sd3.Scenario.Regulator.TimePoint
                 * @instance
                 */
                TimePoint.prototype.current = 0;

                /**
                 * TimePoint power.
                 * @member {number} power
                 * @memberof sd3.Scenario.Regulator.TimePoint
                 * @instance
                 */
                TimePoint.prototype.power = 0;

                /**
                 * TimePoint status.
                 * @member {number} status
                 * @memberof sd3.Scenario.Regulator.TimePoint
                 * @instance
                 */
                TimePoint.prototype.status = 0;

                /**
                 * Decodes a TimePoint message from the specified reader or buffer.
                 * @function decode
                 * @memberof sd3.Scenario.Regulator.TimePoint
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {sd3.Scenario.Regulator.TimePoint} TimePoint
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                TimePoint.decode = function decode(reader, length, error, long) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (long === undefined)
                        long = 0;
                    if (long > $Reader.recursionLimit)
                        throw Error("maximum nesting depth exceeded");
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.sd3.Scenario.Regulator.TimePoint();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.seconds = reader.uint32();
                                break;
                            }
                        case 3: {
                                message.voltage = reader.float();
                                break;
                            }
                        case 4: {
                                message.current = reader.float();
                                break;
                            }
                        case 5: {
                                message.power = reader.float();
                                break;
                            }
                        case 6: {
                                message.status = reader.float();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7, long);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a TimePoint message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof sd3.Scenario.Regulator.TimePoint
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {sd3.Scenario.Regulator.TimePoint} TimePoint
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                TimePoint.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a TimePoint message.
                 * @function verify
                 * @memberof sd3.Scenario.Regulator.TimePoint
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                TimePoint.verify = function verify(message, long) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (long === undefined)
                        long = 0;
                    if (long > $util.recursionLimit)
                        return "maximum nesting depth exceeded";
                    if (message.seconds != null && message.hasOwnProperty("seconds"))
                        if (!$util.isInteger(message.seconds))
                            return "seconds: integer expected";
                    if (message.voltage != null && message.hasOwnProperty("voltage"))
                        if (typeof message.voltage !== "number")
                            return "voltage: number expected";
                    if (message.current != null && message.hasOwnProperty("current"))
                        if (typeof message.current !== "number")
                            return "current: number expected";
                    if (message.power != null && message.hasOwnProperty("power"))
                        if (typeof message.power !== "number")
                            return "power: number expected";
                    if (message.status != null && message.hasOwnProperty("status"))
                        if (typeof message.status !== "number")
                            return "status: number expected";
                    return null;
                };

                /**
                 * Creates a TimePoint message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof sd3.Scenario.Regulator.TimePoint
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {sd3.Scenario.Regulator.TimePoint} TimePoint
                 */
                TimePoint.fromObject = function fromObject(object, long) {
                    if (object instanceof $root.sd3.Scenario.Regulator.TimePoint)
                        return object;
                    if (long === undefined)
                        long = 0;
                    if (long > $util.recursionLimit)
                        throw Error("maximum nesting depth exceeded");
                    let message = new $root.sd3.Scenario.Regulator.TimePoint();
                    if (object.seconds != null)
                        message.seconds = object.seconds >>> 0;
                    if (object.voltage != null)
                        message.voltage = Number(object.voltage);
                    if (object.current != null)
                        message.current = Number(object.current);
                    if (object.power != null)
                        message.power = Number(object.power);
                    if (object.status != null)
                        message.status = Number(object.status);
                    return message;
                };

                /**
                 * Creates a plain object from a TimePoint message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof sd3.Scenario.Regulator.TimePoint
                 * @static
                 * @param {sd3.Scenario.Regulator.TimePoint} message TimePoint
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                TimePoint.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults) {
                        object.seconds = 0;
                        object.voltage = 0;
                        object.current = 0;
                        object.power = 0;
                        object.status = 0;
                    }
                    if (message.seconds != null && message.hasOwnProperty("seconds"))
                        object.seconds = message.seconds;
                    if (message.voltage != null && message.hasOwnProperty("voltage"))
                        object.voltage = options.json && !isFinite(message.voltage) ? String(message.voltage) : message.voltage;
                    if (message.current != null && message.hasOwnProperty("current"))
                        object.current = options.json && !isFinite(message.current) ? String(message.current) : message.current;
                    if (message.power != null && message.hasOwnProperty("power"))
                        object.power = options.json && !isFinite(message.power) ? String(message.power) : message.power;
                    if (message.status != null && message.hasOwnProperty("status"))
                        object.status = options.json && !isFinite(message.status) ? String(message.status) : message.status;
                    return object;
                };

                /**
                 * Converts this TimePoint to JSON.
                 * @function toJSON
                 * @memberof sd3.Scenario.Regulator.TimePoint
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                TimePoint.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for TimePoint
                 * @function getTypeUrl
                 * @memberof sd3.Scenario.Regulator.TimePoint
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                TimePoint.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/sd3.Scenario.Regulator.TimePoint";
                };

                return TimePoint;
            })();

            return Regulator;
        })();

        Scenario.Capacitor = (function() {

            /**
             * Properties of a Capacitor.
             * @memberof sd3.Scenario
             * @interface ICapacitor
             * @property {number|null} [id] Capacitor id
             * @property {Array.<sd3.Scenario.Capacitor.ITimePoint>|null} [timeseries] Capacitor timeseries
             */

            /**
             * Constructs a new Capacitor.
             * @memberof sd3.Scenario
             * @classdesc Represents a Capacitor.
             * @implements ICapacitor
             * @constructor
             * @param {sd3.Scenario.ICapacitor=} [properties] Properties to set
             */
            function Capacitor(properties) {
                this.timeseries = [];
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Capacitor id.
             * @member {number} id
             * @memberof sd3.Scenario.Capacitor
             * @instance
             */
            Capacitor.prototype.id = 0;

            /**
             * Capacitor timeseries.
             * @member {Array.<sd3.Scenario.Capacitor.ITimePoint>} timeseries
             * @memberof sd3.Scenario.Capacitor
             * @instance
             */
            Capacitor.prototype.timeseries = $util.emptyArray;

            /**
             * Decodes a Capacitor message from the specified reader or buffer.
             * @function decode
             * @memberof sd3.Scenario.Capacitor
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {sd3.Scenario.Capacitor} Capacitor
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Capacitor.decode = function decode(reader, length, error, long) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (long === undefined)
                    long = 0;
                if (long > $Reader.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.sd3.Scenario.Capacitor();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.id = reader.uint32();
                            break;
                        }
                    case 2: {
                            if (!(message.timeseries && message.timeseries.length))
                                message.timeseries = [];
                            message.timeseries.push($root.sd3.Scenario.Capacitor.TimePoint.decode(reader, reader.uint32(), undefined, long + 1));
                            break;
                        }
                    default:
                        reader.skipType(tag & 7, long);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Capacitor message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof sd3.Scenario.Capacitor
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {sd3.Scenario.Capacitor} Capacitor
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Capacitor.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Capacitor message.
             * @function verify
             * @memberof sd3.Scenario.Capacitor
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Capacitor.verify = function verify(message, long) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    return "maximum nesting depth exceeded";
                if (message.id != null && message.hasOwnProperty("id"))
                    if (!$util.isInteger(message.id))
                        return "id: integer expected";
                if (message.timeseries != null && message.hasOwnProperty("timeseries")) {
                    if (!Array.isArray(message.timeseries))
                        return "timeseries: array expected";
                    for (let i = 0; i < message.timeseries.length; ++i) {
                        let error = $root.sd3.Scenario.Capacitor.TimePoint.verify(message.timeseries[i], long + 1);
                        if (error)
                            return "timeseries." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a Capacitor message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof sd3.Scenario.Capacitor
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {sd3.Scenario.Capacitor} Capacitor
             */
            Capacitor.fromObject = function fromObject(object, long) {
                if (object instanceof $root.sd3.Scenario.Capacitor)
                    return object;
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let message = new $root.sd3.Scenario.Capacitor();
                if (object.id != null)
                    message.id = object.id >>> 0;
                if (object.timeseries) {
                    if (!Array.isArray(object.timeseries))
                        throw TypeError(".sd3.Scenario.Capacitor.timeseries: array expected");
                    message.timeseries = [];
                    for (let i = 0; i < object.timeseries.length; ++i) {
                        if (typeof object.timeseries[i] !== "object")
                            throw TypeError(".sd3.Scenario.Capacitor.timeseries: object expected");
                        message.timeseries[i] = $root.sd3.Scenario.Capacitor.TimePoint.fromObject(object.timeseries[i], long + 1);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from a Capacitor message. Also converts values to other types if specified.
             * @function toObject
             * @memberof sd3.Scenario.Capacitor
             * @static
             * @param {sd3.Scenario.Capacitor} message Capacitor
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Capacitor.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.arrays || options.defaults)
                    object.timeseries = [];
                if (options.defaults)
                    object.id = 0;
                if (message.id != null && message.hasOwnProperty("id"))
                    object.id = message.id;
                if (message.timeseries && message.timeseries.length) {
                    object.timeseries = [];
                    for (let j = 0; j < message.timeseries.length; ++j)
                        object.timeseries[j] = $root.sd3.Scenario.Capacitor.TimePoint.toObject(message.timeseries[j], options);
                }
                return object;
            };

            /**
             * Converts this Capacitor to JSON.
             * @function toJSON
             * @memberof sd3.Scenario.Capacitor
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Capacitor.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for Capacitor
             * @function getTypeUrl
             * @memberof sd3.Scenario.Capacitor
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            Capacitor.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/sd3.Scenario.Capacitor";
            };

            Capacitor.TimePoint = (function() {

                /**
                 * Properties of a TimePoint.
                 * @memberof sd3.Scenario.Capacitor
                 * @interface ITimePoint
                 * @property {number|null} [seconds] TimePoint seconds
                 * @property {number|null} [voltage] TimePoint voltage
                 * @property {number|null} [current] TimePoint current
                 * @property {number|null} [power] TimePoint power
                 */

                /**
                 * Constructs a new TimePoint.
                 * @memberof sd3.Scenario.Capacitor
                 * @classdesc Represents a TimePoint.
                 * @implements ITimePoint
                 * @constructor
                 * @param {sd3.Scenario.Capacitor.ITimePoint=} [properties] Properties to set
                 */
                function TimePoint(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * TimePoint seconds.
                 * @member {number} seconds
                 * @memberof sd3.Scenario.Capacitor.TimePoint
                 * @instance
                 */
                TimePoint.prototype.seconds = 0;

                /**
                 * TimePoint voltage.
                 * @member {number} voltage
                 * @memberof sd3.Scenario.Capacitor.TimePoint
                 * @instance
                 */
                TimePoint.prototype.voltage = 0;

                /**
                 * TimePoint current.
                 * @member {number} current
                 * @memberof sd3.Scenario.Capacitor.TimePoint
                 * @instance
                 */
                TimePoint.prototype.current = 0;

                /**
                 * TimePoint power.
                 * @member {number} power
                 * @memberof sd3.Scenario.Capacitor.TimePoint
                 * @instance
                 */
                TimePoint.prototype.power = 0;

                /**
                 * Decodes a TimePoint message from the specified reader or buffer.
                 * @function decode
                 * @memberof sd3.Scenario.Capacitor.TimePoint
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {sd3.Scenario.Capacitor.TimePoint} TimePoint
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                TimePoint.decode = function decode(reader, length, error, long) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (long === undefined)
                        long = 0;
                    if (long > $Reader.recursionLimit)
                        throw Error("maximum nesting depth exceeded");
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.sd3.Scenario.Capacitor.TimePoint();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.seconds = reader.uint32();
                                break;
                            }
                        case 3: {
                                message.voltage = reader.float();
                                break;
                            }
                        case 4: {
                                message.current = reader.float();
                                break;
                            }
                        case 5: {
                                message.power = reader.float();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7, long);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a TimePoint message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof sd3.Scenario.Capacitor.TimePoint
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {sd3.Scenario.Capacitor.TimePoint} TimePoint
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                TimePoint.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a TimePoint message.
                 * @function verify
                 * @memberof sd3.Scenario.Capacitor.TimePoint
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                TimePoint.verify = function verify(message, long) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (long === undefined)
                        long = 0;
                    if (long > $util.recursionLimit)
                        return "maximum nesting depth exceeded";
                    if (message.seconds != null && message.hasOwnProperty("seconds"))
                        if (!$util.isInteger(message.seconds))
                            return "seconds: integer expected";
                    if (message.voltage != null && message.hasOwnProperty("voltage"))
                        if (typeof message.voltage !== "number")
                            return "voltage: number expected";
                    if (message.current != null && message.hasOwnProperty("current"))
                        if (typeof message.current !== "number")
                            return "current: number expected";
                    if (message.power != null && message.hasOwnProperty("power"))
                        if (typeof message.power !== "number")
                            return "power: number expected";
                    return null;
                };

                /**
                 * Creates a TimePoint message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof sd3.Scenario.Capacitor.TimePoint
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {sd3.Scenario.Capacitor.TimePoint} TimePoint
                 */
                TimePoint.fromObject = function fromObject(object, long) {
                    if (object instanceof $root.sd3.Scenario.Capacitor.TimePoint)
                        return object;
                    if (long === undefined)
                        long = 0;
                    if (long > $util.recursionLimit)
                        throw Error("maximum nesting depth exceeded");
                    let message = new $root.sd3.Scenario.Capacitor.TimePoint();
                    if (object.seconds != null)
                        message.seconds = object.seconds >>> 0;
                    if (object.voltage != null)
                        message.voltage = Number(object.voltage);
                    if (object.current != null)
                        message.current = Number(object.current);
                    if (object.power != null)
                        message.power = Number(object.power);
                    return message;
                };

                /**
                 * Creates a plain object from a TimePoint message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof sd3.Scenario.Capacitor.TimePoint
                 * @static
                 * @param {sd3.Scenario.Capacitor.TimePoint} message TimePoint
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                TimePoint.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults) {
                        object.seconds = 0;
                        object.voltage = 0;
                        object.current = 0;
                        object.power = 0;
                    }
                    if (message.seconds != null && message.hasOwnProperty("seconds"))
                        object.seconds = message.seconds;
                    if (message.voltage != null && message.hasOwnProperty("voltage"))
                        object.voltage = options.json && !isFinite(message.voltage) ? String(message.voltage) : message.voltage;
                    if (message.current != null && message.hasOwnProperty("current"))
                        object.current = options.json && !isFinite(message.current) ? String(message.current) : message.current;
                    if (message.power != null && message.hasOwnProperty("power"))
                        object.power = options.json && !isFinite(message.power) ? String(message.power) : message.power;
                    return object;
                };

                /**
                 * Converts this TimePoint to JSON.
                 * @function toJSON
                 * @memberof sd3.Scenario.Capacitor.TimePoint
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                TimePoint.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for TimePoint
                 * @function getTypeUrl
                 * @memberof sd3.Scenario.Capacitor.TimePoint
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                TimePoint.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/sd3.Scenario.Capacitor.TimePoint";
                };

                return TimePoint;
            })();

            return Capacitor;
        })();

        Scenario.Circuit = (function() {

            /**
             * Properties of a Circuit.
             * @memberof sd3.Scenario
             * @interface ICircuit
             * @property {number|null} [id] Circuit id
             * @property {Array.<sd3.Scenario.Circuit.ITimePoint>|null} [timeseries] Circuit timeseries
             */

            /**
             * Constructs a new Circuit.
             * @memberof sd3.Scenario
             * @classdesc Represents a Circuit.
             * @implements ICircuit
             * @constructor
             * @param {sd3.Scenario.ICircuit=} [properties] Properties to set
             */
            function Circuit(properties) {
                this.timeseries = [];
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Circuit id.
             * @member {number} id
             * @memberof sd3.Scenario.Circuit
             * @instance
             */
            Circuit.prototype.id = 0;

            /**
             * Circuit timeseries.
             * @member {Array.<sd3.Scenario.Circuit.ITimePoint>} timeseries
             * @memberof sd3.Scenario.Circuit
             * @instance
             */
            Circuit.prototype.timeseries = $util.emptyArray;

            /**
             * Decodes a Circuit message from the specified reader or buffer.
             * @function decode
             * @memberof sd3.Scenario.Circuit
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {sd3.Scenario.Circuit} Circuit
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Circuit.decode = function decode(reader, length, error, long) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (long === undefined)
                    long = 0;
                if (long > $Reader.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.sd3.Scenario.Circuit();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.id = reader.uint32();
                            break;
                        }
                    case 2: {
                            if (!(message.timeseries && message.timeseries.length))
                                message.timeseries = [];
                            message.timeseries.push($root.sd3.Scenario.Circuit.TimePoint.decode(reader, reader.uint32(), undefined, long + 1));
                            break;
                        }
                    default:
                        reader.skipType(tag & 7, long);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Circuit message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof sd3.Scenario.Circuit
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {sd3.Scenario.Circuit} Circuit
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Circuit.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Circuit message.
             * @function verify
             * @memberof sd3.Scenario.Circuit
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Circuit.verify = function verify(message, long) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    return "maximum nesting depth exceeded";
                if (message.id != null && message.hasOwnProperty("id"))
                    if (!$util.isInteger(message.id))
                        return "id: integer expected";
                if (message.timeseries != null && message.hasOwnProperty("timeseries")) {
                    if (!Array.isArray(message.timeseries))
                        return "timeseries: array expected";
                    for (let i = 0; i < message.timeseries.length; ++i) {
                        let error = $root.sd3.Scenario.Circuit.TimePoint.verify(message.timeseries[i], long + 1);
                        if (error)
                            return "timeseries." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a Circuit message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof sd3.Scenario.Circuit
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {sd3.Scenario.Circuit} Circuit
             */
            Circuit.fromObject = function fromObject(object, long) {
                if (object instanceof $root.sd3.Scenario.Circuit)
                    return object;
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let message = new $root.sd3.Scenario.Circuit();
                if (object.id != null)
                    message.id = object.id >>> 0;
                if (object.timeseries) {
                    if (!Array.isArray(object.timeseries))
                        throw TypeError(".sd3.Scenario.Circuit.timeseries: array expected");
                    message.timeseries = [];
                    for (let i = 0; i < object.timeseries.length; ++i) {
                        if (typeof object.timeseries[i] !== "object")
                            throw TypeError(".sd3.Scenario.Circuit.timeseries: object expected");
                        message.timeseries[i] = $root.sd3.Scenario.Circuit.TimePoint.fromObject(object.timeseries[i], long + 1);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from a Circuit message. Also converts values to other types if specified.
             * @function toObject
             * @memberof sd3.Scenario.Circuit
             * @static
             * @param {sd3.Scenario.Circuit} message Circuit
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Circuit.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.arrays || options.defaults)
                    object.timeseries = [];
                if (options.defaults)
                    object.id = 0;
                if (message.id != null && message.hasOwnProperty("id"))
                    object.id = message.id;
                if (message.timeseries && message.timeseries.length) {
                    object.timeseries = [];
                    for (let j = 0; j < message.timeseries.length; ++j)
                        object.timeseries[j] = $root.sd3.Scenario.Circuit.TimePoint.toObject(message.timeseries[j], options);
                }
                return object;
            };

            /**
             * Converts this Circuit to JSON.
             * @function toJSON
             * @memberof sd3.Scenario.Circuit
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Circuit.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for Circuit
             * @function getTypeUrl
             * @memberof sd3.Scenario.Circuit
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            Circuit.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/sd3.Scenario.Circuit";
            };

            Circuit.TimePoint = (function() {

                /**
                 * Properties of a TimePoint.
                 * @memberof sd3.Scenario.Circuit
                 * @interface ITimePoint
                 * @property {number|null} [seconds] TimePoint seconds
                 * @property {number|null} [netLoad] TimePoint netLoad
                 * @property {number|null} [netReactiveLoad] TimePoint netReactiveLoad
                 */

                /**
                 * Constructs a new TimePoint.
                 * @memberof sd3.Scenario.Circuit
                 * @classdesc Represents a TimePoint.
                 * @implements ITimePoint
                 * @constructor
                 * @param {sd3.Scenario.Circuit.ITimePoint=} [properties] Properties to set
                 */
                function TimePoint(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * TimePoint seconds.
                 * @member {number} seconds
                 * @memberof sd3.Scenario.Circuit.TimePoint
                 * @instance
                 */
                TimePoint.prototype.seconds = 0;

                /**
                 * TimePoint netLoad.
                 * @member {number} netLoad
                 * @memberof sd3.Scenario.Circuit.TimePoint
                 * @instance
                 */
                TimePoint.prototype.netLoad = 0;

                /**
                 * TimePoint netReactiveLoad.
                 * @member {number} netReactiveLoad
                 * @memberof sd3.Scenario.Circuit.TimePoint
                 * @instance
                 */
                TimePoint.prototype.netReactiveLoad = 0;

                /**
                 * Decodes a TimePoint message from the specified reader or buffer.
                 * @function decode
                 * @memberof sd3.Scenario.Circuit.TimePoint
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {sd3.Scenario.Circuit.TimePoint} TimePoint
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                TimePoint.decode = function decode(reader, length, error, long) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (long === undefined)
                        long = 0;
                    if (long > $Reader.recursionLimit)
                        throw Error("maximum nesting depth exceeded");
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.sd3.Scenario.Circuit.TimePoint();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.seconds = reader.uint32();
                                break;
                            }
                        case 2: {
                                message.netLoad = reader.float();
                                break;
                            }
                        case 3: {
                                message.netReactiveLoad = reader.float();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7, long);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a TimePoint message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof sd3.Scenario.Circuit.TimePoint
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {sd3.Scenario.Circuit.TimePoint} TimePoint
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                TimePoint.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a TimePoint message.
                 * @function verify
                 * @memberof sd3.Scenario.Circuit.TimePoint
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                TimePoint.verify = function verify(message, long) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (long === undefined)
                        long = 0;
                    if (long > $util.recursionLimit)
                        return "maximum nesting depth exceeded";
                    if (message.seconds != null && message.hasOwnProperty("seconds"))
                        if (!$util.isInteger(message.seconds))
                            return "seconds: integer expected";
                    if (message.netLoad != null && message.hasOwnProperty("netLoad"))
                        if (typeof message.netLoad !== "number")
                            return "netLoad: number expected";
                    if (message.netReactiveLoad != null && message.hasOwnProperty("netReactiveLoad"))
                        if (typeof message.netReactiveLoad !== "number")
                            return "netReactiveLoad: number expected";
                    return null;
                };

                /**
                 * Creates a TimePoint message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof sd3.Scenario.Circuit.TimePoint
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {sd3.Scenario.Circuit.TimePoint} TimePoint
                 */
                TimePoint.fromObject = function fromObject(object, long) {
                    if (object instanceof $root.sd3.Scenario.Circuit.TimePoint)
                        return object;
                    if (long === undefined)
                        long = 0;
                    if (long > $util.recursionLimit)
                        throw Error("maximum nesting depth exceeded");
                    let message = new $root.sd3.Scenario.Circuit.TimePoint();
                    if (object.seconds != null)
                        message.seconds = object.seconds >>> 0;
                    if (object.netLoad != null)
                        message.netLoad = Number(object.netLoad);
                    if (object.netReactiveLoad != null)
                        message.netReactiveLoad = Number(object.netReactiveLoad);
                    return message;
                };

                /**
                 * Creates a plain object from a TimePoint message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof sd3.Scenario.Circuit.TimePoint
                 * @static
                 * @param {sd3.Scenario.Circuit.TimePoint} message TimePoint
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                TimePoint.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults) {
                        object.seconds = 0;
                        object.netLoad = 0;
                        object.netReactiveLoad = 0;
                    }
                    if (message.seconds != null && message.hasOwnProperty("seconds"))
                        object.seconds = message.seconds;
                    if (message.netLoad != null && message.hasOwnProperty("netLoad"))
                        object.netLoad = options.json && !isFinite(message.netLoad) ? String(message.netLoad) : message.netLoad;
                    if (message.netReactiveLoad != null && message.hasOwnProperty("netReactiveLoad"))
                        object.netReactiveLoad = options.json && !isFinite(message.netReactiveLoad) ? String(message.netReactiveLoad) : message.netReactiveLoad;
                    return object;
                };

                /**
                 * Converts this TimePoint to JSON.
                 * @function toJSON
                 * @memberof sd3.Scenario.Circuit.TimePoint
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                TimePoint.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for TimePoint
                 * @function getTypeUrl
                 * @memberof sd3.Scenario.Circuit.TimePoint
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                TimePoint.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/sd3.Scenario.Circuit.TimePoint";
                };

                return TimePoint;
            })();

            return Circuit;
        })();

        Scenario.Battery = (function() {

            /**
             * Properties of a Battery.
             * @memberof sd3.Scenario
             * @interface IBattery
             * @property {number|null} [id] Battery id
             * @property {Array.<sd3.Scenario.Battery.ITimePoint>|null} [timeseries] Battery timeseries
             */

            /**
             * Constructs a new Battery.
             * @memberof sd3.Scenario
             * @classdesc Represents a Battery.
             * @implements IBattery
             * @constructor
             * @param {sd3.Scenario.IBattery=} [properties] Properties to set
             */
            function Battery(properties) {
                this.timeseries = [];
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Battery id.
             * @member {number} id
             * @memberof sd3.Scenario.Battery
             * @instance
             */
            Battery.prototype.id = 0;

            /**
             * Battery timeseries.
             * @member {Array.<sd3.Scenario.Battery.ITimePoint>} timeseries
             * @memberof sd3.Scenario.Battery
             * @instance
             */
            Battery.prototype.timeseries = $util.emptyArray;

            /**
             * Decodes a Battery message from the specified reader or buffer.
             * @function decode
             * @memberof sd3.Scenario.Battery
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {sd3.Scenario.Battery} Battery
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Battery.decode = function decode(reader, length, error, long) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (long === undefined)
                    long = 0;
                if (long > $Reader.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.sd3.Scenario.Battery();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.id = reader.uint32();
                            break;
                        }
                    case 2: {
                            if (!(message.timeseries && message.timeseries.length))
                                message.timeseries = [];
                            message.timeseries.push($root.sd3.Scenario.Battery.TimePoint.decode(reader, reader.uint32(), undefined, long + 1));
                            break;
                        }
                    default:
                        reader.skipType(tag & 7, long);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Battery message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof sd3.Scenario.Battery
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {sd3.Scenario.Battery} Battery
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Battery.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Battery message.
             * @function verify
             * @memberof sd3.Scenario.Battery
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Battery.verify = function verify(message, long) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    return "maximum nesting depth exceeded";
                if (message.id != null && message.hasOwnProperty("id"))
                    if (!$util.isInteger(message.id))
                        return "id: integer expected";
                if (message.timeseries != null && message.hasOwnProperty("timeseries")) {
                    if (!Array.isArray(message.timeseries))
                        return "timeseries: array expected";
                    for (let i = 0; i < message.timeseries.length; ++i) {
                        let error = $root.sd3.Scenario.Battery.TimePoint.verify(message.timeseries[i], long + 1);
                        if (error)
                            return "timeseries." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a Battery message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof sd3.Scenario.Battery
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {sd3.Scenario.Battery} Battery
             */
            Battery.fromObject = function fromObject(object, long) {
                if (object instanceof $root.sd3.Scenario.Battery)
                    return object;
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let message = new $root.sd3.Scenario.Battery();
                if (object.id != null)
                    message.id = object.id >>> 0;
                if (object.timeseries) {
                    if (!Array.isArray(object.timeseries))
                        throw TypeError(".sd3.Scenario.Battery.timeseries: array expected");
                    message.timeseries = [];
                    for (let i = 0; i < object.timeseries.length; ++i) {
                        if (typeof object.timeseries[i] !== "object")
                            throw TypeError(".sd3.Scenario.Battery.timeseries: object expected");
                        message.timeseries[i] = $root.sd3.Scenario.Battery.TimePoint.fromObject(object.timeseries[i], long + 1);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from a Battery message. Also converts values to other types if specified.
             * @function toObject
             * @memberof sd3.Scenario.Battery
             * @static
             * @param {sd3.Scenario.Battery} message Battery
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Battery.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.arrays || options.defaults)
                    object.timeseries = [];
                if (options.defaults)
                    object.id = 0;
                if (message.id != null && message.hasOwnProperty("id"))
                    object.id = message.id;
                if (message.timeseries && message.timeseries.length) {
                    object.timeseries = [];
                    for (let j = 0; j < message.timeseries.length; ++j)
                        object.timeseries[j] = $root.sd3.Scenario.Battery.TimePoint.toObject(message.timeseries[j], options);
                }
                return object;
            };

            /**
             * Converts this Battery to JSON.
             * @function toJSON
             * @memberof sd3.Scenario.Battery
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Battery.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for Battery
             * @function getTypeUrl
             * @memberof sd3.Scenario.Battery
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            Battery.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/sd3.Scenario.Battery";
            };

            /**
             * BatteryStatus enum.
             * @name sd3.Scenario.Battery.BatteryStatus
             * @enum {number}
             * @property {number} IDLE=0 IDLE value
             * @property {number} DISCHARGING=1 DISCHARGING value
             * @property {number} CHARGING=2 CHARGING value
             */
            Battery.BatteryStatus = (function() {
                const valuesById = {}, values = Object.create(valuesById);
                values[valuesById[0] = "IDLE"] = 0;
                values[valuesById[1] = "DISCHARGING"] = 1;
                values[valuesById[2] = "CHARGING"] = 2;
                return values;
            })();

            Battery.TimePoint = (function() {

                /**
                 * Properties of a TimePoint.
                 * @memberof sd3.Scenario.Battery
                 * @interface ITimePoint
                 * @property {number|null} [seconds] TimePoint seconds
                 * @property {number|null} [receivedSignal] TimePoint receivedSignal
                 * @property {sd3.Scenario.Battery.BatteryStatus|null} [status] TimePoint status
                 * @property {number|null} [stateOfCharge] TimePoint stateOfCharge
                 * @property {number|null} [activePower] TimePoint activePower
                 * @property {number|null} [reactivePower] TimePoint reactivePower
                 */

                /**
                 * Constructs a new TimePoint.
                 * @memberof sd3.Scenario.Battery
                 * @classdesc Represents a TimePoint.
                 * @implements ITimePoint
                 * @constructor
                 * @param {sd3.Scenario.Battery.ITimePoint=} [properties] Properties to set
                 */
                function TimePoint(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * TimePoint seconds.
                 * @member {number} seconds
                 * @memberof sd3.Scenario.Battery.TimePoint
                 * @instance
                 */
                TimePoint.prototype.seconds = 0;

                /**
                 * TimePoint receivedSignal.
                 * @member {number} receivedSignal
                 * @memberof sd3.Scenario.Battery.TimePoint
                 * @instance
                 */
                TimePoint.prototype.receivedSignal = 0;

                /**
                 * TimePoint status.
                 * @member {sd3.Scenario.Battery.BatteryStatus} status
                 * @memberof sd3.Scenario.Battery.TimePoint
                 * @instance
                 */
                TimePoint.prototype.status = 0;

                /**
                 * TimePoint stateOfCharge.
                 * @member {number} stateOfCharge
                 * @memberof sd3.Scenario.Battery.TimePoint
                 * @instance
                 */
                TimePoint.prototype.stateOfCharge = 0;

                /**
                 * TimePoint activePower.
                 * @member {number} activePower
                 * @memberof sd3.Scenario.Battery.TimePoint
                 * @instance
                 */
                TimePoint.prototype.activePower = 0;

                /**
                 * TimePoint reactivePower.
                 * @member {number} reactivePower
                 * @memberof sd3.Scenario.Battery.TimePoint
                 * @instance
                 */
                TimePoint.prototype.reactivePower = 0;

                /**
                 * Decodes a TimePoint message from the specified reader or buffer.
                 * @function decode
                 * @memberof sd3.Scenario.Battery.TimePoint
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {sd3.Scenario.Battery.TimePoint} TimePoint
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                TimePoint.decode = function decode(reader, length, error, long) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (long === undefined)
                        long = 0;
                    if (long > $Reader.recursionLimit)
                        throw Error("maximum nesting depth exceeded");
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.sd3.Scenario.Battery.TimePoint();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.seconds = reader.uint32();
                                break;
                            }
                        case 2: {
                                message.receivedSignal = reader.float();
                                break;
                            }
                        case 3: {
                                message.status = reader.int32();
                                break;
                            }
                        case 4: {
                                message.stateOfCharge = reader.float();
                                break;
                            }
                        case 5: {
                                message.activePower = reader.float();
                                break;
                            }
                        case 6: {
                                message.reactivePower = reader.float();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7, long);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a TimePoint message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof sd3.Scenario.Battery.TimePoint
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {sd3.Scenario.Battery.TimePoint} TimePoint
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                TimePoint.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a TimePoint message.
                 * @function verify
                 * @memberof sd3.Scenario.Battery.TimePoint
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                TimePoint.verify = function verify(message, long) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (long === undefined)
                        long = 0;
                    if (long > $util.recursionLimit)
                        return "maximum nesting depth exceeded";
                    if (message.seconds != null && message.hasOwnProperty("seconds"))
                        if (!$util.isInteger(message.seconds))
                            return "seconds: integer expected";
                    if (message.receivedSignal != null && message.hasOwnProperty("receivedSignal"))
                        if (typeof message.receivedSignal !== "number")
                            return "receivedSignal: number expected";
                    if (message.status != null && message.hasOwnProperty("status"))
                        switch (message.status) {
                        default:
                            return "status: enum value expected";
                        case 0:
                        case 1:
                        case 2:
                            break;
                        }
                    if (message.stateOfCharge != null && message.hasOwnProperty("stateOfCharge"))
                        if (typeof message.stateOfCharge !== "number")
                            return "stateOfCharge: number expected";
                    if (message.activePower != null && message.hasOwnProperty("activePower"))
                        if (typeof message.activePower !== "number")
                            return "activePower: number expected";
                    if (message.reactivePower != null && message.hasOwnProperty("reactivePower"))
                        if (typeof message.reactivePower !== "number")
                            return "reactivePower: number expected";
                    return null;
                };

                /**
                 * Creates a TimePoint message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof sd3.Scenario.Battery.TimePoint
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {sd3.Scenario.Battery.TimePoint} TimePoint
                 */
                TimePoint.fromObject = function fromObject(object, long) {
                    if (object instanceof $root.sd3.Scenario.Battery.TimePoint)
                        return object;
                    if (long === undefined)
                        long = 0;
                    if (long > $util.recursionLimit)
                        throw Error("maximum nesting depth exceeded");
                    let message = new $root.sd3.Scenario.Battery.TimePoint();
                    if (object.seconds != null)
                        message.seconds = object.seconds >>> 0;
                    if (object.receivedSignal != null)
                        message.receivedSignal = Number(object.receivedSignal);
                    switch (object.status) {
                    default:
                        if (typeof object.status === "number") {
                            message.status = object.status;
                            break;
                        }
                        break;
                    case "IDLE":
                    case 0:
                        message.status = 0;
                        break;
                    case "DISCHARGING":
                    case 1:
                        message.status = 1;
                        break;
                    case "CHARGING":
                    case 2:
                        message.status = 2;
                        break;
                    }
                    if (object.stateOfCharge != null)
                        message.stateOfCharge = Number(object.stateOfCharge);
                    if (object.activePower != null)
                        message.activePower = Number(object.activePower);
                    if (object.reactivePower != null)
                        message.reactivePower = Number(object.reactivePower);
                    return message;
                };

                /**
                 * Creates a plain object from a TimePoint message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof sd3.Scenario.Battery.TimePoint
                 * @static
                 * @param {sd3.Scenario.Battery.TimePoint} message TimePoint
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                TimePoint.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults) {
                        object.seconds = 0;
                        object.receivedSignal = 0;
                        object.status = options.enums === String ? "IDLE" : 0;
                        object.stateOfCharge = 0;
                        object.activePower = 0;
                        object.reactivePower = 0;
                    }
                    if (message.seconds != null && message.hasOwnProperty("seconds"))
                        object.seconds = message.seconds;
                    if (message.receivedSignal != null && message.hasOwnProperty("receivedSignal"))
                        object.receivedSignal = options.json && !isFinite(message.receivedSignal) ? String(message.receivedSignal) : message.receivedSignal;
                    if (message.status != null && message.hasOwnProperty("status"))
                        object.status = options.enums === String ? $root.sd3.Scenario.Battery.BatteryStatus[message.status] === undefined ? message.status : $root.sd3.Scenario.Battery.BatteryStatus[message.status] : message.status;
                    if (message.stateOfCharge != null && message.hasOwnProperty("stateOfCharge"))
                        object.stateOfCharge = options.json && !isFinite(message.stateOfCharge) ? String(message.stateOfCharge) : message.stateOfCharge;
                    if (message.activePower != null && message.hasOwnProperty("activePower"))
                        object.activePower = options.json && !isFinite(message.activePower) ? String(message.activePower) : message.activePower;
                    if (message.reactivePower != null && message.hasOwnProperty("reactivePower"))
                        object.reactivePower = options.json && !isFinite(message.reactivePower) ? String(message.reactivePower) : message.reactivePower;
                    return object;
                };

                /**
                 * Converts this TimePoint to JSON.
                 * @function toJSON
                 * @memberof sd3.Scenario.Battery.TimePoint
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                TimePoint.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for TimePoint
                 * @function getTypeUrl
                 * @memberof sd3.Scenario.Battery.TimePoint
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                TimePoint.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/sd3.Scenario.Battery.TimePoint";
                };

                return TimePoint;
            })();

            return Battery;
        })();

        Scenario.Building = (function() {

            /**
             * Properties of a Building.
             * @memberof sd3.Scenario
             * @interface IBuilding
             * @property {number|null} [id] Building id
             * @property {Array.<sd3.Scenario.Building.ITimePoint>|null} [timeseries] Building timeseries
             */

            /**
             * Constructs a new Building.
             * @memberof sd3.Scenario
             * @classdesc Represents a Building.
             * @implements IBuilding
             * @constructor
             * @param {sd3.Scenario.IBuilding=} [properties] Properties to set
             */
            function Building(properties) {
                this.timeseries = [];
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Building id.
             * @member {number} id
             * @memberof sd3.Scenario.Building
             * @instance
             */
            Building.prototype.id = 0;

            /**
             * Building timeseries.
             * @member {Array.<sd3.Scenario.Building.ITimePoint>} timeseries
             * @memberof sd3.Scenario.Building
             * @instance
             */
            Building.prototype.timeseries = $util.emptyArray;

            /**
             * Decodes a Building message from the specified reader or buffer.
             * @function decode
             * @memberof sd3.Scenario.Building
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {sd3.Scenario.Building} Building
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Building.decode = function decode(reader, length, error, long) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (long === undefined)
                    long = 0;
                if (long > $Reader.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.sd3.Scenario.Building();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.id = reader.uint32();
                            break;
                        }
                    case 2: {
                            if (!(message.timeseries && message.timeseries.length))
                                message.timeseries = [];
                            message.timeseries.push($root.sd3.Scenario.Building.TimePoint.decode(reader, reader.uint32(), undefined, long + 1));
                            break;
                        }
                    default:
                        reader.skipType(tag & 7, long);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Building message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof sd3.Scenario.Building
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {sd3.Scenario.Building} Building
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Building.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Building message.
             * @function verify
             * @memberof sd3.Scenario.Building
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Building.verify = function verify(message, long) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    return "maximum nesting depth exceeded";
                if (message.id != null && message.hasOwnProperty("id"))
                    if (!$util.isInteger(message.id))
                        return "id: integer expected";
                if (message.timeseries != null && message.hasOwnProperty("timeseries")) {
                    if (!Array.isArray(message.timeseries))
                        return "timeseries: array expected";
                    for (let i = 0; i < message.timeseries.length; ++i) {
                        let error = $root.sd3.Scenario.Building.TimePoint.verify(message.timeseries[i], long + 1);
                        if (error)
                            return "timeseries." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a Building message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof sd3.Scenario.Building
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {sd3.Scenario.Building} Building
             */
            Building.fromObject = function fromObject(object, long) {
                if (object instanceof $root.sd3.Scenario.Building)
                    return object;
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let message = new $root.sd3.Scenario.Building();
                if (object.id != null)
                    message.id = object.id >>> 0;
                if (object.timeseries) {
                    if (!Array.isArray(object.timeseries))
                        throw TypeError(".sd3.Scenario.Building.timeseries: array expected");
                    message.timeseries = [];
                    for (let i = 0; i < object.timeseries.length; ++i) {
                        if (typeof object.timeseries[i] !== "object")
                            throw TypeError(".sd3.Scenario.Building.timeseries: object expected");
                        message.timeseries[i] = $root.sd3.Scenario.Building.TimePoint.fromObject(object.timeseries[i], long + 1);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from a Building message. Also converts values to other types if specified.
             * @function toObject
             * @memberof sd3.Scenario.Building
             * @static
             * @param {sd3.Scenario.Building} message Building
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Building.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.arrays || options.defaults)
                    object.timeseries = [];
                if (options.defaults)
                    object.id = 0;
                if (message.id != null && message.hasOwnProperty("id"))
                    object.id = message.id;
                if (message.timeseries && message.timeseries.length) {
                    object.timeseries = [];
                    for (let j = 0; j < message.timeseries.length; ++j)
                        object.timeseries[j] = $root.sd3.Scenario.Building.TimePoint.toObject(message.timeseries[j], options);
                }
                return object;
            };

            /**
             * Converts this Building to JSON.
             * @function toJSON
             * @memberof sd3.Scenario.Building
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Building.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for Building
             * @function getTypeUrl
             * @memberof sd3.Scenario.Building
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            Building.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/sd3.Scenario.Building";
            };

            Building.TimePoint = (function() {

                /**
                 * Properties of a TimePoint.
                 * @memberof sd3.Scenario.Building
                 * @interface ITimePoint
                 * @property {number|null} [seconds] TimePoint seconds
                 * @property {number|null} [power] TimePoint power
                 * @property {number|null} [netPower] TimePoint netPower
                 * @property {number|null} [purchasedPower] TimePoint purchasedPower
                 * @property {number|null} [surplusPower] TimePoint surplusPower
                 */

                /**
                 * Constructs a new TimePoint.
                 * @memberof sd3.Scenario.Building
                 * @classdesc Represents a TimePoint.
                 * @implements ITimePoint
                 * @constructor
                 * @param {sd3.Scenario.Building.ITimePoint=} [properties] Properties to set
                 */
                function TimePoint(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * TimePoint seconds.
                 * @member {number} seconds
                 * @memberof sd3.Scenario.Building.TimePoint
                 * @instance
                 */
                TimePoint.prototype.seconds = 0;

                /**
                 * TimePoint power.
                 * @member {number} power
                 * @memberof sd3.Scenario.Building.TimePoint
                 * @instance
                 */
                TimePoint.prototype.power = 0;

                /**
                 * TimePoint netPower.
                 * @member {number} netPower
                 * @memberof sd3.Scenario.Building.TimePoint
                 * @instance
                 */
                TimePoint.prototype.netPower = 0;

                /**
                 * TimePoint purchasedPower.
                 * @member {number} purchasedPower
                 * @memberof sd3.Scenario.Building.TimePoint
                 * @instance
                 */
                TimePoint.prototype.purchasedPower = 0;

                /**
                 * TimePoint surplusPower.
                 * @member {number} surplusPower
                 * @memberof sd3.Scenario.Building.TimePoint
                 * @instance
                 */
                TimePoint.prototype.surplusPower = 0;

                /**
                 * Decodes a TimePoint message from the specified reader or buffer.
                 * @function decode
                 * @memberof sd3.Scenario.Building.TimePoint
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {sd3.Scenario.Building.TimePoint} TimePoint
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                TimePoint.decode = function decode(reader, length, error, long) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (long === undefined)
                        long = 0;
                    if (long > $Reader.recursionLimit)
                        throw Error("maximum nesting depth exceeded");
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.sd3.Scenario.Building.TimePoint();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.seconds = reader.uint32();
                                break;
                            }
                        case 2: {
                                message.power = reader.float();
                                break;
                            }
                        case 3: {
                                message.netPower = reader.float();
                                break;
                            }
                        case 4: {
                                message.purchasedPower = reader.float();
                                break;
                            }
                        case 5: {
                                message.surplusPower = reader.float();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7, long);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a TimePoint message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof sd3.Scenario.Building.TimePoint
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {sd3.Scenario.Building.TimePoint} TimePoint
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                TimePoint.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a TimePoint message.
                 * @function verify
                 * @memberof sd3.Scenario.Building.TimePoint
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                TimePoint.verify = function verify(message, long) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (long === undefined)
                        long = 0;
                    if (long > $util.recursionLimit)
                        return "maximum nesting depth exceeded";
                    if (message.seconds != null && message.hasOwnProperty("seconds"))
                        if (!$util.isInteger(message.seconds))
                            return "seconds: integer expected";
                    if (message.power != null && message.hasOwnProperty("power"))
                        if (typeof message.power !== "number")
                            return "power: number expected";
                    if (message.netPower != null && message.hasOwnProperty("netPower"))
                        if (typeof message.netPower !== "number")
                            return "netPower: number expected";
                    if (message.purchasedPower != null && message.hasOwnProperty("purchasedPower"))
                        if (typeof message.purchasedPower !== "number")
                            return "purchasedPower: number expected";
                    if (message.surplusPower != null && message.hasOwnProperty("surplusPower"))
                        if (typeof message.surplusPower !== "number")
                            return "surplusPower: number expected";
                    return null;
                };

                /**
                 * Creates a TimePoint message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof sd3.Scenario.Building.TimePoint
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {sd3.Scenario.Building.TimePoint} TimePoint
                 */
                TimePoint.fromObject = function fromObject(object, long) {
                    if (object instanceof $root.sd3.Scenario.Building.TimePoint)
                        return object;
                    if (long === undefined)
                        long = 0;
                    if (long > $util.recursionLimit)
                        throw Error("maximum nesting depth exceeded");
                    let message = new $root.sd3.Scenario.Building.TimePoint();
                    if (object.seconds != null)
                        message.seconds = object.seconds >>> 0;
                    if (object.power != null)
                        message.power = Number(object.power);
                    if (object.netPower != null)
                        message.netPower = Number(object.netPower);
                    if (object.purchasedPower != null)
                        message.purchasedPower = Number(object.purchasedPower);
                    if (object.surplusPower != null)
                        message.surplusPower = Number(object.surplusPower);
                    return message;
                };

                /**
                 * Creates a plain object from a TimePoint message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof sd3.Scenario.Building.TimePoint
                 * @static
                 * @param {sd3.Scenario.Building.TimePoint} message TimePoint
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                TimePoint.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults) {
                        object.seconds = 0;
                        object.power = 0;
                        object.netPower = 0;
                        object.purchasedPower = 0;
                        object.surplusPower = 0;
                    }
                    if (message.seconds != null && message.hasOwnProperty("seconds"))
                        object.seconds = message.seconds;
                    if (message.power != null && message.hasOwnProperty("power"))
                        object.power = options.json && !isFinite(message.power) ? String(message.power) : message.power;
                    if (message.netPower != null && message.hasOwnProperty("netPower"))
                        object.netPower = options.json && !isFinite(message.netPower) ? String(message.netPower) : message.netPower;
                    if (message.purchasedPower != null && message.hasOwnProperty("purchasedPower"))
                        object.purchasedPower = options.json && !isFinite(message.purchasedPower) ? String(message.purchasedPower) : message.purchasedPower;
                    if (message.surplusPower != null && message.hasOwnProperty("surplusPower"))
                        object.surplusPower = options.json && !isFinite(message.surplusPower) ? String(message.surplusPower) : message.surplusPower;
                    return object;
                };

                /**
                 * Converts this TimePoint to JSON.
                 * @function toJSON
                 * @memberof sd3.Scenario.Building.TimePoint
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                TimePoint.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for TimePoint
                 * @function getTypeUrl
                 * @memberof sd3.Scenario.Building.TimePoint
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                TimePoint.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/sd3.Scenario.Building.TimePoint";
                };

                return TimePoint;
            })();

            return Building;
        })();

        return Scenario;
    })();

    sd3.BusConnection = (function() {

        /**
         * Properties of a BusConnection.
         * @memberof sd3
         * @interface IBusConnection
         * @property {number|null} [busId] BusConnection busId
         * @property {boolean|null} [phaseA] BusConnection phaseA
         * @property {boolean|null} [phaseB] BusConnection phaseB
         * @property {boolean|null} [phaseC] BusConnection phaseC
         */

        /**
         * Constructs a new BusConnection.
         * @memberof sd3
         * @classdesc Represents a BusConnection.
         * @implements IBusConnection
         * @constructor
         * @param {sd3.IBusConnection=} [properties] Properties to set
         */
        function BusConnection(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * BusConnection busId.
         * @member {number} busId
         * @memberof sd3.BusConnection
         * @instance
         */
        BusConnection.prototype.busId = 0;

        /**
         * BusConnection phaseA.
         * @member {boolean} phaseA
         * @memberof sd3.BusConnection
         * @instance
         */
        BusConnection.prototype.phaseA = false;

        /**
         * BusConnection phaseB.
         * @member {boolean} phaseB
         * @memberof sd3.BusConnection
         * @instance
         */
        BusConnection.prototype.phaseB = false;

        /**
         * BusConnection phaseC.
         * @member {boolean} phaseC
         * @memberof sd3.BusConnection
         * @instance
         */
        BusConnection.prototype.phaseC = false;

        /**
         * Decodes a BusConnection message from the specified reader or buffer.
         * @function decode
         * @memberof sd3.BusConnection
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {sd3.BusConnection} BusConnection
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BusConnection.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.sd3.BusConnection();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.busId = reader.uint32();
                        break;
                    }
                case 2: {
                        message.phaseA = reader.bool();
                        break;
                    }
                case 3: {
                        message.phaseB = reader.bool();
                        break;
                    }
                case 4: {
                        message.phaseC = reader.bool();
                        break;
                    }
                default:
                    reader.skipType(tag & 7, long);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a BusConnection message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof sd3.BusConnection
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {sd3.BusConnection} BusConnection
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BusConnection.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a BusConnection message.
         * @function verify
         * @memberof sd3.BusConnection
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        BusConnection.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.busId != null && message.hasOwnProperty("busId"))
                if (!$util.isInteger(message.busId))
                    return "busId: integer expected";
            if (message.phaseA != null && message.hasOwnProperty("phaseA"))
                if (typeof message.phaseA !== "boolean")
                    return "phaseA: boolean expected";
            if (message.phaseB != null && message.hasOwnProperty("phaseB"))
                if (typeof message.phaseB !== "boolean")
                    return "phaseB: boolean expected";
            if (message.phaseC != null && message.hasOwnProperty("phaseC"))
                if (typeof message.phaseC !== "boolean")
                    return "phaseC: boolean expected";
            return null;
        };

        /**
         * Creates a BusConnection message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof sd3.BusConnection
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {sd3.BusConnection} BusConnection
         */
        BusConnection.fromObject = function fromObject(object, long) {
            if (object instanceof $root.sd3.BusConnection)
                return object;
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.sd3.BusConnection();
            if (object.busId != null)
                message.busId = object.busId >>> 0;
            if (object.phaseA != null)
                message.phaseA = Boolean(object.phaseA);
            if (object.phaseB != null)
                message.phaseB = Boolean(object.phaseB);
            if (object.phaseC != null)
                message.phaseC = Boolean(object.phaseC);
            return message;
        };

        /**
         * Creates a plain object from a BusConnection message. Also converts values to other types if specified.
         * @function toObject
         * @memberof sd3.BusConnection
         * @static
         * @param {sd3.BusConnection} message BusConnection
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        BusConnection.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.busId = 0;
                object.phaseA = false;
                object.phaseB = false;
                object.phaseC = false;
            }
            if (message.busId != null && message.hasOwnProperty("busId"))
                object.busId = message.busId;
            if (message.phaseA != null && message.hasOwnProperty("phaseA"))
                object.phaseA = message.phaseA;
            if (message.phaseB != null && message.hasOwnProperty("phaseB"))
                object.phaseB = message.phaseB;
            if (message.phaseC != null && message.hasOwnProperty("phaseC"))
                object.phaseC = message.phaseC;
            return object;
        };

        /**
         * Converts this BusConnection to JSON.
         * @function toJSON
         * @memberof sd3.BusConnection
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        BusConnection.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for BusConnection
         * @function getTypeUrl
         * @memberof sd3.BusConnection
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        BusConnection.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/sd3.BusConnection";
        };

        return BusConnection;
    })();

    sd3.Feeder = (function() {

        /**
         * Properties of a Feeder.
         * @memberof sd3
         * @interface IFeeder
         * @property {number|null} [sourceBusId] Feeder sourceBusId
         * @property {Array.<sd3.Feeder.ILine>|null} [lines] Feeder lines
         * @property {Array.<sd3.Feeder.ILoad>|null} [loads] Feeder loads
         * @property {Array.<sd3.Feeder.ICapacitor>|null} [capacitors] Feeder capacitors
         * @property {Array.<sd3.Feeder.IRegulator>|null} [regulators] Feeder regulators
         * @property {Array.<sd3.Feeder.ITransformer>|null} [transformers] Feeder transformers
         * @property {Array.<sd3.Feeder.IBus>|null} [buses] Feeder buses
         */

        /**
         * Constructs a new Feeder.
         * @memberof sd3
         * @classdesc Represents a Feeder.
         * @implements IFeeder
         * @constructor
         * @param {sd3.IFeeder=} [properties] Properties to set
         */
        function Feeder(properties) {
            this.lines = [];
            this.loads = [];
            this.capacitors = [];
            this.regulators = [];
            this.transformers = [];
            this.buses = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Feeder sourceBusId.
         * @member {number} sourceBusId
         * @memberof sd3.Feeder
         * @instance
         */
        Feeder.prototype.sourceBusId = 0;

        /**
         * Feeder lines.
         * @member {Array.<sd3.Feeder.ILine>} lines
         * @memberof sd3.Feeder
         * @instance
         */
        Feeder.prototype.lines = $util.emptyArray;

        /**
         * Feeder loads.
         * @member {Array.<sd3.Feeder.ILoad>} loads
         * @memberof sd3.Feeder
         * @instance
         */
        Feeder.prototype.loads = $util.emptyArray;

        /**
         * Feeder capacitors.
         * @member {Array.<sd3.Feeder.ICapacitor>} capacitors
         * @memberof sd3.Feeder
         * @instance
         */
        Feeder.prototype.capacitors = $util.emptyArray;

        /**
         * Feeder regulators.
         * @member {Array.<sd3.Feeder.IRegulator>} regulators
         * @memberof sd3.Feeder
         * @instance
         */
        Feeder.prototype.regulators = $util.emptyArray;

        /**
         * Feeder transformers.
         * @member {Array.<sd3.Feeder.ITransformer>} transformers
         * @memberof sd3.Feeder
         * @instance
         */
        Feeder.prototype.transformers = $util.emptyArray;

        /**
         * Feeder buses.
         * @member {Array.<sd3.Feeder.IBus>} buses
         * @memberof sd3.Feeder
         * @instance
         */
        Feeder.prototype.buses = $util.emptyArray;

        /**
         * Decodes a Feeder message from the specified reader or buffer.
         * @function decode
         * @memberof sd3.Feeder
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {sd3.Feeder} Feeder
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Feeder.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.sd3.Feeder();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.sourceBusId = reader.uint32();
                        break;
                    }
                case 2: {
                        if (!(message.lines && message.lines.length))
                            message.lines = [];
                        message.lines.push($root.sd3.Feeder.Line.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 3: {
                        if (!(message.loads && message.loads.length))
                            message.loads = [];
                        message.loads.push($root.sd3.Feeder.Load.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 4: {
                        if (!(message.capacitors && message.capacitors.length))
                            message.capacitors = [];
                        message.capacitors.push($root.sd3.Feeder.Capacitor.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 5: {
                        if (!(message.regulators && message.regulators.length))
                            message.regulators = [];
                        message.regulators.push($root.sd3.Feeder.Regulator.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 6: {
                        if (!(message.transformers && message.transformers.length))
                            message.transformers = [];
                        message.transformers.push($root.sd3.Feeder.Transformer.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 7: {
                        if (!(message.buses && message.buses.length))
                            message.buses = [];
                        message.buses.push($root.sd3.Feeder.Bus.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                default:
                    reader.skipType(tag & 7, long);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Feeder message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof sd3.Feeder
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {sd3.Feeder} Feeder
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Feeder.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Feeder message.
         * @function verify
         * @memberof sd3.Feeder
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Feeder.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.sourceBusId != null && message.hasOwnProperty("sourceBusId"))
                if (!$util.isInteger(message.sourceBusId))
                    return "sourceBusId: integer expected";
            if (message.lines != null && message.hasOwnProperty("lines")) {
                if (!Array.isArray(message.lines))
                    return "lines: array expected";
                for (let i = 0; i < message.lines.length; ++i) {
                    let error = $root.sd3.Feeder.Line.verify(message.lines[i], long + 1);
                    if (error)
                        return "lines." + error;
                }
            }
            if (message.loads != null && message.hasOwnProperty("loads")) {
                if (!Array.isArray(message.loads))
                    return "loads: array expected";
                for (let i = 0; i < message.loads.length; ++i) {
                    let error = $root.sd3.Feeder.Load.verify(message.loads[i], long + 1);
                    if (error)
                        return "loads." + error;
                }
            }
            if (message.capacitors != null && message.hasOwnProperty("capacitors")) {
                if (!Array.isArray(message.capacitors))
                    return "capacitors: array expected";
                for (let i = 0; i < message.capacitors.length; ++i) {
                    let error = $root.sd3.Feeder.Capacitor.verify(message.capacitors[i], long + 1);
                    if (error)
                        return "capacitors." + error;
                }
            }
            if (message.regulators != null && message.hasOwnProperty("regulators")) {
                if (!Array.isArray(message.regulators))
                    return "regulators: array expected";
                for (let i = 0; i < message.regulators.length; ++i) {
                    let error = $root.sd3.Feeder.Regulator.verify(message.regulators[i], long + 1);
                    if (error)
                        return "regulators." + error;
                }
            }
            if (message.transformers != null && message.hasOwnProperty("transformers")) {
                if (!Array.isArray(message.transformers))
                    return "transformers: array expected";
                for (let i = 0; i < message.transformers.length; ++i) {
                    let error = $root.sd3.Feeder.Transformer.verify(message.transformers[i], long + 1);
                    if (error)
                        return "transformers." + error;
                }
            }
            if (message.buses != null && message.hasOwnProperty("buses")) {
                if (!Array.isArray(message.buses))
                    return "buses: array expected";
                for (let i = 0; i < message.buses.length; ++i) {
                    let error = $root.sd3.Feeder.Bus.verify(message.buses[i], long + 1);
                    if (error)
                        return "buses." + error;
                }
            }
            return null;
        };

        /**
         * Creates a Feeder message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof sd3.Feeder
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {sd3.Feeder} Feeder
         */
        Feeder.fromObject = function fromObject(object, long) {
            if (object instanceof $root.sd3.Feeder)
                return object;
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.sd3.Feeder();
            if (object.sourceBusId != null)
                message.sourceBusId = object.sourceBusId >>> 0;
            if (object.lines) {
                if (!Array.isArray(object.lines))
                    throw TypeError(".sd3.Feeder.lines: array expected");
                message.lines = [];
                for (let i = 0; i < object.lines.length; ++i) {
                    if (typeof object.lines[i] !== "object")
                        throw TypeError(".sd3.Feeder.lines: object expected");
                    message.lines[i] = $root.sd3.Feeder.Line.fromObject(object.lines[i], long + 1);
                }
            }
            if (object.loads) {
                if (!Array.isArray(object.loads))
                    throw TypeError(".sd3.Feeder.loads: array expected");
                message.loads = [];
                for (let i = 0; i < object.loads.length; ++i) {
                    if (typeof object.loads[i] !== "object")
                        throw TypeError(".sd3.Feeder.loads: object expected");
                    message.loads[i] = $root.sd3.Feeder.Load.fromObject(object.loads[i], long + 1);
                }
            }
            if (object.capacitors) {
                if (!Array.isArray(object.capacitors))
                    throw TypeError(".sd3.Feeder.capacitors: array expected");
                message.capacitors = [];
                for (let i = 0; i < object.capacitors.length; ++i) {
                    if (typeof object.capacitors[i] !== "object")
                        throw TypeError(".sd3.Feeder.capacitors: object expected");
                    message.capacitors[i] = $root.sd3.Feeder.Capacitor.fromObject(object.capacitors[i], long + 1);
                }
            }
            if (object.regulators) {
                if (!Array.isArray(object.regulators))
                    throw TypeError(".sd3.Feeder.regulators: array expected");
                message.regulators = [];
                for (let i = 0; i < object.regulators.length; ++i) {
                    if (typeof object.regulators[i] !== "object")
                        throw TypeError(".sd3.Feeder.regulators: object expected");
                    message.regulators[i] = $root.sd3.Feeder.Regulator.fromObject(object.regulators[i], long + 1);
                }
            }
            if (object.transformers) {
                if (!Array.isArray(object.transformers))
                    throw TypeError(".sd3.Feeder.transformers: array expected");
                message.transformers = [];
                for (let i = 0; i < object.transformers.length; ++i) {
                    if (typeof object.transformers[i] !== "object")
                        throw TypeError(".sd3.Feeder.transformers: object expected");
                    message.transformers[i] = $root.sd3.Feeder.Transformer.fromObject(object.transformers[i], long + 1);
                }
            }
            if (object.buses) {
                if (!Array.isArray(object.buses))
                    throw TypeError(".sd3.Feeder.buses: array expected");
                message.buses = [];
                for (let i = 0; i < object.buses.length; ++i) {
                    if (typeof object.buses[i] !== "object")
                        throw TypeError(".sd3.Feeder.buses: object expected");
                    message.buses[i] = $root.sd3.Feeder.Bus.fromObject(object.buses[i], long + 1);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a Feeder message. Also converts values to other types if specified.
         * @function toObject
         * @memberof sd3.Feeder
         * @static
         * @param {sd3.Feeder} message Feeder
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Feeder.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults) {
                object.lines = [];
                object.loads = [];
                object.capacitors = [];
                object.regulators = [];
                object.transformers = [];
                object.buses = [];
            }
            if (options.defaults)
                object.sourceBusId = 0;
            if (message.sourceBusId != null && message.hasOwnProperty("sourceBusId"))
                object.sourceBusId = message.sourceBusId;
            if (message.lines && message.lines.length) {
                object.lines = [];
                for (let j = 0; j < message.lines.length; ++j)
                    object.lines[j] = $root.sd3.Feeder.Line.toObject(message.lines[j], options);
            }
            if (message.loads && message.loads.length) {
                object.loads = [];
                for (let j = 0; j < message.loads.length; ++j)
                    object.loads[j] = $root.sd3.Feeder.Load.toObject(message.loads[j], options);
            }
            if (message.capacitors && message.capacitors.length) {
                object.capacitors = [];
                for (let j = 0; j < message.capacitors.length; ++j)
                    object.capacitors[j] = $root.sd3.Feeder.Capacitor.toObject(message.capacitors[j], options);
            }
            if (message.regulators && message.regulators.length) {
                object.regulators = [];
                for (let j = 0; j < message.regulators.length; ++j)
                    object.regulators[j] = $root.sd3.Feeder.Regulator.toObject(message.regulators[j], options);
            }
            if (message.transformers && message.transformers.length) {
                object.transformers = [];
                for (let j = 0; j < message.transformers.length; ++j)
                    object.transformers[j] = $root.sd3.Feeder.Transformer.toObject(message.transformers[j], options);
            }
            if (message.buses && message.buses.length) {
                object.buses = [];
                for (let j = 0; j < message.buses.length; ++j)
                    object.buses[j] = $root.sd3.Feeder.Bus.toObject(message.buses[j], options);
            }
            return object;
        };

        /**
         * Converts this Feeder to JSON.
         * @function toJSON
         * @memberof sd3.Feeder
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Feeder.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Feeder
         * @function getTypeUrl
         * @memberof sd3.Feeder
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Feeder.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/sd3.Feeder";
        };

        Feeder.Bus = (function() {

            /**
             * Properties of a Bus.
             * @memberof sd3.Feeder
             * @interface IBus
             * @property {number|null} [id] Bus id
             * @property {number|null} [x] Bus x
             * @property {number|null} [y] Bus y
             */

            /**
             * Constructs a new Bus.
             * @memberof sd3.Feeder
             * @classdesc Represents a Bus.
             * @implements IBus
             * @constructor
             * @param {sd3.Feeder.IBus=} [properties] Properties to set
             */
            function Bus(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Bus id.
             * @member {number} id
             * @memberof sd3.Feeder.Bus
             * @instance
             */
            Bus.prototype.id = 0;

            /**
             * Bus x.
             * @member {number} x
             * @memberof sd3.Feeder.Bus
             * @instance
             */
            Bus.prototype.x = 0;

            /**
             * Bus y.
             * @member {number} y
             * @memberof sd3.Feeder.Bus
             * @instance
             */
            Bus.prototype.y = 0;

            /**
             * Decodes a Bus message from the specified reader or buffer.
             * @function decode
             * @memberof sd3.Feeder.Bus
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {sd3.Feeder.Bus} Bus
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Bus.decode = function decode(reader, length, error, long) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (long === undefined)
                    long = 0;
                if (long > $Reader.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.sd3.Feeder.Bus();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.id = reader.uint32();
                            break;
                        }
                    case 2: {
                            message.x = reader.uint32();
                            break;
                        }
                    case 3: {
                            message.y = reader.uint32();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7, long);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Bus message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof sd3.Feeder.Bus
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {sd3.Feeder.Bus} Bus
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Bus.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Bus message.
             * @function verify
             * @memberof sd3.Feeder.Bus
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Bus.verify = function verify(message, long) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    return "maximum nesting depth exceeded";
                if (message.id != null && message.hasOwnProperty("id"))
                    if (!$util.isInteger(message.id))
                        return "id: integer expected";
                if (message.x != null && message.hasOwnProperty("x"))
                    if (!$util.isInteger(message.x))
                        return "x: integer expected";
                if (message.y != null && message.hasOwnProperty("y"))
                    if (!$util.isInteger(message.y))
                        return "y: integer expected";
                return null;
            };

            /**
             * Creates a Bus message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof sd3.Feeder.Bus
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {sd3.Feeder.Bus} Bus
             */
            Bus.fromObject = function fromObject(object, long) {
                if (object instanceof $root.sd3.Feeder.Bus)
                    return object;
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let message = new $root.sd3.Feeder.Bus();
                if (object.id != null)
                    message.id = object.id >>> 0;
                if (object.x != null)
                    message.x = object.x >>> 0;
                if (object.y != null)
                    message.y = object.y >>> 0;
                return message;
            };

            /**
             * Creates a plain object from a Bus message. Also converts values to other types if specified.
             * @function toObject
             * @memberof sd3.Feeder.Bus
             * @static
             * @param {sd3.Feeder.Bus} message Bus
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Bus.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.id = 0;
                    object.x = 0;
                    object.y = 0;
                }
                if (message.id != null && message.hasOwnProperty("id"))
                    object.id = message.id;
                if (message.x != null && message.hasOwnProperty("x"))
                    object.x = message.x;
                if (message.y != null && message.hasOwnProperty("y"))
                    object.y = message.y;
                return object;
            };

            /**
             * Converts this Bus to JSON.
             * @function toJSON
             * @memberof sd3.Feeder.Bus
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Bus.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for Bus
             * @function getTypeUrl
             * @memberof sd3.Feeder.Bus
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            Bus.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/sd3.Feeder.Bus";
            };

            return Bus;
        })();

        Feeder.Line = (function() {

            /**
             * Properties of a Line.
             * @memberof sd3.Feeder
             * @interface ILine
             * @property {number|null} [id] Line id
             * @property {sd3.IBusConnection|null} [fromBus] Line fromBus
             * @property {sd3.IBusConnection|null} [toBus] Line toBus
             * @property {number|null} [lengthMeters] Line lengthMeters
             * @property {boolean|null} ["switch"] Line switch
             * @property {boolean|null} [enabled] Line enabled
             */

            /**
             * Constructs a new Line.
             * @memberof sd3.Feeder
             * @classdesc Represents a Line.
             * @implements ILine
             * @constructor
             * @param {sd3.Feeder.ILine=} [properties] Properties to set
             */
            function Line(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Line id.
             * @member {number} id
             * @memberof sd3.Feeder.Line
             * @instance
             */
            Line.prototype.id = 0;

            /**
             * Line fromBus.
             * @member {sd3.IBusConnection|null|undefined} fromBus
             * @memberof sd3.Feeder.Line
             * @instance
             */
            Line.prototype.fromBus = null;

            /**
             * Line toBus.
             * @member {sd3.IBusConnection|null|undefined} toBus
             * @memberof sd3.Feeder.Line
             * @instance
             */
            Line.prototype.toBus = null;

            /**
             * Line lengthMeters.
             * @member {number} lengthMeters
             * @memberof sd3.Feeder.Line
             * @instance
             */
            Line.prototype.lengthMeters = 0;

            /**
             * Line switch.
             * @member {boolean} switch
             * @memberof sd3.Feeder.Line
             * @instance
             */
            Line.prototype["switch"] = false;

            /**
             * Line enabled.
             * @member {boolean} enabled
             * @memberof sd3.Feeder.Line
             * @instance
             */
            Line.prototype.enabled = false;

            /**
             * Decodes a Line message from the specified reader or buffer.
             * @function decode
             * @memberof sd3.Feeder.Line
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {sd3.Feeder.Line} Line
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Line.decode = function decode(reader, length, error, long) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (long === undefined)
                    long = 0;
                if (long > $Reader.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.sd3.Feeder.Line();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.id = reader.uint32();
                            break;
                        }
                    case 2: {
                            message.fromBus = $root.sd3.BusConnection.decode(reader, reader.uint32(), undefined, long + 1);
                            break;
                        }
                    case 3: {
                            message.toBus = $root.sd3.BusConnection.decode(reader, reader.uint32(), undefined, long + 1);
                            break;
                        }
                    case 4: {
                            message.lengthMeters = reader.uint32();
                            break;
                        }
                    case 5: {
                            message["switch"] = reader.bool();
                            break;
                        }
                    case 6: {
                            message.enabled = reader.bool();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7, long);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Line message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof sd3.Feeder.Line
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {sd3.Feeder.Line} Line
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Line.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Line message.
             * @function verify
             * @memberof sd3.Feeder.Line
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Line.verify = function verify(message, long) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    return "maximum nesting depth exceeded";
                if (message.id != null && message.hasOwnProperty("id"))
                    if (!$util.isInteger(message.id))
                        return "id: integer expected";
                if (message.fromBus != null && message.hasOwnProperty("fromBus")) {
                    let error = $root.sd3.BusConnection.verify(message.fromBus, long + 1);
                    if (error)
                        return "fromBus." + error;
                }
                if (message.toBus != null && message.hasOwnProperty("toBus")) {
                    let error = $root.sd3.BusConnection.verify(message.toBus, long + 1);
                    if (error)
                        return "toBus." + error;
                }
                if (message.lengthMeters != null && message.hasOwnProperty("lengthMeters"))
                    if (!$util.isInteger(message.lengthMeters))
                        return "lengthMeters: integer expected";
                if (message["switch"] != null && message.hasOwnProperty("switch"))
                    if (typeof message["switch"] !== "boolean")
                        return "switch: boolean expected";
                if (message.enabled != null && message.hasOwnProperty("enabled"))
                    if (typeof message.enabled !== "boolean")
                        return "enabled: boolean expected";
                return null;
            };

            /**
             * Creates a Line message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof sd3.Feeder.Line
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {sd3.Feeder.Line} Line
             */
            Line.fromObject = function fromObject(object, long) {
                if (object instanceof $root.sd3.Feeder.Line)
                    return object;
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let message = new $root.sd3.Feeder.Line();
                if (object.id != null)
                    message.id = object.id >>> 0;
                if (object.fromBus != null) {
                    if (typeof object.fromBus !== "object")
                        throw TypeError(".sd3.Feeder.Line.fromBus: object expected");
                    message.fromBus = $root.sd3.BusConnection.fromObject(object.fromBus, long + 1);
                }
                if (object.toBus != null) {
                    if (typeof object.toBus !== "object")
                        throw TypeError(".sd3.Feeder.Line.toBus: object expected");
                    message.toBus = $root.sd3.BusConnection.fromObject(object.toBus, long + 1);
                }
                if (object.lengthMeters != null)
                    message.lengthMeters = object.lengthMeters >>> 0;
                if (object["switch"] != null)
                    message["switch"] = Boolean(object["switch"]);
                if (object.enabled != null)
                    message.enabled = Boolean(object.enabled);
                return message;
            };

            /**
             * Creates a plain object from a Line message. Also converts values to other types if specified.
             * @function toObject
             * @memberof sd3.Feeder.Line
             * @static
             * @param {sd3.Feeder.Line} message Line
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Line.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.id = 0;
                    object.fromBus = null;
                    object.toBus = null;
                    object.lengthMeters = 0;
                    object["switch"] = false;
                    object.enabled = false;
                }
                if (message.id != null && message.hasOwnProperty("id"))
                    object.id = message.id;
                if (message.fromBus != null && message.hasOwnProperty("fromBus"))
                    object.fromBus = $root.sd3.BusConnection.toObject(message.fromBus, options);
                if (message.toBus != null && message.hasOwnProperty("toBus"))
                    object.toBus = $root.sd3.BusConnection.toObject(message.toBus, options);
                if (message.lengthMeters != null && message.hasOwnProperty("lengthMeters"))
                    object.lengthMeters = message.lengthMeters;
                if (message["switch"] != null && message.hasOwnProperty("switch"))
                    object["switch"] = message["switch"];
                if (message.enabled != null && message.hasOwnProperty("enabled"))
                    object.enabled = message.enabled;
                return object;
            };

            /**
             * Converts this Line to JSON.
             * @function toJSON
             * @memberof sd3.Feeder.Line
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Line.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for Line
             * @function getTypeUrl
             * @memberof sd3.Feeder.Line
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            Line.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/sd3.Feeder.Line";
            };

            return Line;
        })();

        Feeder.Load = (function() {

            /**
             * Properties of a Load.
             * @memberof sd3.Feeder
             * @interface ILoad
             * @property {number|null} [id] Load id
             * @property {sd3.IBusConnection|null} [bus] Load bus
             */

            /**
             * Constructs a new Load.
             * @memberof sd3.Feeder
             * @classdesc Represents a Load.
             * @implements ILoad
             * @constructor
             * @param {sd3.Feeder.ILoad=} [properties] Properties to set
             */
            function Load(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Load id.
             * @member {number} id
             * @memberof sd3.Feeder.Load
             * @instance
             */
            Load.prototype.id = 0;

            /**
             * Load bus.
             * @member {sd3.IBusConnection|null|undefined} bus
             * @memberof sd3.Feeder.Load
             * @instance
             */
            Load.prototype.bus = null;

            /**
             * Decodes a Load message from the specified reader or buffer.
             * @function decode
             * @memberof sd3.Feeder.Load
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {sd3.Feeder.Load} Load
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Load.decode = function decode(reader, length, error, long) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (long === undefined)
                    long = 0;
                if (long > $Reader.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.sd3.Feeder.Load();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.id = reader.uint32();
                            break;
                        }
                    case 2: {
                            message.bus = $root.sd3.BusConnection.decode(reader, reader.uint32(), undefined, long + 1);
                            break;
                        }
                    default:
                        reader.skipType(tag & 7, long);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Load message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof sd3.Feeder.Load
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {sd3.Feeder.Load} Load
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Load.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Load message.
             * @function verify
             * @memberof sd3.Feeder.Load
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Load.verify = function verify(message, long) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    return "maximum nesting depth exceeded";
                if (message.id != null && message.hasOwnProperty("id"))
                    if (!$util.isInteger(message.id))
                        return "id: integer expected";
                if (message.bus != null && message.hasOwnProperty("bus")) {
                    let error = $root.sd3.BusConnection.verify(message.bus, long + 1);
                    if (error)
                        return "bus." + error;
                }
                return null;
            };

            /**
             * Creates a Load message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof sd3.Feeder.Load
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {sd3.Feeder.Load} Load
             */
            Load.fromObject = function fromObject(object, long) {
                if (object instanceof $root.sd3.Feeder.Load)
                    return object;
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let message = new $root.sd3.Feeder.Load();
                if (object.id != null)
                    message.id = object.id >>> 0;
                if (object.bus != null) {
                    if (typeof object.bus !== "object")
                        throw TypeError(".sd3.Feeder.Load.bus: object expected");
                    message.bus = $root.sd3.BusConnection.fromObject(object.bus, long + 1);
                }
                return message;
            };

            /**
             * Creates a plain object from a Load message. Also converts values to other types if specified.
             * @function toObject
             * @memberof sd3.Feeder.Load
             * @static
             * @param {sd3.Feeder.Load} message Load
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Load.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.id = 0;
                    object.bus = null;
                }
                if (message.id != null && message.hasOwnProperty("id"))
                    object.id = message.id;
                if (message.bus != null && message.hasOwnProperty("bus"))
                    object.bus = $root.sd3.BusConnection.toObject(message.bus, options);
                return object;
            };

            /**
             * Converts this Load to JSON.
             * @function toJSON
             * @memberof sd3.Feeder.Load
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Load.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for Load
             * @function getTypeUrl
             * @memberof sd3.Feeder.Load
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            Load.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/sd3.Feeder.Load";
            };

            return Load;
        })();

        Feeder.Capacitor = (function() {

            /**
             * Properties of a Capacitor.
             * @memberof sd3.Feeder
             * @interface ICapacitor
             * @property {number|null} [id] Capacitor id
             * @property {sd3.IBusConnection|null} [bus] Capacitor bus
             */

            /**
             * Constructs a new Capacitor.
             * @memberof sd3.Feeder
             * @classdesc Represents a Capacitor.
             * @implements ICapacitor
             * @constructor
             * @param {sd3.Feeder.ICapacitor=} [properties] Properties to set
             */
            function Capacitor(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Capacitor id.
             * @member {number} id
             * @memberof sd3.Feeder.Capacitor
             * @instance
             */
            Capacitor.prototype.id = 0;

            /**
             * Capacitor bus.
             * @member {sd3.IBusConnection|null|undefined} bus
             * @memberof sd3.Feeder.Capacitor
             * @instance
             */
            Capacitor.prototype.bus = null;

            /**
             * Decodes a Capacitor message from the specified reader or buffer.
             * @function decode
             * @memberof sd3.Feeder.Capacitor
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {sd3.Feeder.Capacitor} Capacitor
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Capacitor.decode = function decode(reader, length, error, long) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (long === undefined)
                    long = 0;
                if (long > $Reader.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.sd3.Feeder.Capacitor();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.id = reader.uint32();
                            break;
                        }
                    case 2: {
                            message.bus = $root.sd3.BusConnection.decode(reader, reader.uint32(), undefined, long + 1);
                            break;
                        }
                    default:
                        reader.skipType(tag & 7, long);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Capacitor message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof sd3.Feeder.Capacitor
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {sd3.Feeder.Capacitor} Capacitor
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Capacitor.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Capacitor message.
             * @function verify
             * @memberof sd3.Feeder.Capacitor
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Capacitor.verify = function verify(message, long) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    return "maximum nesting depth exceeded";
                if (message.id != null && message.hasOwnProperty("id"))
                    if (!$util.isInteger(message.id))
                        return "id: integer expected";
                if (message.bus != null && message.hasOwnProperty("bus")) {
                    let error = $root.sd3.BusConnection.verify(message.bus, long + 1);
                    if (error)
                        return "bus." + error;
                }
                return null;
            };

            /**
             * Creates a Capacitor message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof sd3.Feeder.Capacitor
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {sd3.Feeder.Capacitor} Capacitor
             */
            Capacitor.fromObject = function fromObject(object, long) {
                if (object instanceof $root.sd3.Feeder.Capacitor)
                    return object;
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let message = new $root.sd3.Feeder.Capacitor();
                if (object.id != null)
                    message.id = object.id >>> 0;
                if (object.bus != null) {
                    if (typeof object.bus !== "object")
                        throw TypeError(".sd3.Feeder.Capacitor.bus: object expected");
                    message.bus = $root.sd3.BusConnection.fromObject(object.bus, long + 1);
                }
                return message;
            };

            /**
             * Creates a plain object from a Capacitor message. Also converts values to other types if specified.
             * @function toObject
             * @memberof sd3.Feeder.Capacitor
             * @static
             * @param {sd3.Feeder.Capacitor} message Capacitor
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Capacitor.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.id = 0;
                    object.bus = null;
                }
                if (message.id != null && message.hasOwnProperty("id"))
                    object.id = message.id;
                if (message.bus != null && message.hasOwnProperty("bus"))
                    object.bus = $root.sd3.BusConnection.toObject(message.bus, options);
                return object;
            };

            /**
             * Converts this Capacitor to JSON.
             * @function toJSON
             * @memberof sd3.Feeder.Capacitor
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Capacitor.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for Capacitor
             * @function getTypeUrl
             * @memberof sd3.Feeder.Capacitor
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            Capacitor.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/sd3.Feeder.Capacitor";
            };

            return Capacitor;
        })();

        Feeder.Regulator = (function() {

            /**
             * Properties of a Regulator.
             * @memberof sd3.Feeder
             * @interface IRegulator
             * @property {number|null} [id] Regulator id
             * @property {number|null} [transformerId] Regulator transformerId
             * @property {boolean|null} [phaseA] Regulator phaseA
             * @property {boolean|null} [phaseB] Regulator phaseB
             * @property {boolean|null} [phaseC] Regulator phaseC
             */

            /**
             * Constructs a new Regulator.
             * @memberof sd3.Feeder
             * @classdesc Represents a Regulator.
             * @implements IRegulator
             * @constructor
             * @param {sd3.Feeder.IRegulator=} [properties] Properties to set
             */
            function Regulator(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Regulator id.
             * @member {number} id
             * @memberof sd3.Feeder.Regulator
             * @instance
             */
            Regulator.prototype.id = 0;

            /**
             * Regulator transformerId.
             * @member {number} transformerId
             * @memberof sd3.Feeder.Regulator
             * @instance
             */
            Regulator.prototype.transformerId = 0;

            /**
             * Regulator phaseA.
             * @member {boolean} phaseA
             * @memberof sd3.Feeder.Regulator
             * @instance
             */
            Regulator.prototype.phaseA = false;

            /**
             * Regulator phaseB.
             * @member {boolean} phaseB
             * @memberof sd3.Feeder.Regulator
             * @instance
             */
            Regulator.prototype.phaseB = false;

            /**
             * Regulator phaseC.
             * @member {boolean} phaseC
             * @memberof sd3.Feeder.Regulator
             * @instance
             */
            Regulator.prototype.phaseC = false;

            /**
             * Decodes a Regulator message from the specified reader or buffer.
             * @function decode
             * @memberof sd3.Feeder.Regulator
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {sd3.Feeder.Regulator} Regulator
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Regulator.decode = function decode(reader, length, error, long) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (long === undefined)
                    long = 0;
                if (long > $Reader.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.sd3.Feeder.Regulator();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.id = reader.uint32();
                            break;
                        }
                    case 2: {
                            message.transformerId = reader.uint32();
                            break;
                        }
                    case 3: {
                            message.phaseA = reader.bool();
                            break;
                        }
                    case 4: {
                            message.phaseB = reader.bool();
                            break;
                        }
                    case 5: {
                            message.phaseC = reader.bool();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7, long);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Regulator message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof sd3.Feeder.Regulator
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {sd3.Feeder.Regulator} Regulator
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Regulator.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Regulator message.
             * @function verify
             * @memberof sd3.Feeder.Regulator
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Regulator.verify = function verify(message, long) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    return "maximum nesting depth exceeded";
                if (message.id != null && message.hasOwnProperty("id"))
                    if (!$util.isInteger(message.id))
                        return "id: integer expected";
                if (message.transformerId != null && message.hasOwnProperty("transformerId"))
                    if (!$util.isInteger(message.transformerId))
                        return "transformerId: integer expected";
                if (message.phaseA != null && message.hasOwnProperty("phaseA"))
                    if (typeof message.phaseA !== "boolean")
                        return "phaseA: boolean expected";
                if (message.phaseB != null && message.hasOwnProperty("phaseB"))
                    if (typeof message.phaseB !== "boolean")
                        return "phaseB: boolean expected";
                if (message.phaseC != null && message.hasOwnProperty("phaseC"))
                    if (typeof message.phaseC !== "boolean")
                        return "phaseC: boolean expected";
                return null;
            };

            /**
             * Creates a Regulator message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof sd3.Feeder.Regulator
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {sd3.Feeder.Regulator} Regulator
             */
            Regulator.fromObject = function fromObject(object, long) {
                if (object instanceof $root.sd3.Feeder.Regulator)
                    return object;
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let message = new $root.sd3.Feeder.Regulator();
                if (object.id != null)
                    message.id = object.id >>> 0;
                if (object.transformerId != null)
                    message.transformerId = object.transformerId >>> 0;
                if (object.phaseA != null)
                    message.phaseA = Boolean(object.phaseA);
                if (object.phaseB != null)
                    message.phaseB = Boolean(object.phaseB);
                if (object.phaseC != null)
                    message.phaseC = Boolean(object.phaseC);
                return message;
            };

            /**
             * Creates a plain object from a Regulator message. Also converts values to other types if specified.
             * @function toObject
             * @memberof sd3.Feeder.Regulator
             * @static
             * @param {sd3.Feeder.Regulator} message Regulator
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Regulator.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.id = 0;
                    object.transformerId = 0;
                    object.phaseA = false;
                    object.phaseB = false;
                    object.phaseC = false;
                }
                if (message.id != null && message.hasOwnProperty("id"))
                    object.id = message.id;
                if (message.transformerId != null && message.hasOwnProperty("transformerId"))
                    object.transformerId = message.transformerId;
                if (message.phaseA != null && message.hasOwnProperty("phaseA"))
                    object.phaseA = message.phaseA;
                if (message.phaseB != null && message.hasOwnProperty("phaseB"))
                    object.phaseB = message.phaseB;
                if (message.phaseC != null && message.hasOwnProperty("phaseC"))
                    object.phaseC = message.phaseC;
                return object;
            };

            /**
             * Converts this Regulator to JSON.
             * @function toJSON
             * @memberof sd3.Feeder.Regulator
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Regulator.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for Regulator
             * @function getTypeUrl
             * @memberof sd3.Feeder.Regulator
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            Regulator.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/sd3.Feeder.Regulator";
            };

            return Regulator;
        })();

        Feeder.Transformer = (function() {

            /**
             * Properties of a Transformer.
             * @memberof sd3.Feeder
             * @interface ITransformer
             * @property {number|null} [id] Transformer id
             * @property {Array.<sd3.IBusConnection>|null} [busConnections] Transformer busConnections
             */

            /**
             * Constructs a new Transformer.
             * @memberof sd3.Feeder
             * @classdesc Represents a Transformer.
             * @implements ITransformer
             * @constructor
             * @param {sd3.Feeder.ITransformer=} [properties] Properties to set
             */
            function Transformer(properties) {
                this.busConnections = [];
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Transformer id.
             * @member {number} id
             * @memberof sd3.Feeder.Transformer
             * @instance
             */
            Transformer.prototype.id = 0;

            /**
             * Transformer busConnections.
             * @member {Array.<sd3.IBusConnection>} busConnections
             * @memberof sd3.Feeder.Transformer
             * @instance
             */
            Transformer.prototype.busConnections = $util.emptyArray;

            /**
             * Decodes a Transformer message from the specified reader or buffer.
             * @function decode
             * @memberof sd3.Feeder.Transformer
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {sd3.Feeder.Transformer} Transformer
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Transformer.decode = function decode(reader, length, error, long) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (long === undefined)
                    long = 0;
                if (long > $Reader.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.sd3.Feeder.Transformer();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.id = reader.uint32();
                            break;
                        }
                    case 2: {
                            if (!(message.busConnections && message.busConnections.length))
                                message.busConnections = [];
                            message.busConnections.push($root.sd3.BusConnection.decode(reader, reader.uint32(), undefined, long + 1));
                            break;
                        }
                    default:
                        reader.skipType(tag & 7, long);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Transformer message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof sd3.Feeder.Transformer
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {sd3.Feeder.Transformer} Transformer
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Transformer.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Transformer message.
             * @function verify
             * @memberof sd3.Feeder.Transformer
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Transformer.verify = function verify(message, long) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    return "maximum nesting depth exceeded";
                if (message.id != null && message.hasOwnProperty("id"))
                    if (!$util.isInteger(message.id))
                        return "id: integer expected";
                if (message.busConnections != null && message.hasOwnProperty("busConnections")) {
                    if (!Array.isArray(message.busConnections))
                        return "busConnections: array expected";
                    for (let i = 0; i < message.busConnections.length; ++i) {
                        let error = $root.sd3.BusConnection.verify(message.busConnections[i], long + 1);
                        if (error)
                            return "busConnections." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a Transformer message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof sd3.Feeder.Transformer
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {sd3.Feeder.Transformer} Transformer
             */
            Transformer.fromObject = function fromObject(object, long) {
                if (object instanceof $root.sd3.Feeder.Transformer)
                    return object;
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let message = new $root.sd3.Feeder.Transformer();
                if (object.id != null)
                    message.id = object.id >>> 0;
                if (object.busConnections) {
                    if (!Array.isArray(object.busConnections))
                        throw TypeError(".sd3.Feeder.Transformer.busConnections: array expected");
                    message.busConnections = [];
                    for (let i = 0; i < object.busConnections.length; ++i) {
                        if (typeof object.busConnections[i] !== "object")
                            throw TypeError(".sd3.Feeder.Transformer.busConnections: object expected");
                        message.busConnections[i] = $root.sd3.BusConnection.fromObject(object.busConnections[i], long + 1);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from a Transformer message. Also converts values to other types if specified.
             * @function toObject
             * @memberof sd3.Feeder.Transformer
             * @static
             * @param {sd3.Feeder.Transformer} message Transformer
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Transformer.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.arrays || options.defaults)
                    object.busConnections = [];
                if (options.defaults)
                    object.id = 0;
                if (message.id != null && message.hasOwnProperty("id"))
                    object.id = message.id;
                if (message.busConnections && message.busConnections.length) {
                    object.busConnections = [];
                    for (let j = 0; j < message.busConnections.length; ++j)
                        object.busConnections[j] = $root.sd3.BusConnection.toObject(message.busConnections[j], options);
                }
                return object;
            };

            /**
             * Converts this Transformer to JSON.
             * @function toJSON
             * @memberof sd3.Feeder.Transformer
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Transformer.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for Transformer
             * @function getTypeUrl
             * @memberof sd3.Feeder.Transformer
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            Transformer.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/sd3.Feeder.Transformer";
            };

            return Transformer;
        })();

        return Feeder;
    })();

    return sd3;
})();

export { $root as default };
