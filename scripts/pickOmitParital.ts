import z from "zod";

/**
 * Zod Object Schema follows typescript utility methods and provides use with
 * pick, omit and partial utility functions.
 */
const zodUserSchema = z.object({
    email: z.string(),
    name: z.string(),
    age: z.number(),
    gender: z.string()
});

const nameEmailSchema = zodUserSchema.pick({email: true, name: true})
const noAgeSchema = zodUserSchema.omit({age: true})
const partialUserSchema = zodUserSchema.partial()

const JohnDoe = {
    email: 'john@email.com',
    name: 'John Doe',
    age: 20,
    gender: 'M',
}

