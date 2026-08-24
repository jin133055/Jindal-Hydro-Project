import { useEffect, useRef, useState } from 'react';
import { useForm } from '@formspree/react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { homeMarkup } from './homeMarkup.js';
import { useSiteInteractions } from './useSiteInteractions.js';
import blogIndex from './blogIndex.json';
import { useParams } from 'react-router-dom';

const productCategories = [
  {
    name: 'Balers',
    number: '01',
    viewAll: '/products/balers/',
    products: [
      { slug: 'super-jumbo-baler', name: 'Super Jumbo Baler', subcategory: 'Balers', note: 'Balers' },
      { slug: 'triple-action-baler', name: 'Triple Action Baler', subcategory: 'Balers', note: 'Balers' },
      { slug: 'mini-triple-action-baler', name: 'Mini Triple Action Baler', subcategory: 'Balers', note: 'Balers' },
      { slug: 'double-action-baler', name: 'Double Action Baler', subcategory: 'Balers', note: 'Balers' },
      { slug: 'vertical-baler', name: 'Vertical Baler', subcategory: 'Balers', note: 'Balers' },
      { slug: 'car-baler', name: 'Car Baler (ELV Compactor)', subcategory: 'Balers', note: 'Balers' },
      { slug: 'automatic-baler', name: 'Automatic Horizontal Baler', subcategory: 'Balers', note: 'Balers' },
      { slug: 'semi-automatic-baler', name: 'Semi-Automatic Horizontal Baler', subcategory: 'Balers', note: 'Balers' },
    ],
  },
  {
    name: 'Hydraulic Presses',
    number: '02',
    viewAll: '/products/hydraulic-presses/',
    products: [
      { slug: 'c-frame-hydraulic-press', name: 'C Frame Hydraulic Press', subcategory: 'Hydraulic Presses', note: 'Hydraulic Presses' },
      { slug: 'h-frame-hydraulic-press', name: 'H Frame Hydraulic Press', subcategory: 'Hydraulic Presses', note: 'Hydraulic Presses' },
      { slug: '4-pillar-type-hydraulic-press', name: '4 Pillar Type Hydraulic Press', subcategory: 'Hydraulic Presses', note: 'Hydraulic Presses' },
      { slug: 'industrial-tablet-press', name: 'Industrial Tablet Press', subcategory: 'Hydraulic Presses', note: 'Hydraulic Presses' },    ],
  },
  {
    name: 'Shears & Nibblers',
    number: '03',
    viewAll: '/products/shears-nibblers/',
    products: [
      { slug: 'nibblers-hydraulic', name: 'Nibblers (Hydraulic)', subcategory: 'Shears & Nibblers', note: 'Shears & Nibblers'},
      { slug: 'alligator-shear', name: 'Alligator Shear', subcategory: 'Shears & Nibblers', note: 'Shears & Nibblers' },
      { slug: 'hydraulic-box-shear', name: 'Hydraulic Box Shear', subcategory: 'Shears & Nibblers', note: 'Shears & Nibblers' },


    ],
  },
  {
    name: 'Shredders',
    number: '04',
    viewAll: '/products/shredders/',
    products: [
      { slug: 'single-shaft-shredder', name: 'Single Shaft Shredder', subcategory: 'Shredders', note: 'Shredders' },
      { slug: 'twin-shaft-shredder', name: 'Twin Shaft Shredder', subcategory: 'Shredders', note: 'Shredders' },
    ],
  },
  {
    name: 'Briquetting Machines',   
    number: '05',
    viewAll: '/products/briquetting-machines/',
    products: [
      { slug: 'vertical-briquetting-machine', name: 'Vertical Briquetting Machine', subcategory: 'Briquetting Machines', note: 'Briquetting Machines' },
    ],
  },
  {
    name: 'Material Handling',
    number: '06',
    viewAll: '/products/material-handling/',
    products: [
      { slug: 'conveyors', name: 'Conveyors', subcategory: 'Material Handling', note: 'Material Handling' },
    ],
  },
  {
    name: 'Agricultural Hydraulic Machinery',
    number: '07',
    viewAll: '/products/agriculture-hydraulic-machinery/',
    products: [
      { slug: 'fodder-block-making-machine', name: 'Fodder Block Making Machine', subcategory: 'Agriculture Hydraulic Machinery', note: 'Agriculture Hydraulic Machinery' },
    ],
  },
  {
    name: 'Material Recovery Facility',
    number: '08',
    viewAll: '/products/material-recovery-facility/',
    products: [
      { slug: 'material-recovery-facility', name: 'Material Recovery Facility', subcategory: 'Material Recovery Facility', note: 'Material Recovery Facility' },
    ],
  }
];

const siteUrl = 'https://www.jindalhydroprojects.com';

const productImageMap = {
  'super-jumbo-baler': ['/images/3D%20Models%20from%20AI/Balers/01_Super Jumbo Baler.png'],
  'triple-action-baler': [ '/images/3D%20Models%20from%20AI/Balers/02_Triple_Action_Baler_Hero_Angle_v.1.png'],
  'mini-triple-action-baler': [ '/images/3D%20Models%20from%20AI/Balers/03_Mini Triple Action Baler.png'],
  'double-action-baler': [
    '/images/3D Models from AI/Balers/04_Double_Action_Auto_Door.png',
    '/images/3D Models from AI/Balers/04_Double_Action_Auto_Door.png',
    '/images/3D Models from AI/Balers/05_Double_Action_Manual_Door.png',
    '/images/3D Models from AI/Balers/06_Double Action Baler Top Injection.png',
  ],
  'vertical-baler': ['/images/3D Models from AI/Balers/07_Vertical_Baler_Hero_Angle.png'],
  'car-baler': ['/images/3D Models from AI/Balers/10_Hydraulic Car Baler.png'],
  'automatic-baler': ['/images/3D Models from AI/Balers/08_Automatic_Baler_Hero_Angle_v1.png'],
  'semi-automatic-baler': ['/images/3D Models from AI/Balers/09_Semi_Automatic_Baler_Hero_Angle_v1.png'],
  'alligator-shear': ['/images/3D Models from AI/Shears & Nibblers/01_Alligator_Shear_Hero_Angle_v.1.png',],
  'nibblers-hydraulic': [
    '/images/3D Models from AI/Shears & Nibblers/02_Nibbler_Hero_Angle_v.1.png',
  ],
  'hydraulic-box-shear': [ '/images/3D Models from AI/Shears & Nibblers/03_Hydraulic Box Shear.png'],
  'single-shaft-shredder': ['/images/3D Models from AI/Shredders/01_Single_Shaft_Shredder_Hero_Angle_v.2.png'],
  'twin-shaft-shredder': ['/images/3D Models from AI/Shredders/02_Twin Shaft Shredder.png'],
  'vertical-briquetting-machine': [
    '/images/3D Models from AI/Briquetting Machines/09_Vertical_Briquetting_Machine_v3.png', ],
  conveyors: ['/images/3D Models from AI/Material Handling/23_Conveyor_Hero_v1.png'],
  'fodder-block-making-machine': ['/images/3D Models from AI/Agriculture Hydraulic Machinery/24_Fodder_Block_Machine_Hero_v1.png'],
  'c-frame-hydraulic-press': ['/images/3D Models from AI/Hydraulic Presses/01_press_c_frame.png'],
  'h-frame-hydraulic-press': ['/images/3D Models from AI/Hydraulic Presses/02_press_h_frame.png'],
  '4-pillar-type-hydraulic-press': ['/images/3D Models from AI/Hydraulic Presses/03_press_4_pillar.png'],
  'industrial-tablet-press': ['/images/3D Models from AI/Hydraulic Presses/04_press_tablet.png'],
  'material-recovery-facility': ['/images/3D Models from AI/MRF/msw_disc_separator.png',
    '/images/3D Models from AI/MRF/msw_air_classifier.png',
    '/images/3D Models from AI/MRF/msw_baled_waste.png',
    '/images/3D Models from AI/MRF/msw_magnetic_separator.png',
    '/images/3D Models from AI/MRF/msw_sorting_conveyor.png',
    '/images/3D Models from AI/MRF/msw_tipper_platform.png',
    '/images/3D Models from AI/MRF/msw_trommel_screen.png'
  ],
};

const getProductImageSet = (slug) => productImageMap[slug] || ['/images/homepage.png'];
const getProductImage = (slug) => getProductImageSet(slug)[0];

