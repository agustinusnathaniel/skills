# Finding Authorities and Extracting Frameworks

Covers Steps 2–4 of the domain-research workflow: identifying canonical sources, researching them in parallel, verifying directly, and extracting frameworks.

## Recognizing Authority

Look for: established publications with named editors or authors, research arms with sustained output, practitioner-leaders who wrote the field's defining book.

Signals of authority: cited by other authorities, a book with staying power, a large practitioner subscriber base, referenced in university or accelerator materials.

For each resource, capture: name, URL, why it is authoritative, and its core framework or methodology.

## Starting Cheat Sheet

Starting points for common business domains (verify each before relying on it — authorities shift over time):

| Domain | Authority | Core Framework | Why Canonical |
|---|---|---|---|
| Engineering leadership | LeadDev | Shape Up, ADRs | Named home of eng leadership |
| Product | Lenny's Newsletter | RICE, PMF, JTBD | Large practitioner subscriber base |
| Sales | SaaStr | MEDDIC, Challenger | SaaS sales reference |
| Marketing | HubSpot Blog | Inbound, growth loops | Defined inbound marketing |
| Finance | Carta Learn, standard startup financial models | Unit economics, runway | Standard startup finance reference |
| Legal | Clerky Guides | Entity, IP, compliance | Standard for startup legal |
| Management | Radical Candor (Kim Scott) | Care/challenge, 1:1s, career frameworks | Widely adopted management framework |
| Operations | GitLab Handbook | Handbook-first, async | Reference model for documented ops |
| Org design | First Round Review | Decision frameworks, culture | Founder-level practitioner content |
| AI practices | AI Hero (aihero.dev) | Agent design, RAG patterns | Practical AI engineering without marketing |

Done when: every in-scope domain has at least one row with all four columns filled.

## Parallel Research Tracks

Run up to 3 research tracks simultaneously, each covering a group of domains. Give each track:

- The requester's goal (what is being designed or built)
- The specific authoritative URLs to target — never a generic "search for X"
- What to extract: resource name, URL, why authoritative, core framework, key books or articles, how current technology shifts change this function

Done when: every track returns substantive extracted content (not just search boilerplate); any thin track falls back to direct browsing.

## Direct Source Verification

Supplement track output by browsing the most important resources directly:

1. Confirm the site exists and is active.
2. Confirm the title and description match its reputation.
3. Confirm the core framework is identifiable from the source itself.
4. Extract key terminology in the domain's own words — e.g. Shape Up has "appetite", "betting table", "six-week cycle"; GitLab has "handbook-first", "CREDIT values".

Workarounds for blocked sites: many authoritative sites use heavy client-side rendering or bot protection. Try article-level direct URLs, subdomain variants (e.g. `review.firstround.com` instead of `firstround.com/review`), or the site's own search UI. If a site consistently blocks all access, note it and find an alternative source.

Done when: every cited framework links to a directly browsed page, and every blocked source is recorded as unverified.

## Framework Extraction Format

For each framework or methodology, capture all five fields:

- **Name** — what it is called (e.g. "MEDDIC", "RICE", "Shape Up")
- **What it solves** — qualification, prioritization, project management
- **The mechanism** — how it works in 1–2 sentences
- **Key terms** — domain-specific vocabulary
- **When to use** — enterprise vs SMB, early vs late stage

Done when: every framework entry has all five fields with no blanks.
