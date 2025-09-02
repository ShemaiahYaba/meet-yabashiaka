
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Music4 } from 'lucide-react';
import Link from 'next/link';

export default function MusicPage() {
  return (
    <div className="bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="text-xl font-bold">
            Shemaiah<span className="text-primary">.</span>
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            <Link href="/#about" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">About</Link>
            <Link href="/#skills" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">Skills</Link>
            <Link href="/#work" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">Work</Link>
            <Link href="/music" className="text-sm font-medium text-primary">Music</Link>
            <Link href="/#contact" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">Contact</Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16 md:px-6 md:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <Music4 className="mx-auto h-16 w-16 text-primary" />
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">Music Portfolio</h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Welcome to my music corner. Here you'll find a selection of my productions, compositions, and sound design work.
          </p>
        </div>
        
        <div className="mt-16">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Coming Soon</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                This section is currently under construction. I'm busy mastering some new tracks and will be uploading them here shortly. Stay tuned!
              </p>
              <Button asChild className="mt-6">
                <Link href="/">Return to Home</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
