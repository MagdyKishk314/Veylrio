'use strict';

const config = require('./index');

/**
 * Site-wide content & structure.
 * Edit copy and navigation here — views read from this object so the
 * structure stays consistent and is easy to maintain.
 */

const brand = {
  name: 'Veylrio',
  legalName: 'Veylrio',
  slogan: 'Less Weight, More Momentum',
  domain: 'veylrio.com',
  email: config.contactEmail,
  // One-line descriptor reused across SEO + structured data.
  descriptor:
    'Veylrio builds the outbound infrastructure, systems, tracking, QA and dashboards that outbound-heavy teams need to operate with control and momentum.',
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
  primary: { label: 'Start a Project', href: '/start-a-project' },
  secondary: { label: 'Explore Solutions', href: '/solutions' },
};

/**
 * The five operational systems, used on Home (overview) and Solutions (detail).
 * `summary` is the short card line; `items` are the components inside each system.
 */
const solutionGroups = [
  {
    id: 'outbound-infrastructure',
    number: '01',
    icon: 'route',
    title: 'Outbound Infrastructure',
    summary:
      'The backbone of a calling operation — set up so dials, contacts and conversations actually flow.',
    description:
      'We design the foundation outbound teams run on: how dials connect, how campaigns are structured, how callers move through their day, and how every conversation lands cleanly in your CRM.',
    items: [
      { title: 'Dialer setup', text: 'Configure your dialer for connect rate, caller ID health and campaign logic.' },
      { title: 'Campaign structure', text: 'Organise lists, dispositions and cadences so callers always know what to work next.' },
      { title: 'Caller workflow', text: 'Define the step-by-step flow a caller follows from dial to disposition.' },
      { title: 'CRM flow', text: 'Wire conversations, statuses and follow-ups into your CRM without leaks.' },
      { title: 'Lead handling process', text: 'Clear rules for how leads enter, route, recycle and retire.' },
    ],
  },
  {
    id: 'performance-visibility',
    number: '02',
    icon: 'chart',
    title: 'Performance Visibility',
    summary:
      'See what is actually happening — by team, by caller, by campaign — without digging through exports.',
    description:
      'You cannot manage what you cannot see. We build the dashboards and reporting rhythm that turn raw activity into decisions you can make on a Monday morning.',
    items: [
      { title: 'Dashboards', text: 'Operational views that show activity, output and trends at a glance.' },
      { title: 'KPI tracking', text: 'Agree the numbers that matter and track them consistently.' },
      { title: 'Caller performance views', text: 'Per-caller visibility into dials, talk time, conversions and quality.' },
      { title: 'Reporting rhythm', text: 'A repeatable daily and weekly cadence, not one-off spreadsheets.' },
      { title: 'Data clarity', text: 'One trusted source of numbers your team stops arguing about.' },
    ],
  },
  {
    id: 'quality-control',
    number: '03',
    icon: 'shield',
    title: 'Quality & Control',
    summary:
      'Make quality measurable and coachable — so good calls are repeatable, not accidental.',
    description:
      'Quality should not live in a manager’s head. We build the scorecards, review flow and coaching loop that make standards visible and improvement deliberate.',
    items: [
      { title: 'QA scorecards', text: 'Define what a good call looks like and score it consistently.' },
      { title: 'Call review systems', text: 'A practical workflow for reviewing calls and logging findings.' },
      { title: 'Coaching workflows', text: 'Turn QA findings into specific, trackable coaching actions.' },
      { title: 'Quality reporting', text: 'Trend quality over time, by caller and by campaign.' },
      { title: 'Performance accountability', text: 'Clear standards everyone can see, own and be measured against.' },
    ],
  },
  {
    id: 'data-workflow-systems',
    number: '04',
    icon: 'database',
    title: 'Data & Workflow Systems',
    summary:
      'Clean data in, clean process around it — sheets, trackers and automations people actually use.',
    description:
      'Messy data and manual busywork quietly drain outbound teams. We build the upload flows, trackers and automations that keep your operation organised and your people focused on calls.',
    items: [
      { title: 'Lead & data management', text: 'Structured handling for lists, contacts and outcomes.' },
      { title: 'Upload workflows', text: 'Reliable, repeatable steps for getting data in and out cleanly.' },
      { title: 'Sheets & trackers', text: 'Purpose-built spreadsheets that replace scattered, fragile files.' },
      { title: 'Process automation', text: 'Remove repetitive manual steps where automation is genuinely safe.' },
      { title: 'Clean operating documentation', text: 'Written process your team can follow and new hires can learn from.' },
    ],
  },
  {
    id: 'advisory-build-support',
    number: '05',
    icon: 'compass',
    title: 'Advisory & Build Support',
    summary:
      'Hands-on guidance and custom builds for the parts of your operation that do not fit a template.',
    description:
      'Some problems need judgement, not a product. We advise on outbound operations, support hiring for caller roles, and build the custom systems your situation actually requires.',
    items: [
      { title: 'Outbound advisory', text: 'Practical guidance grounded in real operations, not theory.' },
      { title: 'Caller hiring support', text: 'Optional add-on: help defining, screening and onboarding caller roles.' },
      { title: 'Custom systems', text: 'Bespoke dashboards, sheets and tools built around your workflow.' },
      { title: 'Operational cleanup', text: 'Untangle the processes that have grown messy over time.' },
      { title: 'Growth support', text: 'Structure that holds up as your team and call volume scale.' },
    ],
  },
];

