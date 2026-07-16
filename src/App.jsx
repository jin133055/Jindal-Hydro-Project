import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { homeMarkup } from './homeMarkup.js';
import { useSiteInteractions } from './useSiteInteractions.js';

const productCategories = [
  {
    name: 'Balers',
    number: '01',
    viewAll: '/products/balers/',
    products: [
      { slug: 'high-density-baler', name: 'High Density Baler', subcategory: 'Balers', note: 'Balers' },
      { slug: 'triple-action-baler', name: 'Triple Action Baler', subcategory: 'Balers', note: 'Balers' },
      { slug: 'mini-triple-action-baler', name: 'Mini Triple Action Baler', subcategory: 'Balers', note: 'Balers' },
      { slug: 'double-action-baler', name: 'Double Action Baler', subcategory: 'Balers', note: 'Balers' },
      { slug: 'vertical-baler', name: 'Vertical Baler', subcategory: 'Balers', note: 'Balers' },
      { slug: 'super-jumbo-baler', name: 'Super Jumbo Baler', subcategory: 'Balers', note: 'Balers' },
      { slug: 'car-baler', name: 'Car Baler (ELV Compactor)', subcategory: 'Balers', note: 'Balers' },
      { slug: 'automatic-baler', name: 'Automatic Horizontal Baler', subcategory: 'Balers', note: 'Balers' },
      { slug: 'semi-automatic-baler', name: 'Semi-Automatic Horizontal Baler', subcategory: 'Balers', note: 'Balers' },
    ],
  },
  {
    name: 'Shears & Nibblers',
    number: '02',
    viewAll: '/products/shears-nibblers/',
    products: [
      { slug: 'alligator-shear-crocodile-shear', name: 'Alligator Shear', subcategory: 'Shears & Nibblers', note: 'Shears & Nibblers' },
      { slug: 'hydraulic-nibbler', name: 'Nibblers (Hydraulic & Mechanical)', subcategory: 'Shears & Nibblers', note: 'Shears & Nibblers' },
    ],
  },
  {
    name: 'Shredders & Crackers',
    number: '03',
    viewAll: '/products/shredders-crackers/',
    products: [
      { slug: 'single-shaft-shredder', name: 'Single Shaft Shredder', subcategory: 'Shredders & Crackers', note: 'Shredders & Crackers' },
      { slug: 'twin-shaft-shredder-rotary-shear-pre-shredder', name: 'Twin Shaft Shredder', subcategory: 'Shredders & Crackers', note: 'Shredders & Crackers' },
      { slug: 'casting-cracker', name: 'Casting Cracker', subcategory: 'Shredders & Crackers', note: 'Shredders & Crackers' },
    ],
  },
  {
    name: 'Briquetting Machines',
    number: '04',
    viewAll: '/products/briquetting-machines/',
    products: [
      { slug: 'vertical-briquetting-machine', name: 'Vertical Briquetting Machine', subcategory: 'Briquetting Machines', note: 'Briquetting Machines' },
    ],
  },
  {
    name: 'Material Handling & Sorting',
    number: '05',
    viewAll: '/products/material-handling-sorting/',
    products: [
      { slug: 'conveyors', name: 'Conveyors', subcategory: 'Material Handling & Sorting', note: 'Material Handling & Sorting' },
      { slug: 'msw-sorting-line', name: 'MSW Sorting Line', subcategory: 'Material Handling & Sorting', note: 'Material Handling & Sorting' },
    ],
  },
  {
    name: 'Agriculture Waste Recycling',
    number: '06',
    viewAll: '/products/agriculture-waste-recycling/',
    products: [
      { slug: 'fodder-block-making-machine', name: 'Fodder Block Making Machine', subcategory: 'Agriculture Waste Recycling', note: 'Agriculture Waste Recycling' },
    ],
  },
];

const siteUrl = 'https://www.jindalhydroprojects.com';

const productImageMap = {
  'high-density-baler': [
    '/images/3D%20Models%20from%20AI/01_High_Density_Baler_Hero_Angle_v.1.png',
    '/images/3D%20Models%20from%20AI/01_High_Density_Baler_4_Angle_v.2.png',
    '/images/3D%20Models%20from%20AI/01_High_Density_Baler_4_Angle_v.3.png',
    '/images/3D%20Models%20from%20AI/01_High_Density_Baler_4_Angle_v.4.png',
    '/images/3D%20Models%20from%20AI/01_High_Density_Baler_4_Angle_v.5.png',
  ],
  'triple-action-baler': [
    '/images/3D%20Models%20from%20AI/03_Triple_Action_Baler_Hero_Angle_v.1.png',
    '/images/3D%20Models%20from%20AI/03_Triple_Action_Baler_4_Angle_v.5.png',
    '/images/3D%20Models%20from%20AI/03_Triple_Action_Baler_4_Angle_v.4.png',
    '/images/3D%20Models%20from%20AI/03_Triple_Action_Baler_4_Angle_v.3.png',
    '/images/3D%20Models%20from%20AI/03_Triple_Action_Baler_4_Angle_v.2.png',
  ],
  'mini-triple-action-baler': [
    '/images/3D%20Models%20from%20AI/04_Mini_Triple_Action_Baler_Hero_Angle_v.1.png',
    '/images/3D%20Models%20from%20AI/04_Continous_Baler_Hero_Angle_v.1.png',
  ],
  'double-action-baler': [
    '/images/3D%20Models%20from%20AI/05_Double_Action_Baler_Hero_Angle_v.1.png',
    '/images/3D%20Models%20from%20AI/05a_Double_Action_Auto_Door_v1.png',
    '/images/3D%20Models%20from%20AI/05b_Double_Action_Manual_Door_v1.png',
    '/images/3D%20Models%20from%20AI/05c_Double_Action_Top_Ejection_v1.png',
  ],
  'vertical-baler': ['/images/3D%20Models%20from%20AI/06_Vertical_Baler_Hero_Angle_v.2.png'],
  'super-jumbo-baler': ['/images/3D%20Models%20from%20AI/20_Super_Jumbo_Baler_Hero_v1.png'],
  'car-baler': ['/images/3D%20Models%20from%20AI/08_Car_Baler_Hero_Angle_v.1.png'],
  'automatic-baler': ['/images/3D%20Models%20from%20AI/17_Automatic_Baler_Hero_Angle_v1.png'],
  'semi-automatic-baler': ['/images/3D%20Models%20from%20AI/18_Semi_Automatic_Baler_Hero_Angle_v1.png'],
  'alligator-shear-crocodile-shear': [
    '/images/3D%20Models%20from%20AI/13_Alligator_Shear_Hero_Angle_v.1.png',
    '/images/3D%20Models%20from%20AI/13_Alligator_Shear_Hero_Angle_v.2.png',
  ],
  'hydraulic-nibbler': [
    '/images/3D%20Models%20from%20AI/14_Nibbler_Hero_Angle_v.1.png',
    '/images/3D%20Models%20from%20AI/14_Nibbler_Hero_Angle_v.2.png',
  ],
  'single-shaft-shredder': ['/images/3D%20Models%20from%20AI/15_Single_Shaft_Shredder_Hero_Angle_v.2.png'],
  'twin-shaft-shredder-rotary-shear-pre-shredder': ['/images/3D%20Models%20from%20AI/21_Twin_Shaft_Shredder_Hero_v1.png'],
  'casting-cracker': ['/images/3D%20Models%20from%20AI/22_Casting_Cracker_Hero_v1.png'],
  'vertical-briquetting-machine': [
    '/images/3D%20Models%20from%20AI/09_Vertical_Briquetting_Machine_v3.png',
    '/images/3D%20Models%20from%20AI/09_Vertical_Briquetting_Machine_v2.png',
  ],
  conveyors: ['/images/3D%20Models%20from%20AI/23_Conveyor_Hero_v1.png'],
  'msw-sorting-line': ['/images/3D%20Models%20from%20AI/19_MSW_Sorting_Line_v1.png'],
  'fodder-block-making-machine': ['/images/3D%20Models%20from%20AI/24_Fodder_Block_Machine_Hero_v1.png'],
};

const getProductImageSet = (slug) => productImageMap[slug] || ['/images/homepage.png'];
const getProductImage = (slug) => getProductImageSet(slug)[0];

