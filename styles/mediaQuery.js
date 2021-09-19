import { css } from "styled-components";

export const BREAK_POINT = 768;

const mediaQuery = {
  phone: (...args) => css`
    @media screen and (max-width: ${BREAK_POINT - 1}px) {
      ${css(...args)}
    }
  `,
  desktop: (...args) => css`
    @media (min-width: ${BREAK_POINT}px) {
      ${css(...args)}
    }
  `,
};

export default mediaQuery;
