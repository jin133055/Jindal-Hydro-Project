# Task: Add Carousel to "Clients & Industrial Brands" section on /about

## Details
- URL: http://127.0.0.1:5173/about
- Section: "Clients & Industrial Brands" (currently static text-only logo grid)
- Requirement: brand images/logo ABOVE the brand name, carousel scrolling, responsive on mobile & different screens.

## Plan Steps
- [x] 1. Read `src/App.jsx` to locate the About page "Clients & Industrial Brands" section
- [x] 2. Read `styles.css` to understand existing carousel patterns and responsive rules
- [x] 3. Replace `trustedClients` text array with rich `clientBrands` data (name, initials/logo, industry, brand colors)
- [x] 4. Add `BrandLogo` component (inline SVG brand logo image)
- [x] 5. Add `ClientsCarousel` component (scroll track, logo above name, arrow controls, drag/swipe, auto-advance)
- [x] 6. Replace static `.client-logo-grid` markup in `AboutPage` with `<ClientsCarousel />`
- [x] 7. Add carousel CSS + responsive rules in `styles.css`
- [x] 8. Verify on http://127.0.0.1:5173/about (build check passed)

## Notes
- No real logo image assets exist in the project, so inline SVG brand emblems are used (crisp on all screens).
- Reuses existing scroll-snap carousel patterns from the codebase.
</content>
