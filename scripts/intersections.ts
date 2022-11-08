import z from "zod";

/**
 * Zod Union Create a way for use validate with a logical `OR`
 */
const zodUserSchema = z.object({
    email: z.string(),
    name: z.string(),
    age: z.number(),
    gender: z.string()
});

const zodPlaceSchema = z.object({
    address: z.string(),
    address2: z.string().optional(),
    state: z.string(),
    zip: z.number()
})

const personOrPlace = z.union([zodPlaceSchema, zodUserSchema]);

const JohnDoe = {
    email: 'john@email.com',
    name: 'John Doe',
    age: 20,
    gender: 'M',
}

const RandomAddress = {
    address: '6041 South Goldenrod',
    address1: 'APT 3',
    state: 'FL',
    zip: 12313,
}

const randomAnimal = {
    type: 'DOG',
    color: 'black'
}

const validatedPerson = personOrPlace.parse(JohnDoe) // Fine
console.log('validatedPerson: ', validatedPerson);

const parsedPlaced = personOrPlace.parse(RandomAddress);
console.log('parsedPlaced: ', parsedPlaced);


const parsedAnimal = personOrPlace.parse(randomAnimal); // Throws error.


type UserPlace = z.infer<typeof personOrPlace>;
type user = z.infer<typeof zodUserSchema>;

// (validatedPerson as user).age