const categorySeo = {
  balers: {
    name: 'Balers',
    title: 'Hydraulic Balers for Scrap, Waste & ELV Compaction | JHP',
    description: 'High-density, triple-action, vertical, and automatic balers for recyclers, scrap yards, and ELV processing operations.',
    h1: 'Hydraulic Balers for Scrap, Waste & ELV Compaction',
    canonical: '/products/balers/',
    intro: 'JHP offers a full lineup of balers engineered for metal recycling, industrial waste handling, ELV compaction, and high-density material processing.',
    sections: [
      ['Applications', 'Scrap yards, ELV facilities, packaging recyclers, and industrial waste handlers.'],
      ['Key Baler Types', 'High-density balers, triple-action balers, vertical balers, jumbo balers, and horizontal balers.'],
      ['Output Benefits', 'Improve bale density, lower transport cost, and simplify scrap handling.'],
    ],
  },
  'shears-nibblers': {
    name: 'Shears & Nibblers',
    title: 'Shears & Nibblers for Precision Cutting & Scrap Preparation | JHP',
    description: 'Alligator shears and hydraulic nibblers for cutting bar, plate, sheet, and scrap with accuracy and reliability.',
    h1: 'Shears & Nibblers for Precision Cutting & Scrap Preparation',
    canonical: '/products/shears-nibblers/',
    intro: 'JHP supplies shears and nibblers built for metal cutting, dismantling, and scrap preparation across recycling and fabrication applications.',
    sections: [
      ['Equipment', 'Alligator shears and hydraulic nibblers for heavy metal and sheet metal cutting.'],
      ['Use Cases', 'Scrap yards, fabrication shops, ELV dismantling, and steel service centers.'],
    ],
  },
  'shredders-crackers': {
    name: 'Shredders & Crackers',
    title: 'Shredders & Crackers for Heavy Scrap Reduction | JHP',
    description: 'Single-shaft shredders, twin-shaft shredders, and casting crackers for high-volume size reduction and metal recovery.',
    h1: 'Shredders & Crackers for Heavy Scrap Reduction',
    canonical: '/products/shredders-crackers/',
    intro: 'Choose from single-shaft shredders, twin-shaft pre-shredders, and casting crackers for robust metal recycling and waste processing lines.',
    sections: [
      ['Shredding Equipment', 'Single-shaft and twin-shaft shredders for metal, plastic and mixed waste streams.'],
      ['Cracking Solutions', 'Casting crackers for crushing cast iron and engine scrap.'],
    ],
  },
  'briquetting-machines': {
    name: 'Briquetting Machines',
    title: 'Vertical Briquetting Machines for Metal Chips & Waste | JHP',
    description: 'Vertical briquetting machines that compact metal chips and recyclable waste into dense briquettes for easier handling.',
    h1: 'Vertical Briquetting Machines',
    canonical: '/products/briquetting-machines/',
    intro: 'JHP supplies vertical briquetting machines that convert loose chips and waste into transport-friendly briquettes.',
    sections: [
      ['Applications', 'Machine shops, metal recycling facilities, and industrial chip management.'],
      ['Benefits', 'Reduce storage volume, improve handling, and recover material value.'],
    ],
  },
  'material-handling-sorting': {
    name: 'Material Handling & Sorting',
    title: 'Material Handling & Sorting Equipment - Conveyors & MSW Lines | JHP',
    description: 'Conveyors and MSW sorting lines for efficient material movement, separation, and recycling line throughput.',
    h1: 'Material Handling & Sorting Equipment',
    canonical: '/products/material-handling-sorting/',
    intro: 'JHP provides conveyors and sorting lines built to move scrap, recyclables and waste streams efficiently through processing systems.',
    sections: [
      ['Solutions', 'Conveyors for scrap lines plus MSW sorting systems for waste recovery.'],
      ['Efficiency', 'Improved throughput, reduced manual handling, and better material separation.'],
    ],
  },
  'agriculture-waste-recycling': {
    name: 'Agriculture Waste Recycling',
    title: 'Agriculture Waste Recycling Machinery - Fodder Blocks & Biomass | JHP',
    description: 'Fodder block making machines and recycling systems for agricultural residues, biomass, and farm waste processing.',
    h1: 'Agriculture Waste Recycling Machinery',
    canonical: '/products/agriculture-waste-recycling/',
    intro: 'JHP offers agriculture waste recycling equipment to convert crop residues and biomass into usable fodder blocks and compact feedstock.',
    sections: [
      ['Applications', 'Farms, co-operatives, biomass plants, and agricultural waste management facilities.'],
      ['Materials', 'Straw, dry grass, husk, and other agricultural residues.'],
    ],
  },
  'metal-recycling': {
    name: 'Metal Recycling',
    title: 'Metal Recycling Machinery - Balers, Shears & Shredders | JHP',
    description: 'Hydraulic balers, shears, and shredders for ferrous and non-ferrous scrap processing and metal recovery.',
    h1: 'Metal Recycling Machinery - Balers, Shears & Shredders',
    canonical: '/products/balers/',
    intro: 'Jindal Hydro Projects offers hydraulic equipment for scrap processing, from compact balers to industrial shredding systems.',
  },
  'waste-recycling': {
    name: 'Waste Recycling',
    title: 'Waste Recycling Equipment - Balers, Sorting & Compaction | JHP',
    description: 'Waste handling solutions including balers, conveyors, and sorting systems for packaging waste and MSW.',
    h1: 'Waste Recycling Equipment - Balers, Sorting & Compaction',
    canonical: '/products/material-handling-sorting/',
    intro: 'JHP supplies equipment to reduce, sort, and move packaging waste and municipal solid waste through efficient recycling lines.',
  },
  'agriculture-recycling': {
    name: 'Agriculture Waste Recycling',
    title: 'Agricultural Waste Recycling Machinery - Fodder Blocks | JHP',
    description: 'Fodder block making machines and biomass processing equipment for agricultural waste recycling.',
    h1: 'Agricultural Waste Recycling Machinery',
    canonical: '/products/agriculture-waste-recycling/',
    intro: 'JHP manufactures equipment to compress agricultural waste into compact, high-value blocks for fodder and biomass use.',
  },
  'elv-recycling': {
    name: 'ELV Recycling',
    title: 'ELV Recycling Plant Equipment & RVSF Setup | Jindal Hydro Projects',
    description: 'Complete ELV recycling machinery for Registered Vehicle Scrapping Facilities, including balers, shears, shredders and plant support.',
    h1: 'ELV Recycling Plant Equipment - Complete RVSF Machinery Solutions',
    canonical: '/products/balers/',
    intro: 'JHP supplies ELV processing machinery and support for vehicle dismantling, metal recovery, and turnkey plant setup.',
  },
  services: {
    name: 'Services',
    title: 'Installation, Spares & Recycling Plant Consultancy | JHP',
    description: 'Installation, operator training, spares, parts, and consultancy support for recycling machinery and plant setup.',
    h1: 'Services - Installation, Spares, Parts and Consultancy',
    canonical: '/products/services/',
    intro: 'Jindal Hydro Projects supports customers with installation, training, spares, parts, and consultancy for recycling machinery and plant setup requirements.',
  },
};

