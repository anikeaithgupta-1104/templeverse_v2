-- ============================================================
-- TEMPLEVERSE — seed data
-- 5 real Indian temples • 38 locations • 5 languages
--
-- Run AFTER supabase/schema.sql.
--
-- NOTE ON CONTENT OWNERSHIP
-- The canonical, human-verified content lives in the application
-- content modules:
--     src/data/temples.js          (temples, timelines, galleries, sources)
--     src/data/locations.js        (38 locations + long-form sections)
--     src/data/guidedSteps.js      (30 guided steps)
--     src/data/{ta,hi,te,ml}*.js   (verified translations)
-- This file seeds the relational structure — languages, sources,
-- temples, timelines, locations and guided steps. The long-form
-- narrative columns (story / architecture / rituals / significance)
-- and the translation tables are bulk-loaded from those modules so
-- that there is a single reviewed source of truth for the text.
-- ============================================================

-- ---------------- LANGUAGES ----------------
insert into public.languages (id, code, name, native_name, bcp47) values
  ('10000000-0000-4000-8000-000000000001', 'en', 'English',   'English',   'en-IN'),
  ('10000000-0000-4000-8000-000000000002', 'hi', 'Hindi',     'हिन्दी',      'hi-IN'),
  ('10000000-0000-4000-8000-000000000003', 'te', 'Telugu',    'తెలుగు',     'te-IN'),
  ('10000000-0000-4000-8000-000000000004', 'ta', 'Tamil',     'தமிழ்',      'ta-IN'),
  ('10000000-0000-4000-8000-000000000005', 'ml', 'Malayalam', 'മലയാളം',   'ml-IN')
on conflict (code) do nothing;

-- ---------------- SOURCES ----------------
insert into public.sources (id, title, url, source_type) values
  ('50000000-0000-4000-8000-000000000001', 'Great Living Chola Temples — UNESCO World Heritage Centre', 'https://whc.unesco.org/en/list/250/', 'UNESCO World Heritage Centre'),
  ('50000000-0000-4000-8000-000000000002', 'Sun Temple, Konârak — UNESCO World Heritage Centre', 'https://whc.unesco.org/en/list/246/', 'UNESCO World Heritage Centre'),
  ('50000000-0000-4000-8000-000000000003', 'Group of Monuments at Mahabalipuram — UNESCO World Heritage Centre', 'https://whc.unesco.org/en/list/249/', 'UNESCO World Heritage Centre'),
  ('50000000-0000-4000-8000-000000000004', 'Archaeological Survey of India', 'https://asi.nic.in/', 'Government of India'),
  ('50000000-0000-4000-8000-000000000005', 'Ministry of Culture, Government of India', 'https://www.indiaculture.gov.in/', 'Government of India'),
  ('50000000-0000-4000-8000-000000000006', 'Tamil Nadu Tourism', 'https://www.tamilnadutourism.tn.gov.in/', 'State Tourism Board'),
  ('50000000-0000-4000-8000-000000000007', 'Hindu Religious & Charitable Endowments Dept., Tamil Nadu', 'https://hrce.tn.gov.in/', 'State Government Department'),
  ('50000000-0000-4000-8000-000000000008', 'Odisha Tourism', 'https://odishatourism.gov.in/', 'State Tourism Board'),
  ('50000000-0000-4000-8000-000000000009', 'Tirumala Tirupati Devasthanams (TTD)', 'https://www.tirumala.org/', 'Temple Administration'),
  ('50000000-0000-4000-8000-00000000000a', 'Andhra Pradesh Tourism', 'https://tourism.ap.gov.in/', 'State Tourism Board');

-- ---------------- TEMPLES ----------------
insert into public.temples
  (id, slug, name, location, city, state, country, latitude, longitude,
   description, history, architecture_summary, cultural_significance,
   main_deity, architectural_style, historical_period, unesco, image_url, image_credit)