const categorySeo = {
  balers: {
    name: 'Balers',

    title: 'Hydraulic Balers for Scrap, Waste & ELV Compaction | JHP',

    description:
      'Hydraulic balers for ferrous, non-ferrous and mixed material recycling, scrap processing, waste handling and ELV compaction.',

    h1: 'Hydraulic Balers for Scrap, Waste & ELV Compaction',

    canonical: '/products/balers/',

    intro:
      'JHP manufactures hydraulic baling presses that compress ferrous, non-ferrous and mixed materials into dense, uniform bales for recycling, scrap processing and efficient material handling.',

    sections: [
      [
        'Applications',
        'Metal recycling, scrap processing, waste handling, ELV recycling and material compaction.'
      ],
      [
        'Baler Types',
        'Super jumbo, triple action, mini triple action, double action, vertical, car, automatic horizontal and semi-automatic horizontal balers.'
      ],
      [
        'Materials',
        'Ferrous metal, non-ferrous metal, mixed scrap, ELV material and other recyclable waste streams.'
      ],
      [
        'Benefits',
        'Dense and uniform bales for easier handling, storage, transportation and downstream recycling.'
      ],
    ],
  },

  'hydraulic-presses': {
    name: 'Hydraulic Presses',

    title: 'Industrial Hydraulic Presses for Forming & Moulding | JHP',

    description:
      'General-purpose hydraulic presses for forming, moulding, assembly and powder compaction with open-throat, portal and four-column frames.',

    h1: 'Industrial Hydraulic Presses for Forming, Moulding & Compaction',

    canonical: '/products/hydraulic-presses/',

    intro:
      'JHP manufactures general-purpose hydraulic presses for forming, moulding, assembly and powder compaction, with press frames configured around the job and application.',

    sections: [
      [
        'Applications',
        'Forming, moulding, component assembly, powder compaction and general industrial pressing.'
      ],
      [
        'Press Types',
        'C-frame, H-frame, four-pillar and industrial tablet press configurations.'
      ],
      [
        'Press Frames',
        'Open-throat, portal and four-column frame configurations designed around the application.'
      ],
      [
        'Custom Engineering',
        'Presses can be configured around the job, material, capacity and application requirements.'
      ],
    ],
  },

  'shears-nibblers': {
    name: 'Shears & Nibblers',

    title: 'Hydraulic Shears & Nibblers for Scrap Cutting | JHP',

    description:
      'Hydraulic shears and nibblers for fast, precise cutting and sizing of bar, section, sheet and structural scrap.',

    h1: 'Hydraulic Shears & Nibblers for Scrap Cutting',

    canonical: '/products/shears-nibblers/',

    intro:
      'JHP supplies hydraulic shears and nibblers engineered for fast and precise cutting and sizing of metal scrap across recycling and industrial applications.',

    sections: [
      [
        'Equipment',
        'Hydraulic nibblers, alligator shears and hydraulic box shears for metal scrap cutting and sizing.'
      ],
      [
        'Applications',
        'Bar, section, sheet, structural scrap, light scrap, tubing, metal sheets and industrial offcuts.'
      ],
      [
        'Cutting & Sizing',
        'Cut and size scrap into manageable and consistent pieces for recycling and downstream processing.'
      ],
      [
        'Processing Benefits',
        'Fast hydraulic cutting, consistent sizing and improved preparation of scrap for further processing.'
      ],
    ],
  },

  shredders: {
    name: 'Shredders',

    title: 'Industrial Shredders for Scrap & Waste Size Reduction | JHP',

    description:
      'Single-shaft and twin-shaft industrial shredders for size reduction and pre-conditioning of bulky and mixed materials.',

    h1: 'Industrial Shredders for Scrap & Waste Size Reduction',

    canonical: '/products/shredders/',

    intro:
      'JHP manufactures single-shaft and twin-shaft shredders designed for size reduction and pre-conditioning of bulky and mixed material streams.',

    sections: [
      [
        'Shredder Types',
        'Single-shaft shredders and twin-shaft shredders for different material processing requirements.'
      ],
      [
        'Applications',
        'Bulky materials, mixed materials, recyclable waste and industrial processing streams.'
      ],
      [
        'Size Reduction',
        'Reduce bulky and mixed material into smaller, more manageable sizes for downstream processing.'
      ],
      [
        'Pre-Conditioning',
        'Prepare material for subsequent sorting, separation, recovery or recycling operations.'
      ],
    ],
  },

  'briquetting-machines': {
    name: 'Briquetting Machines',

    title: 'Briquetting Machines for Metal Chips & Machining Waste | JHP',

    description:
      'High-pressure briquetting machines that convert machining waste into dense, uniform briquettes for efficient handling and remelting.',

    h1: 'High-Pressure Briquetting Machines for Machining Waste',

    canonical: '/products/briquetting-machines/',

    intro:
      'JHP supplies high-pressure briquetting machines designed to turn machining waste into dense and uniform briquettes for efficient handling and remelting.',

    sections: [
      [
        'Applications',
        'Machining waste, metal chips and industrial material recovery applications.'
      ],
      [
        'Briquetting Process',
        'High-pressure compaction converts loose machining waste into dense, uniform briquettes.'
      ],
      [
        'Material Handling',
        'Compact briquettes are easier to handle, store, transport and process than loose machining waste.'
      ],
      [
        'Remelting',
        'Dense briquettes support more efficient handling and remelting of recovered material.'
      ],
    ],
  },

  'material-handling': {
    name: 'Material Handling',

    title: 'Industrial Conveyor Systems for Material Handling | JHP',

    description:
      'Industrial conveyor systems for moving, feeding and transferring scrap, recyclables and waste across processing plants.',

    h1: 'Material Handling & Conveyor Systems',

    canonical: '/products/material-handling/',

    intro:
      'JHP provides conveyor systems engineered to move, feed and transfer material efficiently across recycling and industrial processing plants.',

    sections: [
      [
        'Conveyor Systems',
        'Industrial conveyors for moving, feeding and transferring material through processing operations.'
      ],
      [
        'Applications',
        'Scrap recycling plants, waste processing systems and industrial material processing lines.'
      ],
      [
        'Material Movement',
        'Efficiently move material between receiving, processing, sorting, recovery and output stages.'
      ],
      [
        'System Integration',
        'Conveyor systems can form part of larger recycling and material processing plants.'
      ],
    ],
  },

  'agriculture-hydraulic-machinery': {
    name: 'Agricultural Hydraulic Machinery',

    title: 'Agricultural Hydraulic Machinery for Fodder Blocks | JHP',

    description:
      'Hydraulic agricultural machinery for compressing straw, husk and roughage into compact fodder blocks for feed and storage.',

    h1: 'Agricultural Hydraulic Machinery for Fodder Processing',

    canonical: '/products/agriculture-hydraulic-machinery/',

    intro:
      'JHP manufactures hydraulic machinery for agricultural processing, compressing straw, husk and roughage into compact fodder blocks for feed and storage.',

    sections: [
      [
        'Applications',
        'Agricultural processing, fodder preparation, feed production and agricultural residue management.'
      ],
      [
        'Materials',
        'Straw, husk, roughage and other suitable agricultural processing materials.'
      ],
      [
        'Fodder Block Production',
        'Hydraulic compression converts loose agricultural material into compact fodder blocks.'
      ],
      [
        'Benefits',
        'Compact blocks are easier to handle, transport and store for feed applications.'
      ],
    ],
  },

  'material-recovery-facility': {
    name: 'Material Recovery Facility',

    title: 'Material Recovery Facility & MSW Recycling Plant | JHP',

    description:
      'Complete material recovery facilities for municipal solid waste intake, sorting, mechanical separation and baling.',

    h1: 'Material Recovery Facility for MSW Sorting & Recycling',

    canonical: '/products/material-recovery-facility/',

    intro:
      'JHP designs complete material recovery facilities that process mixed municipal solid waste from intake and manual sorting through mechanical separation and baling.',

    sections: [
      [
        'MSW Processing',
        'Process mixed municipal solid waste through an integrated material recovery workflow.'
      ],
      [
        'Sorting',
        'Material moves from waste intake through manual sorting and subsequent mechanical separation.'
      ],
      [
        'Mechanical Separation',
        'Integrated processing separates recoverable material from mixed municipal solid waste.'
      ],
      [
        'Baling',
        'Recovered material is processed through baling for efficient handling and onward recycling.'
      ],
    ],
  },
};
const productSeo = {
  'super-jumbo-baler': {
    canonical: '/products/balers/super-jumbo-baler/',
    title: 'Super Jumbo Baler for Heavy Scrap Processing | JHP',
    description:
      'Super jumbo hydraulic baler for high-volume ferrous, non-ferrous and mixed scrap processing in demanding recycling operations.',
    h1: 'Super Jumbo Baler - Heavy-Duty Scrap Compaction',
  },

  'triple-action-baler': {
    canonical: '/products/balers/triple-action-baler/',
    title: 'Triple Action Baler for Dense Scrap Bales | JHP',
    description:
      'Triple-action hydraulic baler designed for dense, uniform scrap bales across metal recycling, scrap yards and industrial processing facilities.',
    h1: 'Triple Action Baler - Dense Three-Direction Compaction',
  },

  'mini-triple-action-baler': {
    canonical: '/products/balers/mini-triple-action-baler/',
    title: 'Mini Triple Action Baler for Scrap Recycling | JHP',
    description:
      'Compact triple-action hydraulic baler for smaller scrap processing operations requiring dense and uniform material bales.',
    h1: 'Mini Triple Action Baler - Compact Scrap Compaction',
  },
  'double-action-baler': {
    canonical: '/products/balers/double-action-baler/',
    title: 'Double Action Hydraulic Baler for Scrap | JHP',
    description:
      'Double-action hydraulic baler for dependable scrap compaction, available in configurations suited to different material ejection and handling requirements.',
    h1: 'Double Action Baler - Hydraulic Scrap Compaction',
  },
  'vertical-baler': {
    canonical: '/products/balers/vertical-baler/',
    title: 'Vertical Hydraulic Baler for Scrap Recycling | JHP',
    description:
      'Vertical hydraulic baler for compacting recyclable materials where efficient material handling and a compact machine configuration are required.',
    h1: 'Vertical Baler - Compact Hydraulic Scrap Compaction',
  },
  'car-baler': {
    canonical: '/products/balers/car-baler/',
    title: 'Car Baler & ELV Compactor for Vehicle Recycling | JHP',
    description:
      'Trailer-mounted hydraulic car baler for flattening end-of-life vehicles, white goods, light scrap and mixed metal into compact, stackable slabs.',
    h1: 'Car Baler - Hydraulic ELV Compactor',
  },
  'automatic-baler': {
    canonical: '/products/balers/automatic-baler/',
    title: 'Automatic Horizontal Baler for Recycling | JHP',
    description:
      'Automatic horizontal hydraulic baler for continuous material compaction and efficient handling of recyclable waste and scrap.',
    h1: 'Automatic Horizontal Baler - Continuous Material Compaction',
  },
  'semi-automatic-baler': {
    canonical: '/products/balers/semi-automatic-baler/',
    title: 'Semi-Automatic Horizontal Baler | JHP',
    description:
      'Semi-automatic horizontal hydraulic baler for reliable material compaction and flexible operation in recycling and scrap processing facilities.',
    h1: 'Semi-Automatic Horizontal Baler',
  },
  'c-frame-hydraulic-press': {
    canonical: '/products/hydraulic-presses/c-frame-hydraulic-press/',
    title: 'C Frame Hydraulic Press for Industrial Applications | JHP',
    description:
      'C-frame hydraulic press for general-purpose forming, moulding, assembly and industrial pressing applications.',
    h1: 'C Frame Hydraulic Press - Industrial Pressing Solution',
  },
  'h-frame-hydraulic-press': {
    canonical: '/products/hydraulic-presses/h-frame-hydraulic-press/',
    title: 'H Frame Hydraulic Press for Industrial Forming | JHP',
    description:
      'H-frame hydraulic press for forming, moulding, assembly and other general-purpose industrial pressing applications.',
    h1: 'H Frame Hydraulic Press - Industrial Forming & Assembly',
  },
  '4-pillar-type-hydraulic-press': {
    canonical: '/products/hydraulic-presses/4-pillar-type-hydraulic-press/',
    title: '4 Pillar Hydraulic Press for Industrial Applications | JHP',
    description:
      'Four-pillar hydraulic press designed for forming, moulding, assembly and powder compaction applications.',
    h1: '4 Pillar Type Hydraulic Press',
  },
  'industrial-tablet-press': {
    canonical: '/products/hydraulic-presses/industrial-tablet-press/',
    title: 'Industrial Tablet Press for Powder Compaction | JHP',
    description:
      'Industrial hydraulic tablet press for powder compaction and applications requiring controlled high-pressure forming.',
    h1: 'Industrial Tablet Press - Hydraulic Powder Compaction',
  },
  'nibblers-hydraulic': {
    canonical: '/products/shears-nibblers/nibblers-hydraulic/',
    title: 'Hydraulic Nibbler for Metal Cutting | JHP',
    description:
      'Hydraulic nibbler for fast and precise cutting and sizing of sheet, section and other metal materials in recycling and industrial applications.',
    h1: 'Hydraulic Nibbler - Precision Metal Cutting',
  },

  'alligator-shear': {
    canonical: '/products/shears-nibblers/alligator-shear/',
    title: 'Alligator Shear for Metal Scrap Cutting | JHP',
    description:
      'Hydraulic alligator shear for fast and precise cutting and sizing of bar, section and metal scrap.',
    h1: 'Alligator Shear - Heavy-Duty Metal Scrap Cutting',
  },
  'hydraulic-box-shear': {
    canonical: '/products/shears-nibblers/hydraulic-box-shear/',
    title: 'Hydraulic Box Shear for Scrap Cutting | JHP',
    description:
      'Horizontal automatic hydraulic box shear for cutting light and thin scrap into uniform charge lengths for efficient furnace feeding.',
    h1: 'Hydraulic Box Shear - Automatic Scrap Cutting',
  },
  'single-shaft-shredder': {
    canonical: '/products/shredders/single-shaft-shredder/',
    title: 'Single Shaft Shredder for Material Size Reduction | JHP',
    description:
      'Single-shaft industrial shredder for controlled size reduction and pre-conditioning of bulky and mixed material streams.',
    h1: 'Single Shaft Shredder - Controlled Material Size Reduction',
  },
  'twin-shaft-shredder': {
    canonical: '/products/shredders/twin-shaft-shredder/',
    title: 'Twin Shaft Shredder for Scrap & Waste Processing | JHP',
    description:
      'Twin-shaft industrial shredder for size reduction and pre-conditioning of bulky and mixed materials in recycling and processing operations.',
    h1: 'Twin Shaft Shredder - Heavy-Duty Material Size Reduction',
  },
  'vertical-briquetting-machine': {
    canonical:
      '/products/briquetting-machines/vertical-briquetting-machine/',
    title: 'Vertical Briquetting Machine for Metal Chips | JHP',
    description:
      'High-pressure vertical briquetting machine for converting machining waste and metal chips into dense, uniform briquettes for efficient handling and remelting.',
    h1: 'Vertical Briquetting Machine - High-Pressure Compaction',
  },
  conveyors: {
    canonical: '/products/material-handling/conveyors/',
    title: 'Industrial Conveyors for Recycling & Material Handling | JHP',
    description:
      'Custom-built conveyor systems for moving, feeding and transferring scrap, recyclables and waste through industrial processing and recycling plants.',
    h1: 'Industrial Conveyor Systems for Material Handling',
  },
  'fodder-block-making-machine': {
    canonical:
      '/products/agriculture-hydraulic-machinery/fodder-block-making-machine/',
    title: 'Fodder Block Making Machine for Agricultural Waste | JHP',
    description:
      'Hydraulic fodder block making machine for compressing straw, husk and roughage into compact blocks for feed and storage.',
    h1: 'Fodder Block Making Machine - Agricultural Hydraulic Processing',
  },
  'material-recovery-facility': {
    canonical:
      '/products/material-recovery-facility/material-recovery-facility/',
    title: 'Material Recovery Facility for MSW Sorting & Recycling | JHP',
    description:
      'Complete material recovery facility for processing mixed municipal solid waste through intake, manual sorting, mechanical separation and baling.',
    h1: 'Material Recovery Facility - MSW Sorting & Recycling',
  },
};
const productPathAliases = {
  'automatic-horizontal-baler': 'automatic-baler',
  'semi-automatic-horizontal-baler': 'semi-automatic-baler',
  'car-baler-elv-compactor': 'car-baler',
  'double-action-baler-auto-door': 'double-action-baler',
  'double-action-baler-manual-door': 'double-action-baler',
  'double-action-baler-top-ejection': 'double-action-baler',
  'nibblers-hydraulic': 'nibblers-hydraulic',
  'alligator-shear': 'alligator-shear',
  'box-shear-inclined-shear': 'hydraulic-box-shear',
  'twin-shaft-shredder':
    'twin-shaft-shredder',
  'scrap-handling-conveyors': 'conveyors',
};
const productDetails = {
  'super-jumbo-baler': {
  name: 'Super Jumbo Baler',
  description:
    'Heavy-duty PLC-controlled baler built for high-volume industrial scrap processing. Designed to compact oversized scrap and heavy TMT bars with high production capacity and robust HARDOX construction.',
  specs: [
    {
      'Bale (in)': '20×20',
      'Chamber (in)': '84×44×38',
      'Wt MS (kg)': '150-250',
      'Cycle (sec)': '80-85',
      'Production (T/8hr)': '24-30',
      'Motor (HP)': '80 HP',
    },
    {
      'Bale (in)': '22×22',
      'Chamber (in)': '84×44×38',
      'Wt MS (kg)': '150-300',
      'Cycle (sec)': '80-85',
      'Production (T/8hr)': '30-35',
      'Motor (HP)': '80 HP',
    },
    {
      'Bale (in)': '24×24',
      'Chamber (in)': '84×60×40',
      'Wt MS (kg)': '300-500',
      'Cycle (sec)': '80-85',
      'Production (T/8hr)': '45-50',
      'Motor (HP)': '100 HP',
    },
    {
      'Bale (in)': '28×28',
      'Chamber (in)': '105×50×50',
      'Wt MS (kg)': '400-700',
      'Cycle (sec)': '90-100',
      'Production (T/8hr)': '60-70',
      'Motor (HP)': '100 HP',
    },
    {
      'Bale (in)': '30×30',
      'Chamber (in)': '105×60×50',
      'Wt MS (kg)': '400-700',
      'Cycle (sec)': '90-100',
      'Production (T/8hr)': '62-72',
      'Motor (HP)': '100 HP',
    },
  ],
},
  'triple-action-baler': {
  name: 'Triple Action Baler',
  specs: [
    {
      Model: 'Mini',
      'Bale (in)': '6×6',
      'Chamber (in)': '18×18×45',
      'Wt MS (kg)': '10-16',
      'Wt AL (kg)': '4-6',
      'Motor (HP)': '20',
      'Cycle (sec)': '55-60',
    },
    {
      Model: 'Mini',
      'Bale (in)': '10×10',
      'Chamber (in)': '20×20×50',
      'Wt MS (kg)': '30-45',
      'Wt AL (kg)': '10-15',
      'Motor (HP)': '25',
      'Cycle (sec)': '45-50',
    },
    {
      Model: 'Super',
      'Bale (in)': '12×12',
      'Chamber (in)': '20×24×55',
      'Wt MS (kg)': '50-80',
      'Wt AL (kg)': '20-30',
      'Motor (HP)': '25',
      'Cycle (sec)': '60-65',
    },
    {
      Model: 'Jumbo',
      'Bale (in)': '15×15',
      'Chamber (in)': '24×26×60',
      'Wt MS (kg)': '60-120',
      'Wt AL (kg)': '40-50',
      'Motor (HP)': '30',
      'Cycle (sec)': '70-75',
    },
    {
      Model: 'Jumbo Plus',
      'Bale (in)': '20×20',
      'Chamber (in)': '36×42×76',
      'Wt MS (kg)': '150-250',
      'Wt AL (kg)': '65-80',
      'Motor (HP)': '50',
      'Cycle (sec)': '90-100',
    },
    {
      Model: 'Jumbo Plus',
      'Bale (in)': '30×30',
      'Chamber (in)': '45×60×90',
      'Wt MS (kg)': '300-500',
      'Wt AL (kg)': '80-150',
      'Motor (HP)': '60×2',
      'Cycle (sec)': '90-100',
    },
  ],
},
  'mini-triple-action-baler': {
  name: 'Mini Triple Action Baler',
  specs: [
    {
      Model: 'Mini',
      'Bale (in)': '6×6',
      'Chamber (in)': '18×18×45',
      'Wt MS (kg)': '10-16',
      'Wt AL (kg)': '4-6',
      'Motor (HP)': '20',
    },
    {
      Model: 'Mini',
      'Bale (in)': '8×8',
      'Chamber (in)': '20×20×45',
      'Wt MS (kg)': '18-28',
      'Wt AL (kg)': '6-9',
      'Motor (HP)': '20',
    },
    {
      Model: 'Mini',
      'Bale (in)': '9×9',
      'Chamber (in)': '20×20×45',
      'Wt MS (kg)': '25-35',
      'Wt AL (kg)': '8-13',
      'Motor (HP)': '20',
    },
    {
      Model: 'Mini',
      'Bale (in)': '10×10',
      'Chamber (in)': '20×20×50',
      'Wt MS (kg)': '25-30',
      'Wt AL (kg)': '10-15',
      'Motor (HP)': '25',
    },
  ],
},
  'double-action-baler': {
    name: 'Double Action Baler',
    description: 'Double-action baler available in auto door, manual door, and top ejection configurations for dependable scrap compaction in industrial recycling operations.',
    galleryLabels: ['Main View', 'Auto Door', 'Manual Door', 'Top Ejection'],
    specs: [
      {
      'Chamber (in)': '20×16×45',
      'Bale (in)': '12-16×V',
      'Wt MS (kg)': '20-50',
      'Cycle (sec)': '75-85',
      'Motor (HP)': '15',
    },
    {
      'Chamber (in)': '20×24×45',
      'Bale (in)': '12×24×V',
      'Wt MS (kg)': '40-60',
      'Cycle (sec)': '50-60',
      'Motor (HP)': '20',
    },
    {
      'Chamber (in)': '24×18×50',
      'Bale (in)': '16×18×V',
      'Wt MS (kg)': '50-60',
      'Cycle (sec)': '50-60',
      'Motor (HP)': '20',
    },
    ],
  },
  'vertical-baler': {
  name: 'Vertical Baler',

  specNote: {
    title: '',
    text:'These machines are available from 20 tons to 200 tons, with different charging-chamber sizes for different kinds of scrap, and bale size and weight configured as per customer requirement.',
  }
    
},


'car-baler': {
  name: 'Car Baler',

  description:
    'A trailer-mounted hydraulic car crusher that flattens end-of-life vehicles and white goods into compact, stackable slabs.',

  galleryLabels: [
    'Main View',
    'Front Right View',
    'Rear Left View',
    'Rear Right View',
    'Front Left View',
  ],

  specTitle: 'Technical Specifications',

  specTables: [
    {
      title: 'Crusher Opening',

      specs: [
        {
          Parameter: 'Height — Raised',
          Value: '10 ft*',
        },
        {
          Parameter: 'Height — Lowered',
          Value: '24 in',
        },
        {
          Parameter: 'Width',
          Value: '7 ft 6 in',
        },
        {
          Parameter: 'Length',
          Value: '20 ft 3 in / 22 ft 2 in / 24 ft 1 in',
        },
        {
          Parameter: 'Lid Movement (Travel)',
          Value: '8 ft',
        },
      ],

      note:
        '*Special-build units with a 9 ft raised opening and 12 in lowered height available on request.',
    },

    {
      title: 'Hydraulic Cylinders & Overall Dimensions',

      specs: [
        {
          Parameter: 'Cylinder Bore',
          Value: '10 in',
        },
        {
          Parameter: 'Rod Diameter',
          Value: '4 in',
        },
        {
          Parameter: 'Cylinder Travel',
          Value: '96 in',
        },
        {
          Parameter: 'Working Pressure',
          Value: '2,400 psi',
        },
        {
          Parameter: 'Crushing Force',
          Value: '159 tons',
        },
        {
          Parameter: 'Machine Weight',
          Value: '60,000 lb',
        },
        {
          Parameter: 'Overall Length',
          Value: '43 ft / 45 ft / 47 ft',
        },
        {
          Parameter: 'Overall Height',
          Value: '20 ft 7 in',
        },
        {
          Parameter: 'Ground Clearance',
          Value: '16 in',
        },
      ],
    },
  ],
},

'automatic-baler': {
  name: 'Automatic Horizontal Baler',
  description:
    'Fully automatic horizontal baler engineered for high-volume waste recycling operations. Processes paper, OCC, PET bottles, plastics and textiles with programmable bale lengths and minimal operator involvement.',
  specs: [
    {
      'Bale Size (W×H)': '29×29',
      'Bale Wt OCC (kg)': '300-400',
      'Production (T/hr)': '1-2',
    },
    {
      'Bale Size (W×H)': '35×29',
      'Bale Wt OCC (kg)': '400-600',
      'Production (T/hr)': '2-5',
    },
    {
      'Bale Size (W×H)': '35×35',
      'Bale Wt OCC (kg)': '650-750',
      'Production (T/hr)': '5-8',
    },
    {
      'Bale Size (W×H)': '44×42',
      'Bale Wt OCC (kg)': '800-1,200',
      'Production (T/hr)': '8-10',
    },
    {
      'Bale Size (W×H)': '44×57',
      'Bale Wt OCC (kg)': '1,000-1,400',
      'Production (T/hr)': '10-12',
    },
  ],
},

'semi-automatic-baler': {
  name: 'Semi-Automatic Horizontal Baler',
  description:
    'Semi-automatic horizontal baler combining automatic compaction with manual strapping for medium-volume recycling facilities. Produces high-density bales suitable for paper, cardboard, plastics and PET processing.',
  specs: [
    {
      Model: 'SAT 12',
      'Bale Size (W×H)': '29×29',
      'Wt OCC (kg)': '500-600',
      'Wt PET (kg)': '250-500',
      Production: '1-2 T/hr',
    },
    {
      Model: 'SAT 23',
      'Bale Size (W×H)': '35×29',
      'Wt OCC (kg)': '600-750',
      'Wt PET (kg)': '350-600',
      Production: '2-3 T/hr',
    },
  ],
},
'c-frame-hydraulic-press': {
  name: 'C Frame Hydraulic Press',
  description:
    'A single-column hydraulic press with an open throat for unobstructed loading, tool changes and flexible access to the job area.',

  specNote: {
    title: 'BUILT TO YOUR APPLICATION',
    text:
      'Capacity, throat depth, daylight, stroke and table size are configured to your part and process. Share the component and the operation, and we will propose the frame.',
  },
},
'h-frame-hydraulic-press': {
  name: 'H Frame Hydraulic Press',
  description:
    'A closed portal-frame hydraulic press designed for high rigidity and demanding forming applications.',

  specNote: {
    title: 'BUILT TO YOUR APPLICATION',
    text:
      'Capacity, daylight, stroke, table size, cycle and automation are configured around your application. Share the part, material and production requirement, and we will propose the press.',
  },
},
'4-pillar-type-hydraulic-press': {
  name: '4 Pillar Type Hydraulic Press',
  description:
    'A four-column hydraulic press designed for moulding, forming and large die applications.',

  specNote: {
    title: 'BUILT TO YOUR APPLICATION',
    text:
      'Capacity, platen size, daylight, stroke, heating and number of openings are configured around your moulding or forming application.',
  },
},
'industrial-tablet-press': {
  name: 'Industrial Tablet Press',
  description:
    'Hydraulic powder compaction press for producing tablets and compacted products.',

  specNote: {
    title: 'BUILT TO YOUR APPLICATION',
    text:
      'Pressing force, stroke, dwell time, ejection force, tooling and feed configuration are selected according to the material and finished product requirements.',
  },
},
'alligator-shear': {
  name: 'Alligator Shear',
  specs: [
    {
      'Shear Force (T)': '35-50',
      'Jaw Opening (in)': '9',
      'Cutting Capacity (mm)': '40-50 Round',
      'Strokes/Min': '10-14',
      'Motor (HP)': '15-40',
    },
    {
      'Shear Force (T)': '65-100',
      'Jaw Opening (in)': '9-12',
      'Cutting Capacity (mm)': '65-80 Round',
      'Strokes/Min': '7-14',
      'Motor (HP)': '40',
    },
    {
      'Shear Force (T)': '85-200',
      'Jaw Opening (in)': '12-16',
      'Cutting Capacity (mm)': '85-120 Round / 75 Sq',
      'Strokes/Min': '7-12',
      'Motor (HP)': '40-60',
    },
  ],
},
'hydraulic-box-shear': {
  name: 'Hydraulic Box Shear',
  spec: [
    {
      Model: 'JHP-BS-630',
      'Press box width (mm)': '1400/1600',
      'Cut length (mm)': '400',
      'Capacity (T/hr)*': '9-14',
      'Cutting force (kN)': '6,300',
      'Motor': '55 kW × 2'

    },
    {
      Model: 'JHP-BS-800',
      'Press box width (mm)': '1600',
      'Cut length (mm)': '400',
      'Capacity (T/hr)*': '15-22',
      'Cutting force (kN)': '8,000',
      'Motor': '55 kW × 3'

    },
    {
      Model: 'JHP-BS-1000',
      'Press box width (mm)': '1600',
      'Cut length (mm)': '400',
      'Capacity (T/hr)*': '23-25',
      'Cutting force (kN)': '10,000',
      'Motor': '55 kW × 4'

    },


  ]
},
'nibblers-hydraulic': {
  name: 'Nibblers (Hydraulic)',
  specs: [
    {
      Parameter: 'Blade shape',
      'Hydraulic Nibbler': 'V-shaped',
    },
    {
      Parameter: 'Strokes/min',
      'Hydraulic Nibbler': '14-16',
    },
    {
      Parameter: 'Motor (HP)',
      'Hydraulic Nibbler': '15',
    },
    {
      Parameter: 'Blade opening (in)',
      'Hydraulic Nibbler': '4',
    },
    {
      Parameter: 'Working pressure',
      'Hydraulic Nibbler': '2400 PSI',
    },
    {
      Parameter: 'Machine weight',
      'Hydraulic Nibbler': '2,500 kg',
    },
  ],
},

'single-shaft-shredder': {
  name: 'Single Shaft Shredder',
  specs: [
    {
      Parameter: 'Cutting chamber width',
      Value: '36"',
    },
    {
      Parameter: 'Cutting chamber length',
      Value: '42"',
    },
    {
      Parameter: 'Rotor width',
      Value: '34"',
    },
    {
      Parameter: 'Rotor diameter',
      Value: '350 mm',
    },
    {
      Parameter: 'Motor',
      Value: '50 HP',
    },
    {
      Parameter: 'Hydraulic power pack',
      Value: 'Provided',
    },
  ],
},
'twin-shaft-shredder': {
  name: 'Twin Shaft Shredder',
  specs: [
    {
      Model: 'TS-0.75',
      'Nominal capacity': '0.75 TPH',
      'Chamber (mm)': '600×600',
      'Motor': '2×20 HP',
      'Total power': '40 HP',
      'Shaft diameter': '120 mm',
      'Cutter diameter': '260 mm',
      'Cutter thickness': '30 mm',
      'Shaft speed': '15-25 RPM',
      'Output size': '50-150 mm',
      'Cutter material': 'D2 / Alloy',
      'Cutter hardness': '50-58 HRC',
      'Control': 'PLC+HMI',
      'Auto reverse': 'Yes',
    },
    {
      Model: 'TS-100',
      'Nominal capacity': '1.0 TPH',
      'Chamber (mm)': '700×650',
      'Motor': '2×25 HP',
      'Total power': '50 HP',
      'Shaft diameter': '130 mm',
      'Cutter diameter': '300 mm',
      'Cutter thickness': '30-35 mm',
      'Shaft speed': '15-25 RPM',
      'Output size': '50-150 mm',
      'Cutter material': 'D2 / Alloy',
      'Cutter hardness': '50-58 HRC',
      'Control': 'PLC+HMI',
      'Auto reverse': 'Yes',
    },
    {
      Model: 'TS-150',
      'Nominal capacity': '1.5 TPH',
      'Chamber (mm)': '800×700',
      'Motor': '2×30 HP',
      'Total power': '60 HP',
      'Shaft diameter': '140 mm',
      'Cutter diameter': '320 mm',
      'Cutter thickness': '35 mm',
      'Shaft speed': '12-22 RPM',
      'Output size': '50-150 mm',
      'Cutter material': 'D2 / Alloy',
      'Cutter hardness': '50-58 HRC',
      'Control': 'PLC+HMI',
      'Auto reverse': 'Yes',
    },
    {
      Model: 'TS-200',
      'Nominal capacity': '2.0 TPH',
      'Chamber (mm)': '900×750',
      'Motor': '2×40 HP',
      'Total power': '80 HP',
      'Shaft diameter': '150 mm',
      'Cutter diameter': '350 mm',
      'Cutter thickness': '40 mm',
      'Shaft speed': '12-20 RPM',
      'Output size': '50-150 mm',
      'Cutter material': 'D2 / Alloy',
      'Cutter hardness': '50-58 HRC',
      'Control': 'PLC+HMI',
      'Auto reverse': 'Yes',
    },
    {
      Model: 'TS-250',
      'Nominal capacity': '2.5 TPH',
      'Chamber (mm)': '1000×800',
      'Motor': '2×50 HP',
      'Total power': '100 HP',
      'Shaft diameter': '170 mm',
      'Cutter diameter': '380 mm',
      'Cutter thickness': '45 mm',
      'Shaft speed': '12-20 RPM',
      'Output size': '50-150 mm',
      'Cutter material': 'D2 / Alloy',
      'Cutter hardness': '50-58 HRC',
      'Control': 'PLC+HMI',
      'Auto reverse': 'Yes',
    },
    {
      Model: 'TS-300',
      'Nominal capacity': '3.0 TPH',
      'Chamber (mm)': '1100×850',
      'Motor': '2×60 HP',
      'Total power': '120 HP',
      'Shaft diameter': '180 mm',
      'Cutter diameter': '400 mm',
      'Cutter thickness': '50 mm',
      'Shaft speed': '10-18 RPM',
      'Output size': '75-200 mm',
      'Cutter material': 'D2 / Alloy',
      'Cutter hardness': '50-58 HRC',
      'Control': 'PLC+HMI',
      'Auto reverse': 'Yes',
    },
  ],
},
'vertical-briquetting-machine': {

  name: 'Vertical Briquetting Machine',

  description:
    'High-pressure vertical briquetting machine for converting machining waste and metal chips into dense, uniform briquettes for efficient handling and remelting.',

  galleryLabels: [
    'Main View',
    'Front View',
    'Side View',
    'Rear View',
    'Control Panel',
  ],

  specTitle: 'Technical Specifications',

  specTables: [

    {
      title: 'Typical Material Suitability',

      specs: [
        {
          Material: 'Aluminium chips / turning',
          'Typical Target Density': '2.0–2.5 T/m³',
          'Recommended Range': '150–315 T',
        },
        {
          Material: 'MS / steel chips',
          'Typical Target Density': '4.5–5.5 T/m³',
          'Recommended Range': '250–500 T',
        },
        {
          Material: 'Cast iron chips',
          'Typical Target Density': '4.5–5.5 T/m³',
          'Recommended Range': '250–500 T',
        },
        {
          Material: 'Copper chips',
          'Typical Target Density': '6.0–7.0 T/m³',
          'Recommended Range': '315–630 T',
        },
        {
          Material: 'Brass chips',
          'Typical Target Density': '5.5–7.0 T/m³',
          'Recommended Range': '315–630 T',
        },
        {
          Material: 'Stainless chips',
          'Typical Target Density': '4.5–5.5 T/m³',
          'Recommended Range': '315–630 T',
        },
      ],
    },

    {
      title: 'Machine Specifications',

      specs: [
        {
          Model: 'JHP-VB-150',
          Force: '150 T',
          'Briquette Dia.': '75–112 mm',
          Motor: '20 HP',
          Tank: '250 L',
          'Indicative Capacity': '150–250 kg/h',
        },
        {
          Model: 'JHP-VB-250',
          Force: '250 T',
          'Briquette Dia.': '80–120 mm',
          Motor: '30 HP',
          Tank: '350 L',
          'Indicative Capacity': '250–400 kg/h',
        },
        {
          Model: 'JHP-VB-315',
          Force: '315 T',
          'Briquette Dia.': '90–135 mm',
          Motor: '40 HP',
          Tank: '450 L',
          'Indicative Capacity': '350–550 kg/h',
        },
        {
          Model: 'JHP-VB-400',
          Force: '400 T',
          'Briquette Dia.': '100–150 mm',
          Motor: '50 HP',
          Tank: '500 L',
          'Indicative Capacity': '450–700 kg/h',
        },
        {
          Model: 'JHP-VB-500',
          Force: '500 T',
          'Briquette Dia.': '120–180 mm',
          Motor: '60 HP',
          Tank: '650 L',
          'Indicative Capacity': '600–900 kg/h',
        },
        {
          Model: 'JHP-VB-630',
          Force: '630 T',
          'Briquette Dia.': '150–225 mm',
          Motor: '75 HP',
          Tank: '800 L',
          'Indicative Capacity': '800–1,200 kg/h',
        },
      ],
    },

  ],
},
'fodder-block-making-machine': {
  name: 'Fodder Block Making Machine',
  specs: [
    {
      Model: 'FBM Standard',
      'Feeding chamber': '24×18×43"',
      'Block size': '12×18×5"',
      'Motor (HP)': '30',
      'Production (blocks/hr)': '70-90',
      'Block wt — dry fodder': '10-12 kg',
      'Block wt — TMR 50:50': '14-18 kg',
    },
    {
      Model: 'FBM-HD Heavy Duty',
      'Feeding chamber': '23×24×50"',
      'Block size': '12×24×6"',
      'Motor (HP)': '50',
      'Production (blocks/hr)': '90-100',
      'Block wt — dry fodder': '14-17 kg',
      'Block wt — TMR 50:50': '27-30 kg',
    },
  ],
},

'conveyors': {
  name: 'Conveyors',
  specs: [
    {
      Type: 'Inclined Magnetic',
      Material: 'Any / metal',
      'Belt Width': '900 mm',
      'Drive Motor': '2.0 HP geared',
      Length: '3,700 mm',
    },
    {
      Type: 'Flat Bed Sorting',
      Material: 'Any / mixed',
      'Belt Width': '900 mm',
      'Drive Motor': '2.0 HP',
      Length: '4,000 mm',
    },
    {
      Type: 'Transfer',
      Material: 'Any / sorted',
      'Belt Width': '900 mm',
      'Drive Motor': '2.0 HP geared',
      Length: '3,700 mm',
    },
  ],
},
'material-recovery-facility': {
  name: 'Complete Material Recovery Facility',
  description:
    'Jindal Hydro Projects designs and supplies complete Material Recovery Facilities — MRF plants that carry mixed municipal solid waste from intake and manual sorting, through mechanical separation, to baling. Every facility is engineered around the site and waste composition, turning mixed waste into clean, recoverable streams and dense bales ready for recycling or waste-to-energy.',

  // ===== Section: The Complete Process (8 steps) =====
  processSteps: [
    { number: '01', title: 'Waste generation', text: 'From homes, markets, offices and institutions.' },
    { number: '02', title: 'Door-to-door collection', text: 'Collection vehicles bring waste to the plant.' },
    { number: '03', title: 'Tipper / unloading', text: 'Hydraulic tipper discharges into the unloading pit.' },
    { number: '04', title: 'Sorting conveyor', text: 'Manual picking of recyclable and non-recyclable material.' },
    { number: '05', title: 'Material separation', text: 'Trommel, magnet, air classifier and disc separator.' },
    { number: '06', title: 'Feeding conveyor', text: 'Sorted material is conveyed to the baler.' },
    { number: '07', title: 'Baler / compactor', text: 'Waste is compressed into dense, uniform bales.' },
    { number: '08', title: 'Baled waste', text: 'Stored and dispatched for recycling or waste-to-energy.' },
  ],

  // ===== Section: The Facility in Operation (3-image gallery with captions) =====
  facilityGallery: [
    {
      title: 'Tipping / unloading platform',
      text: 'Hydraulic tipper with unloading pit, 55–60° tipping angle, 30–70 TPD.',
      image: '/images/3D Models from AI/MRF/msw_tipper_platform.png',
    },
    {
      title: 'Sorting conveyor & picking station',
      text: '1000mm belt with side platform, safety railing and emergency pull-cord.',
      image: '/images/3D Models from AI/MRF/msw_sorting_conveyor.png',
    },
    {
      title: 'Baled waste, ready for dispatch',
      text: 'Dense bales of 250–400 kg for the recycling industry or waste-to-energy.',
      image: '/images/3D Models from AI/MRF/msw_baled_waste.png',
    },
  ],

  // ===== Section: MRF machinery overview (4 machine cards) =====
  machineryOverview: [
    { title: 'Trommel screen', text: 'Size separation (> mesh / < mesh)', image: '/images/3D Models from AI/MRF/msw_trommel_screen.png' },
    { title: 'Magnetic separator', text: 'Removal of ferrous metals', image: '/images/3D Models from AI/MRF/msw_magnetic_separator.png' },
    { title: 'Air classifier', text: 'Separation of light materials', image: '/images/3D Models from AI/MRF/msw_air_classifier.png' },
    { title: 'Disc separator', text: 'Additional 2D / 3D separation', image: '/images/3D Models from AI/MRF/msw_disc_separator.png' },
  ],

  // ===== Section: Major Machinery — Technical Specifications =====
  // (this reuses your EXISTING specTables rendering — no new JSX needed for this part)
  specTitle: 'MRF Machinery & Technical Specifications',
  specTables: [
    {
      title: 'Major Machinery — Technical Specifications',
      specs: [
        { 'Machinery / Equipment': 'Tipper / unloading platform', Capacity: '30-70 TPD', Power: 'Hydraulic', Specification: 'Hydraulic tipper with unloading pit; 55–60° tipping angle', Purpose: 'Unloading of waste from collection vehicle' },
        { 'Machinery / Equipment': 'Sorting conveyor belt', Capacity: '30-70 TPD', Power: '2.2-7.5 kW', Specification: 'Belt 800–1200 mm; length 10–25 m', Purpose: 'Manual sorting of waste' },
        { 'Machinery / Equipment': 'Trommel screen', Capacity: '30-70 TPD', Power: '7.5-15 kW', Specification: 'Drum dia 1.5–2.5 m; length 4–8 m; mesh 20–100 mm', Purpose: 'Size separation (> mesh / < mesh)' },
        { 'Machinery / Equipment': 'Magnetic separator', Capacity: '30-70 TPD', Power: '2.2-5.5 kW', Specification: 'Overband magnet; field strength 3000–5000 Gauss', Purpose: 'Removal of ferrous metals' },
        { 'Machinery / Equipment': 'Air classifier', Capacity: '30-70 TPD', Power: '7.5-11 kW', Specification: 'Air velocity 15–25 m/s; adjustable baffles', Purpose: 'Separation of light materials (paper, plastic)' },
        { 'Machinery / Equipment': 'Disc separator', Capacity: '30-70 TPD', Power: '5.5-11 kW', Specification: '10–20 discs; disc dia 600–900 mm', Purpose: 'Additional 2D / 3D separation' },
        { 'Machinery / Equipment': 'Feeding conveyor', Capacity: '30-70 TPD', Power: '2.2-5.5 kW', Specification: 'Belt 600–1000 mm; length 5–15 m', Purpose: 'Feeding material to baler / compactor' },
        { 'Machinery / Equipment': 'Baler / compactor', Capacity: '30-70 TPD', Power: '15-55 kW', Specification: 'Bale ~1100×750 mm; bale weight 250–400 kg', Purpose: 'Compression and baling of waste' },
        { 'Machinery / Equipment': 'Hydraulic power pack', Capacity: '—', Power: '5.5-11 kW', Specification: 'Pressure 150–250 bar; oil tank 200–500 L', Purpose: 'Power supply for hydraulic system' },
        { 'Machinery / Equipment': 'Control panel & automation', Capacity: '—', Power: '—', Specification: 'PLC-based control with HMI and push-button', Purpose: 'Automatic / semi-automatic operation' },
      ],
    },
  ],

  // ===== Section: MRF Layout & Performance =====
  processFlow: [
    'Entry',
    'Unloading platform',
    'Sorting conveyor',
    'Trommel screen',
    'Magnetic separator',
    'Air classifier',
    'Disc separator',
    'Feeding conveyor',
    'Baler / compactor',
    'Baled storage',
  ],

  performanceStats: [
    { value: '10-20%', label: 'Recyclables recovery' },
    { value: '20-30%', label: 'RDF / reject fraction' },
    { value: '10-15%', label: 'Compostable (if any)' },
    { value: '15-25%', label: 'Inert / fine fraction' },
    { value: '80-90%', label: 'Overall efficiency' },
    { value: '30-70 TPD', label: 'Standard capacity' },
  ],

  outputTypes: [
    { title: 'Recyclables', text: 'Paper, plastic, metal, glass — sent to recycling industry' },
    { title: 'Refuse-derived fuel (RDF)', text: 'High-calorific fraction for waste-to-energy' },
    { title: 'Inert material', text: 'For road sub-base / safe landfill' },
    { title: 'Baled material', text: 'Dense bales for the recycling industry' },
  ],

  benefits: [
    'Reduces landfill waste',
    'Increases recycling rate',
    'Conserves natural resources',
    'Generates revenue',
    'Supports waste-to-energy',
    'Clean & green environment',
  ],

  utilitiesSafetyEnvironment: [
    {
      title: 'Essential utilities',
      items: ['Electrical supply', 'Water supply (dust suppression)', 'Compressed air (if required)', 'Fire-fighting supply', 'Weighbridge (optional)'],
    },
    {
      title: 'Safety features',
      items: ['Emergency stop on all machines', 'Safety guards & railings', 'Fire extinguishers', 'PPE for workers', 'Dust collection system'],
    },
    {
      title: 'Environmental control',
      items: ['Dust suppression system', 'Leachate collection', 'Odour control', 'Noise control (enclosures)', 'Green belt / plantation'],
    },
  ],
},
}
const materialProcessed = {
     'super-jumbo-baler': [
    'Heavy TMT bars 5–10mm thick',
    'Oversized and irregular ferrous scrap',
    'Mixed metal scrap',
    'Car body scraps',
    'Ferrous and mixed metal scrap for 20×20" to 35×35" bales',
  ],

  'triple-action-baler': [
    'Ferrous scrap — offcuts, machine chips, TMT, auto skeletons',
    'Non-ferrous scrap — UBCs, copper, aluminium and wire',
    'Dry waste — cardboard and paper',
    'Mixed recyclable materials',
    'Materials for 10 kg to 1 ton bales',
  ],

  'mini-triple-action-baler': [
    'Copper scrap',
    'Aluminium scrap',
    'MS light commercial scrap',
    'Stainless steel',
    'Light scrap and paper',
    'Corrugated cardboard',
  ],

  'double-action-baler': [
    'UBCs and stainless steel',
    'Copper, aluminium and wire',
    'Tubing and metal sheets',
    'White goods',
    'Corrugated scrap and paper',
  ],

  'vertical-baler': [
    'UBCs and corrugated paper',
    'PET bottles and plastic',
    'OCC, fabrics and foam',
    'Used tyres and rubber',
    'Loose light metal scrap and dry waste',
  ],

  'car-baler': [
    'Car bodies and auto skeletons',
    'White goods',
    'Light and mixed metal scrap',
    'Metal sheets',
    'End-of-life vehicles (ELVs)',
  ],

  'automatic-baler': [
    'Paper and OCC',
    'Corrugated cardboard',
    'PET bottles and HDPE/PP/LDPE plastics',
    'Foam and textile',
    'MCD scrap and poly bag scrap',
  ],

  'semi-automatic-baler': [
    'Paper and cardboard',
    'Plastic and PET bottles',
    'OCC and poly bag waste',
    'MCD scrap',
    'High-density recyclable plastic waste',
  ],

  'c-frame-hydraulic-press': [
    'Sheet metal for blanking and punching',
    'Components for riveting and press-fit assembly',
    'Metal components for straightening',
    'Small to medium metal components',
    'Custom-sized components for varied press applications',
  ],

  'h-frame-hydraulic-press': [
    'Sheet metal for deep drawing',
    'Metal components for forging',
    'Components requiring straightening',
    'Rubber products for compression moulding',
    'Heavy and wide components for forming applications',
  ],

  '4-pillar-type-hydraulic-press': [
    'Rubber and composite materials',
    'FRP and SMC materials',
    'Plywood and laminates',
    'Electrical fitting materials',
    'Brake lining and friction materials',
    'Sanitary and building products',
  ],

  'industrial-tablet-press': [
    'Refractory powders',
    'Ceramic powders',
    'Chemical and detergent powders',
    'Powder metallurgy materials',
    'Magnetic and electronic powders',
    'Fertiliser and agrochemical powders',
  ],

  'nibblers-hydraulic': [
    'Aluminium sections',
    'Metal sheets',
    'Sheet metal requiring minimal deformation',
    'Precision sheet-metal components',
    'Varied sheet-metal gauges',
  ],

  'alligator-shear': [
    'Round bars',
    'Channels and TMT',
    'Angles and structural sections',
    'Cables and wire',
    'Plates and tubes',
    'Mixed metal scrap',
  ],

  'hydraulic-box-shear': [
    'MS light commercial scrap',
    'HR/CR sheet cuttings and metal sheets',
    'Light scrap, tubing and offcuts',
    'Mixed metal and white goods',
    'Scrap for uniform 400mm furnace-ready charge lengths',
  ],

  'single-shaft-shredder': [
    'Plastics and packaging waste',
    'Paper and fabric',
    'Tyres',
    'Selected metal scrap',
    'Bulky and mixed waste streams',
  ],

  'twin-shaft-shredder': [
    'Aluminium castings',
    'Iron and steel scrap',
    'Tyre wire',
    'Wooden pallets',
    'Cable drums',
    'Plastic and paper',
  ],

  'vertical-briquetting-machine': [
    'Aluminium chips and turnings',
    'MS and steel chips',
    'Cast-iron chips',
    'Copper and brass chips',
    'Stainless steel chips and swarf',
    'Machining waste, filings, shavings and metal swarf',
  ],

  'fodder-block-making-machine': [
    'Straw and husk',
    'Dry grass and roughage',
    'TMR (total mixed ration) blends',
    'Dry agricultural waste',
    'Fodder and roughage for 10–30 kg blocks',
  ],

  'conveyors': [
    'Ferrous and non-ferrous metal',
    'Plastics and paper',
    'Mixed waste streams',
    'Sorted and unsorted scrap',
    'Recyclable materials for magnetic separation',
  ],

  'material-recovery-facility': [
    'Mixed municipal solid waste',
    'Paper, plastic, metal and glass recyclables',
    'Refuse-derived fuel (RDF) materials',
    'Inert materials for road sub-base or landfill',
    'Recyclable waste for 250–400 kg dense bales',
  ],
};

