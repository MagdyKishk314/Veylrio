import config from './index';

/**
 * Site-wide content & structure.
 * Edit copy and navigation here — views read from this object so the
 * structure stays consistent and is easy to maintain.
 *
 * Positioning: "Build your own outbound operation. Stop renting one."
 * Veylrio builds the outbound setup the client OWNS — dialer, CRM, caller
 * workflow, data process, reporting, and operating guidance.
 */

const brand = {
  name: 'Veylrio',
  legalName: 'Veylrio',
  slogan: 'Less Weight, More Momentum',
  domain: 'veylrio.com',
  email: config.contactEmail,
  // One-line descriptor reused across SEO + structured data.
  descriptor:
    'Veylrio helps businesses build their own outbound sales operation — the dialer, CRM, caller workflow, data process, reporting, and support needed to run it with control.',
};

const nav = [
  { label: 'Home', href: '/' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Why Veylrio', href: '/why-veylrio' },
  { label: 'Start a Project', href: '/start-a-project' },
];

const footerNav = [
  { label: 'Home', href: '/' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Why Veylrio', href: '/why-veylrio' },
  { label: 'Start a Project', href: '/start-a-project' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms', href: '/terms' },
];

const cta = {
  primary: { label: 'Build My Outbound System', href: '/start-a-project' },
  secondary: { label: 'Explore Solutions', href: '/solutions' },
};

/** Problem section — the cost of renting a black-box outbound operation. */
const problems = [
  'You pay every month but never really control the caller, CRM, recordings, or reporting.',
  'When performance drops, you cannot tell if it is the caller, data, script, market, dialer, or follow-up.',
  'Stop paying and the whole operation disappears — you keep nothing.',
  'Scripts, markets, and data only change as fast as the vendor responds.',
  'More of your spend goes to vendor margin than to the caller, the data, and the tools.',
  'You are renting access to someone else’s system instead of owning your own.',
];

/** "What You Own" — the operating asset that stays with the business. */
const ownItems = [
  'Your caller workflow',
  'Your dialer setup',
  'Your CRM and lead stages',
  'Your data process',
  'Your reporting',
  'Your call visibility',
  'Your scripts and adjustments',
  'Your operating process',
  'Your decisions',
];

/** Cost advantage copy. */
const costAdvantage = {
  body:
    'Cheaper does not mean weaker. In the Veylrio model you reduce dependency on recurring vendor margin and redirect more of the budget into the actual operation — stronger caller pay, better data, cleaner tech, better reporting, and systems you own.',
  callout:
    'The savings come from removing unnecessary middle margin — not from lowering the quality of the operation.',
};

/** Own vs Vendor comparison rows. */
const ownVsVendor = [
  {
    vendor: 'You pay a recurring bundled fee.',
    owned: 'You pay to build the operating setup you keep.',
  },
  {
    vendor: 'A large share of spend goes to vendor overhead and margin.',
    owned: 'More of the budget goes into caller quality, data, tools, and visibility.',
  },
  {
    vendor: 'You may not control the caller, script, recordings, CRM, or reporting.',
    owned: 'You own the caller workflow, CRM, dialer setup, reporting, recordings, and process.',
  },
  {
    vendor: 'Stop paying and you often lose the whole operation.',
    owned: 'The system stays an operating asset you can keep using.',
  },
  {
    vendor: 'Changes depend on vendor responsiveness.',
    owned: 'You adjust scripts, review calls, and change markets directly — fast.',
  },
];

/** "What We Build" — the working parts of an owned outbound operation. */
const builds = [
  { icon: 'route', title: 'Dialer setup & campaign structure', text: 'Configured for connect rate, caller ID health, and campaign logic you control.' },
  { icon: 'database', title: 'CRM or pipeline setup', text: 'Clear lead stages, follow-up rules, and caller usage that reflect reality.' },
  { icon: 'users', title: 'Caller workflow & daily process', text: 'The step-by-step a caller follows from dial to disposition.' },
  { icon: 'layers', title: 'Data sourcing & management workflow', text: 'Reliable ways to get good data in, out, and organised.' },
  { icon: 'gauge', title: 'Lead stages & follow-up tracking', text: 'Nothing falls through the cracks between calls.' },
  { icon: 'chart', title: 'Reporting dashboard', text: 'See activity, output, and performance at a glance.' },
  { icon: 'shield', title: 'QA & call review structure', text: 'Make quality measurable and coachable, not accidental.' },
  { icon: 'document', title: 'Operating instructions & training', text: 'Written process your team can run and new hires can learn.' },
  { icon: 'compass', title: 'Optional advisory & data support', text: 'Use us when you need it — support, never dependency.' },
];

/** Who it is for. */
const audiences = [
  'Real estate investors & acquisition teams',
  'Realtors',
  'Roofing companies',
  'Solar companies',
  'Home service businesses',
  'Founder-led local businesses',
  'Agencies building their own outbound',
  'Owners leaving a vendor or network',
  'Businesses hiring their first caller',
];

/** How it works — engagement steps. */
const process = [
  { number: '01', title: 'Understand', text: 'What you sell, who you target, and whether outbound makes sense for you.' },
  { number: '02', title: 'Design', text: 'The simplest outbound setup that fits your business — no overbuild.' },
  { number: '03', title: 'Build', text: 'The dialer, CRM, workflow, reporting, and data process.' },
  { number: '04', title: 'Caller', text: 'Source a caller if you need one, or structure the caller you already have.' },
  { number: '05', title: 'Teach', text: 'Walk you through how the system works and what to watch.' },
  { number: '06', title: 'Stay available', text: 'Advisory, data, caller, QA, or optimization support — only when useful.' },
];

/**
 * Offers — the ways Veylrio helps you build and own outbound.
 * Used on the Solutions page (detail) and the homepage "Optional Support" band.
 */
const offers = [
  {
    id: 'owned-outbound-setup',
    icon: 'layers',
    title: 'Owned Outbound Setup',
    who: 'Businesses starting outbound, or leaving a vendor.',
    positioning: 'We build the outbound system you own.',
    includes: ['Dialer & campaign structure', 'CRM & lead stages', 'Caller workflow', 'Data process', 'Reporting', 'Operating instructions & training'],
  },
  {
    id: 'vendor-exit-buildout',
    icon: 'route',
    title: 'Vendor Exit Buildout',
    who: 'Owners who used a network or vendor and want out.',
    positioning: 'Leave the network without losing the channel.',
    includes: ['Client-owned dialer & CRM', 'Reporting you control', 'Caller workflow rebuilt', 'Recordings & data in your accounts'],
  },
  {
    id: 'caller-system-launch',
    icon: 'users',
    title: 'Caller + System Launch',
    who: 'Owners with no caller yet.',
    positioning: 'Get the caller and the system around them.',
    includes: ['Caller sourcing support', 'System built around the caller', 'Daily workflow & scripts', 'Onboarding structure'],
  },
  {
    id: 'data-dialer-management',
    icon: 'database',
    title: 'Data + Dialer Management',
    who: 'Owners who own the setup but want technical help.',
    positioning: 'Keep the technical side handled — without giving up ownership.',
    includes: ['Data uploads & list handling', 'Dialer checks', 'Campaign adjustments'],
  },
  {
    id: 'outbound-advisory',
    icon: 'compass',
    title: 'Outbound Advisory Calls',
    who: 'Owners who are up and running.',
    positioning: 'Use us when you need help reading and improving the operation.',
    includes: ['Review signals & scripts', 'Read data & markets', 'Caller performance review'],
  },
];

/** Trust principles — what we will and will not do. */
const trustPrinciples = [
  { kind: 'no', text: 'No fake lead guarantees.' },
  { kind: 'no', text: 'No black-box agency promises.' },
  { kind: 'no', text: 'No bloated setup designed to keep you confused.' },
  { kind: 'no', text: 'No pretending cold calling works without good callers, good data, and good follow-up.' },
  { kind: 'yes', text: 'We build the system, teach you how it works, and let you own it.' },
];

/** Reasons / trust points for the Why Veylrio page. */
const trustPoints = [
  {
    title: 'Operator-level outbound experience',
    text: 'We know outbound from the ground level — callers, data, dialers, scripts, follow-up, reporting, QA, and where the leaks hide.',
  },
  {
    title: 'Anti-black-box by design',
    text: 'You should control the caller, CRM, data, recordings, reporting, and changes. If you ever stop working with us, nothing breaks and nothing is hidden.',
  },
  {
    title: 'The whole system, not isolated pieces',
    text: 'We combine caller support, data process, dialer, CRM, reporting, and advisory into one operation you own — not a pile of disconnected fixes.',
  },
  {
    title: 'Built once, kept for good',
    text: 'A vendor campaign stops when you stop paying. An owned setup stays an operating asset your business keeps using.',
  },
  {
    title: 'Better budget allocation',
    text: 'More of your spend reaches the caller, the data, and the system — not vendor margin and overhead.',
  },
  {
    title: 'We do not fake guarantees',
    text: 'Results depend on offer, market, data, caller skill, follow-up, and execution. We build the foundation and the visibility that make good decisions possible.',
  },
];

/** Frequently asked questions (Why Veylrio page + FAQ structured data). */
const faqs = [
  {
    q: 'Do you provide callers?',
    a: 'If you need one, we help source a caller and build the system around them. If you already have a caller, we build the workflow, CRM, data process, and reporting they work inside. We are not a staffing agency — caller sourcing is support inside a system you own.',
  },
  {
    q: 'We already pay a vendor. Why change?',
    a: 'We are not anti-vendor. The question is what you actually own: the caller, CRM, reporting, recordings, data flow, and campaign logic. If the vendor still controls those, you may be renting more than you realise.',
  },
  {
    q: 'Can you guarantee leads or appointments?',
    a: 'No. We do not fake guarantees. Results depend on your offer, market, data, caller skill, follow-up, and execution. We build the system that gives the operation a stronger foundation and clearer visibility.',
  },
  {
    q: 'This sounds expensive.',
    a: 'Compared with renting a black-box vendor every month it is a different question. This is a setup you own and keep using — not access you lose the moment you stop paying. Often the total cost is lower because the vendor margin is removed.',
  },
  {
    q: 'Why not just hire a VA or use a BPO?',
    a: 'A VA can make calls and a BPO can staff seats — but both still need (or quietly own) the dialer, CRM, workflow, data process, and reporting. We build that operating layer so it belongs to you, not to them.',
  },
  {
    q: 'Do we own everything you build?',
    a: 'Yes. Everything lives in tools and accounts you control, documented so your team can run, adjust, and grow it without depending on us.',
  },
  {
    q: 'Which dialers and CRMs do you work with?',
    a: 'We are tool-agnostic and work with common outbound dialers and CRMs. Tell us your stack on the Start a Project form and we work within it where possible.',
  },
  {
    q: 'How do engagements start?',
    a: 'With a short, practical call to scope the setup: what you need, what you already have, what should be built, whether you need caller support, and what you should own by the end. If it is not a fit, we will tell you.',
  },
];

/**
 * Testimonials shown in the homepage slider (right after the hero).
 *
 * ⚠️  IMPORTANT — these are PLACEHOLDERS, not real quotes.
 *     Veylrio's brand rule is: never publish fabricated testimonials.
 *     Replace each entry with a REAL, permissioned client quote before launch.
 *     Leave this array EMPTY ([]) to hide the testimonials section entirely.
 */
const testimonials = [
  {
    quote:
      'Placeholder — replace with a real client quote about renting outbound before, what Veylrio built, and what it feels like to own it now.',
    name: 'Client name',
    role: 'Owner',
    company: 'Company',
  },
  {
    quote:
      'Placeholder — a second real testimonial goes here. Keep quotes specific and honest: the vendor frustration, the system we built, the control they gained.',
    name: 'Client name',
    role: 'Acquisitions lead',
    company: 'Company',
  },
  {
    quote:
      'Placeholder — a third real testimonial. Two to five short, genuine quotes work best in this slider.',
    name: 'Client name',
    role: 'Founder',
    company: 'Company',
  },
];

/** Options for the Start a Project form (kept here so they are easy to edit). */
const form = {
  industries: [
    'Real estate investing / wholesaling',
    'Realtor',
    'Roofing',
    'Solar',
    'Home services',
    'Recruiting / staffing',
    'Agency building outbound',
    'Other',
  ],
  outboundStatus: [
    'Starting outbound for the first time',
    'Currently using a vendor or network',
    'Have callers, need the system around them',
    'Have a setup, want it cleaner',
  ],
  teamSizes: ['Just me', '2–5', '6–20', '21–50', '51–100', '100+'],
  contactMethods: ['Email', 'Phone', 'WhatsApp'],
  timelines: ['As soon as possible', 'Within 1 month', '1–3 months', 'Just exploring'],
  budgetRanges: [
    'Not sure yet',
    'Under $1,000',
    '$1,000–$3,000',
    '$3,000–$7,500',
    '$7,500–$15,000',
    '$15,000+',
  ],
};

const site = {
  brand,
  nav,
  footerNav,
  cta,
  problems,
  ownItems,
  costAdvantage,
  ownVsVendor,
  builds,
  audiences,
  process,
  offers,
  trustPrinciples,
  trustPoints,
  faqs,
  testimonials,
  form,
  siteUrl: config.siteUrl,
  contactEmail: config.contactEmail,
  year: new Date().getFullYear(),
};

export default site;
