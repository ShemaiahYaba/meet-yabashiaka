interface ContactSectionProps {
  id: string;
}

export default function ContactSection({ id }: ContactSectionProps) {
  return (
    <section id={id} className="border-t border-border py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Get In Touch
          </h2>
          <p className="mt-4 text-base text-[hsl(var(--muted-foreground))] leading-relaxed">
            I&apos;m always open to discussing new projects, creative ideas, or
            opportunities to be part of an amazing team. Feel free to reach out!
          </p>
          <a
            href="mailto:shemaiahwambebe@gmail.com"
            className="mt-8 inline-block rounded-md bg-[hsl(var(--gh-green-emphasis))] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[hsl(var(--gh-green))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--gh-green))] focus:ring-offset-2 focus:ring-offset-background"
          >
            Say Hello
          </a>
        </div>
      </div>
    </section>
  );
}
