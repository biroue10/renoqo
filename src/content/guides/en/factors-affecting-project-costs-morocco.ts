import type { GuideArticle } from "../types";

export const factorsEn: GuideArticle = {
  key: "costFactors", locale: "en", slug: "factors-affecting-project-costs-morocco", counterpartSlug: "facteurs-prix-travaux-maroc", category: "Understanding costs",
  seoTitle: "What Affects Renovation and Construction Costs in Morocco?", title: "What Factors Affect Project Costs in Morocco?",
  description: "Understand the main factors affecting renovation and construction costs in Morocco, including size, condition, materials, labour, location, deadlines, and complexity.",
  excerpt: "Why projects with the same floor area receive different quotes, and how to isolate each source of variation before comparing.",
  primaryKeyword: "home improvement costs Morocco", secondaryKeywords: ["renovation cost Morocco", "construction cost Morocco", "labour cost Morocco construction", "building material prices Morocco", "renovation cost factors"],
  publishedAt: "2026-07-19", modifiedAt: "2026-07-19", readingTime: 13, author: "Renoqo Editorial Team",
  shortAnswer: "Home improvement costs in Morocco depend on measured work area, existing condition, access, demolition, technical complexity, products, labour, location, timing and coordination. Two homes with the same floor area can therefore cost very different amounts to renovate. Explain every quote difference through a quantity, specification, constraint or risk instead of relying on a city label or a cost-per-square-metre figure.",
  takeaways: ["Floor area explains only part of project cost.", "Condition, access and complexity alter the method and labour.", "Product quality and availability affect purchase, installation and lead time.", "Location and season require project evidence, not generalisations.", "Late changes combine rework, new purchases and disruption."],
  sections: [
    { id: "area-condition", title: "Total area and the property's initial condition", blocks: [
      { type: "paragraph", text: "Area drives some quantities, but costs are not always proportional. Mobilisation, travel and certain equipment remain fixed. High walls, many corners or small rooms can increase working time even when floor area is unchanged." },
      { type: "paragraph", text: "Initial condition determines preparation: sound or weak substrates, visible or concealed services, damp, level and the quality of previous work. A survey reduces uncertainty, although removal can still expose hidden conditions. Quotes should state their assumptions." },
    ]},
    { id: "access-demolition", title: "Site access, demolition and waste", blocks: [
      { type: "paragraph", text: "An upper floor without a usable lift, long carrying distance, narrow street, restricted parking, building hours and limited storage all affect handling. The city name alone does not explain the difference; the practical route for people, materials and waste does." },
      { type: "list", items: ["Protection of circulation and shared areas.", "Manual or mechanised removal depending on access.", "Sorting, bagging, carrying and transporting waste.", "Split deliveries when storage is limited.", "Final cleaning and restoration of shared spaces."] },
    ]},
    { id: "complexity", title: "Technical complexity and trade coordination", blocks: [
      { type: "paragraph", text: "Moving water points, changing the layout, fitting custom elements or working around occupants requires more design, protection and sequencing. Multiple trades create interfaces: tiling depends on plumbing and substrate preparation; painting follows services and repairs." },
      { type: "tip", title: "Compare the method", text: "Ask who coordinates trades, which tests occur before work is concealed and which activities block the next stage. Coordination may prevent expensive rework." },
    ]},
    { id: "materials", title: "Material quality, availability and transport", blocks: [
      { type: "paragraph", text: "A product affects purchase price as well as consumables, tools, wastage, installation speed, maintenance and repairability. Large-format finishes, complex patterns and custom components may require more preparation than readily available alternatives." },
      { type: "paragraph", text: "Local availability can reduce delay and delivery. Imported or made-to-order items can extend the programme and increase substitution risk. Confirm stock, lead time, minimum quantities, returns and future access to spare parts." },
    ]},
    { id: "labour", title: "Labour quantity and skill level", blocks: [
      { type: "paragraph", text: "Labour depends on time, crew size, skill and supervision. Demanding finishes, difficult substrates or compressed programmes may need more or specialised people. A daily rate alone ignores productivity, expected quality and included remedial work." },
      { type: "warning", title: "Fast is not the same as credible", text: "A short duration may reflect a larger team, an incomplete scope or an optimistic assumption. Ask for crew size, sequence and dependencies." },
    ]},
    { id: "location-time", title: "Location, urgency and season", blocks: [
      { type: "paragraph", text: "Do not claim that Casablanca, Rabat, Marrakech or another city is systematically more expensive without comparable data. Review crew availability, supplier distance, possible accommodation, traffic, access and site rules. Two addresses within one city can have opposite logistics." },
      { type: "paragraph", text: "Urgency reduces the choice of teams and products. Season may affect drying, working hours, availability or supply depending on the trade. A realistic programme buffer is often more effective than permanent acceleration." },
    ]},
    { id: "finish-risk", title: "Finish level and risk allowance", blocks: [
      { type: "paragraph", text: "Economy, standard and premium describe specifications here, not universal price bands. Economy favours simple available products; standard balances use, durability and choice; premium may involve custom work, complex details and tighter tolerances." },
      { type: "paragraph", text: "A bidder may allow for risk when scope is uncertain, access is difficult or time is tight. Surveys, appropriate investigation and early decisions reduce uncertainty and support more precise pricing." },
    ]},
    { id: "factor-table", title: "Cost factors and their potential impact", blocks: [
      { type: "table", caption: "Factors to document before estimating", headers: ["Factor", "Potential impact", "Evidence needed"], rows: [["Area/geometry", "Quantities and installation time", "Measurements by surface"], ["Initial condition", "Preparation and repair", "Survey, photographs, investigation"], ["Access", "Handling and logistics", "Floor, distance, storage, hours"], ["Demolition", "Labour and waste", "Type and volume"], ["Complexity", "Design, skills, coordination", "Plans and interfaces"], ["Materials", "Purchase, fitting, waste, time", "Reference, stock, method"], ["Labour", "Time, skills, supervision", "Crew and sequence"], ["Location", "Travel and availability", "Address and suppliers"], ["Urgency/season", "Resources and programme", "Deadline and constraints"], ["Changes", "Rework and delay", "Approval process"], ["Waste/cleaning", "Handling and close-out", "Volume and responsibility"], ["Risk", "Allowance or exclusions", "Assumptions and unknowns"]] },
    ]},
    { id: "examples", title: "Same floor area, different project cost", blocks: [
      { type: "paragraph", text: "Fictional, educational and non-contractual examples: both apartments are 80 m². Project A keeps the layout, has accessible documented services, uses stocked products and is vacant. Project B moves the kitchen and bathroom, requires demolition, has restricted upper-floor access and uses custom joinery." },
      { type: "table", caption: "Qualitative comparison of two fictional projects", headers: ["Dimension", "Project A", "Project B"], rows: [["Scope", "Targeted refresh", "Layout and technical renovation"], ["Condition", "Documented substrates", "Hidden work after removal"], ["Access", "Simple delivery and storage", "Carrying and split deliveries"], ["Materials", "Stock products", "Custom elements"], ["Coordination", "Few trades", "Many interfaces"], ["Risk", "Limited uncertainty", "More contingency and time"]] },
      { type: "paragraph", text: "This does not establish a market average. It explains why one isolated cost-per-square-metre number cannot compare the two projects. Quantities, methods and constraints are the useful level of analysis." },
    ]},
    { id: "reduce", title: "Reduce cost without sacrificing quality", blocks: [
      { type: "list", items: ["Freeze layout and key references before ordering.", "Retain sound elements after proper assessment.", "Simplify geometry and difficult details.", "Choose available, suitable and repairable products.", "Group decisions to avoid stoppages and repeat travel.", "Protect concealed systems and substrates that are hard to repair.", "Compare quotes against the same brief.", "Inspect each trade before its work is covered."] },
    ]},
    { id: "mistakes", title: "Common cost-estimating mistakes", blocks: [
      { type: "list", items: ["Inferring total cost from floor area alone.", "Comparing undefined finish levels.", "Ignoring access, waste, delivery and cleaning.", "Ordering without confirming stock and quantities.", "Changing the layout after demolition without assessing every effect.", "Assuming a city is always more expensive without consistent data.", "Reducing substrate preparation to preserve a visible finish budget."] },
    ]},
  ],
  checklist: ["Areas are measured by surface type.", "Initial condition and assumptions are documented.", "Access, storage and parking have been reviewed.", "Demolition and waste have an owner.", "Technical interfaces are identified.", "Products have references, stock and fitting methods.", "Crew and programme are consistent.", "Local constraints are described without generalisation.", "Finish levels use measurable performance.", "Changes require written cost and timing approval."],
  faqs: [
    { question: "Why do project quotes vary so much?", answer: "They may use different scopes, quantities, products, methods, programmes and risk assumptions. Align those inputs before deciding one contractor is more expensive." },
    { question: "How is a project price calculated?", answer: "An estimate generally combines material quantities, labour time, equipment, logistics, coordination, overhead and risk. Ask for checkable units and assumptions." },
    { question: "Does the city always change the price?", answer: "No. Location can affect travel, access, availability and delivery, but a fixed ranking between cities requires comparable evidence that this guide does not claim to provide." },
    { question: "How do materials affect renovation cost?", answer: "They affect purchase, transport, wastage, consumables, installation, lead time and maintenance. Complexity of installation can matter as much as the product price." },
    { question: "How can I limit increases after work begins?", answer: "Complete decisions early, assess accessible conditions, record assumptions, retain contingency and require written approval before additional work." },
  ], relatedKeys: ["budget", "quotes"],
};
