// import original module declarations
import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      main: string;
    };
    mq: {
      mobile: string;
      desktop: string;
    };
  }

  export interface GlobalStyle {}
}
