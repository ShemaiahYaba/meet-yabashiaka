
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, GraduationCap, Award, Eye } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import Image from 'next/image';

interface Education {
  degree: string;
  university: string;
}

interface Certification {
  name: string;
  issuer: string;
  url: string;
}

interface AboutSectionProps {
  id: string;
  bio: string;
  education: Education;
  certifications: Certification[];
}

export default function AboutSection({ id, bio, education, certifications }: AboutSectionProps) {
  return (
    <section id={id} className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">About Me</h2>
            <p className="mt-4 text-lg text-muted-foreground">A little bit about my journey and qualifications.</p>
          </div>
          <div className="grid grid-cols-1 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Briefcase className="h-6 w-6 text-primary" />
                  Biography
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{bio}</p>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <GraduationCap className="h-6 w-6 text-primary" />
                    Education
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <h3 className="font-semibold">{education.degree}</h3>
                  <p className="text-muted-foreground">{education.university}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Award className="h-6 w-6 text-primary" />
                    Certifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {certifications.map((cert) => (
                    <div key={cert.name} className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{cert.name}</h3>
                        <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                      </div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <button className="text-muted-foreground transition-all duration-300 hover:scale-110 hover:text-primary">
                            <Eye className="h-5 w-5" />
                            <span className="sr-only">View Certificate</span>
                          </button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl p-0">
                          <div className="relative aspect-video">
                            <Image src={cert.url} alt={`Certificate for ${cert.name}`} fill className="object-contain" />
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
