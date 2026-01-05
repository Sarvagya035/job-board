import { Request, Response } from "express"
import { User } from "./model/User"
import bcrypt from "bcrypt"

export class UsersController {
    constructor() {}

    async index(req: Request, res: Response) {
        try {
            const users = await User.find()
            res.status(200).json({ data: users })
        } catch (error: any) {
            res.status(500).json({
                message: "Error fetching users",
                error: error.message
            })
        }
    }

    async store(req: Request, res: Response) {
        try {
            const { first_name, last_name, email, password } = req.body

            const hashedPassword = await bcrypt.hash(password, 10)

            const user = await User.create({
                first_name,
                last_name,
                email,
                password: hashedPassword
            })

            res.status(201).json({
                message: "User created successfully",
                data: user
            })
        } catch (error: any) {
            res.status(400).json({
                message: "Error creating user",
                error: error.message
            })
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params
            const { first_name, last_name, email, password } = req.body

            const user = await User.findById(id).select("+password")

            if (!user) {
                return res.status(404).json({
                    message: "User not found"
                })
            }

            if (first_name) user.first_name = first_name
            if (last_name) user.last_name = last_name
            if (email) user.email = email

            if (password) {
                user.password = await bcrypt.hash(password, 10)
            }

            await user.save()

            res.status(200).json({
                message: "User updated successfully",
                data: user
            })
        } catch (error: any) {
            res.status(400).json({
                message: "Error updating user",
                error: error.message
            })
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params

            const deletedUser = await User.findByIdAndDelete(id)

            if (!deletedUser) {
                return res.status(404).json({
                    message: "User not found"
                })
            }

            res.status(200).json({
                message: "User deleted successfully"
            })
        } catch (error: any) {
            res.status(400).json({
                message: "Error deleting user",
                error: error.message
            })
        }
    }
}
