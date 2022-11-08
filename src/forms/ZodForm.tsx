import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    Dimensions,
    Alert
} from "react-native";
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {Picker} from "@react-native-picker/picker";
import { toFormikValidationSchema } from 'zod-formik-adapter';
import ErrorMessage from "../components/ErrorMessage";
import { Formik, Field } from "formik";
import z from "zod";
import {useCallback, useState} from "react";

enum FormStateEnum {
    LOGIN,
    SIGNUP
}


const userValidationSchema = z.object({
    email: z.string({ required_error: 'Please enter a registered email'} )
        .email({ message: "Invalid email address" }),
    password: z.string()
        .min(6,  "Password must have at least 6 characters "),
})

const takenUserNames = ['SuperMan', 'Batman', 'Flash']
const userTypes =  ['Villain, Hero, Civilian'] as const;
const UserTypeEnums = z.enum(userTypes);

/**
 *  Creating new user schema for sign up.
 */
const newUserValidation = userValidationSchema.extend({
    username: z.string().trim().refine(async (value) => {
        /*
         * Check to see if username is taken.
         */
        return !takenUserNames.some(elements => value.toLowerCase() === elements.toLowerCase())
    }, "Username already taken"),
    passwordConfirmation: z.string().min(6, "Password mus have at least 6 characters"),
    // type: UserTypeEnums
}) .refine(({ password, passwordConfirmation }) => password === passwordConfirmation, {
    message: "Passwords must match",
    path: ["passwordConfirmation"]
});

const newOrOld = z.union([userValidationSchema, newUserValidation])

type User = z.infer<typeof userValidationSchema>
type NewUser = z.infer<typeof newUserValidation>


type NewOrOldUser = z.infer<typeof newOrOld>;