const keyFeatures = {
  'super-jumbo-baler': [
    'Bale sizes 20×20" up to 35×35"',
    'Cylinder force up to 300 tons',
    'Processes heavy TMT bars 5–10mm thick',
    'Production 2–10 tons/hr; bale under 75 sec',
    'Separate manifolds per cylinder',
    'HARDOX 500-BHN compression chamber',
  ],
  'triple-action-baler': [
    'Three-direction compression for super-dense bales',
    'Handles metal scrap and dry waste alike',
    'Bale weights from 10 kg to 1 ton',
    'Fully automatic PLC touch-screen control',
    'Replaceable HARDOX liner plates',
    'No tying required on select models',
  ],
  'mini-triple-action-baler': [
    'Three-direction compression, dense bales',
    'Bale sizes 6×6" to 10×10"; up to 10 tons/hr',
    'Fully automatic PLC control',
    'Compact footprint for smaller yards',
    'Online oil chiller & auto lubrication',
  ],
  'double-action-baler': [
    'Two-direction compaction, small footprint',
    'Automatic PLC-controlled pressing door',
    'Hinged manual top door with front hand-lever',
    'Top bale ejection — easy removal in tight spaces',
    'No civil foundation — easy to relocate',
    'Shearing blades for material up to 5mm',
    'In-house valves & pumps for low cycle times',
  ],
  'vertical-baler': [
    'Vertical top-down compression, space-efficient',
    'Handles light metal scrap and dry waste',
    'No civil foundation required',
    'PLC or hydraulic hand-lever options',
    'Bale range 30–500 kg by model',
    'Low-noise operation, easy to relocate'
  ],
  'car-baler': [
    'Purpose-built for ELV / RVSF applications',
    'Compacts intact cars, bodies, doors, buses, trucks',
    'Produces solid high-density bundles',
    'Minimal maintenance, robust design',
    'Trusted in ELV recycling plants',
  ],
  'automatic-baler': [
    'Fully automated: feed → compaction → ejection',
    'Up to 200 tons per shift',
    'Programmable, auto-controlled bale length',
    'HARDOX 400 lining plates',
    'Online oil chiller — runs up to 20 hours',
    'Drastically reduces cost per tonne',
  ],
  'semi-automatic-baler': [
    'Automatic baling with manual strapping',
    '16–24 tons per shift',
    'High-density bales, ideal for plastic',
    'User-friendly PLC module',
    'HARDOX 400 lining & online oil chiller',
    'Reduces manpower requirement',
  ],
    'c-frame-hydraulic-press': [
    'Open three-sided C-frame design',
    'Compact floor footprint',
    'Fast loading and tool changes',
    'Two-hand controls and emergency stop',
    'High-frequency hand-fed operation',
    'Custom throat depth and daylight',
    'Stress-relieved steel frame',
    'Industrial guarding and interlocks',
    'Application-specific capacity and stroke',
    'High-cycle operational accuracy'
  ],

  'h-frame-hydraulic-press': [
    'Rigid closed portal-frame design',
    'Parallel ram movement under load',
    'Separate hydraulic power pack',
    'Fast approach and controlled press stroke',
    'PLC with HMI or relay control',
    'Off-centre and multi-point loading capability',
    'High rigidity with minimal deflection',
    'Heavy forming and forging capability',
    'Dual palm-button safety controls',
    'Application-specific capacity and stroke'
  ],

  '4-pillar-type-hydraulic-press': [
    'Four-column guided platen',
    'Maintains platen parallelism',
    'Down-stroke and up-stroke configurations',
    'PLC depth control',
    'Automatic ejection',
    'Single or multi-daylight beds',
    'Multi-station configuration',
    'Electrically heated platens',
    'Open die access on all sides',
    'Application-specific platen and heating configuration'
  ],

  'industrial-tablet-press': [
    'Controlled die filling and compaction',
    'Independent ejection cylinder',
    'Programmable force, dwell and stroke',
    'PLC with HMI control',
    'Automatic shut-off',
    'Single and multi-cavity tooling',
    'High-pressure powder compaction',
    'Continuous powder feeding system',
    'Application-specific pressing and ejection force',
    'Consistent density production'
  ],
  'alligator-shear': [
    'Cuts TMT, angle, round bar, cable, plates, tubes',
    'Cutting capacity up to 85–120mm round',
    'Broad shearing jaw for wide scrap',
    'Up to 13–14 strokes/min',
    'Manual, full-auto & foot-pedal operation',
    'No civil foundation required',
  ],
  'nibbler-hydrauluc': [
     'V-shaped blade for clean, precise cuts',
    'Hydraulic & mechanical variants',
    'Cuts material up to 62–80mm thick',
    'PLC pedal control (hydraulic)',
    'No civil foundation required',
  ],
  'single-shaft-shredder': [
    'Low rotor speed, high torque — no jamming',
    'Sieve-controlled homogeneous output',
    'Powerful hydraulic feeder',
    'Advanced PLC controls',
    'Integrates with infeed/outfeed conveyors'
  ],
  'twin-shaft-shredder': [
    'Dual interlocking shafts — jam-free',
    'Low speed, high torque, energy efficient',
    '50–60 HRC cutters for long life',
    'Hydraulic or electric drive',
    'Integrates with conveyors',
  ],
  'casting-cracker': [
    'Strong jaw design for firm grip',
    'Processes engines, gears, cast iron, tense scrap',
    'Capacity 3–5 tons per hour',
    'Optional loading/unloading conveyors',
    'Compact, robust, minimal footprint',
  ],
  'vertical-briquetting-machine': [
    'Compression force up to 5000 kg/cm²',
    'Density increase up to 90%',
    'Uniform briquettes for consistent melting',
    'HMI PLC control panel',
    'Online oil chiller for long-hour operation',
    'Minimal losses during smelting',
  ],
  'conveyors': [
    'Multipurpose — handles any material type',
    'Sorts and transports scrap and waste of all kinds',
    'Inclined magnetic, flat-bed sorting & transfer types',
    'Infeed and outfeed for shredders & balers',
    'Custom lengths, widths & inclinations'
  ],
  'msw-sorting-line': [
    'Separates recyclables from non-recyclables',
    'Separates organic from inorganic matter',
    'Integrated conveyor & sorting — complete plant',
    'Suitable for biomining of legacy waste',
    'Mechanical + optical sorting for accuracy',
  ],
  'fodder-block-making-machine': [
    'Dense uniform blocks from roughage & concentrate',
    'PLC-controlled, consistent dimensions',
    'Semi-automatic poly-bag packaging',
    '70–100 blocks per hour',
    'Supports dry fodder & TMR 50:50 blends',
    'Blocks store long-term & transport efficiently',
  ],
};

