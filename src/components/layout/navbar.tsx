import { Logo } from "@/components/layout/logo"
import { DesktopNav } from "@/components/layout/desktop-nav"
import { MobileNav } from "@/components/layout/mobile-nav"

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-[60] border-b border-border/60 bg-background/70 backdrop-blur-md">
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
        <Logo height={30} priority />

        {/* Desktop links — strikethrough on hover/focus + active section. */}
        <DesktopNav />

        {/* Mobile trigger + fullscreen overlay (client leaf). */}
        <MobileNav />
      </nav>
    </header>
  )
}
