import { formatEnergyConsumption } from "../helpers/format-energy-consumption.js";
import { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";
import { getEnergyConsumptionSchema } from "../schema/get-energy-consumption.schema.js";
import { getEnergyConsumption } from "./get-energy-consumption.tools.js";

export const EREDES_TOOLS = [
  {
    name: "get_energy_consumption",
    description: "Get energy consumption",
    inputSchema: getEnergyConsumptionSchema,
  },
];

type EredesToolName = (typeof EREDES_TOOLS)[number]["name"];

export type ToolHandler<T extends EredesToolName> = ToolCallback<{
  params: Extract<(typeof EREDES_TOOLS)[number], { name: T }>["inputSchema"];
}>;

type ToolHandlers = {
  [K in EredesToolName]: ToolHandler<K>;
};

export const EREDES_HANDLERS: { [key: string]: ToolHandler<any> } = {
  get_energy_consumption: async ({ params }) => {
    const data = await getEnergyConsumption(params);
    if (!data) {
      return {
        content: [
          {
            type: "text",
            text: "Failed to retrieve e-redes (get-energy-consumption) data",
          },
        ],
      };
    }

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(
            data.results.map(formatEnergyConsumption),
            null,
            2
          ),
        },
      ],
    };
  },
} satisfies ToolHandlers;
