import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";

export default function Home() {
  const t = useTranslations("HomePage");

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-8 p-8 text-center">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-4xl font-bold tracking-tight">{t("title")}</h1>
        <p className="max-w-xl text-muted-foreground">{t("description")}</p>
      </div>
      <div className="flex gap-3">
        <Button asChild>
          <a href="https://github.com/alan2207/bulletproof-react">
            {t("architecture")}
          </a>
        </Button>
        <Button variant="outline" asChild>
          <a href="/README.md">{t("docs")}</a>
        </Button>
      </div>
    </main>
  );
}
