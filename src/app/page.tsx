
import { portfolioData } from '@/data/portfolio-data';
import Header from '@/components/header';
import HeroSection from '@/components/hero-section';
import AboutSection from '@/components/about-section';
import SkillsSection from '@/components/skills-section';
import WorkSection from '@/components/work-section';
import ContactSection from '@/components/contact-section';
import Footer from '@/components/footer';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header resumeUrl={portfolioData.resumeUrl} socialLinks={portfolioData.socialLinks} />
      <main className="flex-1">
        <HeroSection
          name={portfolioData.fullName}
          hebrewName={portfolioData.hebrewName}
          tagline={portfolioData.tagline}
          stats={portfolioData.stats}
        />
        <AboutSection
          id="about"
          bio={portfolioData.bio}
          education={portfolioData.education}
          certifications={portfolioData.certifications}
        />
        <SkillsSection
          id="skills"
          skills={portfolioData.skills}
          techStack={portfolioData.techStack}
          buzzwords={portfolioData.buzzwords}
        />
        <WorkSection id="work" projects={portfolioData.workShowcase} />
        <ContactSection id="contact" />
      </main>
      <Footer socialLinks={portfolioData.socialLinks} />
    </div>
  );
}
