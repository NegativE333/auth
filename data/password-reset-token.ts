import { db } from "@/lib/db"


export const getPasswordRestTokenByToken = async (token : string) => {
    try{
        const passwordToken = await db.passwordResetToken.findUnique({
            where: {token}
        })

        return passwordToken;
    }
    catch{
        return null;
    }
}

export const getPasswordRestTokenByEmail = async (email : string) => {
    try{
        const passwordToken = await db.passwordResetToken.findFirst({
            where: {email}
        })

        return passwordToken;
    }
    catch{
        return null;
    }
}