values
(
  '20000000-0000-4000-8000-000000000001', 'brihadeeswarar', 'Brihadeeswarar Temple',
  'Thanjavur', 'Thanjavur', 'Tamil Nadu', 'India', 10.7828, 79.1318,
  'A masterpiece of Chola architecture, completed around 1010 CE. It is famed for its 66-metre granite vimana, its vast walled courtyard and the very large Shiva lingam in its sanctum.',
  'Brihadeeswarar Temple, known in Tamil as Peruvudaiyar Kovil, was built under the Chola emperor Raja Raja Chola I and completed around 1010 CE. Its walls carry an exceptional body of inscriptions recording endowments of land, gold and cattle, and the appointment of temple staff, musicians and dancers. It was inscribed by UNESCO in 1987 as part of the Great Living Chola Temples and remains an active place of worship.',
  'Built almost entirely of granite on a scale unmatched in its period. The pyramidal vimana rises in thirteen diminishing storeys above the sanctum. The plan is strictly axial: outer gateway, inner gateway, open Nandi pavilion, pillared hall and sanctum, all enclosed by a rectangular walled courtyard with cloistered corridors.',
  'A living record of Chola state religion, economy and the performing arts. Its inscriptions name the musicians and dancers attached to it, making it a key source for the cultural history of medieval South India.',
  'Shiva, worshipped here as Peruvudaiyar / Brihadeeswarar', 'Dravidian — Chola', 'Chola dynasty, completed c. 1010 CE', true,
  'https://images.pexels.com/photos/37862810/pexels-photo-37862810.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
  'Roman Saienko / Pexels — Brihadeeswarar Temple, Thanjavur'
),
(
  '20000000-0000-4000-8000-000000000002', 'meenakshi', 'Meenakshi Amman Temple',
  'Madurai', 'Madurai', 'Tamil Nadu', 'India', 9.9195, 78.1193,
  'A vast temple complex at the heart of Madurai, enclosing fourteen towered gateways, long pillared halls, a sacred tank and the twin shrines of the goddess Meenakshi and her consort Sundareswarar.',
  'Madurai is one of the oldest continuously inhabited cities in India, and its temple is deeply embedded in Tamil literature. The complex as it stands today was largely built and expanded between the 16th and 17th centuries under the Nayak rulers of Madurai, who added most of its gopurams and mandapas. It is administered by the Tamil Nadu HR&CE department.',
  'A concentric temple-city: rectangular enclosures nested within one another, each pierced by gateway towers. Fourteen gopurams rise above the walls, the tallest on the south side. Long colonnaded halls connect the two principal shrines, and a stepped tank forms the ceremonial centre.',
  'The temple gives Madurai its identity. Its annual Chithirai festival, enacting the marriage of Meenakshi and Sundareswarar, shapes the city calendar. The complex has long been a centre for Tamil music, dance and scholarship.',
  'Meenakshi (Parvati) and Sundareswarar (Shiva)', 'Dravidian — Nayak', 'Ancient origins; present complex largely 16th–17th century', false,
  'https://images.pexels.com/photos/10271157/pexels-photo-10271157.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
  'Sharath G. / Pexels — Meenakshi Temple gopura, Madurai'
),
(
  '20000000-0000-4000-8000-000000000003', 'konark', 'Konark Sun Temple',
  'Konark', 'Konark', 'Odisha', 'India', 19.8876, 86.0945,
  'A 13th-century temple conceived as the colossal chariot of the sun god, with twenty-four carved stone wheels and teams of horses, covered from base to roof in sculpture.',
  'Built in the mid-13th century under King Narasimhadeva I of the Eastern Ganga dynasty. The principal sanctuary tower has collapsed, but the jagamohana survives along with the sculpted chariot platform. Inscribed by UNESCO in 1984 and conserved by the Archaeological Survey of India.',
  'Laid out as a chariot: the plinth carries twenty-four richly carved wheels, with teams of horses at the front. Behind the entrance stand a detached hall and the great jagamohana with its three-tiered pyramidal roof, and beyond it the ruined base of the sanctuary tower.',
  'One of the supreme achievements of Indian temple sculpture and a defining monument of Odishan identity; its wheel is used as an emblem of Indian heritage. The annual Konark Dance Festival continues its association with the performing arts.',
  'Surya, the Sun', 'Kalinga (Odishan) architecture', '13th century — Eastern Ganga dynasty', true,
  'https://images.pexels.com/photos/31598958/pexels-photo-31598958.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
  'Rajneesh Narula / Pexels — carved wheel, Konark Sun Temple'
),
(
  '20000000-0000-4000-8000-000000000004', 'tirumala', 'Sri Venkateswara Temple, Tirumala',
  'Tirumala, Tirupati', 'Tirupati', 'Andhra Pradesh', 'India', 13.6833, 79.3474,
  'A hill temple in the Tirumala range dedicated to Venkateswara, a form of Vishnu. It is among the most visited pilgrimage destinations in the world and is administered by Tirumala Tirupati Devasthanams.',
  'The temple walls and copper plates preserve a long series of inscriptions and endowments beginning in the early medieval period, recording gifts from Pallava, Chola, Pandya and, most extensively, Vijayanagara rulers. Krishnadevaraya was among its most celebrated patrons in the early 16th century. Since 1933 the temple has been administered by Tirumala Tirupati Devasthanams.',
  'A Dravidian plan of concentric enclosures. Pilgrims pass through the main gateway tower into an outer circumambulatory path, then an inner one, before reaching the sanctum, which is crowned by the gilded vimana known as Ananda Nilayam. Two successive doorways, one silver and one gilded, mark the final approach.',
  'One of the largest centres of pilgrimage anywhere in the world. Its practices of hair-offering, the queue system and the distribution of the Tirupati laddu, which holds a Geographical Indication tag, are known throughout India.',
  'Venkateswara (Vishnu), also called Srinivasa and Balaji', 'Dravidian', 'Inscriptions from c. 9th century; major Vijayanagara expansion', false,
  'https://images.pexels.com/photos/28310432/pexels-photo-28310432.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
  'Mihran Kes / Pexels — Sri Venkateswara Temple architecture'
),
(
  '20000000-0000-4000-8000-000000000005', 'shore-temple', 'Shore Temple, Mahabalipuram',
  'Mamallapuram (Mahabalipuram)', 'Mamallapuram', 'Tamil Nadu', 'India', 12.6161, 80.1995,
  'An early 8th-century Pallava temple built of cut granite blocks beside the Bay of Bengal, part of the UNESCO-listed Group of Monuments at Mahabalipuram.',
  'Built in the early 8th century CE during the reign of the Pallava king Narasimhavarman II, known as Rajasimha. It marks the transition from rock-cut caves and monolithic rathas to fully structural temples of dressed stone. Inscribed by UNESCO in 1984 and conserved by the Archaeological Survey of India.',
  'The complex contains three shrines: two dedicated to Shiva, facing east and west, and between them a shrine housing a reclining Vishnu carved from the living rock. The tiered pyramidal towers are slender and steeply stepped, and the compound wall is topped by rows of seated bull figures.',
  'Mahabalipuram was a Pallava port and a great workshop of stone carving whose influence spread across South and Southeast Asia. The Shore Temple is the emblem of that achievement.',
  'Shiva (two shrines) and Vishnu as Anantashayana (one shrine)', 'Dravidian — Pallava', 'Early 8th century CE — Pallava dynasty', true,
  'https://images.pexels.com/photos/37584854/pexels-photo-37584854.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
  'Roman Saienko / Pexels — Shore Temple, Mahabalipuram'
);