const suitableIndustries = {
  'triple-action-baler': [
    'Scrap Yards',
    'Rolling Mills',
    'Packaging',
    'Recyclers',
  ],
  'mini-triple-action-baler': [
    'Scrap Yards',
    'In-house Scrap',
    'Metal Recyclers',
  ],
  'double-action-baler': [
    'Scrap Yards',
    'Workshops',
    'Recyclers',
  ],
  'vertical-baler': [
    'Limited-Space Facilities',
    'Recyclers',
    'Retail & Warehouse',
  ],
  'super-jumbo-baler': [
    'High-Volume Recyclers',
    'Large Scrap Yards',
    'Steel Plants',
  ],
  'car-baler': [
    'RVSF facilities',
    'ELV plants',
    'Automotive',
    'Scrap Yards',
  ],
  'automatic-baler': [
    'Waste Recyclers',
    'Paper Mills',
    'Packaging',
    'PET & Textile Recycling',
  ],
  'semi-automatic-baler': [
    'Recyclers',
    'Printing Firms',
    'Packaging Factories',
  ],
  'alligator-shear': [
    'Scrap Yards',
    'Recyclers',
    'ELV Plants',
    'Fabrication',
  ],
  'nibblers-hydraulic': [
    'Sheet Metal Processors',
    'Recyclers',
    'Fabrication',
  ],
  'single-shaft-shredder': [
    'MSW Plants',
    'MRFs',
    'Scrap Processing',
  ],
  'twin-shaft-shredder': [
    'Pre-Shredding Lines',
    'Recyclers',
    'ELV Plants',
  ],
  'casting-cracker': [
    'ELV Plants',
    'Foundries',
    'Metal Recyclers',
  ],
  'vertical-briquetting-machine': [
    'Machining Shops',
    'Foundries',
    'Metal Recyclers',
  ],
  conveyors: [
    'Recycling Lines',
    'MRFs',
    'Scrap Yards',
  ],
  'msw-sorting-line': [
    'Municipalities',
    'Waste Contractors',
    'Urban Local Bodies',
  ],
  'fodder-block-making-machine': [
    'Farms',
    'Cattle Co-operatives',
    'Biomass Plants',
    'Agro-Export',
  ],
};

const seoEfficiencyFeatures = {
  'super-jumbo-baler': [
    'PLC-controlled automatic cycle for consistent, hands-free baling',
    'Fast cycle time of 80–100 seconds per bale across all models',
    'High production output of 24–72 tons per 8-hour shift depending on model',
    'Separate hydraulic manifolds per cylinder for smoother, more efficient compression',
    'Motor options from 80 HP to 100 HP matched to bale size for optimal power use',
  ],

  'triple-action-baler': [
    'Three-direction simultaneous compression for maximum density in a single cycle',
    'Fully automatic PLC touch-screen control with hand-lever backup',
    'Cycle times from 45–100 seconds depending on model size',
    'Six model sizes (Mini to Jumbo Plus) matched to throughput needs',
    'Multiple ejection modes — top, turn-out, side-door — speed up bale removal',
  ],

  'mini-triple-action-baler': [
    'Fully automatic PLC control for consistent, repeatable bales',
    'Compact footprint suited to space-constrained yards',
    'Online oil chiller and auto-lubrication reduce downtime and maintenance stops',
    'Four model sizes (6×6" to 10×10") for flexible throughput',
    'Simple, easy-to-install configuration with fast commissioning',
  ],

  'double-action-baler': [
    'Automatic PLC-controlled pressing door, hinged manual door, or top-ejection configuration to match your handling needs',
    'Two-direction compaction achieves a small footprint without sacrificing throughput',
    'Cycle times of 50–85 seconds depending on chamber size',
    'Standard-make hydraulic valves and pumps keep cycle times low',
    'No civil foundation required — fast to install and relocate',
  ],

  'vertical-baler': [
    'Vertical top-down compression makes efficient use of a small floor footprint',
    'PLC or hydraulic hand-lever control options for different operating preferences',
    'Automatic ejection reduces manual handling between cycles',
    'Low-noise operation suited to indoor or mixed-use facilities',
    'Easy to relocate with no civil foundation needed',
  ],

  'car-baler': [
    'Full-length lid crushes an entire vehicle in a single pass',
    'Complete cycle takes seconds rather than minutes',
    'Trailer-mounted design tows between sites on its own axles',
    'Onboard diesel power pack runs independent of site electricity',
    'Hydraulic outriggers enable fast, level set-up at each location',
  ],

  'automatic-baler': [
    'Fully automated feed → compaction → ejection cycle needs minimal labour',
    'Up to 200 tons of baled output per shift',
    'Programmable, auto-controlled bale length for consistent output',
    'Online oil chiller supports up to 20 hours of continuous running',
    'Five bale-size configurations scale production from 1 to 12 tons/hour',
  ],

  'semi-automatic-baler': [
    'Automatic baling with manual strapping balances speed and cost',
    'Handles 16–24 tons of throughput per shift',
    'User-friendly PLC module simplifies operator training and control',
    'Two model sizes (SAT 12, SAT 23) matched to production needs',
    'Reduces manpower requirement compared with manual baling',
  ],

  'c-frame-hydraulic-press': [
    'Open on three sides for fast, unobstructed loading and tool changes',
    'Smallest footprint of any frame for a given capacity, saving floor space',
    'Two-hand controls and emergency stop for safe, efficient operation',
    'Well suited to high-frequency, hand-fed production work',
    "Throat depth and daylight configured to match the customer's component",
  ],

  'h-frame-hydraulic-press': [
    'Ram stays parallel to the bed under full load for consistent part quality',
    'Separate hydraulic power pack enables fast approach and controlled press stroke',
    'PLC with HMI or relay control for flexible automation levels',
    'Tolerates off-centre and multi-point loading without losing accuracy',
    "Capacity, daylight, stroke and automation configured to the customer's cycle",
  ],

  '4-pillar-type-hydraulic-press': [
    'Platen guided at all four corners keeps parallelism through the entire stroke',
    'Down-stroke and up-stroke configurations suit different production layouts',
    'PLC with depth control and automatic ejection speeds up cycle times',
    'Single or multi-daylight, multi-station beds increase throughput per cycle',
    'Photo-sensor guarding supports safe, high-speed operation',
  ],

  'industrial-tablet-press': [
    'Die fill, compaction and ejection managed in one controlled cycle',
    'Independently rated ejection cylinder for consistent part release',
    'Programmable force, dwell and stroke deliver repeatable density',
    'PLC with HMI control and automatic shut-off for hands-off operation',
    'Single and multi-cavity tooling options increase output per cycle',
  ],

  'alligator-shear': [
    'Cuts up to 13–14 strokes per minute for high-volume sizing',
    'Manual, full-auto and foot-pedal operation modes for operator flexibility',
    'Broad shearing jaw handles wide, bulky scrap in fewer cuts',
    'No civil foundation required for fast installation',
    'Three shear-force models (35–200 T) matched to throughput needs',
  ],

  'nibblers-hydraulic': [
    'PLC pedal control gives the operator precise, hands-free cutting control',
    '14–16 strokes per minute for efficient sheet-metal sizing',
    'Mobile design with wheels for easy repositioning on site',
    'No civil foundation required, allowing fast deployment',
    'V-shaped blade minimises material deformation for cleaner downstream processing',
  ],

  'hydraulic-box-shear': [
    'Fully hydraulic drive with PLC automatic control for consistent cycling',
    'Uniform 400mm cut length for consistent furnace charging',
    'Capacity up to 9–25 tons per hour depending on model',
    'Remote control and panel operation for flexible operator positioning',
    'Flat foundation only — straightforward, low-cost installation',
  ],

  'single-shaft-shredder': [
    'Low rotor speed with high torque prevents jamming on tough material',
    'Sieve-controlled output ensures homogeneous, consistent particle size',
    'Powerful hydraulic feeder maintains steady material throughput',
    'Advanced PLC controls for automated, hands-off operation',
    'Integrates with infeed/outfeed conveyors for continuous processing lines',
  ],

  'twin-shaft-shredder': [
    'Dual interlocking shafts virtually eliminate material jams',
    'Low speed, high torque design for energy-efficient shredding',
    'PLC + HMI control with auto-reverse for hands-off, jam-recovery operation',
    'Hydraulic or electric drive options to suit site infrastructure',
    'Six model sizes (TS-0.75 to TS-300) scale from 0.75 to 3.0 TPH',
  ],

  'vertical-briquetting-machine': [
    'Compression force up to 5,000 kg/cm² for maximum density in one stroke',
    'Volume reduction of up to 90% cuts transport and storage costs',
    'HMI PLC control panel for consistent, repeatable briquette quality',
    'Online oil chiller supports long-hour continuous operation',
    'Six model sizes (JHP-VB-150 to 630) scale output from 150 to 1,200 kg/h',
  ],

  'fodder-block-making-machine': [
    'PLC-controlled operation for consistent block dimensions',
    'Semi-automatic poly-bag packaging speeds up finished-goods handling',
    'Production of 70–100 blocks per hour depending on model',
    'Standard and Heavy Duty variants match capacity to farm or plant scale',
    'Supports both dry fodder and TMR 50:50 blends in one machine',
  ],

  conveyors: [
    'Integrates seamlessly as infeed/outfeed with balers, shredders and shears',
    'Reduces forklift traffic and manual handling across the plant',
    'Inclined magnetic, flat-bed sorting and transfer types cover multiple functions',
    'Custom lengths, widths and inclinations optimise material flow per site layout',
    'Mechanised transport increases overall processing-line efficiency',
  ],

  'material-recovery-facility': [
    'Eight-stage process from waste generation through to baled, dispatch-ready output',
    '80–90% overall plant efficiency on standard configurations',
    'PLC-based control with HMI and push-button automation across major machinery',
    'Hydraulic tipper with 55–60° tipping angle speeds up unloading',
    'Standard capacity of 30–70 tonnes per day',
  ],
};

