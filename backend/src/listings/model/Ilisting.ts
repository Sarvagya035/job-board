import { Document, Types } from "mongoose"

export interface IListing extends Document {
    title: string
    location: string
    salary: string
    apply_link: string
    description: string
    is_active: boolean
    company?: Types.ObjectId
    created_at?: Date
}