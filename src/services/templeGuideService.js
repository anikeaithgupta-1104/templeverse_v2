// ------------------------------------------------------------------
// TempleVerse — Arya's knowledge system.
//
// Arya NEVER invents temple facts. Every answer is assembled from the
// structured records in the database (temple / location / guided step
// / source rows). If the data does not contain an answer, Arya says so
// and offers what it does know.
//
// When an AI model is configured, `buildModelPrompt()` produces the
// grounded prompt that would be sent — only the retrieved context,
// never an open-ended request to "tell me about this temple".
// ------------------------------------------------------------------

import { getLocalizedField } from "./translationService";

/* ==================================================================
   Localised phrasing for Arya (5 languages)
================================================================== */
const PHRASES = {
  en: {
    greeting:
      "Namaste. I'm Arya, your TempleVerse guide. Choose a temple and I'll help you explore its stories, architecture and cultural significance.",
    atTemple: (t) => `We're at ${t}. Ask me anything — the history, the architecture, the rituals, or simply what to look at.`,
    atLocation: (l, t) => `We're standing at ${l}, inside ${t}. What would you like to know?`,
    hereIs: (label) => `${label}:`,
    onlyEnglish:
      "Note: the detailed text for this section has been verified in English only so far. Here it is in English.",
    noAnswer:
      "I don't have verified information on that in my records for this place, and I'd rather not guess. Here's what I can tell you instead:",
    thinking: "Let me explain that…",
    factLabel: "Historically",
    traditionLabel: "According to tradition",
    lookAt: "Here's what I'd look at:",
    sourcesIntro: "This information comes from:",
    period: "Period",
    deity: "Deity",
    style: "Architectural style",
    where: "Where",
    endNarration: "That's this place in brief. Ask me anything else, or move on when you're ready.",
  },
  hi: {
    greeting:
      "नमस्ते! मैं आर्य हूँ, आपका TempleVerse मार्गदर्शक। कोई मंदिर चुनिए और मैं उसकी कथाओं, स्थापत्य और सांस्कृतिक महत्व को समझने में आपकी सहायता करूँगा।",
    atTemple: (t) => `हम ${t} में हैं। मुझसे कुछ भी पूछिए — इतिहास, स्थापत्य, अनुष्ठान, या बस यह कि क्या देखना चाहिए।`,
    atLocation: (l, t) => `हम ${t} के भीतर ${l} पर खड़े हैं। आप क्या जानना चाहेंगे?`,
    hereIs: (label) => `${label}:`,
    onlyEnglish:
      "ध्यान दें: इस भाग का विस्तृत पाठ अभी केवल अंग्रेज़ी में सत्यापित है। वह यहाँ अंग्रेज़ी में प्रस्तुत है।",
    noAnswer:
      "इस स्थान के बारे में मेरे अभिलेखों में इसका सत्यापित उत्तर नहीं है, और मैं अनुमान लगाना उचित नहीं समझता। इसके बजाय मैं यह बता सकता हूँ:",
    thinking: "मैं आपको समझाता हूँ…",
    factLabel: "ऐतिहासिक रूप से",
    traditionLabel: "परंपरा के अनुसार",
    lookAt: "मैं यह देखने का सुझाव दूँगा:",
    sourcesIntro: "यह जानकारी इन स्रोतों से है:",
    period: "काल",
    deity: "मुख्य देवता",
    style: "स्थापत्य शैली",
    where: "स्थान",
    endNarration: "संक्षेप में यह स्थान ऐसा है। और कुछ पूछिए, या तैयार हों तो आगे बढ़िए।",
  },
  te: {
    greeting:
      "నమస్తే! నేను ఆర్య, మీ TempleVerse మార్గదర్శిని. ఒక ఆలయాన్ని ఎంచుకోండి — దాని కథలు, శిల్పకళ, సాంస్కృతిక ప్రాముఖ్యతను తెలుసుకోవడంలో నేను సహాయం చేస్తాను.",
    atTemple: (t) => `మనం ${t} వద్ద ఉన్నాం. చరిత్ర, శిల్పకళ, పూజా విధానాలు — ఏదైనా అడగండి.`,
    atLocation: (l, t) => `మనం ${t} లోని ${l} వద్ద నిలబడి ఉన్నాం. మీరు ఏమి తెలుసుకోవాలనుకుంటున్నారు?`,
    hereIs: (label) => `${label}:`,
    onlyEnglish:
      "గమనిక: ఈ విభాగపు వివరణాత్మక పాఠం ప్రస్తుతం ఆంగ్లంలో మాత్రమే ధృవీకరించబడింది. అది ఇక్కడ ఆంగ్లంలో ఇవ్వబడింది.",
    noAnswer:
      "ఈ ప్రదేశం గురించి నా రికార్డులలో దీనికి ధృవీకరించిన సమాధానం లేదు; ఊహించడం సరికాదు. బదులుగా నేను ఇది చెప్పగలను:",
    thinking: "నేను వివరిస్తాను…",
    factLabel: "చారిత్రకంగా",
    traditionLabel: "సంప్రదాయం ప్రకారం",
    lookAt: "నేను ఇది చూడమని సూచిస్తాను:",
    sourcesIntro: "ఈ సమాచారం ఈ మూలాల నుండి:",
    period: "కాలం",
    deity: "మూలవిరాట్",
    style: "శిల్ప శైలి",
    where: "ప్రదేశం",
    endNarration: "సంక్షిప్తంగా ఈ ప్రదేశం ఇదే. మరేదైనా అడగండి, లేదా సిద్ధమైతే ముందుకు సాగండి.",
  },
  ta: {
    greeting:
      "வணக்கம்! நான் ஆர்யா, உங்கள் TempleVerse வழிகாட்டி. ஒரு கோயிலைத் தேர்ந்தெடுங்கள் — அதன் கதைகள், கட்டிடக்கலை, கலாச்சார முக்கியத்துவத்தை ஆராய உதவுகிறேன்.",
    atTemple: (t) => `நாம் ${t} இல் இருக்கிறோம். வரலாறு, கட்டிடக்கலை, சடங்குகள் — எதையும் கேளுங்கள்.`,
    atLocation: (l, t) => `நாம் ${t} உள்ளே ${l} இல் நிற்கிறோம். என்ன தெரிந்துகொள்ள விரும்புகிறீர்கள்?`,
    hereIs: (label) => `${label}:`,
    onlyEnglish:
      "குறிப்பு: இப்பகுதியின் விரிவான உரை தற்போது ஆங்கிலத்தில் மட்டுமே சரிபார்க்கப்பட்டுள்ளது. அது ஆங்கிலத்தில் இங்கே தரப்பட்டுள்ளது.",
    noAnswer:
      "இந்த இடம் குறித்து என் பதிவுகளில் சரிபார்க்கப்பட்ட பதில் இல்லை; ஊகிக்க விரும்பவில்லை. அதற்குப் பதிலாக இதைச் சொல்ல முடியும்:",
    thinking: "விளக்குகிறேன்…",
    factLabel: "வரலாற்று ரீதியாக",
    traditionLabel: "மரபுப்படி",
    lookAt: "நான் இதைப் பார்க்கச் சொல்வேன்:",
    sourcesIntro: "இத்தகவல் இந்த மூலங்களிலிருந்து:",
    period: "காலம்",
    deity: "மூலவர்",
    style: "கட்டிடக்கலை பாணி",
    where: "இடம்",
    endNarration: "சுருக்கமாக இந்த இடம் இதுதான். வேறு ஏதேனும் கேளுங்கள், அல்லது தயாராக இருந்தால் தொடருங்கள்.",
  },
  ml: {
    greeting:
      "നമസ്കാരം! ഞാൻ ആര്യ, നിങ്ങളുടെ TempleVerse ഗൈഡ്. ഒരു ക്ഷേത്രം തിരഞ്ഞെടുക്കൂ — അതിന്റെ കഥകൾ, വാസ്തുവിദ്യ, സാംസ്കാരിക പ്രാധാന്യം എന്നിവ പര്യവേക്ഷണം ചെയ്യാൻ ഞാൻ സഹായിക്കാം.",
    atTemple: (t) => `നമ്മൾ ${t}-ൽ ആണ്. ചരിത്രം, വാസ്തുവിദ്യ, ആചാരങ്ങൾ — എന്തും ചോദിക്കൂ.`,
    atLocation: (l, t) => `നമ്മൾ ${t}-ൽ ${l}-ൽ നിൽക്കുന്നു. എന്താണ് അറിയാൻ ആഗ്രഹിക്കുന്നത്?`,
    hereIs: (label) => `${label}:`,
    onlyEnglish:
      "ശ്രദ്ധിക്കുക: ഈ ഭാഗത്തിന്റെ വിശദമായ വാചകം ഇപ്പോൾ ഇംഗ്ലീഷിൽ മാത്രമേ പരിശോധിച്ചിട്ടുള്ളൂ. അത് ഇവിടെ ഇംഗ്ലീഷിൽ നൽകുന്നു.",
    noAnswer:
      "ഈ സ്ഥലത്തെക്കുറിച്ച് എന്റെ രേഖകളിൽ അതിന് പരിശോധിച്ച ഉത്തരമില്ല; ഊഹിക്കാൻ ഞാൻ ആഗ്രഹിക്കുന്നില്ല. പകരം എനിക്ക് ഇത് പറയാനാകും:",
    thinking: "ഞാൻ വിശദീകരിക്കാം…",
    factLabel: "ചരിത്രപരമായി",
    traditionLabel: "പാരമ്പര്യമനുസരിച്ച്",
    lookAt: "ഞാൻ ഇത് നോക്കാൻ നിർദേശിക്കും:",
    sourcesIntro: "ഈ വിവരം ഈ ഉറവിടങ്ങളിൽ നിന്ന്:",
    period: "കാലഘട്ടം",
    deity: "പ്രതിഷ്ഠ",
    style: "വാസ്തുശൈലി",
    where: "സ്ഥലം",
    endNarration: "ചുരുക്കത്തിൽ ഈ സ്ഥലം ഇതാണ്. മറ്റെന്തെങ്കിലും ചോദിക്കൂ, അല്ലെങ്കിൽ തയ്യാറെങ്കിൽ മുന്നോട്ട് പോകൂ.",
  },
};

