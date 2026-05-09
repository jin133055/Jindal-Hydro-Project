import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { homeMarkup } from './homeMarkup.js';
import { useSiteInteractions } from './useSiteInteractions.js';

const productCategories = [
  {
    name: 'Hydraulic Baling Press Machine',
    number: '01',
    viewAll: '/products?category=hydraulic-baling-press',
    products: [
      { slug: 'continuous-baler', name: 'Continuous Hydraulic Baler Machine', note: 'Uninterrupted scrap baling line' },
      { slug: 'triple-action-corrugated-baler', name: 'Triple Action Hydraulic Corrugated Cardboard Baler Machine', note: 'Triple compression baling system' },
      { slug: 'mini-jumbo-baling-press', name: 'Mini Jumbo Hydraulic Baling Press', note: 'Compact high-density baler' },
      { slug: 'heavy-duty-jumbo-baling-press', name: 'Heavy Duty Jumbo Hydraulic Baling Press', note: 'Heavy scrap compaction' },
      { slug: 'double-action-manual-baling-press', name: 'Double Action Hydraulic Baling Press Machine (Manual)', note: 'Manual double-action press' },
      { slug: 'jumbo-baling-press-without-hopper', name: 'Jumbo Hydraulic Baling Press Without Hopper', note: 'Open-feed baling press' },
      { slug: 'vertical-baling-press', name: 'Vertical Hydraulic Baling Press', note: 'Low footprint vertical press' },
      { slug: 'horizontal-baling-press', name: 'Horizontal Hydraulic Baling Press', note: 'Horizontal bale discharge' },
    ],
  },
  {
    name: 'Hydraulic Presses',
    number: '02',
    viewAll: '/products?category=hydraulic-presses',
    products: [
      { slug: 'hydraulic-press-brake', name: 'Hydraulic Press Brake', note: 'Precision bending and forming' },
      { slug: 'h-frame-hydraulic-press', name: 'H Frame Hydraulic Press', note: 'Workshop and production pressing' },
      { slug: 'c-frame-hydraulic-press', name: 'C Frame Hydraulic Press', note: 'Open-front press access' },
      { slug: 'deep-drawing-press', name: 'Deep Drawing Hydraulic Press', note: 'Sheet metal forming press' },
      { slug: 'rubber-moulding-press', name: 'Rubber Moulding Hydraulic Press', note: 'Controlled heat and pressure' },
      { slug: 'powder-compacting-press', name: 'Powder Compacting Hydraulic Press', note: 'High precision compaction' },
    ],
  },
  {
    name: 'Hydraulic Cylinders',
    number: '03',
    viewAll: '/products?category=hydraulic-cylinders',
    products: [
      { slug: 'double-acting-cylinder', name: 'Double Acting Hydraulic Cylinder', note: 'Up to 250 bar operating pressure' },
      { slug: 'front-flange-cylinder', name: 'Front Flange Cylinder', note: 'Rigid mounting for press applications' },
      { slug: 'industrial-pneumatic-cylinder', name: 'Industrial Pneumatic Cylinder', note: 'Fast automation-ready motion control' },
      { slug: 'telescopic-cylinder', name: 'Telescopic Hydraulic Cylinder', note: 'Long stroke in compact installations' },
      { slug: 'tie-rod-cylinder', name: 'Tie Rod Hydraulic Cylinder', note: 'Serviceable industrial cylinder' },
      { slug: 'welded-cylinder', name: 'Welded Body Hydraulic Cylinder', note: 'Heavy-duty welded construction' },
    ],
  },
  {
    name: 'Recycling Machines',
    number: '04',
    viewAll: '/products?category=recycling-machines',
    products: [
      { slug: 'industrial-shredder', name: 'Industrial Shredder', note: 'Twin-shaft shredding for scrap streams' },
      { slug: 'alligator-shear', name: 'Alligator Shear', note: 'Fast cutting for scrap yards' },
      { slug: 'guillotine-shear', name: 'Guillotine Shear', note: 'Heavy plate and metal section cutting' },
      { slug: 'metal-chip-briquetting-machine', name: 'Metal Chip Briquetting Machine', note: 'Chip recovery and densification' },
      { slug: 'drum-crusher', name: 'Drum Crusher', note: 'Barrel and drum volume reduction' },
      { slug: 'scrap-grabber', name: 'Scrap Grabber', note: 'Material handling attachment' },
    ],
  },
  {
    name: 'Power Packs & Systems',
    number: '05',
    viewAll: '/products?category=power-packs',
    products: [
      { slug: 'hydraulic-power-pack', name: 'Hydraulic Power Pack', note: 'Central HPU for heavy machinery' },
      { slug: 'compact-power-pack', name: 'Compact Power Pack', note: 'Space-saving hydraulic power unit' },
      { slug: 'custom-power-unit', name: 'Custom Power Unit', note: 'Built for site-specific duty cycles' },
      { slug: 'hydraulic-manifold-block', name: 'Hydraulic Manifold Block', note: 'Integrated flow control system' },
      { slug: 'oil-filtration-system', name: 'Oil Filtration System', note: 'Cleaner oil, longer component life' },
    ],
  },
  {
    name: 'Material Handling',
    number: '06',
    viewAll: '/products?category=material-handling',
    products: [
      { slug: 'rotating-tower-crane', name: 'Rotating Tower Crane', note: 'Scrap yard loading and feeding' },
      { slug: 'hydraulic-grabber', name: 'Hydraulic Grabber', note: 'Bulk scrap handling attachment' },
      { slug: 'charging-conveyor', name: 'Charging Conveyor', note: 'Continuous feed automation' },
      { slug: 'scrap-loader', name: 'Scrap Loader', note: 'Heavy-duty loading support' },
    ],
  },
];

