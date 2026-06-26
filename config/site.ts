import config from './index';

/**
 * Site-wide content & structure.
 * Edit copy and navigation here — views read from this object.
 *
 * Positioning: "Build your own outbound operation. Stop renting one."
 * Veylrio builds the outbound setup the client OWNS — dialer, CRM, caller
 * workflow, data process, reporting — and stays available for optional support.
 */

const brand = {
  name: 'Veylrio',
  legalName: 'Veylrio',
  slogan: 'Less Weight, More Momentum',
  domain: 'veylrio.com',
  email: config.contactEmail,
  descriptor:
    'Veylrio helps business owners build their own outbound sales operation — dialer, CRM, caller workflow, data process, and reporting — instead of renting one from a vendor or network.',
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
  secondary: { label: 'See How It Works', href: '/#how-it-works' },
  advisory: { label: 'Talk Through My Options', href: '/start-a-project' },
};

/** Problem section bullets. */
const problems = [
  'You pay every month but do not own the operation.',
  'You cannot always speak directly to the caller.',
  'You cannot change scripts or markets fast enough.',
  'You cannot clearly see what is causing poor performance.',
  'Stop paying and the setup often disappears.',
  'A large part of the spend goes to vendor margin and overhead.',
];

/** Cost-allocation visual: where the money goes. */
const costAllocation = {
  vendor: ['Vendor margin', 'Bundled overhead', 'Layers of management', 'Limited visibility'],
  owned: ['Better callers', 'Better & more data', 'Better tools & CRM', 'Cleaner reporting', 'Control & visibility'],
};

/** What you own — the operating asset that stays with the business. */
const ownItems = [
  'Your dialer setup',
  'Your CRM or pipeline',
  'Your caller workflow',
  'Your lead stages',
  'Your data process',
  'Your reporting',
  'Your call visibility',
  'Your scripts & market feedback',
  'Your operating instructions',
  'Your decisions',
];

/** The ownership "stack" used in the hero / what-you-own visual. */
const ownershipStack = ['Caller', 'Dialer', 'CRM', 'Data', 'Reporting', 'Process'];

/** What we build — the working parts of a cold-calling operation. */
const builds = [
  { icon: 'route', title: 'Dialer setup & campaign structure', text: 'Your dialer configured for connect rate, caller-ID health, and campaigns you control.' },
  { icon: 'database', title: 'CRM or pipeline setup', text: 'Clear lead stages and follow-up rules that match how you actually sell.' },
  { icon: 'users', title: 'Caller workflow & daily process', text: 'A simple, repeatable day for the caller — from first dial to disposition.' },
  { icon: 'layers', title: 'Data sourcing & upload workflow', text: 'A reliable way to get good lists in, cleaned, and ready to call.' },
  { icon: 'gauge', title: 'Lead stages & follow-up tracking', text: 'Every lead has a next step, so nothing slips through the cracks.' },
  { icon: 'chart', title: 'Reporting dashboard', text: 'See activity, output, and what is working — in your own accounts.' },
  { icon: 'shield', title: 'Call review & quality structure', text: 'A practical way to listen, score, and improve calls over time.' },
  { icon: 'document', title: 'Operating instructions & walkthrough', text: 'Plain-English docs and a walkthrough so your team can run it.' },
  { icon: 'compass', title: 'Optional advisory & data support', text: 'Use us when you want help — never a requirement.' },
];

/** Who it is for — broad, outcome-led language (not "what you sell"). */
const audiences = [
  'Real estate investors looking for sellers or acquisition opportunities',
  'Realtors looking for sellers, buyers, or listings',
  'Roofing and solar companies looking for homeowners or booked estimates',
  'Home service businesses looking for local opportunities',
  'Agencies looking for client conversations',
  'Local businesses that want outbound without a black-box provider',
  'Owners deciding whether to build internally or choose a vendor',
];

/** "Kept simple to run" — owning the operation does not mean doing it all alone. */
const simplicity = [
  'Clear caller workflow',
  'Simple CRM or pipeline view',
  'Easy reporting',
  'Call visibility',
  'Data process you understand',
  'Practical walkthrough before handoff',
  'Support available when needed',
];

/** How it works — engagement steps. */
const process = [
  { number: '01', title: 'Understand', text: 'We learn your market, your target audience, and the type of opportunities you want outbound to create.' },
  { number: '02', title: 'Design', text: 'We map the simplest setup that fits your business and budget.' },
  { number: '03', title: 'Build', text: 'We set up the dialer, CRM, workflow, reporting, and data process.' },
  { number: '04', title: 'Caller', text: 'We help source a caller if needed, or build around the caller you already have.' },
  { number: '05', title: 'Walkthrough', text: 'We show you how to read the system, what to watch, and how to make basic changes.' },
  { number: '06', title: 'Support', text: 'We stay available for advisory, data, dialer, caller, QA, vendor guidance, or optimization — when useful.' },
];