export const phrase = (lang) => PHRASES[lang] || PHRASES.en;

/* ==================================================================
   Section labels per language
================================================================== */
const SECTION_LABELS = {
  en: { story: "Story", architecture: "Architecture", rituals: "Rituals", significance: "Significance", history: "History", overview: "Overview" },
  hi: { story: "कथा", architecture: "स्थापत्य", rituals: "अनुष्ठान", significance: "महत्व", history: "इतिहास", overview: "परिचय" },
  te: { story: "కథ", architecture: "శిల్పకళ", rituals: "పూజా విధానాలు", significance: "ప్రాముఖ్యత", history: "చరిత్ర", overview: "పరిచయం" },
  ta: { story: "கதை", architecture: "கட்டிடக்கலை", rituals: "சடங்குகள்", significance: "முக்கியத்துவம்", history: "வரலாறு", overview: "அறிமுகம்" },
  ml: { story: "കഥ", architecture: "വാസ്തുവിദ്യ", rituals: "ആചാരങ്ങൾ", significance: "പ്രാധാന്യം", history: "ചരിത്രം", overview: "ആമുഖം" },
};

export const sectionLabel = (lang, key) =>
  (SECTION_LABELS[lang] || SECTION_LABELS.en)[key] || SECTION_LABELS.en[key];