const productSeo = {
  'high-density-baler': {
    canonical: '/products/balers/high-density-baler/',
    title: 'High Density Baler Manufacturer India | JHP',
    description: 'High-density hydraulic baler for compacting metal scrap, industrial waste, and ELV material into dense, transport-ready bales.',
    h1: 'High Density Baler - Industrial Scrap Compaction',
  },
  'triple-action-baler': {
    canonical: '/products/balers/triple-action-baler/',
    title: 'Triple Action Baler Manufacturer India | JHP',
    description: 'Triple-action baler with three-direction compression for dense bales in scrap yards, recycling plants, and metal processing facilities.',
    h1: 'Triple Action Baler - Three-Direction Compression',
  },
  'mini-triple-action-baler': {
    canonical: '/products/balers/mini-triple-action-baler/',
    title: 'Mini Triple Action Baler India | JHP',
    description: 'Compact mini triple-action baler for small recycling yards, workshops, and lower-throughput scrap handling operations.',
    h1: 'Mini Triple Action Baler - Compact Industrial Baling',
  },
  'double-action-baler': {
    canonical: '/products/balers/double-action-baler/',
    title: 'Double Action Baler | JHP',
    description: 'Double-action baler available in auto door, manual door, and top ejection configurations for dependable scrap compaction.',
    h1: 'Double Action Baler',
  },
  'vertical-baler': {
    canonical: '/products/balers/vertical-baler/',
    title: 'Vertical Baler Manufacturer India | JHP',
    description: 'Vertical baler for metal scrap, cardboard, and recycling applications with a compact footprint and dependable hydraulic operation.',
    h1: 'Vertical Baler - Compact Recycling Compaction',
  },
  'super-jumbo-baler': {
    canonical: '/products/balers/super-jumbo-baler/',
    title: 'Super Jumbo Baler India | JHP',
    description: 'Super jumbo baler for large-volume metal scrap processing and demanding industrial recycling operations.',
    h1: 'Super Jumbo Baler - Heavy-Duty Industrial Output',
  },
  'car-baler': {
    canonical: '/products/balers/car-baler/',
    title: 'Car Baler & ELV Compactor India | JHP',
    description: 'Car baler and ELV compactor for vehicle scrapping facilities, automotive recycling plants, and metal recovery operations.',
    h1: 'Car Baler - ELV Compactor for Vehicle Scrapping',
  },
  'automatic-baler': {
    canonical: '/products/balers/automatic-baler/',
    title: 'Automatic Horizontal Baler | JHP',
    description: 'Automatic horizontal baler for paper, plastic, cardboard, and packaging waste with high throughput and continuous operation.',
    h1: 'Automatic Horizontal Baler - Continuous Waste Compaction',
  },
  'semi-automatic-baler': {
    canonical: '/products/balers/semi-automatic-baler/',
    title: 'Semi-Automatic Horizontal Baler | JHP',
    description: 'Semi-automatic horizontal baler for recyclers looking for dependable mid-capacity compaction and operational flexibility.',
    h1: 'Semi-Automatic Horizontal Baler',
  },
  'alligator-shear-crocodile-shear': {
    canonical: '/products/shears-nibblers/alligator-shear-crocodile-shear/',
    title: 'Alligator Shear Machine Manufacturer India | JHP',
    description: 'Hydraulic alligator shear for cutting bar, rod, tube, cable, and heavy scrap with precision and speed.',
    h1: 'Alligator Shear - Heavy-Duty Metal Cutting',
  },
  'hydraulic-nibbler': {
    canonical: '/products/shears-nibblers/hydraulic-nibbler/',
    title: 'Hydraulic Nibbler Machine India | JHP',
    description: 'Hydraulic nibbler for precision sheet cutting, edge trimming, and controlled metal reduction in recycling and fabrication plants.',
    h1: 'Hydraulic Nibbler - Precision Metal Sheet Cutting',
  },
  'single-shaft-shredder': {
    canonical: '/products/shredders-crackers/single-shaft-shredder/',
    title: 'Single Shaft Shredder Manufacturer India | JHP',
    description: 'Single-shaft shredder for controlled size reduction of plastics, waste, and mixed industrial material streams.',
    h1: 'Single Shaft Shredder - Controlled Size Reduction',
  },
  'twin-shaft-shredder-rotary-shear-pre-shredder': {
    canonical: '/products/shredders-crackers/twin-shaft-shredder-rotary-shear-pre-shredder/',
    title: 'Twin Shaft Shredder Manufacturer India | JHP',
    description: 'Twin-shaft shredder for pre-shredding bulky scrap and mixed recycling feedstock with jam-resistant operation.',
    h1: 'Twin Shaft Shredder - High-Capacity Pre-Shredding',
  },
  'casting-cracker': {
    canonical: '/products/shredders-crackers/casting-cracker/',
    title: 'Casting Cracker & Engine Crusher India | JHP',
    description: 'Casting cracker designed for crushing cast iron, engine scrap, and heavy ferrous recycling material.',
    h1: 'Casting Cracker - Heavy Ferrous Scrap Reduction',
  },
  'vertical-briquetting-machine': {
    canonical: '/products/briquetting-machines/vertical-briquetting-machine/',
    title: 'Vertical Briquetting Machine India | JHP',
    description: 'Vertical briquetting machine for turning metal chips and turnings into compact, valuable briquettes.',
    h1: 'Vertical Briquetting Machine',
  },
  conveyors: {
    canonical: '/products/material-handling-sorting/conveyors/',
    title: 'Conveyors for Recycling Lines | JHP',
    description: 'Custom-built conveyor systems for moving scrap, waste, and recyclables efficiently through processing lines.',
    h1: 'Conveyor Systems for Recycling Lines',
  },
  'msw-sorting-line': {
    canonical: '/products/material-handling-sorting/msw-sorting-line/',
    title: 'MSW Sorting Line Manufacturer India | JHP',
    description: 'MSW sorting line for municipal waste processing, recycling recovery, and improved line throughput.',
    h1: 'MSW Sorting Line - Municipal Waste Processing',
  },
  'fodder-block-making-machine': {
    canonical: '/products/agriculture-waste-recycling/fodder-block-making-machine/',
    title: 'Fodder Block Making Machine | JHP',
    description: 'Fodder block making machine for agricultural waste recycling, biomass processing, and compact fodder production.',
    h1: 'Fodder Block Making Machine',
  },
};

const productPathAliases = {
  'high-density-hydraulic-baler': 'high-density-baler',
  'alligator-shear': 'alligator-shear-crocodile-shear',
  'automatic-horizontal-baler': 'automatic-baler',
  'elv-plant-setup-consultancy': 'consultancy',
  'box-shear-inclined-shear': 'box-shear-inclined-shear',
  'twin-shaft-shredder': 'twin-shaft-shredder-rotary-shear-pre-shredder',
  'scrap-handling-conveyors': 'conveyors',
  'hydraulic-grab-crane': 'grabs-cranes',
  'car-baler-elv-compactor': 'car-baler',
  'semi-automatic-horizontal-baler': 'semi-automatic-baler',
  'double-action-baler-auto-door': 'double-action-baler',
  'double-action-baler-manual-door': 'double-action-baler',
  'double-action-baler-top-ejection': 'double-action-baler',
  'triple-action-baler-waste': 'triple-action-baler-for-waste',
  'vertical-baler-waste': 'waste-recycling-vertical-baler',
};

