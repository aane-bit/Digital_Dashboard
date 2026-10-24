/**
 * Content for the dashboard. Everything that is repeated markup on the page
 * (nav, metrics, solutions, SMART cards, tasks, references) is defined here
 * and rendered by views.js, so editing content never means editing HTML.
 */
(function (DD) {
  'use strict';

  const stats = {
    gridAccess: 98.5,
    towerCoverage: 36.3,
    broadband: 18.0,
    ncrInternet: 33.0,
    barmmInternet: 4.0,
  };

  DD.data = {
    project: {
      shortTitle: 'Philippine Digital Divide',
      authors: ['Asunciana Salibio Aros', 'Nicholette Rodriguez', 'Jared Mesa'],
    },

    pages: [
      { id: 'overview',   label: 'Overview',                mobileLabel: 'Overview & Core Issue', icon: 'fa-chart-line',  tone: 'blue' },
      { id: 'solutions',  label: '5-Solution Matrix',       icon: 'fa-layer-group', tone: 'emerald' },
      { id: 'deepdive',   label: 'Frontiers 2025 Deep-Dive', icon: 'fa-solar-panel', tone: 'amber' },
      { id: 'smart',      label: 'SMART Indicators',        icon: 'fa-bullseye',    tone: 'purple' },
      { id: 'timeline',   label: 'Timeline & Tasks',        icon: 'fa-tasks',       tone: 'cyan' },
      { id: 'references', label: 'APA 7 References',        icon: 'fa-book-open',   tone: 'rose' },
    ],

    stats,

    metrics: [
      { label: 'Electricity Grid Access',     icon: 'fa-bolt',           tone: 'emerald', value: stats.gridAccess,    decimals: 1, suffix: '%', caption: 'Barangays connected to power grid' },
      { label: 'Telecom Tower Coverage',      icon: 'fa-broadcast-tower', tone: 'red',     value: stats.towerCoverage, decimals: 1, suffix: '%', caption: 'Barangays with cellular tower access' },
      { label: 'Fixed Broadband Penetration', icon: 'fa-house-signal',   tone: 'amber',   value: stats.broadband,     decimals: 1, suffix: '%', caption: 'Household broadband subscription rate' },
      { label: 'NCR vs BARMM Disparity',      icon: 'fa-chart-pie',      tone: 'purple',  text: '33% vs 4%',                                       caption: 'Internet access disparity ratio' },
    ],

    chart: {
      bars: [
        { label: ['Electricity', '(Barangays)'], value: stats.gridAccess,    tone: 'emerald' },
        { label: ['Telecom', 'Towers'],          value: stats.towerCoverage, tone: 'red' },
        { label: ['Broadband', 'Subs'],          value: stats.broadband,     tone: 'amber' },
        { label: ['NCR', 'Internet'],            value: stats.ncrInternet,   tone: 'blue' },
        { label: ['BARMM', 'Internet'],          value: stats.barmmInternet, tone: 'purple' },
      ],
    },

    solutions: [
      {
        rank: 1, featured: true, icon: 'fa-solar-panel', tone: 'amber',
        title: 'Solar Digital Community Centers (DCCs)', tag: 'Top Priority Solution',
        description: 'Deploy solar-powered microgrids coupled with satellite/fiber hubs in off-grid GIDAs to deliver uninterrupted power, internet, and community upskilling.',
        action: { label: 'View Frontiers 2025 Deep-Dive', target: 'deepdive' },
      },
      {
        rank: 2, icon: 'fa-tower-observation', tone: 'blue',
        title: 'Infrastructure Sharing & Open Access', tag: 'Policy & Legislative Reform',
        description: 'Mandate common tower sharing and open-access broadband rules (Open Access in Data Transmission Act) to lower CAPEX for telcos in remote areas.',
        facts: ['Target: DICT, NTC, Congress', 'CAPEX Reduction: ~40%'],
      },
      {
        rank: 3, icon: 'fa-wifi', tone: 'emerald',
        title: 'National Free Public Wi-Fi Expansion', tag: 'RA 10929 Scaling',
        description: 'Accelerate the implementation of Free Wi-Fi in Public Places in rural schools, municipal halls, and rural health units with dedicated LGU maintenance funding.',
        facts: ['Focus: Public Schools & Health Units', 'Status: Scaling Phase'],
      },
      {
        rank: 4, icon: 'fa-satellite', tone: 'cyan',
        title: 'Satellite Internet Backhaul (LEO)', tag: 'Island & GIDA Connection',
        description: 'Leverage Low Earth Orbit (LEO) satellite technology to provide rapid backhaul internet to isolated islands where undersea fiber optic cables are cost-prohibitive.',
        facts: ['Tech: Starlink / LEO Constellations', 'Deployment: Immediate'],
      },
      {
        rank: 5, icon: 'fa-user-graduate', tone: 'purple',
        title: 'Digital Literacy & Skill Integration', tag: 'Human Capital Capacity',
        description: 'Establish localized digital literacy programs tailored to agricultural, fishing, and informal workers to ensure technology translates into socioeconomic mobility.',
        facts: ['Partners: TESDA, DICT, DepEd', 'Focus: Native Languages'],
      },
    ],

    smart: [
      { letter: 'S', name: 'Specific',   tone: 'blue',    text: 'Establish 500 Solar Digital Community Centers in target GIDA barangays across Luzon, Visayas, and Mindanao.' },
      { letter: 'M', name: 'Measurable', tone: 'emerald', text: 'Increase barangay cellular/broadband access from 36.3% to 65% and achieve 80% completion in local digital literacy programs.' },
      { letter: 'A', name: 'Achievable', tone: 'amber',   text: 'Funded through joint DICT Universal Access Fund, LGU counterpart funds, and international climate-tech grants.' },
      { letter: 'R', name: 'Relevant',   tone: 'purple',  text: 'Directly aligns with the Philippine Development Plan (PDP) 2023-2028 and Sustainable Development Goals (SDG 7 & SDG 9).' },
      { letter: 'T', name: 'Time-Bound', tone: 'cyan',    wide: true, text: 'Phase 1 Pilot (Months 1-12), Phase 2 Scaling (Months 13-36), Phase 3 Institutionalization & Full LGU Transfer (Months 37-60).' },
    ],

    // Official MMDC TA timeline, Tasks 1-29.
    // status: 'Completed' | 'In Progress' | 'Pending' | 'Planned'
    phases: ['phase1', 'phase2', 'phase3', 'phase4'],
    tasks: [
      { id: 1,  phase: 'phase1', status: 'Completed',   owner: 'All Members', title: 'Review MS2 and mentor feedback' },
      { id: 2,  phase: 'phase1', status: 'Completed',   owner: 'All Members', title: 'Read TA instructions and CAMU rubric' },
      { id: 3,  phase: 'phase1', status: 'Completed',   owner: 'All Members', title: 'Agree on roles and deliverables' },
      { id: 4,  phase: 'phase1', status: 'Completed',   title: 'Assign research areas (Anne: Solution 1)' },
      { id: 5,  phase: 'phase2', status: 'Completed',   title: 'Gather and share additional evidence (Frontiers 2025 Study)' },
      { id: 6,  phase: 'phase2', status: 'Completed',   title: 'Complete Week 8 worksheet (Solution 1 section)' },
      { id: 7,  phase: 'phase2', status: 'Completed',   title: 'Share Solution Memo with two reviewers' },
      { id: 8,  phase: 'phase2', status: 'Completed',   title: 'Review findings and reviewer feedback' },
      { id: 9,  phase: 'phase2', status: 'Completed',   title: 'Define SMART measures of success' },
      { id: 10, phase: 'phase2', status: 'Completed',   title: 'Choose audience and digital format (VS Code Web App)' },
      { id: 11, phase: 'phase2', status: 'Completed',   title: 'Complete Coursera planning entry' },
      { id: 12, phase: 'phase2', status: 'Completed',   title: 'Complete and share TA timeline' },
      { id: 13, phase: 'phase3', status: 'Completed',   title: 'Prepare outline or storyboard for Web App' },
      { id: 14, phase: 'phase3', status: 'Completed',   title: 'Develop content and references (APA 7 list)' },
      { id: 15, phase: 'phase3', status: 'Completed',   title: 'Produce initial digital draft (Interactive Web App)' },
      { id: 16, phase: 'phase3', status: 'Completed',   title: 'Complete mid-project peer evaluation' },
      { id: 17, phase: 'phase3', status: 'Completed',   title: 'Submit written draft answers in Coursera' },
      { id: 18, phase: 'phase3', status: 'Completed',   title: 'Submit actual draft link in CAMU (Oct 24 Draft Deadline)' },
      { id: 19, phase: 'phase3', status: 'In Progress', title: 'Review feedback and consult with mentor if needed' },
      { id: 20, phase: 'phase3', status: 'In Progress', title: 'Revise analysis and solution details' },
      { id: 21, phase: 'phase4', status: 'In Progress', title: 'Finalize digital output and GitHub Pages hosting' },
      { id: 22, phase: 'phase4', status: 'Pending',     title: 'Quality review - Check content, citations, and links' },
      { id: 23, phase: 'phase4', status: 'Pending',     title: 'Update role records and Decision Log' },
      { id: 24, phase: 'phase4', status: 'Pending',     title: 'Write Contribution Reflection (Individual 150-250 words)' },
      { id: 25, phase: 'phase4', status: 'Pending',     title: 'Complete final Peer Evaluation' },
      { id: 26, phase: 'phase4', status: 'Pending',     title: 'Organize final folder and check link accessibility' },
      { id: 27, phase: 'phase4', status: 'Pending',     title: 'Submit final requirements in CAMU (Nov 07 Final Deadline)' },
      { id: 28, phase: 'phase4', status: 'Pending',     title: 'Review assigned output individually' },
      { id: 29, phase: 'phase4', status: 'Planned',     title: 'Read feedback and revise if permitted' },
    ],
    defaultOwner: 'Asunciana Salibio Aros',

    // type 'article': Author (Year). Title. *Journal*, volume, Article n. URL
    // type 'report':  Author (Year). *Title*. Publisher.
    references: [
      {
        type: 'article',
        author: 'Ortiz Osejo, J. A., et al.', year: 2025,
        title: 'Solar-powered digital community centers: Evaluating the UN Energy Compact implementation for rural connectivity and gender inclusion',
        journal: 'Frontiers in Research Metrics and Analytics', volume: 10, article: 1488916,
        url: 'https://doi.org/10.3389/frma.2025.1488916',
      },
      { type: 'report', author: 'Department of Information and Communications Technology.', year: 2023, title: 'National Broadband Plan (NBP) Phase 1 Implementation Assessment Report', publisher: 'DICT Executive Publications' },
      { type: 'report', author: 'Philippine Statistics Authority.', year: 2022, title: 'National Information and Communications Technology Household Survey (NICTHS)', publisher: 'Republic of the Philippines' },
      { type: 'report', author: 'United Nations Development Programme.', year: 2023, title: 'Digital inclusion in geographically isolated and disadvantaged areas (GIDA) in Southeast Asia', publisher: 'UNDP Governance Reports' },
      { type: 'report', author: 'World Bank.', year: 2024, title: 'Fostering digital inclusion in the Philippines: Infrastructure sharing and policy reforms', publisher: 'World Bank Group' },
    ],
  };
})((window.DD = window.DD || {}));