-- ---------------- TEMPLE ↔ SOURCES ----------------
insert into public.temple_sources (temple_id, source_id) values
  ('20000000-0000-4000-8000-000000000001','50000000-0000-4000-8000-000000000001'),
  ('20000000-0000-4000-8000-000000000001','50000000-0000-4000-8000-000000000004'),
  ('20000000-0000-4000-8000-000000000001','50000000-0000-4000-8000-000000000007'),
  ('20000000-0000-4000-8000-000000000001','50000000-0000-4000-8000-000000000006'),
  ('20000000-0000-4000-8000-000000000002','50000000-0000-4000-8000-000000000007'),
  ('20000000-0000-4000-8000-000000000002','50000000-0000-4000-8000-000000000006'),
  ('20000000-0000-4000-8000-000000000002','50000000-0000-4000-8000-000000000004'),
  ('20000000-0000-4000-8000-000000000002','50000000-0000-4000-8000-000000000005'),
  ('20000000-0000-4000-8000-000000000003','50000000-0000-4000-8000-000000000002'),
  ('20000000-0000-4000-8000-000000000003','50000000-0000-4000-8000-000000000004'),
  ('20000000-0000-4000-8000-000000000003','50000000-0000-4000-8000-000000000008'),
  ('20000000-0000-4000-8000-000000000003','50000000-0000-4000-8000-000000000005'),
  ('20000000-0000-4000-8000-000000000004','50000000-0000-4000-8000-000000000009'),
  ('20000000-0000-4000-8000-000000000004','50000000-0000-4000-8000-00000000000a'),
  ('20000000-0000-4000-8000-000000000004','50000000-0000-4000-8000-000000000005'),
  ('20000000-0000-4000-8000-000000000005','50000000-0000-4000-8000-000000000003'),
  ('20000000-0000-4000-8000-000000000005','50000000-0000-4000-8000-000000000004'),
  ('20000000-0000-4000-8000-000000000005','50000000-0000-4000-8000-000000000006'),
  ('20000000-0000-4000-8000-000000000005','50000000-0000-4000-8000-000000000005');

