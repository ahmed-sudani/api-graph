export = apiGraph;
/**
 *
 * @param {{extract : string}} config
 * @returns {(req: any, res: any, next: any) => any}
 */
declare function apiGraph(config?: {
    extract: string;
}): (req: any, res: any, next: any) => any;
declare namespace apiGraph {
    export { extractData, graphToJson };
}
/**
 *
 * @param {Object} jsonObj
 * @param {string | Object} requiredData
 * @returns {Object}
 */
declare function extractData(jsonObj: any, requiredData: string | any): any;
/**
 *
 * @param {string} graph
 * @returns {Object}
 */
declare function graphToJson(graph: string): any;