const productDetails = {
  'double-acting-cylinder': {
    name: 'Double Acting Hydraulic Cylinder',
    description: 'Heavy-duty cylinder designed for precise push-pull motion in presses, balers, shears, and custom hydraulic systems.',
    specs: { Pressure: 'Up to 250 bar', Power: 'Hydraulic HPU matched', Stroke: '100 mm - 3000 mm', Material: 'Honed steel tube, hard chrome rod' },
  },
  'front-flange-cylinder': {
    name: 'Front Flange Cylinder',
    description: 'Flange-mounted cylinder for rigid industrial installations where alignment and repeatable force delivery matter.',
    specs: { Pressure: '160 - 250 bar', Power: 'Application-specific', Stroke: '150 mm - 2200 mm', Material: 'Alloy steel body' },
  },
  'industrial-pneumatic-cylinder': {
    name: 'Industrial Pneumatic Cylinder',
    description: 'Fast, reliable pneumatic actuation for automation lines, fixtures, sorting equipment, and light industrial machinery.',
    specs: { Pressure: '6 - 10 bar air', Power: 'Compressed air', Stroke: '25 mm - 1000 mm', Material: 'Aluminium barrel, steel rod' },
  },
  'telescopic-cylinder': {
    name: 'Telescopic Hydraulic Cylinder',
    description: 'Multi-stage cylinder for applications requiring long travel from a compact retracted length.',
    specs: { Pressure: '160 - 250 bar', Power: 'Hydraulic power pack', Stroke: '500 mm - 6000 mm', Material: 'Hardened steel stages' },
  },
  'hydraulic-power-pack': {
    name: 'Hydraulic Power Pack',
    description: 'Compact or centralized hydraulic power unit configured for balers, shears, presses, and plant-wide machinery.',
    specs: { Pressure: 'Up to 315 bar', Power: '15 - 500 HP', Stroke: 'Machine dependent', Material: 'MS reservoir, branded valves' },
  },
  'compact-power-pack': {
    name: 'Compact Power Pack',
    description: 'Space-efficient hydraulic power unit for smaller presses, fixtures, and standalone equipment.',
    specs: { Pressure: 'Up to 210 bar', Power: '3 - 25 HP', Stroke: 'Machine dependent', Material: 'Compact MS reservoir' },
  },
  'custom-power-unit': {
    name: 'Custom Power Unit',
    description: 'Engineered hydraulic power unit designed around your pressure, flow, cooling, and control requirements.',
    specs: { Pressure: 'Up to 315 bar', Power: 'Custom configured', Stroke: 'Machine dependent', Material: 'Industrial-grade hydraulic components' },
  },
  'vertical-baling-press': {
    name: 'Vertical Baling Press',
    description: 'Compact vertical press for controlled baling of recyclable materials where floor space is limited.',
    specs: { Pressure: '160 - 250 bar', Power: '10 - 75 HP', Stroke: 'Custom ram stroke', Material: 'Fabricated steel frame' },
  },
  'scrap-baling-press': {
    name: 'Hydraulic Scrap Baling Press',
    description: 'High-compression baling press built to convert loose metal scrap into dense transport-ready bales.',
    specs: { Pressure: '200 - 315 bar', Power: '30 - 250 HP', Stroke: 'Custom ram stroke', Material: 'Heavy fabricated steel' },
  },
  'press-brake': {
    name: 'Hydraulic Press Brake',
    description: 'Precision forming machine for bending plates and sheet metal with repeatable hydraulic force.',
    specs: { Pressure: 'Up to 250 bar', Power: 'Application matched', Stroke: '100 mm - 500 mm', Material: 'Stress-relieved steel frame' },
  },
  'industrial-shredder': {
    name: 'Industrial Shredder',
    description: 'Twin-shaft shredding system for metal scrap, industrial waste, e-waste, and bulky recycling streams.',
    specs: { Pressure: 'Hydraulic drive option', Power: '50 - 500 HP', Stroke: 'Rotary cutting', Material: 'Hardened alloy cutters' },
  },
  'alligator-shear': {
    name: 'Alligator Shear',
    description: 'Rugged jaw-style shear for fast cutting of bars, rods, sections, and mixed metal scrap.',
    specs: { Pressure: '200 - 315 bar', Power: '15 - 100 HP', Stroke: 'Shear jaw travel', Material: 'Hardened blades, steel frame' },
  },
  'guillotine-shear': {
    name: 'Guillotine Shear',
    description: 'Heavy-duty straight-cut shearing machine for plate, structural scrap, and high-volume yards.',
    specs: { Pressure: 'Up to 315 bar', Power: '50 - 300 HP', Stroke: 'Blade travel custom', Material: 'Fabricated body, alloy blades' },
  },
};

const fallbackProduct = {
  name: 'Hydraulic Recycling Machine',
  description: 'Industrial-grade hydraulic machinery engineered for reliable operation in demanding recycling and metal processing environments.',
  specs: { Pressure: 'Up to 315 bar', Power: 'Application matched', Stroke: 'Custom engineered', Material: 'Heavy-duty fabricated steel' },
};

const findProductBySlug = (slug) => {
  for (const category of productCategories) {
    const product = category.products.find((item) => item.slug === slug);
    if (product) return { ...product, category: category.name };
  }
  return null;
};

const getProductDetail = (slug) => {
  const listedProduct = findProductBySlug(slug);
  if (productDetails[slug]) {
    return {
      ...productDetails[slug],
      category: listedProduct?.category || 'Industrial Machinery',
    };
  }

  if (!listedProduct) return { ...fallbackProduct, category: 'Industrial Machinery' };

  return {
    name: listedProduct.name,
    category: listedProduct.category,
    description: `${listedProduct.name} is engineered for dependable industrial duty, consistent output, and simplified maintenance across recycling, fabrication, and hydraulic production environments.`,
    specs: {
      Pressure: 'Up to 315 bar',
      Power: 'Application matched',
      Stroke: 'Custom engineered',
      Material: 'Heavy-duty fabricated steel',
    },
  };
};

