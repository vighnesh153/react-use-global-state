/**
 * @author Vighnesh Raut <me@vighnesh153.com>
 */

import { DataCallback, SubscriptionType } from 'src/types';

import Subscription from '../subscription';

/**
 * Controls the pub-sub for a particular stream.
 */
class Stream<T> {
  /**
   * Stores all the listeners for a particular stream
   * @private
   */
  private readonly _subs: { [id: string]: DataCallback<T> } = {};

  /**
   * Returns the current value from the stream
   */
  getValue = (): T => this.value;

  constructor(private value: T) {}

  /**
   * Publishes new data in the subject stream. All the callbacks will be notified.
   * @param data
   */
  publish = (data: T) => {
    // Update the value stored
    this.value = data;

    // Notify all the listeners
    Object.values(this._subs).forEach((cb) => cb(data));
  };

  /**
   * Subscribe to this stream
   * @param cb
   */
  subscribe = (cb: DataCallback<T>): SubscriptionType => {
    // Notify the listener with the existing value
    cb(this.value);

    // Add the listener to the existing list of listeners
    const subId = `${Math.random()}-${Date.now()}`;
    this._subs[subId] = cb;

    // Return a subscription that will help to unsubscribe from this stream
    return Subscription(subId, () => delete this._subs[subId]);
  };
}

export default Stream;