/** Short list used in the homepage "What Veylrio builds" band. */
const buildsHighlights = [
  { icon: 'route', title: 'Dialer & outbound setup', text: 'Configured for connect rate, caller clarity and clean CRM flow.' },
  { icon: 'chart', title: 'Dashboards & reporting', text: 'Real visibility into activity, output and performance by caller and campaign.' },
  { icon: 'shield', title: 'QA & quality systems', text: 'Scorecards, call review and coaching that make quality measurable.' },
  { icon: 'database', title: 'Data, sheets & automations', text: 'Clean lead handling, trackers and the right amount of automation.' },
];

/** The operating principles, used on Home (philosophy) and Why Veylrio. */
const principles = [
  {
    title: 'Operators, not theory',
    text: 'We have run the workflows we build. The systems reflect how outbound actually works on a busy floor, not how a deck says it should.',
  },
  {
    title: 'You own what we build',
    text: 'No black boxes. Your dashboards, sheets and processes live in tools you control, documented so your team can run and change them.',
  },
  {
    title: 'Clarity over complexity',
    text: 'We remove steps before we add them. The goal is the simplest system that gives you control — not the most impressive one.',
  },
  {
    title: 'Built to be used',
    text: 'A system only counts if people use it under pressure. We design for the caller, the QA reviewer and the manager doing the work.',
  },
];

/** Process steps, used on Home and Why Veylrio. */
const process = [
  {
    number: '01',
    title: 'Map',
    text: 'We look at your current outbound operation as it really runs — dialer, data, CRM, QA, tracking and the gaps between them.',
  },
  {
    number: '02',
    title: 'Prioritise',
    text: 'We agree what is costing you the most and what to fix first, so early work pays for itself in control and clarity.',
  },
  {
    number: '03',
    title: 'Build',
    text: 'We set up and clean up the systems — infrastructure, dashboards, QA and workflows — in tools you own.',
  },
  {
    number: '04',
    title: 'Hand over',
    text: 'We document the operation and walk your team through it, so the system keeps working long after we step back.',
  },
];

/** Who we help — audiences. */
const audiences = [
  'Real estate investors',
  'Roofing companies',
  'Recruiters',
  'BPOs',
  'Cold calling agencies',
  'Small outbound sales teams',
  'Agencies using callers',
  'Owners with messy outbound operations',
];

