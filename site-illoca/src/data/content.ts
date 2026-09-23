export const site = {
  name: "Aperture Visuals",
  tagline: "Visualizing spaces, inspiring reality.",
  email: "hello@aperturevisuals.com",
  phone: "01850355772",
  whatsapp: "https://wa.me/8801850355772?text=Hi%20Aperture%20Visuals%2C%20I%27d%20like%20a%20quote%20for%20a%20project.",
  location: "Dhaka, Bangladesh",
  availability: "Available worldwide",
  social: [
    { label: "LinkedIn", href: "#" },
    { label: "Instagram", href: "#" },
    { label: "Facebook", href: "#" },
  ],
};

export const nav = [
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQs", href: "#faqs" },
];

export const hero = {
  noteLeft: "architectural",
  title: ["Visualizing spaces,", "inspiring reality"],
  noteRight: ["from sketch", "to real"],
  caption: "High-end, cinematic visuals that bring architectural ideas to life.",
};

export type ChapterAction = "lightbox" | "video" | "quote";

export interface Chapter {
  n: number;
  eyebrow: string;
  title: string[];
  body: string;
  cta: { label: string; action: ChapterAction };
  image: string; // key in renders manifest
  alt: string;
  side: "left" | "right";
  /** Three lines for the "feature overview" card that opens from the chapter button. */
  steps: string[];
}

export const chapters: Chapter[] = [
  {
    n: 1,
    eyebrow: "Light, captured!",
    title: ["Static", "Visualization"],
    body: "Photorealistic exterior, interior and detail renders that showcase design, material and lighting exactly as they will be built.",
    cta: { label: "View full render", action: "lightbox" },
    image: "breeze-exterior",
    alt: "Breeze Apartments, Australia — exterior render at golden hour",
    side: "left",
    steps: [
      "Send drawings, a SketchUp/Revit model or even a hand sketch.",
      "We model, light and texture the scene, then share a draft angle.",
      "Two rounds of feedback, then print-resolution stills in 3–5 days.",
    ],
  },
  {
    n: 2,
    eyebrow: "Stories, in motion!",
    title: ["Animation &", "Cinematics"],
    body: "Smooth, cinematic walkthroughs, films and promo videos that tell the story of your project from the first frame.",
    cta: { label: "Watch the animation", action: "video" },
    image: "living-glass",
    alt: "Double-height living room with floor-to-ceiling glazing",
    side: "right",
    steps: [
      "We storyboard the camera path around the moments that sell the project.",
      "Rendered at 4K with cinematic grading and sound design on request.",
      "Delivered as MP4/MOV, cut for web, social and presentations.",
    ],
  },
  {
    n: 3,
    eyebrow: "Worlds, explorable!",
    title: ["Advanced", "Visualization"],
    body: "Real-time scenes in Unreal Engine, 360° views and VR tours for immersive, interactive presentations.",
    cta: { label: "Get a quote", action: "quote" },
    image: "mark-maric-house",
    alt: "Two-storey modern home in dark brick and cladding",
    side: "left",
    steps: [
      "The model is rebuilt for real-time in Unreal Engine.",
      "Walk the space live, switch materials, change the time of day.",
      "Exported as a standalone build, a 360° tour or a VR package.",
    ],
  },
  {
    n: 4,
    eyebrow: "Every sector, rendered!",
    title: ["Beyond", "Residential"],
    body: "Healthcare, retail, hospitality and industrial — the same precision and atmosphere applied to any brief.",
    cta: { label: "View full render", action: "lightbox" },
    image: "operating-theatre",
    alt: "Hospital operating theatre interior render",
    side: "right",
    steps: [
      "Hospitals, clinics, retail fit-outs, offices and industrial sites.",
      "Equipment, signage and people modelled to the brief.",
      "Same draft → feedback → final workflow as residential work.",
    ],
  },
  {
    n: 5,
    eyebrow: "Plans, brought to life!",
    title: ["Plans &", "Aerials"],
    body: "Rendered floor plans and site aerials that make layouts and context instantly legible to clients and councils.",
    cta: { label: "View full render", action: "lightbox" },
    image: "floor-plan",
    alt: "Rendered floor plan, Burnett HIP Type B",
    side: "left",
    steps: [
      "2D plans are rebuilt in 3D and rendered from above with real materials.",
      "Furniture, landscaping and cars added to give scale.",
      "Site aerials composited into drone photography or full CG context.",
    ],
  },
];

