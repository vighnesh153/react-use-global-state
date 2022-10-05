/**
 * @author Vighnesh Raut <me@vighnesh153.com>
 */

import useGlobalState from "./useGlobalState";

import { act, renderHook, cleanup } from "@testing-library/react";

describe("useGlobalState hook tests", () => {
  beforeEach(cleanup);

  it("should have same return signature like useState hook", function () {
    const { result } = renderHook(() => useGlobalState(`${Math.random()}`, 42));

    const [counter, setCounter] = result.current;

    expect(counter).toBe(42);
    expect(typeof setCounter).toBe("function");
  });

  it("should update the state similar to useState hook", function () {
    const { result } = renderHook(() => useGlobalState(`${Math.random()}`, 42));

    act(() => {
      result.current[1](100);
    });

    expect(result.current[0]).toBe(100);
  });

  it("should use the previous value when instantiating the hook again", function () {
    const identifier = `${Math.random()}`;
    renderHook(() => useGlobalState(identifier, 42));
    const { result } = renderHook(() => useGlobalState(identifier, 22));

    expect(result.current[0]).toBe(42);
  });

  it("should update all other subscribers of the hook if any one of them publishes a new value", function () {
    const id = `${Math.random()}`;
    const { result: r1 } = renderHook(() => useGlobalState<number>(id));
    const { result: r2 } = renderHook(() => useGlobalState<number>(id));
    const { result: r3 } = renderHook(() => useGlobalState<number>(id));

    act(() => {
      r2.current[1](500);
    });

    expect(r1.current[0]).toBe(500);
    expect(r2.current[0]).toBe(500);
    expect(r3.current[0]).toBe(500);
  });
});
