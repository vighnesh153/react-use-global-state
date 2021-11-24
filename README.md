# @vighnesh153/use-global-state

[![npm (scoped)](https://img.shields.io/npm/v/@vighnesh153/use-global-state)](https://www.npmjs.com/package/@vighnesh153/use-global-state)
[![npm bundle size (scoped)](https://img.shields.io/bundlephobia/minzip/@vighnesh153/use-global-state)](https://www.npmjs.com/package/@vighnesh153/use-global-state)
[![npm](https://img.shields.io/npm/dt/@vighnesh153/use-global-state)](https://www.npmjs.com/package/@vighnesh153/use-global-state)

An extremely lightweight library which is just `1KB` minified that provides a React hook for having a piece of global state. It is similar to the React's `useState` hook but with the only addition that this hook persists the state globally.

This can be used as an alternative to the popular state management systems like `Redux`, `MobX` or even the built-in `Context API`. We can completely rely on hooks for handling the state for us.

### Pros
* Size: `1KB` minified
* Zero external dependencies
* Hook based instead of the traditional approaches
* No need of wrapping components with a long chain of Providers as there is no Provider-Consumer pattern in this hook

### Cons
* Cannot be used with class-based components. A workaround is to create a functional component wrapper and provide the state as props to the class-based component

## Installation
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

## How does this hook work?
* This hooks makes use of the provided `identifier` to tap into its global stream.
* When you change the state for an `identifier`, the new data gets published in the stream and all the components which are making use of that stream, will get the latest data.

## Contributing
Pull requests are welcome. For any change, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)
