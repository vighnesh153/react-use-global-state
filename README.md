# @vighnesh153/use-global-state

[![npm (scoped)](https://img.shields.io/npm/v/@vighnesh153/use-global-state)](https://www.npmjs.com/package/@vighnesh153/use-global-state)
[![npm bundle size (scoped)](https://img.shields.io/bundlephobia/minzip/@vighnesh153/use-global-state)](https://www.npmjs.com/package/@vighnesh153/use-global-state)
[![npm](https://img.shields.io/npm/dt/@vighnesh153/use-global-state)](https://www.npmjs.com/package/@vighnesh153/use-global-state)

An extremely lightweight library which is close to `1.2KB` minified that provides a React hook for having a piece of global state. It is similar to the React's `useState` hook but with the only addition that this hook persists the state globally.

This can also be an alternative to the popular state management systems like `Redux`, `MobX` or even the built-in `Context API`. We can completely rely on hooks for handling the state for us.

This hook is better than the `Context API` as it you don't have to add that boilerplate code of having a context/provider and no long chains of provider, inside a provider, inside a provider, .... 

## Installation

Pushed [@vighnesh153/use-global-state](https://www.npmjs.com/package/@vighnesh153/use-global-state) to NPM registry and can be installed as follows.

```bash
npm install @vighnesh153/use-global-state
```

## Usage

```tsx
import useGlobalState from "@vighnesh153/use-global-state";

const Counter = () => {
  const [count, setCount] = useGlobalState('count', 0);
  
  const addOneToCount = () => {
    setCount(c => c + 1);
  };
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={addOneToCount}>
        Add 1
      </button>
    </div>
  );
};

const App = () => {
  return (
    <div>
      {/** Count state will be same for all counters **/}
      <Counter />
      <Counter />
      <Counter />
    </div>
  );
};
```

## How does this work?
* This hooks makes use of the provided `identifier` to tap into its global stream.
* When you change the state for an `identifier`, the new data gets published in the stream and all the components which are making use of that stream, will get the latest data.

## Best practices
* Try to keep the states very minimal. That way, it will be easier to make reusable and won't re-render lot of components just because some random sub-object changed in the state. 
* Although there is no restriction on how you want to use this, my recommendation would be to create a hook that has all the functionality related to the global state you want to track. This lets you encapsulate all the functionality related to the atomic state and will be easily scalable.
```jsx
const useUser = (userId, initialValue) => {
  const [user, setUser] = useGlobalState(`user_${userId}`, initialValue || {});
  
  const changeName = (newName) => {
    setUser(u => ({ ...u, name: newName }));
  };

  const changeAge = (newAge) => {
    setUser(u => ({ ...u, age: newAge }));
  };
  
  return { user, changeName, changeAge };
};
```

## Examples
* [Counters](https://docs.vighnesh153.com/public/UcrhdVdiPxJ4MHv4yNVG)

## Contributing
Pull requests are welcome. For any change, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)
