/**
 *
 * @param {string} graph
 * @returns {Object}
 */
function graphToJson(graph) {
  return JSON.parse(
    graph
      .replace(/\s/g, "")
      .replace(/,}/g, "}")
      .replace(/\{/g, '{"')
      .replace(/:/g, '":')
      .split(",")
      .map((item) => {
        item = item.replace("}", '":""}');
        const firstChar = item.charAt(0);
        if (firstChar !== "{" && firstChar !== "[") item = `"${item}`;
        const lastChar = item.charAt(item.length - 1);
        if (lastChar !== "}" && lastChar !== "]") item = `${item}":""`;
        return item;
      })
      .join(",")
  );
}

/**
 *
 * @param {Object} jsonObj
 * @param {string | Object} requiredData
 * @returns {Object}
 */
function extractData(jsonObj, requiredData) {
  const result = {};
  for (const key in requiredData) {
    if (!Object.hasOwnProperty.call(jsonObj, key))
      throw Error(`property ${key} doesn't exits`);

    if (Array.isArray(jsonObj[key]) && requiredData[key])
      result[key] = jsonObj[key].map((item) =>
        extractData(item, requiredData[key][0])
      );
    else if (typeof jsonObj[key] === "object" && requiredData[key])
      result[key] = extractData(jsonObj[key], requiredData[key]);
    else result[key] = jsonObj[key];
  }
  return result;
}

/**
 *
 * @param {{extract : string}} config
 * @returns {(req: any, res: any, next: any) => any}
 */
function apiGraph(config = { extract: "graphQuery" }) {
  return function (req, res, next) {
    try {
      const requiredData = req.body[config.extract];
      if (requiredData) req.body[config.extract] = graphToJson(requiredData);
    } catch (error) {
      res.status(400);
      return res.json({
        status: "failed",
        felid: config.extract,
        error: error.message,
      });
    }

    const json = res.json;
    res.json = function (body) {
      const requiredData = req.body[config.extract];
      try {
        if (!requiredData) return json.call(this, body);
        return json.call(this, extractData(body, requiredData));
      } catch (error) {
        res.status(400);
        return json.call(this, {
          status: "failed",
          felid: config.extract,
          error: error.message,
        });
      }
    };
    next();
  };
}

module.exports = { extractData, graphToJson };
module.exports = apiGraph;
