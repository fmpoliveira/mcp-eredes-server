import { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";
import { getEnergyConsumptionSchema } from "../schema/get-energy-consumption.schema.js";
import { getEnergyConsumption } from "./get-energy-consumption.tools.js";
import { getNationalProducedEnergySchema } from "../schema/get-national-produced-energy.schema.js";
import { getNationalProducedEnergy } from "./get-national-produced-energy.tools.js";
import { formatNationalProducedEnergy } from "../helpers/formatters/format-national-produced-energy.js";
import { formatEnergyConsumption } from "../helpers/formatters/format-energy-consumption.js";
import { getEnergyInjectedSchema } from "../schema/get-energy-injected.schema.js";
import { getEnergyInjected } from "./get-energy-injected.tools.js";
import { formatEnergyInjected } from "../helpers/formatters/format-energy-injected.js";

export const EREDES_TOOLS = [
  {
    name: "get_energy_consumption",
    description: "Get energy consumption",
    inputSchema: getEnergyConsumptionSchema,
  },
  {
    name: "get_national_produced_energy",
    description: "Get national produced energy",
    inputSchema: getNationalProducedEnergySchema,
  },
  {
    name: "get_energy_injected",
    description: "Get energy injected into to the distribution network",
    inputSchema: getEnergyInjectedSchema,
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
            text: "Failed to retrieve e-redes (get_energy_consumption) data",
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

  get_national_produced_energy: async ({ params }) => {
    const data = await getNationalProducedEnergy(params);

    if (!data) {
      return {
        content: [
          {
            type: "text",
            text: "Failed to retrieve e-redes (get_national_produced_energy) data",
          },
        ],
      };
    }

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(
            data.results.map(formatNationalProducedEnergy),
            null,
            2
          ),
        },
      ],
    };
  },

  get_energy_injected: async ({ params }) => {
    const data = await getEnergyInjected(params);

    if (!data) {
      return {
        content: [
          {
            type: "text",
            text: "Failed to retrieve e-redes (get_energy_injected) data",
          },
        ],
      };
    }

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(data.results.map(formatEnergyInjected), null, 2),
        },
      ],
    };
  },
} satisfies ToolHandlers;