/* ==================================================================
   1. CONTEXT — what Arya currently knows about where the user is
================================================================== */
export function getTempleContext(temple, location = null, lang = "en") {
  if (!temple) return null;
  return {
    lang,
    temple,
    location,
    templeName: getLocalizedField(temple, "name", lang) || temple.name,
    locationName: location ? getLocalizedField(location, "name", lang) || location.name : null,
    scope: location ? "location" : "temple",
    sources: temple.sources || [],
  };
}

/**
 * Read a field for the current language.
 * Returns { text, untranslated } so the UI can be honest about
 * which language the text is actually in.
 */
export function readField(entity, field, lang) {
  if (!entity) return { text: "", untranslated: false };
  const localized = lang !== "en" ? entity.translations?.[lang]?.[field] : null;
  if (localized) return { text: localized, untranslated: false };
  const english = entity[field];
  if (!english) return { text: "", untranslated: false };
  return { text: english, untranslated: lang !== "en" };
}

/* ==================================================================
   2. INTENT DETECTION — multilingual keyword matching
================================================================== */
const INTENTS = [
  {
    id: "builder",
    keywords: [
      "who built", "who made", "builder", "constructed", "who created", "which king", "dynasty", "patron",
      "किसने बनाया", "किसने बनवाया", "निर्माता", "राजा", "वंश",
      "ఎవరు కట్టారు", "ఎవరు నిర్మించారు", "రాజు", "వంశం",
      "யார் கட்டினார்", "கட்டியவர்", "மன்னன்", "வம்சம்",
      "ആരാണ് പണിതത്", "രാജാവ്", "വംശം",
    ],
  },
  {
    id: "history",
    keywords: [
      "history", "historical", "when was", "how old", "century", "year", "past", "timeline", "origin",
      "इतिहास", "कब बना", "कितना पुराना", "शताब्दी", "काल",
      "చరిత్ర", "ఎప్పుడు", "ఎంత పురాతనం", "శతాబ్దం",
      "வரலாறு", "எப்போது", "எத்தனை பழமை", "நூற்றாண்டு",
      "ചരിത്രം", "എപ്പോൾ", "എത്ര പഴക്കം", "നൂറ്റാണ്ട്",
    ],
  },
  {
    id: "architecture",
    keywords: [
      "architect", "architecture", "built how", "structure", "design", "stone", "carving", "tower", "vimana", "gopuram", "pillar", "style",
      "स्थापत्य", "वास्तु", "संरचना", "शिखर", "स्तंभ", "शैली", "नक्काशी",
      "శిల్ప", "నిర్మాణం", "శైలి", "స్తంభ", "గోపుర",
      "கட்டிடக்கலை", "அமைப்பு", "பாணி", "தூண்", "கோபுர", "சிற்ப",
      "വാസ്തു", "ഘടന", "ശൈലി", "തൂൺ", "ഗോപുര", "ശിൽപ",
    ],
  },
  {
    id: "rituals",
    keywords: [
      "ritual", "puja", "pooja", "worship", "ceremony", "festival", "offering", "prayer", "aarti", "abhishek", "darshan",
      "अनुष्ठान", "पूजा", "उत्सव", "आरती", "दर्शन", "परंपरा",
      "పూజ", "ఉత్సవ", "ఆరాధన", "దర్శన",
      "சடங்கு", "பூஜை", "திருவிழா", "வழிபாடு", "தரிசன",
      "ആചാര", "പൂജ", "ഉത്സവ", "ആരാധന", "ദർശന",
    ],
  },
  {
    id: "significance",
    keywords: [
      "significance", "important", "why is this", "why important", "meaning", "matter", "special", "unique",
      "महत्व", "क्यों महत्वपूर्ण", "विशेष", "अर्थ",
      "ప్రాముఖ్యత", "ఎందుకు ముఖ్యం", "ప్రత్యేకత",
      "முக்கியத்துவம்", "ஏன் முக்கியம்", "சிறப்பு",
      "പ്രാധാന്യം", "എന്തുകൊണ്ട് പ്രധാനം", "പ്രത്യേകത",
    ],
  },
  {
    id: "story",
    keywords: [
      "story", "tell me the story", "legend", "myth", "tale", "narrat",
      "कथा", "कहानी", "किंवदंती", "पौराणिक",
      "కథ", "గాథ", "పురాణ",
      "கதை", "புராண", "ஐதீக",
      "കഥ", "ഐതിഹ്യ", "പുരാണ",
    ],
  },
  {
    id: "look",
    keywords: [
      "what should i look", "what to look", "what to see", "notice", "observe", "point out", "show me", "highlight",
      "क्या देखना", "क्या देखूँ", "ध्यान दें",
      "ఏమి చూడాలి", "ఏం చూడాలి",
      "என்ன பார்க்க", "எதைப் பார்க்க", "எதைப் பார்க்க வேண்டும்",
      "എന്ത് കാണണം", "എന്താണ് കാണേണ്ടത്", "നോക്കേണ്ടത്", "എന്ത് നോക്ക",
    ],
  },
  {
    id: "deity",
    keywords: [
      "deity", "god", "goddess", "whom is it dedicated", "which god", "worshipped",
      "देवता", "देवी", "किसे समर्पित", "भगवान",
      "దేవత", "దేవుడు", "ఎవరికి అంకితం",
      "தெய்வம்", "மூலவர்", "யாருக்கு",
      "ദേവത", "പ്രതിഷ്ഠ", "ആർക്ക്",
    ],
  },
  {
    id: "factcheck",
    keywords: [
      "historical fact", "is this true", "fact or", "proven", "evidence", "belief or", "really happen",
      "ऐतिहासिक तथ्य", "क्या यह सच", "प्रमाण",
      "చారిత్రక వాస్తవం", "ఇది నిజమా", "ఆధారం",
      "வரலாற்று உண்மை", "இது உண்மையா", "சான்று",
      "ചരിത്ര വസ്തുത", "ഇത് സത്യമാണോ", "തെളിവ്",
    ],
  },
  {
    id: "where",
    keywords: [
      "where is", "location", "which city", "which state", "how to reach", "address",
      "कहाँ है", "किस शहर", "किस राज्य",
      "ఎక్కడ", "ఏ నగరం", "ఏ రాష్ట్రం",
      "எங்கே", "எந்த நகரம்", "எந்த மாநிலம்",
      "എവിടെ", "ഏത് നഗരം", "ഏത് സംസ്ഥാനം",
    ],
  },
  {
    id: "sources",
    keywords: [
      "source", "reference", "where did you", "citation", "how do you know",
      "स्रोत", "संदर्भ", "आपको कैसे पता",
      "మూలం", "సూచన", "మీకెలా తెలుసు",
      "மூலம்", "ஆதாரம்", "எப்படித் தெரியும்",
      "ഉറവിടം", "അവലംബം", "എങ്ങനെ അറിയാം",
    ],
  },
  {
    id: "overview",
    keywords: [
      "tell me about", "what is this", "about this", "describe", "overview", "introduce", "tell me more",
      "इसके बारे में", "यह क्या है", "बताइए", "और बताइए",
      "దీని గురించి", "ఇది ఏమిటి", "చెప్పండి",
      "இதைப் பற்றி", "இது என்ன", "சொல்லுங்கள்",
      "ഇതിനെക്കുറിച്ച്", "ഇത് എന്താണ്", "പറയൂ",
    ],
  },
];

