# API-Graph

Extract specific fields from data returned by an API endpoint. It works in a similar way to GraphQL, where you can specify exactly what fields you want to receive in the response.

## Why

Use `graph queries` in your rest api `without the need for graphQl` and `without editing any parts of your logic in the endpoints code`, it just work but adding `one middleware` in your app.

## Installation

    npm install api-graph

## Usage

To use this package, you will need to import it and use it as middleware in your express application. Here is an example of how to use it:

```
import apiGraph from "api-graph";
import express from "express";

const user = {
  id: 1,
  name: "ahmed",
  age: 23,
  photos: [
    { id: 1, path: "img1" },
    { id: 2, path: "img2" },
  ],
};

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(apiGraph({ extract: "graph" }));
app.get("/", (req, res) => res.json(user));
app.listen(3000, () => console.log("server running at 3000"));
```

Then you pass what fields you want to return in body fields when you request the endpoint

```
body : { graph : "{id, name}" }
```

and that's it only the name and id will be returned from the endpoint