const durabilityFeatures = {
  'super-jumbo-baler': [
    'HARDOX 500-BHN compression chamber resists wear from heavy, abrasive scrap',
    'Heavy-duty cylinder construction rated for up to 300 tons of crushing force',
    'Robust chamber sizes up to 105×60×50" engineered for continuous heavy-duty use',
    'Reinforced frame handles dense TMT bars 5–10mm thick without deformation',
    'Five chamber/bale configurations available to match load demands precisely',
  ],

  'triple-action-baler': [
    'Replaceable HARDOX liner plates protect the chamber from abrasive wear',
    'Rugged three-ram design engineered for continuous heavy-duty cycling',
    'Motor options up to 60 HP × 2 for high-load Jumbo Plus models',
    'Reinforced chamber built for bale weights from 10 kg up to 1 ton',
    'Heavy-gauge steel construction suited to demanding scrap-yard environments',
  ],

  'mini-triple-action-baler': [
    'Three-direction compression design built for dense, long-lasting bale integrity',
    'Heavy-duty construction suited to continuous small-batch scrap processing',
    '20–25 HP motors sized for reliable, low-strain operation',
    'Compact chamber engineered to handle mixed metal and dry waste without excess wear',
    'Built for scrap yards processing copper, aluminium and MS on a daily basis',
  ],

  'double-action-baler': [
    'Shearing blades handle material from 2mm sheet metal up to 5mm thick without excess wear',
    'Twin-ram construction engineered for sustained, high-throughput operation',
    'Three chamber sizes built to handle 20–60 kg bale weights reliably',
    'Standard hydraulic components chosen for long service life and easy parts sourcing',
    'Compact welded-steel frame designed for repeated relocation without structural fatigue',
  ],

  'vertical-baler': [
    'Available from 20 to 200 tons of pressing force for varied duty cycles',
    'Configurable as a dedicated tyre baler for abrasive rubber material',
    'Robust vertical ram design built for continuous, repeated compression',
    'Charging-chamber sizes configured to customer scrap type for optimal wear life',
    'Bale size and weight engineered to specification for consistent output',
  ],

  'car-baler': [
    'Crushing force up to 159 tons for heavy vehicle bodies',
    '10 ft crusher opening handles stacked or bulky loads',
    'Heavy-duty 60,000 lb machine weight for structural stability under load',
    '10 in cylinder bore and 4 in rod diameter engineered for repeated crushing cycles',
    'Special-build units available with larger openings for oversized loads',
  ],

  'automatic-baler': [
    'HARDOX 400 lining plates resist wear from continuous high-volume baling',
    'Engineered for sustained multi-shift, high-tonnage operation',
    'Press forces up to 150 tons for heavy-duty compaction cycles',
    'Oil-chilled hydraulics maintain performance over long duty cycles',
    'Robust frame designed to drastically reduce cost per tonne over its service life',
  ],

  'semi-automatic-baler': [
    'HARDOX 400 lining protects the chamber from continuous plastic and paper wear',
    'Online oil chiller supports extended, reliable operation',
    'Compact frame built for consistent medium-volume daily use',
    'High-density bale output reduces internal wear from repeated handling',
    'Proven construction suited to plastic-processing environments',
  ],

  'c-frame-hydraulic-press': [
    'Frame fabricated from stress-relieved steel plate for long-term stability',
    'Guarding and interlocks built for continuous industrial use',
    'Capacity, stroke and table size engineered to the specific application',
    'Robust single-column design suited to repeated blanking and punching cycles',
    'Built to hold accuracy through frequent, high-cycle operation',
  ],

  'h-frame-hydraulic-press': [
    'Closed portal frame delivers high rigidity and minimal deflection under load',
    'Engineered for heavy forming, forging and compression moulding duty cycles',
    'Dual palm-button safety controls for reliable long-term operation',
    'Frame built to tolerate wide dies and heavy, off-centre loads without fatigue',
    'Sized specifically to the application for maximum structural longevity',
  ],

  '4-pillar-type-hydraulic-press': [
    'Four precision-ground columns engineered for accurate, long-term platen alignment',
    'Electrically heated platens (steam or thermic oil on request) built for sustained thermal cycling',
    'Die area open on all sides supports large, heavy moulds without frame interference',
    'Capacity, platen size and heating configured precisely to the moulding application',
    'Robust column-guided design suited to continuous compression-moulding production',
  ],

  'industrial-tablet-press': [
    'Consistent density maintained from the first piece to the last across long runs',
    'Robust die and tooling engineered for high-pressure powder compaction',
    'Powder feed hopper and shoe designed for continuous, low-maintenance feeding',
    'Pressing and ejection force configured to the product for optimal component life',
    'Built for sustained production of refractory, ceramic and metallurgical parts',
  ],

  'alligator-shear': [
    'Cutting capacities up to 120mm round / 75mm square for heavy structural scrap',
    'Motor options up to 60 HP for sustained high-force cutting',
    'Robust jaw and blade assembly engineered for continuous shearing duty',
    'Hydraulic and mechanical variants built for demanding scrap-yard conditions',
    'Jaw opening up to 16 in accommodates oversized material without strain',
  ],

  'nibblers-hydraulic': [
    '2,400 PSI working pressure delivers consistent, high-force cutting',
    '2,500 kg machine weight provides stability during heavy-duty cutting',
    'V-shaped blade engineered for precise, long-lasting cutting performance',
    '15 HP motor sized for continuous hydraulic nibbling duty',
    'Robust hydraulic variant built for demanding sheet-metal environments',
  ],

  'hydraulic-box-shear': [
    'AC chiller / water cooling supports continuous, high-duty operation',
    'Cutting force up to 10,000 kN on the largest model',
    'Motor configurations up to 55 kW × 4 for sustained heavy-duty cutting',
    'Robust press-box design engineered for repeated compression-and-shear cycles',
    'Three model sizes built to match throughput and wear demands',
  ],

  'single-shaft-shredder': [
    '50 HP motor with hydraulic power pack built for sustained shredding duty',
    'Robust 36" × 42" cutting chamber engineered for high-volume material',
    '350mm rotor diameter designed for long service life under continuous load',
    'Low-speed, high-torque design reduces wear and mechanical strain',
    'Built to handle mixed and abrasive material streams without downtime',
  ],

  'twin-shaft-shredder': [
    'D2 / alloy tool steel cutters hardened to 50–58 HRC for long wear life',
    'Shaft diameters from 120mm to 180mm engineered for continuous heavy-duty torque',
    'Auto-reverse function protects the drivetrain from jam-related damage',
    'Cutter thickness scales from 30mm to 50mm across the range for durability at higher capacities',
    'Robust dual-shaft frame built for sustained pre-shredding of bulky material',
  ],

  'vertical-briquetting-machine': [
    'High-pressure vertical ram engineered for continuous chip and swarf compaction',
    'Uniform briquette density minimises losses and wear during smelting',
    'Motor options from 20 to 75 HP matched to compression demands',
    'Tank capacities from 250L to 800L for sustained hydraulic performance',
    'Robust construction built for daily machining-waste processing',
  ],

  'fodder-block-making-machine': [
    'Dense, uniform blocks engineered for long-term storage without spoilage',
    'Feeding chambers up to 23×24×50" built for continuous agri-waste throughput',
    'Motor options of 30 HP or 50 HP matched to duty cycle',
    'Robust hydraulic press designed for daily compaction of fibrous, abrasive roughage',
    'Blocks built to transport efficiently without breaking apart',
  ],

  conveyors: [
    'Geared drive motors (2.0 HP) engineered for continuous belt operation',
    '900mm belt width built for reliable daily material transport',
    'Robust frame construction suited to scrap-yard and MRF environments',
    'Multiple conveyor types — inclined magnetic, flat-bed, transfer — for varied duty needs',
    'Built for long-term integration within continuous processing lines',
  ],

  'material-recovery-facility': [
    'All machinery built on MS structure with anti-corrosion painting',
    'Overband magnetic separator rated at 3,000–5,000 Gauss field strength',
    'Trommel screen and air classifier engineered for continuous mechanical separation',
    'Baler/compactor rated 15–55 kW for sustained high-tonnage baling',
    'Designed for continuous operation and low maintenance',
  ],
};

const seoSuitableIndustries = {
  'super-jumbo-baler': [
    'Steel mills and re-rolling mills',
    'Large scrap metal recycling yards',
    'Automobile dismantling and ELV recycling',
    'Foundries and smelters requiring furnace-ready scrap',
    'Heavy engineering and construction scrap processors',
  ],

  'triple-action-baler': [
    'Scrap metal recycling yards',
    'Paper and cardboard recycling / waste management',
    'Automobile dismantling',
    'Metal fabrication and machining workshops',
    'Beverage can (UBC) recycling operations',
  ],

  'mini-triple-action-baler': [
    'Small to medium scrap metal yards',
    'Non-ferrous metal recycling (copper, aluminium)',
    'Local recycling and waste collection centres',
    'Metal trading and scrap dealers',
    'Cardboard and paper recyclers',
  ],

  'double-action-baler': [
    'Scrap metal recycling yards',
    'Appliance and white-goods recycling',
    'Metal fabrication workshops',
    'Cable and wire recyclers',
    'Paper and cardboard collection centres',
  ],

  'vertical-baler': [
    'PET and plastics recycling',
    'Paper and cardboard baling operations',
    'Tyre and rubber recycling',
    'Textile recycling',
    'Retail, warehouse and logistics waste management',
  ],

  'car-baler': [
    'End-of-life vehicle (ELV) recycling',
    'Automobile scrapyards and dismantlers',
    'Mobile / itinerant scrap collection services',
    'White-goods and appliance recycling',
    'Metal recycling yards needing mobile crushing capacity',
  ],

  'automatic-baler': [
    'Large-scale paper and cardboard recycling',
    'Plastics (PET/HDPE) recycling plants',
    'Municipal and commercial waste management',
    'Textile and foam recycling',
    'MRF and waste-to-energy facilities',
  ],

  'semi-automatic-baler': [
    'Plastics recycling and PET reprocessing',
    'Cardboard and paper recycling',
    'Municipal solid waste sorting facilities',
    'Packaging waste management',
    'Small to medium MRF operators',
  ],

  'c-frame-hydraulic-press': [
    'Automotive component manufacturing',
    'Electrical and switchgear production',
    'Sheet-metal fabrication',
    'Bearings and bushes manufacturing',
    'Hardware, fasteners and home appliance production',
    'Tool rooms and job shops',
    'Transformer lamination manufacturing',
  ],

  'h-frame-hydraulic-press': [
    'Automotive and auto components manufacturing',
    'Utensils and cookware production',
    'Forging shops',
    'Rubber products manufacturing',
    'Structural fabrication',
    'Railways',
    'Defence and heavy engineering',
    'General engineering',
  ],

  '4-pillar-type-hydraulic-press': [
    'Rubber and tyre products manufacturing',
    'FRP / SMC moulding',
    'Electrical fittings production',
    'Melamine crockery manufacturing',
    'Plywood and laminates',
    'Brake lining and friction materials',
    'Automotive components',
    'Sanitary and building products',
  ],

  'industrial-tablet-press': [
    'Refractories manufacturing',
    'Ceramics and sanitaryware',
    'Chemical processing',
    'Detergents and FMCG',
    'Powder metallurgy',
    'Magnetics and electronics',
    'Fertilisers and agrochemicals',
    'Foundry and furnace linings',
  ],

  'alligator-shear': [
    'Scrap metal recycling yards',
    'Steel fabrication and structural workshops',
    'Construction and demolition scrap processing',
    'Cable and wire recycling',
    'Foundries and re-rolling mills',
  ],

  'nibblers-hydraulic': [
    'Sheet-metal fabrication',
    'Aluminium extrusion and processing',
    'Metal scrap recycling',
    'Construction and structural fabrication',
    'Job shops requiring precision sheet cutting',
  ],

  'hydraulic-box-shear': [
    'Steel mills and furnace charging operations',
    'Scrap metal recycling yards',
    'Sheet-metal fabrication waste processing',
    'Foundries and smelters',
    'Appliance and white-goods recycling',
  ],

  'single-shaft-shredder': [
    'Plastics recycling and waste processing',
    'Tyre and rubber recycling',
    'Textile waste recycling',
    'Packaging waste management',
    'Municipal and industrial waste processing',
  ],

  'twin-shaft-shredder': [
    'Metal recycling and pre-shredding operations',
    'Tyre and rubber recycling',
    'Wood and pallet recycling',
    'Plastic and packaging waste processing',
    'Municipal solid waste pre-processing',
  ],

  'vertical-briquetting-machine': [
    'Metal machining and CNC workshops',
    'Foundries and metal casting operations',
    'Non-ferrous metal recycling (copper, brass, aluminium)',
    'Steel and stainless-steel processing plants',
    'Scrap metal recovery and re-melting operations',
  ],

  'fodder-block-making-machine': [
    'Cattle and livestock feed production',
    'Dairy farms and animal husbandry operations',
    'Agricultural waste processing',
    'Fodder trading and storage businesses',
    'Rural agri-processing cooperatives',
  ],

  conveyors: [
    'Scrap metal recycling plants',
    'Material recovery facilities (MRF)',
    'Waste management and sorting operations',
    'Automotive and appliance recycling',
    'Any recycling line combining balers, shredders or shears',
  ],

  'material-recovery-facility': [
    'Municipal solid waste management',
    'Urban local bodies and municipal corporations',
    'Waste-to-energy plants',
    'Recycling industry and scrap trading',
    'Environmental and sanitation service providers',
  ],
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
  const imageSet = getProductImageSet(slug);
  if (productDetails[slug]) {
    return {
      ...listedProduct,
      ...productDetails[slug],
      category: listedProduct?.category || 'Industrial Machinery',
      image: productDetails[slug].image || imageSet[0],
      galleryImages: productDetails[slug].galleryImages || imageSet,
    };
  }

  if (!listedProduct) return { ...fallbackProduct, category: 'Industrial Machinery', image: imageSet[0], galleryImages: imageSet };

  return {
    name: listedProduct.name,
    category: listedProduct.category,
    subcategory: listedProduct.subcategory,
    description: `${listedProduct.name} is engineered for dependable industrial duty, consistent output, and simplified maintenance across recycling, fabrication, and hydraulic production environments.`,
    specs: {
      Pressure: 'Up to 315 bar',
      Power: 'Application matched',
      Stroke: 'Custom engineered',
      Material: 'Heavy-duty fabricated steel',
    },
    image: imageSet[0],
    galleryImages: imageSet,
  };
};

const getCategoryParam = (category) => {
  if (!category?.viewAll) return '';
  const queryCategory = category.viewAll.split('category=')[1];
  if (queryCategory) return queryCategory.replace(/\/$/, '');
  const parts = category.viewAll.split('/').filter(Boolean);
  return parts[1] || '';
};

const slugifySegment = (value) => value.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const getSubcategoryGroups = (products) => (
  [...new Set(products.map((product) => product.subcategory).filter(Boolean))]
);

const groupProductsBySubcategory = (products) => getSubcategoryGroups(products).map((subcategory) => ({
  name: subcategory,
  products: products.filter((product) => product.subcategory === subcategory),
}));

const getSubcategoryPath = (category, subcategory) => `${category.viewAll}${slugifySegment(subcategory)}/`;

const getProductPath = (product) => productSeo[product.slug]?.canonical || `/product-detail?product=${product.slug}`;

const categoryImages = {
  'metal-recycling': '/images/metal-recycling.png',
  'waste-recycling': '/images/Waste%20Recycling.png',
  'agriculture-recycling': '/images/Agriculture%20Waste%20Recycling.png',
  'elv-recycling': '/images/ELV%20Recycling.png',
  services: '/images/services.png',
  balers: '/images/metal-recycling.png',
  'shears-nibblers': '/images/metal-recycling.png',
  'shredders-crackers': '/images/waste%20management.png',
  'briquetting-machines': '/images/homepage.png',
  'material-handling-sorting': '/images/metal-recycling.png',
  'agriculture-waste-recycling': '/images/Agriculture%20Waste%20Recycling.png',
};

const getCategoryImage = (category) => categoryImages[getCategoryParam(category)] || '/images/homepage.png';

const getCategoryFirstProductImage = (category) => {
  if (!category?.products || category.products.length === 0) return getCategoryImage(category);
  const firstProduct = category.products[0];
  return getProductImage(firstProduct.slug);
};