export const letter = {
  eyebrow: "To those who shape the world",
  title: "An Open Letter",
  paragraphs: [
    "To those who shape the world,",
    "A building exists twice: once in the mind of its designer, and once in the world. Everything in between — the pitch, the approval, the sale — depends on how well the first is shown to people who can only see the second.",
    "Aperture Visuals was founded by architects. Over five years we have learned to capture light, material, mood and atmosphere so a design reads as clearly on a screen as it will on the street.",
    "From photorealistic stills to immersive animations, we help architects, developers and designers present their projects with clarity, emotion and impact.",
    "Every project deserves a visual experience that feels as real as the architecture itself.",
  ],
  signoff: "This is for you.",
  floats: [
    { image: "bedroom", alt: "Bedroom interior render" },
    { image: "rooftop-pool", alt: "Rooftop pool render" },
    { image: "dining", alt: "Dining room render" },
    { image: "retail-store", alt: "Retail store interior render" },
  ],
};

export const process = {
  tab: "Process",
  eyebrow: "Our workflow",
  title: "Five steps, one vision.",
  intro: "We keep the process collaborative so every detail aligns with what you imagined.",
  steps: [
    { n: "01", title: "Brief", body: "We start by understanding your project goals, references and the mood you want." },
    { n: "02", title: "3D modeling", body: "We build or refine the model from your drawings or provided files." },
    { n: "03", title: "Draft render", body: "First renders are shared for feedback on camera angle, lighting and atmosphere." },
    { n: "04", title: "Feedback", body: "Your revisions are folded in until the result matches your exact vision." },
    { n: "05", title: "Final delivery", body: "High-resolution images or animations, delivered in your preferred formats." },
  ],
};

export const pricing = {
  tab: "Pricing",
  headline: "Pricing varies with scale, detail and deadline. These are starting estimates.",
  footnote: "For detailed quotations and custom packages, contact us directly.",
  plans: [
    {
      name: "Static render",
      price: "3,000 BDT+",
      unit: "per image",
      tone: "paper" as const,
      features: [
        "Exterior, interior and detail shots",
        "Photorealistic lighting and materials",
        "High-resolution delivery",
        "Two rounds of revisions included",
      ],
      cta: { label: "Get a quote", action: "quote" as const },
    },
    {
      name: "Animation",
      price: "1,000 BDT+",
      unit: "per second",
      tone: "coral" as const,
      features: [
        "Walkthrough, cinematic and promo films",
        "Smooth camera movement",
        "Cinematic colour grading",
        "Delivered in MP4 or MOV",
      ],
      cta: { label: "Watch a sample", action: "video" as const },
    },
    {
      name: "Advanced viz",
      price: "Custom",
      unit: "quote on request",
      tone: "blue" as const,
      features: [
        "Real-time scenes in Unreal Engine",
        "360° views and VR tours",
        "Competition and concept projects",
        "Full production package available",
      ],
      cta: { label: "Contact us", action: "email" as const },
    },
  ],
};

export const faqs = {
  tab: "FAQs",
  eyebrow: "Need help?",
  title: ["Frequently", "Asked", "Questions"],
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
      q: "What formats do you deliver?",
      a: "Stills as high-resolution PNG, TIFF or JPEG at print size. Animations as MP4 or MOV up to 4K. Real-time and VR packages as standalone builds or web links.",
    },
    {
      q: "Do you work with clients outside Bangladesh?",
      a: "Yes. Most of our work is for Australian and international studios. Briefs, drafts and feedback all run remotely, across time zones, over email and WhatsApp.",
    },
  ],
};

export const cookie = {
  text: "This website uses cookies.",
  link: "Learn more",
  accept: "Accept",
  reject: "Reject",
};

export const overview = { eyebrow: "Feature overview", close: "Close" };

export const footer = {
  statement: ["Visualizing spaces,", "inspiring reality."],
  quickLinks: [
    { label: "Home", href: "#top" },
    { label: "Work", href: "#work" },
    { label: "Pricing", href: "#pricing" },
  ],
  copyright: "Copyright ©2026 Aperture Visuals",
};
