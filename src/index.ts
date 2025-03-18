import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

import { EREDES_TOOLS } from "./tools/tools.js";
import { getEnergyConsumptionSchema } from "./schema/get-energy-consumption.schema.js";
import { getEnergyConsumptionUrl } from "./helpers/url.js";
import { EnergyConsumptionResponse } from "./interfaces/get-energy-consumption.interface.js";
import { request } from "./helpers/request.js";
import { formatEnergyConsumption } from "./helpers/format-energy-consumption.js";
import { z } from "zod";
import { emptyStringToNull } from "./helpers/empty-string-to-null.js";

// https://e-redes.opendatasoft.com/api/explore/v2.1/catalog/datasets
// consumo-total-nacional/records?limit=20
// energia-produzida-total-nacional/records?limit=20

// Create server instance
const server = new McpServer({
  name: "e-redes",
  version: "1.0.0",
});

server.tool(
  "get-energy-consumption",
  "Get energy consumption",
  {
    day: emptyStringToNull(
      z.string().length(2).optional().describe("Specify the day (optional)")
    ),
    month: emptyStringToNull(
      z.string().length(2).optional().describe("Specify the month (optional)")
    ),
    year: emptyStringToNull(
      z.string().length(4).optional().describe("Specify the year (optional)")
    ),
    time: emptyStringToNull(
      z.string().length(5).optional().describe("Specify the time (optional)")
    ),
    sortTotal: emptyStringToNull(
      z
        .string()
        .refine((val) => val === "DESC" || val === "ASC", {
          message: "Sort direction must be either 'DESC' or 'ASC'",
        })
        .optional()
        .describe("Specify the sort direction (DESC or ASC) (optional)")
    ),
  },
  async ({ day, month, year, time, sortTotal }) => {
    /**
     * Handles the "get-energy-consumption" tool request.
     *
     * @param {Object} params - The parameters for the request.
     * @param {string | null} params.day - The day to filter the energy consumption data (optional).
     * @param {string | null} params.month - The month to filter the energy consumption data (optional).
     * @param {string | null} params.year - The year to filter the energy consumption data (optional).
     * @param {string | null} params.time - The time to filter the energy consumption data (optional).
     * @param {string | null} params.sortTotal - The sort direction for the total energy consumption (optional, must be either 'DESC' or 'ASC').
     *
     * @returns {Promise<Object>} The response object containing the formatted energy consumption data or an error message.
     *
     * Constructs the search URL with the provided parameters, makes a request to retrieve the energy consumption data,
     * formats the data, and returns it. If the request fails, returns an error message.
     */

    const searchUrl = new URL(getEnergyConsumptionUrl);
    if (day) searchUrl.searchParams.append("refine", `dia:${day}`);
    if (month) searchUrl.searchParams.append("refine", `mes:${month}`);
    if (year) searchUrl.searchParams.append("refine", `datahora:${year}`);
    if (time) searchUrl.searchParams.append("refine", `time:${time}`);
    if (sortTotal)
      searchUrl.searchParams.append("order_by", `total ${sortTotal}`);

    const data = await request<EnergyConsumptionResponse>(searchUrl.toString());

    if (!data) {
      return {
        content: [
          {
            type: "text",
            text: "Failed to retrieve e-redes (get-enery-consumption) data",
          },
        ],
      };
    }

    const energyConsumptionResponse = JSON.stringify(
      data.results.map(formatEnergyConsumption),
      null,
      2
    );

    return {
      content: [
        {
          type: "text",
          text: energyConsumptionResponse,
        },
      ],
    };
  }
);

try {
  const transport = new StdioServerTransport();
  await server.connect(transport);
} catch (error) {
  console.error("Error connecting server:", error);
  process.exit(1);
}
