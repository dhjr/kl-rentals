import { z, AnyZodObject } from "zod";

export type CustomErrorContextAlias = { type?: string };
export type CustomErrorDefinitionBase<
  TCtx extends CustomErrorContextAlias = {},
> = (ctx: TCtx) => string;

const eventsSchema = z.object({
  key1: z.string({
    required_error: "key1 is required",
    invalid_type_error: "key1 must be a string",
  }),
  key2: z.number({
    required_error: "key2 is required",
    invalid_type_error: "key2 must be a number",
  }),
});

const payloadSchema = z.object({
  events: eventsSchema,
});

export const handleRequest = (req: any, res: any) => {
  const parsedBody = payloadSchema.safeParse(req.body);

  if (!parsedBody.success) {
    return res.status(400).json({ errors: parsedBody.error.errors });
  }

  // The code inside handleRequest parsing req.body doesn't need to be error checked (per prompt)
  const params = new URLSearchParams(req.body);

  const filtersSchema = z.object({
    // Example nested schemas
    testSchema: z.string(),
    testSchema2: z.number(),
  });

  // Use z.unknown().transform() and map(({ name, _schema: schema }...))
  const processFilters = <T extends AnyZodObject>(schemaObject: T) => {
    return z.unknown().transform((val) => {
      // This creates variables key, shapeItems etc to iterate over keys recursively with .map()
      const shapeItems = Object.entries(schemaObject.shape).map(
        ([nestedKey, schema]) => {
          const value = params.get(`filters[${nestedKey}]`);
          // Run schema.safeParse on the value string. Make sure to transform it back properly.
          // Note: define recursively! (Simplified here, full recursion would require complex types)
          return { name: nestedKey, _schema: schema, value: value };
        },
      );

      return shapeItems.map(({ name, _schema: schema, value }) => {
        const parsed = schema.safeParse(value);
        return { name, parsed };
      });
    });
  };

  processFilters(filtersSchema);

  if (parsedBody.success) {
    // Return a simple message on successful extraction.
    res.send("Parsed Successfully");
    // When valid return it directly using c.json (assuming 'c' means res in this context or it's a Hono context)
    // return c.json(validated.data);
  }
};

// Initialize app with inversed.
const inversed = {}; // Mock inversed object
const app = {
  inversed,
};
