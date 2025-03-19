# MCP-Server

This is an MCP-Server that uses the e-redes API to get the energy consumption and energy production in Portugal.

## Description

This server fetches data from the e-redes API to provide information on energy consumption and production in Portugal.

## Prerequisites

- Node.js
- npm

## Installation

Install the dependencies:

```bash
npm install
```

## Usage

To start the server, run:

```bash
npm run start
```

## Express.js Server

This project includes an Express.js server. To run the server, follow these steps:

1. Build the project:

   ```sh
   npm run build
   ```

2. Start the server:
   ```sh
   node build/server.js
   ```

### Making POST Requests

You can make POST requests to the server using Postman or any other HTTP client.

Example request:

- URL: `http://localhost:4000/get_energy_consumption`
- Body:
  ```json
  {
    "day": "06"
  }
  ```

This request will retrieve the energy consumption data for the specified day.
