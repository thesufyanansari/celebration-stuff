import fs from "fs";

function printFile(file, title) {
  console.log(`\n=================== ${title} ===================`);
  const data = JSON.parse(fs.readFileSync(file));
  data.forEach((a, i) => {
    console.log(`[${i + 1}] SLUG: ${a.slug}`);
    console.log(`    Title: ${a.title}`);
    console.log(`    PrimaryKW: ${a.primaryKeyword}`);
    console.log(`    Sections (${a.sections.length}): ${a.sections.slice(0, 3).join(" | ")}`);
    console.log(`    Products (${a.products.length}): ${a.products.slice(0, 3).join(" | ")}`);
    console.log("");
  });
}

printFile("scratch/vintage-halloween.json", "VINTAGE HALLOWEEN");
printFile("scratch/outdoor-halloween.json", "OUTDOOR HALLOWEEN");
printFile("scratch/porch-halloween.json", "PORCH HALLOWEEN");
