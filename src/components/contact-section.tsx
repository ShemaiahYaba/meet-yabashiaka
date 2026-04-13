interface ContactSectionProps {
  id: string;
}

export default function ContactSection({ id }: ContactSectionProps) {
  return (
    <section
      id={id}
      className="rounded-md border border-border bg-[hsl(var(--card))] p-6"
    >
      <h2 className="text-base font-semibold text-foreground mb-2">
        Get In Touch
      </h2>
      <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed mb-4">
        I&apos;m always open to discussing new projects, creative ideas, or
        opportunities to be part of an amazing team.
      </p>
      <a
        href="mailto:shemaiahwambebe@gmail.com"
        className="inline-block rounded-md bg-[hsl(var(--gh-green-emphasis))] px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-[hsl(var(--gh-green))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--gh-green))] focus:ring-offset-2 focus:ring-offset-background"
      >
        Say Hello
      </a>
    </section>
  );
}
