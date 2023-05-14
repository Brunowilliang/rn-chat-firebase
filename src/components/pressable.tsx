import React from 'react'
import { Pressable as Press, IPressableProps } from 'native-base';
import { colors } from '~/styles/theme';


const Pressable = (p: IPressableProps) => {
  return (
    <Press _pressed={{opacity: 0.4}} w="auto" h="auto" alignItems="center" rounded={8} justifyContent="center" {...p}>
      {p.children}
    </Press>
  )
}

export default Pressable