const productDetails = {
  'high-density-baler': {
    name: 'High Density Baler',
    description: 'High-density baler engineered for maximum compaction and throughput in demanding recycling operations. Features reliable hydraulic systems for consistent bale formation across various material types.',
    specs: [
      {
        'Bale Size (in)': '18×18',
        'Chamber (in)': '76×40×30',
        'Bale Wt MS (kg)': '120-140',
        'Cycle (sec)': '50-55',
        'Motor (HP)': '60/80',
      },
      {
        'Bale Size (in)': '20×20 / 22×22',
        'Chamber (in)': '84×44×36',
        'Bale Wt MS (kg)': '250-350',
        'Cycle (sec)': '80-85',
        'Motor (HP)': '80/100',
      },
      {
        'Bale Size (in)': '24×24',
        'Chamber (in)': '84×60×40',
        'Bale Wt MS (kg)': '450-600',
        'Cycle (sec)': '80-120',
        'Motor (HP)': '80/100/120',
      },
      {
        'Bale Size (in)': '28×28 / 35×35',
        'Chamber (in)': '105×60×50',
        'Bale Wt MS (kg)': '700-800',
        'Cycle (sec)': '90-100',
        'Motor (HP)': '80/100/120',
      },
      {
        'Bale Size (in)': '40×40',
        'Chamber (in)': '110×60×55',
        'Bale Wt MS (kg)': '800-1000',
        'Cycle (sec)': '90-100',
        'Motor (HP)': '80/100/120',
      },
    ],
  },
  'triple-action-baler': {
    name: 'Triple Action Baler',
    description: 'Triple-action baler with three-direction compression for dense, uniform scrap bales in recycling yards, metal processing facilities, and industrial compaction applications.',
    galleryLabels: ['Main View', 'Front Right View', 'Rear Left View', 'Rear Right View', 'Front Left View'],
    specs: [
      {
        Model: 'Mini',
        'Bale (in)': '6x6',
        'Chamber (in)': '18x18x45',
        'Wt MS (kg)': '10-16',
        'Wt AL (kg)': '4-6',
        'Motor (HP)': '20',
      },
      {
        Model: 'Mini',
        'Bale (in)': '8x8',
        'Chamber (in)': '20x20x45',
        'Wt MS (kg)': '18-28',
        'Wt AL (kg)': '6-9',
        'Motor (HP)': '20',
      },
      {
        Model: 'Mini',
        'Bale (in)': '9x9',
        'Chamber (in)': '20x20x45',
        'Wt MS (kg)': '25-40',
        'Wt AL (kg)': '8-13',
        'Motor (HP)': '20',
      },
      {
        Model: 'Mini',
        'Bale (in)': '10x10',
        'Chamber (in)': '20x20x50',
        'Wt MS (kg)': '30-45',
        'Wt AL (kg)': '10-15',
        'Motor (HP)': '25',
      },
    ],
  },
  'mini-triple-action-baler': {
    name: 'Mini Triple Action Baler',
    description:
      'Compact heavy-duty triple-action baler designed for scrap yards requiring dense, high-quality bales while minimizing floor space. Ideal for copper, aluminium and MS scrap.',
    specs: [
      {
        Model: 'Mini 6×6',
        'Bale (in)': '6×6',
        'Chamber (in)': '18×18×45',
        'Wt MS (kg)': '10-16',
        'Wt AL (kg)': '4-6',
        'Motor (HP)': '20',
      },
      {
        Model: 'Mini 8×8',
        'Bale (in)': '8×8',
        'Chamber (in)': '20×20×45',
        'Wt MS (kg)': '18-28',
        'Wt AL (kg)': '6-9',
        'Motor (HP)': '20',
      },
      {
        Model: 'Mini 9×9',
        'Bale (in)': '9×9',
        'Chamber (in)': '20×20×45',
        'Wt MS (kg)': '25-40',
        'Wt AL (kg)': '8-13',
        'Motor (HP)': '20',
      },
      {
        Model: 'Mini 10×10',
        'Bale (in)': '10×10',
        'Chamber (in)': '20×20×50',
        'Wt MS (kg)': '30-45',
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
        'Chamber (in)': '20x16x45',
        'Bale (in)': '12-16xV',
        'Wt MS (kg)': '20-50',
        'Cycle (sec)': '75-85',
        'Motor (HP)': '15',
        Operation: 'Manual / Front / Top',
      },
      {
        'Chamber (in)': '20x24x45',
        'Bale (in)': '12x24xV',
        'Wt MS (kg)': '40-60',
        'Cycle (sec)': '50-60',
        'Motor (HP)': '20',
        Operation: 'Manual / Front / Top',
      },
      {
        'Chamber (in)': '24x18x50',
        'Bale (in)': '16x18xV',
        'Wt MS (kg)': '50-60',
        'Cycle (sec)': '50-60',
        'Motor (HP)': '20',
        Operation: 'Manual / Front / Top',
      },
    ],
  },
  'vertical-baler': {
  name: 'Vertical Baler',
  description:
    'Space-saving vertical hydraulic baler designed for compacting light metal scrap and dry recyclable waste into high-density blocks. Ideal for facilities with limited floor space while delivering reliable, low-noise operation.',
  specs: [
    {
      'Chamber (in)': '72×45×42',
      'Bale (in)': '42×42×42',
      'Bale Wt (kg)': '20-30',
      'Motor (HP)': '25',
      'Cycle (sec)': '70-80',
      Operation: 'Electrical PLC',
    },
    {
      'Chamber (in)': '60×33×27',
      'Bale (in)': '33×27×27',
      'Bale Wt (kg)': '30-40',
      'Motor (HP)': '10',
      'Cycle (sec)': '70-80',
      Operation: 'Hydraulic Hand Lever',
    },
    {
      'Chamber (in)': '52×27×33',
      'Bale (in)': '27×23×23',
      'Bale Wt (kg)': '50-70',
      'Motor (HP)': '10',
      'Cycle (sec)': '70-80',
      Operation: 'Hydraulic Hand Lever',
    },
  ],
},

'super-jumbo-baler': {
  name: 'Super Jumbo Baler',
  description:
    'Heavy-duty PLC-controlled baler built for high-volume industrial scrap processing. Designed to compact oversized scrap and heavy TMT bars with high production capacity and robust HARDOX construction.',
  specs: [
    {
      'Bale (in)': '20×20',
      'Chamber (in)': '84×44×38',
      'Wt MS (kg)': '200-250',
      'Cycle (sec)': '80-85',
      'Production (T/8hr)': '24-30',
      'Motor (HP)': '80/100',
    },
    {
      'Bale (in)': '22×22',
      'Chamber (in)': '84×44×38',
      'Wt MS (kg)': '250-300',
      'Cycle (sec)': '80-85',
      'Production (T/8hr)': '30-35',
      'Motor (HP)': '80/100',
    },
    {
      'Bale (in)': '24×24',
      'Chamber (in)': '84×60×40',
      'Wt MS (kg)': '400-500',
      'Cycle (sec)': '80-85',
      'Production (T/8hr)': '45-50',
      'Motor (HP)': '80/100/120',
    },
    {
      'Bale (in)': '28×28',
      'Chamber (in)': '105×50×50',
      'Wt MS (kg)': '600-650',
      'Cycle (sec)': '90-100',
      'Production (T/8hr)': '60-70',
      'Motor (HP)': '80/100/120',
    },
    {
      'Bale (in)': '30×30',
      'Chamber (in)': '105×60×50',
      'Wt MS (kg)': '700-800',
      'Cycle (sec)': '90-100',
      'Production (T/8hr)': '62-72',
      'Motor (HP)': '80/100/120',
    },
  ],
},

'car-baler': {
  name: 'Car Baler (ELV Compactor)',
  description:
    'Specialized hydraulic car baler developed for End-of-Life Vehicle (ELV) and Registered Vehicle Scrapping Facilities (RVSF). Designed to compact complete vehicle bodies, doors, buses and truck components into dense bundles for efficient recycling.',
  specs: [
    {
      Application: 'ELV / RVSF',
      Capacity: 'Available on Request',
      'Machine Configuration': 'Custom',
      'Hydraulic System': 'Heavy Duty',
      Consultation: 'Contact Sales Team',
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
      'Production (T/hr)': '1-3',
    },
    {
      'Bale Size (W×H)': '35×29',
      'Bale Wt OCC (kg)': '400-600',
      'Production (T/hr)': '4-6',
    },
    {
      'Bale Size (W×H)': '35×35',
      'Bale Wt OCC (kg)': '650-750',
      'Production (T/hr)': '7-12',
    },
    {
      'Bale Size (W×H)': '44×42',
      'Bale Wt OCC (kg)': '800-1200',
      'Production (T/hr)': '12-22',
    },
    {
      'Bale Size (W×H)': '44×57',
      'Bale Wt OCC (kg)': '1000-1400',
      'Production (T/hr)': '24-29',
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
'alligator-shear-crocodile-shear': {
  name: 'Alligator Shear',
  description:
    'Heavy-duty hydraulic and mechanical alligator shear designed for fast, efficient cutting of ferrous and non-ferrous scrap. Suitable for processing TMT bars, channels, angles, cables, tubes and structural steel with high cutting force and minimal maintenance.',
  specs: [
    {
      'Shear Force (T)': '35-50',
      'Jaw Opening (in)': '9',
      'Cutting Capacity (mm)': '40-50 Round',
      'Strokes/Min': '10-14',
      'Motor (HP)': '15-40',
      'Machine Wt (kg)': '2800-6500',
    },
    {
      'Shear Force (T)': '65-100',
      'Jaw Opening (in)': '9-12',
      'Cutting Capacity (mm)': '65-80 Round',
      'Strokes/Min': '7-14',
      'Motor (HP)': '40',
      'Machine Wt (kg)': '6500',
    },
    {
      'Shear Force (T)': '85-200',
      'Jaw Opening (in)': '12-16',
      'Cutting Capacity (mm)': '85-120 Round / 75 Sq',
      'Strokes/Min': '7-12',
      'Motor (HP)': '40-60',
      'Machine Wt (kg)': '8000',
    },
  ],
},

'hydraulic-nibbler': {
  name: 'Nibblers (Hydraulic & Mechanical)',
  description:
    'Precision hydraulic and mechanical nibblers designed for clean, low-deformation cutting of metal sheets and sections. Equipped with V-shaped blades and PLC pedal control for efficient and accurate operation.',
  specs: [
    {
      Parameter: 'Blade Shape',
      Value: 'V-shaped',
    },
    {
      Parameter: 'Strokes/Min',
      Value: '14-16',
    },
    {
      Parameter: 'Motor (HP)',
      Value: '15',
    },
    {
      Parameter: 'Blade Opening (in)',
      Value: '4',
    },
    {
      Parameter: 'Cutting Capacity',
      Value: '50-80 mm Round',
    },
    {
      Parameter: 'Working Pressure',
      Value: '2400 PSI',
    },
    {
      Parameter: 'Machine Weight',
      Value: '2500 kg',
    },
  ],
},

'single-shaft-shredder': {
  name: 'Single Shaft Shredder',
  description:
    'Versatile single shaft shredder engineered for size reduction of plastics, paper, fabric, tyres, packaging waste and selected metal scrap. Features high torque, low-speed operation with PLC-controlled feeding for consistent output.',
  specs: [
    {
      Parameter: 'Cutting Chamber Width',
      Value: '36"',
    },
    {
      Parameter: 'Cutting Chamber Length',
      Value: '42"',
    },
    {
      Parameter: 'Rotor Width',
      Value: '34"',
    },
    {
      Parameter: 'Rotor Diameter',
      Value: '350 mm',
    },
    {
      Parameter: 'Motor',
      Value: '50 HP',
    },
    {
      Parameter: 'Hydraulic Power Pack',
      Value: 'Provided',
    },
  ],
},

'twin-shaft-shredder-rotary-shear-pre-shredder': {
  name: 'Twin Shaft Shredder',
  description:
    'Heavy-duty twin shaft rotary shear designed for shredding bulky materials at low speed and high torque. The interlocking shaft design minimizes jamming while delivering reliable pre-shredding performance for metal, tyres, plastics and industrial waste.',
  specs: [
    {
      'Housing (mm)': '1200×810',
      'Power (HP)': '40×2',
      'Cutter Hardness (HRC)': '58-60',
      Drive: 'Hydraulic',
      'Typical Scrap': 'Aluminium Casting',
    },
    {
      'Housing (mm)': '1020×1500',
      'Power (HP)': '60×2',
      'Cutter Hardness (HRC)': '58-60',
      Drive: 'Hydraulic',
      'Typical Scrap': 'Aluminium Casting',
    },
    {
      'Housing (mm)': '1020×1500',
      'Power (HP)': '50×2',
      'Cutter Hardness (HRC)': '58-60',
      Drive: 'Electric',
      'Typical Scrap': 'Tyre Wire',
    },
    {
      'Housing (mm)': '1200×1800',
      'Power (HP)': '75×2',
      'Cutter Hardness (HRC)': '58-60',
      Drive: 'Electric',
      'Typical Scrap': 'Tyre Wire',
    },
  ],
},

'casting-cracker': {
  name: 'Casting Cracker',
  description:
    'Robust casting cracker designed for breaking engines, transmission gears, cast iron and other heavy metal castings. Delivers efficient size reduction with strong gripping jaws and optional conveyor integration for continuous processing.',
  specs: [
    {
      Capacity: '3-5 Tons/Hour',
      'Machine Type': 'Hydraulic Casting Cracker',
      'Jaw Design': 'Heavy Duty Grip Jaw',
      Conveyors: 'Optional Loading & Unloading',
      Footprint: 'Compact',
      Specifications: 'Available on Request',
    },
  ],
},
'vertical-briquetting-machine': {
  name: 'Vertical Briquetting Machine',
  description:
    'High-pressure vertical briquetting machine designed to convert metal machining waste into dense, uniform briquettes for efficient remelting. Reduces material volume, improves handling and minimizes metal loss during smelting.',
  specs: [
    {
      'Briquette Dia': '3" (90 mm)',
      'Motor (HP)': '40-50',
      'Wt Al (kg)': '0.3-0.6',
      'Wt Fe (kg)': '0.5-1.2',
      'Production (T/hr)': '0.54-1.2',
    },
    {
      'Briquette Dia': '4" (125 mm)',
      'Motor (HP)': '40-60',
      'Wt Al (kg)': '1-1.5',
      'Wt Fe (kg)': '3-4.5',
      'Production (T/hr)': '0.9-1.68',
    },
    {
      'Briquette Dia': '5" (150 mm)',
      'Motor (HP)': '40-75',
      'Wt Al (kg)': '2-4',
      'Wt Fe (kg)': '5-8',
      'Production (T/hr)': '1.26-2.4',
    },
  ],
},

'conveyors': {
  name: 'Conveyors',
  description:
    'Custom-built conveyor systems for transporting and sorting scrap, recyclables and waste materials across processing lines. Available in multiple configurations and designed for seamless integration with shredders, balers and sorting equipment.',
  specs: [
    {
      Type: 'Inclined Magnetic',
      Material: 'Any / Metal',
      'Belt Width': '900 mm',
      Drive: '2.0 HP Geared',
      Length: '3700 mm',
    },
    {
      Type: 'Flat Bed Sorting',
      Material: 'Any / Mixed',
      'Belt Width': '900 mm',
      Drive: '2.0 HP',
      Length: '4000 mm',
    },
    {
      Type: 'Transfer',
      Material: 'Any / Sorted',
      'Belt Width': '900 mm',
      Drive: '2.0 HP Geared',
      Length: '3700 mm',
    },
  ],
},

'msw-sorting-line': {
  name: 'MSW Sorting Line',
  description:
    'Complete municipal solid waste (MSW) sorting solution designed for efficient separation of organic, recyclable and non-recyclable waste. Suitable for biomining projects and turnkey waste processing facilities with customized plant layouts.',
  specs: [
    {
      'Plant Capacity': 'Custom',
      Configuration: 'Customized',
      Layout: 'As Per Customer Requirement',
      Sorting: 'Mechanical + Optical',
      Application: 'MSW & Biomining',
    },
  ],
},

'fodder-block-making-machine': {
  name: 'Fodder Block Making Machine',
  description:
    'PLC-controlled fodder block making machine that compresses agricultural residue into dense, uniform feed blocks for efficient storage, transportation and livestock feeding. Supports both dry fodder and TMR blend production.',
  specs: [
    {
      Parameter: 'Feeding Chamber',
      'FBM Standard': '24×18×43"',
      'FBM-HD Heavy Duty': '23×24×50"',
    },
    {
      Parameter: 'Block Size',
      'FBM Standard': '12×18×5"',
      'FBM-HD Heavy Duty': '12×24×6"',
    },
    {
      Parameter: 'Motor (HP)',
      'FBM Standard': '25',
      'FBM-HD Heavy Duty': '30',
    },
    {
      Parameter: 'Production (Blocks/hr)',
      'FBM Standard': '70-90',
      'FBM-HD Heavy Duty': '90-100',
    },
    {
      Parameter: 'Block Wt — Dry Fodder',
      'FBM Standard': '10-12 kg',
      'FBM-HD Heavy Duty': '14-17 kg',
    },
    {
      Parameter: 'Block Wt — TMR 50:50',
      'FBM Standard': '14-18 kg',
      'FBM-HD Heavy Duty': '27-30 kg',
    },
    {
      Parameter: 'Machine Weight',
      'FBM Standard': '6.5 T',
      'FBM-HD Heavy Duty': '8 T',
    },
  ],
  },
};

const materialProcessed = {
  'high-density-baler': [
    'MS Scrap',
    'Heavy Melting Scrap (HMS)',
    'Light Melting Scrap (LMS)',
    'Steel Scrap',
    'Aluminium Scrap',
    'Copper Scrap',
    'Brass Scrap',
    'Stainless Steel Scrap',
    'Cast Iron Scrap',
    'Automobile Scrap',
    'Industrial Scrap',
    'Sheet Metal Scrap',
    'Turnings & Borings',
  ],
  'triple-action-baler': [
    'MS Scrap',
    'Aluminium Scrap',
    'Copper Scrap',
    'Brass Scrap',
    'Stainless Steel Scrap',
    'Automobile Scrap',
    'Industrial Scrap',
    'Tin Scrap',
    'Dry Waste',
    'Mixed Metal Scrap',
  ],
  'mini-triple-action-baler': [
    'Copper Scrap',
    'Aluminium Scrap',
    'Brass Scrap',
    'MS Scrap',
    'Stainless Steel Scrap',
    'Mixed Non-Ferrous Scrap',
    'Light Metal Scrap',
  ],
  'double-action-baler': [
    'MS Scrap',
    'Sheet Metal Scrap',
    'Light Steel Scrap',
    'Aluminium Scrap',
    'Copper Scrap',
    'Brass Scrap',
    'Industrial Scrap',
  ],
  'vertical-baler': [
    'Aluminium Cans',
    'Plastic Bottles',
    'PET Bottles',
    'Cardboard',
    'Paper Waste',
    'Cartons',
    'Plastic Film',
    'Dry Waste',
    'Light Metal Scrap',
  ],
  'super-jumbo-baler': [
    'Heavy Melting Scrap',
    'Light Melting Scrap',
    'MS Scrap',
    'TMT Bars',
    'Steel Scrap',
    'Structural Scrap',
    'Industrial Scrap',
    'Automobile Scrap',
    'Heavy Plate Scrap',
  ],
  'car-baler': [
    'End-of-Life Vehicles (ELV)',
    'Car Bodies',
    'Truck Bodies',
    'Bus Bodies',
    'Vehicle Shells',
    'Automobile Scrap',
  ],
  'automatic-baler': [
    'OCC',
    'Cardboard',
    'Paper Waste',
    'Newspaper',
    'PET Bottles',
    'Plastic Bottles',
    'Plastic Film',
    'Textile Waste',
    'Cotton Waste',
  ],
  'semi-automatic-baler': [
    'OCC',
    'Cardboard',
    'Paper Waste',
    'PET Bottles',
    'Plastic Bottles',
    'Plastic Film',
    'Textile Waste',
  ],
  'alligator-shear-crocodile-shear': [
    'Round Bars',
    'TMT Bars',
    'Channels',
    'Angles',
    'Beams',
    'Flat Bars',
    'Steel Pipes',
    'Steel Tubes',
    'Cable Scrap',
    'Structural Steel',
    'MS Scrap',
  ],
  'hydraulic-nibbler': [
    'Steel Plates',
    'MS Plates',
    'Aluminium Plates',
    'Copper Plates',
    'Brass Plates',
    'Sheet Metal',
  ],
  'single-shaft-shredder': [
    'Plastic',
    'PET',
    'Rubber',
    'Tyres',
    'Wood',
    'Paper',
    'Cardboard',
    'Fabric',
    'Textiles',
    'Electronic Waste',
    'Light Metal Scrap',
  ],
  'twin-shaft-shredder-rotary-shear-pre-shredder': [
    'Aluminium Castings',
    'Tyres',
    'Tyre Wire',
    'Plastic',
    'Rubber',
    'Steel Drums',
    'MS Scrap',
    'Municipal Waste',
    'Industrial Waste',
    'Electronic Waste',
  ],
  'casting-cracker': [
    'Engine Blocks',
    'Gear Boxes',
    'Cast Iron',
    'Aluminium Castings',
    'Transmission Housings',
    'Motor Casings',
    'Heavy Cast Components',
  ],
  'vertical-briquetting-machine': [
    'Aluminium Chips',
    'Steel Chips',
    'Cast Iron Chips',
    'Brass Chips',
    'Copper Chips',
    'Metal Turnings',
    'Metal Borings',
    'Metal Swarf',
  ],
  conveyors: [
    'Metal Scrap',
    'Paper',
    'Plastic',
    'Municipal Waste',
    'Industrial Waste',
    'Aluminium',
    'Steel',
    'Mixed Recyclables',
  ],
  'msw-sorting-line': [
    'Municipal Solid Waste',
    'Organic Waste',
    'Plastic',
    'Paper',
    'Cardboard',
    'Glass',
    'Metal',
    'Textiles',
    'Construction Debris',
    'Mixed Recyclables',
  ],
  'fodder-block-making-machine': [
    'Rice Straw',
    'Wheat Straw',
    'Sugarcane Trash',
    'Corn Stover',
    'Cotton Stalk',
    'Dry Grass',
    'Hay',
    'Silage',
    'TMR Feed',
    'Agricultural Residue',
  ],
};

const keyFeatures = {
  'high-density-baler': [
    'Cylinder force up to 650 tons',
    'Bale sizes 18×18" to 40×40"',
    'Double-displacement vane pump, low cycle times',
    'HARDOX 500-BHN wear plates throughout',
    'Shearing blades handle material up to 20mm',
    'Top, turn-out & side ejection options',
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
  'super-jumbo-baler': [
    'Bale sizes 20×20" up to 35×35"',
    'Cylinder force up to 300 tons',
    'Processes heavy TMT bars 5–10mm thick',
    'Production 2–10 tons/hr; bale under 75 sec',
    'Separate manifolds per cylinder',
    'HARDOX 500-BHN compression chamber',
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
  'alligator-shear-crocodile-shear': [
    'Cuts TMT, angle, round bar, cable, plates, tubes',
    'Cutting capacity up to 85–120mm round',
    'Broad shearing jaw for wide scrap',
    'Up to 13–14 strokes/min',
    'Manual, full-auto & foot-pedal operation',
    'No civil foundation required',
  ],
  'hydraulic-nibbler': [
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
  'twin-shaft-shredder-rotary-shear-pre-shredder': [
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
  'high-density-baler': [
    'Metal Recyclers',
    'TMT & Ingot Plants',
    'Scrap Yards',
    'Casting Plants',
    'Automotive',
  ],
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
  'alligator-shear-crocodile-shear': [
    'Scrap Yards',
    'Recyclers',
    'ELV Plants',
    'Fabrication',
  ],
  'hydraulic-nibbler': [
    'Sheet Metal Processors',
    'Recyclers',
    'Fabrication',
  ],
  'single-shaft-shredder': [
    'MSW Plants',
    'MRFs',
    'Scrap Processing',
  ],
  'twin-shaft-shredder-rotary-shear-pre-shredder': [
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
  'high-density-baler': [
    'High-density hydraulic baler for fast metal scrap compaction and lower transport cost',
    'Heavy-duty hydraulic operation designed for scrap yards, steel plants and recycling facilities',
    'Low cycle-time baling improves daily throughput for ferrous and non-ferrous scrap',
    'Configurable bale size, chamber size and ejection options for site-specific recycling operations',
    'Wear-resistant chamber construction supports continuous industrial scrap processing',
  ],
  'triple-action-baler': [
    'Triple-action hydraulic compression creates dense, uniform bales for metal recycling',
    'PLC-controlled baler operation reduces manual handling and improves production consistency',
    'Three-direction compaction improves bale density for MS scrap, aluminium scrap and mixed dry waste',
    'Efficient scrap baling workflow helps reduce storage space, loading time and logistics cost',
    'Built for high-throughput recycling yards, rolling mills and industrial waste processors',
  ],
  'mini-triple-action-baler': [
    'Compact triple-action baler for efficient scrap compaction in small and medium recycling yards',
    'Dense bale output improves storage, stacking and transport of copper, aluminium and MS scrap',
    'PLC-controlled operation supports consistent baling with reduced operator effort',
    'Small footprint hydraulic baler designed for workshops, dealers and in-house scrap generation',
    'Online cooling and lubrication options support longer daily recycling operations',
  ],
  'double-action-baler': [
    'Double-action hydraulic baler for reliable metal scrap compaction with a compact footprint',
    'Two-direction pressing improves bale density for light and medium industrial scrap',
    'Front, top and manual ejection options help match the machine to available floor layout',
    'Efficient hydraulic cycle reduces handling time in scrap yards and fabrication workshops',
    'Relocatable installation supports flexible recycling operations without major civil foundation work',
  ],
  'vertical-baler': [
    'Vertical hydraulic baler for space-saving compaction of dry waste, cardboard and light metal scrap',
    'Top-down compression creates dense bales in facilities with limited floor space',
    'Low-noise baler operation suits warehouses, retail backrooms and compact recycling sites',
    'PLC or hand-lever controls allow simple operation for daily waste handling teams',
    'Reduced storage volume helps improve housekeeping, material handling and transport efficiency',
  ],
  'super-jumbo-baler': [
    'Super jumbo hydraulic baler for high-volume metal scrap processing and heavy-duty compaction',
    'Large chamber and high cylinder force support dense bales from bulky industrial scrap',
    'Fast production cycles improve throughput for large scrap yards and steel recycling plants',
    'HARDOX-lined compression chamber extends service life in abrasive scrap applications',
    'Designed for continuous industrial operation with oversized scrap, TMT bars and heavy feedstock',
  ],
  'car-baler': [
    'Hydraulic car baler engineered for ELV recycling, RVSF plants and vehicle scrapping facilities',
    'Compacts car bodies, doors, buses and truck components into dense transport-ready bundles',
    'Heavy-duty operation improves scrap handling, loading efficiency and metal recovery workflow',
    'Purpose-built ELV compactor supports organized vehicle dismantling and automotive recycling',
    'Custom machine configuration available for turnkey RVSF and end-of-life vehicle processing lines',
  ],
  'automatic-baler': [
    'Automatic horizontal baler for high-volume paper, cardboard, PET and plastic waste compaction',
    'Continuous feed, compaction and bale ejection reduce operator involvement and labor cost',
    'Programmable bale length and PLC control improve consistency across recycling line operations',
    'High-throughput waste baling helps lower cost per tonne for MRFs and packaging recyclers',
    'Oil cooling and heavy-duty liners support long-shift industrial recycling performance',
  ],
  'semi-automatic-baler': [
    'Semi-automatic horizontal baler for medium-volume paper, OCC, plastic and PET recycling',
    'Automatic compaction with manual strapping balances productivity, cost and operator control',
    'High-density bales improve storage, truck loading and resale value of recyclable material',
    'PLC-assisted baling operation simplifies daily use for recycling facilities and factories',
    'Efficient waste compaction reduces manpower requirement and improves plant housekeeping',
  ],
  'alligator-shear-crocodile-shear': [
    'Hydraulic alligator shear for fast cutting of TMT bars, channels, cables, tubes and metal scrap',
    'High cutting force improves scrap preparation speed for recycling and fabrication operations',
    'Foot-pedal, manual and automatic operation options support safer, more efficient cutting workflows',
    'No-foundation installation allows flexible placement in scrap yards and dismantling facilities',
    'Heavy-duty shear design reduces downtime while processing ferrous and non-ferrous scrap',
  ],
  'hydraulic-nibbler': [
    'Hydraulic nibbler for clean, controlled cutting of metal sheets, plates and industrial scrap',
    'Precision V-blade design reduces deformation during sheet metal recycling and fabrication work',
    'Pedal-controlled operation improves cutting accuracy and operator productivity',
    'Compact nibbler machine supports trimming, dismantling and scrap preparation applications',
    'Hydraulic and mechanical variants available for different metal processing workloads',
  ],
  'single-shaft-shredder': [
    'Single shaft shredder for controlled size reduction of plastic, paper, fabric, tyres and mixed waste',
    'Low-speed, high-torque shredding improves energy efficiency and reduces jamming risk',
    'Sieve-controlled output supports consistent material sizing for recycling and recovery lines',
    'PLC-controlled feeder improves throughput and protects the shredder from overload',
    'Integrates with conveyors and downstream equipment for complete waste processing systems',
  ],
  'twin-shaft-shredder-rotary-shear-pre-shredder': [
    'Twin shaft shredder for pre-shredding bulky scrap, tyres, plastics and industrial waste',
    'Low-speed, high-torque rotary shear operation reduces jamming and improves cutting efficiency',
    'Interlocking cutter design supports reliable size reduction before baling, sorting or recovery',
    'Hydraulic and electric drive options match plant capacity and material requirements',
    'Designed for ELV plants, recycling lines and high-volume waste processing facilities',
  ],
  'casting-cracker': [
    'Casting cracker for efficient breaking of engines, gearboxes, cast iron and heavy ferrous scrap',
    'Strong hydraulic jaw grip improves crushing performance on dense metal castings',
    'Continuous processing options with conveyors improve throughput in metal recovery operations',
    'Compact heavy-duty design supports foundries, ELV plants and scrap processing yards',
    'Size reduction helps prepare heavy cast scrap for melting, sorting and transport',
  ],
  'vertical-briquetting-machine': [
    'Vertical briquetting machine converts metal chips, turnings and machining waste into dense briquettes',
    'High-pressure compaction improves storage, handling and remelting efficiency for metal recyclers',
    'Uniform briquette output helps reduce oxidation loss and improves furnace charging',
    'PLC and HMI controls support consistent operation in machining shops and foundries',
    'Oil cooling supports long-hour briquetting of aluminium, steel, brass and cast iron chips',
  ],
  conveyors: [
    'Recycling conveyors improve material flow across balers, shredders, sorting lines and recovery systems',
    'Custom belt width, length and inclination support site-specific scrap and waste handling operations',
    'Infeed, outfeed, magnetic and sorting conveyors reduce manual handling and improve plant throughput',
    'Designed for metal scrap, MSW, plastics, paper, packaging waste and mixed recyclable streams',
    'Conveyor integration helps create smoother end-to-end recycling plant operation',
  ],
  'msw-sorting-line': [
    'MSW sorting line for efficient separation of organic waste, recyclables and inert material',
    'Integrated conveyors and sorting equipment improve municipal solid waste processing throughput',
    'Mechanical and optical sorting options support better material recovery and cleaner output streams',
    'Suitable for biomining, legacy waste recovery and turnkey municipal waste processing plants',
    'Custom plant layouts help urban local bodies and waste contractors improve operational efficiency',
  ],
  'fodder-block-making-machine': [
    'Fodder block making machine compacts agricultural residue into dense feed and biomass blocks',
    'PLC-controlled operation delivers consistent block size for storage, handling and transport',
    'Efficient compression supports rice straw, wheat straw, dry grass, husk and TMR feed blends',
    'Semi-automatic packing workflow improves daily production for farms and cattle feed operations',
    'Compact blocks reduce logistics cost and help convert crop residue into usable livestock feed',
  ],
};

const seoSuitableIndustries = {
  'high-density-baler': [
    'Metal recycling plants and ferrous scrap yards',
    'Steel mills, TMT bar units and ingot plants',
    'Foundries, casting plants and industrial scrap processors',
    'Automotive component manufacturers and ELV recycling facilities',
  ],
  'triple-action-baler': [
    'Scrap recycling yards and metal recovery centers',
    'Rolling mills, steel plants and foundry scrap handling units',
    'Packaging waste recyclers and dry waste compaction facilities',
    'Manufacturing plants with in-house metal scrap generation',
  ],
  'mini-triple-action-baler': [
    'Small scrap yards and local metal recycling dealers',
    'Fabrication shops and workshops with in-house scrap',
    'Copper, aluminium and MS scrap processors',
    'Compact recycling facilities with limited floor space',
  ],
  'double-action-baler': [
    'Scrap yards and industrial metal recycling units',
    'Fabrication workshops and manufacturing plants',
    'Light metal scrap processors and recycling dealers',
    'Warehouses and factories needing compact waste baling',
  ],
  'vertical-baler': [
    'Retail stores, warehouses and logistics facilities',
    'Cardboard, paper and dry waste recycling centers',
    'Small factories with limited waste handling space',
    'Light metal scrap and packaging waste processors',
  ],
  'super-jumbo-baler': [
    'High-volume scrap yards and heavy metal recyclers',
    'Steel plants, rolling mills and TMT processing units',
    'Industrial demolition and bulky scrap processing facilities',
    'Large recycling plants handling oversized ferrous scrap',
  ],
  'car-baler': [
    'Registered Vehicle Scrapping Facilities (RVSF)',
    'End-of-Life Vehicle (ELV) recycling plants',
    'Automotive dismantling and metal recovery centers',
    'Large scrap yards processing vehicle bodies and components',
  ],
  'automatic-baler': [
    'MRFs and high-volume waste recycling plants',
    'Paper mills, OCC recyclers and cardboard recovery facilities',
    'PET bottle, plastic and textile recycling units',
    'Packaging factories and distribution centers with bulk waste',
  ],
  'semi-automatic-baler': [
    'Medium-volume recycling facilities and waste aggregators',
    'Printing firms, packaging plants and corrugated box manufacturers',
    'PET, plastic and cardboard recycling businesses',
    'Factories needing cost-effective horizontal waste baling',
  ],
  'alligator-shear-crocodile-shear': [
    'Scrap yards and metal cutting centers',
    'ELV dismantling plants and automotive recycling units',
    'Steel fabrication shops and structural steel processors',
    'Cable, tube, bar and plate scrap recycling operations',
  ],
  'hydraulic-nibbler': [
    'Sheet metal fabrication and trimming workshops',
    'Metal recycling plants handling plates and sections',
    'Automotive dismantling and industrial maintenance yards',
    'Small and medium fabrication units needing precision cutting',
  ],
  'single-shaft-shredder': [
    'Material recovery facilities and MSW processing plants',
    'Plastic, tyre, textile and packaging waste recyclers',
    'Industrial waste management companies',
    'Recycling lines requiring controlled pre-processing',
  ],
  'twin-shaft-shredder-rotary-shear-pre-shredder': [
    'ELV recycling plants and vehicle dismantling yards',
    'Tyre, plastic and bulky waste recycling facilities',
    'Metal recycling lines needing pre-shredding',
    'Municipal and industrial waste processing plants',
  ],
  'casting-cracker': [
    'Foundries and cast iron recycling facilities',
    'ELV plants processing engines and gearboxes',
    'Heavy ferrous scrap yards and metal recovery centers',
    'Industrial scrap processors preparing material for melting',
  ],
  'vertical-briquetting-machine': [
    'CNC machining shops and metalworking units',
    'Foundries and remelting plants',
    'Aluminium, steel, brass and cast iron chip recyclers',
    'Automotive and engineering manufacturers with metal turnings',
  ],
  conveyors: [
    'Scrap yards and metal recycling plants',
    'MRFs, MSW sorting plants and waste contractors',
    'Baler, shredder and briquetting machine feed lines',
    'Packaging, plastic, paper and mixed recyclable processors',
  ],
  'msw-sorting-line': [
    'Municipal corporations and urban local bodies',
    'Waste management contractors and MRF operators',
    'Biomining and legacy waste processing projects',
    'Turnkey municipal solid waste recycling facilities',
  ],
  'fodder-block-making-machine': [
    'Dairy farms and cattle feed producers',
    'Farmer co-operatives and agricultural residue processors',
    'Biomass plants and rural feedstock aggregation centers',
    'Agro-export businesses handling compressed fodder blocks',
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
  foundingDate: '2000',
  description: 'Manufacturer and exporter of hydraulic balers, scrap metal shredders, alligator shears, waste balers, and recycling machinery. 2,500+ machines installed globally since 2000.',
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
      description: 'Manufacturer & exporter of hydraulic balers, shredders, alligator shears, and scrap recycling machinery since 2000. 2,500+ machines installed globally. Get a free quote.',
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
  ['Balers', 'Hydraulic baling presses that compress ferrous and non-ferrous scrap into dense, transport-ready bales.', '/images/metal%20recycling.png'],
  ['Shears & Nibblers', 'Alligator shears and nibblers for fast, precise cutting and scrap size reduction.', '/images/homepage.png'],
  ['Shredders & Crackers', 'Single- and twin-shaft shredders plus casting crackers for heavy-duty metal reduction.', '/images/waste%20management.png'],
  ['Briquetting Machines', 'High-pressure briquetting presses that convert machining waste into compact briquettes.', '/images/infrastructure%201.png'],
  ['Material Handling & Sorting', 'Conveyor systems and MSW sorting lines that move, feed, and sort material efficiently.', '/images/scrap.png'],
  ['Agriculture Waste Recycling', 'Equipment to compress and process agricultural waste into high-density biomass products.', '/images/homepage.png'],
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
  ['Designers', 'Machine layouts, tooling, fabrication drawings and ergonomics', '/images/designers.jpg'],
  ['Engineers', 'Hydraulic design, system sizing and performance validation', '/images/engineers.jpg'],
  ['Researchers', 'Process improvement, materials, automation and new applications', '/images/research.jpg'],
  ['Technical Experts', 'Installation, troubleshooting, training and service support', '/images/technical.jpg'],
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
    image: '/images/metal%20recycling.png',
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
    image: '/images/waste%20management.png',
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
    image: '/images/scrap.png',
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
        <li><Link to="/case-studies">Case Studies</Link></li>
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
            <img src="/images/infrastructure%201.png" alt="Hydraulic machine manufacturing infrastructure" />
            <img src="/images/infrastructure%202.png" alt="Machine fabrication and assembly infrastructure" />
            <img src="/images/infrastructure%203.png" alt="Industrial recycling equipment infrastructure" />
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
  const currentSlug = getProductSlugFromLocation(location) || productCategories[0].products[0].slug;
  const product = getProductDetail(currentSlug);
  const productMeta = productSeo[currentSlug];
  const productKeyFeatures = seoEfficiencyFeatures[product.slug] || keyFeatures[product.slug] || [];
  const processedMaterials = materialProcessed[product.slug] || [];
  const productIndustries = seoSuitableIndustries[product.slug] || suitableIndustries[product.slug] || [];
  const productFeatureGroups = featureGroups.map((group) => (
    group.title === 'Efficiency / Operation' && productKeyFeatures.length > 0
      ? { ...group, items: productKeyFeatures }
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
  const productVideos = [
    ['Machine Walkthrough', 'https://www.youtube.com/embed/tgbNymZ7vqY'],
    ['Hydraulic System Overview', 'https://www.youtube.com/embed/tgbNymZ7vqY'],
    ['Site Operation Video', 'https://www.youtube.com/embed/tgbNymZ7vqY'],
  ];
  const relatedMachines = [
    ['Quad Baler', 'Four-side compression baler for dense, uniform metal scrap bales.', '/images/metal-recycling.png', '/products/metal-recycling/balers/quad-baler/'],
    ['Shear Baler', 'Integrated shearing and baling solution for heavy scrap processing.', '/images/scrap.png', '/products/metal-recycling/shears/box-shear-inclined-shear/'],
    ['Metal Shredder', 'Industrial shredding system for high-volume scrap size reduction.', '/images/waste%20management.png', '/products/metal-recycling/shredders/hammer-mill-shredder/'],
    ['Hydraulic Shear', 'Robust cutting machine for ferrous and non-ferrous scrap yards.', '/images/ELV%20Recycling.png', '/products/metal-recycling/shears/alligator-shear/'],
  ];

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
              <h2>{product.slug === 'triple-action-baler' ? 'Technical Specifications' : 'Technical Range'}</h2>
              <div className="product-table-wrap">
                <table className="product-table">
                  <thead>
                    <tr>
                      {Array.isArray(product.specs) && product.specs[0] ? (
                        Object.keys(product.specs[0]).map((key) => <th key={key}>{key}</th>)
                      ) : (
                        <>
                          <th>Model</th>
                          <th>Capacity</th>
                          <th>Motor HP</th>
                          <th>Cycle Time</th>
                          <th>Machine Weight</th>
                        </>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(product.specs) ? (
                      product.specs.map((row, index) => (
                        <tr key={index}>
                          {Object.values(row).map((value, valueIndex) => (
                            <td key={valueIndex}>{value}</td>
                          ))}
                        </tr>
                      ))
                    ) : (
                      <>
                        <tr><td>Standard</td><td>20-30 T/8hr</td><td>30-60</td><td>40-55 sec</td><td>8-14 T</td></tr>
                        <tr><td>Heavy Duty</td><td>30-60 T/8hr</td><td>60-100</td><td>35-50 sec</td><td>14-20 T</td></tr>
                        <tr><td>Custom</td><td>As required</td><td>Application matched</td><td>Custom</td><td>Project based</td></tr>
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </section>

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

            <section className="product-video-section" id="product-video">
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
            </section>

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
            <div className="premium-eyebrow">Related Machines</div>
            <h2>Explore More Recycling Equipment</h2>
          </div>
          <div className="related-machine-grid">
            {relatedMachines.map(([title, text, image, path]) => (
              <Link className="related-machine-card reveal" to={path} key={title}>
                <img src={image} alt={title} />
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <span>View Product</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="premium-section installation-showcase">
          <div className="installation-copy reveal">
            <div className="premium-eyebrow">Installations</div>
            <h2>Proven Across Recycling Sites</h2>
            <p>JHP supports factory installations, processing plants, and scrap yards with manufacturing, commissioning, operator training, and long-term service support.</p>
            <div className="installation-metrics">
              <div><strong>100+</strong><span>Installations</span></div>
              <div><strong>20+</strong><span>Countries</span></div>
              <div><strong>30</strong><span>Years Experience</span></div>
            </div>
          </div>
          <div className="installation-grid reveal">
            <img src="/images/infrastructure%201.png" alt="Factory installation" />
            <img src="/images/infrastructure%202.png" alt="Processing plant installation" />
            <img src="/images/infrastructure%203.png" alt="Scrap yard installation" />
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
                <section className="category-product-hero" style={{ '--category-hero-image': `url("${getCategoryImage(activeCategory)}")` }}>
                  <div className="category-product-hero-copy">
                    <div className="section-label">Products</div>
                    <h1>{activeSubcategoryName || activeCategorySeo?.h1 || activeCategory?.name}</h1>
                    <p>{activeSubcategoryName ? `Browse ${activeSubcategoryName} products in ${activeCategory.name}.` : activeCategorySeo?.intro || `Browse all products in ${activeCategory.name}.`}</p>
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
                  {showSubcategorySearch && (
                    <select
                      value={activeSubcategoryParam || ''}
                      onChange={(event) => {
                        const value = event.target.value;
                        navigate(value ? getSubcategoryPath(activeCategory, value) : activeCategory.viewAll);
                      }}
                      aria-label="Select subcategory"
                    >
                      <option value="">All Subcategories</option>
                      {activeCategorySubcategories.map((subcategory) => (
                        <option value={slugifySegment(subcategory)} key={subcategory}>{subcategory}</option>
                      ))}
                    </select>
                  )}
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
                        <p>{product.detail.description}</p>
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
                    <p>Explore hydraulic balers, shears, shredders, compactors, sorting lines, and recycling plant support engineered for high-throughput industrial operations.</p>
                  </div>
                  <div className="machinery-hero-media">
                    <img src="/images/homepage.png" alt="Hydraulic recycling machinery by Jindal Hydro Projects" />
                  </div>
                </section>

                <nav className="machinery-category-tabs" aria-label="Machinery categories">
                  {productCategories.map((category) => (
                    <Link to={category.viewAll} key={category.name}>
                      <span>{String(productCategories.indexOf(category) + 1).padStart(2, '0')}</span>
                      {category.name}
                    </Link>
                  ))}
                </nav>

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
                  <div><strong>Premium Quality</strong><span>Heavy-duty fabrication and tested hydraulics</span></div>
                  <div><strong>High Performance</strong><span>Built for demanding industrial throughput</span></div>
                  <div><strong>Custom Solutions</strong><span>Machine configuration matched to application</span></div>
                  <div><strong>Global Support</strong><span>Installations across India and export markets</span></div>
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

  useSiteInteractions(`${page}:${location.pathname}:${location.search}`);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [location.pathname, location.search]);

  if (page === 'home') {
    const homeBodyMarkup = homeMarkup.replace(/^\s*<!-- NAV -->[\s\S]*?<\/nav>\s*/, '');

    return (
      <>
        <SeoManager page={page} />
        <Header />
        <div dangerouslySetInnerHTML={{ __html: homeBodyMarkup }} />
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

  return <><SeoManager page={page} /><PlaceholderPage page={page} /></>;
}
