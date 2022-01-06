/**
 * @author Vighnesh Raut <me@vighnesh153.com>
 */

import StreamsManager from "./streams-manager";

describe("StreamsManager tests", () => {
  it("should create a new stream for a new identifier", function () {
    const streamsManager = StreamsManager();
    const identifier = `${Math.random()}`;

    const streamCreated = streamsManager.tap(identifier, null);

    expect(streamCreated).toBe(true);
  });

  it("should NOT create a new stream for an identifier which was already tapped", function () {
    const streamsManager = StreamsManager();
    const identifier = `${Math.random()}`;

    // Tap once
    streamsManager.tap(identifier, null);

    // Tap again
    const streamCreated = streamsManager.tap(identifier, null);

    expect(streamCreated).toBe(false);
  });

  it(`should return undefined if the stream doesn't exist.`, function () {
    const streamsManager = StreamsManager();
    const identifier = `${Math.random()}`;

    const data = streamsManager.getStreamState(identifier);

    expect(data).toBeUndefined();
  });

  it(`should return undefined if the stream exists and but has no data`, function () {
    const streamsManager = StreamsManager();
    const identifier = `${Math.random()}`;
    let n: any;

    streamsManager.tap(identifier, n as number);
    const data = streamsManager.getStreamState(identifier);

    expect(data).toBe(undefined);
  });

  it(`should return correct data if the stream exists and has data.`, function () {
    const streamsManager = StreamsManager();
    const identifier = `${Math.random()}`;

    streamsManager.tap(identifier, 42);
    const data = streamsManager.getStreamState(identifier);

    expect(data).toBe(42);
  });

  it("should do nothing if we try to publish data to a stream which doesn't exist", function () {
    const streamsManager = StreamsManager();
    const identifier = `${Math.random()}`;

    expect(() => {
      streamsManager.publish(identifier, 456);
    }).not.toThrow();
  });

  it("should be able to publish new data in a stream", function () {
    const streamsManager = StreamsManager();
    const identifier = `${Math.random()}`;

    streamsManager.tap(identifier, 123);
    expect(() => {
      streamsManager.publish(identifier, 456);
    }).not.toThrow();
  });

  it("should be able to subscribe to a stream", function () {
    const streamsManager = StreamsManager();
    const identifier = `${Math.random()}`;
    const subscribeFn = jest.fn();

    streamsManager.tap(identifier, 123);

    streamsManager.subscribeTo(identifier, subscribeFn);

    streamsManager.publish(identifier, 100);

    expect(subscribeFn).toBeCalledTimes(2);
    expect(subscribeFn).toBeCalledWith(123);
    expect(subscribeFn).toBeCalledWith(100);
  });

  it("should be able to unsubscribe from a stream", function () {
    const streamsManager = StreamsManager();
    const identifier = `${Math.random()}`;
    const subscribeFn = jest.fn();

    streamsManager.tap(identifier, 123);

    const { unsubscribe } = streamsManager.subscribeTo(identifier, subscribeFn);
    unsubscribe();

    streamsManager.publish(identifier, 100);

    expect(subscribeFn).toBeCalledTimes(1);
    expect(subscribeFn).toBeCalledWith(123);
  });

  it('should allow to clear all the existing streams', function () {
    const streamsManager = StreamsManager();
    const identifier = `${Math.random()}`;

    // Create the stream
    streamsManager.tap(identifier, 123);

    // Clear all streams
    streamsManager.reset();

    // Try creating stream for the same identifier. It should be created.
    const streamCreatedAgain = streamsManager.tap(identifier, 123);

    expect(streamCreatedAgain).toBe(true);
  });
});
