import { portfolioData } from "@/data/portfolio-data";
import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import ProfileSidebar from "@/components/profile-sidebar";
import SkillsSection from "@/components/skills-section";
import WorkSection from "@/components/work-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header
        resumeUrl={portfolioData.resumeUrl}
        socialLinks={portfolioData.socialLinks}
      />
      <main className="flex-1">
        {/* Terminal Hero — full width */}
        <HeroSection
          name={portfolioData.fullName}
          hebrewName={portfolioData.hebrewName}
          tagline={portfolioData.tagline}
          stats={portfolioData.stats}
        />

        {/* GitHub Profile Layout: Sidebar + Main Content */}
        <div className="container mx-auto px-4 md:px-6 pb-16">
          <div className="flex flex-col md:flex-row gap-8 md:gap-10">
            {/* Sidebar */}
            <div className="w-full md:w-[280px] md:flex-shrink-0">
              <div className="md:sticky md:top-[72px]">
                <ProfileSidebar
                  bio={portfolioData.bio}
                  education={portfolioData.education}
                  certifications={portfolioData.certifications}
                  stats={portfolioData.stats}
                  socialLinks={portfolioData.socialLinks}
                  resumeUrl={portfolioData.resumeUrl}
                />
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 min-w-0 space-y-10">
              <WorkSection id="work" projects={portfolioData.workShowcase} />
              <SkillsSection
                id="skills"
                skills={portfolioData.skills}
                techStack={portfolioData.techStack}
                buzzwords={portfolioData.buzzwords}
              />
              <ContactSection id="contact" />
            </div>
          </div>
        </div>
      </main>
      <Footer socialLinks={portfolioData.socialLinks} />
    </div>
  );
}
