"use client";

import FeedbackError from "@/components/comman/feedback-error";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Home, RefreshCw, ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ErrorPage({ error, reset }: { error: Error; reset: () => void }) {
  const t = useTranslations();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        {/* Header Section */}
        <div className="space-y-4">
          <h1 className="text-6xl md:text-8xl font-bold text-foreground tracking-tight">Oops!</h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground">{t("somthing-wrong")}</h2>
          <div className="text-lg text-muted-foreground max-w-md mx-auto">
            <FeedbackError error={error.message || t("erro-backup")} />
          </div>
        </div>

        {/* Globe Animation */}
        <div className="relative flex justify-center items-center py-8">
          <div className="relative">
            {/* Animated Globe */}
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 shadow-2xl animate-spin-slow relative overflow-hidden">
              {/* Globe continents */}
              <div className="absolute inset-0 opacity-30">
                <div className="absolute top-8 left-12 w-16 h-12 bg-green-400 rounded-full transform rotate-12"></div>
                <div className="absolute top-16 right-8 w-12 h-8 bg-green-400 rounded-full transform -rotate-6"></div>
                <div className="absolute bottom-12 left-8 w-20 h-10 bg-green-400 rounded-full transform rotate-45"></div>
                <div className="absolute bottom-8 right-12 w-14 h-14 bg-green-400 rounded-full transform -rotate-12"></div>
              </div>

              {/* Globe highlight */}
              <div className="absolute top-4 left-8 w-16 h-16 bg-white opacity-20 rounded-full blur-xl"></div>
            </div>

            {/* Orbit ring */}
            <div className="absolute inset-0 border-2 border-accent/30 rounded-full animate-pulse"></div>

            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-indigo-600 rounded-full animate-bounce-slow"></div>
            <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-indigo-600 rounded-full animate-bounce-slow delay-150"></div>
          </div>
        </div>

        {/* Navigation Card */}
        <Card className="p-8 bg-card border border-border">
          <div className="space-y-6">
            <div className="flex items-center justify-center space-x-2 text-muted-foreground">
              <div className="w-8 h-8 rounded-full bg-indigo-600/10 flex items-center justify-center">
                <div className="w-4 h-4 bg-indigo-600 rounded-full"></div>
              </div>
              <span className="text-sm font-medium">{t("unexpected-error")}</span>
            </div>

            <p className="text-muted-foreground">{t("were-sorry-but-something")}</p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={() => window.history.back()}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t("go-back")}
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-accent text-accent hover:bg-indigo-600 hover:text-accent-foreground bg-indigo-500"
                onClick={() => (window.location.href = "/")}
              >
                <Home className="w-4 h-4 mr-2" />
                {t("home")}
              </Button>

              <Button
                size="lg"
                variant="ghost"
                className="text-muted-foreground  hover:text-foreground hover:bg-muted"
                onClick={() => reset()}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                {t("try-again")}
              </Button>
            </div>
          </div>
        </Card>

        {/* Footer */}
        <div className="text-sm text-muted-foreground space-y-2">
          <p>{t("need-help-contact")}</p>
        </div>
      </div>
    </div>
  );
}