export function detectIntent(question) {
  const q = String(question || "").toLowerCase().trim();
  if (!q) return "overview";
  for (const intent of INTENTS) {
    if (intent.keywords.some((k) => q.includes(k.toLowerCase()))) return intent.id;
  }
  return "unknown";
}

/* ==================================================================
   3. KNOWLEDGE RETRIEVAL — pull only what is relevant
================================================================== */
export function searchTempleKnowledge(query, context) {
  if (!context) return [];
  const { temple, location, lang } = context;
  const intent = detectIntent(query);
  const chunks = [];

  const push = (label, entity, field) => {
    const { text, untranslated } = readField(entity, field, lang);
    if (text) chunks.push({ label, field, text, untranslated });
  };

  if (location) {
    if (intent === "architecture") push(sectionLabel(lang, "architecture"), location, "architecture");
    else if (intent === "rituals") push(sectionLabel(lang, "rituals"), location, "rituals");
    else if (intent === "significance") push(sectionLabel(lang, "significance"), location, "significance");
    else if (intent === "story" || intent === "history" || intent === "builder") push(sectionLabel(lang, "story"), location, "story");
    else push(sectionLabel(lang, "overview"), location, "description");
  } else {
    if (intent === "architecture") push(sectionLabel(lang, "architecture"), temple, "architecture_summary");
    else if (intent === "history" || intent === "builder") push(sectionLabel(lang, "history"), temple, "history");
    else if (intent === "significance") push(sectionLabel(lang, "significance"), temple, "cultural_significance");
    else push(sectionLabel(lang, "overview"), temple, "description");
  }
  return chunks;
}

