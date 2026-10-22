# Company and product repository

This directory is the source of truth for reusable company, product, specification,
funding, timeline, and public-financial-report metadata. Industry pages and Jeeling
consume the same records; neither owns a separate copy.

## Files

- `catalog.ts`: company profiles and site product matrices.
- `catalog-localization.ts`: English localization and localized accessors.
- `company-official-links.ts`: reviewed official website and profile entry points.
- `company-profile-visuals.ts`: reusable company-page visual assignments and alt text.
- `industry-landscape.ts`: shared company evidence profiles and value-chain chapters.
- `robodict-deep-research.ts`: source-backed company histories and model-level products.
- `robodict-phase-one.ts`: broad company and product-family coverage.
- `robodict-precision.ts`: structured component specifications.
- `product-finder-demo.ts`: shared finder record types and supporting records.
- `index.ts`: stable repository API, product routes, and financial disclosures.

The standalone repository consumes every company and structured product exposed
by the shared repository API. New records therefore receive bilingual company
and product routes automatically while retaining their declared model-level or
family-level coverage. Jeeling consumes the robotics subset of the same API;
enterprise-AI products remain available only in the broader metadata repository.
Catalog-summary records are explicitly marked as capability-level entries and
are not presented as completed model specifications.

## Evidence rules

- Keep facts, library judgment, and unknown fields separate.
- Do not infer a numerical specification from a product family or demonstration.
- A missing public financial report is not evidence that a private company has no
  financial information.
- Product images must retain the original source URL and credit.
- Every public URL should be checked before a release build.

## Adding data

1. Add or update the company profile.
2. Add one record per publicly identifiable product or product family.
3. Record parameters only when an official page, manual, filing, or named source
   supports them.
4. Add a financial-disclosure entry only after checking the company or exchange
   investor-relations source.
5. Run `npm run check`, `npm run build`, `npm run audit`, and `npm run check:links`.
