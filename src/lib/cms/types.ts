export type SiteTheme = {
  paper: string;
  cream: string;
  sage: string;
  sageDark: string;
  terracotta: string;
  terracottaDark: string;
  ink: string;
  inkSoft: string;
  muted: string;
  line: string;
};

export type ClinicInfo = {
  name: string;
  legalName: string;
  tagline: string;
  logo: string;
  phone: string;
  phoneHref: string;
  messenger: string;
  email: string;
  address: string;
  metro: string;
  hours: string;
  chairs: number;
  mapEmbed: string;
  mapLink: string;
  disclaimer: string;
};

export type Doctor = {
  slug: string;
  shortName: string;
  name: string;
  role: string;
  titleLine: string;
  specialties: string[];
  experience: string;
  focus: string;
  cardNote: string;
  bio: string;
  accepts: string;
  photo: string;
  video: string;
};

export type PriceRow = {
  title: string;
  note: string;
  price: string;
};

export type PricePreview = {
  tag: string;
  title: string;
  text: string;
  price: string;
};

export type Offer = {
  tag: string;
  title: string;
  text: string;
  price: string;
  hint: string;
  image: string;
};

export type FaqItem = { q: string; a: string };

export type VisitStep = {
  n: string;
  label: string;
  title: string;
  text: string;
};

export type Situation = {
  tag: string;
  label: string;
  hint: string;
  href: string;
};

export type TextBlock = {
  id: string;
  title: string;
  text: string;
  image: string;
  visible: boolean;
};

export type ReviewItem = {
  name: string;
  source: string;
  text: string;
};

export type ReviewSource = {
  label: string;
  href: string;
};

export type ReviewsContent = {
  rating: string;
  count: number;
  yandexHref: string;
  items: ReviewItem[];
  sources: ReviewSource[];
};

export type MediaContent = {
  heroVideo: string;
  heroPoster: string;
  clinicVideo: string;
  clinicPoster: string;
  clinicCaption: string;
  clinicVideoTitle: string;
  serviceCardImage: string;
  journalWide: string;
  journalTall: string;
};

export type PhotoSlotContent = {
  label: string;
  hint: string;
  src: string;
};

export type ServiceDetails = {
  duration: string;
  visits: string;
  includes: string[];
  steps: string[];
  aftercare: string;
  extra: string;
  body: string[];
  suitable: string[];
  notFor: string[];
  important: string;
  aftercareMore: string;
  photoSlots: PhotoSlotContent[];
};

export type Service = {
  slug: string;
  title: string;
  short: string;
  group: string;
  fromPrice: string;
  doctor: string;
  image: string;
  text: string;
  details: ServiceDetails;
};

export type JournalSection = {
  heading: string;
  paragraphs: string[];
  photoLabel: string;
  photoHint: string;
  photoSrc: string;
};

export type JournalArticle = {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  image: string;
  featured: boolean;
  tag: string;
  readTime: string;
  hero: PhotoSlotContent;
  sections: JournalSection[];
  closing: string;
  gallery: PhotoSlotContent[];
};

export type BeforeAfterItem = {
  title: string;
  tag: string;
  note: string;
  before: string;
  after: string;
};

export type PrepItem = {
  title: string;
  text: string;
};

export type PatientsCard = {
  href: string;
  tag: string;
  title: string;
  text: string;
};

export type HomeCopy = {
  kicker: string;
  title: string;
  lead: string;
  hoursShort: string;
  visitEyebrow: string;
  visitTitle: string;
  visitLead: string;
  visitFooter: string;
  situationsEyebrow: string;
  situationsTitle: string;
  situationsLead: string;
  situationsAsideTitle: string;
  situationsAside: string;
  familyEyebrow: string;
  familyTitle: string;
  familyP1: string;
  familyP2: string;
  familyBoxTitle: string;
  familyBoxText: string;
  familyAsideTitle: string;
  familyAside: string;
  familyFooter: string;
  teamEyebrow: string;
  teamTitle: string;
  teamLead: string;
  teamAsideTitle: string;
  teamAside: string;
  offersEyebrow: string;
  offersTitle: string;
  offersLead: string;
  pricesEyebrow: string;
  pricesTitle: string;
  pricesLead: string;
  pricesAsideTitle: string;
  pricesAside: string;
  pricesCardTitle: string;
  pricesCardText: string;
  faqTitle: string;
  ctaTitle: string;
  ctaText: string;
  servicesEyebrow: string;
  servicesTitle: string;
  servicesLead: string;
  patientsEyebrow: string;
  patientsTitle: string;
  patientsLead: string;
  journalEyebrow: string;
  journalTitle: string;
  extraBlocks: TextBlock[];
};

export type PageIntro = {
  eyebrow: string;
  title: string;
  lead: string;
};

export type AboutCopy = PageIntro & {
  highlights: string[];
  note: string;
};

export type PricesPageCopy = PageIntro & {
  noteTitle: string;
  noteText: string;
  downloadLabel: string;
  downloadHref: string;
};

export type ServicesPageCopy = PageIntro;

export type DoctorsPageCopy = PageIntro;

export type ContactsPageCopy = PageIntro;

export type JournalPageCopy = PageIntro;

export type PatientsPageCopy = PageIntro & {
  beforeAfterEyebrow: string;
  beforeAfterTitle: string;
  beforeAfterLead: string;
  prepEyebrow: string;
  prepTitle: string;
  prepLead: string;
  formsTitle: string;
  formsLead: string;
  ctaTitle: string;
  ctaText: string;
};

export type NavItem = { href: string; label: string };

export type SiteContent = {
  theme: SiteTheme;
  clinic: ClinicInfo;
  nav: NavItem[];
  media: MediaContent;
  home: HomeCopy;
  about: AboutCopy;
  pricesPage: PricesPageCopy;
  servicesPage: ServicesPageCopy;
  doctorsPage: DoctorsPageCopy;
  contactsPage: ContactsPageCopy;
  journalPage: JournalPageCopy;
  patientsPage: PatientsPageCopy;
  doctors: Doctor[];
  services: Service[];
  serviceGroups: string[];
  journal: JournalArticle[];
  patientBeforeAfter: BeforeAfterItem[];
  visitPrep: PrepItem[];
  anamnesisFlags: string[];
  patientsCards: PatientsCard[];
  prices: PriceRow[];
  pricePreview: PricePreview[];
  offers: Offer[];
  faq: FaqItem[];
  visitSteps: VisitStep[];
  situations: Situation[];
  reviews: ReviewsContent;
};

export type BookingRequest = {
  id: string;
  createdAt: string;
  name: string;
  phone: string;
  comment: string;
  doctor: string;
};
