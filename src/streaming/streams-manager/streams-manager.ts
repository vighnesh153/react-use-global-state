/**
 * @author Vighnesh Raut <me@vighnesh153.com>
 */

import Stream from "../stream";
import { DataCallback, SubscriptionType } from "src/types";

/**
 * Managing the different streams of data
 */
const StreamsManager = () => {
  // Stores all the streams of data
  let streams: { [id: string]: Stream<any> } = {};

  return {
    // If the stream doesn't exist for the identifier, create a new stream for it.
    // Returns true if new stream was created. Else, returns false.
    tap: <T>(identifier: string, state: T): boolean => {
      if (streams[identifier] === undefined) {
        streams[identifier] = new Stream<T>(state);
        return true;
      }
      return false;
    },

    // Returns the current value in the stream
    getStreamState: (identifier: string): any => streams[identifier]?.getValue(),

    // Publish new data to the stream
    publish: <T>(identifier: string, data: T): void => streams[identifier]?.publish(data),

    // Subscribe to a particular stream
    subscribeTo: <T>(
      identifier: string,
      onChange: DataCallback<T>
    ): SubscriptionType => streams[identifier].subscribe(onChange),

    // Clears out all the existing streams and their subscribers.
    // Mostly useful during unit testing
    reset: (): void => {
      streams = {};
    },
  };
};

export default StreamsManager;
