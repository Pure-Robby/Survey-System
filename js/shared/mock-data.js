// ============================================================================
// MOCK DATA - REMOVE IN PRODUCTION
// ============================================================================
// This file contains demonstration data for the survey system prototype.
// In production, this data should be replaced with API calls to your backend.
// 
// To disable mock data in production:
// 1. Remove the <script src="js/shared/mock-data.js"></script> tag from HTML files
// 2. Implement API integration in the respective functional modules
// ============================================================================

/**
 * @typedef {Object} Dimension
 * @property {string} name - The dimension name
 * @property {number} score - Score percentage (0-100)
 * @property {number} statementCount - Number of statements in this dimension
 * @property {string} [guidingPrinciple] - Optional guiding principle text
 */

/**
 * @typedef {Object} Lever
 * @property {string} name - The lever name
 * @property {string} link - URL to the lever detail page
 * @property {Dimension[]} dimensions - Array of dimensions under this lever
 */

/**
 * Lever details data structure for culture framework overview
 * @type {{levers: Lever[]}}
 * 
 * Production integration:
 * Replace with API call: GET /api/culture-framework/levers
 */
const leverDetailsData = {
    levers: [
        {
            name: "Business Outcomes",
            link: "business-outcomes.html",
            dimensions: [
                { name: "Continuous Development", score: 85.0, statementCount: 3, sanlamScore: 84.2 },
                { name: "Change Agility", score: 78.5, statementCount: 3, sanlamScore: 81.5 },
                { name: "Productivity", score: 88.2, statementCount: 4, sanlamScore: 82.8 },
                { name: "Customer Centricity", score: 81.8, statementCount: 5, sanlamScore: 82.1 }
            ]
        },
        {
            name: "Shared Values",
            link: "shared-values.html",
            dimensions: [
                { name: "Values", score: 72.3, statementCount: 2 },
                { name: "Integrity", score: 68.5, statementCount: 2 },
                { name: "Innovation", score: 65.8, statementCount: 3 },
                { name: "Care", score: 70.2, statementCount: 4 },
                { name: "Collaboration", score: 64.5, statementCount: 3 },
                { name: "Trust & Psychological Safety", score: 62.8, statementCount: 5 },
                { name: "Inclusion & Belonging", score: 69.5, statementCount: 2 }
            ]
        },
        {
            name: "Employee Experience",
            link: "employee-experience.html",
            dimensions: [
                { name: "Engagement", score: 78.5, statementCount: 12 },
                { name: "Team Effectiveness", score: 85.2, statementCount: 5 },
                { name: "Wellness", score: 80.8, statementCount: 5 },
                { name: "Development & Growth", score: 84.5, statementCount: 7 }
            ]
        },
        {
            name: "Leadership Enablement",
            link: "leadership-enablement.html",
            dimensions: [
                { 
                    name: "Envisage Our Future", 
                    score: 76.4, 
                    statementCount: 2,
                    guidingPrinciple: "Transform our organisation with vision, enhanced solutions and customer-centric excellence"
                },
                { 
                    name: "Champion Sustainable Results", 
                    score: 79.8, 
                    statementCount: 2,
                    guidingPrinciple: "Optimise resources to deliver creative solutions and cultivate a culture of growth"
                },
                { 
                    name: "Show Up and Inspire Excellence", 
                    score: 80.2, 
                    statementCount: 2,
                    guidingPrinciple: "Make quality decisions with speed, face challenges with humility, and lead with integrity and a growth mindset"
                },
                { 
                    name: "Win Together", 
                    score: 78.0, 
                    statementCount: 2,
                    guidingPrinciple: "Create a supportive, inclusive and engaging work environment for mutual success"
                }
            ]
        }
    ]
};

/**
 * @typedef {Object} OrganizationalUnit
 * @property {string} name - Unit name
 * @property {number} population - Total employees
 * @property {number} completed - Number who completed survey
 * @property {number} inProgress - Number in progress
 * @property {number} notStarted - Number who haven't started
 * @property {number} completionRate - Completion percentage
 * @property {OrganizationalUnit[]} [divisions] - Sub-divisions (for segments)
 * @property {OrganizationalUnit[]} [departments] - Departments (for divisions)
 * @property {OrganizationalUnit[]} [teams] - Teams (for departments)
 */

