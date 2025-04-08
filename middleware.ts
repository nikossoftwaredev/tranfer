import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  // A list of all locales that are supported
  locales: ["en-US", "el"],

  // Used when no locale matches
  defaultLocale: "en-US",

  // Domains can be used for locale-specific domain routing
  // domains: [
  //   {
  //     domain: 'poseidontransfers.gr',
  //     defaultLocale: 'el'
  //   },
  //   {
  //     domain: 'poseidontransfers.com',
  //     defaultLocale: 'en-US'
  //   }
  // ]
});

export const config = {
  // Match all pathnames except for
  // - ... files and folders inside /public
  // - ... files ending with extensions (e.g. favicon.ico)
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
