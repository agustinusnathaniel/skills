# First-Party Fee and Tariff Research

Use this reference when researching seller payout, commission, or price-calculator formulas for marketplaces. Standard domain research accepts practitioner authorities; fee research does not — rates require first-party policy sources.

## Research Contract

Separate two things:

1. **Stable formula structure** — the fee base, components, caps, and order/item granularity.
2. **Mutable tariff data** — category rates, seller tiers, campaign discounts, effective dates, and exemptions.

Never present a platform as having one universal percentage when the official policy is category-, seller-, program-, or date-dependent.

Done when: every rate in the output is labeled with which of the two categories it belongs to.

## Source Hierarchy

1. First-party seller education and seller-center policy pages.
2. First-party seller agreements and linked rate tables.
3. First-party calculators, spreadsheet/PDF attachments, and policy update pages.
4. Secondary sources only to discover terminology or candidate URLs — never as the final authority for rates.

For every extracted rule, record:

```text
platform
sellerType
category / subcategory
feeName
basis: listed_price | after_seller_discount | per_order | per_item | shipping | payment
rate or fixed amount
cap
minimum / exemption
whether tax is included
announcedAt / effectiveFrom
source URL
```

Done when: every rule record has all eleven fields, and every rate traces to a hierarchy level 1–3 source.

## Dynamic Seller-Portal Workflow

1. Navigate directly to the first-party seller education site.
2. Use its own search box with the platform's native fee terminology.
3. Open the result and capture the article date, jurisdiction, effective date, formula text, tables, and attachment links.
4. If the page snapshot truncates the article, use DOM extraction (`document.body.innerText`) and collect matching anchor URLs from `document.querySelectorAll('a')`.
5. Register each source in a citation log immediately after retrieval. Never cite a search snippet as if it were the article body.
6. If a portal only exposes a login-gated or empty client-rendered shell, report the exact limitation and keep the rate unverified. Never fill the gap with a secondary blog's percentage.

Generic search engines often omit regional seller portals — prefer each portal's own search UI.

Done when: every rate is either verified against a retrieved first-party page or explicitly marked unverified with the blocking reason stated.

## Formula Normalization

Normalize each platform to a component list rather than a single rate:

```text
customerPaid = listedPrice - sellerFundedDiscount
percentageFees = sum(base_i * rate_i, subject to caps)
fixedFees = sum(order-level and item-level fees)
netProfit = customerPaid - HPP - packing - percentageFees - fixedFees - tax
```

The price solver finds the lowest price satisfying the target profit. Preserve each component's original basis; never silently apply all percentages to gross price.

Done when: the normalized formula reproduces a worked example from the first-party source.

## Implementation Note

A production calculator uses versioned tariff records, not hardcoded preset percentages:

```ts
type FeeRule = {
  platform: string
  sellerType: string
  category?: string
  basis: 'listed_price' | 'after_seller_discount' | 'per_order' | 'per_item'
  rateBps?: number
  fixedIdr?: number
  capIdr?: number
  taxIncluded: boolean
  effectiveFrom: string
  sourceUrl: string
}
```

Expose `sourceUrl`, `effectiveFrom`, and whether the rate is illustrative or verified in the UI. A current rate without provenance is not production-grade data.

Done when: every record carries source, effective date, and verification status.
