import { RouterEngine } from './router';
import { Application, Router } from 'express'
import { usersRouter } from '../users/user.router';
import { listingsRouter } from '../listings/listing.router';
import { companyRouter } from '../company/company.router';

export class RouteService {

    private app: Application
    private router: RouterEngine

    constructor(app: Application) {
        this.app = app
        this.router = new RouterEngine()
        this.bindRouters()
    }

    bindRouters(): void {
        // this.router.registerRouter('/api/v1/users')
        this.router.registerRouter("/api/v1/users", usersRouter)
        this.router.registerRouter("/api/v1/listings", listingsRouter)
        this.router.registerRouter("/api/v1/companies", companyRouter)
    }

    run(): void {
        this.router.getRouters().forEach((router: Router, route: string) => {
            this.app.use(route, router)
        })
    }
}