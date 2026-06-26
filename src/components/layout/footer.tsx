import { ArrowUpRight } from "lucide-react"

import { profile } from "@/data/profile"
import { Logo } from "@/components/layout/logo"

export function Footer() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto w-full max-w-6xl px-6 py-20">
        <div className="grid gap-12 md:grid-cols-[1.6fr_1fr]">
          {/* CTA headline */}
          <div>
            <p className="mb-4 text-base font-bold text-brand">
              Interested in working with me?
            </p>
            <h2 className="max-w-xl text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
              Lets cut the noise and design the world that we envision.
            </h2>
          </div>

          {/* Contact + socials — left-aligned block in the right column. */}
          <div className="flex flex-col gap-8">
            <div>
              <p className="mb-1 text-sm text-brand">Send a message</p>
              <a
                href={`mailto:${profile.email}`}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {profile.email}
              </a>
            </div>

            <ul className="space-y-2">
              {profile.socials.map((social) => (
                <li key={social.href}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 text-sm text-foreground transition-colors hover:text-brand"
                  >
                    <ArrowUpRight className="size-3.5 text-brand transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>

            <Logo height={30} />
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-2 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright © 2026 {profile.name}. All rights reserved.</p>
          <p>
            Developed by{" "}
            <a
              href="https://jeremiahdavid.online"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground transition-colors hover:text-brand"
            >
              Jargo
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
