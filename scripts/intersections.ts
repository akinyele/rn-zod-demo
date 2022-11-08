import z from "zod";

/**
 * Zod Union Create a way for use validate with a logical `OR`
 */
const zodUserSchema = z.object({
    user: z.object ({
        email: z.string(),
        name: z.string(),
        age: z.number(),
        gender: z.string()
    }),
});


const errorHandlingSchema = z.object( {
    success: z.boolean(),
    error: z.object({ message: z.string()}).optional()
});


const userResponseSchema = z.intersection(errorHandlingSchema, zodUserSchema);

const responseObject = {
    user: {
        email: 'john@email.com',
        name: 'John Doe',
        age: 20,
        gender: 'M',
    },
    // user: null,
    success: true,
    error: undefined
}

const parsedResponse = userResponseSchema.parse(responseObject) // Fine
console.log('validatedPerson: ', parsedResponse);
