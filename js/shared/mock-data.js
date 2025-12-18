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
                { name: "Continuous Development", score: 85.0, statementCount: 3 },
                { name: "Change Agility", score: 78.5, statementCount: 3 },
                { name: "Productivity", score: 88.2, statementCount: 4 },
                { name: "Customer Centricity", score: 81.8, statementCount: 5 }
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
        completed: 9852,
        inProgress: 440,
        notStarted: 358,
        completionRate: 93
    },
    segments: [
        {
            name: "Sanlam Fintech",
            population: 1200,
            completed: 1140,
            inProgress: 30,
            notStarted: 30,
            completionRate: 95,
            divisions: [
                {
                    name: "Sanlam Fintech - All Divisions",
                    population: 1200,
                    completed: 1140,
                    inProgress: 30,
                    notStarted: 30,
                    completionRate: 95,
                    departments: []
                }
            ]
        },
        {
            name: "Sanlam Life & Savings",
            population: 2700,
            completed: 2511,
            inProgress: 100,
            notStarted: 89,
            completionRate: 93,
            divisions: [
                {
                    name: "Sanlam Life & Savings - All Divisions",
                    population: 2700,
                    completed: 2511,
                    inProgress: 100,
                    notStarted: 89,
                    completionRate: 93,
                    departments: []
                }
            ]
        },
        {
            name: "Santam",
            population: 3200,
            completed: 2944,
            inProgress: 150,
            notStarted: 106,
            completionRate: 92,
            divisions: [
                {
                    name: "Santam - All Divisions",
                    population: 3200,
                    completed: 2944,
                    inProgress: 150,
                    notStarted: 106,
                    completionRate: 92,
                    departments: []
                }
            ]
        },
        {
            name: "SanlamAllianz",
            population: 800,
            completed: 720,
            inProgress: 40,
            notStarted: 40,
            completionRate: 90,
            divisions: [
                {
                    name: "SanlamAllianz - All Divisions",
                    population: 800,
                    completed: 720,
                    inProgress: 40,
                    notStarted: 40,
                    completionRate: 90,
                    departments: []
                }
            ]
        },
        {
            name: "Sanlam Group Office",
            population: 1600,
            completed: 1456,
            inProgress: 80,
            notStarted: 64,
            completionRate: 91,
            divisions: [
                {
                    name: "Sanlam Group Office - All Divisions",
                    population: 1600,
                    completed: 1456,
                    inProgress: 80,
                    notStarted: 64,
                    completionRate: 91,
                    departments: []
                }
            ]
        },
        {
            name: "Sanlam Investment Group",
            population: 1150,
            completed: 1081,
            inProgress: 40,
            notStarted: 29,
            completionRate: 94,
            divisions: [
                {
                    name: "Sanlam Investment Group - All Divisions",
                    population: 1150,
                    completed: 1081,
                    inProgress: 40,
                    notStarted: 29,
                    completionRate: 94,
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
        sentiment: "positive"
    },
    {
        name: "Sanlam Life & Savings",
        cultureIndex: 84.2,
        responseRate: 95,
        employeeCount: 2700,
        keyStrength: "Customer Centricity",
        priorityArea: "Workload Management",
        trend: "stable",
        sentiment: "neutral"
    },
    {
        name: "Santam",
        cultureIndex: 81.3,
        responseRate: 93,
        employeeCount: 3200,
        keyStrength: "Risk Management",
        priorityArea: "Leadership Support",
        trend: "down",
        sentiment: "neutral"
    },
    {
        name: "SanlamAllianz",
        cultureIndex: 79.8,
        responseRate: 91,
        employeeCount: 800,
        keyStrength: "Global Collaboration",
        priorityArea: "Culture Integration",
        trend: "stable",
        sentiment: "neutral"
    },
    {
        name: "Sanlam Group Office",
        cultureIndex: 86.7,
        responseRate: 94,
        employeeCount: 1600,
        keyStrength: "Strategic Alignment",
        priorityArea: "Employee Experience",
        trend: "up",
        sentiment: "positive"
    },
    {
        name: "Sanlam Investment Group",
        cultureIndex: 88.1,
        responseRate: 96,
        employeeCount: 1150,
        keyStrength: "Productivity",
        priorityArea: "Change Agility",
        trend: "up",
        sentiment: "positive"
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
