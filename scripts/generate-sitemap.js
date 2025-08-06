#!/usr/bin/env node

/**
 * Script để generate sitemap thủ công
 * Sử dụng khi cần cập nhật sitemap mà không deploy lại
 * 
 * Cách chạy:
 * node scripts/generate-sitemap.js
 */

const fs = require('fs');
const path = require('path');

// Configuration
const BASE_URL = 'https://dulichlientinh24h.com';
const OUTPUT_FILE = path.join(__dirname, '../public/sitemap-generated.xml');

// Sample data - thay bằng database call thực tế khi cần
const PAGES = [
  { url: '', priority: '1.00', changefreq: 'daily' },
  { url: '/about', priority: '0.70', changefreq: 'monthly' },
  { url: '/contact', priority: '0.70', changefreq: 'monthly' },
  { url: '/posts', priority: '0.80', changefreq: 'weekly' },
  { url: '/services', priority: '0.60', changefreq: 'monthly' },
  { url: '/booking', priority: '0.70', changefreq: 'weekly' },
  { url: '/privacy', priority: '0.30', changefreq: 'yearly' },
  { url: '/terms', priority: '0.30', changefreq: 'yearly' },
];

const CAR_TYPES = [1, 2, 3, 4]; // IDs của car types
const POSTS = []; // Sẽ được load từ database trong thực tế

function generateSitemap() {
  const currentDate = new Date().toISOString();
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">

`;

  // Add main pages
  PAGES.forEach(page => {
    sitemap += `  <url>
    <loc>${BASE_URL}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>

`;
  });

  // Add car type pages
  CAR_TYPES.forEach(carTypeId => {
    sitemap += `  <url>
    <loc>${BASE_URL}/cars/${carTypeId}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.80</priority>
  </url>

`;
  });

  // Add post pages (nếu có)
  POSTS.forEach(post => {
    sitemap += `  <url>
    <loc>${BASE_URL}/posts/${post.id}</loc>
    <lastmod>${post.updated_at || currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.60</priority>
  </url>

`;
  });

  sitemap += '</urlset>';

  return sitemap;
}

function saveSitemap() {
  try {
    const sitemapContent = generateSitemap();
    
    // Ensure directory exists
    const dir = path.dirname(OUTPUT_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    // Write sitemap
    fs.writeFileSync(OUTPUT_FILE, sitemapContent, 'utf8');
    
    console.log('✅ Sitemap generated successfully!');
    console.log(`📁 File saved to: ${OUTPUT_FILE}`);
    console.log(`🌐 Base URL: ${BASE_URL}`);
    console.log(`📊 Total URLs: ${PAGES.length + CAR_TYPES.length + POSTS.length}`);
    console.log('');
    console.log('📋 Generated URLs:');
    
    // List generated URLs
    PAGES.forEach(page => {
      console.log(`   - ${BASE_URL}${page.url}`);
    });
    
    CAR_TYPES.forEach(carTypeId => {
      console.log(`   - ${BASE_URL}/cars/${carTypeId}`);
    });
    
    if (POSTS.length > 0) {
      POSTS.forEach(post => {
        console.log(`   - ${BASE_URL}/posts/${post.id}`);
      });
    }
    
    console.log('');
    console.log('💡 Tips:');
    console.log('   - Upload sitemap-generated.xml to your server');
    console.log('   - Submit to Google Search Console');
    console.log('   - Update robots.txt if needed');
    
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    process.exit(1);
  }
}

// Chạy script
console.log('🚀 Generating sitemap...');
saveSitemap(); 