/**
 * Referral / affiliate links for /links.
 * To add a link: append to the right group. Keep the real referral URL —
 * friends use /links as a link-in-bio page, so every URL here must work.
 */

export interface LinkItem {
  name: string;
  url: string;
  blurb: string;
  perk?: string;
}

export interface LinkGroup {
  title: string;
  items: LinkItem[];
}

export const linkGroups: LinkGroup[] = [
  {
    title: "Finance & Investing",
    items: [
      {
        name: "Coinbase",
        url: "https://advanced.coinbase.com/join/AQ6U5AX",
        blurb: "The most trusted crypto exchange. Buy, sell, and manage 100+ cryptocurrencies.",
        perk: "Earn up to $50 in free crypto",
      },
      {
        name: "Robinhood",
        url: "https://join.robinhood.com/tannerj82",
        blurb: "Commission-free trading for stocks, options, and crypto.",
        perk: "Get a free stock when you sign up",
      },
      {
        name: "SoFi",
        url: "https://www.sofi.com/invite/money?gcp=deb88fc1-cea1-44a6-b72c-b46b1d2ac452",
        blurb: "All-in-one financial platform — banking, investing, loans, and credit cards.",
        perk: "Get $25 when you sign up",
      },
      {
        name: "Monarch Money",
        url: "https://www.monarchmoney.com/referral/ivsp5xwtxi",
        blurb: "Premium budgeting app that syncs all accounts.",
        perk: "50% off your first year",
      },
    ],
  },
  {
    title: "Privacy & Security",
    items: [
      {
        name: "Proton Mail",
        url: "https://pr.tn/ref/V4QXD5VE",
        blurb: "Secure, private email from Switzerland with end-to-end encryption.",
        perk: "Get a free month of Mail Plus",
      },
      {
        name: "Privacy.com",
        url: "https://app.privacy.com/join/NXRQB",
        blurb: "Virtual cards for online purchases. Protect your real card from fraud.",
        perk: "First month free",
      },
    ],
  },
  {
    title: "Utilities & Services",
    items: [
      {
        name: "Starlink",
        url: "https://www.starlink.com/residential?referral=RC-2421177-16688-68",
        blurb: "High-speed satellite internet anywhere. Reliable connectivity for remote areas.",
        perk: "Get a free month of service",
      },
      {
        name: "Litter Robot",
        url: "https://share.litter-robot.com/x/VEoAQZ",
        blurb: "Self-cleaning litter box. Smart, odor-free, and convenient.",
        perk: "Save $50",
      },
      {
        name: "Cloudways",
        url: "https://www.cloudways.com/en/?id=1827700",
        blurb: "Managed cloud hosting. Deploy WordPress or PHP apps in minutes on AWS, Google Cloud, or DigitalOcean.",
        perk: "Get $25 in hosting credit",
      },
      {
        name: "Wispr Flow",
        url: "https://wisprflow.ai/r/TANNER111",
        blurb: "Voice-to-text AI that writes as you speak. Dictate anywhere on your Mac with natural, accurate transcription.",
        perk: "Get a free month of Pro",
      },
    ],
  },
  {
    title: "Health",
    items: [
      {
        name: "Function Health",
        url: "https://my.functionhealth.com/signup?code=TJOHNSON58&_saasquatch=TJOHNSON58&d=FHREF25",
        blurb: "160+ lab tests with insights from top doctors. Comprehensive health monitoring to catch issues early.",
        perk: "Get $25 off your first year",
      },
    ],
  },
  {
    title: "Lifestyle",
    items: [
      {
        name: "Tesla",
        url: "http://ts.la/tanner57678",
        blurb: "Electric vehicles and sustainable energy.",
        perk: "Get 3 months of free Full Self-Driving",
      },
      {
        name: "CookUnity",
        url: "https://www.cookunity.com/referral?utm_campaign=tannjoh015",
        blurb: "Chef-prepared meal delivery. Fresh meals from award-winning chefs.",
        perk: "$50 off your first order",
      },
      {
        name: "Eight Sleep",
        url: "https://refer.eight.sl/tanner85",
        blurb: "Smart mattress cover with temperature control and sleep tracking.",
        perk: "Save up to $700",
      },
      {
        name: "Amazon",
        url: "https://amzn.to/4aQPG8G",
        blurb: "Shop millions of products with fast delivery.",
        perk: "Supports this site at no extra cost",
      },
    ],
  },
];

export interface Social {
  name: string;
  url: string;
  handle: string;
}

export const socials: Social[] = [
  { name: "GitHub", url: "https://github.com/tannerwj", handle: "@tannerwj" },
  { name: "X", url: "https://x.com/tannerwj", handle: "@tannerwj" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/tannerwj/", handle: "tannerwj" },
  { name: "Goodreads", url: "https://goodreads.com/tannerwj", handle: "tannerwj" },
];
