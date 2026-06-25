---
name: Pandascrow
order: 1
category: Product Design
year: "2025"
url: https://pandascrow.io
featured: true
tags: [Dashboard Redesign, Escrow Platform, B2B, B2C]
heroImage: /featured_projects/project_01.png
imageAlt: Pandascrow dashboard on a tablet
headline:
  lead: Revolutionizing
  accent: Escrow
  tail: As A Service
summary: >-
  A dashboard built around how the database is structured is a dashboard built
  against the user. The brief said "visual refresh." The real fix was a
  structural redesign, connecting every UI decision to a business outcome for
  four distinct user types on one platform.
meta:
  role: Lead Product Designer
  team: 1 PM · 2 Engineers · 3 Product Designers
  impact:
    - Reduced Cognitive Load
    - Faster Transaction Interactions
    - Unified Experience Across 4 Audiences
contribution: >-
  I led research synthesis, ran the stakeholder session that reframed the brief
  from "visual refresh" to structural redesign, owned the information
  architecture and component system, and directed all three layout sections,
  brief reframe, navigation anchor, illustration and systems design.
problem:
  kicker: The
  accent: Problem
  heading: A dashboard built around the database is a dashboard built against the user.
  body:
    - >-
      Pandascrow serves freelancers, businesses, merchants, and developers on
      one platform, four distinct audiences, each looking for different things
      the moment they land. The legacy interface treated them all identically:
      dense grey tables, rigid auth flows, navigation that followed the
      product's internal logic rather than any user's mental model.
  note: >-
    When everything carries the same visual weight, nothing is findable. Users
    spent time searching instead of transacting, and in a payment platform, that
    cost is direct.
process:
  - kicker: Discovery
    accent: "& Research"
    heading: Session recordings revealed the cost of row-based interfaces.
    body:
      - >-
        Led the team to review the recorded user sessions from the legacy
        dashboard. Users were spending an average of 40+ seconds finding
        individual transactions, scrolling past rows of identically weighted
        data. The interface was functional but required analytical reading for
        every interaction. That time cost had a direct effect on transaction
        throughput.
    tags: [Session recordings, Cognitive load map, Legacy UI audit, Stakeholder workshop]
  - kicker: Define
    accent: "& Ideate"
    heading: Instead of a "visual refresh" made the case for structural redesign.
    body:
      - >-
        Presented research findings to the PM and CEO. The data showed the
        problem wasn't aesthetics it was information architecture.
      - >-
        Got alignment on a structural redesign by mapping the business cost of
        the old interface against projected gains from pattern-recognition-based
        layouts.
    note: The brief changed. The scope expanded.
    tags: [Brief reframe, Stakeholder alignment, 4-audience IA map, Decision matrix]
  - kicker: Design
    accent: "& Validate"
    heading: Component-first approach kept engineering aligned throughout.
    body:
      - >-
        Built the design system before designing screens. Every UI element,
        transaction cards, stat blocks, action panels, was specced as a reusable
        component with documented states. Weekly design reviews with the
        engineering team during build ensured the system shipped as designed,
        and set the foundation for every feature Pandascrow builds next.
    tags: [Component system, Design tokens, Weekly eng. reviews, Handoff docs]
keyDecision: >-
  We built the component system before a single screen. Every screen that
  followed was assembly, not design from scratch.
strategy:
  kicker: Strategy /
  accent: Brief Reframe
  heading: A dashboard built around the database is a dashboard built against the user.
  body:
    - >-
      Moving from rows to cards isn't a stylistic preference. It's the shift
      from analytical reading to pattern recognition. Users scan by shape,
      position, and hierarchy, not by parsing column values sequentially. That
      distinction halves the time it takes to find a single transaction.
    - >-
      Getting alignment on this required mapping the business cost of the old
      interface: slower interactions, higher support volume around "I can't find
      my transaction," and a UI that actively discouraged the storefront and
      developer features the product team needed users to adopt.
gallery:
  old: []
  new: []
navigation:
  kicker: Visual System /
  accent: Navigation
  heading: >-
    The header isn't a brand moment, it's a navigational decision that sets
    every interaction that follows.
  body:
    - >-
      A high-contrast header loads as the page's first orientation point. It
      establishes who the user is, what they're managing, and what requires
      action, before they've scrolled. The old interface gave users no anchor;
      they landed and had to go looking.
    - >-
      Widened margins and deliberate padding around interactive card clusters
      aren't decorative. They are separation logic: when content has room to
      breathe, the eye navigates instead of scanning for contrast.
systems:
  kicker: Systems /
  accent: Component Design
  heading: Designed at the component level so the system could extend without breaking.
  body:
    - >-
      Every screen is built from a shared set of components: transaction cards,
      stat blocks, action panels, and detail drawers. The engineering team can
      add new transaction types, new user roles, or new surfaces without
      designing from scratch.
    - >-
      This was a deliberate collaboration decision. I worked closely with the
      engineering team during the component spec phase to ensure the design
      system matched what could realistically be built and maintained, reducing
      design-to-development friction on every feature that followed.
audiences:
  - label: Freelancers
  - label: Businesses
  - label: Merchants
  - label: Developers
impact:
  kicker: The
  accent: Impact
  heading: Four user types. One coherent experience. No compromises.
  body:
    - >-
      Across freelancers, businesses, merchants, and developers, the redesign
      held one visual language without forcing any audience into a compromise.
    - >-
      The component foundation means new surfaces extend the system instead of
      fracturing it, keeping the experience coherent as the product grows.
  cards:
    - icon: Brain
      title: Reduced Cognitive Load
      body: >-
        Replacing grey tables with card-based layouts eliminated the need to
        parse column values sequentially. Users scan instead of read.
    - icon: Gauge
      title: Transaction speed
      body: >-
        Pattern recognition over rote reading. Finding a single transaction
        dropped from a multi-step scan to a single-glance action.
    - icon: Users
      title: Unified experience
      body: >-
        Freelancers, businesses, merchants, and developers now share the same
        visual language, without the interface feeling like a compromise for any.
    - icon: Boxes
      title: Scalable system
      body: >-
        Component-level design means new features extend the system rather than
        breaking it, reducing future design debt before it accumulates.
closing:
  quote: >-
    We traded data density for data clarity, and in a payment platform, that
    trade has a direct business value.
  body: >-
    Success was measured against the baseline established in research: 40+
    seconds to find a single transaction in the legacy interface. Post-launch,
    that interaction was tracked through session recordings and product
    analytics. The component system also reduced the time from design handoff to
    engineering implementation on subsequent features — validated across three
    new features shipped in the quarter after launch.
  lead: Revolutionizing
  accent: Escrow
  tail: As A Service
  linkLabel: Visit pandascrow.io
  url: https://pandascrow.io
---