/** Own vs Rent comparison rows. */
const ownVsVendor = [
  { label: 'Payment model', vendor: 'A recurring monthly fee, bundled.', owned: 'You pay to build a setup you keep.' },
  { label: 'Caller access', vendor: 'Often indirect, through the vendor.', owned: 'Direct — you can talk to your caller.' },
  { label: 'CRM ownership', vendor: 'Lives inside the vendor’s system.', owned: 'Yours, in tools you control.' },
  { label: 'Data process', vendor: 'Controlled and limited by the vendor.', owned: 'Your lists, your uploads, your rules.' },
  { label: 'Call recordings', vendor: 'Held by the vendor, if shared at all.', owned: 'Stored in your own accounts.' },
  { label: 'Script & market changes', vendor: 'Wait on vendor turnaround.', owned: 'Change them yourself, fast.' },
  { label: 'Reporting', vendor: 'The vendor’s dashboard and numbers.', owned: 'Your dashboard, your numbers.' },
  { label: 'Long-term asset value', vendor: 'None — you are renting access.', owned: 'An operating asset you keep.' },
  { label: 'If you stop paying', vendor: 'The operation disappears.', owned: 'You keep the whole system.' },
];

/**
 * Three primary solution paths (Solutions page + homepage reference).
 */
const offers = [
  {
    id: 'owned-outbound-setup',
    icon: 'layers',
    title: 'Owned Outbound Setup',
    who: 'For businesses starting outbound, or replacing a vendor.',
    positioning: 'We build the outbound system you own.',
    includes: ['Dialer & campaign structure', 'CRM & lead stages', 'Caller workflow', 'Data process', 'Reporting', 'Walkthrough & docs'],
  },
  {
    id: 'caller-system-launch',
    icon: 'users',
    title: 'Caller + System Launch',
    who: 'For owners who need both the caller and the operating setup.',
    positioning: 'Get the caller and the system around them.',
    includes: ['Caller sourcing support', 'Dialer & CRM', 'Caller workflow', 'Reporting', 'Onboarding structure'],
  },
  {
    id: 'vendor-exit-buildout',
    icon: 'route',
    title: 'Vendor Exit Buildout',
    who: 'For owners who used a vendor or network and want control back.',
    positioning: 'Leave the vendor without losing the channel.',
    includes: ['Client-owned dialer & CRM', 'Reporting you control', 'Data process', 'Caller workflow rebuilt'],
  },
];

/**
 * Secondary advisory lane — for owners not ready (or not sure they want) to
 * build their own setup. Positioned separately from the three build offers.
 */
const advisoryPath = {
  id: 'vendor-outbound-advisory',
  icon: 'compass',
  title: 'Vendor & Outbound Advisory',
  who: 'For owners not sure whether to build, use a vendor, replace one, or start lighter.',
  positioning: 'If building your own setup is not the right move yet, we help you avoid bad outbound decisions.',
  includes: [
    'Vendor option review',
    'Budget & value guidance',
    'Red flags to avoid',
    'Questions to ask vendors',
    'Setup vs vendor recommendation',
    'Light consulting for smaller budgets',
  ],
};

/** Why Veylrio: the route that actually fits you (we do not force one path). */
const whyModel = [
  { title: 'Build your own operation', text: 'If ownership makes sense for your business.' },
  { title: 'Use a vendor', text: 'If that is genuinely the better fit for now.' },
  { title: 'Start with advisory', text: 'If your budget is limited, begin lighter.' },
  { title: 'Add support when you need it', text: 'Bring us in for help only when it is useful.' },
];

/** Optional support — subordinate to the three primary paths. */
const optionalSupport = [
  { title: 'Data + Dialer Management', text: 'We handle uploads, list health, and dialer checks.' },
  { title: 'Advisory Calls', text: 'Review signals, scripts, markets, and caller performance.' },
  { title: 'Caller Replacement or Hiring', text: 'Help sourcing additional or replacement callers.' },
  { title: 'QA / Call Review', text: 'Listen, score, and coach for better calls.' },
  { title: 'Market & Script Review', text: 'Sharpen who you call and what you say.' },
];

/** Trust principles — used instead of fake proof. */
const trustPrinciples = [
  'We do not promise guaranteed leads or appointments.',
  'We do not pretend vendors are always the wrong choice.',
  'We build in tools and accounts you control.',
  'We keep the setup as simple as it can be.',
  'We explain how it works before we hand it over.',
  'We stay available if you want support — never as a dependency.',
  'We focus your spend on callers, data, tools, and visibility.',
];