const featureGroups = [
  {
    title: 'Efficiency / Operation',
    items: [
      <>India&apos;s fastest Production Time: <strong>100-120 bales/hr</strong></>,
      <>India&apos;s fastest Cycle Time: <strong>&lt;35secs</strong></>,
      <>Automatic operation with remote control</>,
      <>Special design that eliminates the scrap feeding time</>,
      <>Production capability of up to <strong>4-80tons/hr</strong></>,
      <>Bale Size from 10 x 10 up to 18 x 18</>,
      <>Feeding can be done by grabber or conveyor</>,
      <>Low cycle times through high efficiency hydraulic design</>,
      <>Low overall operating cost</>,
      <>Bale and Chamber size can be modified as per requirement</>,
    ],
  },
  {
    title: 'Durability',
    items: [
      <>Heavy-duty fabricated body for continuous industrial operation</>,
      <>Hardened and chrome-coated piston rods with honed pipes</>,
      <>High-quality hydraulic seals for longer service life</>,
      <>Oil filtration options for cleaner hydraulic operation</>,
    ],
  },
  {
    title: 'Material Processing Capabilities',
    items: [
      <>Turning scrap, aluminium scrap, drum scrap, tin sheet scrap</>,
      <>Cardboard, paper, OCC and mixed recyclable material streams</>,
      <>Copper, steel, stainless steel, lead and foundry scrap</>,
    ],
  },
  {
    title: 'Suitable Industries',
    items: [
      <>Metal recycling facilities and scrap yards</>,
      <>Manufacturing plants, casting plants and steel facilities</>,
      <>Automotive factories and scrap processing centers</>,
    ],
  },
];

const faqs = [
  {
    question: 'What are the installation requirements?',
    answer: 'Requirements vary by model, but usually include hydraulic oil, a level industrial floor, electrical connections, and safe machine access for loading and maintenance.',
  },
  {
    question: 'Do you offer warranty?',
    answer: 'Yes. Warranty and support terms can be configured with the quotation based on machine type, operating conditions, and service requirements.',
  },
  {
    question: 'Can the chamber size and bale size be customized?',
    answer: 'Yes. Chamber size, bale size, motor capacity, stroke, and control options can be engineered according to your material and throughput requirements.',
  },
  {
    question: 'How long does delivery take?',
    answer: 'Delivery depends on the machine configuration and site requirements. Standard machines are faster, while customized systems require engineering and fabrication time.',
  },
];

const aboutOfferings = [
  ['Hydraulic Presses', 'Precision pressing, forming and production-duty hydraulic press systems.', '/images/homepage.png'],
  ['Baling Machines', 'Horizontal, vertical and custom balers for metal, paper and recyclable materials.', '/images/homepage.png'],
  ['Shredders', 'Heavy-duty shredding solutions for scrap, industrial waste and recycling streams.', '/images/homepage.png'],
  ['Power Packs', 'Hydraulic power units designed around pressure, flow, cooling and controls.', '/images/homepage.png'],
  ['Hydraulic Cylinders', 'Industrial cylinders for presses, balers, material handling and automation.', '/images/homepage.png'],
  ['Solar Systems', 'Integrated solar and industrial energy support solutions for facilities.', '/images/homepage.png'],
];

const businessDetails = [
  ['Year of Establishment', '2000'],
  ['Nature of Business', 'Manufacturer, exporter and supplier'],
  ['Employee Count', '50+ professionals'],
  ['Production Capacity', 'Application and model dependent'],
  ['Quality System', 'ISO 9001:2015 and TQM practices'],
  ['Annual Turnover', 'Available on request'],
  ['Core Markets', 'India and export customers'],
  ['Specialization', 'Hydraulic, recycling and turnkey industrial systems'],
];

const aboutStrengths = [
  ['customization', 'Customization', 'Machines engineered around material, capacity, site layout and duty cycle.'],
  ['research', 'Strong R&D', 'Practical design improvement, testing and application-led development.'],
  ['pricing', 'Competitive Pricing', 'Cost-conscious engineering without compromising industrial reliability.'],
  ['delivery', 'Fast Delivery', 'Focused production planning, fabrication control and responsive coordination.'],
];

const servedIndustries = [
  ['factory', 'Manufacturing'],
  ['recycle', 'Recycling'],
  ['automotive', 'Automotive'],
  ['rail', 'Railways'],
  ['shield', 'Defense'],
  ['steel', 'Steel Plants'],
  ['waste', 'Waste Management'],
  ['energy', 'Energy & Solar'],
];

const infrastructurePoints = [
  'Metal forming, fabrication and heavy machine assembly',
  'Cutting technologies for plates, frames and industrial structures',
  'Tooling, fixtures and hydraulic integration capability',
  'Turnkey systems for recycling, pressing and material handling lines',
];

const qualityPoints = [
  ['innovation', 'Innovation-focused design for better uptime and maintainability'],
  ['testing', 'Testing of hydraulic assemblies, controls and machine operation'],
  ['iso', 'ISO 9001:2015 quality alignment with TQM-led practices'],
  ['inspection', 'Inspection checkpoints from fabrication through commissioning'],
];

const teamRoles = [
  ['Engineers', 'Hydraulic design, system sizing and performance validation', '/images/homepage.png'],
  ['Designers', 'Machine layouts, tooling, fabrication drawings and ergonomics', '/images/homepage.png'],
  ['Researchers', 'Process improvement, materials, automation and new applications', '/images/homepage.png'],
  ['Technical Experts', 'Installation, troubleshooting, training and service support', '/images/homepage.png'],
];

