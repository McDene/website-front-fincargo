"use client";

import {
  EnvelopeIcon,
  MagnifyingGlassCircleIcon,
  PuzzlePieceIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/outline";
import { useTranslation } from "@/hooks/useTranslation";

export default function SectionApiProcess() {
  const { t } = useTranslation();
  const steps = [
    {
      title: t("api.process.step1.title"),
      desc: t("api.process.step1.desc"),
      Icon: EnvelopeIcon,
    },
    {
      title: t("api.process.step2.title"),
      desc: t("api.process.step2.desc"),
      Icon: MagnifyingGlassCircleIcon,
    },
    {
      title: t("api.process.step3.title"),
      desc: t("api.process.step3.desc"),
      Icon: PuzzlePieceIcon,
    },
    {
      title: t("api.process.step4.title"),
      desc: t("api.process.step4.desc"),
      Icon: RocketLaunchIcon,
    },
  ] as const;
  return (
    <section className="relative py-14 md:py-20 px-4">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-8 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-darkBlue">
            {t("api.process.title")}
          </h2>
          <p className="mt-2 text-slate-700 text-lg">
            {t("api.process.subtitle")}
          </p>
        </div>

        {/* Timeline/Stepper */}
        <div className="relative">
          {/* line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 hidden md:block w-px bg-gradient-to-b from-darkBlue via-slate-200 to-black" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {steps.map(({ title, desc, Icon }, idx) => (
              <div
                key={title}
                className={`relative rounded-2xl border border-slate-200 bg-white/90 p-5 md:p-6 shadow-sm ring-1 ring-slate-900/5 ${
                  idx % 2 === 0 ? "md:col-start-1" : "md:col-start-2"
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-lightBlue/15 text-darkBlue ring-1 ring-lightBlue/30">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">
                      {title}
                    </h3>
                    <p className="mt-1 text-slate-700 text-sm md:text-[15px]">
                      {desc}
                    </p>
                  </div>
                </div>
                {/* step number chip */}
                <span className="absolute -top-3 right-4 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-darkBlue to-black px-3 py-1 text-white text-xs font-semibold ring-1 ring-white/20">
                  {t("api.process.step_chip")} {idx + 1}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
