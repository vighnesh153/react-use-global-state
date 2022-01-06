/**
 * @author Vighnesh Raut <me@vighnesh153.com>
 */

import { useState, useEffect, useCallback } from "react";
import { StreamsManager } from "src/streaming";
import { DataCallback } from "src/types";

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
): [T, DataCallback<T>] => {
  // Initialize the state. If value exists in stream, it will be given higher
  // preference than value passed as prop.
  const [state, setState] = useState<T>(
    streamsManager.getStreamState(identifier) || initialState
  );

  // This function will be exposed to the outside world to update the state.
  // Reason: Regular setState also supports passing a callback, which has an
  // argument that holds the latest piece of state. As this hook will be
  // instantiated in different components, each component will have it's own
  // instance of setState. So, when a state-update is in transit, different
  // components might get the update at different intervals. Hence, we cannot
  // support the callback currently.
  //
  // To have the callback to update the state, this hook will need some
  // internal-architectural changes. Added it to backlog.
  const updateState = useCallback(
    (newState: T): void => setState(newState),
    []
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

  // Publish the new value to the stream, whenever any instance of state is updated
  // in any component.
  useEffect(() => {
    streamsManager.publish(identifier, state);
  }, [state]);

  return [state, updateState];
};

export default useGlobalState;
