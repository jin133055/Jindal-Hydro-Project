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
      { slug: 'double-action-baler-auto-door', name: 'Double Action Baler — Auto Door', subcategory: 'Balers', note: 'Balers' },
      { slug: 'double-action-baler-manual-door', name: 'Double Action Baler — Manual Door', subcategory: 'Balers', note: 'Balers' },
      { slug: 'double-action-baler-top-ejection', name: 'Double Action Baler — Top Ejection', subcategory: 'Balers', note: 'Balers' },
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

const categorySeo = {
  'metal-recycling': {
    name: 'Metal Recycling',
    title: 'Metal Recycling Machinery - Balers, Shears & Shredders | JHP',
    description: 'Hydraulic balers, alligator shears, hammer mill shredders & more for ferrous and non-ferrous metal scrap. Manufacturer since 2000. Get specifications & quote.',
    h1: 'Metal Recycling Machinery - Hydraulic Balers, Shears & Shredders',
    canonical: '/products/metal-recycling/',
    intro: 'Jindal Hydro Projects offers a complete range of hydraulic machinery for metal scrap processing, from compact balers to industrial shredding systems. Machines handle ferrous and non-ferrous scrap including MS, stainless steel, aluminium, copper, tyre wire, TMT bars, and car bodies.',
    sections: [
      ['Applications', 'Scrap yards, rolling mills, furnaces, automotive plants, and ELV recycling facilities.'],
      ['Common Materials Processed', 'Ferrous and non-ferrous scrap including MS, stainless steel, aluminium, copper, tyre wire, car bodies, and TMT bars.'],
      ['Need Help Choosing?', 'Request a free consultation and our team will recommend the right baler, shear, shredder, briquetting machine, or handling system.'],
    ],
  },
  'waste-recycling': {
    name: 'Waste Recycling',
    title: 'Waste Recycling Balers - Paper, PET, Plastic & OCC | JHP',
    description: 'Fully automatic & semi-automatic balers for paper, PET bottles, plastic, cardboard, foam & MSW. Reduce waste volume by up to 90%. Free quote from JHP.',
    h1: 'Waste Recycling Balers - Paper, PET Bottles, Plastic & Cardboard',
    canonical: '/products/waste-recycling/',
    intro: 'JHP supplies fully automatic and semi-automatic PLC-controlled balers for recyclers, packaging factories, printing firms, and PET traders. Waste balers reduce material volume, lower transport cost, and minimise labour requirements.',
    sections: [
      ['Materials Processed', 'Paper, OCC, cardboard, PET bottles, HDPE, soft plastic, foam, rubber, and municipal solid waste.'],
      ['Industries Served', 'Waste recycling facilities, paper mills, packaging factories, MSW contractors, and urban local bodies.'],
      ['Key Benefits', 'Reduce waste volume by up to 90%, lower transport cost, and support continuous high-volume operation.'],
    ],
  },
  'agriculture-recycling': {
    name: 'Agriculture Waste Recycling',
    title: 'Agricultural Waste Balers - Fodder Blocks & Straw Baling | JHP',
    description: 'Fodder block making machines and straw balers for farms, co-operatives, and biomass plants. PLC-controlled, 70-100 blocks/hour. Request a free quote.',
    h1: 'Agricultural Waste Recycling Machinery - Fodder Block Machines & Straw Balers',
    canonical: '/products/agriculture-recycling/',
    intro: 'JHP manufactures equipment to compress agricultural waste into compact, high-value blocks for cattle fodder, biomass fuel, or export. Applications include farms, fodder processing facilities, co-operatives, biomass plants, and agro-industries.',
    sections: [
      ['Applications', 'Farms, fodder processing facilities, cattle co-operatives, biomass plants, and agro-industries.'],
      ['Materials Processed', 'Dry straw, wheat straw, rice husk, corn stover, dry grass, and TMR blends.'],
    ],
  },
  'balers': {
    name: 'Balers',
    title: 'Balers - High Density, Triple Action, Vertical & ELV Compactors | JHP',
    description: 'High density balers, triple action balers, vertical balers, jumbo balers, and horizontal balers for recycling, scrap, and waste applications.',
    h1: 'Balers for Recycling and Waste Compaction',
    canonical: '/products/balers/',
    intro: 'JHP supplies a complete baler lineup for metal recycling, ELV compaction, industrial scrap handling, and waste processing.',
    sections: [
      ['Applications', 'Scrap yards, ELV facilities, paper and packaging recyclers, and industrial waste handling.'],
      ['Key Baler Types', 'High density balers, triple action balers, vertical balers, jumbo balers, and horizontal balers.'],
      ['Output Benefits', 'Lower transport costs, higher bale density, and more efficient material handling.'],
    ],
  },
  'shears-nibblers': {
    name: 'Shears & Nibblers',
    title: 'Shears & Nibblers - Alligator Shears and Hydraulic Nibblers | JHP',
    description: 'Alligator shears and nibblers for precision cutting, scrap processing and dismantling operations.',
    h1: 'Shears & Nibblers for Metal Cutting and Scrap Preparation',
    canonical: '/products/shears-nibblers/',
    intro: 'JHP offers powerful shearing and nibbling equipment designed for industrial metal processing, ELV dismantling, and precision sheet cutting.',
    sections: [
      ['Equipment', 'Alligator shears and hydraulic nibblers for heavy metal and sheet metal cutting.'],
      ['Use Cases', 'Scrap yards, fabrication shops, ELV dismantling, and steel service centers.'],
    ],
  },
  'shredders-crackers': {
    name: 'Shredders & Crackers',
    title: 'Shredders & Crackers - Single Shaft, Twin Shaft & Casting Crackers | JHP',
    description: 'Industrial shredders and casting crackers for heavy scrap reduction, pre-shredding, and material preparation.',
    h1: 'Shredders & Crackers for Heavy Scrap and Recycling',
    canonical: '/products/shredders-crackers/',
    intro: 'Choose from single shaft shredders, twin shaft pre-shredders, and casting crackers for robust metal recycling operations.',
    sections: [
      ['Shredding Equipment', 'Single shaft and twin shaft shredders designed for metal, plastic and mixed waste.'],
      ['Cracking Solutions', 'Casting crackers for crushing cast iron and engine scrap.'],
    ],
  },
  'briquetting-machines': {
    name: 'Briquetting Machines',
    title: 'Vertical Briquetting Machines for Metal Chips and Waste | JHP',
    description: 'Vertical briquetting machines for compacting metal chips, turnings and recyclable waste into dense briquettes.',
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
    title: 'Material Handling & Sorting Equipment - Conveyors & MSW Sorting Lines | JHP',
    description: 'Conveyors and MSW sorting lines for streamlined material movement and recycling operations.',
    h1: 'Material Handling & Sorting Equipment',
    canonical: '/products/material-handling-sorting/',
    intro: 'JHP provides conveyors and sorting lines built to move scrap, recyclables and waste streams efficiently through processing systems.',
    sections: [
      ['Solutions', 'Conveyors for scrap and recycling lines plus MSW sorting systems for waste recovery.'],
      ['Efficiency', 'Improved throughput, reduced manual handling, and better material separation.'],
    ],
  },
  'agriculture-waste-recycling': {
    name: 'Agriculture Waste Recycling',
    title: 'Agriculture Waste Recycling Machinery - Fodder Block Machines | JHP',
    description: 'Fodder block making machines for agricultural waste recycling, biomass processing and fodder production.',
    h1: 'Agriculture Waste Recycling Machinery',
    canonical: '/products/agriculture-waste-recycling/',
    intro: 'JHP offers agriculture waste recycling equipment to convert crop residues and biomass into usable fodder blocks.',
    sections: [
      ['Applications', 'Farms, co-operatives, biomass plants, and agricultural waste management facilities.'],
      ['Materials', 'Straw, dry grass, husk, and other agricultural residues.'],
    ],
  },
  'elv-recycling': {
    name: 'ELV Recycling',
    title: 'ELV Recycling Plant Equipment & RVSF Setup | Jindal Hydro Projects',
    description: 'Complete ELV recycling machinery for Registered Vehicle Scrapping Facilities (RVSFs). Car balers, shears, shredders & turnkey plant setup. India\'s 28M ELV opportunity.',
    h1: 'ELV Recycling Plant Equipment - Complete RVSF Machinery Solutions',
    canonical: '/products/elv-recycling/',
    intro: 'JHP supplies the full ELV equipment suite and provides turnkey plant setup and consultancy for Registered Vehicle Scrapping Facilities. Equipment covers car baling, shearing, shredding, high density baling, and material handling.',
    sections: [
      ['Applicable Vehicles', 'Passenger cars, commercial vehicles, buses, trucks, two-wheelers, and auto bodies.'],
      ['Equipment Required', 'Car balers, box shears, alligator shears, hammer mill shredders, twin shaft shredders, and high density balers.'],
      ['Why Set Up an RVSF Now?', 'Vehicle scrapping policy, high scrap value recovery, and end-to-end JHP setup support.'],
    ],
  },
  services: {
    name: 'Services',
    title: 'Installation, Spares & Recycling Plant Consultancy | JHP',
    description: 'Installation, operator training, spares, parts, and consultancy support for hydraulic recycling machinery and ELV recycling plant setup.',
    h1: 'Services - Installation, Spares, Parts and Consultancy',
    canonical: '/products/services/',
    intro: 'Jindal Hydro Projects supports customers with installation, training, spares, parts, and consultancy for recycling machinery and plant setup requirements.',
  },
};

