import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, GraduationCap, Award, Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";

interface Education {
  degree: string;
  university: string;
}

interface Certification {
  name: string;
  issuer: string;
  defaultImage: string;
}

interface AboutSectionProps {
  id: string;
  bio: string;
  education: Education;
  certifications: Certification[];
}

export default function AboutSection({
  id,
  bio,
  education,
  certifications,
}: AboutSectionProps) {
  return (
    <section id={id} className="border-t border-border py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              About Me
            </h2>
            <p className="mt-4 text-base text-[hsl(var(--muted-foreground))]">
              A little bit about my journey and qualifications.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6">
            <Card className="border border-border bg-[hsl(var(--card))] shadow-none">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-foreground">
                  <Briefcase className="h-5 w-5 text-primary" />
                  Biography
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[hsl(var(--muted-foreground))] leading-relaxed">
                  {bio}
                </p>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border border-border bg-[hsl(var(--card))] shadow-none">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-foreground">
                    <GraduationCap className="h-5 w-5 text-primary" />
                    Education
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <h3 className="font-semibold text-foreground">
                    {education.degree}
                  </h3>
                  <p className="text-[hsl(var(--muted-foreground))]">
                    {education.university}
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-border bg-[hsl(var(--card))] shadow-none">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-foreground">
                    <Award className="h-5 w-5 text-primary" />
                    Certifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {certifications.map((cert) => {
                    const imageSrc = cert.defaultImage || null;
                    return (
                      <div
                        key={cert.name}
                        className="flex items-center justify-between"
                      >
                        <div>
                          <h3 className="font-semibold text-foreground">
                            {cert.name}
                          </h3>
                          <p className="text-sm text-[hsl(var(--muted-foreground))]">
                            {cert.issuer}
                          </p>
                        </div>
                        {imageSrc && (
                          <Dialog>
                            <DialogTrigger asChild>
                              <button className="text-[hsl(var(--muted-foreground))] transition-colors hover:text-primary">
                                <Eye className="h-5 w-5" />
                                <span className="sr-only">
                                  View Certificate
                                </span>
                              </button>
                            </DialogTrigger>
                            <DialogContent className="max-w-3xl p-0 border border-border bg-[hsl(var(--card))]">
                              <DialogTitle className="sr-only">
                                {cert.name} certificate
                              </DialogTitle>
                              <div className="relative aspect-video">
                                <Image
                                  src={imageSrc}
                                  alt={`Certificate for ${cert.name}`}
                                  fill
                                  className="object-contain"
                                />
                              </div>
                            </DialogContent>
                          </Dialog>
                        )}
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
