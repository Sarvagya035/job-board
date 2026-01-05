import faker from "faker"
import bcrypt from "bcrypt"
import { IUser } from "../users/model/IUser"
import { User as UserModel } from "../users/model/User"

faker.setLocale("en")

export async function createUsers(
    count: number = 1,
    params?: Partial<IUser>
): Promise<IUser[]> {

    const users: IUser[] = []

    for (let i = 0; i < count; i++) {

        const defaultParams = {
            first_name: faker.name.firstName(),
            last_name: faker.name.lastName(),
            email: faker.internet.email(),
            password: await bcrypt.hash("password123", 10),
            is_active: true
        }

        const userParams = { ...defaultParams, ...params }

        const newUser = new UserModel(userParams)
        await newUser.save()

        users.push(newUser)
    }

    return users
}
