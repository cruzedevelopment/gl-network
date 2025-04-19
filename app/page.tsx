"use client"

import dynamic from 'next/dynamic'

const HeroGeometric = dynamic(
  () => import('../components/kokonutui/hero-geometric'),
  { ssr: false }
)

export default function Page() {
  return (
    <HeroGeometric 
      badge="Growth Language"
      title1="Build Your Brand."
      title2="Monetize Your Voice." 
    />
  )
}