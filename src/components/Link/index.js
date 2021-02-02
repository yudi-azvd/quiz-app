/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import NextLink from 'next/link';

export default function Link({ children, href, ...rest }) {
  return (
    <NextLink href={href} passHref>
      <a {...rest}>
        {children}
      </a>
    </NextLink>
  );
}
