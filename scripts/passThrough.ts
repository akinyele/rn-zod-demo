import z from "zod";

/**
 * Strip, PassThrough & Strict
 * By default zod will strip out unrecognized keys when parsing.
 */
const zodUserSchema = z.object({
    email: z.string(),
    name: z.string(),
    age: z.number(),
    gender: z.string()
});

const JohnDoe = {
    email: 'john@email.com',
    name: 'John Doe',
    age: 20,
    gender: 'M',
    Job: 'Teacher',
}

const parsedJohn = zodUserSchema.parse(JohnDoe); // Fine

console.log('parsedJohn', parsedJohn);  // { email: 'john@email.com', name: 'John Doe', age: 20, gender: 'M' }

const parseJohnWPassThrough = zodUserSchema.passthrough().parse(JohnDoe) // Fine

console.log('parseJohnWPassThrough', parseJohnWPassThrough); // { email: 'john@email.com', name: 'John Doe', age: 20, gender: 'M', Job: 'Teacher' }

zodUserSchema.strict().parse(JohnDoe) // Throws Error