const categoryCardDescriptions = {
  'metal-recycling': 'Advanced metal recycling solutions engineered for efficient scrap processing, high-volume shredding, and sustainable industrial recovery operations.',
  'waste-recycling': 'Modern waste recycling systems designed for automated sorting, material recovery, and environmentally responsible waste management.',
  'agriculture-recycling': 'Innovative agriculture waste recycling equipment built for biomass processing, organic waste reduction, and sustainable resource utilization.',
  'elv-recycling': 'High-performance ELV recycling machinery for efficient vehicle dismantling, metal recovery, and eco-friendly automotive waste processing.',
  services: 'Comprehensive industrial services including installation, maintenance, automation support, and engineering solutions for recycling systems.',
  balers: 'Hydraulic balers for metal scrap, waste, and ELV compaction, including high density, triple action, and horizontal models.',
  'shears-nibblers': 'Alligator shears and nibblers for precision cutting and dismantling of metal, sheet, and auto scrap materials.',
  'shredders-crackers': 'Heavy-duty shredders and casting crackers for efficient size reduction of scrap, waste, and ferrous material.',
  'briquetting-machines': 'Vertical briquetting machines that convert metal chips and scrap into dense briquettes for easier handling and transport.',
  'material-handling-sorting': 'Conveyors and sorting systems for efficient material movement, separation, and recycling line throughput.',
  'agriculture-waste-recycling': 'Equipment to recycle agricultural residues into fodder blocks and biomass products for farms and agro-processors.',
};

const getCategoryCardDescription = (category) => categoryCardDescriptions[getCategoryParam(category)] || `Browse all products in ${category.name}.`;

const normalizePath = (path) => {
  if (!path || path === '/') return '/';
  return path.endsWith('/') ? path : `${path}/`;
};

const getSelfCanonicalPath = (location) => normalizePath(location.pathname);

const getProductSlugFromLocation = (location) => {
  const params = new URLSearchParams(location.search);
  if (params.get('product')) return params.get('product');
  const parts = location.pathname.split('/').filter(Boolean);
  const slug = parts.length >= 3 ? parts[parts.length - 1] : null;
  return productPathAliases[slug] || slug;
};

const getCategorySlugFromLocation = (location) => {
  const params = new URLSearchParams(location.search);
  if (params.get('category')) return params.get('category');
  const parts = location.pathname.split('/').filter(Boolean);
  if (parts[0] === 'products' && parts[1]) return parts[1];
  return null;
};

const getSubcategorySlugFromLocation = (location) => {
  const parts = location.pathname.split('/').filter(Boolean);
  if (parts[0] === 'products' && parts[2] && parts.length === 3) return parts[2];
  return null;
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Jindal Hydro Projects Inc.',
  alternateName: 'JHP',
  url: siteUrl,
  logo: `${siteUrl}/images/jhp-logo.png`,
  foundingDate: '1976',
  description: 'Manufacturer and exporter of hydraulic balers, scrap metal shredders, alligator shears, waste balers, and recycling machinery. 2,500+ machines installed globally since 1976.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'B, 38A, MIA Road, Matsya Industrial Area, Naharpur',
    addressLocality: 'Alwar',
    addressRegion: 'Rajasthan',
    postalCode: '301030',
    addressCountry: 'IN',
  },
  contactPoint: [{
    '@type': 'ContactPoint',
    telephone: '+91-9868247362',
    contactType: 'sales',
    contactOption: 'TollFree',
    availableLanguage: ['English', 'Hindi'],
    areaServed: 'Worldwide',
  }],
  sameAs: ['https://wa.me/919868247362'],
  numberOfEmployees: {
    '@type': 'QuantitativeValue',
    minValue: 25,
    maxValue: 50,
  },
  areaServed: {
    '@type': 'AdministrativeArea',
    name: 'Worldwide',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Hydraulic Recycling Machinery',
    itemListElement: ['Hydraulic Balers', 'Metal Shredders', 'Alligator Shears', 'Waste Balers', 'ELV Recycling Equipment'].map((name) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Product', name },
    })),
  },
};

const buildBreadcrumbSchema = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: `${siteUrl}${normalizePath(item.path)}`,
  })),
});

const buildFaqSchema = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
});

const getSeoConfig = (page, location) => {
  const productSlug = getProductSlugFromLocation(location);
  const product = productSlug ? getProductDetail(productSlug) : null;
  const productMeta = productSlug ? productSeo[productSlug] : null;
  const categorySlug = getCategorySlugFromLocation(location);
  const categoryMeta = categorySlug ? categorySeo[categorySlug] : null;

  if (page === 'home') {
    return {
      title: 'Hydraulic Baler & Recycling Machinery Manufacturer - Jindal Hydro Projects',
      description: 'Manufacturer & exporter of hydraulic balers, shredders, alligator shears, and scrap recycling machinery since 1976. 2,500+ machines installed globally. Get a free quote.',
      canonical: '/',
      schemas: [organizationSchema],
    };
  }

  if (page === 'product-detail' && product) {
    const productCategory = productCategories.find((category) => category.name === product.category);
    const canonical = location.pathname.startsWith('/products/')
      ? getSelfCanonicalPath(location)
      : productMeta?.canonical || `/products/${getCategoryParam(productCategory)}/${productSlug}/`;
    return {
      title: productMeta?.title || `${product.name} Manufacturer India | JHP`,
      description: productMeta?.description || product.description,
      canonical,
      schemas: [
        organizationSchema,
        buildBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: product.category, path: `/products/${getCategoryParam(productCategories.find((category) => category.name === product.category))}/` },
          { name: product.subcategory || product.category, path: canonical.split('/').slice(0, -2).join('/') || canonical },
          { name: product.name, path: canonical },
        ]),
        {
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: product.name,
          description: productMeta?.description || product.description,
          brand: { '@type': 'Brand', name: 'Jindal Hydro Projects' },
          manufacturer: { '@type': 'Organization', name: 'Jindal Hydro Projects Inc.' },
          url: `${siteUrl}${normalizePath(canonical)}`,
          image: `${siteUrl}/images/homepage.png`,
          offers: { '@type': 'Offer', availability: 'https://schema.org/InStock', areaServed: ['IN', 'AE', 'SA', 'ZA', 'KE', 'NG', 'MY', 'SG'] },
        },
        buildFaqSchema(faqs),
      ],
    };
  }

  if (page === 'products' && categoryMeta) {
    const canonical = getSelfCanonicalPath(location);

    return {
      title: categoryMeta.title,
      description: categoryMeta.description,
      canonical,
      schemas: [
        organizationSchema,
        buildBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: categoryMeta.name, path: canonical },
        ]),
      ],
    };
  }

  const content = pageCopy[page] || pageCopy['not-found'];
  const canonical = getSelfCanonicalPath(location);
  return {
    title: `${content.title} | Jindal Hydro Projects`,
    description: content.text,
    canonical,
    schemas: [organizationSchema],
  };
};

function SeoManager({ page }) {
  const location = useLocation();

  useEffect(() => {
    const seo = getSeoConfig(page, location);
    const canonicalUrl = `${siteUrl}${normalizePath(seo.canonical)}`;
    document.title = seo.title;

    const setMeta = (selector, attrs) => {
      let element = document.head.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        document.head.appendChild(element);
      }
      Object.entries(attrs).forEach(([key, value]) => element.setAttribute(key, value));
    };

    setMeta('meta[name="description"]', { name: 'description', content: seo.description });
    setMeta('meta[property="og:title"]', { property: 'og:title', content: seo.title });
    setMeta('meta[property="og:description"]', { property: 'og:description', content: seo.description });
    setMeta('meta[property="og:url"]', { property: 'og:url', content: canonicalUrl });
    setMeta('meta[property="og:type"]', { property: 'og:type', content: page === 'product-detail' ? 'product' : 'website' });
    setMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);

    document.head.querySelectorAll('script[data-seo-schema="true"]').forEach((script) => script.remove());
    seo.schemas.forEach((schema) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.dataset.seoSchema = 'true';
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    });
  }, [page, location]);

  return null;
}

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
  ['Balers', 'Hydraulic baling presses that compress ferrous and non-ferrous scrap into dense, transport-ready bales.', '/images/3D%20Models%20from%20AI/01_High_Density_Baler_4_Angle_v.2.png'],
  ['Shears & Nibblers', 'Alligator shears and nibblers for fast, precise cutting and scrap size reduction.', '/images/3D%20Models%20from%20AI/14_Nibbler_Hero_Angle_v.1.png'],
  ['Shredders', 'Single- and twin-shaft shredders plus casting crackers for heavy-duty metal reduction.', '/images/3D%20Models%20from%20AI/15_Single_Shaft_Shredder_Hero_Angle_v.2.png'],
  ['Briquetting Machines', 'High-pressure briquetting presses that convert machining waste into compact briquettes.', '/images/3D%20Models%20from%20AI/09_Vertical_Briquetting_Machine_v.1.png'],
  ['Material Handling & Sorting', 'Conveyor systems and MSW sorting lines that move, feed, and sort material efficiently.', '/images/3D%20Models%20from%20AI/19_MSW_Sorting_Line_v1.png'],
  ['Agriculture Waste Recycling', 'Equipment to compress and process agricultural waste into high-density biomass products.', '/images/3D%20Models%20from%20AI/24_Fodder_Block_Machine_Hero_v1.png'],
];

const businessDetails = [
  ['Year of Establishment', '1976'],
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
  ['Designers', 'Machine layouts, tooling, fabrication drawings and ergonomics', '/images/designers.jpg'],
  ['Engineers', 'Hydraulic design, system sizing and performance validation', '/images/engineers.jpg'],
  ['Researchers', 'Process improvement, materials, automation and new applications', '/images/research.jpg'],
  ['Technical Experts', 'Installation, troubleshooting, training and service support', '/images/technical.jpg'],
];

