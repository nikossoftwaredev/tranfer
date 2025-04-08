import Link from "next/link";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";

export default function TourNotFound() {
  const t = useTranslations("Tours.notFound");
  const locale = useLocale();

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="text-center max-w-md p-6">
        <h2 className="text-3xl font-bold mb-3">{t("title")}</h2>
        <p className="text-muted-foreground mb-6">{t("message")}</p>
        <Link
          href={`/${locale}/#tours`}
          className="px-6 py-3 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium rounded-md inline-block"
        >
          {t("exploreButton")}
        </Link>
      </div>
    </div>
  );
}
