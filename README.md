# Blog Analytics

Blog Analytics with Express and Lodash

## Dependencies

To run this project, you'll need to install the following dependencies using npm:

```bash

npm install express axios lodash nodemon


# Blog Analytics and Search Tool

A blog analytics and search tool developed using Express.js and Lodash. This middleware is designed to analyze blog data from a third-party API and provide insightful statistics to clients. Additionally, it includes a blog search endpoint.

## Features

### Data Analysis

- A route at `/api/blog-stats` retrieves data from a third-party blog API using the provided api request and gives the anlysis of the data.

### Blog Search

- A route at `/api/blog-search/?query={query}` gives filtered blogs by filtering the blogs based on the provided query string like /api/blog-search/?query=privacy .

