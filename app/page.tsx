export default function Page() {
  return (
    <main className="flex min-h-svh items-center justify-center bg-black px-6 py-20">
      <div className="flex w-full max-w-3xl flex-col items-center text-center">
        <div
          aria-hidden="true"
          className="flex size-16 items-center justify-center rounded-2xl bg-[#ff5c0a] shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_8px_24px_rgba(255,92,10,0.35)]"
        >
          <svg
            width="36"
            height="36"
            viewBox="0 0 48 48"
            fill="none"
            role="presentation"
          >
            <polygon
              points="24,7 41,16.5 24,26 7,16.5"
              fill="#FFF3E8"
            />
            <polygon
              points="7,16.5 24,26 24,41.5 7,32"
              fill="#FBD9BE"
            />
            <polygon
              points="24,26 41,16.5 41,32 24,41.5"
              fill="#F5A76C"
            />
            <polygon
              points="24,7 41,16.5 24,26 7,16.5"
              stroke="#FFFFFF"
              strokeOpacity="0.6"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <path
              d="M7 16.5V32L24 41.5V26"
              stroke="#FFFFFF"
              strokeOpacity="0.5"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <path
              d="M41 16.5V32L24 41.5"
              stroke="#B93C00"
              strokeOpacity="0.35"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h1 className="mt-10 text-4xl font-medium tracking-tight text-balance text-white sm:text-5xl">
          What should we build today?
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-balance text-[#CFC8BC] sm:text-lg">
          Build your own racers, shooters, puzzles and whole worlds using your
          own words. If you can describe it, you can play it.
        </p>
      </div>
    </main>
  )
}