/** Why ownership matters — Why Veylrio page. */
const whyOwnership = [
  'Lower long-term dependency on vendors',
  'More budget into callers, data, and tools',
  'Direct visibility into your callers',
  'Faster script and market changes',
  'Reporting that lives in your accounts',
  'Real control over what happens daily',
];

/** What makes Veylrio different — Why Veylrio page. */
const whyDifferent = [
  'We are not a lead-gen agency.',
  'We are not a BPO.',
  'We do not sell fake guarantees.',
  'We build the setup in tools you control.',
  'We help source a caller if you need one.',
  'If a vendor is the better fit, we will tell you.',
  'We support data, dialer, QA, and advisory after setup.',
  'We know outbound from the inside.',
];

/** FAQs (Why Veylrio page + FAQ structured data). */
const faqs = [
  {
    q: 'Do you provide callers?',
    a: 'If you need one, we help source a caller and build the system around them. If you already have a caller, we build the workflow they run inside. We are not a staffing agency — caller sourcing is support inside a system you own.',
  },
  {
    q: 'Do I have to run everything myself?',
    a: 'No. We build the setup to be simple to run, show you how it works, and stay available if you want support. Owning the operation means the core system is in your control. It does not mean you have to do every task yourself.',
  },
  {
    q: 'What if I still want to use a vendor?',
    a: 'That is fine. Some businesses are a better fit for a vendor, at least at the start. We can help you understand what to look for, what to avoid, and which type of vendor is likely to give you better value.',
  },
  {
    q: 'Can you work with smaller budgets?',
    a: 'Yes. A smaller budget may not fit a full outbound buildout, but it may fit advisory, vendor guidance, setup planning, or a lighter starting point. The goal is to recommend the most practical next step, not force the largest package.',
  },
  {
    q: 'Is this cheaper than using a vendor?',
    a: 'Often, yes, because you are not paying a recurring bundled vendor margin forever. But the point is not to build a cheap operation. The point is to spend more directly on what matters: caller quality, data quality, tools, reporting, and control.',
  },
  {
    q: 'We already pay a vendor. Why change?',
    a: 'We are not anti-vendor. The question is what you actually own: the caller, CRM, reporting, recordings, data, and campaign logic. If the vendor still controls those, you may be renting more than you realise.',
  },
  {
    q: 'Do you manage the operation after setup?',
    a: 'Only if you want us to. The operation is built to be run by you. We stay available for advisory, data, dialer, caller, or QA support when it is useful — never as a requirement.',
  },
  {
    q: 'Can you guarantee leads or appointments?',
    a: 'No. We do not sell fake guarantees. Results depend on your offer, market, data, caller, and follow-up. We build the system and the visibility that give the operation a stronger foundation.',
  },
  {
    q: 'Do we own everything you build?',
    a: 'Yes. Everything lives in tools and accounts you control, documented so your team can run, adjust, and grow it without depending on us.',
  },
  {
    q: 'What if we are starting from zero?',
    a: 'That is common. We map the simplest setup that fits your business, build it, help with a caller if needed, and walk you through how to run it.',
  },
  {
    q: 'What tools do you work with?',
    a: 'We are tool-agnostic and work with common outbound dialers and CRMs. Tell us your stack on the Start a Project form and we work within it where possible.',
  },
  {
    q: 'How does an engagement start?',
    a: 'With a short, practical call to scope what you need, what you already have, and what should be built. If a vendor or a lighter path is a better fit, we will tell you.',
  },
];

/** Compliance-conscious language (footer + relevant pages). */
const compliance =
  'Compliance-conscious setup and structured, DNC-aware calling workflows where applicable. Veylrio is not a law firm and does not provide legal advice.';

/** Options for the Start a Project form. */
const form = {
  industries: [
    'Real estate investing',
    'Realtor',
    'Roofing',
    'Solar',
    'Home services',
    'Local service business',
    'Agency building outbound',
    'Other',
  ],
  outboundStatus: [
    'Starting for the first time',
    'Using a vendor or network now',
    'Leaving a vendor or network',
    'Have a caller, need the system',
    'Need help finding a caller',
    'Have a setup, want it cleaned up',
    'Not sure whether to build or use a vendor',
  ],
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
  budgetHelp:
    'Budget helps us recommend the right starting point. Smaller budgets may be a better fit for advisory, vendor guidance, or a lighter setup path.',
};

const site = {
  brand,
  nav,
  footerNav,
  cta,
  problems,
  costAllocation,
  ownItems,
  ownershipStack,
  builds,
  audiences,
  simplicity,
  process,
  ownVsVendor,
  offers,
  advisoryPath,
  optionalSupport,
  trustPrinciples,
  whyOwnership,
  whyModel,
  whyDifferent,
  faqs,
  compliance,
  form,
  siteUrl: config.siteUrl,
  contactEmail: config.contactEmail,
  year: new Date().getFullYear(),
};

export default site;