/**
 * Progress tracker hierarchical data structure
 * @type {{company: Object, segments: OrganizationalUnit[]}}
 *
 * This dataset now aligns to the current Sanlam business unit org levels
 * (e.g. Fintech, Life & Savings, Santam, Allianz, Group Office, Investment
 * Group) while still preserving the drill-down behaviour used by the
 * dashboard module.
 */
const progressTrackerData = {
    company: {
        name: "Sanlam Overall",
        population: 10650,
        completed: 7213,
        inProgress: 1376,
        notStarted: 2061,
        completionRate: 68
    },
    segments: [
        {
            name: "Sanlam Fintech",
            population: 1200,
            completed: 1152,
            inProgress: 24,
            notStarted: 24,
            completionRate: 96,
            divisions: [
                {
                    name: "Sanlam Fintech - All Divisions",
                    population: 1200,
                    completed: 1152,
                    inProgress: 24,
                    notStarted: 24,
                    completionRate: 96,
                    departments: []
                }
            ]
        },
        {
            name: "Sanlam Life & Savings",
            population: 2700,
            completed: 1755,
            inProgress: 378,
            notStarted: 567,
            completionRate: 65,
            divisions: [
                {
                    name: "Sanlam Life & Savings - All Divisions",
                    population: 2700,
                    completed: 1755,
                    inProgress: 378,
                    notStarted: 567,
                    completionRate: 65,
                    departments: []
                }
            ]
        },
        {
            name: "Santam",
            population: 3200,
            completed: 1536,
            inProgress: 666,
            notStarted: 998,
            completionRate: 48,
            divisions: [
                {
                    name: "Santam - All Divisions",
                    population: 3200,
                    completed: 1536,
                    inProgress: 666,
                    notStarted: 998,
                    completionRate: 48,
                    departments: []
                }
            ]
        },
        {
            name: "SanlamAllianz",
            population: 800,
            completed: 304,
            inProgress: 198,
            notStarted: 298,
            completionRate: 38,
            divisions: [
                {
                    name: "SanlamAllianz - All Divisions",
                    population: 800,
                    completed: 304,
                    inProgress: 198,
                    notStarted: 298,
                    completionRate: 38,
                    departments: []
                }
            ]
        },
        {
            name: "Sanlam Group Office",
            population: 1600,
            completed: 1408,
            inProgress: 77,
            notStarted: 115,
            completionRate: 88,
            divisions: [
                {
                    name: "Sanlam Group Office - All Divisions",
                    population: 1600,
                    completed: 1408,
                    inProgress: 77,
                    notStarted: 115,
                    completionRate: 88,
                    departments: []
                }
            ]
        },
        {
            name: "Sanlam Investment Group",
            population: 1150,
            completed: 1058,
            inProgress: 46,
            notStarted: 46,
            completionRate: 92,
            divisions: [
                {
                    name: "Sanlam Investment Group - All Divisions",
                    population: 1150,
                    completed: 1058,
                    inProgress: 46,
                    notStarted: 46,
                    completionRate: 92,
                    departments: []
                }
            ]
        }
    ]
};

/**
 * @typedef {Object} BusinessUnit
 * @property {string} name - Business unit name
 * @property {number} cultureIndex - Culture index score (0-100)
 * @property {number} responseRate - Survey response rate percentage
 * @property {number} employeeCount - Number of employees
 * @property {string} keyStrength - Primary strength area
 * @property {string} priorityArea - Area requiring attention
 * @property {string} trend - Performance trend (up|down|stable)
 * @property {string} sentiment - Overall sentiment (positive|neutral|negative)
 */

/**
 * Business unit performance data for enterprise insights
 * @type {BusinessUnit[]}
 * 
 * Production integration:
 * Replace with API call: GET /api/business-units/performance
 */