export default function ZodForm() {

    const {
        handleSubmit,
        trigger,
        control,
        formState: { errors },
    } = useForm({
        mode: 'onTouched',
        resolver: zodResolver(newUserValidation),
        defaultValues: {
            email: '',
            username: '',
            password: '',
            userType: userTypes[0],
            passwordConfirmation: '',
        }
    });


    const {
        handleSubmit: loginSubmit,
        control: loginController,
        formState: { errors: loginErrors },
    } = useForm({
        mode: 'onTouched',
        resolver: zodResolver(userValidationSchema),
        defaultValues: {
            email: '',
            password: '',
        }
    });

    const [formState, setFormSate] = useState<FormStateEnum>(FormStateEnum.LOGIN)
    const onLoginHandler = useCallback((values: User) => {
        const { email, password } = values;

        Alert.alert(`Credentials entered. email: ${email}, password: ${password}`);
    }, []);
    const onSignUpHandler = useCallback((values: NewUser) => {
        const { email, password } = values;
        // input user:
    }, []);
    const handleFormSwap = useCallback((formState: FormStateEnum) => {
        setFormSate(formState);
    } , [])

    return (
        <View style={styles.container}>


            {
                formState === FormStateEnum.LOGIN ?
                    <>
                        <Controller
                            name={'email'}
                            control={loginController}
                            render={({field: { onChange, onBlur, value }}) => <TextInput
                                style={styles.input}
                                numberOfLines={1}
                                value={value}
                                placeholder="Enter email"
                                onChangeText={value => onChange(value)}
                                autoCapitalize="none"
                                autoComplete="email"
                                keyboardType="email-address"
                                onBlur={onBlur}
                            />}
                        />
                        <ErrorMessage errorValue={loginErrors.email?.message} />

                        <Controller
                            name={'password'}
                            control={loginController}
                            rules={{ required: true }}
                            render={({field: { onChange, onBlur, value }}) => <TextInput
                                style={styles.input}
                                numberOfLines={1}
                                value={value}
                                placeholder="Enter Password"
                                onChangeText={value => onChange(value)}
                                autoCapitalize="none"
                                secureTextEntry={true}
                                onBlur={onBlur}
                            />}
                        />
                        <ErrorMessage errorValue={loginErrors.password?.message} />

                    </>
                    :
                    <>
                        <Controller
                            name={'email'}
                            control={control}
                            rules={{ required: true }}
                            render={({field: { onChange, onBlur, value }}) => <TextInput
                                    style={styles.input}
                                    numberOfLines={1}
                                    value={value}
                                    placeholder="Enter email"
                                    onChangeText={value => onChange(value)}
                                    autoCapitalize="none"
                                    autoComplete="email"
                                    keyboardType="email-address"
                                    onBlur={onBlur}
                                />}
                        />
                        <ErrorMessage errorValue={errors.email?.message} />

                        <Controller
                            name={'username'}
                            control={control}
                            render={({field: { onChange, onBlur, value }}) => <TextInput
                                style={styles.input}
                                numberOfLines={1}
                                value={value}
                                placeholder="Enter Unique username"
                                onChangeText={value => onChange(value)}
                                autoCapitalize="none"
                                onBlur={onBlur}
                            />}
                        />
                        <ErrorMessage errorValue={errors.username?.message} />

                        {/*<Controller*/}
                        {/*    name={'userType'}*/}
                        {/*    control={control}*/}
                        {/*    render={({field: { onChange, onBlur, value }}) => <Picker*/}
                        {/*        selectedValue={1}*/}
                        {/*        onBlur={onBlur}*/}
                        {/*        onValueChange={(itemValue, itemIndex) =>*/}
                        {/*            onChange(itemValue)*/}
                        {/*        }>*/}
                        {/*        <Picker.Item label='Villain' value="Villain" />*/}
                        {/*        <Picker.Item label="Hero" value="Hero" />*/}
                        {/*        <Picker.Item label="Civilian" value="Civilian" />*/}
                        {/*    </Picker>}*/}
                        {/*/>*/}

                        <Controller
                            name={'password'}
                            control={control}
                            rules={{ required: true }}
                            render={({field: { onChange, onBlur, value }}) => <TextInput
                                style={styles.input}
                                numberOfLines={1}
                                value={value}
                                placeholder="Enter Password"
                                onChangeText={value => onChange(value)}
                                autoCapitalize="none"
                                secureTextEntry={true}
                                onBlur={onBlur}
                            />}
                        />
                        <ErrorMessage errorValue={errors.password?.message} />

                        <Controller
                            name={'passwordConfirmation'}
                            control={control}
                            rules={{ required: true }}
                            render={({field: { onChange, onBlur, value }}) => <TextInput
                                style={styles.input}
                                numberOfLines={1}
                                value={value}
                                placeholder="Enter Password Again"
                                onChangeText={value => onChange(value)}
                                autoCapitalize="none"
                                secureTextEntry={true}
                                onBlur={() => {
                                    onBlur()
                                    trigger('passwordConfirmation').then(result => console.log(result))
                                }}
                            />}
                        />
                        <ErrorMessage errorValue={errors.passwordConfirmation?.message} />
                            <TouchableOpacity
                                onPress={() => handleSubmit(onSignUpHandler)}
                                style={styles.buttonContainer}
                            >
                                <Text style={styles.buttonText}>Sign Up.</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => handleFormSwap(FormStateEnum.LOGIN)}
                            >
                                <Text style={styles.link}>Not a member.</Text>
                            </TouchableOpacity>
                    </>
            }
        </View>
);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        marginTop: 40,
    },
    input: {
        marginVertical: 10,
        width: Dimensions.get("window").width - 100,

        height: 40,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
    },
    buttonContainer: {
        marginVertical: 10,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        width: Dimensions.get("window").width - 200,
        height: 44,
        borderRadius: 5,
        backgroundColor: "#343434",
    },
    buttonText: {
        fontSize: 18,
        color: "#ffffff",
    },
    link: {
        fontSize: 18,
    },
});
