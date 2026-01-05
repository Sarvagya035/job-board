import { Schema, model } from "mongoose"
import { ICompany } from "./ICompany.model"

const companySchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        logo: { type: String, required: true },
        description: { type: String, required: true },
        size: { type: Number, required: true },
        type: { type: String, required: true },
        founded: { type: Number, required: true },
        specialties: { type: [String], required: true },
        location: { type: String, required: true },
        is_active: { type: Boolean, default: true }
    },
    { timestamps: true }
)

const Company = model<ICompany>("Company", companySchema)
export { Company }
