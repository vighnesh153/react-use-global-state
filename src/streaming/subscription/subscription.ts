/**
 * @author Vighnesh Raut <me@vighnesh153.com>
 */

import { Callback, SubscriptionType } from 'src/types';

/**
 * Creates a subscription.
 * @param {string} id - The id of this instance of subscription.
 * @param {Callback} unsubscribe - This callback will be used to unsubscribe from the Subscription.
 */
const Subscription = (id: string, unsubscribe: Callback): SubscriptionType => ({
  unsubscribe,
});

export default Subscription;

