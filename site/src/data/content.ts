/* All copy for the site. Anything marked TODO is a placeholder to confirm with the client. */

const WA_NUMBER = "8801850355772"; // international format, no "+" or leading 0
const WA_TEXT = "Hi Aperture Visuals, I'd like to discuss a project.";

export const site = {
  name: "Aperture Visuals",
  tagline: "Architectural visualization studio",
  email: "hello@aperturevisuals.com",
  phone: "01850355772",
  phoneDisplay: "+880 1850-355772",
  phoneHref: "tel:+8801850355772",
  /** Universal link: opens the app directly on phones. On computers a chooser intercepts it (see WhatsAppChooser). */
  whatsapp: `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_TEXT)}`,
  /** Opens the installed WhatsApp desktop app (Windows / macOS) straight into the chat. */
  whatsappApp: `whatsapp://send?phone=${WA_NUMBER}&text=${encodeURIComponent(WA_TEXT)}`,
  /** Browser fallback when the desktop app isn't installed. */
  whatsappWeb: `https://web.whatsapp.com/send?phone=${WA_NUMBER}&text=${encodeURIComponent(WA_TEXT)}`,
  address: ["Dhaka, Bangladesh", "Available worldwide"],
  social: [
    { label: "Facebook", href: "https://www.facebook.com/p/Aperture-Visuals-61573651734834/" },
    { label: "Instagram", href: "https://www.instagram.com/aperture__visuals" },
  ],
};

/** Social profiles with a real URL (placeholders are hidden until the client supplies them). */
export const socials = () => site.social.filter((s) => s.href && s.href !== "#");

