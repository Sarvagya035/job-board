import { config } from "dotenv"
config()

// connect DB
import "../infrastructure/connections/mongoose"

// import factory
import { createUsers } from "./factories/user.factory"

async function runSeed() {
    try {
        console.log("Starting database seeding...")

        const users = await createUsers(10)

        console.log(`${users.length} users created successfully`)
        process.exit(0)
    } catch (error) {
        console.error("Seeding failed:", error)
        process.exit(1)
    }
}

runSeed()
