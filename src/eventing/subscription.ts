/**
 * @author Vighnesh Raut <rvighnes@amazon.com>
 */

import { Callback } from './types';

/**
 * Terminology picked up from "rxjs";
 */
class Subscription {
  /**
   * Create a subscription.
   * @param {string} subscriptionId - The id of this instance of subscription.
   * @param {Callback} unsubscriber - This callback will be used to unsubscribe from the Subscription.
   */
  constructor(
    public readonly subscriptionId: string,
    private unsubscriber: Callback,
  ) {}

  /**
   * Unsubscribe from a subscription.
   */
  unsubscribe = () => {
    this.unsubscriber();
  };
}

export default Subscription;
