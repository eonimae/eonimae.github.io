(function () {
  const STORAGE_KEY = "eonimae_theme";
  const LANGUAGE_STORAGE_KEY = "eonimae_language";
  const VISIT_STORAGE_KEY = "eonimae_last_visit_at";
  const VISIT_INTERVAL = 2 * 60 * 60 * 1000;
  const LOCAL_HOSTS = ["localhost", "127.0.0.1", ""];
  const themeToggle = document.querySelector("[data-theme-toggle]");
  const languageToggle = document.querySelector("[data-language-toggle]");
  const viewPanels = document.querySelectorAll("[data-view]");
  const detailButtons = document.querySelectorAll(".detail-toggle");
  const analyticalFilterButtons = document.querySelectorAll("[data-analytical-filter]");
  const analyticalCards = document.querySelectorAll("[data-analytical-platform]");
  const languageCards = document.querySelectorAll("[data-language-card]");
  const navDropdownItems = document.querySelectorAll(".has-dropdown");
  const workshopToggles = document.querySelectorAll("[data-workshop-toggle]");
  const focusCards = document.querySelectorAll(".focus-card");
  const visitCount = document.querySelector("[data-visit-count]");
  const defaultView = "home";
  const translations = {
    en: {
      "accessibility.skipLink": "Skip to content",
      "accessibility.primaryNav": "Primary navigation",
      "accessibility.visitCounter": "Total site visits",
      "accessibility.brandHome": "Camilo Fuentes Peña / eonimae home",
      "accessibility.homeSubmenu": "Home submenu",
      "accessibility.narrativeSubmenu": "Narrative Work submenu",
      "accessibility.analyticalSubmenu": "Analytical Writing submenu",
      "accessibility.displayPreferences": "Display preferences",
      "accessibility.analyticalFilter": "Filter analytical pieces by platform",
      "nav.home": "Home",
      "home.title": "What I do",
      "home.subtitle": "Narrative author · Analytical writer · Independent applied AI researcher · AI workshop designer",
      "home.body1": "Hi, I'm Camilo. Welcome — this is where you'll find my most recent work. Take your time looking around.",
      "home.body2": "My work is centered on writing. I develop <strong><em>long-form narrative fiction</em></strong>, which forms the core of my work. I also write <strong><em>analytical essays</em></strong> and <strong><em>technical pieces</em></strong>, bringing to each the discipline of a scientific background: close observation, evidence, structure, and careful qualification.",
      "home.body3": "AI is one of my recurring subjects and one of the areas where I apply that method. I examine how systems behave in practice, run independent behavioral probes on language models, and test tools against real workflows, documenting configurations, constraints, and limitations rather than repeating marketing claims.",
      "home.body4": "I also <strong><em>design workshops</em></strong> that help professionals integrate AI into document-heavy work — drafting, research, and review — while keeping judgment and final decisions under human control.",
      "bio.title": "Bio",
      "bio.body1": "I am from Masaya, Nicaragua, and trained as a biologist before spending fifteen years in environmental science research, specializing in paleolimnology — reconstructing long-term ecosystem change from lake sediment records. My background includes a master’s degree in water sciences at CIRA/UNAN-Managua, doctoral research at Queen’s University’s PEARL Lab, and six years of university teaching in Nicaragua and Canada in biology, statistics, and scientific methodology.",
      "bio.body2": "After my doctoral program ended following a health crisis in 2025, I redirected the discipline developed through research and teaching toward writing. This marked a change of field rather than a break in method: observation, evidence, structure, and careful qualification remain central to how I work. I work bilingually in Spanish and English.",
      "nav.narrative": "Narrative Work",
      "nav.novel": "Novel",
      "novel.title": "Novel",
      "novel.spanish.type": "Novel in progress · 40% drafted",
      "novel.rights": "All rights reserved.",
      "novel.registration": "Work registered with Safe Creative:",
      "nav.visualNarrative": "Visual Narrative",
      "visualNarrative.title": "Visual Narrative",
      "visualNarrative.dogaduchi.body1": "DogaDuchi is an animated series in development, with a hybrid tone that blends original mythology, absurdist humor, and cross-cultural storytelling.",
      "visualNarrative.dogaduchi.body2": "I’m looking to connect with animation writers who can translate a dense universe into episodes without flattening it, art directors and character designers with cross-cultural sensibility, and producers or studios experienced in international co-production.",
      "visualNarrative.dogaduchi.body3": "I would remain involved as creator of the universe, art director, and guardian of its narrative and visual canon.",
      "visualNarrative.gipio.body1": "Gipio is an illustrated picture-book series in development for early readers — the story of a small robot who can only survive if someone speaks to him, learning to bridge cultures through voice and affection rather than instruction.",
      "visualNarrative.gipio.body2": "I’m looking to connect with picture-book illustrators experienced in warm, character-driven design for children’s series.",
      "visualNarrative.gipio.body3": "I would remain involved as the creator and author of the series.",
      "nav.narrativeInquiry": "Narrative Inquiry",
      "narrativeInquiry.title": "Narrative Inquiry",
      "narrativeInquiry.intro": "These pieces use narrative form to examine ideas that resist direct argument. Through personal reflection and speculative construction, they turn questions about writing, authorship, intention, and technological mediation into experiences shaped by voice, ambiguity, and dramatic tension.",
      "narrativeInquiry.first.title": "The Day Writing Stopped Being Alone—and Became Dangerous",
      "narrativeInquiry.first.excerpt": "A personal and literary inquiry into what can happen when technological assistance begins to alter the relationship between a writer, the language, and the voice behind it.",
      "narrativeInquiry.first.href": "https://open.substack.com/pub/thediagonal1/p/the-day-writing-stopped-being-aloneand?r=7ypbg4&utm_campaign=post-expanded-share&utm_medium=web",
      "narrativeInquiry.second.title": "AI... for writing?",
      "narrativeInquiry.second.excerpt": "A speculative scene that uses dialogue, institutional performance, and uncertainty to examine what writing assistance might reveal about intention, trust, and control.",
      "common.readFullPiece": "Read full piece",
      "narrativeProtocols.tool.body": "A protocol initially designed to examine character subtext in narrative scenes was later expanded to analyze abstract agents such as institutions, systems, and authorial voices. A <a class=\"inline-link\" href=\"https://www.linkedin.com/posts/camilo-fuentes-p_from-narrative-protocol-to-analytical-tool-activity-7379435900398866435-ezAr?utm_source=share&utm_medium=member_desktop&rcm=ACoAAAuFHDoBWPbF78mAgphZ34PmcMt0KkUoZwQ\" target=\"_blank\" rel=\"noopener noreferrer\">comparative application</a> showed how the original version encouraged dramatization through implied characters, while the extended version allowed more direct analysis of silences, contradictions, omissions, and institutional positioning.",
      "narrativeProtocols.analysis.body": "The <a class=\"inline-link\" href=\"https://drive.google.com/file/d/1UV_BFk6FYJZ7GWX3il6OsZUS9Y6FrSQ2/view?usp=sharing\" target=\"_blank\" rel=\"noopener noreferrer\">extended protocol</a> identifies focal agents and traces what a text implies through silence, omission, wording, contradiction, spatial or rhetorical positioning, and the reactions of other agents. Its purpose is to produce disciplined interpretation grounded in verified textual evidence.",
      "narrativeProtocols.analyzer.body": "A GPT-based instrument for rigorous subtext analysis in narrative and non-fiction texts. It identifies focal agents and examines silences, omissions, wording, power relations, and implicit tensions while grounding the analysis strictly in textual evidence.",
      "narrativeProtocols.testInstrument": "Test the instrument",
      "narrativeProtocols.shareFeedback": "Share feedback",
      "nav.narrativeProtocols": "Narrative Protocols",
      "narrativeProtocols.title": "Narrative Protocols",
      "nav.analyticalWriting": "Analytical Writing",
      "nav.analyticalPieces": "Analytical pieces",
      "nav.technicalPieces": "Technical pieces",
      "nav.aiModelProbes": "AI Model Probes",
      "nav.workshops": "Workshops",
      "nav.contact": "Contact",
      "analyticalPieces.title": "Analytical pieces",
      "technicalPieces.title": "Technical pieces",
      "aiModelProbes.title": "AI Model Probes",
      "analyticalPieces.intro": "My analytical writing examines how AI systems behave in practice, how institutions interpret and implement emerging technologies, and how professional judgment is shaped by evidence, incentives, access, and operational constraints. Across these pieces, I combine conceptual distinctions, comparative analysis, documented cases, and technical sources to clarify problems that are often discussed too broadly.",
      "filter.all": "All",
      "filter.medium": "Medium",
      "filter.substack": "Substack",
      "filter.linkedinArticles": "LinkedIn Articles",
      "analyticalPieces.runtime.excerpt": "An examination of model stability and runtime control, developed through conceptual argument, exploratory evidence, and a distinction between producing correct outputs and sustaining coherent behavior.",
      "analyticalPieces.collapse.excerpt": "A reflection on how personal experience, disciplined experimentation, and public testing converged into a broader question about governing model behavior during execution.",
      "analyticalPieces.greeting.excerpt": "A comparative study of five AI systems using the same prompt, an explicit rubric, blind evaluation, and metaanalysis to identify patterns of behavioral stability.",
      "analyticalPieces.orchestrator.excerpt": "An argument for a professional function focused on coordinating AI implementation, organizational judgment, and system use across roles that current institutions treat separately.",
      "analyticalPieces.hiring.excerpt": "An analysis of how valuable information produced during demanding hiring processes is lost, why existing incentives preserve that loss, and how the signal might become transferable.",
      "analyticalPieces.data.excerpt": "A reframing of the data-scarcity debate through distinctions between total data, accessible data, usable data, quality, ownership, and institutional control.",
      "analyticalPieces.alignment.excerpt": "An analysis of alignment as an operational problem that becomes visible when models move beyond controlled evaluation and interact with users under changing conditions.",
      "analyticalPieces.anything.excerpt": "A reflection on why AI-assisted professional preparation remains cognitive work, even when its visible outputs obscure the judgment, selection, revision, and responsibility involved.",
      "technicalPieces.intro": "My technical writing focuses on practical AI use: how to evaluate models against real workflows, how hardware and software constraints shape performance, and how technical claims should be tested before they guide decisions. These pieces combine reproducible methods, configuration details, documented limitations, and user-centered criteria to help readers choose and use AI tools more effectively.",
      "technicalPieces.modelChoice.excerpt": "A practical, repeatable method for comparing AI models according to the user’s own skills, workflow, and priorities, using structured self-evaluation, public benchmarks, and verification.",
      "technicalPieces.localTools.excerpt": "A documented technical account of local AI coding tools, covering hardware requirements, configuration details, compatibility problems, performance limits, and the practical trade-offs between local and cloud-based systems.",
      "aiModelProbes.body": "A curated sequence of behavioral probes comparing phi-3-mini outputs under two conditions: <a class=\"inline-link\" href=\"https://tinyurl.com/StableReasoning\" target=\"_blank\" rel=\"noopener noreferrer\">standalone generation</a> and generation guided by an <a class=\"inline-link\" href=\"https://tinyurl.com/ReasoningFrameworkImpact\" target=\"_blank\" rel=\"noopener noreferrer\">external prompt-based revision layer</a>. Across repeated runs, the probes examined differences in tone, coherence, closure, structural consistency, <a class=\"inline-link\" href=\"https://tinyurl.com/BehavioralSignatures\" target=\"_blank\" rel=\"noopener noreferrer\">behavioral signatures</a>, <a class=\"inline-link\" href=\"https://tinyurl.com/BehavioralContinuity\" target=\"_blank\" rel=\"noopener noreferrer\">behavioral continuity</a>, and <a class=\"inline-link\" href=\"https://tinyurl.com/StructuredReasoning\" target=\"_blank\" rel=\"noopener noreferrer\">structured reasoning</a>. The external layer changed how outputs were evaluated and revised at runtime; it did not alter the underlying model or its capabilities.",
      "workshops.title": "Workshops",
      "workshops.intro": "These workshops help professionals and teams integrate AI into real documentation, research, review, and communication workflows. Each offer is designed to reduce repetitive work, improve consistency, and support better results while keeping judgment and final decisions under human control.",
      "workshops.format": "I offer workshops consisting of 3 two-hour sessions — 6 hours in total — delivered online or in person, subject to agreement.<br><br>Online: 1–10 participants<br>In person (Nicaragua only): 5–15 participants",
      "workshops.applied.toggle": "Applied AI Workshops",
      "workshops.applied.title": "Applied AI Workshops for Professional Document Workflows",
      "workshops.applied.body1": "A practical workshop built around how your team actually prepares, reviews, and delivers documents. It identifies where AI can reduce repetitive work, improve consistency, and support better results without replacing professional judgment.",
      "workshops.applied.body2": "The format adapts to the team’s current level of AI experience.",
      "workshops.applied.contact": "If you or your team would benefit from this workshop, <a href=\"#contact\" data-view-link=\"contact\">contact me</a>.",
      "workshops.thematic.toggle": "Thematic Workshops",
      "workshops.thematic.title": "Thematic Workshops",
      "workshops.thematic.intro": "Workshops centered on a clearly defined professional need. Each one has established content, exercises, materials, duration, and expected results, allowing the client to know in advance what participants will work on.",
      "workshops.documentWriting.title": "Professional Document Writing with AI",
      "workshops.documentWriting.body1": "Production of reports, summaries, drafts, and analytical documents using clear instructions, defined audiences, and human control over content and final decisions.",
      "workshops.documentWriting.body2": "Participants work on prompt design, argument structure, thesis and counterargument control, professional drafting, and the communication of complex information to non-specialized audiences.",
      "workshops.research.title": "AI-Assisted Research",
      "workshops.research.body1": "Use of AI to delimit research problems, formulate questions, organize initial sources, extract information, and synthesize extensive documents or technical literature.",
      "workshops.research.body2": "The workshop also covers cross-source comparison, detection of contradictions and information gaps, evidence traceability, and preparation of clear, defensible conclusions.",
      "workshops.review.title": "Document Review and Quality Control with AI",
      "workshops.review.body1": "Critical review of AI outputs and professional documents to identify weak responses, unsupported assumptions, missing context, tone problems, inconsistencies, and failure to follow instructions.",
      "workshops.review.body2": "Participants compare versions, evaluate substantive changes, improve argumentative structure, and review technical documents for clarity, coherence, conceptual precision, and professional tone.",
      "workshops.thematic.contact": "If you or your team are interested in one of these thematic workshops, <a href=\"#contact\" data-view-link=\"contact\">contact me</a>.",
      "contact.title": "Contact",
      "contact.cardTitle": "Contact",
      "contact.publicLinks": "Public links",
      "footer.visitLabel": "# visits",
    },
    es: {
      "accessibility.skipLink": "Ir al contenido",
      "accessibility.primaryNav": "Navegación principal",
      "accessibility.visitCounter": "Total de visitas al sitio",
      "accessibility.brandHome": "Inicio de Camilo Fuentes Peña / eonimae",
      "accessibility.homeSubmenu": "Submenú de Inicio",
      "accessibility.narrativeSubmenu": "Submenú de Obra narrativa",
      "accessibility.analyticalSubmenu": "Submenú de Escritura analítica",
      "accessibility.displayPreferences": "Preferencias de visualización",
      "accessibility.analyticalFilter": "Filtrar piezas analíticas por plataforma",
      "nav.home": "Inicio",
      "home.title": "Mi trabajo",
      "home.subtitle": "Narrador · Escritor analítico · Investigador de IA aplicada · Diseñador de talleres de IA",
      "home.body1": "Hola, soy Camilo. Bienvenido a mi sitio — aquí vas a encontrar mi trabajo más reciente. Navegalo con calma.",
      "home.body2": "Mi trabajo se centra en la escritura. Desarrollo <strong><em>ficción narrativa</em></strong> de largo aliento, que constituye el núcleo de mi trabajo. También escribo <strong><em>ensayos analíticos</em></strong> y <strong><em>piezas técnicas</em></strong>, aplicando a cada una la disciplina de mi formación científica: observación rigurosa, evidencia, estructura y precisión en las afirmaciones.",
      "home.body3": "La IA es uno de mis temas recurrentes y uno de los campos donde aplico ese método. Examino cómo se comportan los sistemas en la práctica, realizo pruebas conductuales independientes con modelos de lenguaje y evalúo herramientas en flujos de trabajo reales, documentando configuraciones, restricciones y limitaciones en lugar de repetir afirmaciones comerciales.",
      "home.body4": "Además, <strong><em>diseño talleres</em></strong> que ayudan a profesionales a integrar la IA en trabajos intensivos en documentación —redacción, investigación y revisión—, manteniendo el criterio y las decisiones finales bajo control humano.",
      "bio.title": "Bio",
      "bio.body1": "Soy de Masaya, Nicaragua, y me formé como biólogo antes de dedicar quince años a la investigación en ciencias ambientales, con especialización en paleolimnología: la reconstrucción de cambios ecosistémicos de largo plazo a partir de registros en sedimentos lacustres. Mi trayectoria incluye una maestría en Ciencias del Agua en el CIRA/UNAN-Managua, investigación doctoral en el PEARL Lab de Queen’s University y seis años de docencia universitaria en Nicaragua y Canadá en biología, estadística y metodología científica.",
      "bio.body2": "Después de que mi programa doctoral terminara tras una crisis de salud en 2025, reorienté hacia la escritura la disciplina desarrollada durante años de investigación y docencia. Esto marcó un cambio de campo, no una ruptura de método: la observación, la evidencia, la estructura y la precisión en las afirmaciones siguen siendo centrales en mi trabajo. Trabajo de forma bilingüe en español e inglés.",
      "nav.narrative": "Obra narrativa",
      "nav.novel": "Novela",
      "novel.title": "Novela",
      "novel.spanish.type": "Novela en progreso · 40% redactada",
      "novel.rights": "Todos los derechos reservados.",
      "novel.registration": "Obra registrada en Safe Creative:",
      "nav.visualNarrative": "Narrativa visual",
      "visualNarrative.title": "Narrativa visual",
      "visualNarrative.dogaduchi.body1": "DogaDuchi es una serie animada en desarrollo, con un tono híbrido que combina mitología original, humor absurdo y narración intercultural.",
      "visualNarrative.dogaduchi.body2": "Busco conectar con guionistas de animación capaces de traducir un universo denso en episodios sin reducir su complejidad, así como con directores de arte y diseñadores de personajes con sensibilidad intercultural, y con productores o estudios con experiencia en coproducciones internacionales.",
      "visualNarrative.dogaduchi.body3": "Yo permanecería involucrado como creador del universo, director de arte y custodio de su canon narrativo y visual.",
      "visualNarrative.gipio.body1": "Gipio es una serie de libros álbum ilustrados en desarrollo para primeros lectores: la historia de un pequeño robot que solo puede sobrevivir si alguien le habla y que aprende a tender puentes entre culturas mediante la voz y el afecto, no mediante la instrucción.",
      "visualNarrative.gipio.body2": "Busco conectar con ilustradores de libros infantiles con experiencia en diseño cálido, centrado en personajes y pensado para series.",
      "visualNarrative.gipio.body3": "Yo permanecería involucrado como creador y autor de la serie.",
      "nav.narrativeInquiry": "Indagación narrativa",
      "narrativeInquiry.title": "Indagación narrativa",
      "narrativeInquiry.intro": "Estas piezas utilizan la forma narrativa para examinar ideas que se resisten al argumento directo. Mediante la reflexión personal y la construcción especulativa, convierten preguntas sobre la escritura, la autoría, la intención y la mediación tecnológica en experiencias moldeadas por la voz, la ambigüedad y la tensión dramática.",
      "narrativeInquiry.first.title": "El día que escribir dejó de ser un acto solitario —y se volvió peligroso",
      "narrativeInquiry.first.excerpt": "Una indagación personal y literaria sobre lo que puede ocurrir cuando la asistencia tecnológica comienza a alterar la relación entre un escritor, el lenguaje y la voz que hay detrás.",
      "narrativeInquiry.first.href": "https://open.substack.com/pub/thediagonal1/p/the-day-writing-stopped-being-alone?r=7ypbg4&utm_campaign=post-expanded-share&utm_medium=web",
      "narrativeInquiry.second.title": "AI... for writing?",
      "narrativeInquiry.second.excerpt": "Una escena especulativa que utiliza el diálogo, la actuación institucional y la incertidumbre para examinar lo que la asistencia en la escritura puede revelar sobre la intención, la confianza y el control.",
      "common.readFullPiece": "Lee la pieza completa",
      "narrativeProtocols.tool.body": "Un protocolo diseñado inicialmente para examinar el subtexto de los personajes en escenas narrativas se amplió posteriormente para analizar agentes abstractos, como instituciones, sistemas y voces autorales. Una <a class=\"inline-link\" href=\"https://www.linkedin.com/posts/camilo-fuentes-p_from-narrative-protocol-to-analytical-tool-activity-7379435900398866435-ezAr?utm_source=share&utm_medium=member_desktop&rcm=ACoAAAuFHDoBWPbF78mAgphZ34PmcMt0KkUoZwQ\" target=\"_blank\" rel=\"noopener noreferrer\">aplicación comparativa</a> mostró cómo la versión original favorecía la dramatización mediante personajes implícitos, mientras que la versión ampliada permitía un análisis más directo de silencios, contradicciones, omisiones y posicionamientos institucionales.",
      "narrativeProtocols.analysis.body": "El <a class=\"inline-link\" href=\"https://drive.google.com/file/d/1UV_BFk6FYJZ7GWX3il6OsZUS9Y6FrSQ2/view?usp=sharing\" target=\"_blank\" rel=\"noopener noreferrer\">protocolo ampliado</a> identifica agentes focales y rastrea lo que un texto implica mediante el silencio, la omisión, la elección de palabras, la contradicción, el posicionamiento espacial o retórico y las reacciones de otros agentes. Su propósito es producir una interpretación disciplinada, sustentada en evidencia textual verificada.",
      "narrativeProtocols.analyzer.body": "Un instrumento basado en GPT para el análisis riguroso del subtexto en textos narrativos y de no ficción. Identifica agentes focales y examina silencios, omisiones, formulaciones, relaciones de poder y tensiones implícitas, fundamentando el análisis estrictamente en evidencia textual.",
      "narrativeProtocols.testInstrument": "Prueba el instrumento",
      "narrativeProtocols.shareFeedback": "Comparte tus comentarios",
      "nav.narrativeProtocols": "Protocolos narrativos",
      "narrativeProtocols.title": "Protocolos narrativos",
      "nav.analyticalWriting": "Escritura analítica",
      "nav.analyticalPieces": "Piezas analíticas",
      "nav.technicalPieces": "Piezas técnicas",
      "nav.aiModelProbes": "Pruebas de modelos de IA",
      "nav.workshops": "Talleres",
      "nav.contact": "Contacto",
      "analyticalPieces.title": "Piezas analíticas",
      "technicalPieces.title": "Piezas técnicas",
      "aiModelProbes.title": "Pruebas de modelos de IA",
      "analyticalPieces.intro": "Mi escritura analítica examina cómo se comportan los sistemas de IA en la práctica, cómo las instituciones interpretan e implementan tecnologías emergentes y cómo el criterio profesional está condicionado por la evidencia, los incentivos, el acceso y las restricciones operativas. En estas piezas combino distinciones conceptuales, análisis comparativo, casos documentados y fuentes técnicas para esclarecer problemas que suelen abordarse de manera demasiado general.",
      "filter.all": "Todos",
      "filter.medium": "Medium",
      "filter.substack": "Substack",
      "filter.linkedinArticles": "Artículos de LinkedIn",
      "analyticalPieces.runtime.excerpt": "Un examen de la estabilidad de los modelos y del control en tiempo de ejecución, desarrollado mediante argumentación conceptual, evidencia exploratoria y una distinción entre producir resultados correctos y sostener un comportamiento coherente.",
      "analyticalPieces.collapse.excerpt": "Una reflexión sobre cómo la experiencia personal, la experimentación disciplinada y las pruebas públicas convergieron en una pregunta más amplia sobre la regulación del comportamiento de los modelos durante la ejecución.",
      "analyticalPieces.greeting.excerpt": "Un estudio comparativo de cinco sistemas de IA utilizando el mismo prompt, una rúbrica explícita, evaluación ciega y metaanálisis para identificar patrones de estabilidad conductual.",
      "analyticalPieces.orchestrator.excerpt": "Un argumento a favor de una función profesional centrada en coordinar la implementación de IA, el criterio organizacional y el uso de sistemas entre roles que las instituciones actuales tratan por separado.",
      "analyticalPieces.hiring.excerpt": "Un análisis de cómo se pierde información valiosa producida durante procesos de contratación exigentes, por qué los incentivos existentes perpetúan esa pérdida y cómo esa señal podría volverse transferible.",
      "analyticalPieces.data.excerpt": "Un replanteamiento del debate sobre la escasez de datos a partir de las distinciones entre datos totales, accesibles, utilizables, calidad, propiedad y control institucional.",
      "analyticalPieces.alignment.excerpt": "Un análisis de la alineación como problema operativo que se vuelve visible cuando los modelos salen de evaluaciones controladas e interactúan con usuarios bajo condiciones cambiantes.",
      "analyticalPieces.anything.excerpt": "Una reflexión sobre por qué la preparación profesional asistida por IA sigue siendo trabajo cognitivo, aun cuando sus resultados visibles oculten el criterio, la selección, la revisión y la responsabilidad involucrados.",
      "technicalPieces.intro": "Mis piezas técnicas se centran en el uso práctico de la IA: cómo evaluar modelos frente a flujos de trabajo reales, cómo las limitaciones de hardware y software condicionan el rendimiento y cómo deben ponerse a prueba las afirmaciones técnicas antes de que orienten decisiones. Estas piezas combinan métodos reproducibles, detalles de configuración, limitaciones documentadas y criterios centrados en el usuario para ayudar a los lectores a elegir y utilizar herramientas de IA de forma más efectiva.",
      "technicalPieces.modelChoice.excerpt": "Un método práctico y repetible para comparar modelos de IA según las capacidades, el flujo de trabajo y las prioridades del propio usuario, mediante autoevaluación estructurada, benchmarks públicos y verificación.",
      "technicalPieces.localTools.excerpt": "Un análisis técnico documentado de herramientas locales de programación asistida por IA, que aborda requisitos de hardware, detalles de configuración, problemas de compatibilidad, límites de rendimiento y las compensaciones prácticas entre sistemas locales y servicios en la nube.",
      "aiModelProbes.body": "Una secuencia curada de pruebas conductuales que compara las respuestas de phi-3-mini bajo dos condiciones: <a class=\"inline-link\" href=\"https://tinyurl.com/StableReasoning\" target=\"_blank\" rel=\"noopener noreferrer\">generación independiente</a> y generación guiada por una <a class=\"inline-link\" href=\"https://tinyurl.com/ReasoningFrameworkImpact\" target=\"_blank\" rel=\"noopener noreferrer\">capa externa de revisión basada en prompts</a>. A lo largo de ejecuciones repetidas, las pruebas examinaron diferencias en tono, coherencia, cierre, consistencia estructural, <a class=\"inline-link\" href=\"https://tinyurl.com/BehavioralSignatures\" target=\"_blank\" rel=\"noopener noreferrer\">firmas conductuales</a>, <a class=\"inline-link\" href=\"https://tinyurl.com/BehavioralContinuity\" target=\"_blank\" rel=\"noopener noreferrer\">continuidad conductual</a> y <a class=\"inline-link\" href=\"https://tinyurl.com/StructuredReasoning\" target=\"_blank\" rel=\"noopener noreferrer\">razonamiento estructurado</a>. La capa externa modificó la forma en que las respuestas eran evaluadas y revisadas durante la ejecución; no alteró el modelo subyacente ni sus capacidades.",
      "workshops.title": "Talleres",
      "workshops.intro": "Estos talleres ayudan a profesionales y equipos a integrar la IA en flujos reales de documentación, investigación, revisión y comunicación. Cada propuesta está diseñada para reducir trabajo repetitivo, mejorar la consistencia y respaldar mejores resultados, manteniendo el criterio y las decisiones finales bajo control humano.",
      "workshops.format": "Ofrezco talleres de 3 sesiones de 2 horas —6 horas en total—, en modalidad virtual o presencial, según acuerdo.<br><br>Virtual: 1–10 participantes<br>Presencial (solo en Nicaragua): 5–15 participantes",
      "workshops.applied.toggle": "Talleres de IA aplicada",
      "workshops.applied.title": "Talleres de IA aplicada para flujos profesionales de trabajo documental",
      "workshops.applied.body1": "Un taller práctico construido alrededor de la manera en que tu equipo prepara, revisa y entrega documentos. Permite identificar dónde la IA puede reducir trabajo repetitivo, mejorar la consistencia y respaldar mejores resultados sin sustituir el criterio profesional.",
      "workshops.applied.body2": "El formato se adapta al nivel actual de experiencia del equipo con la IA.",
      "workshops.applied.contact": "Si tú o tu equipo pueden beneficiarse de este taller, <a href=\"#contact\" data-view-link=\"contact\">contáctame</a>.",
      "workshops.thematic.toggle": "Talleres temáticos",
      "workshops.thematic.title": "Talleres temáticos",
      "workshops.thematic.intro": "Talleres centrados en una necesidad profesional claramente definida. Cada uno cuenta con contenidos, ejercicios, materiales, duración y resultados esperados establecidos, lo que permite al cliente conocer de antemano en qué trabajarán los participantes.",
      "workshops.documentWriting.title": "Redacción de documentos profesionales con IA",
      "workshops.documentWriting.body1": "Producción de informes, resúmenes, borradores y documentos analíticos mediante instrucciones claras, audiencias definidas y control humano sobre el contenido y las decisiones finales.",
      "workshops.documentWriting.body2": "Los participantes trabajan en diseño de prompts, estructura argumentativa, control de tesis y contraargumentos, redacción profesional y comunicación de información compleja a audiencias no especializadas.",
      "workshops.research.title": "Investigación asistida por IA",
      "workshops.research.body1": "Uso de la IA para delimitar problemas de investigación, formular preguntas, organizar fuentes iniciales, extraer información y sintetizar documentos extensos o literatura técnica.",
      "workshops.research.body2": "El taller también aborda la comparación entre fuentes, la detección de contradicciones y vacíos de información, la trazabilidad de la evidencia y la preparación de conclusiones claras y defendibles.",
      "workshops.review.title": "Revisión documental y control de calidad con IA",
      "workshops.review.body1": "Revisión crítica de resultados generados por IA y documentos profesionales para identificar respuestas débiles, supuestos sin sustento, contexto faltante, problemas de tono, inconsistencias e incumplimiento de instrucciones.",
      "workshops.review.body2": "Los participantes comparan versiones, evalúan cambios sustantivos, mejoran la estructura argumentativa y revisan documentos técnicos en términos de claridad, coherencia, precisión conceptual y tono profesional.",
      "workshops.thematic.contact": "Si tú o tu equipo tienen interés en alguno de estos talleres temáticos, <a href=\"#contact\" data-view-link=\"contact\">contáctame</a>.",
      "contact.title": "Contacto",
      "contact.cardTitle": "Contacto",
      "contact.publicLinks": "Enlaces públicos",
      "footer.visitLabel": "# visitas",
    },
  };

  function getCurrentLanguage() {
    return document.documentElement.getAttribute("lang") === "es" ? "es" : "en";
  }

  function applyTheme(theme) {
    const dark = theme === "dark";
    const language = getCurrentLanguage();
    document.body.classList.toggle("dark-mode", dark);
    if (themeToggle) {
      themeToggle.textContent = dark ? (language === "es" ? "Claro" : "Light") : (language === "es" ? "Oscuro" : "Dark");
      themeToggle.setAttribute(
        "aria-label",
        dark
          ? (language === "es" ? "Cambiar a modo claro" : "Switch to light mode")
          : (language === "es" ? "Cambiar a modo oscuro" : "Switch to dark mode")
      );
    }
  }

  function getInitialTheme() {
    const savedTheme = window.localStorage.getItem(STORAGE_KEY);
    if (savedTheme) return savedTheme;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function applyLanguage(language) {
    const activeLanguage = language === "es" ? "es" : "en";
    document.documentElement.setAttribute("lang", activeLanguage);
    document.querySelectorAll("[data-i18n]").forEach(function (element) {
      const key = element.getAttribute("data-i18n");
      const text = translations[activeLanguage][key];
      if (text) {
        element.textContent = text;
      }
    });
    document.querySelectorAll("[data-i18n-html]").forEach(function (element) {
      const key = element.getAttribute("data-i18n-html");
      const html = translations[activeLanguage][key];
      if (html) {
        element.innerHTML = html;
      }
    });
    document.querySelectorAll("[data-i18n-href]").forEach(function (element) {
      const key = element.getAttribute("data-i18n-href");
      const href = translations[activeLanguage][key];
      if (href) {
        element.setAttribute("href", href);
      }
    });
    document.querySelectorAll("[data-i18n-aria-label]").forEach(function (element) {
      const key = element.getAttribute("data-i18n-aria-label");
      const label = translations[activeLanguage][key];
      if (label) {
        element.setAttribute("aria-label", label);
      }
    });
    languageCards.forEach(function (card) {
      card.hidden = card.getAttribute("data-language-card") !== activeLanguage;
    });

    if (languageToggle) {
      languageToggle.textContent = activeLanguage === "en" ? "ES" : "EN";
      languageToggle.setAttribute(
        "aria-label",
        activeLanguage === "en" ? "Switch to Spanish" : "Cambiar a inglés"
      );
    }

    applyTheme(document.body.classList.contains("dark-mode") ? "dark" : "light");
  }

  function getInitialLanguage() {
    const savedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return savedLanguage === "es" ? "es" : "en";
  }

  function getViewLinks() {
    return document.querySelectorAll("[data-view-link]");
  }

  function getViewFromHash() {
    const hash = window.location.hash.replace("#", "");
    const hasPanel = Array.prototype.some.call(viewPanels, function (panel) {
      return panel.getAttribute("data-view") === hash;
    });

    return hasPanel ? hash : defaultView;
  }

  function showView(viewName, updateHash) {
    viewPanels.forEach(function (panel) {
      const active = panel.getAttribute("data-view") === viewName;
      panel.hidden = !active;
      panel.classList.toggle("is-active", active);
    });

    getViewLinks().forEach(function (link) {
      const active = link.getAttribute("data-view-link") === viewName;
      if (active) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });

    if (updateHash) {
      window.history.pushState(null, "", "#" + viewName);
    }

    window.scrollTo({ top: 0, behavior: "auto" });
  }

  function filterAnalyticalPieces(platform) {
    analyticalCards.forEach(function (card) {
      const cardPlatform = card.getAttribute("data-analytical-platform");
      card.hidden = platform !== "all" && cardPlatform !== platform;
    });

    clearFocusGroup(document.querySelector("#analytical-pieces .card-focus-group"));

    analyticalFilterButtons.forEach(function (button) {
      const active = button.getAttribute("data-analytical-filter") === platform;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
  }

  function selectFocusCard(selectedCard) {
    const cardGroup = selectedCard.closest(".card-focus-group");
    if (!cardGroup) return;

    cardGroup.classList.add("has-selected");
    cardGroup.querySelectorAll(".focus-card").forEach(function (card) {
      card.classList.toggle("is-selected", card === selectedCard);
    });
  }

  function clearFocusGroup(cardGroup) {
    if (!cardGroup) return;

    cardGroup.classList.remove("has-selected");
    cardGroup.querySelectorAll(".focus-card").forEach(function (card) {
      card.classList.remove("is-selected");
    });
  }

  function closeOtherDropdowns(activeItem) {
    navDropdownItems.forEach(function (item) {
      if (item === activeItem) return;

      const parent = item.querySelector(".nav-parent");
      if (parent) {
        parent.setAttribute("aria-expanded", "false");
      }
    });
  }

  function loadVisitCount() {
    if (!visitCount || !window.fetch) return;

    const controller = window.AbortController ? new AbortController() : null;
    const timeout = controller ? window.setTimeout(function () {
      controller.abort();
    }, 3000) : null;

    fetch("https://eonimae.goatcounter.com/counter/TOTAL.json", {
      signal: controller ? controller.signal : undefined,
    })
      .then(function (response) {
        if (!response.ok) throw new Error("Visit counter unavailable");
        return response.json();
      })
      .then(function (data) {
        if (data && data.count) {
          visitCount.textContent = data.count;
        }
      })
      .catch(function () {
        visitCount.textContent = "—";
      })
      .finally(function () {
        if (timeout) {
          window.clearTimeout(timeout);
        }
      });
  }

  function getLastVisitAt() {
    try {
      const storedValue = window.localStorage.getItem(VISIT_STORAGE_KEY);
      const timestamp = Number(storedValue);

      return Number.isFinite(timestamp) ? timestamp : 0;
    } catch (error) {
      return 0;
    }
  }

  function setLastVisitAt(timestamp) {
    try {
      window.localStorage.setItem(VISIT_STORAGE_KEY, String(timestamp));
    } catch (error) {
      // If storage is unavailable, avoid breaking the site.
    }
  }

  function waitForGoatCounter(callback) {
    if (window.goatcounter && typeof window.goatcounter.count === "function") {
      callback();
      return;
    }

    let attempts = 0;
    const timer = window.setInterval(function () {
      attempts += 1;

      if (window.goatcounter && typeof window.goatcounter.count === "function") {
        window.clearInterval(timer);
        callback();
      } else if (attempts >= 50) {
        window.clearInterval(timer);
      }
    }, 100);
  }

  function registerVisitIfDue() {
    if (LOCAL_HOSTS.includes(window.location.hostname)) return;

    const now = Date.now();
    const lastVisitAt = getLastVisitAt();

    if (lastVisitAt && now - lastVisitAt < VISIT_INTERVAL) return;

    waitForGoatCounter(function () {
      window.goatcounter.count({ no_session: true });
      setLastVisitAt(now);
    });
  }

  applyLanguage(getInitialLanguage());
  applyTheme(getInitialTheme());

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      const nextTheme = document.body.classList.contains("dark-mode") ? "light" : "dark";
      window.localStorage.setItem(STORAGE_KEY, nextTheme);
      applyTheme(nextTheme);
    });
  }

  if (languageToggle) {
    languageToggle.addEventListener("click", function () {
      const currentLanguage = document.documentElement.getAttribute("lang") === "es" ? "es" : "en";
      const nextLanguage = currentLanguage === "en" ? "es" : "en";
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage);
      applyLanguage(nextLanguage);
    });
  }

  document.addEventListener("click", function (event) {
    const link = event.target.closest("[data-view-link]");
    if (!link) return;

    event.preventDefault();
    showView(link.getAttribute("data-view-link"), true);
    closeOtherDropdowns();
  });

  window.addEventListener("hashchange", function () {
    showView(getViewFromHash(), false);
  });

  detailButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const detailId = button.getAttribute("aria-controls");
      const detail = document.getElementById(detailId);
      if (!detail) return;

      const expanded = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!expanded));
      button.textContent = expanded ? "View detail" : "Close detail";
      detail.hidden = expanded;
    });
  });

  analyticalFilterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      filterAnalyticalPieces(button.getAttribute("data-analytical-filter"));
    });
  });

  navDropdownItems.forEach(function (item) {
    const parent = item.querySelector(".nav-parent");
    if (!parent) return;
    let closeTimer = null;
    let pointerActivated = false;
    let pointerFocus = false;
    let suppressNextFocusOpen = false;

    function setExpanded(expanded) {
      parent.setAttribute("aria-expanded", String(expanded));
    }

    function cancelClose() {
      if (!closeTimer) return;
      window.clearTimeout(closeTimer);
      closeTimer = null;
    }

    function closeDropdown() {
      cancelClose();
      setExpanded(false);
    }

    function schedulePointerClose() {
      cancelClose();
      closeTimer = window.setTimeout(function () {
        if (!item.matches(":hover") && (!item.contains(document.activeElement) || pointerFocus)) {
          setExpanded(false);
        }
        closeTimer = null;
      }, 250);
    }

    item.addEventListener("mouseenter", function () {
      closeOtherDropdowns(item);
      cancelClose();
      setExpanded(true);
    });

    item.addEventListener("mouseleave", function () {
      schedulePointerClose();
    });

    item.addEventListener("focusin", function () {
      if (suppressNextFocusOpen) {
        suppressNextFocusOpen = false;
        return;
      }
      closeOtherDropdowns(item);
      cancelClose();
      setExpanded(true);
    });

    item.addEventListener("focusout", function (event) {
      if (!item.contains(event.relatedTarget)) {
        closeDropdown();
      }
    });

    item.addEventListener("pointerdown", function (event) {
      closeOtherDropdowns(item);
      pointerFocus = true;
      pointerActivated = Boolean(event.target.closest("[data-view-link]"));
    });

    item.addEventListener("click", function (event) {
      if (!pointerActivated || !event.target.closest("[data-view-link]")) return;
      pointerActivated = false;
      if (document.activeElement && item.contains(document.activeElement)) {
        document.activeElement.blur();
      }
      closeDropdown();
    });

    item.addEventListener("keydown", function (event) {
      pointerFocus = false;
      if (event.key === "Escape") {
        closeDropdown();
        suppressNextFocusOpen = true;
        parent.focus();
      }
    });
  });

  workshopToggles.forEach(function (button) {
    button.addEventListener("click", function () {
      const panelId = button.getAttribute("aria-controls");
      const panel = document.getElementById(panelId);
      if (!panel) return;

      const willOpen = button.getAttribute("aria-expanded") !== "true";

      workshopToggles.forEach(function (otherButton) {
        const otherPanel = document.getElementById(otherButton.getAttribute("aria-controls"));
        otherButton.setAttribute("aria-expanded", "false");
        if (otherPanel) {
          otherPanel.hidden = true;
        }
      });

      button.setAttribute("aria-expanded", String(willOpen));
      panel.hidden = !willOpen;
    });
  });

  focusCards.forEach(function (card) {
    card.addEventListener("click", function () {
      selectFocusCard(card);
    });

    card.addEventListener("keydown", function (event) {
      if (event.target.closest("a")) return;
      if (event.key !== "Enter" && event.key !== " ") return;

      event.preventDefault();
      selectFocusCard(card);
    });
  });

  registerVisitIfDue();
  loadVisitCount();
  showView(getViewFromHash(), false);
})();
