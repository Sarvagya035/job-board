import { Request, Response } from "express"
import { Company } from "./model/Company.model"
import { Listing } from "../listings/model/Listing"

export class CompanyController {
    constructor() {}

    // GET /api/v1/companies
    async index(req: Request, res: Response) {
        try {
            const companies = await Company.find({ is_active: true })
            res.status(200).json({ data: companies })
        } catch (error: any) {
            res.status(500).json({
                message: "Error fetching companies",
                error: error.message
            })
        }
    }

    // POST /api/v1/companies
    async store(req: Request, res: Response) {
        try {
            const company = await Company.create(req.body)
            res.status(201).json({
                message: "Company created successfully",
                data: company
            })
        } catch (error: any) {
            res.status(400).json({
                message: "Error creating company",
                error: error.message
            })
        }
    }

    // PUT /api/v1/companies/:id
    async update(req: Request, res: Response) {
        try {
            const { id } = req.params
            const updateData = req.body

            const company = await Company.findById(id)

            if (!company) {
                return res.status(404).json({
                    message: "Company not found"
                })
            }

            Object.assign(company, updateData)
            await company.save()

            res.status(200).json({
                message: "Company updated successfully",
                data: company
            })
        } catch (error: any) {
            res.status(400).json({
                message: "Error updating company",
                error: error.message
            })
        }
    }

    // DELETE /api/v1/companies/:id  (soft delete)
    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params

            const company = await Company.findById(id)

            if (!company) {
                return res.status(404).json({
                    message: "Company not found"
                })
            }

            company.is_active = false
            await company.save()

            res.status(200).json({
                message: "Company deleted successfully"
            })
        } catch (error: any) {
            res.status(400).json({
                message: "Error deleting company",
                error: error.message
            })
        }
    }

    async listings(req: Request, res: Response) {
        try {
            const { id } = req.params

            const listings = await Listing.find({
                company: id,
                is_active: true
            })

            res.status(200).json({ data: listings })
        } catch (error: any) {
            res.status(500).json({
                message: "Error fetching company listings",
                error: error.message
            })
        }
    }

}
