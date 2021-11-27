/**
 * @author Vighnesh Raut <me@vighnesh153.com>
 */

import Subscription from "./subscription";

describe('Subscription tests', () => {
  it('should allow to create a new subscription', function () {
    const subscription = Subscription('my-sub', () => {});

    expect(subscription).not.toBeNull();
  });

  it('should invoke the cb passed when we unsubscribe', function () {
    const unsubscriberCallback = jest.fn();
    const subscription = Subscription('my-sub', unsubscriberCallback);

    subscription.unsubscribe();

    expect(unsubscriberCallback).toBeCalled();
  });
});
