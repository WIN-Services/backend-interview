import { Express, Request, Response } from 'express'
import * as winston from 'winston'
import { OfferRoutes } from './offer.routes';
import { ServiceRoutes } from './services.routes';

export function initRoutes(app: Express) {
  winston.log('info', '--> Initialisations des routes')
 
  app.get('/api', (req: Request, res: Response) => res.status(200).send({
    message: 'server is listening!'
  }))

  OfferRoutes(app)
  ServiceRoutes(app)
  app.all('*', (req: Request, res: Response) => res.status(404).send())
}