import React from 'react'
import {Flex, Text, Button} from '@radix-ui/themes';

export default function IssuePage() {
  return (
    <Flex direction={'row'} gap={'2'}>
      <Text>Hello from Issue :{")"}</Text>
      <Button>Let's go</Button>
    </Flex>
  )
}
