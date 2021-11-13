/**
 * @author Vighnesh Raut <me@vighnesh153.com>
 */

import { useEffect, useState } from "react";
import { BehaviourSubject } from "./eventing";

const statesCollection: { [k: string]: BehaviourSubject<any> } = {};

const getInitialStateFromCollection = (identifier: string): any | null => {
  if (!statesCollection[identifier]) return null;

  return statesCollection[identifier].getValue();
};

const useGlobalState = <T>(identifier: string, initialState: T) => {
  const [state, setState] = useState<T>(
    getInitialStateFromCollection(identifier) || initialState
  );

  useEffect(() => {
    if (!statesCollection[identifier]) {
      statesCollection[identifier] = new BehaviourSubject<T>(state);
    }
    const subscription = (
      statesCollection[identifier] as BehaviourSubject<T>
    ).subscribe(setState);
    return () => subscription.unsubscribe();
  }, [identifier]);

  useEffect(() => {
    if (statesCollection[identifier]) {
      statesCollection[identifier].publish(state);
    }
  }, [state]);

  return [state, setState];
};

export default useGlobalState;
