import { DefaultTheme } from "styled-components";

const size = {
  mobile: "600px",
  desktop: "1800px",
};

const theme: DefaultTheme = {
  colors: {
    main: "#0a4297",
  },
  mq: {
    mobile: `(max-width: ${size.mobile})`,
    desktop: `(min-width: ${size.desktop})`,
  },
};

export default theme;
