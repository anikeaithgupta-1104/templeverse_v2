// ------------------------------------------------------------------
// TempleVerse — temple locations (English base content).
// Each entry mirrors `temple_locations` + `location_translations`.
// map_x / map_y are 0–100 coordinates driving the interactive map.
//
// IMAGE POLICY: a photograph is attached only when it can be matched
// to that temple with confidence. Where no verified photograph of the
// specific feature exists, image_url is null and the UI renders an
// architectural placeholder rather than an unrelated picture.
// ------------------------------------------------------------------

const P = (id) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`;

export const DEMO_LOCATIONS = [
  /* ================= BRIHADEESWARAR (8) ================= */
  {
    id: "bri_entrance",
    temple_id: "temple_brihadeeswarar",
    name: "Keralanthakan Tiruvasal (Outer Gateway)",
    type: "gopuram",
    description:
      "The outer gateway of the temple, named after a title borne by Raja Raja Chola I. It is the first of two gateways on the temple's east–west axis.",
    map_x: 50, map_y: 8, display_order: 1,
    image_url: P(37809042),
    image_credit: "Roman Saienko / Pexels — gateway architecture, Thanjavur",
    audio_url: null, video_url: null,
    story:
      "The gateway carries the name Keralanthakan, a title associated with Raja Raja Chola I. Gateways in Chola temples were not merely doors: their names, inscriptions and sculpture announced the king's achievements to everyone who entered.",
    architecture:
      "A gateway of two storeys with a barrel-vaulted roof, deliberately modest in height. Because the gateways are low, the vimana beyond dominates the skyline as the visitor advances — a carefully designed sequence.",
    rituals:
      "Processions during festivals pass along this axis. Devotees traditionally pause at the threshold before stepping into the temple precinct.",
    significance:
      "This is the boundary between the city and the sacred enclosure — the first of a series of thresholds that structure the pilgrim's approach to the sanctum.",
  },
  {
    id: "bri_rajarajan",
    temple_id: "temple_brihadeeswarar",
    name: "Rajarajan Tiruvasal (Inner Gateway)",
    type: "gopuram",
    description:
      "The inner and more elaborately carved of the two gateways, opening directly onto the great courtyard.",
    map_x: 50, map_y: 20, display_order: 2,
    image_url: P(37826466),
    image_credit: "Roman Saienko / Pexels — gateway, Brihadeeswarar Temple",
    audio_url: null, video_url: null,
    story:
      "Named directly for Raja Raja Chola I, this second gateway is richer in sculpture than the outer one. Passing through it, the visitor emerges into the full expanse of the courtyard with the vimana rising ahead.",
    architecture:
      "The gateway is flanked by very large guardian figures (dvarapalas) carved in high relief, and its walls carry niches with sculpted deities characteristic of mature Chola work.",
    rituals:
      "Festival chariots and processional images are carried through this gateway. It is the point at which many devotees first join their hands in greeting to the deity.",
    significance:
      "The two gateways create a rhythm of compression and release — a narrow passage followed by an immense open court — that is central to how the temple is experienced.",
  },
  {
    id: "bri_nandi",
    temple_id: "temple_brihadeeswarar",
    name: "Nandi Mandapam",
    type: "mandapam",
    description:
      "An open pillared pavilion in the courtyard sheltering a very large monolithic Nandi, the bull, facing the sanctum.",
    map_x: 50, map_y: 32, display_order: 3,
    image_url: null,
    image_credit: null,
    audio_url: null, video_url: null,
    story:
      "In Shaiva tradition Nandi is the mount and foremost devotee of Shiva, always turned towards his lord. The Nandi at Thanjavur is among the largest monolithic examples in India. The pavilion sheltering it is a later addition to the Chola core.",
    architecture:
      "A raised, open colonnaded pavilion carrying a painted ceiling. The Nandi itself is carved from a single block of stone and measures several metres in length.",
    rituals:
      "Devotees circumambulate the Nandi and offer flowers and sacred ash. It is decorated during major festivals.",
    significance:
      "Nandi models the attitude of the devotee: patient, attentive, and turned always toward the divine. Standing behind it aligns the visitor's gaze directly with the sanctum.",
  },
  {
    id: "bri_main_shrine",
    temple_id: "temple_brihadeeswarar",
    name: "Garbhagriha (Main Sanctum)",
    type: "shrine",
    description:
      "The sanctum at the heart of the temple, enshrining a very large Shiva lingam beneath the great tower.",
    map_x: 50, map_y: 50, display_order: 4,
    image_url: null,
    image_credit: null,
    audio_url: null, video_url: null,
    story:
      "The sanctum houses one of the largest Shiva lingams in any Indian temple, worshipped here as Peruvudaiyar — the Great Lord. It was consecrated around 1010 CE under Raja Raja Chola I, and the temple has remained in worship since.",
    architecture:
      "A square chamber of massive granite blocks, set within a two-storeyed structure and surrounded by a wide circumambulatory passage. Colossal guardian figures flank the approach.",
    rituals:
      "Worship follows a fixed daily cycle of pujas, including abhishekam — ritual bathing of the lingam with water, milk and other offerings — followed by the waving of lamps.",
    significance:
      "Every axis of the temple converges here. The sequence of gateways, courtyard, Nandi and hall exists to prepare the visitor for this single point.",
  },
  {
    id: "bri_frescoes",
    temple_id: "temple_brihadeeswarar",
    name: "Chola Fresco Corridor",
    type: "gallery",
    description:
      "A dark circumambulatory passage around the sanctum whose walls preserve rare Chola-period paintings, later overlaid with Nayak-period work.",
    map_x: 28, map_y: 50, display_order: 5,
    image_url: null,
    image_credit: null,
    audio_url: null, video_url: null,
    story:
      "For centuries these walls were known only for their later paintings. Conservation work revealed an earlier layer of Chola-period murals beneath, making this one of the most important surviving groups of medieval Indian wall painting.",
    architecture:
      "A narrow, low passage running around the sanctum within the thickness of the walls. Its darkness protected the pigments; today access is restricted for conservation reasons.",
    rituals:
      "The passage was built for pradakshina — circumambulation of the sanctum, performed clockwise as an act of reverence.",
    significance:
      "The murals are a rare direct glimpse of Chola painting, an art form otherwise almost entirely lost, and they sit beneath later work that records how the temple kept changing.",
  },
  {
    id: "bri_vimana",
    temple_id: "temple_brihadeeswarar",
    name: "The Great Vimana",
    type: "tower",
    description:
      "The pyramidal tower above the sanctum, roughly 66 metres tall and among the tallest temple towers of its kind.",
    map_x: 50, map_y: 62, display_order: 6,
    image_url: P(37862812),
    image_credit: "Roman Saienko / Pexels — Brihadeeswarar Temple stonework",
    audio_url: null, video_url: null,
    story:
      "When it was completed the vimana was among the tallest structures in India. A widely repeated local tradition holds that its capstone was hauled up a long earthen ramp; this account is part of local memory rather than documented record, and how the stones were raised is still discussed by historians.",
    architecture:
      "Thirteen diminishing storeys of granite rise to an octagonal crown carrying a large monolithic capstone. The upper courses are fitted with remarkable precision, without mortar.",
    rituals:
      "The tower is venerated as the crown of the temple and is illuminated during major festivals.",
    significance:
      "The vimana expresses the idea of the temple as a sacred mountain — a vertical axis joining the earth to the heavens.",
  },
  {
    id: "bri_sub_shrines",
    temple_id: "temple_brihadeeswarar",
    name: "Subsidiary Shrines",
    type: "shrine",
    description:
      "Smaller shrines within the courtyard, including those of the Goddess (Brihannayaki) and of Chandeshvara, together with later additions.",
    map_x: 22, map_y: 76, display_order: 7,
    image_url: null,
    image_credit: null,
    audio_url: null, video_url: null,
    story:
      "The courtyard holds several shrines built at different times. The Goddess shrine and the shrine of Chandeshvara belong to the older layers; a Subrahmanya shrine and others were added by later dynasties, so the courtyard records centuries of patronage.",
    architecture:
      "Each is a compact shrine with its own tower — in effect a miniature of the great vimana, using the same architectural vocabulary at a smaller scale.",
    rituals:
      "The Goddess receives special worship on Fridays and during Navaratri. In Shaiva practice Chandeshvara is honoured at the close of the main worship.",
    significance:
      "Together the shrines present the temple as a complete sacred household, with the principal deity, the Goddess and the attendant figures each in their place.",
  },
  {
    id: "bri_courtyard",
    temple_id: "temple_brihadeeswarar",
    name: "The Great Prakara (Courtyard)",
    type: "complex",
    description:
      "The vast walled courtyard enclosing the temple, lined on all sides by cloistered pillared corridors.",
    map_x: 76, map_y: 76, display_order: 8,
    image_url: P(5138790),
    image_credit: "Aadhithyan Pandian / Pexels — the walled courtyard",
    audio_url: null, video_url: null,
    story:
      "The inscriptions cut into the courtyard walls are the temple's archive. They record grants of land and gold, the names of villages, and the appointment of temple servants, musicians and dancers — an extraordinary window into the Chola economy.",
    architecture:
      "A rectangular enclosure of high granite walls, roughly 240 by 120 metres, with continuous colonnaded cloisters along the inner face and rows of small lingams set within them.",
    rituals:
      "Circumambulating the entire courtyard is a traditional act of devotion, observed particularly during the Tamil month of Margazhi and on festival days.",
    significance:
      "The prakara is the temple's civic space, where worship, festival, music and community life have met for a thousand years.",
  },

  /* ================= MEENAKSHI AMMAN (8) ================= */
  {
    id: "mee_gopuram",
    temple_id: "temple_meenakshi",
    name: "The Gopurams (Gateway Towers)",
    type: "gopuram",
    description:
      "Fourteen towered gateways rise above the temple walls; the southern tower, roughly 52 metres high, is the tallest.",
    map_x: 50, map_y: 8, display_order: 1,
    image_url: P(10271157),
    image_credit: "Sharath G. / Pexels — Meenakshi Temple gopura, Madurai",
    audio_url: null, video_url: null,
    story:
      "The gopurams are covered with thousands of brightly painted stucco figures — deities, guardians, dancers and scenes from the Puranas — repainted at each consecration ceremony. Together they form an enormous open-air narrative visible from across the city.",
    architecture:
      "Each gopuram is a trapezoidal tower rising in diminishing storeys over a stone base, built up in brick and stucco above. The density of figures is far greater than in earlier Dravidian gateways.",
    rituals:
      "The temple gates are opened each morning with ceremony. The towers are illuminated during festivals, and they are refreshed with new paint at the periodic kumbhabhishekam.",
    significance:
      "The gopuram is the first darshan — the first sight of the sacred — and it announces the temple-city long before a visitor reaches its walls.",
  },
  {
    id: "mee_ashta_shakthi",
    temple_id: "temple_meenakshi",
    name: "Ashta Shakthi Mandapam",
    type: "hall",
    description:
      "The pillared hall just inside the eastern entrance, named for its sculptures of eight forms of the goddess.",
    map_x: 50, map_y: 20, display_order: 2,
    image_url: null,
    image_credit: null,
    audio_url: null, video_url: null,
    story:
      "This is the first hall most pilgrims enter. Its pillars carry sculptures of eight forms of Shakti, together with panels illustrating episodes associated with the goddess of Madurai — an introduction, in stone, to the temple's story.",
    architecture:
      "A Nayak-period colonnaded hall with sculpted piers, forming a transition between the bustle of the street and the enclosed spaces beyond.",
    rituals:
      "Pilgrims pass through this hall on the way to the shrines; vendors of flowers and offerings traditionally occupy the approach outside.",
    significance:
      "The hall introduces the theological heart of the temple: this is a place where the goddess, not her consort, is the principal deity.",
  },
  {
    id: "mee_pillar_hall",
    temple_id: "temple_meenakshi",
    name: "Thousand Pillar Hall",
    type: "hall",
    description:
      "A 16th-century hall celebrated for its forest of intricately carved pillars, including columns that ring with musical notes.",
    map_x: 20, map_y: 32, display_order: 3,
    image_url: null,
    image_credit: null,
    audio_url: null, video_url: null,
    story:
      "The hall is traditionally associated with Ariyanatha Mudaliar, a minister of the Nayak court, whose equestrian sculpture stands near its entrance. Visitors have long been struck by its slender 'musical pillars', which sound different notes when struck.",
    architecture:
      "Rows of carved piers — commonly counted as 985 — bearing figures of deities, warriors, dancers and rearing yali creatures. Part of the hall today houses a temple art museum.",
    rituals:
      "The hall is used for temple ceremonies and for music and dance performances, continuing a long association between the temple and the performing arts.",
    significance:
      "It shows the temple as more than a place of worship: it was also an academy of sculpture, music and dance.",
  },
  {
    id: "mee_meenakshi_shrine",
    temple_id: "temple_meenakshi",
    name: "Meenakshi Shrine",
    type: "shrine",
    description:
      "The sanctum of the goddess Meenakshi, the presiding deity of Madurai and the focus of the whole complex.",
    map_x: 36, map_y: 50, display_order: 4,
    image_url: null,
    image_credit: null,
    audio_url: null, video_url: null,
    story:
      "According to the temple's traditional accounts, Meenakshi was born to the ruler of Madurai and later married Shiva, who came to the city as Sundareswarar. The goddess is depicted green in colour with a parrot, and she — not her consort — is the temple's principal deity, which is unusual among major Shaiva temples.",
    architecture:
      "The shrine stands within its own enclosure, its tower gilded. The surrounding halls include some of the older carved pillars in the complex.",
    rituals:
      "Daily worship includes abhishekam and alankaram, the ceremonial adorning of the image. Fridays are especially associated with the goddess.",
    significance:
      "Meenakshi is understood as the sovereign of Madurai. The city's festivals, and much of its civic identity, are organised around her.",
  },
  {
    id: "mee_sundareswarar",
    temple_id: "temple_meenakshi",
    name: "Sundareswarar Shrine",
    type: "shrine",
    description:
      "The shrine of Sundareswarar — 'the beautiful lord' — the form in which Shiva is worshipped at Madurai.",
    map_x: 68, map_y: 48, display_order: 5,
    image_url: null,
    image_credit: null,
    audio_url: null, video_url: null,
    story:
      "In the temple's traditional accounts, Shiva came to Madurai as Sundareswarar to marry Meenakshi. Within this part of the complex stands the Kanaka Sabha, a hall associated with the dance of Shiva.",
    architecture:
      "The shrine has its own gilded tower and enclosure, entered through a series of halls whose pillars carry finely carved figures.",
    rituals:
      "Worship follows the Shaiva daily cycle, ending with the ceremonial procession in which the deity is carried to the goddess's chamber for the night.",
    significance:
      "The two shrines together express the temple's central theme — the union of the goddess and her consort — which is re-enacted publicly each year in the Chithirai festival.",
  },
  {
    id: "mee_oonjal",
    temple_id: "temple_meenakshi",
    name: "Oonjal Mandapam (Swing Hall)",
    type: "hall",
    description:
      "The hall containing the ceremonial swing on which the images of the deities are placed each Friday evening.",
    map_x: 26, map_y: 62, display_order: 6,
    image_url: null,
    image_credit: null,
    audio_url: null, video_url: null,
    story:
      "Every Friday the processional images of Meenakshi and Sundareswarar are brought to this hall and placed on a swing, while musicians perform. The neighbouring Kilikoottu Mandapam takes its name from the parrot cages once kept there — the parrot being the goddess's emblem.",
    architecture:
      "A columned hall beside the sacred tank, with a golden swing suspended at its centre and painted ceiling panels above.",
    rituals:
      "The weekly swing ceremony is one of the temple's most attended regular observances, open to devotees who gather around the hall.",
    significance:
      "The ritual expresses an intimate, domestic register of devotion: the deities are not only cosmic powers but a divine couple who are honoured, entertained and rested.",
  },
  {
    id: "mee_lotus_tank",
    temple_id: "temple_meenakshi",
    name: "Pottramarai Kulam (Golden Lotus Tank)",
    type: "pond",
    description:
      "The stepped sacred tank at the centre of the complex, surrounded by pillared corridors.",
    map_x: 50, map_y: 72, display_order: 7,
    image_url: null,
    image_credit: null,
    audio_url: null, video_url: null,
    story:
      "The tank's name means 'tank of the golden lotus'. Tradition links it to the literary academies of ancient Madurai, and holds that the marriage of Meenakshi and Sundareswarar took place at its edge. These are traditional accounts rather than documented events.",
    architecture:
      "A rectangular stepped tank lined with stone, ringed by colonnaded corridors whose ceilings carry painted panels. The gopurams are reflected in its surface.",
    rituals:
      "Devotees traditionally take a ritual dip before darshan. The surrounding corridors are used for rest, prayer and festival gatherings.",
    significance:
      "Water marks the boundary of purification in temple practice; the tank sets the pilgrim's inner preparation at the literal centre of the complex.",
  },
  {
    id: "mee_kalyana_mandapam",
    temple_id: "temple_meenakshi",
    name: "Kalyana Mandapam (Marriage Hall)",
    type: "hall",
    description:
      "The ceremonial hall in which the annual re-enactment of the divine marriage is prepared and celebrated.",
    map_x: 76, map_y: 84, display_order: 8,
    image_url: null,
    image_credit: null,
    audio_url: null, video_url: null,
    story:
      "During the Chithirai festival, the marriage of Meenakshi and Sundareswarar is celebrated here before enormous crowds, and the deities are then carried in procession through the streets of Madurai. The festival is among the largest in Tamil Nadu.",
    architecture:
      "A Nayak-period hall with carved piers and painted ceilings depicting the marriage and the rulers who endowed the temple.",
    rituals:
      "The hall is prepared each year for the marriage ceremony; at other times it serves temple functions and gatherings.",
    significance:
      "The festival binds the temple to the city: the divine marriage is treated as a civic event in which the whole of Madurai participates.",
  },

  /* ================= KONARK SUN TEMPLE (8) ================= */
  {
    id: "kon_lion_gate",
    temple_id: "temple_konark",
    name: "Simha Dwara (Lion Gate)",
    type: "entrance",
    description:
      "The eastern approach to the temple, marked by large sculpted lions set above crouching elephants.",
    map_x: 50, map_y: 8, display_order: 1,
    image_url: null,
    image_credit: null,
    audio_url: null, video_url: null,
    story:
      "Two great lions, each shown above an elephant, guard the eastern approach. The motif of a lion over an elephant is common in Odishan temple sculpture and is traditionally read as the triumph of power over pride.",
    architecture:
      "Massive freestanding sculptures carved from local stone, framing the route from the entrance towards the temple platform.",
    rituals:
      "The temple no longer holds regular worship, but the eastern approach remains the way visitors are intended to arrive — with the whole monument opening before them.",
    significance:
      "The gate sets the scale of what follows: the visitor is meant to feel small before the chariot of the sun.",
  },
  {
    id: "kon_bhoga_mandapa",
    temple_id: "temple_konark",
    name: "Bhoga Mandapa (Hall of Offerings)",
    type: "hall",
    description:
      "A detached pillared platform near the entrance, understood as the hall in which food offerings were prepared and presented.",
    map_x: 50, map_y: 20, display_order: 2,
    image_url: null,
    image_credit: null,
    audio_url: null, video_url: null,
    story:
      "Standing apart from the main structure, this hall completes the standard sequence of an Odishan temple. Its retaining walls carry lively carvings of musicians, dancers and everyday scenes.",
    architecture:
      "A raised, open platform reached by steps on each side, with rows of carved pillars and richly sculpted mouldings around the base.",
    rituals:
      "In an active Odishan temple, the bhoga mandapa is where food offerings to the deity are arranged before being presented.",
    significance:
      "The hall shows that Konark was planned as a complete, functioning temple, not merely a monument of sculpture.",
  },
  {
    id: "kon_natya_mandapa",
    temple_id: "temple_konark",
    name: "Natya Mandapa (Dance Hall)",
    type: "hall",
    description:
      "The roofless pillared platform in front of the main structure, its walls covered with figures of musicians and dancers.",
    map_x: 26, map_y: 34, display_order: 3,
    image_url: P(37437098),
    image_credit: "Krishnendu Biswas / Pexels — sculptural bands at Konark",
    audio_url: null, video_url: null,
    story:
      "This platform served as the temple's stage. Its walls preserve hundreds of figures of dancers and drummers, giving an unusually detailed picture of the performing arts of 13th-century Odisha.",
    architecture:
      "A raised square platform approached by stairways, with sculpted friezes running continuously around its base and the stumps of carved pillars at the corners.",
    rituals:
      "Dance and music were offered as forms of worship. The tradition is echoed today by the Konark Dance Festival held annually before the monument.",
    significance:
      "It records a world in which artistic performance was itself an act of devotion, not entertainment placed alongside it.",
  },
  {
    id: "kon_chariot",
    temple_id: "temple_konark",
    name: "The Chariot Wheels and Horses",
    type: "chariot",
    description:
      "Twenty-four elaborately carved wheels line the temple platform, with teams of horses at the front — the temple is the sun god's chariot.",
    map_x: 76, map_y: 38, display_order: 4,
    image_url: P(37437100),
    image_credit: "Krishnendu Biswas / Pexels — carved chariot wheel, Konark",
    audio_url: null, video_url: null,
    story:
      "The whole temple was conceived as a chariot drawn by horses. Each wheel is about three metres across, carved with spokes, a decorated hub and medallions between the spokes. Visitors and guides have long noted that the wheels can be read as sundials by the shadow the spokes cast.",
    architecture:
      "Twelve pairs of wheels are set along the plinth, richly ornamented with foliage, beadwork and figurative medallions. Of the horses, a small number survive.",
    rituals:
      "The temple faces east so that the rising sun reaches the sanctuary — the orientation is itself an act of worship built into the plan.",
    significance:
      "The wheel has become an emblem of Indian heritage. It expresses the temple's central idea: the movement of the sun, and therefore of time itself, carved in stone.",
  },
  {
    id: "kon_jagamohana",
    temple_id: "temple_konark",
    name: "Jagamohana (Audience Hall)",
    type: "hall",
    description:
      "The great pyramidal hall that still stands — the largest surviving structure of the temple.",
    map_x: 50, map_y: 50, display_order: 5,
    image_url: P(12871861),
    image_credit: "Suman Sutradhar / Pexels — the jagamohana at Konark",
    audio_url: null, video_url: null,
    story:
      "The jagamohana was the assembly hall in front of the sanctuary. It is the one major element of the temple to survive largely intact; in the early twentieth century its interior was filled with sand and stone to prevent collapse, and it has remained sealed since.",
    architecture:
      "A tall hall whose roof rises in three receding tiers, each edged with rows of sculpted figures of musicians. Large images of Surya stand in niches on three sides.",
    rituals:
      "Regular worship no longer takes place at the monument, though the site remains meaningful to local devotees and visitors.",
    significance:
      "The hall is the surviving measure of the temple's ambition — and its sealed interior is a reminder that conservation sometimes means choosing what cannot be seen.",
  },
  {
    id: "kon_navagraha",
    temple_id: "temple_konark",
    name: "Navagraha Panel",
    type: "gallery",
    description:
      "A large carved slab depicting the nine planetary deities, originally set above a doorway of the temple.",
    map_x: 28, map_y: 62, display_order: 6,
    image_url: P(37437099),
    image_credit: "Krishnendu Biswas / Pexels — carved figures at Konark",
    audio_url: null, video_url: null,
    story:
      "The navagraha slab shows the nine graha deities seated in a row. Once part of the temple's architecture, it was later moved for protection and is now displayed within the site.",
    architecture:
      "A single long slab of chlorite, carved in deep relief with nine seated figures, each with its distinguishing attributes.",
    rituals:
      "The nine grahas are widely propitiated in Indian ritual practice, and panels of this kind were placed where worshippers would pass beneath them.",
    significance:
      "The panel connects the temple's solar theme to the wider astronomical symbolism that runs through its design.",
  },
  {
    id: "kon_sanctum",
    temple_id: "temple_konark",
    name: "Deul (Sanctuary Ruins)",
    type: "shrine",
    description:
      "The base of the sanctuary tower that once housed the image of Surya; the tower itself no longer stands.",
    map_x: 50, map_y: 68, display_order: 7,
    image_url: null,
    image_credit: null,
    audio_url: null, video_url: null,
    story:
      "The sanctuary tower once rose high above the jagamohana. It has collapsed, and the reasons are still debated by historians — structural failure, damage, and the removal of stone have all been proposed. What survives is the platform and the lower walls.",
    architecture:
      "A square sanctuary built on the Kalinga deul plan, designed for a curvilinear tower. The surviving walls carry large images of Surya in the cardinal niches.",
    rituals:
      "Worship of the sun follows the daily cycle; sunrise here has always been the significant moment.",
    significance:
      "Even ruined, the sanctuary does what it was built to do — it draws the eye upward, from the ground toward the sky.",
  },
  {
    id: "kon_complex",
    temple_id: "temple_konark",
    name: "Temple Grounds and Mayadevi Temple",
    type: "complex",
    description:
      "The wider enclosure containing subsidiary structures, including the ruined shrine known as the Mayadevi Temple.",
    map_x: 76, map_y: 80, display_order: 8,
    image_url: P(32888176),
    image_credit: "Prabin Kumar / Pexels — the Sun Temple complex",
    audio_url: null, video_url: null,
    story:
      "A smaller ruined temple within the enclosure is conventionally called the Mayadevi Temple, though its original dedication is uncertain and debated among scholars. Sculptures recovered from the site are displayed in the Archaeological Survey of India's museum nearby.",
    architecture:
      "The smaller temple follows the same Kalinga plan at reduced scale. Its style has led some scholars to suggest it may be earlier than the main temple.",
    rituals:
      "The site is a protected monument rather than an active temple. The Konark Dance Festival is held here each year.",
    significance:
      "The grounds show that Konark was a complete sacred precinct — a planned complex, of which the famous chariot is only the centrepiece.",
  },

  /* ================= SRI VENKATESWARA, TIRUMALA (7) ================= */
  {
    id: "tir_mahadwaram",
    temple_id: "temple_tirumala",
    name: "Mahadwaram (Main Gateway)",
    type: "gopuram",
    description:
      "The principal gateway tower through which pilgrims enter the temple, also known as the Padikavali.",
    map_x: 50, map_y: 10, display_order: 1,
    image_url: P(36771235),
    image_credit: "Vijay Richhiya / Pexels — the temple at Tirupati",
    audio_url: null, video_url: null,
    story:
      "The great gateway marks the entry into the temple proper after the long ascent of the hills. For most pilgrims this is the emotional beginning of the visit, often after many hours in the queue complexes outside.",
    architecture:
      "A Dravidian gateway tower over a stone base, its upper storeys carrying sculpted figures. It pierces the outer enclosure wall of the temple.",
    rituals:
      "Pilgrims traditionally offer their first salutation here. Many complete the ascent of the hill on foot as a vow.",
    significance:
      "The gateway divides the ordinary world from the temple; the scale of the crowds passing through it makes it one of the busiest thresholds in the world.",
  },
  {
    id: "tir_sampangi",
    temple_id: "temple_tirumala",
    name: "Sampangi Pradakshinam (Outer Circuit)",
    type: "complex",
    description:
      "The outer circumambulatory passage between the first and second enclosure walls, lined with halls and shrines.",
    map_x: 50, map_y: 24, display_order: 2,
    image_url: null,
    image_credit: null,
    audio_url: null, video_url: null,
    story:
      "The outer circuit contains a number of mandapas built at different periods, including halls associated with Vijayanagara patronage. Inscriptions on these structures record the gifts that sustained the temple over centuries.",
    architecture:
      "A broad open passage running around the inner enclosure, bordered by pillared halls whose columns carry sculpted figures.",
    rituals:
      "Circumambulation is performed clockwise. Certain festival processions move along this circuit.",
    significance:
      "The passage preserves the temple's institutional memory: its inscriptions are the record of who supported the shrine and when.",
  },
  {
    id: "tir_dhwajastambham",
    temple_id: "temple_tirumala",
    name: "Dhwajastambham (Flagstaff)",
    type: "tower",
    description:
      "The gilded flagstaff standing on the temple's central axis, directly before the sanctum.",
    map_x: 28, map_y: 36, display_order: 3,
    image_url: null,
    image_credit: null,
    audio_url: null, video_url: null,
    story:
      "The flagstaff stands in line with the deity. At the start of the annual Brahmotsavam festival, a flag is hoisted here in a ceremony that formally opens the celebrations.",
    architecture:
      "A tall metal-clad post set on a stone base, aligned on the temple's principal axis together with the bali pitha (offering pedestal).",
    rituals:
      "Devotees prostrate before the flagstaff on entering. The flag-hoisting ceremony marks the beginning of the temple's great annual festival.",
    significance:
      "The flagstaff is the temple's signal to the world that a festival is under way — a public, visible act of invitation.",
  },
  {
    id: "tir_bangaru_vakili",
    temple_id: "temple_tirumala",
    name: "Bangaru Vakili (The Golden Doorway)",
    type: "shrine",
    description:
      "The gilded doorway forming the final entrance to the innermost chamber before the sanctum.",
    map_x: 50, map_y: 54, display_order: 4,
    image_url: null,
    image_credit: null,
    audio_url: null, video_url: null,
    story:
      "Pilgrims pass through two successive doorways on the final approach — a silver one and then this gilded one. Its plates carry figures associated with Vishnu, and passing through it is, for many, the most charged moment of the whole pilgrimage.",
    architecture:
      "A doorway faced with sheets of gilded metal worked in relief, set within the inner enclosure that surrounds the sanctum.",
    rituals:
      "The doorway is opened and closed according to the fixed daily schedule of worship, which begins before dawn with the Suprabhatam.",
    significance:
      "The sequence of thresholds gives the pilgrimage its rhythm: each doorway narrows the world further until only the sanctum remains.",
  },
  {
    id: "tir_ananda_nilayam",
    temple_id: "temple_tirumala",
    name: "Ananda Nilayam (Sanctum and Gilded Vimana)",
    type: "shrine",
    description:
      "The sanctum housing the image of Venkateswara, crowned by the gilded tower known as Ananda Nilayam.",
    map_x: 50, map_y: 68, display_order: 5,
    image_url: P(28310432),
    image_credit: "Mihran Kes / Pexels — Sri Venkateswara Temple architecture",
    audio_url: null, video_url: null,
    story:
      "The standing image of Venkateswara is the focus of the entire pilgrimage. Devotees typically have only moments before it, moving through in a continuous stream. The tower above the sanctum is covered in gilded plates and is visible across the temple.",
    architecture:
      "A square sanctum within concentric enclosures, surmounted by a vimana faced with gilded copper plates and topped by a finial.",
    rituals:
      "Worship begins in the early hours with the Suprabhatam, the hymn that awakens the deity, and continues through a fixed sequence of daily services.",
    significance:
      "This is the destination of one of the largest continuous streams of pilgrims anywhere in the world — a place defined as much by its human scale as by its architecture.",
  },
  {
    id: "tir_pushkarini",
    temple_id: "temple_tirumala",
    name: "Swami Pushkarini (Sacred Tank)",
    type: "pond",
    description:
      "The temple tank beside the shrine, where pilgrims traditionally bathe before darshan.",
    map_x: 24, map_y: 78, display_order: 6,
    image_url: P(36771239),
    image_credit: "Vijay Richhiya / Pexels — the sacred tank at Tirupati",
    audio_url: null, video_url: null,
    story:
      "The tank lies immediately north of the temple. Bathing here before entering is a long-standing practice, and the tank is the setting for the float festival, when processional images are taken out on a decorated raft.",
    architecture:
      "A large stepped tank enclosed by stone walls, with pavilions at its edge and a mandapa at the centre used during the float festival.",
    rituals:
      "Ritual bathing before darshan; the annual Teppotsavam (float festival) is held on its waters.",
    significance:
      "The tank provides the moment of pause and preparation before the intensity of the sanctum.",
  },
  {
    id: "tir_varaha",
    temple_id: "temple_tirumala",
    name: "Varahaswami Temple",
    type: "shrine",
    description:
      "A separate shrine on the bank of the temple tank, dedicated to Varaha, the boar incarnation of Vishnu.",
    map_x: 76, map_y: 78, display_order: 7,
    image_url: null,
    image_credit: null,
    audio_url: null, video_url: null,
    story:
      "The Varahaswami shrine stands beside the Swami Pushkarini. By long-established custom, worship and the first offering are made here before visiting the main temple — an order of precedence maintained in the temple's daily practice.",
    architecture:
      "A compact shrine of traditional plan facing the tank, smaller and plainer than the main temple.",
    rituals:
      "Offerings are presented here first; many pilgrims complete this visit before joining the queue for the principal shrine.",
    significance:
      "The custom preserves an older layer of worship on the hill and reminds pilgrims that the site's sanctity is not attached to one shrine alone.",
  },

  /* ================= SHORE TEMPLE, MAHABALIPURAM (7) ================= */
  {
    id: "shore_complex",
    temple_id: "temple_shore",
    name: "The Shore Temple Complex",
    type: "complex",
    description:
      "The walled seaside enclosure containing the three shrines, seen as a single composition against the Bay of Bengal.",
    map_x: 50, map_y: 10, display_order: 1,
    image_url: P(38412970),
    image_credit: "Roman Saienko / Pexels — the Shore Temple",
    audio_url: null, video_url: null,
    story:
      "The temple stands directly on the shore, and its silhouette against the sea is among the most recognised images of South Indian architecture. It belongs to the wider Group of Monuments at Mahabalipuram, inscribed by UNESCO in 1984.",
    architecture:
      "A compact walled complex whose two tiered towers rise in steep pyramidal stages. Unlike the earlier monuments here, it is built from dressed and jointed granite blocks rather than carved from living rock.",
    rituals:
      "The temple is a protected monument and is no longer in regular worship, though it remains an important cultural site.",
    significance:
      "It marks a decisive change in Indian architecture: the moment when the Pallavas moved from carving temples out of rock to building them from cut stone.",
  },
  {
    id: "shore_nandi_wall",
    temple_id: "temple_shore",
    name: "Nandi Compound Wall",
    type: "complex",
    description:
      "The low enclosure wall around the temple, topped by rows of seated bull figures.",
    map_x: 50, map_y: 24, display_order: 2,
    image_url: P(24246704),
    image_credit: "Ankit Bhattacharjee / Pexels — carving detail, Shore Temple",
    audio_url: null, video_url: null,
    story:
      "Rows of seated Nandi figures line the top of the compound wall, weathered smooth by centuries of salt wind. They frame the temple and mark it clearly as a Shaiva foundation.",
    architecture:
      "A low granite wall carrying regularly spaced seated bulls, with sculpted pilasters and panels along its faces.",
    rituals:
      "The bulls face the shrines, echoing the standard placement of Nandi before a Shiva sanctum.",
    significance:
      "The erosion of these figures is itself part of the site's story — a visible record of what the sea has done to the monument over thirteen centuries.",
  },
  {
    id: "shore_main_shrine",
    temple_id: "temple_shore",
    name: "Kshatriyasimhesvara (Main Shiva Shrine)",
    type: "shrine",
    description:
      "The taller of the two Shiva shrines, facing east towards the sea.",
    map_x: 60, map_y: 44, display_order: 3,
    image_url: P(37584854),
    image_credit: "Roman Saienko / Pexels — the Shore Temple at sunset",
    audio_url: null, video_url: null,
    story:
      "The principal shrine faces east, so that it opens toward the sunrise over the Bay of Bengal. Its dedication is recorded in inscriptions using titles of the Pallava king Rajasimha.",
    architecture:
      "A slender tower of several receding tiers over a small sanctum, crowned by an octagonal finial — a form that would influence later Dravidian temple towers.",
    rituals:
      "As a protected monument the shrine is no longer in daily worship; its original orientation to the rising sun remains legible in the plan.",
    significance:
      "This is the tower that gives the Shore Temple its famous outline and set a pattern followed across South India for centuries.",
  },
  {
    id: "shore_vishnu_shrine",
    temple_id: "temple_shore",
    name: "Anantashayana Vishnu Shrine",
    type: "shrine",
    description:
      "A shrine set between the two Shiva sanctums, containing a reclining Vishnu carved from the bedrock.",
    map_x: 44, map_y: 56, display_order: 4,
    image_url: P(35307623),
    image_credit: "Dhinesh Kumar / Pexels — Shore Temple stone carving",
    audio_url: null, video_url: null,
    story:
      "Between the two Shiva shrines lies a low chamber containing an image of Vishnu reclining on the serpent. It is cut from the natural rock, and is thought to be older than the structural shrines built around it.",
    architecture:
      "A rectangular chamber without a tower, its image carved directly from the living rock rather than built up in blocks — a survival of the earlier rock-cut tradition.",
    rituals:
      "The shrine's presence between two Shiva sanctums makes the complex unusual among Pallava temples.",
    significance:
      "It shows two architectural eras meeting in a single monument: the older rock-cut practice enclosed within the new structural temple.",
  },
  {
    id: "shore_rathas",
    temple_id: "temple_shore",
    name: "Pancha Rathas (Five Monolithic Shrines)",
    type: "gallery",
    description:
      "Five temples, each carved from a single outcrop of granite, standing a short distance inland.",
    map_x: 20, map_y: 74, display_order: 5,
    image_url: P(38198563),
    image_credit: "Roman Saienko / Pexels — stone monuments at Mahabalipuram",
    audio_url: null, video_url: null,
    story:
      "The five rathas are named after the Pandava brothers and Draupadi of the Mahabharata, though the names are conventional and later. Each was cut from the living rock, and several were left unfinished.",
    architecture:
      "Five monolithic shrines, each experimenting with a different roof form and plan — a remarkable catalogue of the architectural ideas available to the Pallava workshops.",
    rituals:
      "They are protected monuments and were probably never consecrated for regular worship.",
    significance:
      "The rathas are effectively architectural models in stone, and they explain where the forms of later South Indian temples came from.",
  },
  {
    id: "shore_penance",
    temple_id: "temple_shore",
    name: "Arjuna's Penance (Descent of the Ganges)",
    type: "gallery",
    description:
      "An immense open-air bas-relief carved across two adjoining boulders — one of the largest such reliefs in the world.",
    map_x: 50, map_y: 82, display_order: 6,
    image_url: P(33516545),
    image_credit: "M Shah / Pexels — rock carvings at Mahabalipuram",
    audio_url: null, video_url: null,
    story:
      "The relief covers a huge rock face with figures of gods, sages, celestial beings, and a famous procession of elephants. Its subject is debated: it is read either as Arjuna's austerities or as the descent of the Ganges to earth. Both readings are traditional interpretations rather than settled fact.",
    architecture:
      "A relief carved across two boulders separated by a natural cleft, which is thought to have been used to channel water down the centre of the composition.",
    rituals:
      "It is a protected monument rather than a place of worship.",
    significance:
      "It is one of the great narrative works of Indian art, and the finest surviving demonstration of Pallava sculptors working at monumental scale.",
  },
  {
    id: "shore_olakkanesvara",
    temple_id: "temple_shore",
    name: "Olakkanesvara Temple and Cave Shrines",
    type: "shrine",
    description:
      "A hilltop shrine above the Mahishasuramardini cave, overlooking the town and the sea.",
    map_x: 78, map_y: 70, display_order: 7,
    image_url: P(38412969),
    image_credit: "Roman Saienko / Pexels — Mahabalipuram stone architecture",
    audio_url: null, video_url: null,
    story:
      "The Olakkanesvara temple sits on the boulder above the Mahishasuramardini cave, whose panels include a celebrated relief of the goddess Durga in combat and a reclining Vishnu. In the colonial period the hilltop structure was used as a lighthouse.",
    architecture:
      "A small structural shrine, now without its tower, standing above rock-cut cave temples whose interiors carry deeply carved narrative panels.",
    rituals:
      "The cave shrines and hilltop temple are protected monuments and are no longer in regular worship.",
    significance:
      "From here the whole site can be read at once — caves, monolithic shrines, the great relief and the Shore Temple, the full span of Pallava achievement.",
  },
];