const productSeo = {
  'high-density-baler': {
    canonical: '/products/metal-recycling/balers/high-density-hydraulic-baler/',
    title: 'High Density Hydraulic Baler Manufacturer India | JHP',
    description: 'High density hydraulic baler - up to 450-ton compaction, bale sizes 8x8" to 35x35". HARDOX 500 chamber, PLC control. Manufacturer since 2000. Get specs & quote.',
    h1: 'High Density Hydraulic Baler - Up to 450-Ton Compaction Force',
  },
  'triple-action-baler': {
    canonical: '/products/metal-recycling/balers/triple-action-baler/',
    title: 'Triple Action Hydraulic Baler Manufacturer India | JHP',
    description: 'Triple action hydraulic baler - 3-direction compression, bale sizes 6x6" to 30x30", up to 10 T/hr. Mini to Jumbo Plus range. PLC control. Get specs & quote.',
    h1: 'Triple Action Hydraulic Baler - Three-Direction Compression, 6x6" to 30x30" Bales',
  },
  'hammer-mill-shredder': {
    canonical: '/products/metal-recycling/shredders/hammer-mill-shredder/',
    title: 'Hammer Mill Shredder Manufacturer India | Jindal Hydro Projects',
    description: 'Industrial hammer mill shredder - HARDOX 600 hammers, 1-9 T/hr, full PLC automation, flame-proof design. Processes intact cars, HMS, ELV scrap. Get quote.',
    h1: 'Hammer Mill Shredder - Industrial Metal & Scrap Shredding, 1-9 Tons/Hour',
  },
  'alligator-shear-crocodile-shear': {
    canonical: '/products/metal-recycling/shears/alligator-shear/',
    title: 'Alligator Shear Machine Manufacturer India | JHP',
    description: 'Hydraulic alligator shear - cuts TMT bar, round bar up to 120mm, angle, cable, tubes. 7-14 strokes/min. No civil foundation. Manufacturer since 2000. Get quote.',
    h1: 'Alligator Shear (Crocodile Shear) - Cuts Round Bar Up to 120mm',
  },
  'automatic-baler': {
    canonical: '/products/waste-recycling/automatic-horizontal-baler/',
    title: 'Automatic Horizontal Baler - Paper, PET, Plastic | JHP',
    description: 'Fully automatic horizontal baler for paper, PET bottles, OCC, plastic & foam. Up to 200 tons/shift, HARDOX 400 lined. Manufacturer since 2000. Get quote.',
    h1: 'Automatic Horizontal Baler - Up to 200 Tons per Shift for Paper, PET & Plastic',
  },
  'box-shear-inclined-shear': {
    canonical: '/products/metal-recycling/shears/box-shear-inclined-shear/',
    title: 'Box Shear & Inclined Shear Baler Manufacturer India | JHP',
    description: 'Heavy-duty box shear (shear baler) - HARDOX 600 blades, 3D compression, 6-20 T/hr. Handles railway scrap, ship demolition, car bodies. No civil foundation.',
    h1: 'Box Shear / Inclined Shear (Shear Baler) - Heavy-Duty Metal Scrap Shearing',
  },
  'continuous-baler': {
    canonical: '/products/metal-recycling/balers/continuous-baler/',
    title: 'Continuous Hydraulic Baler - 100-120 Bales/Hour | JHP',
    description: 'Continuous baler for automotive stamping lines and furnaces - no downtime, 4-80 T/hr, 100-120 bales/hr, HARDOX 500 chamber. PAN-India & export.',
    h1: 'Continuous Hydraulic Baler - Uninterrupted Scrap Baling at 100-120 Bales/Hour',
  },
  'quad-baler': {
    canonical: '/products/metal-recycling/balers/quad-baler/',
    title: 'Quad Baler - 4-Cylinder Baling Press Manufacturer India | JHP',
    description: 'Four-cylinder quad baler - 5-35 T/hr, superior all-round compaction for rails, tram tracks, oversized scrap, car bodies. Custom quotation available.',
    h1: 'Quad Baler (Four-Cylinder Baling Press) - Superior All-Round Compaction',
  },
  'consultancy': {
    canonical: '/products/elv-recycling/elv-plant-setup-consultancy/',
    title: 'ELV Recycling Plant Setup & RVSF Equipment | Jindal Hydro Projects',
    description: 'Turnkey ELV recycling plant design, equipment supply, and RVSF setup consultancy. India\'s 28M ELV opportunity. Established 2000. Contact JHP for a consultation.',
    h1: 'ELV Recycling Plant Setup - Turnkey RVSF Equipment & Consultancy',
  },
  'fodder-block-making-machine': {
    canonical: '/products/agriculture-recycling/fodder-block-making-machine/',
    title: 'Fodder Block Making Machine Manufacturer India | JHP',
    description: 'PLC-controlled fodder block making machine - 70-100 blocks/hour, 10-30 kg blocks, semi-auto poly bag packaging. For farms, co-operatives & biomass plants.',
    h1: 'Fodder Block Making Machine - 70-100 Blocks/Hour, PLC Controlled',
  },
  'continuous-shear': {
    canonical: '/products/metal-recycling/shears/continuous-shear/',
    title: 'Continuous Shear Machine Manufacturer India | JHP',
    description: 'Continuous shear for uninterrupted scrap cutting and heavy metal processing. Built for high-volume recycling operations. Contact JHP for specifications and quote.',
    h1: 'Continuous Shear (Container Shear) - Uninterrupted Scrap Cutting',
  },
  'hydraulic-nibbler': {
    canonical: '/products/metal-recycling/shears/hydraulic-nibbler/',
    title: 'Hydraulic Nibbler Machine Manufacturer India | JHP',
    description: 'Hydraulic nibbler for precision metal sheet cutting and scrap processing. Heavy-duty industrial build from Jindal Hydro Projects.',
    h1: 'Hydraulic Nibbler - Precision Metal Sheet Cutting',
  },
  'single-shaft-shredder': {
    canonical: '/products/metal-recycling/shredders/single-shaft-shredder/',
    title: 'Single Shaft Shredder Manufacturer India | JHP',
    description: 'Single shaft shredder for controlled size reduction of plastics, waste, and recycling streams. Request specifications and quote from JHP.',
    h1: 'Single Shaft Shredder - Controlled Size Reduction for Plastics & Waste',
  },
  'twin-shaft-shredder-rotary-shear-pre-shredder': {
    canonical: '/products/metal-recycling/shredders/twin-shaft-shredder/',
    title: 'Twin Shaft Shredder Manufacturer India | JHP',
    description: 'Twin shaft shredder for jam-free pre-shredding of bulky ELV parts, industrial scrap, and recycling material streams.',
    h1: 'Twin Shaft Shredder (Rotary Shear) - Jam-Free Pre-Shredding',
  },
  'casting-cracker': {
    canonical: '/products/metal-recycling/shredders/casting-cracker/',
    title: 'Casting Cracker & Engine Crusher India | JHP',
    description: 'Casting cracker and engine crusher for cast iron crushing and heavy scrap recycling applications. Contact JHP for details.',
    h1: 'Casting Cracker (Engine Cracker) - 3-5 Tons/Hour Cast Iron Crushing',
  },
  'chip-briquetting-machine': {
    canonical: '/products/metal-recycling/briquetting/chip-briquetting-machine/',
    title: 'Chip Briquetting Machine Manufacturer India | JHP',
    description: 'Chip briquetting machine for converting metal chips into high-density briquettes for recycling and recovery.',
    h1: 'Chip Briquetting Machine - Convert Metal Chips to High-Density Briquettes',
  },
  'magnetic-separator-ubc-sorter': {
    canonical: '/products/metal-recycling/material-handling/magnetic-separator-ubc-sorter/',
    title: 'Magnetic Separator & UBC Sorter India | JHP',
    description: 'Magnetic separator and UBC sorter for aluminium sorting and recycling lines. Built for reliable material separation.',
    h1: 'Magnetic Separator & UBC Sorter - Three-Stage Aluminium Sorting System',
  },
  conveyors: {
    canonical: '/products/metal-recycling/material-handling/scrap-handling-conveyors/',
    title: 'Scrap Handling Conveyors - Custom Built India | JHP',
    description: 'Custom-built scrap handling conveyor systems for metal recycling lines, balers, shears, and shredders.',
    h1: 'Scrap Handling Conveyor Systems - Custom-Built for Metal Recycling Lines',
  },
  'grabs-cranes': {
    canonical: '/products/metal-recycling/material-handling/hydraulic-grab-crane/',
    title: 'Hydraulic Grab & Revolving Crane India | JHP',
    description: 'Hydraulic grab and revolving tower crane systems for scrap handling, feeding, and material movement in recycling yards.',
    h1: 'Hydraulic Grab & Revolving Tower Crane for Scrap Handling',
  },
  'scrap-charging-trolley': {
    canonical: '/products/metal-recycling/material-handling/scrap-charging-trolley/',
    title: 'Scrap Charging Trolley Manufacturer India | JHP',
    description: 'Scrap charging trolley for rapid-tilt furnace loading and industrial metal handling applications.',
    h1: 'Scrap Charging Trolley - Rapid-Tilt Furnace Loading',
  },
  'mini-triple-action-baler': {
    canonical: '/products/metal-recycling/balers/mini-triple-action-baler/',
    title: 'Mini Triple Action Baler India | Jindal Hydro',
    description: 'Mini triple action baler for small scrap yards, producing compact 6x6 to 10x10 inch bales with efficient hydraulic compression.',
    h1: 'Mini Triple Action Baler - 6x6" to 10x10" Bales for Small Scrap Yards',
  },
  'double-action-baler': {
    canonical: '/products/metal-recycling/balers/double-action-baler/',
    title: 'Double Action Baler Manufacturer India | JHP',
    description: 'Double action baler with two-ram pressing and three door configurations for scrap compaction and recycling applications.',
    h1: 'Double Action Baler (Two-Ram Press) - Three Door Configurations',
  },
  'single-action-baler': {
    canonical: '/products/metal-recycling/balers/single-action-baler/',
    title: 'Single Action Baler for In-House Scrap | JHP',
    description: 'Single action baler for compact in-house scrap management in workshops, factories, and small recycling operations.',
    h1: 'Single Action Baler - Compact In-House Scrap Management',
  },
  'vertical-baler': {
    canonical: '/products/metal-recycling/balers/vertical-baler/',
    title: 'Vertical Metal Baler - 30-500 Kg Bales | JHP',
    description: 'Vertical hydraulic baler for metal scrap with compact layout and no foundation requirement on select models.',
    h1: 'Vertical Hydraulic Baler for Metal Scrap - Compact, No Foundation Required',
  },
  'super-jumbo-baler': {
    canonical: '/products/metal-recycling/balers/super-jumbo-baler/',
    title: 'Super Jumbo Baler Manufacturer India | JHP',
    description: 'Super jumbo baler with heavy compaction force for industrial scrap yards and high-volume metal recycling operations.',
    h1: 'Super Jumbo Baler - 300-Ton Force for Heavy Industrial Scrap',
  },
  'mobile-baler': {
    canonical: '/products/metal-recycling/balers/mobile-baler/',
    title: 'Mobile Baler for Scrap Processing India | JHP',
    description: 'Mobile baler for remote and multi-site scrap processing with triple-action hydraulic scrap baling capability.',
    h1: 'Mobile Baler - Triple-Action Scrap Baling for Remote & Multi-Site Operations',
  },
  'car-baler': {
    canonical: '/products/metal-recycling/balers/car-baler-elv-compactor/',
    title: 'Car Baler & ELV Vehicle Compactor India | JHP',
    description: 'Car baler and ELV vehicle compactor for registered vehicle scrapping facilities and auto body recycling.',
    h1: 'Car Baler (ELV Vehicle Compactor) - For Registered Vehicle Scrapping Facilities',
  },
  'semi-automatic-baler': {
    canonical: '/products/waste-recycling/semi-automatic-horizontal-baler/',
    title: 'Semi-Auto Horizontal Baler India | JHP',
    description: 'Semi-automatic horizontal baler for waste recycling, paper, plastic, PET, and packaging material streams.',
    h1: 'Semi-Automatic Horizontal Baler - 16-24 Tons per Shift',
  },
  'triple-action-baler-for-waste': {
    canonical: '/products/waste-recycling/triple-action-baler-waste/',
    title: 'Triple Action Waste Baler - No Strapping Needed',
    description: 'Triple action waste baler for high-density paper, plastic, and recyclable waste bales without strapping.',
    h1: 'Triple Action Waste Baler - High-Density Bales Without Strapping',
  },
  'waste-recycling-vertical-baler': {
    canonical: '/products/waste-recycling/vertical-baler-waste/',
    title: 'Vertical Waste Baler - Paper, PET, Plastic | JHP',
    description: 'Vertical waste baler for paper, PET bottles, plastic, cardboard, and compact recycling facilities.',
    h1: 'Vertical Waste Baler - Compact Baling for Paper, PET & Plastic',
  },
  'msw-sorting-line': {
    canonical: '/products/waste-recycling/msw-sorting-line/',
    title: 'MSW Sorting Line Plant Manufacturer India | JHP',
    description: 'MSW sorting line for complete municipal solid waste processing and recycling plant applications.',
    h1: 'MSW Sorting Line - Complete Municipal Solid Waste Processing Plant',
  },
  'straw-baler': {
    canonical: '/products/agriculture-recycling/straw-baler/',
    title: 'Straw Baler for Agricultural Waste India | JHP',
    description: 'Straw baler for agricultural waste baling, biomass handling, bedding, and farm material compaction.',
    h1: 'Straw Baler - Agricultural Waste Baling for Biomass & Bedding',
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
  'triple-action-baler-waste': 'triple-action-baler-for-waste',
  'vertical-baler-waste': 'waste-recycling-vertical-baler',
};

const productDetails = {};

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
    subcategory: listedProduct.subcategory,
    description: `${listedProduct.name} is engineered for dependable industrial duty, consistent output, and simplified maintenance across recycling, fabrication, and hydraulic production environments.`,
    specs: {
      Pressure: 'Up to 315 bar',
      Power: 'Application matched',
      Stroke: 'Custom engineered',
      Material: 'Heavy-duty fabricated steel',
    },
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
  const slug = parts.length >= 4 ? parts[parts.length - 1] : null;
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
  const galleryImages = [
    ['Front View', '/images/homepage.png'],
    ['Side View', '/images/metal-recycling.png'],
    ['Installation View', '/images/infrastructure%202.png'],
    ['Operating View', '/images/infrastructure%203.png'],
    ['Hydraulic System Close-up', '/images/infrastructure%201.png'],
  ];
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
            <div className="product-detail-hero">
              <div className="product-detail-media reveal">
                <img src="/images/homepage.png" alt={`${product.name} - Jindal Hydro Projects`} />
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
                {featureGroups.map((group) => (
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
              <h2>Product Photo Gallery</h2>
              <div className="premium-gallery product-detail-gallery">
                {galleryImages.map(([label, image], index) => (
                  <figure className={index === 0 ? 'gallery-large reveal' : 'reveal'} key={label}>
                    <img src={image} alt={`${product.name} ${label}`} />
                    <figcaption>{label}</figcaption>
                  </figure>
                ))}
              </div>
            </section>

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
    }, 2800);

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
                        <img src="/images/homepage.png" alt={`${product.name} - Jindal Hydro Projects`} loading="lazy" />
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
                          <img src={getCategoryImage(category)} alt={`${category.name} machinery - Jindal Hydro Projects`} loading="lazy" />
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
