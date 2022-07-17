import {
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  FormLabel,
  FormControl,
} from "@chakra-ui/react";

export function Input({ name, label, width, ...rest }) {
  return (
    <FormControl>
      {label && (
        <FormLabel
          htmlFor={name}
          color="#253C1F"
          fontWeight="700px"
          fontSize="20px"
          lineHeight="20px"
        >
          {label}
        </FormLabel>
      )}
      <ChakraInput
        id={name}
        name={name}
        width={width ? "343px" : "100%"}
        focusBorderColor="#6FBE5E"
        size="lg"
        borderColor="#6FBE5E"
        box-shadow="0px 2px 9px"
        borderRadius="10px"
        {...rest}
      />
    </FormControl>
  );
}
