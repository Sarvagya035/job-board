import express, { Application } from 'express'
import { RouteService } from './router/routeService'
import "../infrastructure/connections/mongoose"

export class App {

    private app:Application
    private port:number

    constructor(port:number) {
        this.app = express()
        this.port = port
        this.app.use(express.json())
        const routeService = new RouteService(this.app)
        routeService.run()
    }


    /*
        Start the application
    */
    start():void {
        this.app.listen(this.port,() => {
            console.log(`App is running on port ${this.port}`)
        })
    }
}