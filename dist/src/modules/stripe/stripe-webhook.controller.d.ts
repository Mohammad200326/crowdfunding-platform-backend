import type { Request } from 'express';
import { StripeService } from './stripe.service';
import { DatabaseService } from '../database/database.service';
type StripeRawBodyRequest = Request & {
    rawBody: Buffer;
};
export declare class StripeWebhookController {
    private readonly stripeService;
    private readonly databaseService;
    constructor(stripeService: StripeService, databaseService: DatabaseService);
    handleStripeWebhook(req: StripeRawBodyRequest, signature: string): Promise<{
        received: boolean;
        duplicate: boolean;
    } | {
        received: boolean;
        duplicate?: undefined;
    }>;
}
export {};
