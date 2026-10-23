// ------------------------------------------------------------------
// TempleVerse — temple catalogue (English base content).
// 5 real Indian temples. Every fact below is drawn from the public
// documentation of ASI / UNESCO / state tourism & temple boards that
// is listed in each temple's `sources` array. Traditional accounts
// are explicitly marked as tradition, never as documented history.
// ------------------------------------------------------------------

/* Shared, re-usable source records (mirrors the `sources` table) */
export const SOURCES = {
  unesco_chola: {
    id: "src_unesco_chola",
    title: "Great Living Chola Temples — UNESCO World Heritage Centre",
    url: "https://whc.unesco.org/en/list/250/",
    type: "UNESCO World Heritage Centre",
  },
  unesco_konark: {
    id: "src_unesco_konark",
    title: "Sun Temple, Konârak — UNESCO World Heritage Centre",
    url: "https://whc.unesco.org/en/list/246/",
    type: "UNESCO World Heritage Centre",
  },
  unesco_mahabalipuram: {
    id: "src_unesco_mahabalipuram",
    title: "Group of Monuments at Mahabalipuram — UNESCO World Heritage Centre",
    url: "https://whc.unesco.org/en/list/249/",
    type: "UNESCO World Heritage Centre",
  },
  asi: {
    id: "src_asi",
    title: "Archaeological Survey of India",
    url: "https://asi.nic.in/",
    type: "Government of India",
  },
  culture: {
    id: "src_culture",
    title: "Ministry of Culture, Government of India",
    url: "https://www.indiaculture.gov.in/",
    type: "Government of India",
  },
  tn_tourism: {
    id: "src_tn_tourism",
    title: "Tamil Nadu Tourism",
    url: "https://www.tamilnadutourism.tn.gov.in/",
    type: "State Tourism Board",
  },
  tn_hrce: {
    id: "src_tn_hrce",
    title: "Hindu Religious & Charitable Endowments Dept., Tamil Nadu",
    url: "https://hrce.tn.gov.in/",
    type: "State Government Department",
  },
  odisha_tourism: {
    id: "src_odisha_tourism",
    title: "Odisha Tourism",
    url: "https://odishatourism.gov.in/",
    type: "State Tourism Board",
  },
  ttd: {
    id: "src_ttd",
    title: "Tirumala Tirupati Devasthanams (TTD)",
    url: "https://www.tirumala.org/",
    type: "Temple Administration",
  },
  ap_tourism: {
    id: "src_ap_tourism",
    title: "Andhra Pradesh Tourism",
    url: "https://tourism.ap.gov.in/",
    type: "State Tourism Board",
  },
};

