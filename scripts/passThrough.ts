import z from "zod";

/**
 * By default zod required all parameter
 */
const zodUserSchema = z.object({
    email: z.string(),
    name: z.string(),
    age: z.number(),
    gender: z.string()
});


const optionalGender = zodUserSchema.extend({
    gender: z.string().optional()
})

const JohnDoe = {
    email: 'john@email.com',
    name: 'John Doe',
    age: 20,
    gender: 'M',
    Job: 'Teacher',
}

const BobSmith = {
    email: 'john@email.com',
    name: 'Bob Smith',
    age: 20,
    Job: 'Teacher',

}

zodUserSchema.parse(JohnDoe); // Fine
optionalGender.parse(BobSmith); // Fine
zodUserSchema.parse(BobSmith); // Throws Error.



