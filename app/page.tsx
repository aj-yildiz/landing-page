import Link from "next/link"
import { ArrowRight, CheckCircle, Mail, Menu, Users, Zap, Shield, Globe, Smartphone, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import SignupForm from "@/components/signup-form"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <span>Vastis</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#features" className="text-sm font-medium transition-colors hover:text-primary">
              Features
            </Link>
            <Link href="#about" className="text-sm font-medium transition-colors hover:text-primary">
              About
            </Link>
            <Link href="#faq" className="text-sm font-medium transition-colors hover:text-primary">
              FAQ
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button asChild>
              <Link href="#signup">Join Waitlist</Link>
            </Button>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-8 text-center">
              <div className="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm">
                <span className="font-medium">Coming Soon</span>
                <span className="ml-2 rounded-md bg-primary px-1.5 py-0.5 text-xs text-primary-foreground">Beta</span>
              </div>
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Transform Your Digital Experience with Vastis
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Join the waitlist for early access to the platform that's changing how people connect, create, and
                  collaborate online.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg">
                  <Link href="#signup">
                    Join Waitlist
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-1">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Free Trial</span>
                </div>
                <div className="flex items-center space-x-1">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>No Credit Card</span>
                </div>
                <div className="flex items-center space-x-1">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Cancel Anytime</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">What is Vastis?</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                  Vastis is a revolutionary digital platform designed to streamline workflows, enhance collaboration,
                  and empower teams to achieve extraordinary results in today's fast-paced digital landscape.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Globe className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Global Connectivity</h3>
                <p className="text-muted-foreground">
                  Connect with teams and clients worldwide through our unified communication platform that breaks down
                  geographical barriers.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <BarChart3 className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Smart Analytics</h3>
                <p className="text-muted-foreground">
                  Make data-driven decisions with our advanced analytics suite that provides real-time insights into
                  your business performance.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Smartphone className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Mobile First</h3>
                <p className="text-muted-foreground">
                  Access all features seamlessly across devices with our mobile-first design that ensures productivity
                  anywhere, anytime.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="signup" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-flex h-9 items-center justify-center rounded-full border border-primary px-4 py-2 text-sm font-medium text-primary">
                  <Mail className="mr-1 h-4 w-4" />
                  Join Our Waitlist
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Be the First to Experience Vastis
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                  Sign up now to get early access and exclusive benefits when we launch.
                </p>
              </div>
              <div className="mx-auto w-full max-w-md space-y-2">
                <SignupForm />
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-flex h-9 items-center justify-center rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                  Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Everything You Need</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                  Vastis provides all the tools you need to succeed in today's digital landscape.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 shadow-sm"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                  <p className="text-center text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-flex h-9 items-center justify-center rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                  FAQ
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Frequently Asked Questions</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                  Find answers to common questions about Vastis.
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-3xl space-y-4 py-12">
              {faqs.map((faq, index) => (
                <div key={index} className="rounded-lg border bg-background p-6">
                  <h3 className="font-medium">{faq.question}</h3>
                  <p className="mt-2 text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="cta" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Ready to Get Started?</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                  Join thousands of satisfied users who are already using Vastis to transform their digital experience.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg">
                  <Link href="#signup">
                    Join Waitlist
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t bg-background py-6 md:py-12">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row px-4 md:px-6">
          <div className="flex items-center gap-2 font-bold">
            <span>Vastis</span>
          </div>
          <nav className="flex gap-4 sm:gap-6">
            <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
              Terms of Service
            </Link>
          </nav>
          <div className="text-sm text-muted-foreground">© {new Date().getFullYear()} Vastis. All rights reserved.</div>
        </div>
      </footer>
    </div>
  )
}

const features = [
  {
    title: "Seamless Integration",
    description: "Connect with your favorite tools and services without any hassle.",
    icon: <CheckCircle className="h-6 w-6 text-primary" />,
  },
  {
    title: "Advanced Analytics",
    description: "Gain insights into your performance with detailed analytics and reporting.",
    icon: <BarChart3 className="h-6 w-6 text-primary" />,
  },
  {
    title: "Secure Platform",
    description: "Your data is protected with enterprise-grade security measures.",
    icon: <Shield className="h-6 w-6 text-primary" />,
  },
  {
    title: "24/7 Support",
    description: "Our team is always available to help you with any issues or questions.",
    icon: <Users className="h-6 w-6 text-primary" />,
  },
  {
    title: "Customizable Workflows",
    description: "Create workflows that match your specific needs and requirements.",
    icon: <Zap className="h-6 w-6 text-primary" />,
  },
  {
    title: "Mobile Friendly",
    description: "Access your account and manage your projects from any device.",
    icon: <Smartphone className="h-6 w-6 text-primary" />,
  },
]

const faqs = [
  {
    question: "What is Vastis?",
    answer:
      "Vastis is a comprehensive digital platform designed to help individuals and teams streamline their workflows, improve collaboration, and achieve better results through advanced tools and analytics.",
  },
  {
    question: "How do I get started with Vastis?",
    answer:
      "Simply sign up for our waitlist, and you'll be among the first to know when we launch. Once you're in, our onboarding process will guide you through setting up your account and getting started.",
  },
  {
    question: "Is Vastis suitable for small businesses?",
    answer:
      "Vastis is designed to scale with your business, from individual users to large enterprises. Our flexible pricing and feature sets accommodate businesses of all sizes.",
  },
  {
    question: "What kind of support do you offer?",
    answer:
      "We provide 24/7 customer support through multiple channels including live chat, email, and phone. Our dedicated support team is always ready to help you succeed.",
  },
]
