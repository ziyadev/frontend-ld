import { createTheme, MantineProvider } from "@mantine/core";
const theme = createTheme({
  colors: {
    myColor: [
      "#ecf4ff",
      "#dce4f5",
      "#b9c7e2",
      "#94a8d0",
      "#748dc0",
      "#5f7cb7",
      "#5474b4",
      "#44639f",
      "#3a5890",
      "#2c4b80",
    ],
  },
});

// eslint-disable-next-line react/prop-types
export const Providers = ({ children }) => {
  return (
    <MantineProvider theme={theme} defaultColorScheme="auto">
      {children}
    </MantineProvider>
  );
};
