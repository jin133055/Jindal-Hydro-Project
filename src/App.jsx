import { Link, useLocation } from 'react-router-dom';
import { homeMarkup } from './homeMarkup.js';
import { useSiteInteractions } from './useSiteInteractions.js';

const productCategories = [
  {
    name: 'Hydraulic Cylinders',
    number: '01',
    viewAll: '/products?category=hydraulic-cylinders',
    products: [
      { slug: 'double-acting-cylinder', name: 'Double Acting Hydraulic Cylinder', note: 'Up to 250 bar operating pressure' },
      { slug: 'front-flange-cylinder', name: 'Front Flange Cylinder', note: 'Rigid mounting for press applications' },
      { slug: 'industrial-pneumatic-cylinder', name: 'Industrial Pneumatic Cylinder', note: 'Fast automation-ready motion control' },
      { slug: 'telescopic-cylinder', name: 'Telescopic Hydraulic Cylinder', note: 'Long stroke in compact installations' },
    ],
  },
  {
    name: 'Power Packs',
    number: '02',
    viewAll: '/products?category=power-packs',
    products: [
      { slug: 'hydraulic-power-pack', name: 'Hydraulic Power Pack', note: 'Central HPU for heavy machinery' },
      { slug: 'compact-power-pack', name: 'Compact Power Pack', note: 'Space-saving hydraulic power unit' },
      { slug: 'custom-power-unit', name: 'Custom Power Unit', note: 'Built for site-specific duty cycles' },
    ],
  },
  {
    name: 'Presses',
    number: '03',
    viewAll: '/products?category=presses',
    products: [
      { slug: 'vertical-baling-press', name: 'Vertical Baling Press', note: 'Compact press for low footprint sites' },
      { slug: 'scrap-baling-press', name: 'Hydraulic Scrap Baling Press', note: 'High density scrap compaction' },
      { slug: 'press-brake', name: 'Hydraulic Press Brake', note: 'Precision bending and forming' },
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
  'hydraulic-power-pack': {
    name: 'Hydraulic Power Pack',
    description: 'Compact or centralized hydraulic power unit configured for balers, shears, presses, and plant-wide machinery.',
    specs: { Pressure: 'Up to 315 bar', Power: '15 - 500 HP', Stroke: 'Machine dependent', Material: 'MS reservoir, branded valves' },
  },
  'scrap-baling-press': {
    name: 'Hydraulic Scrap Baling Press',
    description: 'High-compression baling press built to convert loose metal scrap into dense transport-ready bales.',
    specs: { Pressure: '200 - 315 bar', Power: '30 - 250 HP', Stroke: 'Custom ram stroke', Material: 'Heavy fabricated steel' },
  },
  'industrial-shredder': {
    name: 'Industrial Shredder',
    description: 'Twin-shaft shredding system for metal scrap, industrial waste, e-waste, and bulky recycling streams.',
    specs: { Pressure: 'Hydraulic drive option', Power: '50 - 500 HP', Stroke: 'Rotary cutting', Material: 'Hardened alloy cutters' },
  },
};

const fallbackProduct = {
  name: 'Hydraulic Recycling Machine',
  description: 'Industrial-grade hydraulic machinery engineered for reliable operation in demanding recycling and metal processing environments.',
  specs: { Pressure: 'Up to 315 bar', Power: 'Application matched', Stroke: 'Custom engineered', Material: 'Heavy-duty fabricated steel' },
};

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
                <button className="product-category-toggle" type="button">{category.name}<span>{category.number}</span></button>
                <div className="product-subpanel">
                  <div className="product-panel-heading">{category.name}</div>
                  {category.products.map((product) => (
                    <Link className="product-link" to={`/product-detail?product=${product.slug}`} key={product.slug}>
                      <strong>{product.name}</strong>
                      <small>{product.note}</small>
                    </Link>
                  ))}
                  <Link className="view-all-link" to={category.viewAll}>View All {category.name}</Link>
                </div>
              </div>
            ))}
          </div>
          <div className="product-menu-feature">
            <span>Product Detail Preview</span>
            <strong>Choose a machine to view specs, image, and working video.</strong>
            <p>Pressure, power, stroke, material, and commissioning notes are organized into a clean product page.</p>
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
        <img src="/images/logo_transparent.png" alt="Jindal Hydro Projects logo" />
        <span className="logo-text">Jindal Hydro Projects</span>
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
            <div className="footer-brand-name">JINDAL<span>.</span></div>
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
              <li><Link to="/about">About Jindal</Link></li>
              <li><Link to="/case-studies">Case Studies</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-copy">© 2026 Jindal Industries. All rights reserved.</div>
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

function ProductDetailPage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const product = productDetails[params.get('product')] || fallbackProduct;

  return (
    <>
      <Header />
      <main className="product-detail-page">
        <section className="product-detail-hero">
          <div className="product-detail-media">
            <img src="/images/homepage.png" alt={product.name} />
          </div>
          <div className="product-detail-content">
            <div className="section-label">Product Detail</div>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <div className="spec-grid">
              {Object.entries(product.specs).map(([label, value]) => (
                <div className="spec-item" key={label}>
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
            <div className="hero-btns">
              <Link className="btn-primary" to="/contact">Request Quote</Link>
              <Link className="btn-secondary" to="/products">View All Products</Link>
            </div>
          </div>
        </section>
        <section className="product-video-section">
          <div className="section-label">Machine Video</div>
          <h2>See the machine in action</h2>
          <div className="video-frame">
            <iframe
              src="https://www.youtube.com/embed/tgbNymZ7vqY"
              title={`${product.name} demonstration video`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </section>
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

  return <PlaceholderPage page={page} />;
}
