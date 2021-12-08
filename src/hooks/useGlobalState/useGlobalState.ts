/**
 * @author Vighnesh Raut <me@vighnesh153.com>
 */

import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { StreamsManager } from "src/streaming";

// Get the stream manager instance
const streamsManager = StreamsManager();
const resetExistingStreams = streamsManager.reset;

// Useful during unit testing
export { resetExistingStreams };

/**
 * Use this hook for creating a persistent useState hook.
 *
 * @param identifier {string} Marker for the piece of state.
 * @param initialState Initial state value
 */
const useGlobalState = <T>(
  identifier: string,
  initialState?: T
): [T, Dispatch<SetStateAction<T>>] => {
  // Initialize the state. If value exists in stream, it will be given higher preference than value passed as prop.
  const [state, setState] = useState<T>(
    streamsManager.getInitialState(identifier) || initialState
  );

  // Create a new stream if it doesn't exist.
  // This needs to happen out of useEffect (so that it is synchronous) to avoid
  // multiple simultaneous useGlobalState() calls to create a different stream for same
  // identifier.
  streamsManager.tap(identifier, state);

  // Create a subscription to the stream
  useEffect(() => {
    // Subscribe to the stream
    const { unsubscribe } = streamsManager.subscribeTo<T>(identifier, setState);

    // As a cleanup, unsubscribe
    return unsubscribe;
  }, [identifier]);

  // Publish the new value to the stream
  useEffect(() => {
    streamsManager.publish(identifier, state);
  }, [state]);

  return [state, setState];
};

export default useGlobalState;