-- ---------------- TIMELINES ----------------
insert into public.temple_timeline (temple_id, year_label, event, display_order) values
  ('20000000-0000-4000-8000-000000000001','c. 985 CE','Raja Raja Chola I ascends the Chola throne.',1),
  ('20000000-0000-4000-8000-000000000001','c. 1003–1010 CE','Construction of the temple; consecration around 1010 CE.',2),
  ('20000000-0000-4000-8000-000000000001','11th–13th c.','Inscriptions record continuous royal and private endowments.',3),
  ('20000000-0000-4000-8000-000000000001','16th–18th c.','Later rulers add subsidiary shrines within the courtyard.',4),
  ('20000000-0000-4000-8000-000000000001','1987','Inscribed by UNESCO as part of the Great Living Chola Temples.',5),
  ('20000000-0000-4000-8000-000000000002','c. 2nd century CE','The Tamil epic Silappatikaram is set in Madurai.',1),
  ('20000000-0000-4000-8000-000000000002','14th century','The complex is damaged during the invasions of the period and later restored.',2),
  ('20000000-0000-4000-8000-000000000002','16th–17th century','Nayak rulers rebuild and greatly expand the complex.',3),
  ('20000000-0000-4000-8000-000000000002','Modern era','Periodic consecration ceremonies renew the painted towers.',4),
  ('20000000-0000-4000-8000-000000000003','1238–1264 CE','Reign of Narasimhadeva I of the Eastern Ganga dynasty.',1),
  ('20000000-0000-4000-8000-000000000003','Mid-13th century','The Sun Temple is built as a monumental chariot for Surya.',2),
  ('20000000-0000-4000-8000-000000000003','Later centuries','The sanctuary tower collapses; the causes are debated by historians.',3),
  ('20000000-0000-4000-8000-000000000003','Early 20th century','Conservation work fills the jagamohana internally for support.',4),
  ('20000000-0000-4000-8000-000000000003','1984','Inscribed by UNESCO as a World Heritage Site.',5),
  ('20000000-0000-4000-8000-000000000004','c. 9th century','Earliest surviving inscriptions record gifts to the hill temple.',1),
  ('20000000-0000-4000-8000-000000000004','11th–13th century','Chola and Pandya rulers make endowments to the shrine.',2),
  ('20000000-0000-4000-8000-000000000004','Early 16th century','Krishnadevaraya of Vijayanagara makes major recorded donations.',3),
  ('20000000-0000-4000-8000-000000000004','1933','Tirumala Tirupati Devasthanams is constituted to administer the temple.',4),
  ('20000000-0000-4000-8000-000000000005','c. 630–668 CE','Reign of Narasimhavarman I; rock-cut caves and rathas are carved.',1),
  ('20000000-0000-4000-8000-000000000005','c. 700–728 CE','Reign of Narasimhavarman II (Rajasimha).',2),
  ('20000000-0000-4000-8000-000000000005','Early 8th century','The Shore Temple is built as a structural temple of dressed granite.',3),
  ('20000000-0000-4000-8000-000000000005','1984','Inscribed by UNESCO within the Group of Monuments at Mahabalipuram.',4);

