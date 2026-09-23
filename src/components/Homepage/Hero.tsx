import React from 'react'

const Hero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <video
        className="absolute inset-0 z-0 h-full w-full object-cover"
        src="/assets/hero.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
        <h1 className="text-5xl font-semibold tracking-tight md:text-7xl">
          Little Loops
        </h1>
        
      </div>
    </section>
  )
}

export default Hero