const trustedClients = ['Tata Motors', 'Hindalco', 'Birla Group', 'Jindal Steel', 'Mahindra', 'L&T'];

const services = [
  ['Spare Parts Supply', 'Critical spares and hydraulic components for machine uptime.'],
  ['Maintenance Support', 'Preventive checks, repair guidance and service coordination.'],
  ['Installation', 'Site installation, commissioning and operator handover support.'],
  ['Training', 'Machine operation, safety practices and routine maintenance training.'],
];

const solutionSections = [
  {
    number: '01',
    title: 'Metal Recycling',
    image: '/images/homepage.png',
    intro: 'End-to-end systems for ferrous and non-ferrous metal processing, from loose scrap intake to compact, transport-ready output.',
    details: [
      'Hydraulic balers, shears, shredders and conveyors configured around scrap type and throughput goals.',
      'Systems can support steel, aluminium, copper, mixed industrial scrap and foundry returns.',
      'Layouts focus on efficient feeding, dense output, reduced handling effort and easier maintenance access.',
    ],
  },
  {
    number: '02',
    title: 'Waste Management',
    image: '/images/homepage.png',
    intro: 'Municipal and industrial waste processing solutions designed to improve volume reduction, sorting support and operational flow.',
    details: [
      'Machinery options for compaction, shredding, baling and material movement across waste handling facilities.',
      'Built for mixed waste, packaging waste, cardboard, plastics and recyclable material streams.',
      'Practical system planning helps reduce storage space, improve logistics and support cleaner processing lines.',
    ],
  },
  {
    number: '03',
    title: 'Scrap Processing',
    image: '/images/homepage.png',
    intro: 'Integrated shredding, sorting and densification systems for scrap dealers, steel plants, foundries and heavy industrial sites.',
    details: [
      'Custom machine combinations for cutting, feeding, loading, baling and output preparation.',
      'Hydraulic power packs and controls are matched to duty cycle, material hardness and production schedule.',
      'Solutions are engineered for uptime, operator safety, serviceability and long-term productivity.',
    ],
  },
];

const pageCopy = {
  products: {
    label: 'Products',
    title: 'Industrial Machinery Built for Real Throughput',
    text: 'Explore hydraulic balers, shears, shredders, compactors, and hydraulic power systems engineered for scrap yards, recyclers, mills, and industrial plants.',
  },
  'product-detail': {
    label: 'Product Detail',
    title: 'Hydraulic Scrap Baler',
    text: 'A high-compression baling platform for ferrous, non-ferrous, and mixed industrial scrap. Detailed product pages can now be built as reusable React routes.',
  },
  solutions: {
    label: 'Solutions',
    title: 'Recycling Systems for Every Operation',
    text: 'From metal recycling and waste management to custom hydraulic engineering, this route is ready for industry-specific solution pages.',
  },
  about: {
    label: 'About',
    title: 'Engineering Hydraulic Solutions Since 2000',
    text: 'Use this page for company history, manufacturing capability, certifications, team, and global installation footprint.',
  },
  'case-studies': {
    label: 'Case Studies',
    title: 'Proven Results in Heavy Industry',
    text: 'This route can hold project stories, throughput gains, ROI numbers, and before-after deployment details.',
  },
  blog: {
    label: 'Blog',
    title: 'Insights on Recycling Machinery',
    text: 'Use this route for articles, buying guides, maintenance tips, and industry updates.',
  },
  contact: {
    label: 'Contact',
    title: 'Tell Us What You Need to Process',
    text: 'Connect this page to a real inquiry workflow, CRM, or email endpoint when you are ready.',
  },
  'not-found': {
    label: '404',
    title: 'Page Not Found',
    text: 'The page you are looking for does not exist yet.',
  },
};

