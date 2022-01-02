# @vighnesh153/use-global-state

[![npm (scoped)](https://img.shields.io/npm/v/@vighnesh153/use-global-state)](https://www.npmjs.com/package/@vighnesh153/use-global-state)
[![Test Coveralls](https://github.com/vighnesh153/react-use-global-state/actions/workflows/coveralls.yml/badge.svg)](https://coveralls.io/github/vighnesh153/react-use-global-state?branch=main)
[![Coverage Status](https://coveralls.io/repos/github/vighnesh153/react-use-global-state/badge.svg?branch=main)](https://coveralls.io/github/vighnesh153/react-use-global-state?branch=main)
[![npm bundle size (scoped)](https://img.shields.io/bundlephobia/minzip/@vighnesh153/use-global-state)](https://img.shields.io/bundlephobia/minzip/@vighnesh153/use-global-state)
[![npm peer dependency version (scoped)](https://img.shields.io/npm/dependency-version/@vighnesh153/use-global-state/peer/react)](https://www.npmjs.com/package/react)
[![npm](https://img.shields.io/npm/dt/@vighnesh153/use-global-state)](https://img.shields.io/npm/dt/@vighnesh153/use-global-state)
[![GitHub](https://img.shields.io/github/license/vighnesh153/react-use-global-state)](https://github.com/vighnesh153/react-use-global-state/blob/main/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/vighnesh153/react-use-global-state)](https://github.com/vighnesh153/react-use-global-state/issues)

An extremely lightweight library which is just `1KB` minified that provides a React hook for having a piece of global state. It is similar to the React's `useState` hook but with the only addition that this hook persists the state globally.

This can be used as an alternative to the popular state management systems like `Redux`, `MobX` or even the built-in `Context API`. We can completely rely on hooks for handling the state for us.

## Installation
```bash
npm install @vighnesh153/use-global-state
```

## Usage

```jsx
import useGlobalState from "@vighnesh153/use-global-state";

const Counter = ({ adder }) => {
  const [count, setCount] = useGlobalState('count', 0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + adder)}>
        Add {adder}
      </button>
    </div>
  );
};

const App = () => {
  return (
    <div>
      {/** Count state will be same for all counters **/}
      <Counter adder={1} />
      <Counter adder={2} />
      <Counter adder={3} />
    </div>
  );
};
```

##### Cleaning up for unit testing
You might want to clean up all the existing streams for your unit 
test suites. You can make use of the `resetExistingStreams` function 
to do that.

```tsx
import { resetExistingStreams } from "@vighnesh153/use-global-state";

describe('Your component tests', () => {
  beforeEach(() => {
    resetExistingStreams();
  });
});
```

## Examples
* [Counters](https://docs.vighnesh153.com/public/UcrhdVdiPxJ4MHv4yNVG)

![Counters Gif](https://i.imgur.com/hyP7VWe.gif)

## Why you should use this library?
* Size: `1KB` minified
* Zero external dependencies
* Modern hook-based state management instead of the traditional redux like approaches
* No need of wrapping components with a long chain of Providers as there is no Provider-Consumer pattern in this hook

## Best practices
* Try to keep the states very minimal. That way, it will be easier to make reusable and won't re-render lot of components just because some random sub-object changed in the state. 
* Although there is no restriction on how you want to use this, my recommendation would be to create a hook that has all the functionality related to the global state you want to track. This lets you encapsulate all the functionality related to the atomic state and will be easily scalable.
```jsx
const useUser = (userId, initialValue) => {
  const [user, setUser] = useGlobalState(`user_${userId}`, initialValue || {});
  
  const changeName = useCallback((newName) => {
    setUser({ ...user, name: newName });
  }, [user]);

  const changeAge = useCallback((newAge) => {
    setUser({ ...user, age: newAge });
  }, [user]);
  
  return { user, changeName, changeAge };
};
```

## How does this hook work?
* This hooks makes use of the provided `identifier` to tap into its global stream.
* When you change the state for an `identifier`, the new data gets published in the stream and all the components which are making use of that stream, will get the latest data.

## Contributing
Pull requests are welcome. For any change, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)
