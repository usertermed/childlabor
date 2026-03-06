import { Navigation } from "@/components/Navigation";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Heart } from "lucide-react";

export default function GivePage() {
  const organizations = [
    {
      name: "Child Labor Coalition (CLC)",
      description: "The Child Labor Coalition (CLC) brings together more than 35 organizations to protect children from exploitation and to promote their health, safety, and education. Through advocacy and public awareness campaigns, they work to eliminate child labor and provide better opportunities for vulnerable youth worldwide.",
      link: "https://stopchildlabor.org/donate/",
    },
    {
      name: "UNICEF",
      description: "UNICEF works in over 190 countries and territories to save children's lives, to defend their rights, and to help them fulfill their potential. Their child protection programs focus on strengthening social services and education systems to prevent child labor at its roots.",
      link: "https://www.unicef.org/take-action",
    },
    {
      name: "Human Rights Watch",
      description: "Human Rights Watch is an international non-governmental organization that investigates and reports on abuses happening in all corners of the world. They advocate for stronger laws and corporate accountability to protect children from exploitative labor practices in global supply chains.",
      link: "https://donate.hrw.org/page/107245/donate/",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12 flex-grow">
        <header className="mb-12 text-center space-y-4">
          <div className="inline-flex items-center justify-center p-3 bg-accent/10 rounded-full mb-4">
            <Heart className="h-8 w-8 text-accent" />
          </div>
          <h1 className="text-4xl font-bold font-headline text-primary text-balance">Support the Mission</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Your contributions help authorized organizations implement the structural changes needed to end child labor worldwide.
          </p>
        </header>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {organizations.map((org, i) => (
            <Card key={i} className="flex flex-col hover:shadow-lg transition-shadow border-muted">
              <CardHeader>
                <CardTitle className="text-xl font-headline text-primary">{org.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {org.description}
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                  <a href={org.link} target="_blank" rel="noopener noreferrer">
                    Donate Now <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <section className="mt-20 p-8 rounded-2xl bg-primary text-primary-foreground text-center">
          <h2 className="text-2xl font-bold font-headline mb-4">Every Action Counts</h2>
          <p className="max-w-xl mx-auto opacity-90 mb-4">
            Beyond financial support, spreading awareness and advocating for fair-trade policies are powerful ways to contribute to a world where every child can enjoy their childhood.
          </p>
        </section>
      </main>
    </div>
  );
}
