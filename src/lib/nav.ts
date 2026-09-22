// Routes that render a normal page rather than the text field.
export const isPlainRoute = (path: string) =>
  path.startsWith('/vibes') || /^\/projects\/[^/]+/.test(path);

// Set by Transitions right before it navigates away from a plain page, so the
// next field page resolves instantly under the fade instead of morphing from
// whatever field page was shown before the plain one.
export const navState = { fromPlain: false };
