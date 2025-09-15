// Netlify build script to ensure proper deployment

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name equivalent to __dirname in CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure the netlify/functions directory exists
const functionsDir = path.join(__dirname, 'netlify', 'functions');
if (!fs.existsSync(functionsDir)) {
  fs.mkdirSync(functionsDir, { recursive: true });
}

// Create Netlify environment file
const envNetlifyPath = path.join(__dirname, '.env.netlify');
if (!fs.existsSync(envNetlifyPath)) {
  console.log('Creating .env.netlify file for Netlify deployment');
  fs.writeFileSync(
    envNetlifyPath,
    'MONGODB_URI=memory\nPING_MESSAGE="API is running on Netlify"\n'
  );
}

// Create production environment file
const envProdPath = path.join(__dirname, '.env.production');
if (!fs.existsSync(envProdPath)) {
  console.log('Creating .env.production file for production deployment');
  fs.writeFileSync(
    envProdPath,
    'MONGODB_URI=memory\nPING_MESSAGE="API is running in production"\n'
  );
}

// Ensure package.json includes express as a dependency
const packageJsonPath = path.join(__dirname, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Check if dependencies exists, if not create it
if (!packageJson.dependencies) {
  packageJson.dependencies = {};
}

// Add express if not present
if (!packageJson.dependencies.express) {
  console.log('Adding express to dependencies');
  packageJson.dependencies.express = '^4.18.3';
  
  // Ensure type is set to module for ES modules syntax
  if (!packageJson.type || packageJson.type !== 'module') {
    packageJson.type = 'module';
    console.log('Setting package.json type to module for ES modules support');
  }
  
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
}

console.log('Netlify build preparation complete!');