function ProductsMegaMenu() {
  return (
    <li className="has-dropdown products-nav">
      <Link to="/products">Products <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path></svg></Link>
      <div className="nav-dropdown product-mega">
        <div className="product-mega-shell">
          <div className="product-category-column">
            <div className="product-menu-kicker">Explore Machinery</div>
            {productCategories.map((category, index) => (
              <div className={`product-category ${index === 0 ? 'is-active' : ''}`} key={category.name}>
                <button className="product-category-toggle" type="button">{category.name}<span>{category.products.length}</span></button>
                <div className="product-subpanel">
                  <div className="product-panel-heading">{category.name}</div>
                  {category.products.map((product) => (
                    <Link className="product-link" to={`/product-detail?product=${product.slug}`} key={product.slug}>
                      <strong>{product.name}</strong>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </li>
  );
}

function Header() {
  return (
    <nav id="main-nav">
      <Link className="nav-logo" to="/">
        <img src="/images/logo_transparent.png" alt="Jindal Hydro Projects Inc. logo" />
        <span className="logo-text">Jindal Hydro Projects Inc<span>.</span></span>
      </Link>
      <ul className="nav-links">
        <li><Link to="/about">About</Link></li>
        <ProductsMegaMenu />
        <li><Link to="/solutions">Solutions</Link></li>
        <li><Link to="/case-studies">Case Studies</Link></li>
        <li><Link to="/blog">Blog</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
      <Link className="nav-cta" to="/contact">Get a Quote</Link>
      <button className="nav-mobile-toggle" id="navToggle" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
    </nav>
  );
}

function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-top">
          <div>
            <div className="footer-brand-name">Jindal Hydro Projects Inc<span>.</span></div>
            <div className="footer-tagline">Advanced hydraulic and recycling solutions engineered for industrial applications since 2000.</div>
          </div>
          <div className="footer-col">
            <h5>Products</h5>
            <ul>
              <li><Link to="/products">Baling Press</Link></li>
              <li><Link to="/products">Industrial Shredders</Link></li>
              <li><Link to="/products">Scrap Compactors</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Solutions</h5>
            <ul>
              <li><Link to="/solutions">Metal Recycling</Link></li>
              <li><Link to="/solutions">Waste Management</Link></li>
              <li><Link to="/solutions">Turnkey Projects</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Company</h5>
            <ul>
              <li><Link to="/about">About Jindal Hydro Projects Inc.</Link></li>
              <li><Link to="/case-studies">Case Studies</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-copy">© 2026 Jindal Hydro Projects Inc. All rights reserved.</div>
          <div className="footer-cert">
            <div className="cert-badge">ISO 9001:2015</div>
            <div className="cert-badge">CE Certified</div>
            <div className="cert-badge">Made in India</div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function PlaceholderPage({ page }) {
  const content = pageCopy[page] || pageCopy['not-found'];

  return (
    <>
      <Header />
      <main className="page-shell">
        <section className="page-hero">
          <div className="section-label">{content.label}</div>
          <h1>{content.title}</h1>
          <p>{content.text}</p>
          <div className="hero-btns">
            <Link className="btn-primary" to="/contact">Request Quote</Link>
            <Link className="btn-secondary" to="/">Back Home</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function SolutionsPage() {
  return (
    <>
      <Header />
      <main className="solutions-page">
        <section className="solutions-page-hero reveal">
          <div className="section-label">Industry Solutions</div>
          <h1>Engineered Solutions for Recycling, Waste and Scrap Operations</h1>
          <p>Explore focused machinery systems designed around material type, handling flow, production capacity and long-term industrial reliability.</p>
        </section>

        <section className="solutions-stack">
          {solutionSections.map((solution, index) => (
            <article className={`solution-detail-card reveal ${index % 2 === 1 ? 'is-reversed' : ''}`} key={solution.title}>
              <div className="solution-detail-image">
                <img src={solution.image} alt={`${solution.title} solution`} />
              </div>
              <div className="solution-detail-content">
                <div className="solution-detail-number">{solution.number} / Solution</div>
                <h2>{solution.title}</h2>
                <p>{solution.intro}</p>
                <ul className="solution-detail-list">
                  {solution.details.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <Link className="btn-primary" to="/contact">Discuss Requirement</Link>
              </div>
            </article>
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}

function ContactPage() {
  return (
    <>
      <Header />
      <main className="contact-page">
        <section className="contact-hero reveal">
          <div className="section-label">Contact Us</div>
          <h1>Tell Us What You Need to Build, Press or Recycle</h1>
          <p>Share your machine requirement, material type, capacity and site details. Our team will help you move from inquiry to the right hydraulic solution.</p>
        </section>

        <section className="contact-section">
          <div className="contact-info-panel reveal">
            <div className="section-label">Get a Quote</div>
            <h2>Speak With Jindal Hydro Projects Inc.</h2>
            <p>Send a project brief and our engineering team will review your requirement for hydraulic machinery, recycling systems, power packs, presses or custom equipment.</p>
            <div className="contact-methods">
              <a href="tel:+919868247362">
                <span>Phone</span>
                <strong>+91 9868247362</strong>
              </a>
              <a href="mailto:info@jindalhydroprojects.com">
                <span>Email</span>
                <strong>info@jindalhydroprojects.com</strong>
              </a>
              <div>
                <span>Response Time</span>
                <strong>Within 24 hours</strong>
              </div>
            </div>
          </div>

          <div className="contact-form-panel reveal reveal-delay-1">
            <form name="contact-inquiry">
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="contact_name">Full Name</label>
                  <input id="contact_name" name="name" type="text" placeholder="Your name" required />
                </div>
                <div className="form-group">
                  <label htmlFor="contact_company">Company</label>
                  <input id="contact_company" name="company" type="text" placeholder="Company name" />
                </div>
                <div className="form-group">
                  <label htmlFor="contact_email">Email</label>
                  <input id="contact_email" name="email" type="email" placeholder="you@company.com" required />
                </div>
                <div className="form-group">
                  <label htmlFor="contact_phone">Phone</label>
                  <input id="contact_phone" name="phone" type="tel" placeholder="+91 ..." />
                </div>
                <div className="form-group">
                  <label htmlFor="contact_solution">Requirement</label>
                  <select id="contact_solution" name="requirement">
                    <option value="">Select requirement</option>
                    <option>Hydraulic Press</option>
                    <option>Baling Machine</option>
                    <option>Recycling System</option>
                    <option>Hydraulic Power Pack</option>
                    <option>Custom Machinery</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="contact_capacity">Capacity</label>
                  <input id="contact_capacity" name="capacity" type="text" placeholder="e.g. 10 T/hr" />
                </div>
                <div className="form-group full">
                  <label htmlFor="contact_message">Project Details</label>
                  <textarea id="contact_message" name="message" rows="5" placeholder="Tell us about material, capacity, site conditions or machine requirements..."></textarea>
                </div>
              </div>
              <button className="form-submit" type="submit">Submit Inquiry</button>
            </form>
          </div>
        </section>

        <section className="contact-highlights reveal">
          <div>
            <strong>01</strong>
            <span>Requirement review by technical team</span>
          </div>
          <div>
            <strong>02</strong>
            <span>Machine or system recommendation</span>
          </div>
          <div>
            <strong>03</strong>
            <span>Quotation with configuration details</span>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function IndustryIcon({ type }) {
  const common = { width: '28', height: '28', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '1.8', strokeLinecap: 'round', strokeLinejoin: 'round' };
  const icons = {
    factory: <><path d="M3 21V9l6 3V9l6 3V5h6v16H3z" /><path d="M7 17h2M12 17h2M17 17h2" /></>,
    recycle: <><path d="M7 7l2-4 2 4" /><path d="M9 3l4 7H5" /><path d="M17 17l-2 4-2-4" /><path d="M15 21l-4-7h8" /><path d="M16 7h5l-2.5 4" /></>,
    automotive: <><path d="M5 16l1.5-5h11L19 16" /><path d="M4 16h16v4H4z" /><path d="M7 20v1M17 20v1" /><circle cx="7" cy="18" r="1" /><circle cx="17" cy="18" r="1" /></>,
    rail: <><rect x="6" y="3" width="12" height="14" rx="2" /><path d="M9 17l-2 4M15 17l2 4M9 7h6M9 11h6" /><circle cx="9" cy="14" r="1" /><circle cx="15" cy="14" r="1" /></>,
    shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" /></>,
    steel: <><path d="M4 19h16" /><path d="M6 19V8l6-4 6 4v11" /><path d="M9 19v-6h6v6" /><path d="M9 9h6" /></>,
    waste: <><path d="M4 7h16" /><path d="M9 7V4h6v3" /><path d="M7 7l1 14h8l1-14" /><path d="M10 11v6M14 11v6" /></>,
    energy: <><path d="M13 2L5 14h6l-1 8 8-12h-6l1-8z" /><path d="M3 21h18" /></>,
  };

  return <svg {...common}>{icons[type] || icons.factory}</svg>;
}

function QualityIcon({ type }) {
  const common = { width: '26', height: '26', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '1.8', strokeLinecap: 'round', strokeLinejoin: 'round' };
  const icons = {
    innovation: <><path d="M9 18h6" /><path d="M10 22h4" /><path d="M8.5 14.5A6 6 0 1 1 15.5 14.5c-.8.6-1.2 1.4-1.4 2.5H9.9c-.2-1.1-.6-1.9-1.4-2.5z" /><path d="M12 2v2M4.9 4.9l1.4 1.4M19.1 4.9l-1.4 1.4" /></>,
    testing: <><path d="M14 2v6l4.5 7.5A4 4 0 0 1 15.1 22H8.9a4 4 0 0 1-3.4-6.5L10 8V2" /><path d="M8 2h8" /><path d="M8.2 16h7.6" /><path d="M10 12h4" /></>,
    iso: <><path d="M12 2l7 4v6c0 5-3 8-7 10-4-2-7-5-7-10V6l7-4z" /><path d="M8.5 12l2.2 2.2 4.8-5" /></>,
    inspection: <><path d="M9 3h6l1 2h3v16H5V5h3l1-2z" /><path d="M9 12l2 2 4-4" /><path d="M8 18h8" /></>,
  };

  return <svg {...common}>{icons[type] || icons.innovation}</svg>;
}

function StrengthIcon({ type }) {
  const common = { width: '26', height: '26', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '1.8', strokeLinecap: 'round', strokeLinejoin: 'round' };
  const icons = {
    customization: <><path d="M4 7h9" /><path d="M4 17h16" /><circle cx="17" cy="7" r="3" /><circle cx="8" cy="17" r="3" /></>,
    research: <><circle cx="10.5" cy="10.5" r="5.5" /><path d="M15 15l5 5" /><path d="M8 10h5M10.5 7.5v5" /></>,
    pricing: <><path d="M20 12V6a2 2 0 0 0-2-2h-6L4 12l8 8 8-8z" /><circle cx="15.5" cy="8.5" r="1" /><path d="M9 13l2 2 4-5" /></>,
    delivery: <><path d="M3 16V7h11v9" /><path d="M14 11h3l4 4v1h-7" /><circle cx="7" cy="18" r="2" /><circle cx="17" cy="18" r="2" /><path d="M6 10h5" /></>,
  };

  return <svg {...common}>{icons[type] || icons.customization}</svg>;
}

function AboutPage() {
  return (
    <>
      <Header />
      <main className="about-page">
        <section className="about-hero reveal">
          <img src="/images/homepage.png" alt="Industrial hydraulic machinery facility" />
          <div className="about-hero-overlay"></div>
          <div className="about-hero-content">
            <div className="section-label">Company Profile</div>
            <h1>About Jindal Hydro Projects Inc.</h1>
            <p>Engineering Advanced Hydraulic & Recycling Solutions Since 2000.</p>
            <Link className="btn-primary" to="/products">Explore Products</Link>
          </div>
        </section>

        <section className="about-section about-overview">
          <div className="about-copy reveal">
            <div className="section-label">Overview</div>
            <h2>Built for Advanced Hydraulic Engineering</h2>
            <p>Jindal Hydro Projects Inc. is a manufacturer, exporter and supplier of hydraulic, recycling and industrial machinery built for dependable production environments.</p>
            <p>Since 2000, the company has focused on practical engineering, durable fabrication, responsive support and machinery configured around customer capacity, material and site needs.</p>
          </div>
          <div className="about-image reveal reveal-delay-1">
            <img src="/images/homepage.png" alt="Hydraulic recycling machine in operation" />
          </div>
        </section>

        <section className="about-section about-detail-band">
          <div className="about-section-head reveal">
            <div className="section-label">Company Details</div>
            <h2>Key Information</h2>
          </div>
          <div className="business-detail-grid">
            {businessDetails.map(([label, value]) => (
              <div className="business-detail-row reveal" key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
        </section>

        <section className="about-section">
          <div className="about-section-head reveal">
            <div className="section-label">What We Do</div>
            <h2>Core Product Capabilities</h2>
          </div>
          <div className="about-product-carousel" aria-label="Core product capabilities">
            {aboutOfferings.map(([title, text, image]) => (
              <div className="about-product-card reveal" key={title}>
                <img src={image} alt={title} />
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="about-section about-gallery-layout">
          <div className="about-copy reveal">
            <div className="section-label">Infrastructure</div>
            <h2>Infrastructure & Manufacturing</h2>
            <p>Manufacturing capability is organized around robust fabrication, hydraulic integration, tooling control and turnkey machine delivery.</p>
            <ul className="about-check-list">
              {infrastructurePoints.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="about-gallery reveal reveal-delay-1">
            <img src="/images/homepage.png" alt="Hydraulic machine manufacturing" />
            <img src="/images/homepage.png" alt="Machine fabrication and assembly" />
            <img src="/images/homepage.png" alt="Industrial recycling equipment" />
          </div>
        </section>

        <section className="about-section about-split-dark">
          <div className="about-copy reveal">
            <div className="section-label">R&D and Quality</div>
            <h2>Innovation, Testing and Continuous Improvement</h2>
            <p>Engineering work is supported by design review, hydraulic validation, quality checkpoints and process discipline aligned with ISO 9001:2015 and TQM practices.</p>
          </div>
          <div className="about-strength-grid reveal reveal-delay-1">
            {qualityPoints.map(([icon, title]) => (
              <div className="about-strength-card" key={title}>
                <span className="about-icon"><QualityIcon type={icon} /></span>
                <p>{title}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="about-section about-detail-band about-industries-band">
          <div className="about-section-head reveal">
            <div className="section-label">Industries We Serve</div>
            <h2>Designed for Demanding Industrial Sectors</h2>
          </div>
          <div className="industry-grid about-icon-grid">
            {servedIndustries.map(([icon, title]) => (
              <div className="industry-chip reveal" key={title}>
                <span className="industry-icon"><IndustryIcon type={icon} /></span>
                <strong>{title}</strong>
              </div>
            ))}
          </div>
        </section>

        <section className="about-section">
          <div className="about-section-head reveal">
            <div className="section-label">Our Team</div>
            <h2>People Behind the Machines</h2>
          </div>
          <div className="about-card-grid about-team-grid">
            {teamRoles.map(([title, text, image]) => (
              <div className="about-team-card reveal" key={title}>
                <img src={image} alt={title} />
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="about-section about-detail-band">
          <div className="about-section-head reveal">
            <div className="section-label">Trusted By</div>
            <h2>Clients & Industrial Brands</h2>
          </div>
          <div className="client-logo-grid">
            {trustedClients.map((client) => (
              <div className="client-logo-card reveal" key={client}>{client}</div>
            ))}
          </div>
        </section>

        <section className="about-section about-why-section">
          <div className="about-section-head reveal">
            <div className="section-label">Why Choose Us</div>
            <h2>Strengths That Matter on the Shop Floor</h2>
          </div>
          <div className="about-card-grid about-four-grid">
            {aboutStrengths.map(([icon, title, text]) => (
              <div className="about-feature-card reveal" key={title}>
                <span className="about-icon"><StrengthIcon type={icon} /></span>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="about-section about-services-band">
          <div className="about-section-head reveal">
            <div className="section-label">Services</div>
            <h2>Support Beyond Manufacturing</h2>
          </div>
          <div className="about-card-grid about-four-grid">
            {services.map(([title, text]) => (
              <div className="about-service-card reveal" key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="about-section about-vision reveal">
          <div className="section-label">Future Vision</div>
          <h2>Expanding Smarter Industrial Solutions</h2>
          <p>Jindal Hydro Projects Inc. is focused on expanding advanced hydraulic systems, recycling machinery, solar-integrated solutions and export-ready turnkey projects while strengthening research, quality and customer support.</p>
        </section>

        <section className="about-cta reveal">
          <div>
            <div className="section-label">Partner With Us</div>
            <h2>Partner with Jindal Hydro Projects Inc.</h2>
            <p>Share your machine requirement, target output and site conditions. Our team will help configure a practical industrial solution.</p>
          </div>
          <Link className="btn-primary" to="/contact">Get a Quote</Link>
        </section>
      </main>
      <Footer />
    </>
  );
}

function ProductDetailPage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const currentSlug = params.get('product') || productCategories[0].products[0].slug;
  const product = getProductDetail(currentSlug);
  const [openCategory, setOpenCategory] = useState(product.category);

  useEffect(() => {
    setOpenCategory(product.category);
  }, [product.category]);

  return (
    <>
      <Header />
      <main className="product-detail-page">
        <div className="product-browser-layout">
          <aside className="product-sidebar">
            <h2>Products We Offer</h2>
            {productCategories.map((category) => (
              <details className="product-sidebar-group" open={openCategory === category.name} key={category.name}>
                <summary onClick={(event) => {
                  event.preventDefault();
                  setOpenCategory((current) => current === category.name ? null : category.name);
                }}>{category.name} <span>({category.products.length})</span></summary>
                <div className="product-sidebar-links">
                  <Link className="sidebar-product-link" to={category.viewAll}>
                    All {category.name}
                  </Link>
                  {category.products.map((item) => (
                    <Link
                      className={`sidebar-product-link ${item.slug === currentSlug ? 'active' : ''}`}
                      to={`/product-detail?product=${item.slug}`}
                      key={item.slug}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </details>
            ))}
          </aside>

          <section className="product-display">
            <div className="product-detail-hero">
              <div className="product-detail-media">
                <img src="/images/homepage.png" alt={product.name} />
              </div>
              <div className="product-detail-content">
                <div className="section-label">{product.category}</div>
                <h1>{product.name}</h1>
                <p>{product.description}</p>
                <div className="hero-btns">
                  <Link className="btn-primary" to="/contact">Enquire Now</Link>
                  <a className="btn-secondary" href="#product-video">Watch Video</a>
                </div>
              </div>
            </div>

            <section className="product-info-section">
              <h2>Description</h2>
              <p>{product.description}</p>
            </section>

            <section className="product-info-section">
              <h2>Key Specifications</h2>
              <div className="spec-grid">
                {Object.entries(product.specs).map(([label, value]) => (
                  <div className="spec-item" key={label}>
                    <span>{label}</span>
                    <strong>{value}</strong>
                  </div>
                ))}
              </div>
            </section>

            <section className="product-info-section">
              <h2>Features</h2>
              <div className="feature-accordion">
                {featureGroups.map((group, index) => (
                  <details className="product-accordion-item" open={index === 0} key={group.title}>
                    <summary>{group.title}</summary>
                    <ul className="feature-list">
                      {group.items.map((item, itemIndex) => (
                        <li key={`${group.title}-${itemIndex}`}>{item}</li>
                      ))}
                    </ul>
                  </details>
                ))}
              </div>
            </section>

            <section className="product-info-section">
              <h2>Frequently Asked Questions</h2>
              <div className="faq-accordion">
                {faqs.map((faq, index) => (
                  <details className="product-accordion-item" open={index === 0} key={faq.question}>
                    <summary>{faq.question}</summary>
                    <p>{faq.answer}</p>
                  </details>
                ))}
              </div>
            </section>

            <section className="product-info-section">
              <h2>Technical Range</h2>
              <div className="product-table-wrap">
                <table className="product-table">
                  <thead>
                    <tr>
                      <th>Model</th>
                      <th>Capacity</th>
                      <th>Motor HP</th>
                      <th>Cycle Time</th>
                      <th>Machine Weight</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td>Standard</td><td>20-30 T/8hr</td><td>30-60</td><td>40-55 sec</td><td>8-14 T</td></tr>
                    <tr><td>Heavy Duty</td><td>30-60 T/8hr</td><td>60-100</td><td>35-50 sec</td><td>14-20 T</td></tr>
                    <tr><td>Custom</td><td>As required</td><td>Application matched</td><td>Custom</td><td>Project based</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="product-info-section">
              <h2>{product.name} Photos</h2>
              <div className="product-gallery">
                <img src="/images/homepage.png" alt={`${product.name} front view`} />
                <img src="/images/homepage.png" alt={`${product.name} side view`} />
                <img src="/images/homepage.png" alt={`${product.name} hydraulic system`} />
              </div>
            </section>

            <section className="product-video-section" id="product-video">
              <div className="section-label">Product Videos</div>
              <h2>{product.name} Working Videos</h2>
              <div className="video-grid">
                <div className="video-frame">
                  <iframe
                    src="https://www.youtube.com/embed/tgbNymZ7vqY"
                    title={`${product.name} working video`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="video-frame">
                  <iframe
                    src="https://www.youtube.com/embed/tgbNymZ7vqY"
                    title={`${product.name} operation video`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </section>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

function ProductsPage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const activeCategoryParam = params.get('category');
  const activeCategory = productCategories.find((category) => category.viewAll.includes(`category=${activeCategoryParam}`));
  const defaultOpenCategory = activeCategory?.name || productCategories[0].name;
  const [openCategory, setOpenCategory] = useState(defaultOpenCategory);
  const listedCategories = activeCategory ? [activeCategory] : productCategories;
  const listedProducts = listedCategories.flatMap((category) => (
    category.products.map((item) => ({
      ...item,
      category: category.name,
      detail: getProductDetail(item.slug),
    }))
  ));

  useEffect(() => {
    setOpenCategory(defaultOpenCategory);
  }, [defaultOpenCategory]);

  return (
    <>
      <Header />
      <main className="product-detail-page">
        <div className="product-browser-layout">
          <aside className="product-sidebar">
            <h2>Products We Offer</h2>
            {productCategories.map((category) => (
              <details className="product-sidebar-group" open={openCategory === category.name} key={category.name}>
                <summary onClick={(event) => {
                  event.preventDefault();
                  setOpenCategory((current) => current === category.name ? null : category.name);
                }}>{category.name} <span>({category.products.length})</span></summary>
                <div className="product-sidebar-links">
                  <Link
                    className={`sidebar-product-link ${activeCategory?.name === category.name ? 'active' : ''}`}
                    to={category.viewAll}
                  >
                    All {category.name}
                  </Link>
                  {category.products.map((item) => (
                    <Link className="sidebar-product-link" to={`/product-detail?product=${item.slug}`} key={item.slug}>
                      {item.name}
                    </Link>
                  ))}
                </div>
              </details>
            ))}
          </aside>
          <section className="product-display">
            <div className="product-listing-header">
              <div className="section-label">Products</div>
              <h1>{activeCategory?.name || 'Our Machinery'}</h1>
              <p>{activeCategory ? `Browse all products in ${activeCategory.name}.` : 'Browse all product categories or select a product from the left catalogue to view specifications, application details, and video.'}</p>
            </div>

            <div className="product-listing-grid">
              {listedProducts.map((product) => (
                <article className="product-listing-card reveal" key={product.slug}>
                  <div className="product-listing-image">
                    <img src="/images/homepage.png" alt={product.name} />
                  </div>
                  <div className="product-listing-body">
                    <div className="product-listing-category">{product.category}</div>
                    <h2>{product.name}</h2>
                    <p>{product.detail.description}</p>
                  </div>
                  <Link className="product-listing-action" to={`/product-detail?product=${product.slug}`}>Learn More</Link>
                </article>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function App({ page }) {
  const location = useLocation();

  useSiteInteractions(page);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [location.pathname, location.search]);

  if (page === 'home') {
    return <div dangerouslySetInnerHTML={{ __html: homeMarkup }} />;
  }

  if (page === 'product-detail') {
    return <ProductDetailPage />;
  }

  if (page === 'products') {
    return <ProductsPage />;
  }

  if (page === 'solutions') {
    return <SolutionsPage />;
  }

  if (page === 'contact') {
    return <ContactPage />;
  }

  if (page === 'about') {
    return <AboutPage />;
  }

  return <PlaceholderPage page={page} />;
}
