import React from 'react'


export default function CombineContexts(...contexts) {
  return ({ children }) =>
    contexts.reduceRight(
      (prev, CurrentContext) => <CurrentContext>{prev}</CurrentContext>,
      children
    );
}