export const nav = [
  { label: "Home", href: "/" },
  { label: "Portfolio", href: "/projects" },
  { label: "Services", href: "/#services" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Contacts", href: "/#contact" },
];

export const hero = {
  eyebrow: "Architectural visualization studio · Dhaka",
  title: ["Bring your architecture", "to life with cinematic", "3D visualization"],
  primary: { label: "Start project", href: "/#contact" },
  secondary: { label: "Portfolio", href: "/projects" },
};

export type Sector = "Exterior" | "Interior" | "Healthcare" | "Retail" | "Hospitality" | "Commercial" | "Masterplan";

export interface Project {
  slug: string;
  name: string;
  location?: string; // only where known — shown on the project page
  sector: Sector;
  service: string;
  year: string;
  cover: string; // render key
  gallery: string[]; // render keys
  intro: string;
  body: string[];
  featured?: boolean;
}

/* Names/locations are working titles derived from file names and the catalogue — TODO confirm with client. */
export const projects: Project[] = [
  {
    slug: "breeze-apartments",
    name: "Breeze Apartments",
    location: "Australia",
    sector: "Exterior",
    service: "Exterior visualization · Roof terrace",
    year: "2025",
    cover: "breeze-exterior",
    gallery: ["breeze-exterior", "rooftop-pool", "rooftop-lounge"],
    intro: "A seven-storey apartment building where transparency meets modern luxury — glazed balconies, timber fins and a planted street edge.",
    body: [
      "The brief was to sell apartments off the plan, so every image had to read as a photograph of a finished building. We modelled the façade from the architect's Revit set, then spent most of the time on light: a late-afternoon sun that rakes across the balconies and lifts the timber.",
      "The roof terrace was rendered as a lifestyle set — pool, loungers and shaded seating — so the marketing campaign could show the building being lived in, not just built.",
    ],
    featured: true,
  },
  {
    slug: "courtyard-house",
    name: "Courtyard House",
    location: "Australia",
    sector: "Exterior",
    service: "Exterior visualization",
    year: "2025",
    cover: "view-a-house",
    gallery: ["view-a-house"],
    intro: "A white two-storey home with a screened carport and a gum tree that the whole composition leans on.",
    body: [
      "Street-front images for a builder's display range. The camera sits at eye level across the road so the house reads the way a buyer would first see it; the existing tree was rebuilt from site photos to anchor the shot.",
    ],
    featured: true,
  },
  {
    slug: "maric-residence",
    name: "Maric Residence",
    location: "Western Australia",
    sector: "Exterior",
    service: "Exterior visualization",
    year: "2025",
    cover: "mark-maric-house",
    gallery: ["mark-maric-house"],
    intro: "Dark brick and standing-seam cladding for a custom home on a sloping corner block.",
    body: [
      "The material palette does the talking here, so the render was built around accurate brick coursing, the shadow line of the cladding and a soft morning light that keeps the dark façade legible.",
    ],
    featured: true,
  },
  {
    slug: "glasshouse-living",
    name: "Glasshouse Living",
    location: "Australia",
    sector: "Interior",
    service: "Interior visualization",
    year: "2025",
    cover: "living-glass",
    gallery: ["living-glass", "evolve-interior"],
    intro: "A double-height living and dining room behind full-height glazing, looking out to the water.",
    body: [
      "Interior renders for a coastal build. The furniture and finishes were specified by the interior designer; our work was the light — bounced daylight from the glazing, the marble artwork and the rug all reading true to sample.",
    ],
    featured: true,
  },
  {
    slug: "roof-terrace",
    name: "Roof Terrace",
    location: "Australia",
    sector: "Hospitality",
    service: "Lifestyle visualization",
    year: "2025",
    cover: "rooftop-pool",
    gallery: ["rooftop-pool", "rooftop-lounge"],
    intro: "Poolside leisure with shaded seating — the rooftop amenity for an apartment campaign.",
    body: [
      "People, water and umbrellas are the hardest things to make believable. Posed figures were chosen to sit naturally in the scene, and the pool was rendered with real caustics rather than a texture.",
    ],
    featured: true,
  },
  {
    slug: "surgical-suite",
    name: "Surgical Suite",
    sector: "Healthcare",
    service: "Interior visualization",
    year: "2025",
    cover: "operating-theatre",
    gallery: ["operating-theatre", "emergency-room"],
    intro: "Operating theatre and emergency room interiors for a hospital fit-out.",
    body: [
      "Medical interiors demand accuracy: equipment, lighting levels and finishes were modelled to the specification so the clinical team could review the layout before construction.",
    ],
    featured: true,
  },
  {
    slug: "concept-store",
    name: "Concept Store",
    sector: "Retail",
    service: "Interior visualization",
    year: "2025",
    cover: "retail-store",
    gallery: ["retail-store"],
    intro: "A fashion retail fit-out with open rails, mannequins and warm timber shelving.",
    body: [
      "Lifestyle renders populated with shoppers to show the store in use — used by the client for landlord approval and for the launch campaign.",
    ],
    featured: true,
  },
  {
    slug: "elevated-living-duplex",
    name: "Elevated Living Deck Duplex",
    location: "Dhaka, Bangladesh",
    sector: "Interior",
    service: "Interior visualization · Animation",
    year: "2025",
    cover: "dining",
    gallery: ["dining"],
    intro: "Dining and living interiors for a duplex by Cielo Developers Ltd.",
    body: [
      "A pared-back palette — pale timber, linen and black steel — rendered in soft daylight. The project also has a walkthrough animation, delivered for the developer's sales suite.",
    ],
    featured: true,
  },
  {
    slug: "patel-residence",
    name: "Patel Residence",
    sector: "Interior",
    service: "Interior visualization",
    year: "2025",
    cover: "bedroom",
    gallery: ["bedroom"],
    intro: "A warm, neutral master bedroom with layered textiles and a single framed artwork.",
    body: ["Rendered to help the client choose between two bedding and lighting schemes before ordering."],
    featured: true,
  },
  {
    slug: "lagoon-cabana",
    name: "Lagoon Cabana",
    sector: "Hospitality",
    service: "Exterior visualization",
    year: "2026",
    cover: "pool-cabana",
    gallery: ["pool-cabana"],
    intro: "Day-beds under white pergolas at the edge of a lagoon pool.",
    body: ["A resort amenity study: the pergola module was rendered from several angles to test proportions against the water."],
    featured: true,
  },
  {
    slug: "grady-commercial",
    name: "Grady Drive-through",
    sector: "Commercial",
    service: "Exterior visualization",
    year: "2026",
    cover: "grady-dusk",
    gallery: ["grady-dusk"],
    intro: "A dusk shot of a roadside restaurant with a blue-lit canopy against a city skyline.",
    body: ["Signage, canopy lighting and wet asphalt were the focus — a night render that had to work as the hero of a planning submission."],
    featured: true,
  },
  {
    slug: "mgx-site",
    name: "MGX Site Aerial",
    sector: "Masterplan",
    service: "Aerial visualization",
    year: "2025",
    cover: "aerial-site",
    gallery: ["aerial-site"],
    intro: "A drone-height aerial of a rural site with staged development modules.",
    body: ["Aerial context renders composited with terrain data to show phasing across the site."],
    featured: true,
  },
  {
    slug: "ridge-house",
    name: "Ridge House",
    location: "Australia",
    sector: "Exterior",
    service: "Exterior visualization",
    year: "2025",
    cover: "final-house",
    gallery: ["final-house", "pcr-elevation"],
    intro: "Two suburban homes rendered for a builder's catalogue.",
    body: ["Front-elevation renders with consistent lighting so the range reads as a family of designs."],
  },
  {
    slug: "burnett-type-b",
    name: "Burnett Type B",
    location: "Australia",
    sector: "Masterplan",
    service: "Rendered floor plan",
    year: "2026",
    cover: "floor-plan",
    gallery: ["floor-plan"],
    intro: "A rendered floor plan with furniture, landscaping and cars for a house-and-land package.",
    body: ["2D plans rebuilt in 3D and rendered from above so buyers can read the layout at a glance."],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug);

export const services = {
  statement: "We create 3D visuals that make architectural ideas clear, emotional and easy to say yes to",
  cards: [
    { title: "3D Architectural Visualization", image: "breeze-exterior", href: "/projects?type=Exterior", cta: "View work" },
    { title: "3D Interior Visualization", image: "living-glass", href: "/projects?type=Interior", cta: "View work" },
    { title: "3D Animation & Cinematics", image: "view-a-house", href: "/#pricing", cta: "See pricing" },
    { title: "Real-time & VR Experiences", image: "mark-maric-house", href: "/#pricing", cta: "See pricing" },
  ],
};

export const about = {
  statement: "By combining an architect's eye with technical precision, we make sure every image reflects a thoughtful, collaborative process shaped by your ideas",
  stats: [
    { value: 50, suffix: "+", label: "Projects completed" },
    { value: 20, suffix: "+", label: "Clients served" },
    { value: 5, suffix: "+", label: "Years of experience" },
  ],
};

export const advantages = {
  title: "Why work with us?",
  items: [
    {
      title: "Architectural expertise at our foundation",
      body: "Founded by architects. We read drawings the way you do, so structure, proportion and detail come through with authenticity — not just a pretty picture.",
      image: "mark-maric-house",
    },
    {
      title: "Fast delivery. Clear process. No surprises",
      body: "Brief, 3D model, draft render, feedback, final. You see a draft angle early, revisions are built into the price, and delivery dates are agreed up front.",
      image: "rooftop-pool",
    },
    {
      title: "Cinematic light, material and mood",
      body: "Our work focuses on capturing light, material and atmosphere — transforming designs into visuals that feel as real as the architecture itself.",
      image: "living-glass",
    },
    {
      title: "Global clients. Local insight",
      body: "From Dhaka to Australia, we work remotely across time zones with architects, developers and designers, and we understand the market each image has to speak to.",
      image: "view-a-house",
    },
  ],
};

/** The three ways to reach the studio, used in the contact section, the menu and the footer. */
export const contact = {
  whatsapp: { label: "Chat on WhatsApp", href: site.whatsapp },
  call: { label: `Call ${site.phoneDisplay}`, href: site.phoneHref },
  email: { label: `Email ${site.email}`, href: `mailto:${site.email}?subject=Project%20enquiry` },
};

export const cta = {
  title: "Let's talk about your next project",
  lead: "Message us on WhatsApp, call the studio directly, or send an email — whichever suits you.",
  image: "pool-cabana",
};

export const pricing = {
  label: "Pricing",
  intro: ["Pricing varies depending on project scale, detail, and deadline.", "Below are starting estimates — contact us for a tailored quotation."],
  note: "For detailed quotations and custom packages, please contact us directly.",
  currencies: ["BDT", "USD", "AUD", "GBP", "EUR"] as const,
  conversionNote: "Converted from BDT at today's reference rate — indicative only; quotes are issued in BDT or your currency on request.",
  plans: [
    {
      name: "Static render",
      price: "3,000 BDT+",
      amountBDT: 3000,
      unit: "per image",
      tone: "teal",
      items: ["Exterior / Interior / Detail shots", "Photorealistic lighting & materials", "High-resolution delivery", "2 rounds of revisions included"],
    },
    {
      name: "Animation",
      price: "1,000 BDT+",
      amountBDT: 1000,
      unit: "per second",
      tone: "gold",
      items: ["Walkthrough / Cinematic / Promo", "Smooth camera movement", "Cinematic color grading", "Delivered in MP4 / MOV"],
    },
    {
      name: "Advanced viz",
      price: "Custom",
      amountBDT: null,
      unit: "quote on request",
      tone: "teal",
      items: ["Real-time (Unreal Engine)", "360° VR Tour", "Competition / Concept projects", "Full production package available"],
    },
  ],
};

export const faqs = {
  title: "You asked, we answered",
  items: [
    {
      q: "What do you need from me to start?",
      a: "Architectural drawings in any format (CAD, PDF, SketchUp, Revit), material references, and a note on the mood you are after. If all you have is a sketch, that works too — we build the 3D model from it.",
    },
    {
      q: "How long does a render take?",
      a: "A single exterior or interior still usually takes three to five working days including a draft round. Animations depend on length and complexity; most walkthroughs are delivered within two to four weeks.",
    },
    {
      q: "How many revisions are included?",
      a: "Two rounds on every static image. Feedback happens at the draft-render stage — on camera angle, lighting and atmosphere — so the final image is never a surprise.",
    },
    {
      q: "What does it cost?",
      a: "Static renders start at 3,000 BDT per image and animation at 1,000 BDT per second; real-time and VR packages are quoted per project. Pricing varies with scale, detail and deadline — contact us for a tailored quotation.",
    },
    {
      q: "Do you work with clients outside Bangladesh?",
      a: "Yes. Most of our work is for Australian and international studios. Briefs, drafts and feedback all run remotely, across time zones, over email and WhatsApp.",
    },
  ],
};

export const footer = {
  title: "Let's talk about your next project",
  button: { label: "Get a quote", href: site.whatsapp, external: true },
  navigate: [
    { label: "Portfolio", href: "/projects" },
    { label: "Services", href: "/#services" },
    { label: "Pricing", href: "/#pricing" },
    { label: "Contacts", href: "/#contact" },
  ],
  copyright: "Aperture Visuals © 2026",
  band: ["Visualizing spaces", "Inspiring reality"],
};