const businessUnitData = [
    {
        name: "Sanlam Fintech",
        cultureIndex: 88.0,
        responseRate: 96,
        employeeCount: 1200,
        keyStrength: "Innovation & Digital",
        priorityArea: "Change Agility",
        trend: "up",
        sentiment: "positive",
        subUnits: [
            { name: "Digital Banking", cultureIndex: 91.2, responseRate: 97, employeeCount: 320, keyStrength: "Innovation", priorityArea: "Scalability", subUnits: [
                { name: "Retail Digital", cultureIndex: 93.1, responseRate: 98, employeeCount: 110, keyStrength: "UX Design", priorityArea: "Capacity" },
                { name: "Business Digital", cultureIndex: 90.8, responseRate: 97, employeeCount: 95, keyStrength: "Integration", priorityArea: "Speed" },
                { name: "Digital Onboarding", cultureIndex: 89.4, responseRate: 96, employeeCount: 70, keyStrength: "Automation", priorityArea: "Compliance" },
                { name: "Digital Security", cultureIndex: 87.2, responseRate: 95, employeeCount: 45, keyStrength: "Fraud Prevention", priorityArea: "Tooling" }
            ]},
            { name: "InsurTech", cultureIndex: 89.5, responseRate: 95, employeeCount: 280, keyStrength: "Product Design", priorityArea: "Speed to Market", subUnits: [
                { name: "Claims Automation", cultureIndex: 91.3, responseRate: 96, employeeCount: 80, keyStrength: "Process Innovation", priorityArea: "Scaling" },
                { name: "Underwriting Tech", cultureIndex: 88.9, responseRate: 95, employeeCount: 75, keyStrength: "Risk Modelling", priorityArea: "Data Quality" },
                { name: "Policy Admin", cultureIndex: 87.6, responseRate: 94, employeeCount: 65, keyStrength: "Reliability", priorityArea: "Modernisation" },
                { name: "Partner Integrations", cultureIndex: 85.1, responseRate: 93, employeeCount: 60, keyStrength: "Collaboration", priorityArea: "Documentation" }
            ]},
            { name: "Data Analytics", cultureIndex: 87.1, responseRate: 96, employeeCount: 210, keyStrength: "Technical Excellence", priorityArea: "Knowledge Sharing", subUnits: [
                { name: "BI & Reporting", cultureIndex: 89.2, responseRate: 97, employeeCount: 70, keyStrength: "Insight Delivery", priorityArea: "Self-Service" },
                { name: "Data Engineering", cultureIndex: 87.5, responseRate: 96, employeeCount: 65, keyStrength: "Pipeline Design", priorityArea: "Documentation" },
                { name: "ML & AI", cultureIndex: 86.8, responseRate: 95, employeeCount: 40, keyStrength: "Experimentation", priorityArea: "Governance" },
                { name: "Data Governance", cultureIndex: 83.4, responseRate: 94, employeeCount: 35, keyStrength: "Compliance", priorityArea: "Engagement" }
            ]},
            { name: "Mobile Platforms", cultureIndex: 84.3, responseRate: 94, employeeCount: 190, keyStrength: "Agile Delivery", priorityArea: "Cross-team Collaboration", subUnits: [
                { name: "iOS Team", cultureIndex: 86.7, responseRate: 95, employeeCount: 55, keyStrength: "Code Quality", priorityArea: "Release Cadence" },
                { name: "Android Team", cultureIndex: 84.1, responseRate: 94, employeeCount: 55, keyStrength: "Performance", priorityArea: "Testing" },
                { name: "Cross-Platform", cultureIndex: 82.9, responseRate: 93, employeeCount: 45, keyStrength: "Reusability", priorityArea: "Alignment" },
                { name: "Mobile QA", cultureIndex: 80.3, responseRate: 92, employeeCount: 35, keyStrength: "Thoroughness", priorityArea: "Automation" }
            ]},
            { name: "API Services", cultureIndex: 82.6, responseRate: 93, employeeCount: 200, keyStrength: "Reliability", priorityArea: "Documentation", subUnits: [
                { name: "Core APIs", cultureIndex: 85.0, responseRate: 94, employeeCount: 70, keyStrength: "Uptime", priorityArea: "Versioning" },
                { name: "Gateway & Auth", cultureIndex: 83.2, responseRate: 93, employeeCount: 55, keyStrength: "Security", priorityArea: "Latency" },
                { name: "Developer Experience", cultureIndex: 81.4, responseRate: 92, employeeCount: 40, keyStrength: "Documentation", priorityArea: "Onboarding" },
                { name: "Integration Testing", cultureIndex: 79.8, responseRate: 91, employeeCount: 35, keyStrength: "Coverage", priorityArea: "Speed" }
            ]}
        ]
    },
    {
        name: "Sanlam Life & Savings",
        cultureIndex: 84.2,
        responseRate: 95,
        employeeCount: 2700,
        keyStrength: "Customer Centricity",
        priorityArea: "Workload Management",
        trend: "stable",
        sentiment: "neutral",
        subUnits: [
            { name: "Individual Life", cultureIndex: 87.4, responseRate: 96, employeeCount: 620, keyStrength: "Client Relationships", priorityArea: "Process Efficiency", subUnits: [
                { name: "New Business", cultureIndex: 89.1, responseRate: 97, employeeCount: 180, keyStrength: "Sales Enablement", priorityArea: "Turnaround Time" },
                { name: "Policy Servicing", cultureIndex: 87.8, responseRate: 96, employeeCount: 160, keyStrength: "Accuracy", priorityArea: "Digital Adoption" },
                { name: "Claims Life", cultureIndex: 86.2, responseRate: 95, employeeCount: 150, keyStrength: "Empathy", priorityArea: "Processing Speed" },
                { name: "Underwriting Life", cultureIndex: 84.5, responseRate: 94, employeeCount: 130, keyStrength: "Risk Assessment", priorityArea: "Automation" }
            ]},
            { name: "Group Benefits", cultureIndex: 85.1, responseRate: 94, employeeCount: 480, keyStrength: "Team Collaboration", priorityArea: "Workload Balance", subUnits: [
                { name: "Corporate Schemes", cultureIndex: 87.3, responseRate: 95, employeeCount: 150, keyStrength: "Client Retention", priorityArea: "Pricing" },
                { name: "Risk Benefits", cultureIndex: 85.6, responseRate: 94, employeeCount: 130, keyStrength: "Product Knowledge", priorityArea: "Systems" },
                { name: "Fund Administration", cultureIndex: 83.9, responseRate: 93, employeeCount: 120, keyStrength: "Precision", priorityArea: "Workload" },
                { name: "Group Onboarding", cultureIndex: 81.7, responseRate: 92, employeeCount: 80, keyStrength: "Process Design", priorityArea: "Speed" }
            ]},
            { name: "Savings & Investment", cultureIndex: 83.8, responseRate: 95, employeeCount: 550, keyStrength: "Financial Acumen", priorityArea: "Innovation", subUnits: [
                { name: "Wealth Solutions", cultureIndex: 86.0, responseRate: 96, employeeCount: 170, keyStrength: "Advisory", priorityArea: "Digital Tools" },
                { name: "Endowments", cultureIndex: 84.2, responseRate: 95, employeeCount: 140, keyStrength: "Compliance", priorityArea: "Product Refresh" },
                { name: "Tax-Free Savings", cultureIndex: 82.5, responseRate: 94, employeeCount: 130, keyStrength: "Simplicity", priorityArea: "Marketing" },
                { name: "Unit Trusts Admin", cultureIndex: 80.8, responseRate: 93, employeeCount: 110, keyStrength: "Accuracy", priorityArea: "Automation" }
            ]},
            { name: "Retirement Fund Admin", cultureIndex: 82.0, responseRate: 93, employeeCount: 510, keyStrength: "Compliance", priorityArea: "Change Readiness", subUnits: [
                { name: "Pension Admin", cultureIndex: 84.1, responseRate: 94, employeeCount: 160, keyStrength: "Regulatory Knowledge", priorityArea: "Digitisation" },
                { name: "Provident Admin", cultureIndex: 82.7, responseRate: 93, employeeCount: 140, keyStrength: "Process Efficiency", priorityArea: "Staff Retention" },
                { name: "Annuities", cultureIndex: 80.9, responseRate: 92, employeeCount: 110, keyStrength: "Accuracy", priorityArea: "Training" },
                { name: "Member Services", cultureIndex: 79.3, responseRate: 91, employeeCount: 100, keyStrength: "Communication", priorityArea: "Responsiveness" }
            ]},
            { name: "Client Solutions", cultureIndex: 80.5, responseRate: 94, employeeCount: 540, keyStrength: "Service Delivery", priorityArea: "Leadership Development", subUnits: [
                { name: "Contact Centre", cultureIndex: 82.8, responseRate: 95, employeeCount: 200, keyStrength: "First-Call Resolution", priorityArea: "Wellbeing" },
                { name: "Broker Support", cultureIndex: 81.3, responseRate: 94, employeeCount: 150, keyStrength: "Responsiveness", priorityArea: "Knowledge Base" },
                { name: "Digital Self-Service", cultureIndex: 79.6, responseRate: 93, employeeCount: 110, keyStrength: "Adoption", priorityArea: "UX Design" },
                { name: "Complaints & Escalations", cultureIndex: 77.4, responseRate: 91, employeeCount: 80, keyStrength: "Resolution", priorityArea: "Empowerment" }
            ]}
        ]
    },
    {
        name: "Santam",
        cultureIndex: 81.3,
        responseRate: 93,
        employeeCount: 3200,
        keyStrength: "Risk Management",
        priorityArea: "Leadership Support",
        trend: "down",
        sentiment: "neutral",
        subUnits: [
            { name: "Commercial Lines", cultureIndex: 85.2, responseRate: 94, employeeCount: 720, keyStrength: "Risk Assessment", priorityArea: "Digital Adoption", subUnits: [
                { name: "Property Insurance", cultureIndex: 87.4, responseRate: 95, employeeCount: 220, keyStrength: "Underwriting", priorityArea: "Claims Turnaround" },
                { name: "Liability Insurance", cultureIndex: 85.8, responseRate: 94, employeeCount: 180, keyStrength: "Expertise", priorityArea: "Pricing Models" },
                { name: "Motor Fleet", cultureIndex: 84.1, responseRate: 93, employeeCount: 170, keyStrength: "Volume Processing", priorityArea: "Fraud Detection" },
                { name: "Engineering Lines", cultureIndex: 82.3, responseRate: 92, employeeCount: 150, keyStrength: "Technical Skill", priorityArea: "Growth" }
            ]},
            { name: "Personal Lines", cultureIndex: 83.7, responseRate: 93, employeeCount: 680, keyStrength: "Customer Service", priorityArea: "Process Simplification", subUnits: [
                { name: "Home Insurance", cultureIndex: 86.2, responseRate: 94, employeeCount: 200, keyStrength: "Customer Trust", priorityArea: "Digital Claims" },
                { name: "Motor Personal", cultureIndex: 84.0, responseRate: 93, employeeCount: 210, keyStrength: "Speed", priorityArea: "Self-Service" },
                { name: "Travel & Lifestyle", cultureIndex: 82.5, responseRate: 92, employeeCount: 140, keyStrength: "Flexibility", priorityArea: "Product Range" },
                { name: "Value-Added Services", cultureIndex: 80.1, responseRate: 91, employeeCount: 130, keyStrength: "Bundling", priorityArea: "Awareness" }
            ]},
            { name: "Santam Re", cultureIndex: 82.1, responseRate: 92, employeeCount: 340, keyStrength: "Analytical Thinking", priorityArea: "Talent Retention", subUnits: [
                { name: "Treaty Reinsurance", cultureIndex: 84.6, responseRate: 93, employeeCount: 120, keyStrength: "Modelling", priorityArea: "Market Access" },
                { name: "Facultative Re", cultureIndex: 82.9, responseRate: 92, employeeCount: 100, keyStrength: "Negotiation", priorityArea: "Turnaround" },
                { name: "Catastrophe Analytics", cultureIndex: 81.3, responseRate: 91, employeeCount: 70, keyStrength: "Data Science", priorityArea: "Tooling" },
                { name: "Re Operations", cultureIndex: 78.7, responseRate: 90, employeeCount: 50, keyStrength: "Process Control", priorityArea: "Headcount" }
            ]},
            { name: "Claims Operations", cultureIndex: 78.4, responseRate: 91, employeeCount: 890, keyStrength: "Operational Efficiency", priorityArea: "Employee Wellbeing", subUnits: [
                { name: "Motor Claims", cultureIndex: 80.5, responseRate: 92, employeeCount: 320, keyStrength: "Volume Handling", priorityArea: "Burnout" },
                { name: "Property Claims", cultureIndex: 79.1, responseRate: 91, employeeCount: 250, keyStrength: "Assessment Speed", priorityArea: "Training" },
                { name: "Liability Claims", cultureIndex: 77.3, responseRate: 90, employeeCount: 180, keyStrength: "Legal Knowledge", priorityArea: "Complexity" },
                { name: "Salvage & Recovery", cultureIndex: 75.8, responseRate: 89, employeeCount: 140, keyStrength: "Cost Recovery", priorityArea: "Morale" }
            ]},
            { name: "Broker Services", cultureIndex: 76.9, responseRate: 90, employeeCount: 570, keyStrength: "Relationship Management", priorityArea: "Leadership Support", subUnits: [
                { name: "Key Accounts", cultureIndex: 79.6, responseRate: 91, employeeCount: 170, keyStrength: "Retention", priorityArea: "Growth Targets" },
                { name: "Regional Brokers", cultureIndex: 77.8, responseRate: 90, employeeCount: 200, keyStrength: "Local Knowledge", priorityArea: "Support" },
                { name: "Broker Training", cultureIndex: 75.4, responseRate: 89, employeeCount: 100, keyStrength: "Enablement", priorityArea: "Resources" },
                { name: "Broker Tech", cultureIndex: 73.9, responseRate: 88, employeeCount: 100, keyStrength: "Platform Adoption", priorityArea: "Stability" }
            ]}
        ]
    },
    {
        name: "SanlamAllianz",
        cultureIndex: 79.8,
        responseRate: 91,
        employeeCount: 800,
        keyStrength: "Global Collaboration",
        priorityArea: "Culture Integration",
        trend: "stable",
        sentiment: "neutral",
        subUnits: [
            { name: "East Africa Operations", cultureIndex: 83.6, responseRate: 92, employeeCount: 220, keyStrength: "Market Expansion", priorityArea: "Training & Development", subUnits: [
                { name: "Kenya Office", cultureIndex: 85.9, responseRate: 93, employeeCount: 80, keyStrength: "Growth", priorityArea: "Compliance" },
                { name: "Uganda Office", cultureIndex: 83.4, responseRate: 92, employeeCount: 55, keyStrength: "Community", priorityArea: "Infrastructure" },
                { name: "Tanzania Office", cultureIndex: 82.1, responseRate: 91, employeeCount: 50, keyStrength: "Resilience", priorityArea: "Training" },
                { name: "Rwanda Office", cultureIndex: 80.7, responseRate: 90, employeeCount: 35, keyStrength: "Agility", priorityArea: "Scale" }
            ]},
            { name: "West Africa Operations", cultureIndex: 81.2, responseRate: 90, employeeCount: 195, keyStrength: "Community Engagement", priorityArea: "Resource Allocation", subUnits: [
                { name: "Nigeria Office", cultureIndex: 83.5, responseRate: 91, employeeCount: 85, keyStrength: "Market Knowledge", priorityArea: "Regulation" },
                { name: "Ghana Office", cultureIndex: 81.8, responseRate: 90, employeeCount: 60, keyStrength: "Partnerships", priorityArea: "Talent" },
                { name: "Côte d'Ivoire Office", cultureIndex: 79.6, responseRate: 89, employeeCount: 50, keyStrength: "Adaptability", priorityArea: "Language Support" }
            ]},
            { name: "Southern Africa Ops", cultureIndex: 79.5, responseRate: 91, employeeCount: 180, keyStrength: "Operational Discipline", priorityArea: "Culture Alignment", subUnits: [
                { name: "Namibia Office", cultureIndex: 82.3, responseRate: 92, employeeCount: 65, keyStrength: "Stability", priorityArea: "Innovation" },
                { name: "Botswana Office", cultureIndex: 80.1, responseRate: 91, employeeCount: 55, keyStrength: "Governance", priorityArea: "Growth" },
                { name: "Zambia Office", cultureIndex: 77.4, responseRate: 89, employeeCount: 60, keyStrength: "Reach", priorityArea: "Retention" }
            ]},
            { name: "Pan-Africa Strategy", cultureIndex: 77.1, responseRate: 89, employeeCount: 205, keyStrength: "Strategic Vision", priorityArea: "Communication", subUnits: [
                { name: "Strategy & Planning", cultureIndex: 79.8, responseRate: 90, employeeCount: 75, keyStrength: "Vision", priorityArea: "Execution" },
                { name: "Continental Coordination", cultureIndex: 77.5, responseRate: 89, employeeCount: 70, keyStrength: "Alignment", priorityArea: "Reporting" },
                { name: "Market Intelligence", cultureIndex: 75.2, responseRate: 88, employeeCount: 60, keyStrength: "Research", priorityArea: "Timeliness" }
            ]}
        ]
    },
    {
        name: "Sanlam Group Office",
        cultureIndex: 86.7,
        responseRate: 94,
        employeeCount: 1600,
        keyStrength: "Strategic Alignment",
        priorityArea: "Employee Experience",
        trend: "up",
        sentiment: "positive",
        subUnits: [
            { name: "Group Finance", cultureIndex: 89.3, responseRate: 96, employeeCount: 310, keyStrength: "Governance", priorityArea: "Workload Management", subUnits: [
                { name: "Financial Reporting", cultureIndex: 91.2, responseRate: 97, employeeCount: 90, keyStrength: "Accuracy", priorityArea: "Deadlines" },
                { name: "Treasury", cultureIndex: 89.8, responseRate: 96, employeeCount: 70, keyStrength: "Cash Management", priorityArea: "Forecasting" },
                { name: "Tax & Compliance", cultureIndex: 88.4, responseRate: 95, employeeCount: 80, keyStrength: "Regulatory", priorityArea: "Complexity" },
                { name: "Business Partnering", cultureIndex: 86.7, responseRate: 94, employeeCount: 70, keyStrength: "Collaboration", priorityArea: "Influence" }
            ]},
            { name: "Group HR", cultureIndex: 88.1, responseRate: 95, employeeCount: 280, keyStrength: "People Development", priorityArea: "Change Management", subUnits: [
                { name: "Talent Acquisition", cultureIndex: 90.4, responseRate: 96, employeeCount: 70, keyStrength: "Sourcing", priorityArea: "Diversity" },
                { name: "Learning & Development", cultureIndex: 89.1, responseRate: 95, employeeCount: 75, keyStrength: "Programme Design", priorityArea: "Measurement" },
                { name: "Employee Relations", cultureIndex: 87.3, responseRate: 94, employeeCount: 65, keyStrength: "Fairness", priorityArea: "Policy Updates" },
                { name: "HR Operations", cultureIndex: 85.0, responseRate: 93, employeeCount: 70, keyStrength: "Efficiency", priorityArea: "Automation" }
            ]},
            { name: "Group Technology", cultureIndex: 86.5, responseRate: 94, employeeCount: 350, keyStrength: "Digital Enablement", priorityArea: "Innovation Culture", subUnits: [
                { name: "Infrastructure", cultureIndex: 88.3, responseRate: 95, employeeCount: 100, keyStrength: "Uptime", priorityArea: "Cloud Migration" },
                { name: "Applications", cultureIndex: 86.9, responseRate: 94, employeeCount: 95, keyStrength: "Delivery", priorityArea: "Tech Debt" },
                { name: "Cybersecurity", cultureIndex: 85.7, responseRate: 93, employeeCount: 80, keyStrength: "Threat Response", priorityArea: "Awareness" },
                { name: "IT Service Desk", cultureIndex: 83.1, responseRate: 92, employeeCount: 75, keyStrength: "Resolution Time", priorityArea: "Morale" }
            ]},
            { name: "Group Risk & Compliance", cultureIndex: 84.8, responseRate: 93, employeeCount: 290, keyStrength: "Risk Awareness", priorityArea: "Agility", subUnits: [
                { name: "Enterprise Risk", cultureIndex: 87.0, responseRate: 94, employeeCount: 90, keyStrength: "Frameworks", priorityArea: "Reporting" },
                { name: "Regulatory Compliance", cultureIndex: 85.2, responseRate: 93, employeeCount: 85, keyStrength: "Knowledge", priorityArea: "Change Volume" },
                { name: "Internal Audit", cultureIndex: 83.6, responseRate: 92, employeeCount: 65, keyStrength: "Independence", priorityArea: "Resources" },
                { name: "Conduct Risk", cultureIndex: 81.4, responseRate: 91, employeeCount: 50, keyStrength: "Ethics Focus", priorityArea: "Training" }
            ]},
            { name: "Corporate Affairs", cultureIndex: 83.2, responseRate: 92, employeeCount: 370, keyStrength: "Brand Alignment", priorityArea: "Stakeholder Engagement", subUnits: [
                { name: "Communications", cultureIndex: 85.8, responseRate: 93, employeeCount: 110, keyStrength: "Messaging", priorityArea: "Channels" },
                { name: "CSI & Sustainability", cultureIndex: 84.1, responseRate: 92, employeeCount: 90, keyStrength: "Impact", priorityArea: "Measurement" },
                { name: "Government Relations", cultureIndex: 82.3, responseRate: 91, employeeCount: 80, keyStrength: "Relationships", priorityArea: "Proactivity" },
                { name: "Brand & Marketing", cultureIndex: 80.6, responseRate: 90, employeeCount: 90, keyStrength: "Creativity", priorityArea: "Budget" }
            ]}
        ]
    },
    {
        name: "Sanlam Investment Group",
        cultureIndex: 88.1,
        responseRate: 96,
        employeeCount: 1150,
        keyStrength: "Productivity",
        priorityArea: "Change Agility",
        trend: "up",
        sentiment: "positive",
        subUnits: [
            { name: "Sanlam Investments", cultureIndex: 91.0, responseRate: 97, employeeCount: 260, keyStrength: "Performance Culture", priorityArea: "Succession Planning", subUnits: [
                { name: "Equity Desk", cultureIndex: 93.2, responseRate: 98, employeeCount: 70, keyStrength: "Alpha Generation", priorityArea: "Concentration Risk" },
                { name: "Fixed Income", cultureIndex: 91.5, responseRate: 97, employeeCount: 65, keyStrength: "Discipline", priorityArea: "Yield Compression" },
                { name: "Multi-Asset", cultureIndex: 89.8, responseRate: 96, employeeCount: 70, keyStrength: "Asset Allocation", priorityArea: "Complexity" },
                { name: "Quant Research", cultureIndex: 88.1, responseRate: 95, employeeCount: 55, keyStrength: "Innovation", priorityArea: "Talent Retention" }
            ]},
            { name: "Satrix", cultureIndex: 89.7, responseRate: 96, employeeCount: 180, keyStrength: "Data-Driven Decisions", priorityArea: "Team Diversity", subUnits: [
                { name: "Index Management", cultureIndex: 91.8, responseRate: 97, employeeCount: 55, keyStrength: "Tracking Precision", priorityArea: "Product Expansion" },
                { name: "ETF Operations", cultureIndex: 90.1, responseRate: 96, employeeCount: 50, keyStrength: "Efficiency", priorityArea: "Automation" },
                { name: "Client Solutions Satrix", cultureIndex: 87.4, responseRate: 95, employeeCount: 45, keyStrength: "Education", priorityArea: "Distribution" },
                { name: "Quant Analytics", cultureIndex: 86.2, responseRate: 94, employeeCount: 30, keyStrength: "Modelling", priorityArea: "Resourcing" }
            ]},
            { name: "Sanlam Private Wealth", cultureIndex: 87.3, responseRate: 95, employeeCount: 290, keyStrength: "Client Excellence", priorityArea: "Knowledge Transfer", subUnits: [
                { name: "High Net Worth", cultureIndex: 89.6, responseRate: 96, employeeCount: 90, keyStrength: "Relationship Depth", priorityArea: "Succession" },
                { name: "Portfolio Management", cultureIndex: 87.9, responseRate: 95, employeeCount: 80, keyStrength: "Performance", priorityArea: "Risk Budgeting" },
                { name: "Fiduciary Services", cultureIndex: 86.1, responseRate: 94, employeeCount: 65, keyStrength: "Trust", priorityArea: "Regulatory" },
                { name: "Private Client Admin", cultureIndex: 83.7, responseRate: 93, employeeCount: 55, keyStrength: "Accuracy", priorityArea: "Digitisation" }
            ]},
            { name: "Sanlam Multi-Manager", cultureIndex: 85.8, responseRate: 94, employeeCount: 220, keyStrength: "Collaborative Research", priorityArea: "Process Optimisation", subUnits: [
                { name: "Manager Selection", cultureIndex: 88.2, responseRate: 95, employeeCount: 65, keyStrength: "Due Diligence", priorityArea: "Coverage" },
                { name: "Portfolio Construction", cultureIndex: 86.4, responseRate: 94, employeeCount: 60, keyStrength: "Diversification", priorityArea: "Fees" },
                { name: "Client Reporting", cultureIndex: 84.7, responseRate: 93, employeeCount: 50, keyStrength: "Transparency", priorityArea: "Timeliness" },
                { name: "Operations MM", cultureIndex: 82.3, responseRate: 92, employeeCount: 45, keyStrength: "Process Control", priorityArea: "Automation" }
            ]},
            { name: "Glacier", cultureIndex: 84.1, responseRate: 93, employeeCount: 200, keyStrength: "Platform Innovation", priorityArea: "Change Agility", subUnits: [
                { name: "Platform Development", cultureIndex: 86.5, responseRate: 94, employeeCount: 65, keyStrength: "Feature Velocity", priorityArea: "Tech Debt" },
                { name: "Fund Administration Glacier", cultureIndex: 84.8, responseRate: 93, employeeCount: 55, keyStrength: "Accuracy", priorityArea: "Scale" },
                { name: "Adviser Experience", cultureIndex: 83.1, responseRate: 92, employeeCount: 45, keyStrength: "Usability", priorityArea: "Feedback Loops" },
                { name: "Glacier Operations", cultureIndex: 80.9, responseRate: 91, employeeCount: 35, keyStrength: "Reliability", priorityArea: "Headcount" }
            ]}
        ]
    }
];

// ============================================================================
// Export for use in other modules
// ============================================================================

// Make data available globally for backward compatibility
if (typeof window !== 'undefined') {
    window.mockData = {
        leverDetailsData,
        progressTrackerData,
        businessUnitData
    };
}