/* ==================================================================
   4. ANSWERING
================================================================== */
function withNote(chunk, p) {
  if (!chunk) return "";
  return chunk.untranslated ? `${p.onlyEnglish}\n\n${chunk.text}` : chunk.text;
}

/** Build the "what should I look at" answer from real content. */
function buildLookAnswer(context, p) {
  const { temple, location, lang } = context;
  const source = location || temple;
  const archField = location ? "architecture" : "architecture_summary";
  const arch = readField(source, archField, lang);
  const sig = readField(source, location ? "significance" : "cultural_significance", lang);
  const parts = [];
  if (arch.text) parts.push(arch.text);
  if (sig.text) parts.push(sig.text);
  if (!parts.length) return null;
  const untranslated = arch.untranslated || sig.untranslated;
  const body = `${p.lookAt}\n\n${parts.join("\n\n")}`;
  return untranslated ? `${p.onlyEnglish}\n\n${body}` : body;
}

/** Explain how Arya separates documented history from tradition. */
function buildFactCheckAnswer(context, p) {
  const { temple, location, lang } = context;
  const source = location || temple;
  const story = readField(source, location ? "story" : "history", lang);
  if (!story.text) return null;
  const traditionMarkers = [
    "according to tradition", "traditional account", "local tradition", "tradition holds",
    "legend", "is said", "traditionally", "debated", "uncertain", "believed",
    "मरबு", "மரபுப்படி", "परंपरा", "సంప్రదాయం", "പാരമ്പര്യ",
  ];
  const hasTradition = traditionMarkers.some((m) => story.text.toLowerCase().includes(m.toLowerCase()));
  const note = hasTradition
    ? `${p.traditionLabel} — parts of this account are traditional or debated, and I've marked them as such in the text below. ${p.factLabel}, what is documented comes from inscriptions, archaeological survey records and the sources listed for this temple.`
    : `${p.factLabel}, this account is based on documented records — inscriptions, archaeological survey material and the sources listed for this temple. Where something is traditional rather than documented, I say so explicitly.`;
  return `${note}\n\n${withNote(story, p)}`;
}

