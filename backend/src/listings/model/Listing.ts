import { Schema, model } from "mongoose"
import { IListing } from "./Ilisting"

const listingSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        location: { type: String, required: true },
        salary: { type: String, required: true },
        apply_link: { type: String, required: true },
        description: { type: String, required: true },
        is_active: { type: Boolean, default: true },
        company: { type: Schema.Types.ObjectId, ref: "Company", required: true}
    },
    { timestamps: true }
)

const Listing = model<IListing>("Listing", listingSchema)
export { Listing }
