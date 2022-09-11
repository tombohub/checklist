import { extendTheme, type ThemeOverride } from "@chakra-ui/react";

const themeOverride: ThemeOverride = {
  styles: {
    global: {
      body: {
        backgroundColor: "gray.700",
        color: "gray.100",
      },
    },
  },
  components: {
    Checkbox: {
      baseStyle: {
        icon: {
          color: "gray.300",
          backgroundColor: "gray.600",
        },
        control: {
          height: "24px", // works only when resetting defaultProps
          width: "24px",
          border: "2px",
          borderColor: "gray.300",
          backgroundColor: "gray.600",
          _disabled: {
            borderColor: "gray.300",
            bg: "gray.200",
          },
          _checked: {
            backgroundColor: "gray.600",
            borderColor: "gray.300",
          },
        },
        label: {},
      },
      defaultProps: {
        // Reset props
        size: null,
        variant: null,
      },
    },
  },
};

const theme = extendTheme(themeOverride);

export { theme };
