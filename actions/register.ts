"use server";

import { RegisterSchema } from "@/schemas";
import * as z from "zod";
import bcryptjs from 'bcryptjs';
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificaionEmail } from "@/lib/mail";

export const register = async (values : z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values);

    if(!validatedFields.success){
        return { error : "Invalid fields!"};
    }

    const {email, password, name} = validatedFields.data;
    const hashedPassword = await bcryptjs.hash(password, 10);

    const existingUser = await getUserByEmail(email);

    if(existingUser){
        return { error : "Email already taken"}
    }

    await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        }
    });

    const verificationToken = await generateVerificationToken(email);

    await sendVerificaionEmail(verificationToken.email, verificationToken.token);

    return { success : "Confirmation email sent!"};
    
}