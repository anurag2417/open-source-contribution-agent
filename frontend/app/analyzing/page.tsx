"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { fetchProfileAnalysis } from "../../services/profileAnalysisService";

const steps = [
  "Fetching GitHub profile",
  "Analyzing repositories",
  "Detecting technologies",
  "Understanding interests",
  "Building contributor profile",
];

export default function AnalyzingPage() {
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const runAnalysis = async () => {
      try {
        const params = new URLSearchParams(window.location.search);

        const userParam = params.get("user");

        if (!userParam) {
          router.push("/");
          return;
        }

        const user = JSON.parse(
          decodeURIComponent(userParam),
        );

        for (let i = 0; i < steps.length; i++) {
          setCurrentStep(i);
          await new Promise((resolve) =>
            setTimeout(resolve, 600),
          );
        }

        const analysis = await fetchProfileAnalysis(
          user.username,
        );

        const encodedUser = encodeURIComponent(
          JSON.stringify(user),
        );

        const encodedAnalysis = encodeURIComponent(
          JSON.stringify(analysis),
        );

        router.push(
          `/dashboard?user=${encodedUser}&analysis=${encodedAnalysis}`,
        );
      } catch (error) {
        console.log(error);
        router.push("/dashboard");
      }
    };

    runAnalysis();
  }, [router]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-black text-white">
      <div className="w-full max-w-2xl rounded-3xl border border-cyan-500/20 bg-white/5 p-10">
        <h1 className="mb-8 text-center text-4xl font-bold text-cyan-400">
          Analyzing GitHub Profile
        </h1>

        <div className="space-y-4">
          {steps.map((step, index) => (
            <div
              key={step}
              className={`rounded-xl border p-4 transition-all ${
                index <= currentStep
                  ? "border-cyan-400 bg-cyan-400/10 text-cyan-300"
                  : "border-white/10 text-gray-500"
              }`}
            >
              {index <= currentStep ? "✓" : "○"} {step}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}