import Image from "next/image"

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

export default function Page() {
  return (
    <main className="flex min-h-svh items-center justify-center bg-olive px-6 py-20">
      <Empty className="border-0">
        <EmptyHeader className="max-w-2xl">
          <EmptyMedia>
            <Image src="/logo.svg" alt="Logo" width={48} height={48} />
          </EmptyMedia>
          <EmptyTitle className="text-2xl text-white">
            What should we build today?
          </EmptyTitle>
          <EmptyDescription className="text-base sm:text-lg">
            Build your own racers, shooters, puzzles and whole worlds using
            your own words. If you can describe it, you can play it.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    </main>
  )
}
