import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  public readonly stripe: Stripe;

  constructor() {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) throw new Error('STRIPE_SECRET_KEY is missing');

    this.stripe = new Stripe(key, {
      apiVersion: '2026-01-28.clover',
    });
  }

  /**
   * Create a Stripe Connect account for a campaign creator
   */
  async createConnectAccount(
    email: string,
    metadata?: Record<string, string>,
  ): Promise<Stripe.Account> {
    return this.stripe.accounts.create({
      type: 'express',
      email,
      metadata,
      capabilities: {
        transfers: { requested: true },
      },
    });
  }

  /**
   * Create an account link for onboarding
   */
  async createAccountLink(
    accountId: string,
    refreshUrl: string,
    returnUrl: string,
  ): Promise<Stripe.AccountLink> {
    return this.stripe.accountLinks.create({
      account: accountId,
      refresh_url: refreshUrl,
      return_url: returnUrl,
      type: 'account_onboarding',
    });
  }

  /**
   * Get Connect account details
   */
  async getConnectAccount(accountId: string): Promise<Stripe.Account> {
    return this.stripe.accounts.retrieve(accountId);
  }

  /**
   * Check if Connect account is ready to receive transfers
   */
  async isAccountReadyForTransfers(accountId: string): Promise<boolean> {
    const account = await this.stripe.accounts.retrieve(accountId);
    return (
      account.charges_enabled === true &&
      account.payouts_enabled === true &&
      account.details_submitted === true
    );
  }

  async createTransfer(
    amountInMinor: number,
    currency: string,
    destinationAccountId: string,
    metadata?: Record<string, string>,
  ): Promise<Stripe.Transfer> {
    return this.stripe.transfers.create({
      amount: amountInMinor,
      currency,
      destination: destinationAccountId,
      metadata,
    });
  }

  /**
   * List external bank accounts for a Connect account
   */
  async listExternalBankAccounts(
    accountId: string,
  ): Promise<Stripe.BankAccount[]> {
    const externalAccounts = await this.stripe.accounts.listExternalAccounts(
      accountId,
      { object: 'bank_account', limit: 10 },
    );
    return externalAccounts.data as Stripe.BankAccount[];
  }

  /**
   * Get transfer details
   */
  async getTransfer(transferId: string): Promise<Stripe.Transfer> {
    return this.stripe.transfers.retrieve(transferId);
  }

  /**
   * Get platform balance
   */
  async getPlatformBalance(): Promise<Stripe.Balance> {
    return this.stripe.balance.retrieve();
  }
}