const trustedClients = [
  { name: 'Uflex Limited',logo: "/images/logo/Uflex-Logo.png" },
  { name: 'Hindalco Industries LTD', logo: "/images/logo/Hindalco Industries Ltd.webp"},
  { name: 'HSIL Limited', logo: "/images/logo/HSIL Limited.png"},
  { name: 'Bengal India Global Infrastructure ltd.', logo: "/images/logo/Bengal India Global Infrastructure ltd..png"},
  { name: 'Annapoorna Metal Industries', logo: "/images/logo/Annapoorna Metal Industries.png"},
  { name: 'Asian Colour Coates Ispat Ltd', logo: "/images/logo/Asian Colour Coates Ispat Ltd.png"},
  { name: 'Forech India ltd', logo: "/images/logo/Forech India ltd.png"},
  { name: 'Montage Enterprises Pvt Ltd', logo: "/images/logo/Montage Enterprises Pvt Ltd.png"},
  { name: 'Raashi Industries Pvt. Ltd ', logo: "/images/logo/Raashi Industries Pvt. Ltd.png"},
  { name: 'Vardhman Polymers Pvt. Ltd ', logo: "/images/logo/Vardhman Polymers Pvt. Ltd.png"},
  { name: 'Sudha Ventilating Systems Pvt Ltd', logo: "/images/logo/Sudha Ventilating Systems Pvt Ltd.png"},
  { name: 'IAC International Automotive India Pvt Ltd', logo: "/images/logo/IAC Internationa Automotive India Pvt Ltd.png"},
  { name: 'TAJ Forging Private LTD', logo: "/images/logo/TAJ Forging Private LTD.png"},
  { name: 'Arihant Publication ', logo: "/images/logo/Arihant Publication.png"},
{ name: 'RSPL Limited', logo: "/images/logo/RSPL Limited.png"},
{ name: 'Hindustan Motors', logo: "/images/logo/Hindustan Motors.png"},
{ name: 'Uni Products India Ltd', logo: "/images/logo/Uni Products India Ltd.png"},
{ name: 'Laxmi Machine Tools', logo: "/images/logo/Laxmi Machine Tools.png"},
{ name: 'Sree Rayalaseema HiStrength Hypo Limited', logo: "/images/logo/Sree Rayalaseema HiStrength Hypo Limited.png"},
{ name: 'Metso India Pvt. Ltd', logo: "/images/logo/Metso India Pvt. Ltd.png"},
{ name: 'Janki Corp Limited', logo: "/images/logo/Janki Corp Limited.png"},
{ name: 'Cold Steel Corporation', logo: "/images/logo/Cold Steel Corporation.png"},
{ name: 'Hindustan Media Limited', logo: "/images/logo/Hindustan Media Limited.png"},
{ name: 'Attero Recycling Ltd', logo: "/images/logo/Attero Recycling Ltd.png"},


];

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
    image: '/images/soln1.png',
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
    image: '/images/soln2.png',
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
    image: '/images/soln3.png',
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
    title: 'Engineering Hydraulic Solutions Since 1976',
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
            {productCategories.map((category) => (
              <div className="product-category" key={category.name}>
                <Link className="product-category-toggle" to={category.viewAll}>{category.name}</Link>
                <div className={`product-subpanel product-subpanel--${getCategoryParam(category)}`}>
                  {category.name === 'Metal Recycling' ? (
                    groupProductsBySubcategory(category.products).map((group) => (
                      <div className="product-flyout-group" key={group.name}>
                        <Link className="product-subcategory-heading" to={getSubcategoryPath(category, group.name)}>
                          {group.name}
                        </Link>
                        {group.products.map((product) => (
                          <Link className="product-link product-link--nested" to={getProductPath(product)} key={product.slug}>
                            <strong>{product.name}</strong>
                          </Link>
                        ))}
                      </div>
                    ))
                  ) : (
                    category.products.map((product) => (
                      <Link className="product-link" to={getProductPath(product)} key={product.slug}>
                        <strong>{product.name}</strong>
                      </Link>
                    ))
                  )}
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
      <ul className="nav-links" id="primaryNavigation">
        <li><Link to="/about">About</Link></li>
        <ProductsMegaMenu />
        <li><Link to="/solutions">Solutions</Link></li>
<li><Link to="/blog">Blog</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
      <Link className="nav-cta" to="/contact">Get a Quote</Link>
      <button className="nav-mobile-toggle" id="navToggle" type="button" aria-label="Open menu" aria-controls="primaryNavigation" aria-expanded="false">
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
            <div className="footer-tagline">Delivering Innovative Hydraulic & Recycling Systems Built for Industrial Performance Since 1976</div>
          </div>
          <div className="footer-col">
            <h5>Products</h5>
            <ul>
              <li><Link to="/products/balers">Baler</Link></li>
              <li><Link to="/products/shears-nibblers/">Shears & Nibblers</Link></li>
              <li><Link to="/products/briquetting-machines/">Briquetting Machines</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Solutions</h5>
            <ul>
              <li><Link to="/solutions">Metal Recycling</Link></li>
              <li><Link to="/solutions">Waste Management</Link></li>
              <li><Link to="/solutions">Scrap Processing</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Company</h5>
            <ul>
              <li><Link to="/about">About Jindal Hydro Projects Inc.</Link></li>
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
  const [state, handleSubmit] = useForm('xwleradq');

  return (
    <>
      <Header />
      <main className="contact-page">

        <section className="contact-section">
          <div className="contact-info-panel reveal">
            <div className="section-label">Get a Quote</div>
            <h2>Speak With Jindal Hydro Projects Inc.</h2>
            <p>Send a project brief and our engineering team will review your requirement for hydraulic machinery, recycling systems, power packs, presses or custom equipment.</p>
            <div className="contact-methods">
              <a href="tel:+919868247362">
                <span>Phone</span>
                <strong>+91 7412000949</strong>
              </a>
              <a href="mailto:info@jindalhydroprojects.com">
                <span>Email</span>
                <strong>contact@jindalhydro.com</strong>
              </a>
              <div>
                <span>Response Time</span>
                <strong>Within 24 hours</strong>
              </div>
            </div>
          </div>

          <div className="contact-form-panel reveal reveal-delay-1">
            <form name="contact-inquiry" onSubmit={handleSubmit}>
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
                  <input id="contact_email" name="email" type="email" placeholder="contact@jindalhydro.com" required />
                </div>
                <div className="form-group">
                  <label htmlFor="contact_phone">Phone</label>
                  <input id="contact_phone" name="phone" type="tel" placeholder="+91 7412000949" />
                </div>
                <div className="form-group">
                  <label htmlFor="contact_solution">Describe your Requirement</label>
                  <textarea id="contact_solution" name="requirement" rows="1" placeholder="Tell us about your requirement"></textarea>
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
              <button className="form-submit" type="submit" disabled={state.submitting}>
                {state.submitting ? 'Sending...' : 'Submit Inquiry'}
              </button>

              {state.succeeded && (
                <p className="form-success">
                  Thank you! Your inquiry has been submitted successfully.
                </p>
              )}

              {state.errors && (
                <p className="form-error">
                  Something went wrong. Please try again.
                </p>
              )}
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

function BlogPage() {
  const [query, setQuery] = useState('');
  const [sectionFilter, setSectionFilter] = useState('All');
  const [sortKey, setSortKey] = useState('date');
  const navigate = useNavigate();

  const sections = ['All', ...Array.from(new Set(blogIndex.map((p) => p.section).filter(Boolean)))];

  const filtered = blogIndex
    .filter((p) => (sectionFilter === 'All' ? true : p.section === sectionFilter))
    .filter((p) => p.title.toLowerCase().includes(query.toLowerCase()) || (p.description || '').toLowerCase().includes(query.toLowerCase()));

  const posts = filtered.sort((a, b) => {
    if (sortKey === 'date') return (b.date || '').localeCompare(a.date || '');
    if (sortKey === 'title') return a.title.localeCompare(b.title);
    return 0;
  });

  return (
    <>
      <Header />
      <main className="page-shell blog-page">
        <section className="page-hero">
          <div className="section-label">Blog</div>
          <h1>Insights on Recycling Machinery</h1>
          <p>Articles, buying guides, maintenance tips, and local insight for recyclers and plant operators.</p>
          <div className="blog-controls" style={{display: 'flex', gap: '12px', marginBottom: '18px', alignItems: 'center'}}>
            <input placeholder="Search posts" value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>
        </section>

        <section className="section-inner">

          <div className="blog-listing-grid">
  {posts.map((post) => (
    <article
      className="blog-card"
      key={post.slug}
      onClick={() => navigate(`/blog/${post.slug}`)}
      role="link"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          navigate(`/blog/${post.slug}`);
        }
      }}
    >
      <div className="blog-card-image">
  {post.ogImage ? (
    <img
      src={post.ogImage}
      alt={post.title}
      loading="lazy"
    />
  ) : (
    <div className="blog-card-image-placeholder" />
  )}
</div>

      <h3 className="blog-card-title">
        {post.title}
      </h3>

      {post.description && (
        <p className="blog-card-desc">
          {post.description}
        </p>
      )}

    </article>
  ))}
</div>
        </section>
      </main>
      <Footer />
    </>
  );
}

const BLOG_POST_HEAD_ATTR = 'data-blog-post-head';

function removeBlogPostHeadNodes() {
  document.head.querySelectorAll(`[${BLOG_POST_HEAD_ATTR}="true"]`).forEach((node) => node.remove());
}

function normalizeBlogArticleLinks(article) {
  article.querySelectorAll('a[href]').forEach((link) => {
    const rawHref = link.getAttribute('href');
    if (!rawHref) return;

    let url;
    try {
      url = new URL(rawHref, window.location.origin);
    } catch (e) {
      return;
    }

    if (url.hostname.replace(/^www\./, '') === 'jindalhydro.com' && url.pathname === '/contact') {
      link.setAttribute('href', '/contact');
      link.removeAttribute('target');
      link.removeAttribute('rel');
    }
  });
}

function BlogPostPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = blogIndex.find((p) => p.slug === slug);

  const handleBlogContentClick = (event) => {
    const link = event.target.closest('a[href]');
    if (!link) return;

    const href = link.getAttribute('href');
    if (href !== '/contact') return;

    event.preventDefault();
    navigate('/contact');
  };

  useEffect(() => {
    if (!post) return;
    document.title = `${post.title} | Jindal Hydro Projects`;
  }, [post]);

  if (!post) {
    return (
      <>
        <Header />
        <main className="page-shell">
          <h1>Post not found</h1>
          <p>The requested blog post could not be found.</p>
        </main>
        <Footer />
      </>
    );
  }

  const [html, setHtml] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    removeBlogPostHeadNodes();

    const markBlogPostHeadNode = (node) => {
      node.setAttribute(BLOG_POST_HEAD_ATTR, 'true');
      return node;
    };

    const tryFetch = async () => {
      setLoading(true);
      const tryPaths = [
        // prefer an in-app public copy (public/blog/<slug>.html)
        `/blog/${post.slug}.html`,
        // fallback to the original file path (URL-encoded)
        post.filePath.split(' ').join('%20'),
      ];

      for (const p of tryPaths) {
        try {
          const res = await fetch(p);
          if (!res.ok) continue;
          const text = await res.text();
          if (!mounted) return;
          try {
            const parser = new DOMParser();
            const doc = parser.parseFromString(text, 'text/html');

            // update document head metadata from fetched document
            try {
              const fetchedTitle = doc.querySelector('title')?.textContent;
              if (fetchedTitle) document.title = fetchedTitle;

              // helper to upsert meta by name or property
              const upsertMeta = (attr, key, value) => {
                if (!value) return;
                const selector = `${attr}="${key}"`;
                const existing = document.head.querySelectorAll(`meta[${attr}='${key}']`);
                existing.forEach((n) => n.remove());
                const m = document.createElement('meta');
                m.setAttribute(attr, key);
                m.setAttribute('content', value);
                document.head.appendChild(markBlogPostHeadNode(m));
              };

              // copy common meta tags
              const metaDesc = doc.querySelector('meta[name="description"]')?.getAttribute('content');
              if (metaDesc) upsertMeta('name', 'description', metaDesc);

              const robots = doc.querySelector('meta[name="robots"]')?.getAttribute('content');
              if (robots) upsertMeta('name', 'robots', robots);

              // open graph and twitter
              const ogTags = doc.querySelectorAll('meta[property^="og:"]');
              ogTags.forEach((t) => {
                const prop = t.getAttribute('property');
                const val = t.getAttribute('content');
                if (prop && val) upsertMeta('property', prop, val);
              });

              const twTags = doc.querySelectorAll('meta[name^="twitter:"]');
              twTags.forEach((t) => {
                const name = t.getAttribute('name');
                const val = t.getAttribute('content');
                if (name && val) upsertMeta('name', name, val);
              });

              // canonical link
              const canonical = doc.querySelector('link[rel="canonical"]')?.getAttribute('href');
              if (canonical) {
                const existing = document.head.querySelectorAll('link[rel="canonical"]');
                existing.forEach((n) => n.remove());
                const link = document.createElement('link');
                link.setAttribute('rel', 'canonical');
                link.setAttribute('href', canonical);
                document.head.appendChild(markBlogPostHeadNode(link));
              }

              // JSON-LD: copy application/ld+json scripts (avoid exact duplicates)
              const ldScripts = Array.from(doc.querySelectorAll('script[type="application/ld+json"]'));
              ldScripts.forEach((s) => {
                const text = s.textContent?.trim();
                if (!text) return;
                const exists = Array.from(document.head.querySelectorAll('script[type="application/ld+json"]')).some((ex) => ex.textContent?.trim() === text);
                if (!exists) {
                  const newS = document.createElement('script');
                  newS.setAttribute('type', 'application/ld+json');
                  newS.textContent = text;
                  document.head.appendChild(markBlogPostHeadNode(newS));
                }
              });
            } catch (e) {
              // non-fatal
            }

            // extract the article content
            const article = doc.querySelector('article') || doc.querySelector('main') || doc.body;
            if (article) {
              // remove UI blocks that should not be duplicated in-app
              const breadcrumb = article.querySelector('.breadcrumb, nav[aria-label="breadcrumb"]');
              if (breadcrumb) breadcrumb.remove();
              const metaBlocks = article.querySelectorAll('.blog-meta, .post-meta, .article-meta');
              metaBlocks.forEach((n) => n.remove());
              article.querySelector('.byline span:nth-child(3)')?.remove();
              normalizeBlogArticleLinks(article);

              const contentHtml = article.innerHTML;
              if (mounted) setHtml(contentHtml);
            } else {
              if (mounted) setHtml(text);
            }

            // also attempt to get a description from the fetched document
            const fetchedDesc = doc.querySelector('meta[name="description"]')?.getAttribute('content');
            if (fetchedDesc) {
              if (!post.description) post.description = fetchedDesc;
            }
          } catch (e) {
            if (mounted) setHtml(text);
          }
          break;
        } catch (e) {
          // continue to next
        }
      }

      if (mounted) setLoading(false);
    };

    tryFetch();
    return () => {
      mounted = false;
      removeBlogPostHeadNodes();
    };
  }, [post]);

  return (
    <>
      <Header />
        <main className="page-shell blog-post-page">
          <section className="section-inner" style={{ maxWidth: '1100px', margin: '0 auto' }}>
            {loading && <p>Loading article...</p>}
            {!loading && (
              <>
                {html ? (
                  <div className="blog-post-content" onClick={handleBlogContentClick} dangerouslySetInnerHTML={{ __html: html }} />
                ) : (
                  <div>
                    <p>Unable to load the article from the current development server.</p>
                    <p>To view posts in-app, copy the generated HTML files into public/blog/ as {post.slug}.html.</p>
                    <p><a href={post.path} target="_blank" rel="noopener noreferrer">Open original link</a></p>
                  </div>
                )}
              </>
            )}
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
  useEffect(() => {
    const track = document.getElementById('clientsTrack');
    if (!track) return undefined;

    const getCard = () => track.querySelector('.client-logo-card');
    const getDistance = () => {
      const card = getCard();
      if (!card) return 0;
      const styles = window.getComputedStyle(track);
      const gap = parseFloat(styles.columnGap || styles.gap || 0);
      return card.getBoundingClientRect().width + gap;
    };
    const totalItems = track.children.length;
    const canScroll = () => track && track.scrollWidth > track.clientWidth + 4;

    const scrollTrack = (direction) => {
      if (!track || !totalItems) return;
      const distance = getDistance() || track.clientWidth * 0.9;
      const maxLeft = Math.max(0, track.scrollWidth - track.clientWidth);
      const minLeft = 0;
      const target = track.scrollLeft + direction * distance;
      if (target > maxLeft) {
        track.scrollTo({ left: minLeft, behavior: 'smooth' });
      } else if (target < minLeft) {
        track.scrollTo({ left: maxLeft, behavior: 'smooth' });
      } else {
        track.scrollBy({ left: direction * distance, behavior: 'smooth' });
      }
    };

    const handleArrow = (event) => {
      const button = event.target.closest('.clients-arrow');
      if (!button) return;
      const direction = parseInt(button.getAttribute('data-direction'), 10) || 1;
      scrollTrack(direction);
    };

    const controls = document.querySelector('.clients-carousel-controls');
    controls?.addEventListener('click', handleArrow);

    let interval = null;
    let isPaused = false;
    const pauseCarousel = () => {
      isPaused = true;
    };
    const resumeCarousel = () => {
      isPaused = false;
    };
    if (canScroll()) {
      interval = window.setInterval(() => {
        if (!isPaused) scrollTrack(1);
      }, 3200);
    }
    const onResize = () => {
      if (interval) window.clearInterval(interval);
      interval = window.setInterval(() => {
        if (!isPaused) scrollTrack(1);
      }, 3200);
    };
    track.addEventListener('mouseenter', pauseCarousel);
    track.addEventListener('mouseleave', resumeCarousel);
    track.addEventListener('focusin', pauseCarousel);
    track.addEventListener('focusout', resumeCarousel);
    window.addEventListener('resize', onResize);

    return () => {
      controls?.removeEventListener('click', handleArrow);
      if (interval) window.clearInterval(interval);
      track.removeEventListener('mouseenter', pauseCarousel);
      track.removeEventListener('mouseleave', resumeCarousel);
      track.removeEventListener('focusin', pauseCarousel);
      track.removeEventListener('focusout', resumeCarousel);
      window.removeEventListener('resize', onResize);
    };
  }, []);

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
            <p>Engineering Advanced Hydraulic & Recycling Solutions Since 1976.</p>
            <Link className="btn-primary" to="/products">Explore Products</Link>
          </div>
        </section>

        <section className="about-section about-overview">
  <div className="about-copy reveal">
    <div className="section-label">Overview</div>
    <h2>Built for Advanced Hydraulic Engineering</h2>
    <p>Jindal Hydro Projects Inc. is a manufacturer, exporter and supplier of hydraulic, recycling and industrial machinery built for dependable production environments.</p>
    <p>Since 1976, the company has focused on practical engineering, durable fabrication, responsive support and machinery configured around customer capacity, material and site needs.</p>
  </div>
</section>

        {/* Company details removed as requested */}

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


<section className="about-section about-detail-band">
          <div className="about-section-head reveal">
            <div className="section-label">Trusted By</div>
            <h2>Clients & Industrial Brands</h2>
          </div>
          <div className="client-carousel" aria-label="Trusted clients carousel">
            <div className="clients-carousel-mask">
              <div className="clients-track" id="clientsTrack">
                {trustedClients.map((client) => (
                  <article className="client-logo-card" key={client.name}>
                    <div className="client-logo-mark">
  <img
    src={client.logo}
    alt={`${client.name} logo`}
    className="client-logo"
  />
</div>
                    <div className="client-name">{client.name}</div>
                    <div className="client-industry">{client.industry}</div>
                  </article>
                ))}
              </div>
            </div>
            <div className="clients-carousel-controls" aria-label="Clients carousel controls">
              <button type="button" className="clients-arrow" data-direction="-1" aria-label="Previous clients">←</button>
              <button type="button" className="clients-arrow" data-direction="1" aria-label="Next clients">→</button>
            </div>
          </div>
        </section>

        <section className="about-section about-why-section">
          <div className="about-section-head reveal">
            <div className="section-label">Why Choose Us</div>
            <h2>Strengths That Matter on the Shop Floor</h2>
          </div>
          <div className="about-card-grid about-four-grid">
            {aboutStrengths.map(([icon, title, text], index) => (
              <div className="about-feature-card reveal" key={title}>
                <div className="about-feature-card-header">
                  <span className="about-icon"><StrengthIcon type={icon} /></span>
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
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
  const currentSlug = getProductSlugFromLocation(location) || productCategories[0].products[0].slug;
  const product = getProductDetail(currentSlug);
  const productMeta = productSeo[currentSlug];
  const productKeyFeatures = seoEfficiencyFeatures[product.slug] || keyFeatures[product.slug] || [];
  const productDurability = durabilityFeatures[product.slug] || [];
  const processedMaterials = materialProcessed[product.slug] || [];
  const productIndustries = seoSuitableIndustries[product.slug] || suitableIndustries[product.slug] || [];
  const productFeatureGroups = featureGroups.map((group) => (
  group.title === 'Efficiency / Operation' && productKeyFeatures.length > 0
    ? { ...group, items: productKeyFeatures }
    : group.title === 'Durability' && productDurability.length > 0
    ? { ...group, items: productDurability }
    : group.title === 'Material Processing Capabilities' && processedMaterials.length > 0
    ? { ...group, items: processedMaterials }
    : group.title === 'Suitable Industries' && productIndustries.length > 0
    ? { ...group, items: productIndustries }
    : group
));
  const galleryImages = (product.galleryImages || [product.image]).map((image, index) => {
    const views = product.galleryLabels || ['Main View', 'Front Left View', 'Front Right View', 'Front View', 'Top View'];
return {
      label: views[index] || `View ${index + 1}`,
      image,
    };
  });
      const hasProcessSteps = product.processSteps && product.processSteps.length > 0;
const hasFacilityGallery = product.facilityGallery && product.facilityGallery.length > 0;
const hasMachineryOverview = product.machineryOverview && product.machineryOverview.length > 0;
const hasPerformanceStats = product.performanceStats && product.performanceStats.length > 0;
const hasProcessFlow = product.processFlow && product.processFlow.length > 0;
const hasOutputTypes = product.outputTypes && product.outputTypes.length > 0;
const hasBenefits = product.benefits && product.benefits.length > 0;
const hasUtilities = product.utilitiesSafetyEnvironment && product.utilitiesSafetyEnvironment.length > 0;
  const productVideos = [
    ['Machine Walkthrough', 'https://www.youtube.com/embed/tgbNymZ7vqY'],
    ['Hydraulic System Overview', 'https://www.youtube.com/embed/tgbNymZ7vqY'],
    ['Site Operation Video', 'https://www.youtube.com/embed/tgbNymZ7vqY'],
  ];
  const currentCategory = productCategories.find((category) => category.name === product.category) || null;
  const relatedProducts = (() => {
    const sameCategoryProducts = (currentCategory?.products || [])
      .filter((item) => item.slug !== product.slug)
      .map((item) => ({ ...item, category: currentCategory.name }));
    const otherCategoryProducts = productCategories
      .filter((category) => category.name !== product.category)
      .flatMap((category) => (
        category.products.map((item) => ({ ...item, category: category.name }))
      ))
      .filter((item) => item.slug !== product.slug);
    const related = [...sameCategoryProducts, ...otherCategoryProducts];
    return related.slice(0, 4).map((item) => {
      const detail = getProductDetail(item.slug);
      return {
        ...item,
        name: item.name,
        description: detail.description,
        image: getProductImage(item.slug),
        path: getProductPath(item),
      };
    });
  })();

  return (
    <>
      <Header />
      <main className="product-detail-page product-detail-page--classic">
        <div className="product-browser-layout">
          <section className="product-display">
            <div className={`product-detail-hero${product.slug === 'vertical-baler' ? ' product-detail-hero--vertical-baler' : ''}`}>
              <div className="product-detail-media reveal">
                <img src={product.image || '/images/homepage.png'} alt={`${product.name} - Jindal Hydro Projects`} />
              </div>
              <div className="product-detail-content reveal">
                <div className="section-label">{product.category}</div>
                <h1>{product.name}</h1>
                <p>{product.description}</p>
                <div className="hero-btns">
                  <Link className="btn-primary" to="/contact">Get Quote</Link>
                  <a className="btn-secondary" href="/brochure.pdf">Download Brochure</a>
                </div>
              </div>
            </div>
            {hasProcessSteps && (
  <section className="product-info-section">
    <h2>The Complete Process</h2>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px', marginTop: '16px' }}>
      {product.processSteps.map((step) => (
        <div key={step.number} style={{ borderTop: '3px solid #f5b400', paddingTop: '10px' }}>
          <div style={{ color: '#f5b400', fontWeight: 700, fontSize: '14px', marginBottom: '6px' }}>{step.number}</div>
          <div style={{ fontWeight: 700, marginBottom: '4px' }}>{step.title}</div>
          <div style={{ fontSize: '14px', color: '#555' }}>{step.text}</div>
        </div>
      ))}
    </div>
  </section>
)}

{hasFacilityGallery && (
  <section className="product-info-section">
    <h2>The Facility in Operation</h2>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px', marginTop: '16px' }}>
      {product.facilityGallery.map((item) => (
        <figure key={item.title} style={{ margin: 0 }}>
          <img src={item.image} alt={item.title} style={{ width: '100%', borderRadius: '8px', display: 'block' }} />
          <figcaption style={{ marginTop: '10px' }}>
            <div style={{ fontWeight: 700 }}>{item.title}</div>
            <div style={{ fontSize: '14px', color: '#555', marginTop: '4px' }}>{item.text}</div>
          </figcaption>
        </figure>
      ))}
    </div>
  </section>
)}

{hasMachineryOverview && (
  <section className="product-info-section">
    <h2>MRF Machinery & Specifications</h2>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '20px', marginTop: '16px', marginBottom: '24px' }}>
      {product.machineryOverview.map((item) => (
        <div key={item.title} style={{ textAlign: 'center' }}>
          <img src={item.image} alt={item.title} style={{ width: '100%', maxWidth: '140px', margin: '0 auto', display: 'block' }} />
          <div style={{ fontWeight: 700, marginTop: '10px' }}>{item.title}</div>
          <div style={{ fontSize: '13px', color: '#555' }}>{item.text}</div>
        </div>
      ))}
    </div>
  </section>
)}

            <section className="product-info-section">
              <h2>Features</h2>
              <div className="feature-accordion">
                {productFeatureGroups.map((group) => (
                  <details className="product-accordion-item" data-accordion-group="product-features" key={group.title}>
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
  <h2>
    {product.specTitle || 'Technical Specifications'}
  </h2>

  {/* =========================================
      TEXT-ONLY SPECIFICATION
      ========================================= */}
  {product.specNote && (
    <div className="technical-note">
      <div className="technical-note-label">
        {product.specNote.title}
      </div>

      <p>{product.specNote.text}</p>
    </div>
  )}

  {/* =========================================
      MULTIPLE SPECIFICATION TABLES
      ========================================= */}
  {product.specTables &&
    product.specTables.length > 0 &&
    product.specTables.map((table, tableIndex) => (
      <div className="spec-table-section" key={tableIndex}>

        {/* Table Heading */}
        {table.title && (
          <h3 className="spec-table-title">
            {table.title}
          </h3>
        )}

        {/* Table */}
        {table.specs && table.specs.length > 0 && (
          <div className="product-table-wrap">
            <table className="product-table">
              <thead>
                <tr>
                  {Object.keys(table.specs[0]).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {table.specs.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {Object.values(row).map((value, valueIndex) => (
                      <td key={valueIndex}>{value}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Table Note */}
        {table.note && (
          <p className="technical-table-note">
            {table.note}
          </p>
        )}

      </div>
    ))}
</section>
{(hasProcessFlow || hasPerformanceStats || hasOutputTypes || hasBenefits || hasUtilities) && (
  <section className="product-info-section">
    <h2>MRF Layout & Performance</h2>

    {hasProcessFlow && (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '16px', marginBottom: '28px' }}>
        {product.processFlow.map((step, index) => (
          <div key={step} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{
              padding: '8px 14px',
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: 600,
              background: index === 0 || index === product.processFlow.length - 1 ? '#f5b400' : '#f2f2f2',
              color: index === 0 || index === product.processFlow.length - 1 ? '#1a1a1a' : '#333',
            }}>
              {step}
            </span>
            {index < product.processFlow.length - 1 && <span style={{ color: '#aaa' }}>→</span>}
          </div>
        ))}
      </div>
    )}

    {hasPerformanceStats && (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '16px', marginBottom: '28px' }}>
        {product.performanceStats.map((stat) => (
          <div key={stat.label} style={{ background: '#f7f7f7', borderRadius: '8px', padding: '18px', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 700, color: '#1a1a1a' }}>{stat.value}</div>
            <div style={{ fontSize: '13px', color: '#666', marginTop: '4px' }}>{stat.label}</div>
          </div>
        ))}
      </div>
    )}

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
      {hasOutputTypes && (
        <div>
          <h3 style={{ fontSize: '15px', color: '#f5b400', marginBottom: '12px' }}>Types of Output</h3>
          {product.outputTypes.map((item) => (
            <div key={item.title} style={{ marginBottom: '12px' }}>
              <strong>{item.title}</strong> — <span style={{ color: '#555' }}>{item.text}</span>
            </div>
          ))}
        </div>
      )}

      {hasBenefits && (
        <div>
          <h3 style={{ fontSize: '15px', color: '#f5b400', marginBottom: '12px' }}>Benefits</h3>
          <ul className="feature-list">
            {product.benefits.map((item) => (
              <li key={item}>✓ {item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>

    {hasUtilities && (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginTop: '28px' }}>
        {product.utilitiesSafetyEnvironment.map((block) => (
          <div key={block.title} style={{ background: '#1a1a1a', color: '#fff', borderRadius: '8px', padding: '16px' }}>
            <div style={{ fontWeight: 700, color: '#f5b400', marginBottom: '10px', fontSize: '13px' }}>{block.title}</div>
            <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '13px', lineHeight: 1.7 }}>
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    )}
  </section>
)}

            {product.slug === 'double-action-baler' && (
              <section className="product-info-section">
                <h2>Product Catalogue</h2>
                <div className="premium-gallery product-detail-gallery product-detail-gallery--three-up">
                  {galleryImages.slice(1).map(({ label, image }, index) => (
                    <figure className="reveal" key={`${product.name}-${label}-${index}`}>
                      <img src={image} alt={`${product.name} ${label}`} />
                      <figcaption>{label}</figcaption>
                    </figure>
                  ))}
                </div>
              </section>
            )}
            

            {/*<section className="product-video-section" id="product-video">
              <div className="section-label">Videos</div>
              <h2>Product Video Gallery</h2>
              <div className="premium-video-gallery">
                {productVideos.map(([title, source]) => (
                  <div className="premium-video-card reveal" key={title}>
                    <iframe
                      src={source}
                      title={`${product.name} ${title}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    ></iframe>
                    <h3>{title}</h3>
                  </div>
                ))}
              </div>
            </section>*/}

            <section className="product-info-section">
              <h2>Frequently Asked Questions</h2>
              <div className="faq-accordion">
                {faqs.map((faq) => (
                  <details className="product-accordion-item" data-accordion-group="product-faqs" key={faq.question}>
                    <summary>{faq.question}</summary>
                    <p>{faq.answer}</p>
                  </details>
                ))}
              </div>
            </section>
          </section>
        </div>

        <section className="premium-section">
          <div className="premium-section-head reveal">
            <div className="premium-eyebrow">Related Products</div>
            <h2>Explore More Products</h2>
          </div>
          <div className="related-machine-grid">
            {relatedProducts.map((relatedProduct) => (
              <Link className="related-machine-card reveal" to={relatedProduct.path} key={relatedProduct.slug}>
                <img src={relatedProduct.image} alt={relatedProduct.name} />
                <div>
                  <h3>{relatedProduct.name}</h3>
                  <span>View Product</span>
                </div>
              </Link>
            ))}
          </div>
        </section>


        <section className="premium-product-cta reveal">
          <div>
            <div className="premium-eyebrow">Custom Engineering</div>
            <h2>Need a Custom Recycling Solution?</h2>
            <p>Speak with our engineering team.</p>
          </div>
          <div className="premium-hero-actions">
            <Link className="btn-primary" to="/contact">Get Quote</Link>
            <Link className="premium-outline-btn" to="/contact">Contact Sales</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function ProductsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const categoryCarouselRef = useRef(null);
  const [productSearch, setProductSearch] = useState('');
  const activeCategoryParam = getCategorySlugFromLocation(location);
  const activeSubcategoryParam = getSubcategorySlugFromLocation(location);
  
  // Check if the third URL segment is a product slug (not a subcategory)
  const potentialProductSlug = activeSubcategoryParam ? productPathAliases[activeSubcategoryParam] || activeSubcategoryParam : null;
  const isProductDetailPage = potentialProductSlug && findProductBySlug(potentialProductSlug);
  
  // If it's a product detail page, render ProductDetailPage instead
  if (isProductDetailPage) {
    return <ProductDetailPage />;
  }
  
  const activeCategorySeo = activeCategoryParam ? categorySeo[activeCategoryParam] : null;
  const activeCategory = productCategories.find((category) => getCategoryParam(category) === activeCategoryParam);
  const listedCategories = activeCategory ? [activeCategory] : productCategories;
  const listedProducts = listedCategories.flatMap((category) => (
    category.products.map((item) => ({
      ...item,
      category: category.name,
      detail: getProductDetail(item.slug),
    }))
  )).filter((product) => !activeSubcategoryParam || slugifySegment(product.subcategory || product.category) === activeSubcategoryParam);
  const filteredProducts = listedProducts.filter((product) => (
    product.name.toLowerCase().includes(productSearch.trim().toLowerCase())
    || product.subcategory?.toLowerCase().includes(productSearch.trim().toLowerCase())
  ));
  const activeSubcategoryName = activeSubcategoryParam
    ? (listedProducts[0]?.subcategory || listedProducts[0]?.category || activeSubcategoryParam.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' '))
    : null;
  const activeCategorySubcategories = activeCategory
    ? [...new Set(activeCategory.products.map((product) => product.subcategory || activeCategory.name))]
    : [];
  const showSubcategorySearch = activeCategorySubcategories.length > 0;
  const carouselCategories = [...productCategories, ...productCategories];
  const getCategoryCarouselMetrics = () => {
    const carousel = categoryCarouselRef.current;
    if (!carousel) return null;
    const card = carousel.querySelector('.machinery-category-card');
    const gap = parseFloat(window.getComputedStyle(carousel).columnGap || '0');
    const distance = card ? card.getBoundingClientRect().width + gap : carousel.clientWidth * 0.9;
    return { carousel, distance, loopWidth: distance * productCategories.length };
  };
  const normalizeCategoryCarousel = () => {
    const metrics = getCategoryCarouselMetrics();
    if (!metrics) return;
    const { carousel, loopWidth } = metrics;
    if (carousel.scrollLeft >= loopWidth) {
      carousel.scrollTo({ left: carousel.scrollLeft - loopWidth, behavior: 'auto' });
    } else if (carousel.scrollLeft < 0) {
      carousel.scrollTo({ left: carousel.scrollLeft + loopWidth, behavior: 'auto' });
    }
  };
  const scrollCategoryCarousel = (direction) => {
    const metrics = getCategoryCarouselMetrics();
    if (!metrics) return;
    const { carousel, distance, loopWidth } = metrics;
    if (direction < 0 && carousel.scrollLeft < distance * 0.5) {
      carousel.scrollTo({ left: carousel.scrollLeft + loopWidth, behavior: 'auto' });
    }
    carousel.scrollBy({ left: direction * distance, behavior: 'smooth' });
    window.setTimeout(normalizeCategoryCarousel, 650);
  };

  useEffect(() => {
    if (activeCategory) return undefined;
    const carousel = categoryCarouselRef.current;
    if (!carousel) return undefined;

    const interval = window.setInterval(() => {
      const metrics = getCategoryCarouselMetrics();
      if (!metrics) return;
      metrics.carousel.scrollBy({ left: metrics.distance, behavior: 'smooth' });
      window.setTimeout(normalizeCategoryCarousel, 650);
    }, 4000);

    return () => window.clearInterval(interval);
  }, [activeCategory]);

  useEffect(() => {
    setProductSearch('');
  }, [activeCategoryParam, activeSubcategoryParam]);

  return (
    <>
      <Header />
      <main className="product-detail-page">
        <div className="product-browser-layout">
          <section className="product-display">
            {activeCategory ? (
              <div className="category-product-page">
                <section className="category-product-hero">
                  <div className="category-product-hero-copy">
                    <div className="section-label">{activeCategory ? `${activeCategory.name}` : 'Products'}</div>
                    <h1>{activeSubcategoryName || activeCategorySeo?.h1 || activeCategory?.name}</h1>
                  </div>
                </section>

                <form
                  className={`category-product-search${showSubcategorySearch ? '' : ' category-product-search--compact'}`}
                  onSubmit={(event) => event.preventDefault()}
                  aria-label="Search category products"
                >
                  <input
                    type="search"
                    value={productSearch}
                    onChange={(event) => setProductSearch(event.target.value)}
                    placeholder="What are you looking for?"
                    aria-label="Search products"
                  />
                  <select
                    value={activeCategoryParam}
                    onChange={(event) => navigate(`/products/${event.target.value}/`)}
                    aria-label="Select category"
                  >
                    {productCategories.map((category) => (
                      <option value={getCategoryParam(category)} key={category.name}>{category.name}</option>
                    ))}
                  </select>
<button type="submit">Search</button>
                </form>

                <div className="product-listing-grid">
                  {filteredProducts.map((product) => (
                    <Link className="product-listing-card product-listing-card-link reveal" to={getProductPath(product)} key={product.slug}>
                      <div className="product-listing-image">
                        <img src={product.detail.image || '/images/homepage.png'} alt={`${product.name} - Jindal Hydro Projects`} loading="lazy" />
                      </div>
                      <div className="product-listing-body">
                        <h2>{product.name}</h2>
                      </div>
                      <span className="product-listing-action">Learn More</span>
                    </Link>
                  ))}
                  {!filteredProducts.length && (
                    <div className="product-listing-empty">No products found for this search.</div>
                  )}
                </div>
              </div>
            ) : (
              <div className="machinery-catalog">
                <section className="machinery-hero">
                  <div className="machinery-hero-copy">
                    <div className="section-label">Our Products</div>
                    <h1>Engineered for Heavy-Duty Recycling Performance</h1>
                  </div>
                </section>

                <form
                  className={`category-product-search${showSubcategorySearch ? '' : ' category-product-search--compact'}`}
                  onSubmit={(event) => event.preventDefault()}
                  aria-label="Search category products"
                >
                  <input
                    type="search"
                    value={productSearch}
                    onChange={(event) => setProductSearch(event.target.value)}
                    placeholder="What are you looking for?"
                    aria-label="Search products"
                  />
                  <select
                    value={activeCategoryParam}
                    onChange={(event) => navigate(`/products/${event.target.value}/`)}
                    aria-label="Select category"
                  >
                    {productCategories.map((category) => (
                      <option value={getCategoryParam(category)} key={category.name}>{category.name}</option>
                    ))}
                  </select>
<button type="submit">Search</button>
                </form>

                <div className="machinery-category-carousel">
                  <div className="machinery-category-grid" ref={categoryCarouselRef}>
                    {carouselCategories.map((category, index) => (
                      <Link className="machinery-category-card reveal" to={category.viewAll} key={`${category.name}-${index}`}>
                        <div className="machinery-card-image">
                          <img src={getCategoryFirstProductImage(category)} alt={`${category.name} machinery - Jindal Hydro Projects`} loading="lazy" />
                        </div>
                        <div className="machinery-card-copy">
                          <h2>{category.name}</h2>
                          <p>{getCategoryCardDescription(category)}</p>
                        </div>
                        <strong aria-label={`View ${category.name}`}>→</strong>
                      </Link>
                    ))}
                  </div>
                  <div className="machinery-carousel-controls" aria-label="Product category carousel controls">
                    <button type="button" onClick={() => scrollCategoryCarousel(-1)} aria-label="Previous categories">←</button>
                    <button type="button" onClick={() => scrollCategoryCarousel(1)} aria-label="Next categories">→</button>
                  </div>
                </div>

<div className="machinery-assurance-strip">
                  <div>
                    <span className="assurance-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg></span>
                    <div className="assurance-copy">
                      <strong>Premium Quality</strong>
                      <span>Heavy-duty fabrication and tested hydraulics</span>
                    </div>
                  </div>
                  <div>
                    <span className="assurance-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z"/></svg></span>
                    <div className="assurance-copy">
                      <strong>High Performance</strong>
                      <span>Built for demanding industrial throughput</span>
                    </div>
                  </div>
                  <div>
                    <span className="assurance-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg></span>
                    <div className="assurance-copy">
                      <strong>Custom Solutions</strong>
                      <span>Machine configuration matched to application</span>
                    </div>
                  </div>
                  <div>
                    <span className="assurance-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg></span>
                    <div className="assurance-copy">
                      <strong>Global Support</strong>
                      <span>Installations across India and export markets</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function App({ page }) {
  const location = useLocation();
  const navigate = useNavigate();
  const homeRef = useRef(null);

  useSiteInteractions(`${page}:${location.pathname}:${location.search}`);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [location.pathname, location.search]);

  // Intercept <a> clicks inside static home markup for smooth React Router navigation
  const handleHomeNavigation = (e) => {
    const anchor = e.target.closest('a');
    if (anchor && anchor.href) {
      try {
        const url = new URL(anchor.href);
        if (url.origin === window.location.origin) {
          e.preventDefault();
          navigate(url.pathname + url.search);
        }
      } catch {
        // ignore invalid URLs
      }
    }
  };

  useEffect(() => {
    if (page !== 'home') return undefined;

    const track = document.getElementById('clientsTrack');
    if (!track) return undefined;

    const getCard = () => track.querySelector('.client-logo-card');
    const getDistance = () => {
      const card = getCard();
      if (!card) return 0;
      const styles = window.getComputedStyle(track);
      const gap = parseFloat(styles.columnGap || styles.gap || '0');
      return card.getBoundingClientRect().width + gap;
    };

    const totalItems = track.children.length;
    const canScroll = () => track && track.scrollWidth > track.clientWidth + 4;

    const scrollTrack = (direction) => {
      if (!track || !totalItems) return;
      const distance = getDistance() || track.clientWidth * 0.9;
      const maxLeft = Math.max(0, track.scrollWidth - track.clientWidth);
      const minLeft = 0;
      const target = track.scrollLeft + direction * distance;
      if (target > maxLeft) {
        track.scrollTo({ left: minLeft, behavior: 'smooth' });
      } else if (target < minLeft) {
        track.scrollTo({ left: maxLeft, behavior: 'smooth' });
      } else {
        track.scrollBy({ left: direction * distance, behavior: 'smooth' });
      }
    };

    const handleArrow = (event) => {
      const button = event.target.closest('.clients-arrow');
      if (!button) return;
      const direction = parseInt(button.getAttribute('data-direction'), 10) || 1;
      scrollTrack(direction);
    };

    const controls = document.querySelector('.clients-carousel-controls');
    controls?.addEventListener('click', handleArrow);

    let interval = null;
    let isPaused = false;
    const pauseCarousel = () => {
      isPaused = true;
    };
    const resumeCarousel = () => {
      isPaused = false;
    };

    if (canScroll()) {
      interval = window.setInterval(() => {
        if (!isPaused) scrollTrack(1);
      }, 3200);
    }

    const onResize = () => {
      if (interval) window.clearInterval(interval);
      interval = window.setInterval(() => {
        if (!isPaused) scrollTrack(1);
      }, 3200);
    };

    track.addEventListener('mouseenter', pauseCarousel);
    track.addEventListener('mouseleave', resumeCarousel);
    track.addEventListener('focusin', pauseCarousel);
    track.addEventListener('focusout', resumeCarousel);
    window.addEventListener('resize', onResize);

    return () => {
      controls?.removeEventListener('click', handleArrow);
      if (interval) window.clearInterval(interval);
      track.removeEventListener('mouseenter', pauseCarousel);
      track.removeEventListener('mouseleave', resumeCarousel);
      track.removeEventListener('focusin', pauseCarousel);
      track.removeEventListener('focusout', resumeCarousel);
      window.removeEventListener('resize', onResize);
    };
  }, [page]);

  if (page === 'home') {
    const homeBodyMarkup = homeMarkup.replace(/^\s*<!-- NAV -->[\s\S]*?<\/nav>\s*/, '');

    return (
      <>
        <SeoManager page={page} />
        <Header />
        <div ref={homeRef} onClick={handleHomeNavigation} dangerouslySetInnerHTML={{ __html: homeBodyMarkup }} />
        <Footer />
      </>
    );
  }

  if (page === 'product-detail') {
    return <><SeoManager page={page} /><ProductDetailPage /></>;
  }

  if (page === 'products') {
    return <><SeoManager page={page} /><ProductsPage /></>;
  }

  if (page === 'solutions') {
    return <><SeoManager page={page} /><SolutionsPage /></>;
  }

  if (page === 'contact') {
    return <><SeoManager page={page} /><ContactPage /></>;
  }

  if (page === 'about') {
    return <><SeoManager page={page} /><AboutPage /></>;
  }

  if (page === 'blog') {
    return <><SeoManager page={page} /><BlogPage /></>;
  }

  if (page === 'blog-post') {
    return <><SeoManager page={page} /><BlogPostPage /></>;
  }

  return <><SeoManager page={page} /><PlaceholderPage page={page} /></>;
}
