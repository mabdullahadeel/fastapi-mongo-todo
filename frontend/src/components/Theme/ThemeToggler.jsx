import { Switch, useColorMode, FormLabel } from "@chakra-ui/react";

const ThemeToggeler = ({ showLabel = false, ...rest }) => {
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <>
      {showLabel && (
        <FormLabel htmlFor="theme-toggler" mb="0">
          Enable Dark Theme
        </FormLabel>
      )}
      <Switch
        id="theme-toggler"
        size="sm"
        isChecked={colorMode === "dark"}
        isDisabled={false}
        isLoading={false}
        value={colorMode}
        colorScheme="green"
        variant="ghost"
        mr={2}
        onChange={toggleColorMode}
        {...rest}
      />
    </>
  );
};

export default ThemeToggeler;
