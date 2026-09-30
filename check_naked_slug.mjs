import fs from 'fs';
import path from 'path';

function checkFiles(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file === 'node_modules' || file === '.git' || file === '.output' || file === 'routeTree.gen.ts') continue;
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      checkFiles(fullPath);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const regex = /<Link[^>]*to=["']\/(category|article|author)\/\$slug["'][^>]*>/gs;
      let match;
      while ((match = regex.exec(content)) !== null) {
        const fullTag = match[0];
        const hasParams = fullTag.includes('params=');
        console.log(`${fullPath.replace(/\\/g, '/')}:`);
        console.log(`   Tag: ${fullTag.replace(/\s+/g, ' ')}`);
        console.log(`   Has params: ${hasParams}`);
      }
    }
  }
}

checkFiles('src');
