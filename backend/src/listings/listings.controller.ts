import { Request, Response } from "express"
import { Listing } from "./model/Listing"

export class ListingsController {
    constructor() {}

    // GET /api/v1/listings
    async index(req: Request, res: Response) {
        try {
                const listings = await Listing.find({ is_active: true })
                    .populate("company")
                res.status(200).json({ data: listings })
                
            } catch (error: any) {
                res.status(500).json({
                message: "Error fetching listings",
                error: error.message
            })
        }
    }

    // POST /api/v1/listings
    async store(req: Request, res: Response) {
        try {
            const newListing = await Listing.create(req.body)

            res.status(201).json({
                message: "Listing created successfully",
                data: newListing
            })
        } catch (error: any) {
            res.status(400).json({
                message: "Error creating listing",
                error: error.message
            })
        }
    }

    // PUT /api/v1/listings/:id
    async update(req: Request, res: Response) {
        try {
            const { id } = req.params
            const updateData = req.body

            const listing = await Listing.findById(id)

            if (!listing) {
                return res.status(404).json({
                    message: "Listing not found"
                })
            }

            Object.assign(listing, updateData)
            await listing.save()

            res.status(200).json({
                message: "Listing updated successfully",
                data: listing
            })
        } catch (error: any) {
            res.status(400).json({
                message: "Error updating listing",
                error: error.message
            })
        }
    }

    // DELETE /api/v1/listings/:id
    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params

            const deletedListing = await Listing.findByIdAndDelete(id)

            if (!deletedListing) {
                return res.status(404).json({
                    message: "Listing not found"
                })
            }

            res.status(200).json({
                message: "Listing deleted successfully"
            })
        } catch (error: any) {
            res.status(400).json({
                message: "Error deleting listing",
                error: error.message
            })
        }
    }
}
