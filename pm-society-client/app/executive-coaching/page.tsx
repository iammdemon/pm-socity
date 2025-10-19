import {
  ChevronRight,
  CheckCircle,
  Users,
  Calendar,
  Target,
  Award,
  BookOpen,
  UserCheck,
  Clock,
  Shield,
  MessageSquare,
  ArrowRight,
  Star,
  Lightbulb,
  TrendingUp,
  Handshake,
  Zap,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

export default function CoachingMentoringPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header/>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-muted to-muted/50 z-0"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Coaching & <span className="text-muted-foreground">Mentoring</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl mb-8 max-w-3xl mx-auto text-muted-foreground leading-relaxed">
              Accelerate your professional development with personalized coaching and mentoring from certified project management professionals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 w-full sm:w-auto">
                Schedule Your First Session
              </Button>
              <Button variant="outline" size="lg" className="border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black w-full sm:w-auto">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="coaching" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6 sm:mb-8">
              <TabsTrigger value="coaching" className="text-sm sm:text-base">Coaching</TabsTrigger>
              <TabsTrigger value="mentoring" className="text-sm sm:text-base">Mentoring</TabsTrigger>
              <TabsTrigger value="guidelines" className="text-sm sm:text-base">Guidelines</TabsTrigger>
            </TabsList>

            {/* Coaching Section */}
            <TabsContent value="coaching" className="mt-6 sm:mt-8">
              <div className="space-y-8 sm:space-y-10">
                <div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Professional Coaching</h2>
                  <p className="text-base sm:text-lg mb-4 sm:mb-6 text-muted-foreground leading-relaxed">
                    At The PM Society, coaching is an integral part of your professional development journey. You&apos;re learning, growing, and pushing toward a new level of excellence.
                  </p>
                  <p className="text-base sm:text-lg mb-6 sm:mb-8 text-muted-foreground leading-relaxed">
                    Coaching provides you the space, structure, and support to help you gain clarity, strengthen your strategy, and stay accountable to your goals—whether you&apos;re preparing for certification, transitioning into project management, or aiming for your next promotion.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Our coaching sessions are designed to help you:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <Card className="hover:shadow-lg transition-all duration-300 h-full">
                      <CardHeader className="pb-4">
                        <div className="flex items-center">
                          <div className="p-2 bg-secondary rounded-lg mr-3 sm:mr-4">
                            <Target className="w-5 h-5 sm:w-6 sm:h-6" />
                          </div>
                          <CardTitle className="text-lg sm:text-xl">Identify and overcome barriers</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-muted-foreground text-sm sm:text-base">
                          Identify and overcome barriers that may be holding you back.
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card className="hover:shadow-lg transition-all duration-300 h-full">
                      <CardHeader className="pb-4">
                        <div className="flex items-center">
                          <div className="p-2 bg-secondary rounded-lg mr-3 sm:mr-4">
                            <Award className="w-5 h-5 sm:w-6 sm:h-6" />
                          </div>
                          <CardTitle className="text-lg sm:text-xl">Build confidence</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-muted-foreground text-sm sm:text-base">
                          Build the confidence and mindset needed to lead effectively.
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card className="hover:shadow-lg transition-all duration-300 h-full">
                      <CardHeader className="pb-4">
                        <div className="flex items-center">
                          <div className="p-2 bg-secondary rounded-lg mr-3 sm:mr-4">
                            <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />
                          </div>
                          <CardTitle className="text-lg sm:text-xl">Actionable plans</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-muted-foreground text-sm sm:text-base">
                          Turn your career goals into actionable plans.
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card className="hover:shadow-lg transition-all duration-300 h-full">
                      <CardHeader className="pb-4">
                        <div className="flex items-center">
                          <div className="p-2 bg-secondary rounded-lg mr-3 sm:mr-4">
                            <Star className="w-5 h-5 sm:w-6 sm:h-6" />
                          </div>
                          <CardTitle className="text-lg sm:text-xl">Long-term success</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-muted-foreground text-sm sm:text-base">
                          Align your personal values and career vision for long-term success.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <Card className="bg-secondary/30">
                  <CardContent className="pt-6 sm:pt-8">
                    <p className="text-base sm:text-lg leading-relaxed">
                      Think of coaching as your professional accelerator — it helps you process, apply, and elevate what you&apos;re learning so you can reach your goals faster and with greater confidence.
                    </p>
                  </CardContent>
                </Card>

                <div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">What to Expect from Coaching</h3>
                  <p className="text-base sm:text-lg mb-4 sm:mb-6 text-muted-foreground leading-relaxed">
                    Each member receives private coaching sessions with a certified coach. These sessions are structured around The PM Success Coaching Framework:
                  </p>
                  <div className="flex flex-col  gap-2 sm:gap-4 mb-6 sm:mb-8">
                    <Badge variant="outline" className="text-sm sm:text-base py-2 px-3 sm:px-4 justify-center text-center">
                      Phase I - Reveal – Clarify the Destination
                    </Badge>
                    <Badge variant="outline" className="text-sm sm:text-base py-2 px-3 sm:px-4 justify-center text-center">
                      Phase II - Rebuild – Strengthen the Core
                    </Badge>
                    <Badge variant="outline" className="text-sm sm:text-base py-2 px-3 sm:px-4 justify-center text-center">
                      Phase III - Rise – Elevate and Execute
                    </Badge>
                  </div>
                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                    Your coach will meet you where you are — whether you&apos;re just starting your project management journey or are a seasoned professional ready for your next challenge.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">For Those New to Coaching</h3>
                  <p className="text-base sm:text-lg mb-4 sm:mb-6 text-muted-foreground leading-relaxed">
                    If you&apos;ve never worked with a coach before, you&apos;re not alone! Here&apos;s what you can expect:
                  </p>
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-sm sm:text-base">It&apos;s a conversation, not an evaluation.</p>
                        <p className="text-muted-foreground text-sm sm:text-base">Coaching is about discovery, not judgment.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-sm sm:text-base">You lead the direction.</p>
                        <p className="text-muted-foreground text-sm sm:text-base">Your coach helps you clarify goals and design your own solutions.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-sm sm:text-base">It&apos;s confidential.</p>
                        <p className="text-muted-foreground text-sm sm:text-base">What you share in coaching stays between you and your coach.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-sm sm:text-base">You&apos;ll get homework — in a good way.</p>
                        <p className="text-muted-foreground text-sm sm:text-base">Each session ends with clear actions or reflections to help you progress.</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-base sm:text-lg mt-6 text-muted-foreground leading-relaxed">
                    Your coach&apos;s role is to help you think strategically, see new possibilities, and move forward with focus and confidence.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">The PM Success Coaching Framework</h3>
                  
                  <div className="space-y-4 sm:space-y-6">
                    <Card>
                      <CardHeader className="pb-4">
                        <div className="flex items-start">
                          <div className="flex-shrink-0 mr-3 sm:mr-4">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                              I
                            </div>
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-lg sm:text-xl mb-2">Phase I: Reveal - Clarify the Destination (Vision + Roadmap)</CardTitle>
                            <CardDescription className="text-sm sm:text-base">
                              Purpose: Establish clarity on the member&apos;s professional goals — whether that&apos;s certification success, transitioning into project management, or accelerating within their current career.
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="mb-4">
                          <h5 className="font-medium mb-2 text-sm sm:text-base">Focus Areas:</h5>
                          <ul className="space-y-1 sm:space-y-2 ml-4 sm:ml-6 list-disc text-sm sm:text-base">
                            <li className="text-muted-foreground">Identify career vision and short-term objectives (certification, job search, promotion, etc.)</li>
                            <li className="text-muted-foreground">Assess current skills, gaps, and challenges (technical, soft skills, mindset).</li>
                            <li className="text-muted-foreground">Explore mindset and confidence blockers that may slow progress.</li>
                          </ul>
                        </div>
                        <div className="p-3 sm:p-4 rounded-lg bg-secondary">
                          <p className="font-medium text-sm sm:text-base">Outcome:</p>
                          <p className="text-muted-foreground text-sm sm:text-base">
                            Member commits to an exam date and leaves with a clear destination and roadmap tailored to their journey.
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-4">
                        <div className="flex items-start">
                          <div className="flex-shrink-0 mr-3 sm:mr-4">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                              II
                            </div>
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-lg sm:text-xl mb-2">Phase II: Rebuild - Strengthen the Core (Skills + Strategy)</CardTitle>
                            <CardDescription className="text-sm sm:text-base">
                              Purpose: Build confidence and capability by focusing on the critical skills, tools, and strategies needed for success.
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="mb-4">
                          <h5 className="font-medium mb-2 text-sm sm:text-base">Focus Areas:</h5>
                          <ul className="space-y-1 sm:space-y-2 ml-4 sm:ml-6 list-disc text-sm sm:text-base">
                            <li className="text-muted-foreground">If Certification-focused → study strategies, test-taking techniques, time management.</li>
                            <li className="text-muted-foreground">If Career-focused → resume/LinkedIn optimization, interview prep, stakeholder communication.</li>
                            <li className="text-muted-foreground">Co-create a personalized roadmap (test prep strategy or career progression plan).</li>
                          </ul>
                        </div>
                        <div className="p-3 sm:p-4 rounded-lg bg-secondary">
                          <p className="font-medium text-sm sm:text-base">Outcome:</p>
                          <p className="text-muted-foreground text-sm sm:text-base">
                            Member leaves with 2–3 tailored strategies and practical tools to implement immediately.
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-4">
                        <div className="flex items-start">
                          <div className="flex-shrink-0 mr-3 sm:mr-4">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                              III
                            </div>
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-lg sm:text-xl mb-2">Phase III: Rise - Elevate and Execute (Action + Accountability)</CardTitle>
                            <CardDescription className="text-sm sm:text-base">
                              Purpose: Solidify momentum by translating goals and strategies into measurable action steps.
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="mb-4">
                          <h5 className="font-medium mb-2 text-sm sm:text-base">Focus Areas:</h5>
                          <ul className="space-y-1 sm:space-y-2 ml-4 sm:ml-6 list-disc text-sm sm:text-base">
                            <li className="text-muted-foreground">Review progress from Phase 2 and address challenges.</li>
                            <li className="text-muted-foreground">Finalize your action plan (study schedule, networking strategy, job application cadence, or promotion plan).</li>
                            <li className="text-muted-foreground">Define accountability structures (study groups, mentors, milestones).</li>
                          </ul>
                        </div>
                        <div className="p-3 sm:p-4 rounded-lg bg-secondary">
                          <p className="font-medium text-sm sm:text-base">Outcome:</p>
                          <p className="text-muted-foreground text-sm sm:text-base">
                            Member leaves with a concrete execution plan, built-in accountability, and confidence to rise in their career.
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                
                <Card className="bg-secondary/50">
                  <CardHeader>
                    <CardTitle className="text-xl sm:text-2xl">Ready to Begin?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 sm:space-y-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mr-3">
                          <Badge variant="secondary" className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-sm">
                            1
                          </Badge>
                        </div>
                        <p className="text-muted-foreground text-sm sm:text-base">
                          Reflect on the goal you are seeking to achieve with enrolling in this program.
                        </p>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mr-3">
                          <Badge variant="secondary" className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-sm">
                            2
                          </Badge>
                        </div>
                        <p className="text-muted-foreground text-sm sm:text-base">Schedule your first session.</p>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mr-3">
                          <Badge variant="secondary" className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-sm">
                            3
                          </Badge>
                        </div>
                        <p className="text-muted-foreground text-sm sm:text-base">Come ready to invest in You!</p>
                      </div>
                    </div>
                    <Button className="mt-4 sm:mt-6 bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 w-full sm:w-auto">
                      Schedule Your First Session
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Mentoring Section */}
            <TabsContent value="mentoring" className="mt-6 sm:mt-8">
              <div className="space-y-8 sm:space-y-10">
                <div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Professional Mentoring</h2>
                  <p className="text-base sm:text-lg mb-4 sm:mb-6 text-muted-foreground leading-relaxed">
                    The PM Society Mentorship connects you with a seasoned Project Management professional that is committed to helping you navigate real-world challenges, build confidence, and strengthen your project leadership mindset.
                  </p>
                  <p className="text-base sm:text-lg mb-6 sm:mb-8 text-muted-foreground leading-relaxed">
                    Mentorship offers a safe space for conversation, reflection, and guidance — whether you&apos;e managing complex projects, preparing for certification, or exploring project management as a new career path.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">What Mentoring Is — and How It Differs from Coaching</h3>
                  <p className="text-base sm:text-lg mb-4 sm:mb-6 text-muted-foreground leading-relaxed">
                    While both coaching and mentoring are powerful development tools, they serve different purposes within your program journey:
                  </p>
                  <div className="overflow-x-auto rounded-lg border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-1/2 text-sm sm:text-base">Coaching</TableHead>
                          <TableHead className="w-1/2 text-sm sm:text-base">Mentoring</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="align-top text-sm sm:text-base">
                            <p>Focuses on self-discovery and personal growth.</p>
                          </TableCell>
                          <TableCell className="align-top text-sm sm:text-base">
                            <p>Focuses on sharing experience and professional guidance.</p>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="align-top text-sm sm:text-base">
                            <p>Structured, goal-oriented sessions following a specific framework.</p>
                          </TableCell>
                          <TableCell className="align-top text-sm sm:text-base">
                            <p>Flexible, conversational sessions guided by your immediate needs.</p>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="align-top text-sm sm:text-base">
                            <p>Designed to help you uncover your own solutions.</p>
                          </TableCell>
                          <TableCell className="align-top text-sm sm:text-base">
                            <p>Designed to help you learn from someone who&apos;s &apos;been there.&apos;</p>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">What to Expect from Mentoring</h3>
                  <p className="text-base sm:text-lg mb-4 sm:mb-6 text-muted-foreground leading-relaxed">
                    The private mentoring sessions with a PM professional are designed to be focused and flexible, providing valuable insight and guidance in real time.
                  </p>
                  <p className="text-base sm:text-lg mb-4 sm:mb-6 text-muted-foreground leading-relaxed">
                    During your sessions, you may choose to discuss:
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <Card className="hover:shadow-lg transition-all duration-300 h-full">
                      <CardHeader className="pb-4">
                        <div className="flex items-center">
                          <div className="p-2 bg-secondary rounded-lg mr-3 sm:mr-4">
                            <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" />
                          </div>
                          <CardTitle className="text-lg sm:text-xl">Project Challenges</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-muted-foreground text-sm sm:text-base">
                          Challenges in your current project or role
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card className="hover:shadow-lg transition-all duration-300 h-full">
                      <CardHeader className="pb-4">
                        <div className="flex items-center">
                          <div className="p-2 bg-secondary rounded-lg mr-3 sm:mr-4">
                            <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />
                          </div>
                          <CardTitle className="text-lg sm:text-xl">Career Transitions</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-muted-foreground text-sm sm:text-base">
                          Career transitions or exploring new opportunities in project management
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card className="hover:shadow-lg transition-all duration-300 h-full">
                      <CardHeader className="pb-4">
                        <div className="flex items-center">
                          <div className="p-2 bg-secondary rounded-lg mr-3 sm:mr-4">
                            <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />
                          </div>
                          <CardTitle className="text-lg sm:text-xl">Test Preparation</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-muted-foreground text-sm sm:text-base">
                          Test preparation concerns or strategies for certification success
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card className="hover:shadow-lg transition-all duration-300 h-full">
                      <CardHeader className="pb-4">
                        <div className="flex items-center">
                          <div className="p-2 bg-secondary rounded-lg mr-3 sm:mr-4">
                            <Users className="w-5 h-5 sm:w-6 sm:h-6" />
                          </div>
                          <CardTitle className="text-lg sm:text-xl">Team Dynamics</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-muted-foreground text-sm sm:text-base">
                          Navigating stakeholder communication, leadership, or team dynamics
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <Card className="bg-secondary/30 mt-4 sm:mt-6">
                    <CardContent className="pt-6 sm:pt-8">
                      <p className="text-base sm:text-lg leading-relaxed">
                        Mentorship sessions are not ongoing relationships — they are time-bound conversations meant to provide targeted guidance and actionable advice.
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Transitioning Into Project Management</h3>
                  <p className="text-base sm:text-lg mb-4 sm:mb-6 text-muted-foreground leading-relaxed">
                    If you are new to project management or seeking to make a formal career transition, mentorship can help you:
                  </p>
                  
                  <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                      <p className="text-muted-foreground text-sm sm:text-base">
                        Identify transferable skills from your previous experience
                      </p>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                      <p className="text-muted-foreground text-sm sm:text-base">
                        Learn how to position yourself for PM opportunities
                      </p>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                      <p className="text-muted-foreground text-sm sm:text-base">
                        Gain perspective on certifications, tools, and methodologies most relevant to beginners
                      </p>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                      <p className="text-muted-foreground text-sm sm:text-base">
                        Build early confidence by learning from a mentor who once started where you are
                      </p>
                    </div>
                  </div>
                  
                  <Card className="bg-secondary/30">
                    <CardContent className="pt-6 sm:pt-8">
                      <p className="text-base sm:text-lg leading-relaxed">
                        Your mentor&apos;s role is to share real-world insight, lessons learned, and encouragement as you take your first steps into the profession. Members seeking to transition into Project Management should complete their first mentor session prior to their first coaching to ensure this is the path they want to take.
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <Card className="bg-secondary/50">
                  <CardHeader>
                    <CardTitle className="text-xl sm:text-2xl">Ready to Begin?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-base sm:text-lg mb-4 sm:mb-6 text-muted-foreground leading-relaxed">
                      Schedule your first session and bring your questions, goals, and curiosity
                    </p>
                    <Button className="bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 w-full sm:w-auto">
                      Schedule Your First Session
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Guidelines Section */}
            <TabsContent value="guidelines" className="mt-6 sm:mt-8">
              <div className="space-y-8 sm:space-y-10">
                <div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Coaching/Mentoring Guidelines</h2>
                  <p className="text-base sm:text-lg mb-4 sm:mb-6 text-muted-foreground leading-relaxed">
                    These guidelines are designed to create a respectful, productive, and impactful experience for both members and coaches/mentors. We want to ensure that every member receives the structure, accountability, and respect they need to thrive in their professional journey. Remember, this program is an investment in You!
                  </p>
                  <p className="text-base sm:text-lg mb-6 sm:mb-8 text-muted-foreground leading-relaxed">
                    Please review the guidelines carefully prior to beginning your engagement.
                  </p>
                </div>

                <Accordion type="single" collapsible className="w-full space-y-3 sm:space-y-4">
                  <AccordionItem value="item-1" className="border rounded-lg px-1">
                    <AccordionTrigger className="text-left px-4 py-3 sm:py-4 hover:no-underline">
                      <div className="flex items-center">
                        <div className="p-2 bg-secondary rounded-lg mr-3 sm:mr-4">
                          <Calendar className="w-5 h-5 sm:w-6 sm:h-6" />
                        </div>
                        <span className="text-lg sm:text-xl font-semibold">1. Program Timeline</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      <div className="pl-14 space-y-3 sm:space-y-4">
                        <div className="flex items-start">
                          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                          <p className="text-muted-foreground text-sm sm:text-base">
                            You may complete your 1st coaching session immediately post registration, and it must be completed by the end of Week 1 of your training program.
                          </p>
                        </div>
                        <div className="flex items-start">
                          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                          <p className="text-muted-foreground text-sm sm:text-base">
                            Members seeking to transition into Project Management, should first complete their first Mentor session prior to their first coaching, so an exception to the above guideline will be provided.
                          </p>
                        </div>
                        <div className="flex items-start">
                          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                          <p className="text-muted-foreground text-sm sm:text-base">
                            All coaching/mentoring sessions must be completed within 90 days of your program start date.
                          </p>
                        </div>
                        <div className="flex items-start">
                          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                          <p className="text-muted-foreground text-sm sm:text-base">
                            Extensions may be granted only in exceptional circumstances and must be approved in advance.
                          </p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2" className="border rounded-lg px-1">
                    <AccordionTrigger className="text-left px-4 py-3 sm:py-4 hover:no-underline">
                      <div className="flex items-center">
                        <div className="p-2 bg-secondary rounded-lg mr-3 sm:mr-4">
                          <Clock className="w-5 h-5 sm:w-6 sm:h-6" />
                        </div>
                        <span className="text-lg sm:text-xl font-semibold">2. Session Scheduling & Attendance</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      <div className="pl-14 space-y-3 sm:space-y-4">
                        <div className="flex items-start">
                          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                          <p className="text-muted-foreground text-sm sm:text-base">
                            Coaching/mentoring sessions are available by appointment only and must be scheduled through The PM Society Portal.
                          </p>
                        </div>
                        <div className="flex items-start">
                          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                          <p className="text-muted-foreground text-sm sm:text-base">
                            Please arrive on time. If you are late, your session will still end at the scheduled time.
                          </p>
                        </div>
                        <div className="flex items-start">
                          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                          <p className="text-muted-foreground text-sm sm:text-base">
                            If you need to reschedule, you must do so 24 hours in advance.
                          </p>
                        </div>
                        <div className="flex items-start">
                          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                          <p className="text-muted-foreground text-sm sm:text-base">
                            No-shows, same-day cancellations, and tardiness in excess of 15 minutes may result in forfeiting that session.
                          </p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3" className="border rounded-lg px-1">
                    <AccordionTrigger className="text-left px-4 py-3 sm:py-4 hover:no-underline">
                      <div className="flex items-center">
                        <div className="p-2 bg-secondary rounded-lg mr-3 sm:mr-4">
                          <Handshake className="w-5 h-5 sm:w-6 sm:h-6" />
                        </div>
                        <span className="text-lg sm:text-xl font-semibold">3. Coaching Commitment</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      <div className="pl-14 space-y-3 sm:space-y-4">
                        <div className="flex items-start">
                          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                          <p className="text-muted-foreground text-sm sm:text-base">
                            Coaching is a collaborative process — your active participation and honesty are essential.
                          </p>
                        </div>
                        <div className="flex items-start">
                          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                          <p className="text-muted-foreground text-sm sm:text-base">
                            Coaching works best when members are open to feedback.
                          </p>
                        </div>
                        <div className="flex items-start">
                          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                          <p className="text-muted-foreground text-sm sm:text-base">
                            Members are expected to complete any agreed-upon reflections, exercises, or action items between sessions.
                          </p>
                        </div>
                        <div className="flex items-start">
                          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                          <p className="text-muted-foreground text-sm sm:text-base">
                            Bring your goals, challenges, and questions to each session — your coach will meet you where you are.
                          </p>
                        </div>
                        <div className="flex items-start">
                          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                          <p className="text-muted-foreground text-sm sm:text-base">
                            Your progress depends on your commitment and follow-through.
                          </p>
                        </div>
                        <div className="flex items-start">
                          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                          <p className="text-muted-foreground text-sm sm:text-base">
                            The coach&apos;s role is to support and challenge you — not to do the work for you.
                          </p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4" className="border rounded-lg px-1">
                    <AccordionTrigger className="text-left px-4 py-3 sm:py-4 hover:no-underline">
                      <div className="flex items-center">
                        <div className="p-2 bg-secondary rounded-lg mr-3 sm:mr-4">
                          <UserCheck className="w-5 h-5 sm:w-6 sm:h-6" />
                        </div>
                        <span className="text-lg sm:text-xl font-semibold">4. Mentorship Expectations</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      <div className="pl-14 space-y-3 sm:space-y-4">
                        <div className="flex items-start">
                          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                          <p className="text-muted-foreground text-sm sm:text-base">
                            The mentoring relationship should begin with a brief discussion of goals or focus areas to guide conversations.
                          </p>
                        </div>
                        <div className="flex items-start">
                          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                          <p className="text-muted-foreground text-sm sm:text-base">
                            Mentees should come prepared with topics, questions, or challenges they&apos;d like to discuss to make the most of each session.
                          </p>
                        </div>
                        <div className="flex items-start">
                          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                          <p className="text-muted-foreground text-sm sm:text-base">
                            Mentoring works best with open communication. Both parties should feel comfortable offering feedback to enhance the relationship.
                          </p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-5" className="border rounded-lg px-1">
                    <AccordionTrigger className="text-left px-4 py-3 sm:py-4 hover:no-underline">
                      <div className="flex items-center">
                        <div className="p-2 bg-secondary rounded-lg mr-3 sm:mr-4">
                          <Shield className="w-5 h-5 sm:w-6 sm:h-6" />
                        </div>
                        <span className="text-lg sm:text-xl font-semibold">5. Confidentiality</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      <div className="pl-14 space-y-3 sm:space-y-4">
                        <div className="flex items-start">
                          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                          <p className="text-muted-foreground text-sm sm:text-base">
                            All private conversations are confidential. Information shared will not be disclosed to other members or instructors without your permission.
                          </p>
                        </div>
                        <div className="flex items-start">
                          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                          <p className="text-muted-foreground text-sm sm:text-base">
                            Relevant information may be shared amongst the Coaches, Mentors, and or Resume Writer in alignment of your success.
                          </p>
                        </div>
                        <div className="flex items-start">
                          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                          <p className="text-muted-foreground text-sm sm:text-base">
                            Insights may be shared anonymously and in aggregate with The PM Society staff to help improve the program.
                          </p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-6" className="border rounded-lg px-1">
                    <AccordionTrigger className="text-left px-4 py-3 sm:py-4 hover:no-underline">
                      <div className="flex items-center">
                        <div className="p-2 bg-secondary rounded-lg mr-3 sm:mr-4">
                          <Zap className="w-5 h-5 sm:w-6 sm:h-6" />
                        </div>
                        <span className="text-lg sm:text-xl font-semibold">6. Professional Boundaries</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      <div className="pl-14 space-y-3 sm:space-y-4">
                        <div className="flex items-start">
                          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                          <p className="text-muted-foreground text-sm sm:text-base">
                            Coaching is not therapy or counseling. It focuses on professional and personal development, goal achievement, and skill building.
                          </p>
                        </div>
                        <div className="flex items-start">
                          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                          <p className="text-muted-foreground text-sm sm:text-base">
                            Coaches will not offer job placement services or professional references.
                          </p>
                        </div>
                        <div className="flex items-start">
                          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                          <p className="text-muted-foreground text-sm sm:text-base">
                            Mentoring focuses on career guidance, knowledge sharing, and professional growth, not coaching, counseling, or personal advice outside the professional realm.
                          </p>
                        </div>
                        <div className="flex items-start">
                          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                          <p className="text-muted-foreground text-sm sm:text-base">
                            Mentors are not expected to provide job offers, referrals, or hiring recommendations.
                          </p>
                        </div>
                        <div className="flex items-start">
                          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                          <p className="text-muted-foreground text-sm sm:text-base">
                            Outside of the scheduled sessions, mentors are not expected to provide continuous support or personal consultation.
                          </p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-7" className="border rounded-lg px-1">
                    <AccordionTrigger className="text-left px-4 py-3 sm:py-4 hover:no-underline">
                      <div className="flex items-center">
                        <div className="p-2 bg-secondary rounded-lg mr-3 sm:mr-4">
                          <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6" />
                        </div>
                        <span className="text-lg sm:text-xl font-semibold">7. Feedback & Continuous Improvement</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      <div className="pl-14 space-y-3 sm:space-y-4">
                        <div className="flex items-start">
                          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                          <p className="text-muted-foreground text-sm sm:text-base">
                            Members are encouraged to provide feedback after each session to help improve the experience.
                          </p>
                        </div>
                        <div className="flex items-start">
                          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                          <p className="text-muted-foreground text-sm sm:text-base">
                            The PM Society may send a brief post-session evaluation survey at the end of your coaching and mentor engagement.
                          </p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-8" className="border rounded-lg px-1">
                    <AccordionTrigger className="text-left px-4 py-3 sm:py-4 hover:no-underline">
                      <div className="flex items-center">
                        <div className="p-2 bg-secondary rounded-lg mr-3 sm:mr-4">
                          <Award className="w-5 h-5 sm:w-6 sm:h-6" />
                        </div>
                        <span className="text-lg sm:text-xl font-semibold">8. Program Completion</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      <div className="pl-14 space-y-3 sm:space-y-4">
                        <div className="flex items-start">
                          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                          <p className="text-muted-foreground text-sm sm:text-base">
                            Upon completion of all three sessions, members will receive a Coaching Completion Summary highlighting goals, achievements, and next steps.
                          </p>
                        </div>
                        <div className="flex items-start">
                          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                          <p className="text-muted-foreground text-sm sm:text-base">
                            Continued coaching/mentoring sessions beyond the initial package are available for an additional fee or through a Society+ membership upgrade.
                          </p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Ready to Accelerate Your Career?</h2>
            <p className="text-base sm:text-lg mb-6 sm:mb-8 text-muted-foreground leading-relaxed">
              Take the first step toward achieving your project management goals with personalized coaching and mentoring.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 w-full sm:w-auto">
                Schedule Your First Session
              </Button>
              <Button variant="outline" size="lg" className="border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black w-full sm:w-auto">
                Learn More About Membership
              </Button>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
}