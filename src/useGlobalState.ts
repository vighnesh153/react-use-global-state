/**
 * @author Vighnesh Raut <me@vighnesh153.com>
 */

import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { Stream } from "./streaming";

// Stores all the streams of data
const streams: { [id: string]: Stream<any> } = {};

// Returns the current value in the stream
const getInitialState = (id: string) => streams[id]?.getValue();

/**
 * Use this hook for creating a persistent useState hook.
 *
 * @param identifier {string} Marker for the piece of state.
 * @param initialState Initial state value
 */
const useGlobalState = <T>(
  identifier: string,
  initialState: T | undefined
): [T, Dispatch<SetStateAction<T>>] => {
  // Initialize the state. If value exists in stream, it will be given higher preference than value passed as prop.
  const [state, setState] = useState<T>(
    getInitialState(identifier) || initialState
  );

  // Create a subscription to the stream
  useEffect(() => {
    // If stream for the current identifier is not defined, create a new one
    if (streams[identifier] === undefined) {
      streams[identifier] = new Stream<T>(state);
    }

    // Subscribe to the stream
    const { unsubscribe } = streams[identifier]?.subscribe(setState) || {};

    // As a clean up, unsubscribe
    return unsubscribe;
  }, [identifier]);

  // Publish the new value to the stream
  useEffect(() => {
    streams[identifier]?.publish(state);
  }, [state]);

  return [state, setState];
};

export default useGlobalState;
