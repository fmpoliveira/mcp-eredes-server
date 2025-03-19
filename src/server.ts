import { EREDES_HANDLERS } from "./tools/tools.js";
import express, { Request, Response } from "express";

const app = express();
app.use(express.json());

app.get("/:toolName", async (req: Request, res: Response): Promise<any> => {
  const { toolName } = req.params;

  const handler = EREDES_HANDLERS[toolName];

  if (!handler) {
    return res.status(404).json({
      error: `Tool ${toolName} not found`,
    });
  }

  try {
    const controller = new AbortController();
    // import express from "express";
    const response = await handler(
      { params: req.body },
      { signal: controller.signal }
    );

    res.json(response);
  } catch (error) {
    console.error(`Error processing ${toolName}: `, error);
    res.status(500).json({
      error: `Error processing ${toolName}: ${error}`,
    });
  }
});

const PORT = 4000;

app.listen(PORT, () =>
  console.log(`Server running on port http://localhost:${PORT}`)
);
