"use client";

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DollarSign, PieChart, TrendingUp, Shield } from "lucide-react";
import Header from "@/components/Header";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-green-50 to-white dark:from-green-900 dark:to-gray-900">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <TestimonialsSection />
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-white dark:bg-gray-800">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2025 ExpenseTracker. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-xs hover:underline underline-offset-4 text-gray-500 dark:text-gray-400"
            to="#"
          >
            Terms of Service
          </Link>
          <Link
            className="text-xs hover:underline underline-offset-4 text-gray-500 dark:text-gray-400"
            to="#"
          >
            Privacy Policy
          </Link>
        </nav>
      </footer>
    </div>
  );
}

function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-gray-800 dark:text-white">
              Take Control of Your Finances
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              Track expenses, set budgets, and achieve your financial goals with
              our easy-to-use expense tracker.
            </p>
          </div>
          <div className="space-x-4">
            <Button className="text-white">
              <Link to={"/login"}>Get started</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-800">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            icon={
              <DollarSign className="h-10 w-10 text-green-600 dark:text-green-400" />
            }
            title="Expense Tracking"
            description="Easily log and categorize your expenses in real-time."
          />
          <FeatureCard
            icon={
              <PieChart className="h-10 w-10 text-green-600 dark:text-green-400" />
            }
            title="Budget Planning"
            description="Set and manage budgets for different expense categories."
          />
          <FeatureCard
            icon={
              <TrendingUp className="h-10 w-10 text-green-600 dark:text-green-400" />
            }
            title="Financial Insights"
            description="Get visual reports and analytics on your spending habits."
          />
          <FeatureCard
            icon={
              <Shield className="h-10 w-10 text-green-600 dark:text-green-400" />
            }
            title="Secure & Private"
            description="Your financial data is encrypted and never shared."
          />
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="flex flex-col items-center text-center p-4 dark:bg-white rounded-lg">
      {icon}
      <h3 className="mt-4 text-xl font-semibold text-gray-800 dark:text-white">
        {title}
      </h3>
      <p className="mt-2 text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
}

function TestimonialsSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-green-50 dark:bg-white">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">
          What Our Users Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <TestimonialCard
            quote="ExpenseTracker has completely changed how I manage my finances. It's so easy to use!"
            author="Jane Doe"
            title="Freelancer"
          />
          <TestimonialCard
            quote="I've tried many expense trackers, but this one is by far the best. The insights are invaluable."
            author="John Smith"
            title="Small Business Owner"
          />
          <TestimonialCard
            quote="Thanks to ExpenseTracker, I finally have a clear picture of where my money is going each month."
            author="Emily Johnson"
            title="Student"
          />
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ quote, author, title }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <p className="text-gray-600 dark:text-gray-300 italic mb-4">
        &ldquo;{quote}&rdquo;
      </p>
      <p className="font-semibold text-gray-800 dark:text-white">{author}</p>
      <p className="text-gray-500 dark:text-gray-400">{title}</p>
    </div>
  );
}
