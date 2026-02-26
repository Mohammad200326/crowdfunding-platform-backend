import Stripe from 'stripe';
export declare class StripeService {
    readonly stripe: Stripe;
    constructor();
    createConnectAccount(email: string, metadata?: Record<string, string>): Promise<Stripe.Account>;
    createAccountLink(accountId: string, refreshUrl: string, returnUrl: string): Promise<Stripe.AccountLink>;
    getConnectAccount(accountId: string): Promise<Stripe.Account>;
    isAccountReadyForTransfers(accountId: string): Promise<boolean>;
    createTransfer(amountInMinor: number, currency: string, destinationAccountId: string, metadata?: Record<string, string>): Promise<Stripe.Transfer>;
    listExternalBankAccounts(accountId: string): Promise<Stripe.BankAccount[]>;
    getTransfer(transferId: string): Promise<Stripe.Transfer>;
    getPlatformBalance(): Promise<Stripe.Balance>;
}
