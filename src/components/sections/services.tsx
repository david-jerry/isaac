import { services, servicesIntro } from "@/data/services"
import { SectionMarker } from "@/components/layout/section-marker"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

export function Services() {
  return (
    <section
      id="services"
      className="mx-auto w-full max-w-6xl scroll-mt-24 px-6 py-20"
    >
      <SectionMarker index="06" className="mb-16" />

      <ScrollReveal className="grid gap-12 md:grid-cols-2 md:gap-16">
        <div data-reveal className="md:pt-2">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Explore, Create, Refine<span className="text-brand">.</span>
          </h2>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
            {servicesIntro}
          </p>
        </div>

        <Accordion
          type="single"
          collapsible
          defaultValue={services[0]?.id}
          className="w-full"
        >
          {services.map((service) => (
            <AccordionItem key={service.id} value={service.id} data-reveal>
              <AccordionTrigger className="text-2xl font-semibold tracking-tight sm:text-3xl">
                {service.title}
              </AccordionTrigger>
              <AccordionContent>
                <p className="max-w-md leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
                <ul className="mt-5 space-y-1.5 divide-y">
                  {service.items.map((item) => (
                    <li key={item} className="text-sm text-brand pb-2.5">
                      {item}
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </ScrollReveal>
    </section>
  )
}
