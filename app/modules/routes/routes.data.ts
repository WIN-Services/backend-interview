import { Route, Routes } from './routes.types';
import { OrderRouter } from '../order/order.routes';

export const routes: Routes = [new Route('/orders', OrderRouter)];
