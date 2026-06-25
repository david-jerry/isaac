/** Primary navigation — single source for the desktop bar and mobile overlay. */
export interface NavLink {
  label: string
  href: string
}

export const navLinks: NavLink[] = [
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
]