function buildSourcesAnswer(context, p) {
  const list = context.sources || [];
  if (!list.length) return null;
  return `${p.sourcesIntro}\n\n${list.map((s) => `• ${s.title} — ${s.url}`).join("\n")}`;
}

/**
 * Main entry point. Returns a structured answer object.
 * `text` is always safe to display and to speak.
 */
export function answerTempleQuestion(question, context) {
  const p = phrase(context?.lang || "en");
  if (!context) {
    return { text: p.greeting, intent: "greeting", untranslated: false, sources: [] };
  }

  const { temple, location, lang, templeName, locationName } = context;
  const intent = detectIntent(question);
  const target = location || temple;
  const sources = context.sources || [];

  const answerFrom = (field, label) => {
    const chunk = readField(target, field, lang);
    if (!chunk.text) return null;
    return { text: `${p.hereIs(label)}\n\n${withNote(chunk, p)}`, untranslated: chunk.untranslated };
  };

  let built = null;

  switch (intent) {
    case "builder":
    case "history":
      built = location
        ? answerFrom("story", sectionLabel(lang, "story"))
        : answerFrom("history", sectionLabel(lang, "history"));
      if (!location && temple.timeline?.length) {
        const tl = temple.timeline.map((t) => `• ${t.year} — ${t.event}`).join("\n");
        built = built
          ? { ...built, text: `${built.text}\n\n${tl}` }
          : { text: tl, untranslated: lang !== "en" };
      }
      break;
    case "architecture":
      built = location
        ? answerFrom("architecture", sectionLabel(lang, "architecture"))
        : answerFrom("architecture_summary", sectionLabel(lang, "architecture"));
      break;
    case "rituals":
      built = location
        ? answerFrom("rituals", sectionLabel(lang, "rituals"))
        : answerFrom("cultural_significance", sectionLabel(lang, "rituals"));
      break;
    case "significance":
      built = location
        ? answerFrom("significance", sectionLabel(lang, "significance"))
        : answerFrom("cultural_significance", sectionLabel(lang, "significance"));
      break;
    case "story":
      built = location
        ? answerFrom("story", sectionLabel(lang, "story"))
        : answerFrom("history", sectionLabel(lang, "story"));
      break;
    case "look": {
      const text = buildLookAnswer(context, p);
      if (text) built = { text, untranslated: false };
      break;
    }
    case "deity": {
      const deity = readField(temple, "main_deity", lang);
      if (deity.text) built = { text: `${p.deity}: ${deity.text}`, untranslated: deity.untranslated };
      break;
    }
    case "factcheck": {
      const text = buildFactCheckAnswer(context, p);
      if (text) built = { text, untranslated: false };
      break;
    }
    case "where":
      built = {
        text: `${p.where}: ${temple.location}, ${temple.city}, ${temple.state}, ${temple.country}.`,
        untranslated: false,
      };
      break;
    case "sources": {
      const text = buildSourcesAnswer(context, p);
      if (text) built = { text, untranslated: false };
      break;
    }
    case "overview":
      built = answerFrom("description", sectionLabel(lang, "overview"));
      break;
    default:
      built = null;
  }

  if (built) return { ...built, intent, sources };

  // Honest fallback — never invent, always offer what is known.
  const fallbackChunk = readField(target, "description", lang);
  const opener = location
    ? p.atLocation(locationName, templeName)
    : p.atTemple(templeName);
  return {
    text: `${p.noAnswer}\n\n${withNote(fallbackChunk, p) || opener}`,
    intent: "fallback",
    untranslated: fallbackChunk.untranslated,
    sources,
  };
}

