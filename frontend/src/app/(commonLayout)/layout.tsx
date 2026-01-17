import { Navbar1 } from '@/components/layout/navbar1';
import React from 'react'

export default function Commonlayout({children}:{
  children: React.ReactNode;
}) {
  return (
    <div>
        <Navbar1/>
        {children}</div>
  )
}