/** Symptoms / problems for the homepage problem section. */
const problems = [
  'Your dialer is set up by guesswork and nobody is sure what is actually working.',
  'Caller performance lives in people’s heads, not in numbers you can see.',
  'QA is informal, inconsistent, or simply not happening.',
  'Leads and data are spread across fragile spreadsheets and lost in the gaps.',
  'You are spending on callers and tools without knowing what each one returns.',
  'Reporting is a weekly scramble instead of a reliable rhythm.',
];

/** Reasons / trust points for the Why Veylrio page. */
const trustPoints = [
  {
    title: 'We understand outbound execution',
    text: 'We are fluent in how calling operations actually run — dispositions, connect rates, list health, caller behaviour, QA realities. Strategy that ignores the floor does not survive contact with it.',
  },
  {
    title: 'Practical systems people can use',
    text: 'We build for the person doing the work at 2pm on a hard day. If a caller, reviewer or manager cannot use it without us in the room, it is not finished.',
  },
  {
    title: 'No overcomplication',
    text: 'We resist clever for the sake of clever. Fewer moving parts means fewer things to break and less for your team to maintain.',
  },
  {
    title: 'Clarity, ownership, sustainability',
    text: 'You should understand your own operation. We favour transparent systems and clear documentation over impressive-looking dependence on us.',
  },
  {
    title: 'No black-box traps',
    text: 'Your systems live in tools you control. If you ever stop working with us, nothing breaks and nothing is hidden.',
  },
  {
    title: 'Infrastructure you can own',
    text: 'We hand over documented, understandable systems your team can run, adjust and grow into — not a dependency you have to keep paying to access.',
  },
];

/** Frequently asked questions (Why Veylrio page + FAQ structured data). */
const faqs = [
  {
    q: 'Do you provide callers?',
    a: 'Not by default. Veylrio builds the infrastructure, systems, tracking, QA, dialer setup, dashboards, workflows and advisory that make outbound teams work properly. Caller hiring support is available as an optional add-on.',
  },
  {
    q: 'What kind of businesses do you work with?',
    a: 'Outbound-heavy operations: real estate investors, roofing companies, recruiters, BPOs, cold calling agencies, small outbound sales teams and agencies that rely on callers — typically owners and operators with messy or under-instrumented outbound.',
  },
  {
    q: 'Do we own the systems you build?',
    a: 'Yes. We build inside tools you control and document everything so your team can run, adjust and grow the systems without depending on us.',
  },
  {
    q: 'Which dialers and CRMs do you work with?',
    a: 'We are tool-agnostic and work with common outbound dialers and CRMs. Tell us what you use on the Start a Project form and we will work within your stack where possible.',
  },
  {
    q: 'How do engagements start?',
    a: 'With a short, practical conversation about how your outbound runs today and what is costing you the most. From there we agree what to fix first. Start by filling in the Start a Project form.',
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
      'Placeholder — replace with a real client quote about what was messy before, what Veylrio built, and what changed.',
    name: 'Client name',
    role: 'Owner',
    company: 'Company',
  },
  {
    quote:
      'Placeholder — a second real testimonial goes here. Keep quotes specific and honest: the problem, the system we built, the outcome.',
    name: 'Client name',
    role: 'Operations lead',
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
    'Real estate investing',
    'Roofing',
    'Recruiting / staffing',
    'BPO / call center',
    'Cold calling agency',
    'Outbound sales team',
    'Agency using callers',
    'Other',
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

module.exports = {
  brand,
  nav,
  footerNav,
  cta,
  solutionGroups,
  buildsHighlights,
  principles,
  process,
  audiences,
  problems,
  trustPoints,
  faqs,
  testimonials,
  form,
  siteUrl: config.siteUrl,
  contactEmail: config.contactEmail,
  year: new Date().getFullYear(),
};
