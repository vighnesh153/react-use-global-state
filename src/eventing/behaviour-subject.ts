/**
 * @author Vighnesh Raut <me@vighnesh153.com>
 */

import { DataCallback } from './types';
import Subscription from './subscription';

/**
 * Controls the pub-sub for a particular event. Terminology adopted from "rxjs" npm package.
 */
class BehaviourSubject<T> {
  /**
   * Stores all the callbacks for a particular event
   * @private
   */
  private readonly _subscribers: Map<string, DataCallback<T>>;

  /**
   * Returns the current value of the behaviour subject
   */
  getValue = (): T => this.value;

  constructor(private value: T) {
    this._subscribers = new Map();
  }

  /**
   * Publishes new data in the subject stream. All the callbacks will be notified.
   * @param data
   */
  publish = (data: T) => {
    this.value = data;
    Array.from(this._subscribers.values()).forEach((callback) => {
      callback(data);
    });
  };

  /**
   * Subscribe to this event
   * @param cb
   */
  subscribe = (cb: DataCallback<T>): Subscription => {
    cb(this.value);
    return this._subscribe(cb);
  };

  private _subscribe = (cb: DataCallback<T>): Subscription => {
    const subscriptionId = `${Math.random()}-${Date.now()}`;
    this._subscribers.set(subscriptionId, cb);

    return new Subscription(subscriptionId, () => this._subscribers.delete(subscriptionId));
  };
}

export default BehaviourSubject;
