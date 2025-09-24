"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";

const faqs = [
  {
    id: "q1",
    q: "What is included in my course purchase?",
    a:
      "Your enrollment includes 35 hours of live, instructor-led PMP® training, PMP application support, executive coaching, mentorship, and access to PM learning materials through The Society.",
  },
  {
    id: "q2",
    q: "How much does the PMP® exam cost?",
    a:
      "PMI members pay $405, while non-members pay $555. PMI membership is optional but recommended, as it reduces the exam fee and provides additional study resources.",
  },
  {
    id: "q3",
    q: "Is the PMP® exam fee included in this package?",
    a: "No. The exam fee is paid directly to PMI when you apply for and schedule your test.",
  },
  {
    id: "q4",
    q: "How many questions are on the PMP® exam?",
    a:
      "The exam has 180 questions, and you’ll have 230 minutes (just under 4 hours) to complete it. Questions are a mix of multiple choice, multiple response, matching, hotspot, and limited fill-in-the-blank.",
  },
  {
    id: "q5",
    q: "What if I need to reschedule or cancel the exam?",
    a: "PMI charges a $70 rescheduling fee if you change your exam date within 30 days of your appointment.",
  },
  {
    id: "q6",
    q: "How long do I have access to the course materials?",
    a:
      "You’ll receive access to the learning portal and materials for 2 months (pilot) or the period stated in your package.",
  },
  {
    id: "q7",
    q: "Do I get a certificate of completion?",
    a: "Yes. After completing the 35 contact hours, you’ll receive a certificate to verify your eligibility to sit for the PMP® exam.",
  },
  {
    id: "q8",
    q: "Are payment plans available?",
    a: "Yes. We accept Afterpay, Klarna, and other installment options at checkout.",
  },
  {
    id: "q9",
    q: "What if I don’t pass the exam on the first try?",
    a:
      "You can retake the exam up to three times within your one-year eligibility period. PMI charges a reduced re-exam fee ($275 for members, $375 for non-members).",
  },
  {
    id: "q10",
    q: "Do I need project management experience before enrolling?",
    a:
      "Yes. PMI requires 36 months of project management experience (or 60 months if you don’t hold a bachelor’s degree). Don’t worry—we guide you step-by-step through the application to ensure you meet the requirements.",
  },
  {
    id: "q11",
    q: "Can I get a refund if I change my mind?",
    a: "Refund requests follow The PM Society’s policy listed on this site. Please review carefully before purchase.",
  },
  {
    id: "q12",
    q: "How long does PMP® certification last?",
    a: "The certification is valid for 3 years. To maintain it, you must earn 60 Professional Development Units (PDUs) within that cycle and report them to PMI.",
  },
  {
    id: "q13",
    q: "Is financial assistance available?",
    a:
      "While The PM Society does not currently offer direct scholarships or grants, many employers provide tuition reimbursement for professional certifications like the PMP®. We also make the course more accessible by offering installment plans through Afterpay and Klarna at checkout.",
  },
];

export default function PmpFaqCard() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py- bg-[#F5F6F8]">
      <Card className="w-full max-w-7xl mx-auto shadow-md border rounded-2xl">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl sm:text-3xl font-bold">
            Frequently Asked Questions
          </CardTitle>
          <CardDescription className="text-sm sm:text-base text-muted-foreground">
            Answers to common questions about our PMP® course and exam process.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f) => (
              <AccordionItem key={f.id} value={f.id}>
                <AccordionTrigger className="text-left text-base sm:text-lg font-medium">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm sm:text-base leading-relaxed">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <Separator />

          <div className="text-sm sm:text-base text-muted-foreground text-center">
            <p>
              Need more help? Contact our support or check the full policy page for
              details about refunds, scheduling, and PDUs.
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
