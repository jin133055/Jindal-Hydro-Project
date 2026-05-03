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
  'Hydraulic Cylinders',
  'Hydraulic Power Packs',
  'Baling & Press Machines',
  'Recycling Machinery',
  'Custom Hydraulic Systems',
  'Material Handling Equipment',
];

const aboutStats = [
  ['25+', 'Years of engineering experience'],
  ['500+', 'Machines delivered'],
  ['40+', 'Countries served'],
  ['12+', 'Industrial sectors supported'],
];

const businessDetails = [
  ['Nature of Business', 'Manufacturer, exporter and hydraulic engineering partner'],
  ['Company Type', 'Industrial machinery and recycling equipment specialist'],
  ['Established', '1998'],
  ['Key Markets', 'India, Middle East, Africa, Europe and global export clients'],
];

const aboutStrengths = [
  'Custom-built machinery for site-specific duty cycles',
  'Experienced hydraulic design and fabrication team',
  'Reliable performance in continuous industrial operation',
  'Commissioning, training and after-sales support',
];

const servedIndustries = [
  'Metal Recycling',
  'Manufacturing',
  'Automotive Scrap',
  'Waste Management',
  'Foundries & Steel Plants',
  'Paper & Cardboard Recycling',
  'Fabrication Units',
  'Industrial Processing',
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
    title: 'Engineering Recycling Equipment Since 1998',
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
                  {category.products.slice(0, 5).map((product) => (
                    <Link className="product-link" to={`/product-detail?product=${product.slug}`} key={product.slug}>
                      <strong>{product.name}</strong>
                    </Link>
                  ))}
                  <Link className="view-all-link" to={category.viewAll}>+ View all</Link>
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
        <li><Link to="/">Home</Link></li>
        <ProductsMegaMenu />
        <li><Link to="/solutions">Solutions</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/case-studies">Case Studies</Link></li>
        <li><Link to="/blog">Blog</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
      <a className="nav-phone" href="tel:+919868247362">+91 9868247362</a>
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
            <div className="footer-tagline">Advanced hydraulic and recycling solutions engineered for global industrial applications since 1998.</div>
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
            <p>Engineering excellence in hydraulics, recycling machinery and industrial equipment for demanding production environments.</p>
            <Link className="btn-primary" to="/contact">Get a Quote</Link>
          </div>
        </section>

        <section className="about-section about-overview">
          <div className="about-copy reveal">
            <div className="section-label">Overview</div>
            <h2>Built for Heavy-Duty Industrial Performance</h2>
            <p>Jindal Hydro Projects Inc. designs and manufactures hydraulic machinery for recyclers, manufacturers, scrap processors, fabrication units and industrial plants that need dependable output with practical serviceability.</p>
            <p>Our work covers hydraulic cylinders, power packs, presses, balers and custom recycling systems engineered around pressure, capacity, material flow and site requirements.</p>
          </div>
          <div className="about-image reveal reveal-delay-1">
            <img src="/images/homepage.png" alt="Hydraulic recycling machine in operation" />
          </div>
        </section>

        <section className="about-section about-split-dark">
          <div className="about-copy reveal">
            <div className="section-label">Who We Are</div>
            <h2>Industrial Hydraulic Specialists</h2>
            <p>We combine fabrication strength, hydraulic engineering and application knowledge to deliver machines that suit real operating conditions, not just catalogue specifications.</p>
          </div>
          <div className="about-copy reveal reveal-delay-1">
            <div className="section-label">What We Do</div>
            <div className="about-offering-grid">
              {aboutOfferings.map((item) => (
                <div className="about-mini-card" key={item}>{item}</div>
              ))}
            </div>
          </div>
        </section>

        <section className="about-section">
          <div className="about-section-head reveal">
            <div className="section-label">At a Glance</div>
            <h2>Company Highlights</h2>
          </div>
          <div className="about-stat-grid">
            {aboutStats.map(([value, label]) => (
              <div className="about-stat-card reveal" key={label}>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="about-section about-detail-band">
          <div className="about-section-head reveal">
            <div className="section-label">Business Details</div>
            <h2>Structured Company Information</h2>
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

        <section className="about-section about-manufacturing">
          <div className="about-section-head reveal">
            <div className="section-label">Infrastructure</div>
            <h2>Manufacturing & Engineering Capability</h2>
          </div>
          <div className="about-media-grid">
            {['Fabricated machine frames', 'Hydraulic assemblies', 'Testing and commissioning'].map((item, index) => (
              <div className="about-media-card reveal" key={item}>
                <img src="/images/homepage.png" alt={item} />
                <h3>{item}</h3>
                <p>{index === 0 ? 'Robust steel structures designed for continuous load cycles.' : index === 1 ? 'Power packs, cylinders and control systems matched to machine duty.' : 'Machines checked for operation, fitment and production readiness.'}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="about-section about-split-dark">
          <div className="about-copy reveal">
            <div className="section-label">Quality</div>
            <h2>Quality & Commitment</h2>
            <ul className="about-check-list">
              <li>Durable components selected for industrial duty</li>
              <li>Hydraulic testing before dispatch</li>
              <li>Practical maintenance access and service support</li>
              <li>Customer-focused engineering and documentation</li>
            </ul>
          </div>
          <div className="about-copy reveal reveal-delay-1">
            <div className="section-label">Why Choose Us</div>
            <div className="about-strength-grid">
              {aboutStrengths.map((item) => (
                <div className="about-strength-card" key={item}>{item}</div>
              ))}
            </div>
          </div>
        </section>

        <section className="about-section">
          <div className="about-section-head reveal">
            <div className="section-label">Applications</div>
            <h2>Industries We Serve</h2>
          </div>
          <div className="industry-grid">
            {servedIndustries.map((item) => (
              <div className="industry-chip reveal" key={item}>{item}</div>
            ))}
          </div>
        </section>

        <section className="about-cta reveal">
          <div>
            <div className="section-label">Partner With Us</div>
            <h2>Partner with Jindal Hydro Projects Inc.</h2>
            <p>Tell us your material, capacity and site requirements. Our team will help shape the right hydraulic or recycling machinery configuration.</p>
          </div>
          <Link className="btn-primary" to="/contact">Contact Us</Link>
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

  return (
    <>
      <Header />
      <main className="product-detail-page">
        <div className="product-browser-layout">
          <aside className="product-sidebar">
            <h2>Products We Offer</h2>
            {productCategories.map((category) => (
              <details className="product-sidebar-group" open={category.name === product.category} key={category.name}>
                <summary>{category.name} <span>({category.products.length})</span></summary>
                <div className="product-sidebar-links">
                  {category.products.map((item) => (
                    <Link
                      className={`sidebar-product-link ${item.slug === currentSlug ? 'active' : ''}`}
                      to={`/product-detail?product=${item.slug}`}
                      key={item.slug}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <Link className="sidebar-view-all" to={category.viewAll}>+ View all</Link>
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
  return (
    <>
      <Header />
      <main className="product-detail-page">
        <div className="product-browser-layout">
          <aside className="product-sidebar">
            <h2>Products We Offer</h2>
            {productCategories.map((category) => (
              <details className="product-sidebar-group" open key={category.name}>
                <summary>{category.name} <span>({category.products.length})</span></summary>
                <div className="product-sidebar-links">
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
              <h1>Explore Industrial Hydraulic Machinery</h1>
              <p>Select a product from the left catalogue to view specifications, application details, and video.</p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function App({ page }) {
  useSiteInteractions(page);

  if (page === 'home') {
    return <div dangerouslySetInnerHTML={{ __html: homeMarkup }} />;
  }

  if (page === 'product-detail') {
    return <ProductDetailPage />;
  }

  if (page === 'products') {
    return <ProductsPage />;
  }

  if (page === 'about') {
    return <AboutPage />;
  }

  return <PlaceholderPage page={page} />;
}