/* ==================================================================
   5. NARRATION SCRIPTS — unique per temple AND per location
================================================================== */
export function generateNarrationScript(context) {
  if (!context) return "";
  const { temple, location, lang, templeName, locationName } = context;
  const p = phrase(lang);
  const parts = [];

  if (location) {
    parts.push(p.atLocation(locationName, templeName));
    const desc = readField(location, "description", lang);
    const story = readField(location, "story", lang);
    const arch = readField(location, "architecture", lang);
    const sig = readField(location, "significance", lang);
    [desc, story, arch, sig].forEach((c) => {
      if (c.text) parts.push(c.text);
    });
  } else {
    parts.push(p.atTemple(templeName));
    const desc = readField(temple, "description", lang);
    const period = readField(temple, "historical_period", lang);
    const deity = readField(temple, "main_deity", lang);
    const history = readField(temple, "history", lang);
    const arch = readField(temple, "architecture_summary", lang);
    if (desc.text) parts.push(desc.text);
    if (period.text) parts.push(`${p.period}: ${period.text}.`);
    if (deity.text) parts.push(`${p.deity}: ${deity.text}.`);
    if (history.text) parts.push(history.text);
    if (arch.text) parts.push(arch.text);
  }

  parts.push(p.endNarration);
  return parts.filter(Boolean).join(" ");
}

/** Short narration used inside the guided tour (one step). */
export function generateStepNarration(step, context) {
  if (!step || !context) return "";
  const { lang } = context;
  const title = readField(step, "title", lang);
  const description = readField(step, "description", lang);
  const locationDesc = context.location ? readField(context.location, "description", lang) : { text: "" };
  return [title.text, description.text, locationDesc.text].filter(Boolean).join(". ");
}

