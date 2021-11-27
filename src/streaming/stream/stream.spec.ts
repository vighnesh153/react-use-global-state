/**
 * @author Vighnesh Raut <me@vighnesh153.com>
 */

import Stream from "./stream";

describe('Stream entity tests', () => {
  it('should be able to subscribe to the stream', function () {
    const stream = new Stream(null);
    const cb = jest.fn();

    stream.subscribe(cb);
  });

  it('should invoke the cb right after subscribing to the stream with the previous published data', function () {
    const stream = new Stream(null);
    const cb = jest.fn();

    stream.subscribe(cb);

    expect(cb).toBeCalled();
  });

  it('should invoke the callback correct number of times for all the publishes', function () {
    const stream = new Stream(1);
    const cb = jest.fn();

    stream.subscribe(cb);
    stream.publish(42);
    stream.publish(3);
    stream.publish(423);
    stream.publish(423432);
    stream.publish(53345);

    // 5 times published, and 1 time when we subscribed to the stream.
    expect(cb).toBeCalledTimes(5 + 1);
  });

  it('should invoke the callback for all the data which is published in stream', function () {
    const stream = new Stream(1);
    const cb = jest.fn();

    stream.subscribe(cb);
    stream.publish(2);
    stream.publish(3);

    expect(cb).toBeCalledWith(1);
    expect(cb).toBeCalledWith(2);
    expect(cb).toBeCalledWith(3);
  });

  it('should be able to unsubscribe from the stream', function () {
    const stream = new Stream(1);
    const cb = jest.fn();

    const subscription = stream.subscribe(cb);

    subscription.unsubscribe();
  });

  it('should not invoke the cb after we have unsubscribed from the stream', function () {
    const stream = new Stream(1);
    const cb = jest.fn();

    const subscription = stream.subscribe(cb);
    subscription.unsubscribe();
    stream.publish(24)
    stream.publish(100)

    // 1 time when we subscribed to the stream.
    expect(cb).toBeCalledTimes(1);
  });

  it('should be able to return the latest value in the stream', function () {
    const stream = new Stream(1);

    stream.publish(12);
    stream.publish(45);

    expect(stream.getValue()).toBe(45);
  });
});
