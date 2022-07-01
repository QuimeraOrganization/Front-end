import { HStack, VStack, Input, InputGroup, InputRightAddon, Select } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'

export default function Home() {
  return (
    <VStack
      px={10}
      mt={5}
    >
      <HStack
        width="100%"
        justify="space-between"
      >
        <InputGroup
          size='sm'
          width="30%"
          border="0px solid #6FBE5E"
        >
          <Input
            placeholder='Busque por um produto...'
            fontSize={{ base: '11px', md: '12px', lg: '13px' }}
            borderRadius={200}
          />
          <InputRightAddon
            children={<SearchIcon color="#6FBE5E" />}
            backgroundColor="transparent"
            borderRadius={200}
            cursor="pointer"
          />
        </InputGroup>

        <Select
          size='sm'
          fontSize={{ base: '11px', md: '12px', lg: '13px' }}
          width="20%"
          placeholder='Filtrar por'
          backgroundColor="#fff"
          border="1px solid"
          borderColor="#6FBE5E"
          borderRadius={6}
        >
          <option value='option1'>Verificado</option>
          <option value='option2'>Nome crescente</option>
          <option value='option3'>Nome decresente</option>
        </Select>

      </HStack>
    </VStack>
  )
}
