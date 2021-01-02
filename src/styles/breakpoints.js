const sizes = {
  mobile: 768,
  tablet: 1024,
};

export const devices = {
  mobile: `(max-width: ${sizes.mobile}px)`,
  mobileMin: `(min-width: ${sizes.mobile + 1}px)`,
  tablet: `(max-width: ${sizes.tablet}px)`,
  tabletMin: `(min-width: ${sizes.tablet + 1}px)`,
};
