<img align="center" src="https://user-images.githubusercontent.com/47687479/229458291-e6fe4585-a62d-4a0b-8540-0efe7c288da7.png" width="100" height="100">

## API-Graph

Extract specific fields from data returned by an API endpoint. It works in a similar way to GraphQL, where you can specify exactly what fields you want to receive in the response.

## Why

Use `graph queries` in your rest api `without the need for graphQl` and `without editing any parts of your logic in the endpoints code`, it just work but adding `one middleware` in your app.

## Features

1. Overcome the network overload because you can prevent the API from returning the whole data and only ask for what you need from it
2. Saves you REST structure, GraphQL enforce you to change your whole way of writing code

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

## How it works
The imported middleware `apiGraph` which is the main function that must add to the app, it takes one parameter the `extract` which is the key that the server will look at when trying to get the query send from the client, and the `default` value for it is `graphQuery`. The server then gets the values from the key parse it and extract data from the object that was passed to res.json function, in case no query was sent from the client then the whole data will be returned.

## Errors
1. `property not found` in case you were trying to ask for fields in the data that are not exits.
2. `Parsing error` in case you send an invalid query.