export const DEMO_TEMPLES = [
  /* ==================== 1. BRIHADEESWARAR ==================== */
  {
    id: "temple_brihadeeswarar",
    slug: "brihadeeswarar",
    name: "Brihadeeswarar Temple",
    location: "Thanjavur",
    city: "Thanjavur",
    state: "Tamil Nadu",
    country: "India",
    latitude: 10.7828,
    longitude: 79.1318,
    historical_period: "Chola dynasty, completed c. 1010 CE",
    main_deity: "Shiva, worshipped here as Peruvudaiyar / Brihadeeswarar",
    architectural_style: "Dravidian — Chola",
    unesco: true,
    description:
      "A masterpiece of Chola architecture, completed around 1010 CE. It is famed for its 66-metre granite vimana, its vast walled courtyard and the very large Shiva lingam in its sanctum.",
    history:
      "Brihadeeswarar Temple — known in Tamil as Peruvudaiyar Kovil or Thanjai Periya Kovil — was built under the Chola emperor Raja Raja Chola I and completed around 1010 CE. The temple's own walls carry an exceptional body of inscriptions recording endowments of land, gold and cattle, and the appointment of temple staff, musicians and dancers. It was inscribed by UNESCO in 1987 as part of the Great Living Chola Temples, and it remains an active place of worship administered today by the Tamil Nadu HR&CE department.",
    architecture_summary:
      "The temple is built almost entirely of granite on a scale unmatched in its period. Its pyramidal vimana rises in thirteen diminishing storeys above the sanctum, crowned by a large monolithic capstone. The plan is strictly axial: an outer gateway, an inner gateway, an open Nandi pavilion, a long pillared hall and the sanctum, all enclosed by a rectangular walled courtyard lined with cloistered corridors.",
    cultural_significance:
      "The temple is a living record of Chola state religion, economy and the performing arts. Its inscriptions name the musicians and dancers attached to it, making it one of the most important sources for the cultural history of medieval South India. It remains central to Thanjavur's religious calendar.",
    image_url:
      "https://images.pexels.com/photos/37862810/pexels-photo-37862810.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    image_credit: "Roman Saienko / Pexels — Brihadeeswarar Temple, Thanjavur",
    timeline: [
      { year: "c. 985 CE", event: "Raja Raja Chola I ascends the Chola throne." },
      { year: "c. 1003–1010 CE", event: "Construction of the temple; consecration around 1010 CE." },
      { year: "11th–13th c.", event: "Inscriptions record continuous royal and private endowments." },
      { year: "16th–18th c.", event: "Later rulers add subsidiary shrines within the courtyard." },
      { year: "1987", event: "Inscribed by UNESCO as part of the Great Living Chola Temples." },
      { year: "Today", event: "An active temple, protected as a monument of national importance." },
    ],
    gallery: [
      {
        url: "https://images.pexels.com/photos/37862810/pexels-photo-37862810.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        caption: "The temple and its great vimana seen from the courtyard",
        credit: "Roman Saienko / Pexels",
      },
      {
        url: "https://images.pexels.com/photos/5138790/pexels-photo-5138790.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        caption: "The walled courtyard of the Great Living Chola Temple",
        credit: "Aadhithyan Pandian / Pexels",
      },
      {
        url: "https://images.pexels.com/photos/37809031/pexels-photo-37809031.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        caption: "Brihadeeswarar Temple at dawn",
        credit: "Roman Saienko / Pexels",
      },
      {
        url: "https://images.pexels.com/photos/37862812/pexels-photo-37862812.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        caption: "Detail of the temple's Chola stonework",
        credit: "Roman Saienko / Pexels",
      },
      {
        url: "https://images.pexels.com/photos/37826466/pexels-photo-37826466.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        caption: "Gateway architecture at Brihadeeswarar Temple",
        credit: "Roman Saienko / Pexels",
      },
      {
        url: "https://images.pexels.com/photos/37809042/pexels-photo-37809042.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        caption: "Dravidian temple architecture at Thanjavur",
        credit: "Roman Saienko / Pexels",
      },
    ],
    sources: [SOURCES.unesco_chola, SOURCES.asi, SOURCES.tn_hrce, SOURCES.tn_tourism],
    translations: {},
  },

  /* ==================== 2. MEENAKSHI AMMAN ==================== */
  {
    id: "temple_meenakshi",
    slug: "meenakshi",
    name: "Meenakshi Amman Temple",
    location: "Madurai",
    city: "Madurai",
    state: "Tamil Nadu",
    country: "India",
    latitude: 9.9195,
    longitude: 78.1193,
    historical_period: "Ancient origins; present complex largely 16th–17th century (Nayak period)",
    main_deity: "Meenakshi (Parvati) and Sundareswarar (Shiva)",
    architectural_style: "Dravidian — Nayak",
    unesco: false,
    description:
      "A vast temple complex at the heart of Madurai, enclosing fourteen towered gateways, long pillared halls, a sacred tank and the twin shrines of the goddess Meenakshi and her consort Sundareswarar.",
    history:
      "Madurai is one of the oldest continuously inhabited cities in India, and its temple is deeply embedded in Tamil literature — the classical epic Silappatikaram is set in the city. The complex as it stands today was largely built and expanded between the 16th and 17th centuries under the Nayak rulers of Madurai, who added most of its gopurams and mandapas. The temple is administered by the Tamil Nadu HR&CE department and remains one of the busiest pilgrimage centres in South India.",
    architecture_summary:
      "Unlike a single-axis temple, Meenakshi Amman is a concentric temple-city: rectangular enclosures nested within one another, each pierced by gateway towers. Fourteen gopurams rise above the walls, the tallest on the south side. Within, long colonnaded halls connect the two principal shrines, and a stepped tank forms the ceremonial centre of the complex.",
    cultural_significance:
      "The temple gives Madurai its identity. Its annual Chithirai festival, which enacts the marriage of Meenakshi and Sundareswarar, draws immense crowds and shapes the city's calendar. The complex has also long functioned as a centre for Tamil music, dance and scholarship.",
    image_url:
      "https://images.pexels.com/photos/10271157/pexels-photo-10271157.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    image_credit: "Sharath G. / Pexels — Meenakshi Temple gopura, Madurai",
    timeline: [
      { year: "c. 2nd century CE", event: "The Tamil epic Silappatikaram is set in Madurai, describing the city and its worship." },
      { year: "Medieval period", event: "The temple grows as a major Shaiva centre under successive dynasties." },
      { year: "14th century", event: "The complex is damaged during the invasions of the period and later restored." },
      { year: "16th–17th century", event: "Nayak rulers rebuild and greatly expand the complex, adding most gopurams and mandapas." },
      { year: "Modern era", event: "Periodic consecration ceremonies (kumbhabhishekam) renew the painted towers." },
      { year: "Today", event: "An active temple administered by the Tamil Nadu HR&CE department." },
    ],
    gallery: [
      {
        url: "https://images.pexels.com/photos/10271157/pexels-photo-10271157.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        caption: "The sculpted gopura of Meenakshi Amman Temple, Madurai",
        credit: "Sharath G. / Pexels",
      },
    ],
    sources: [SOURCES.tn_hrce, SOURCES.tn_tourism, SOURCES.asi, SOURCES.culture],
    translations: {},
  },

  /* ==================== 3. KONARK SUN TEMPLE ==================== */
  {
    id: "temple_konark",
    slug: "konark",
    name: "Konark Sun Temple",
    location: "Konark",
    city: "Konark",
    state: "Odisha",
    country: "India",
    latitude: 19.8876,
    longitude: 86.0945,
    historical_period: "13th century — Eastern Ganga dynasty",
    main_deity: "Surya, the Sun",
    architectural_style: "Kalinga (Odishan) architecture",
    unesco: true,
    description:
      "A 13th-century temple conceived as the colossal chariot of the sun god — with twenty-four carved stone wheels and teams of horses — and covered from base to roof in sculpture.",
    history:
      "The Sun Temple at Konark was built in the mid-13th century under King Narasimhadeva I of the Eastern Ganga dynasty. Its principal sanctuary tower has collapsed, but the jagamohana (audience hall) survives, along with the vast sculpted chariot platform. The site was inscribed by UNESCO as a World Heritage Site in 1984 and is conserved by the Archaeological Survey of India.",
    architecture_summary:
      "The temple was laid out as a chariot: the plinth carries twenty-four richly carved wheels along its sides, and teams of horses were placed at the front. Behind the entrance stand a detached hall and the great jagamohana with its three-tiered pyramidal roof, and beyond it the ruined base of the sanctuary tower. Almost every surface is carved — with deities, musicians, dancers, animals, and scenes of everyday life.",
    cultural_significance:
      "Konark is one of the supreme achievements of Indian temple sculpture and a defining monument of Odishan identity; its wheel is used as a national emblem of Indian heritage. The annual Konark Dance Festival, held before the monument, continues its long association with the performing arts.",
    image_url:
      "https://images.pexels.com/photos/31598958/pexels-photo-31598958.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    image_credit: "Rajneesh Narula / Pexels — carved wheel, Konark Sun Temple",
    timeline: [
      { year: "1238–1264 CE", event: "Reign of Narasimhadeva I of the Eastern Ganga dynasty." },
      { year: "Mid-13th century", event: "The Sun Temple is built as a monumental chariot for Surya." },
      { year: "Later centuries", event: "The sanctuary tower collapses; the causes are debated by historians." },
      { year: "Early 20th century", event: "Conservation work stabilises the jagamohana, which is filled internally for support." },
      { year: "1984", event: "Inscribed by UNESCO as a World Heritage Site." },
      { year: "Today", event: "A protected monument conserved by the Archaeological Survey of India." },
    ],
    gallery: [
      {
        url: "https://images.pexels.com/photos/31598958/pexels-photo-31598958.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        caption: "One of the twenty-four carved chariot wheels",
        credit: "Rajneesh Narula / Pexels",
      },
      {
        url: "https://images.pexels.com/photos/37437100/pexels-photo-37437100.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        caption: "Detail of a chariot wheel hub and spokes",
        credit: "Krishnendu Biswas / Pexels",
      },
      {
        url: "https://images.pexels.com/photos/12871861/pexels-photo-12871861.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        caption: "The surviving jagamohana at Konark",
        credit: "Suman Sutradhar / Pexels",
      },
      {
        url: "https://images.pexels.com/photos/37437099/pexels-photo-37437099.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        caption: "Carved figures on the temple walls",
        credit: "Krishnendu Biswas / Pexels",
      },
      {
        url: "https://images.pexels.com/photos/37437098/pexels-photo-37437098.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        caption: "Sculptural bands covering the temple surface",
        credit: "Krishnendu Biswas / Pexels",
      },
      {
        url: "https://images.pexels.com/photos/32888176/pexels-photo-32888176.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        caption: "Visitors at the Sun Temple complex",
        credit: "Prabin Kumar / Pexels",
      },
    ],
    sources: [SOURCES.unesco_konark, SOURCES.asi, SOURCES.odisha_tourism, SOURCES.culture],
    translations: {},
  },

  /* ==================== 4. SRI VENKATESWARA, TIRUMALA ==================== */
  {
    id: "temple_tirumala",
    slug: "tirumala",
    name: "Sri Venkateswara Temple, Tirumala",
    location: "Tirumala, Tirupati",
    city: "Tirupati",
    state: "Andhra Pradesh",
    country: "India",
    latitude: 13.6833,
    longitude: 79.3474,
    historical_period: "Inscriptions from c. 9th century onward; major expansion under Vijayanagara rule",
    main_deity: "Venkateswara (Vishnu), also called Srinivasa and Balaji",
    architectural_style: "Dravidian",
    unesco: false,
    description:
      "A hill temple in the Tirumala range dedicated to Venkateswara, a form of Vishnu. It is among the most visited pilgrimage destinations in the world and is administered by Tirumala Tirupati Devasthanams.",
    history:
      "The temple stands on the Tirumala hills above Tirupati. Its walls and copper plates preserve a long series of inscriptions and endowments beginning in the early medieval period, recording gifts from Pallava, Chola, Pandya and — most extensively — Vijayanagara rulers. Krishnadevaraya of Vijayanagara was among its most celebrated patrons in the early 16th century. Since 1933 the temple and its associated institutions have been administered by Tirumala Tirupati Devasthanams (TTD).",
    architecture_summary:
      "The temple follows a Dravidian plan of concentric enclosures. Pilgrims pass through the main gateway tower into an outer circumambulatory path, then an inner one, before reaching the sanctum. The sanctum is crowned by the gilded vimana known as Ananda Nilayam. Two successive doorways — a silver one and a gilded one — mark the final approach to the deity.",
    cultural_significance:
      "Tirumala is one of the largest centres of pilgrimage anywhere in the world, receiving very large numbers of devotees daily. Its practices of hair-offering (mundan), the queue system, and the distribution of the Tirupati laddu — which holds a Geographical Indication tag — are known throughout India.",
    image_url:
      "https://images.pexels.com/photos/28310432/pexels-photo-28310432.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    image_credit: "Mihran Kes / Pexels — Sri Venkateswara Temple architecture",
    timeline: [
      { year: "c. 9th century", event: "Earliest surviving inscriptions record gifts to the hill temple." },
      { year: "11th–13th century", event: "Chola and Pandya rulers make endowments to the shrine." },
      { year: "Early 16th century", event: "Krishnadevaraya of Vijayanagara makes major donations recorded in inscriptions." },
      { year: "1933", event: "Tirumala Tirupati Devasthanams (TTD) is constituted to administer the temple." },
      { year: "Modern era", event: "Large-scale pilgrim facilities, queue complexes and free meal services are developed." },
      { year: "Today", event: "One of the most visited places of worship in the world." },
    ],
    gallery: [
      {
        url: "https://images.pexels.com/photos/28310432/pexels-photo-28310432.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        caption: "Detailed temple architecture at Sri Venkateswara Temple",
        credit: "Mihran Kes / Pexels",
      },
      {
        url: "https://images.pexels.com/photos/36771235/pexels-photo-36771235.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        caption: "The temple at Tirupati with a traditional oil lamp",
        credit: "Vijay Richhiya / Pexels",
      },
      {
        url: "https://images.pexels.com/photos/36771239/pexels-photo-36771239.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        caption: "The sacred temple tank at Tirupati",
        credit: "Vijay Richhiya / Pexels",
      },
      {
        url: "https://images.pexels.com/photos/36771232/pexels-photo-36771232.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        caption: "A temple procession at Tirumala",
        credit: "Vijay Richhiya / Pexels",
      },
    ],
    sources: [SOURCES.ttd, SOURCES.ap_tourism, SOURCES.culture],
    translations: {},
  },

  /* ==================== 5. SHORE TEMPLE, MAHABALIPURAM ==================== */
  {
    id: "temple_shore",
    slug: "shore-temple",
    name: "Shore Temple, Mahabalipuram",
    location: "Mamallapuram (Mahabalipuram)",
    city: "Mamallapuram",
    state: "Tamil Nadu",
    country: "India",
    latitude: 12.6161,
    longitude: 80.1995,
    historical_period: "Early 8th century CE — Pallava dynasty",
    main_deity: "Shiva (two shrines) and Vishnu as Anantashayana (one shrine)",
    architectural_style: "Dravidian — Pallava",
    unesco: true,
    description:
      "An early 8th-century Pallava temple built of cut granite blocks beside the Bay of Bengal, part of the UNESCO-listed Group of Monuments at Mahabalipuram.",
    history:
      "The Shore Temple was built in the early 8th century CE during the reign of the Pallava king Narasimhavarman II, known as Rajasimha. It marks an important transition in South Indian architecture, from the rock-cut caves and monolithic rathas of the earlier Pallava period to fully structural temples built from dressed stone. It stands within the Group of Monuments at Mahabalipuram, inscribed by UNESCO in 1984 and conserved by the Archaeological Survey of India.",
    architecture_summary:
      "Unusually, the complex contains three shrines: two dedicated to Shiva, facing east and west, and between them a shrine housing a reclining Vishnu carved from the living rock. The tiered pyramidal towers are slender and steeply stepped, and the surrounding compound wall is topped by rows of seated bull (Nandi) figures. Centuries of sea wind have softened much of the exterior carving.",
    cultural_significance:
      "Mahabalipuram was a port city of the Pallavas and a great workshop of stone carving whose influence spread across South and Southeast Asia. The Shore Temple is the emblem of that achievement, and the wider site — with its rathas, cave temples and giant open-air relief — is one of the most important collections of early Dravidian art anywhere.",
    image_url:
      "https://images.pexels.com/photos/37584854/pexels-photo-37584854.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    image_credit: "Roman Saienko / Pexels — Shore Temple, Mahabalipuram",
    timeline: [
      { year: "c. 630–668 CE", event: "Reign of Narasimhavarman I; rock-cut caves and monolithic rathas are carved at Mamallapuram." },
      { year: "c. 700–728 CE", event: "Reign of Narasimhavarman II (Rajasimha), to whom the Shore Temple is attributed." },
      { year: "Early 8th century", event: "The Shore Temple is built as a structural temple of dressed granite." },
      { year: "Later centuries", event: "Sea winds and salt erode much of the exterior sculpture." },
      { year: "1984", event: "Inscribed by UNESCO within the Group of Monuments at Mahabalipuram." },
      { year: "Modern era", event: "Protective barriers and conservation work by the ASI stabilise the site." },
    ],
    gallery: [
      {
        url: "https://images.pexels.com/photos/37584854/pexels-photo-37584854.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        caption: "The Shore Temple at sunset",
        credit: "Roman Saienko / Pexels",
      },
      {
        url: "https://images.pexels.com/photos/38412970/pexels-photo-38412970.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        caption: "The Shore Temple, a UNESCO World Heritage site",
        credit: "Roman Saienko / Pexels",
      },
      {
        url: "https://images.pexels.com/photos/35307623/pexels-photo-35307623.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        caption: "Stone carvings of the Shore Temple against the sky",
        credit: "Dhinesh Kumar / Pexels",
      },
      {
        url: "https://images.pexels.com/photos/24246704/pexels-photo-24246704.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        caption: "Carving detail on the Shore Temple",
        credit: "Ankit Bhattacharjee / Pexels",
      },
      {
        url: "https://images.pexels.com/photos/33516545/pexels-photo-33516545.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        caption: "Rock carvings at the Mahabalipuram monuments",
        credit: "M Shah / Pexels",
      },
      {
        url: "https://images.pexels.com/photos/38198563/pexels-photo-38198563.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        caption: "Stone monuments in the Mahabalipuram group",
        credit: "Roman Saienko / Pexels",
      },
    ],
    sources: [SOURCES.unesco_mahabalipuram, SOURCES.asi, SOURCES.tn_tourism, SOURCES.culture],
    translations: {},
  },
];
