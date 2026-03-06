import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { ChevronRight, Globe2, BarChart3, ShieldCheck } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function Home() {
  const heroImg = PlaceHolderImages.find(img => img.id === "hero-image");

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative min-h-[500px] md:h-[600px] flex items-center overflow-hidden bg-primary text-white py-16 md:py-0">
          <div className="absolute inset-0 opacity-20">
            {heroImg && (
              <Image 
                src={heroImg.imageUrl} 
                alt={heroImg.description} 
                fill 
                className="object-cover"
                data-ai-hint={heroImg.imageHint}
                priority
              />
            )}
          </div>
          <div className="container mx-auto px-4 relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-center md:text-left">
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold font-headline leading-tight text-balance">
                There are nearly <span className="text-yellow-400">140M+</span> children working.
              </h1>
              <p className="text-lg sm:text-xl opacity-90 max-w-lg mx-auto md:mx-0 leading-relaxed text-balance">
                Understanding the data is the first step toward a fairer future for every child.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 w-full sm:w-auto">
                  <Link href="/stats">
                    View the stats <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="space-y-12">
              <div className="text-center space-y-4 mb-16">
                <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">The Reality of Child Labor</h2>
                <div className="h-1.5 w-20 bg-accent mx-auto rounded-full" />
              </div>

              <div className="grid gap-12 md:grid-cols-2 items-start">
                <div className="space-y-6">
                  <div className="flex items-center gap-3 text-primary">
                    <ShieldCheck className="h-6 w-6 text-accent" />
                    <h3 className="text-xl font-bold font-headline">What is Child Labor?</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    Child labor refers to work that is mentally, physically, socially, or morally dangerous and harmful to children. It deprives them of their childhood, their potential, and their dignity. Most importantly, it interferes with their ability to attend and succeed in school, trapping generations in a cycle of poverty.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    While not all work performed by children is classified as child labor, activities that exceed age-appropriate limits or involve hazardous conditions is.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-3 text-primary">
                    <BarChart3 className="h-6 w-6 text-accent" />
                    <h3 className="text-xl font-bold font-headline">Understanding the Stats</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    Current estimates from major organizations like UNICEF and the ILO claim that around 138 to 160 million children between the ages of 5 and 17 are involved in labor globally. That's nearly 1 in 10 children worldwide.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    This website visualizes this data to highlight regions where prevalence is highest, often exceeding 40% in some nations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-primary-foreground/5 text-foreground py-12 border-t mt-auto">
        <div className="container mx-auto px-4 grid md:grid-cols-4 gap-8">
          <div className="col-span-full md:col-span-2 text-center md:text-left">
            <h3 className="text-xl font-bold font-headline mb-4 text-primary">Child Labor Maps</h3>
            <p className="opacity-70 max-w-sm mx-auto md:mx-0 mb-6">
            </p>
            <p className="text-xs text-muted-foreground">© 2026 Damien Sullins</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
