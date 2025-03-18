import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

import { EREDES_HANDLERS, EREDES_TOOLS, ToolHandler } from "./tools/tools.js";

// https://e-redes.opendatasoft.com/api/explore/v2.1/catalog/datasets
// consumo-total-nacional/records?limit=20
// energia-produzida-total-nacional/records?limit=20

// Create server instance
const server = new McpServer({
  name: "e-redes",
  version: "1.0.0",
});

EREDES_TOOLS.forEach((tool) => {
  const handler = EREDES_HANDLERS[tool.name];
  if (!handler) {
    throw new Error(`Handler for tool ${tool.name} not found`);
  }

  server.tool(
    tool.name,
    tool.description,
    { params: tool.inputSchema },
    handler as ToolHandler<typeof tool.name>
  );
});

try {
  const transport = new StdioServerTransport();
  await server.connect(transport);
} catch (error) {
  console.error("Error connecting server:", error);
  process.exit(1);
}
