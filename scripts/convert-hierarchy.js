const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

const INPUT = path.join(__dirname, '..', 'Feedback', '11 Mar', 'sanlam_hierarchy_breakdown.xlsx');
const OUTPUT = path.join(__dirname, '..', 'js', 'shared', 'hierarchy-data.js');

const wb = XLSX.readFile(INPUT);
const rows = XLSX.utils.sheet_to_json(wb.Sheets['FullHierarchy']);

const root = { name: 'Sanlam' };

rows.forEach(row => {
    const levels = [];
    for (let i = 1; i <= 10; i++) {
        const val = row['BusinessLevel' + i];
        if (val && val.toString().trim() && val.toString().trim() !== 'Not Specified') {
            levels.push(val.toString().trim());
        } else {
            break;
        }
    }

    let current = root;
    for (let i = 1; i < levels.length; i++) {
        const name = levels[i];
        if (!current.children) current.children = [];
        let child = current.children.find(c => c.name === name);
        if (!child) {
            child = { name };
            current.children.push(child);
        }
        current = child;
    }
});

function sortTree(node) {
    if (node.children) {
        node.children.sort((a, b) => a.name.localeCompare(b.name));
        node.children.forEach(sortTree);
    }
}
sortTree(root);

function countNodes(node) {
    let c = 1;
    if (node.children) node.children.forEach(ch => { c += countNodes(ch); });
    return c;
}

function maxDepth(node, d) {
    if (!node.children || !node.children.length) return d;
    return Math.max(...node.children.map(ch => maxDepth(ch, d + 1)));
}

console.log('Nodes:', countNodes(root));
console.log('Max depth:', maxDepth(root, 1));
console.log('Level-2 BUs:', root.children.map(c => c.name).join(', '));

const js = `// Auto-generated from sanlam_hierarchy_breakdown.xlsx — do not edit manually\nwindow.hierarchyData = ${JSON.stringify(root, null, 2)};\n`;

fs.writeFileSync(OUTPUT, js, 'utf8');
console.log('Written to', OUTPUT, '(' + (js.length / 1024).toFixed(1) + ' KB)');
