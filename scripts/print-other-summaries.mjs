import fs from "fs";

function printSummary(file, name) {
  console.log(`\n==================================================`);
  console.log(`CLUSTER: ${name}`);
  console.log(`==================================================`);
  const data = JSON.parse(fs.readFileSync(file));
  data.forEach((a, i) => {
    console.log(`[${i + 1}] ${a.slug}`);
    console.log(`    Title: ${a.title}`);
    console.log(`    PrimaryKW: ${a.primaryKeyword}`);
    console.log(`    Sections (${a.sections.length}): ${a.sections.slice(0, 4).join(" | ")}`);
    console.log(`    Products/Items (${a.products.length}): ${a.products.slice(0, 4).join(" | ")}`);
    console.log("");
  });
}

printSummary("scratch/vintage-halloween.json", "VINTAGE HALLOWEEN DECOR");
printSummary("scratch/outdoor-halloween.json", "OUTDOOR HALLOWEEN DECOR");
printSummary("scratch/porch-halloween.json", "HALLOWEEN PORCH DECOR");
printSummary("scratch/yard-halloween.json", "HALLOWEEN YARD DECOR");