/* ==================================================================
   6. SUGGESTED QUESTIONS — change with the current context
================================================================== */
const SUGGESTIONS = {
  en: {
    temple: ["Who built this temple?", "Why is this temple important?", "Tell me about the architecture", "What are the sources?"],
    location: ["Tell me the story", "What should I look at here?", "What rituals happen here?", "Is this history or tradition?"],
  },
  hi: {
    temple: ["यह मंदिर किसने बनवाया?", "यह मंदिर क्यों महत्वपूर्ण है?", "स्थापत्य के बारे में बताइए", "स्रोत क्या हैं?"],
    location: ["कथा सुनाइए", "यहाँ क्या देखना चाहिए?", "यहाँ कौन से अनुष्ठान होते हैं?", "यह इतिहास है या परंपरा?"],
  },
  te: {
    temple: ["ఈ ఆలయాన్ని ఎవరు కట్టారు?", "ఈ ఆలయం ఎందుకు ముఖ్యం?", "శిల్పకళ గురించి చెప్పండి", "మూలాలు ఏమిటి?"],
    location: ["కథ చెప్పండి", "ఇక్కడ ఏమి చూడాలి?", "ఇక్కడ ఏ పూజలు జరుగుతాయి?", "ఇది చరిత్రా లేక సంప్రదాయమా?"],
  },
  ta: {
    temple: ["இந்தக் கோயிலை யார் கட்டினார்?", "இந்தக் கோயில் ஏன் முக்கியம்?", "கட்டிடக்கலை பற்றி சொல்லுங்கள்", "மூலங்கள் என்ன?"],
    location: ["கதையைச் சொல்லுங்கள்", "இங்கே எதைப் பார்க்க வேண்டும்?", "இங்கே என்ன சடங்குகள் நடக்கும்?", "இது வரலாறா மரபா?"],
  },
  ml: {
    temple: ["ഈ ക്ഷേത്രം ആരാണ് പണിതത്?", "ഈ ക്ഷേത്രം എന്തുകൊണ്ട് പ്രധാനം?", "വാസ്തുവിദ്യയെക്കുറിച്ച് പറയൂ", "ഉറവിടങ്ങൾ ഏതാണ്?"],
    location: ["കഥ പറയൂ", "ഇവിടെ എന്താണ് കാണേണ്ടത്?", "ഇവിടെ എന്ത് ആചാരങ്ങൾ നടക്കുന്നു?", "ഇത് ചരിത്രമോ പാരമ്പര്യമോ?"],
  },
};

export function getSuggestedQuestions(context) {
  const lang = context?.lang || "en";
  const set = SUGGESTIONS[lang] || SUGGESTIONS.en;
  return context?.location ? set.location : set.temple;
}

/* ==================================================================
   7. AI MODEL BRIDGE (grounded prompt — retrieval, not free generation)
================================================================== */
export function buildModelPrompt(question, context) {
  const chunks = searchTempleKnowledge(question, context);
  const knowledge = chunks.map((c) => `## ${c.label}\n${c.text}`).join("\n\n");
  const sources = (context?.sources || []).map((s) => `${s.title} (${s.url})`).join("; ");
  return [
    "You are Arya, a knowledgeable and respectful Indian heritage guide.",
    "Answer ONLY from the CONTEXT below. If the context does not contain the answer, say you do not have verified information.",
    "Always distinguish documented history from traditional belief. Never present mythology as proven fact.",
    `Reply in language code: ${context?.lang || "en"}.`,
    "",
    `TEMPLE: ${context?.templeName || "-"}`,
    `LOCATION: ${context?.locationName || "(whole temple)"}`,
    "",
    "CONTEXT:",
    knowledge || "(no matching records)",
    "",
    `SOURCES: ${sources || "(none)"}`,
    "",
    `QUESTION: ${question}`,
  ].join("\n");
}