-- ---------------- LOCATIONS ----------------
-- image_url is deliberately NULL where no verified photograph of that
-- specific feature exists; the app renders an architectural placeholder.
insert into public.temple_locations (temple_id, name, type, description, map_x, map_y, image_url, display_order) values
-- Brihadeeswarar
('20000000-0000-4000-8000-000000000001','Keralanthakan Tiruvasal (Outer Gateway)','gopuram','The outer gateway of the temple, named after a title borne by Raja Raja Chola I.',50,8,'https://images.pexels.com/photos/37809042/pexels-photo-37809042.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',1),
('20000000-0000-4000-8000-000000000001','Rajarajan Tiruvasal (Inner Gateway)','gopuram','The inner and more elaborately carved gateway, opening onto the great courtyard.',50,20,'https://images.pexels.com/photos/37826466/pexels-photo-37826466.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',2),
('20000000-0000-4000-8000-000000000001','Nandi Mandapam','mandapam','An open pillared pavilion sheltering a very large monolithic Nandi facing the sanctum.',50,32,null,3),
('20000000-0000-4000-8000-000000000001','Garbhagriha (Main Sanctum)','shrine','The sanctum at the heart of the temple, enshrining a very large Shiva lingam.',50,50,null,4),
('20000000-0000-4000-8000-000000000001','Chola Fresco Corridor','gallery','A dark circumambulatory passage preserving rare Chola-period wall paintings.',28,50,null,5),
('20000000-0000-4000-8000-000000000001','The Great Vimana','tower','The pyramidal tower above the sanctum, roughly 66 metres tall.',50,62,'https://images.pexels.com/photos/37862812/pexels-photo-37862812.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',6),
('20000000-0000-4000-8000-000000000001','Subsidiary Shrines','shrine','Smaller courtyard shrines including those of the Goddess and Chandeshvara.',22,76,null,7),
('20000000-0000-4000-8000-000000000001','The Great Prakara (Courtyard)','complex','The vast walled courtyard, lined on all sides by cloistered pillared corridors.',76,76,'https://images.pexels.com/photos/5138790/pexels-photo-5138790.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',8),
-- Meenakshi
('20000000-0000-4000-8000-000000000002','The Gopurams (Gateway Towers)','gopuram','Fourteen towered gateways rise above the temple walls; the southern tower is the tallest.',50,8,'https://images.pexels.com/photos/10271157/pexels-photo-10271157.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',1),
('20000000-0000-4000-8000-000000000002','Ashta Shakthi Mandapam','hall','The pillared hall inside the eastern entrance, named for its eight forms of the goddess.',50,20,null,2),
('20000000-0000-4000-8000-000000000002','Thousand Pillar Hall','hall','A 16th-century hall celebrated for its carved pillars, including musical columns.',20,32,null,3),
('20000000-0000-4000-8000-000000000002','Meenakshi Shrine','shrine','The sanctum of the goddess Meenakshi, the presiding deity of Madurai.',36,50,null,4),
('20000000-0000-4000-8000-000000000002','Sundareswarar Shrine','shrine','The shrine of Sundareswarar, the form in which Shiva is worshipped at Madurai.',68,48,null,5),
('20000000-0000-4000-8000-000000000002','Oonjal Mandapam (Swing Hall)','hall','The hall containing the ceremonial swing used each Friday evening.',26,62,null,6),
('20000000-0000-4000-8000-000000000002','Pottramarai Kulam (Golden Lotus Tank)','pond','The stepped sacred tank at the centre of the complex.',50,72,null,7),
('20000000-0000-4000-8000-000000000002','Kalyana Mandapam (Marriage Hall)','hall','The ceremonial hall of the annual re-enactment of the divine marriage.',76,84,null,8),
-- Konark
('20000000-0000-4000-8000-000000000003','Simha Dwara (Lion Gate)','entrance','The eastern approach, marked by large sculpted lions set above crouching elephants.',50,8,null,1),
('20000000-0000-4000-8000-000000000003','Bhoga Mandapa (Hall of Offerings)','hall','A detached pillared platform near the entrance for food offerings.',50,20,null,2),
('20000000-0000-4000-8000-000000000003','Natya Mandapa (Dance Hall)','hall','The roofless pillared platform covered with figures of musicians and dancers.',26,34,'https://images.pexels.com/photos/37437098/pexels-photo-37437098.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',3),
('20000000-0000-4000-8000-000000000003','The Chariot Wheels and Horses','chariot','Twenty-four elaborately carved wheels line the platform, with horses at the front.',76,38,'https://images.pexels.com/photos/37437100/pexels-photo-37437100.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',4),
('20000000-0000-4000-8000-000000000003','Jagamohana (Audience Hall)','hall','The great pyramidal hall that still stands — the largest surviving structure.',50,50,'https://images.pexels.com/photos/12871861/pexels-photo-12871861.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',5),
('20000000-0000-4000-8000-000000000003','Navagraha Panel','gallery','A carved slab depicting the nine planetary deities, originally set above a doorway.',28,62,'https://images.pexels.com/photos/37437099/pexels-photo-37437099.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',6),
('20000000-0000-4000-8000-000000000003','Deul (Sanctuary Ruins)','shrine','The base of the sanctuary tower that once housed the image of Surya.',50,68,null,7),
('20000000-0000-4000-8000-000000000003','Temple Grounds and Mayadevi Temple','complex','The wider enclosure containing subsidiary structures and the Mayadevi Temple.',76,80,'https://images.pexels.com/photos/32888176/pexels-photo-32888176.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',8),
-- Tirumala
('20000000-0000-4000-8000-000000000004','Mahadwaram (Main Gateway)','gopuram','The principal gateway tower through which pilgrims enter the temple.',50,10,'https://images.pexels.com/photos/36771235/pexels-photo-36771235.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',1),
('20000000-0000-4000-8000-000000000004','Sampangi Pradakshinam (Outer Circuit)','complex','The outer circumambulatory passage lined with halls and shrines.',50,24,null,2),
('20000000-0000-4000-8000-000000000004','Dhwajastambham (Flagstaff)','tower','The gilded flagstaff standing on the temple central axis before the sanctum.',28,36,null,3),
('20000000-0000-4000-8000-000000000004','Bangaru Vakili (The Golden Doorway)','shrine','The gilded doorway forming the final entrance before the sanctum.',50,54,null,4),
('20000000-0000-4000-8000-000000000004','Ananda Nilayam (Sanctum and Gilded Vimana)','shrine','The sanctum housing the image of Venkateswara, crowned by the gilded tower.',50,68,'https://images.pexels.com/photos/28310432/pexels-photo-28310432.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',5),
('20000000-0000-4000-8000-000000000004','Swami Pushkarini (Sacred Tank)','pond','The temple tank where pilgrims traditionally bathe before darshan.',24,78,'https://images.pexels.com/photos/36771239/pexels-photo-36771239.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',6),
('20000000-0000-4000-8000-000000000004','Varahaswami Temple','shrine','A separate shrine on the tank bank dedicated to Varaha.',76,78,null,7),
-- Shore Temple
('20000000-0000-4000-8000-000000000005','The Shore Temple Complex','complex','The walled seaside enclosure containing the three shrines.',50,10,'https://images.pexels.com/photos/38412970/pexels-photo-38412970.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',1),
('20000000-0000-4000-8000-000000000005','Nandi Compound Wall','complex','The low enclosure wall topped by rows of seated bull figures.',50,24,'https://images.pexels.com/photos/24246704/pexels-photo-24246704.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',2),
('20000000-0000-4000-8000-000000000005','Kshatriyasimhesvara (Main Shiva Shrine)','shrine','The taller of the two Shiva shrines, facing east towards the sea.',60,44,'https://images.pexels.com/photos/37584854/pexels-photo-37584854.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',3),
('20000000-0000-4000-8000-000000000005','Anantashayana Vishnu Shrine','shrine','A shrine containing a reclining Vishnu carved from the bedrock.',44,56,'https://images.pexels.com/photos/35307623/pexels-photo-35307623.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',4),
('20000000-0000-4000-8000-000000000005','Pancha Rathas (Five Monolithic Shrines)','gallery','Five temples, each carved from a single outcrop of granite.',20,74,'https://images.pexels.com/photos/38198563/pexels-photo-38198563.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',5),
('20000000-0000-4000-8000-000000000005','Arjuna Penance (Descent of the Ganges)','gallery','An immense open-air bas-relief carved across two adjoining boulders.',50,82,'https://images.pexels.com/photos/33516545/pexels-photo-33516545.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',6),
('20000000-0000-4000-8000-000000000005','Olakkanesvara Temple and Cave Shrines','shrine','A hilltop shrine above the Mahishasuramardini cave.',78,70,'https://images.pexels.com/photos/38412969/pexels-photo-38412969.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',7);

-- ---------------- GUIDED STEPS ----------------
-- Steps follow each temple's display_order, giving a 6-stop journey.
insert into public.guided_steps (temple_id, location_id, step_number, title, description)
select l.temple_id, l.id, row_number() over (partition by l.temple_id order by l.display_order),
       l.name, l.description
from public.temple_locations l
where l.display_order <= 6;

-- ============================================================
-- Translation tables (temple_translations, location_translations,
-- guided_step_translations) are populated from the reviewed content
-- modules listed at the top of this file — Hindi, Telugu, Tamil and
-- Malayalam. Long-form narrative columns are loaded the same way so
-- that no machine translation of religious or historical content is
-- ever published unreviewed.
-- ============================================================
