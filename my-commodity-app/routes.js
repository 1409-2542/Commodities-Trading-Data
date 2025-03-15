// routes.js
const express = require('express');
const router = express.Router();
const db = require('./db');

// Get category and its subcategories
router.get('/:category_slug', async (req, res) => {
  try {
    const { category_slug } = req.params;
    const category = await db.queryAsync('SELECT * FROM categories WHERE slug = ?', [category_slug]);

    if (category.length === 0) return res.status(404).json({ error: "Category not found" });

    const subcategories = await db.queryAsync('SELECT * FROM subcategories WHERE category_id = ?', [category[0].id]);
    res.json({ category: category[0], subcategories });
  } catch (error) {
    console.error('Error fetching category data:', error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get subcategory and its commodities
router.get('/:category_slug/:subcategory_slug', async (req, res) => {
  try {
    const { category_slug, subcategory_slug } = req.params;
    const category = await db.queryAsync('SELECT * FROM categories WHERE slug = ?', [category_slug]);
    if (category.length === 0) return res.status(404).json({ error: "Category not found" });

    const subcategory = await db.queryAsync('SELECT * FROM subcategories WHERE slug = ? AND category_id = ?', [subcategory_slug, category[0].id]);
    if (subcategory.length === 0) return res.status(404).json({ error: "Subcategory not found" });

    const commodities = await db.queryAsync('SELECT * FROM commodities WHERE subcategory_id = ?', [subcategory[0].id]);
    res.json({ category: category[0], subcategory: subcategory[0], commodities });
  } catch (error) {
    console.error('Error fetching subcategory data:', error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get commodity and its latest price along with production data
router.get('/:category_slug/:subcategory_slug/:commodity_slug', async (req, res) => {
  try {
    const { category_slug, subcategory_slug, commodity_slug } = req.params;
    
    const commodity = await db.queryAsync(`
      SELECT cm.*, s.slug AS subcategory_slug, c.slug AS category_slug
      FROM commodities cm
      JOIN subcategories s ON cm.subcategory_id = s.id
      JOIN categories c ON s.category_id = c.id
      WHERE cm.slug = ? AND s.slug = ? AND c.slug = ?`, 
      [commodity_slug, subcategory_slug, category_slug]
    );

    if (commodity.length === 0) return res.status(404).json({ error: "Commodity not found" });

    const price = await db.queryAsync('SELECT * FROM prices WHERE commodity_id = ? ORDER BY date DESC LIMIT 1', [commodity[0].id]);
    
    // Fetch production data along with producer and country information
    const productionData = await db.queryAsync(`
      SELECT p.year, p.total_production, p.market_share_percentage, pr.producer_name, c.country_name, u.unit_name
      FROM Production p
      JOIN Producers pr ON p.producer_id = pr.producer_id
      JOIN Countries c ON p.country_id = c.country_id
      JOIN Units u ON p.unit_id = u.unit_id
      WHERE p.commodity_id = ?
      ORDER BY p.year DESC`, 
      [commodity[0].id]
    );

    const relatedCommodities = await db.queryAsync(`
      SELECT cm.id, cm.name, cm.slug
      FROM commodities cm
      JOIN subcategories s ON cm.subcategory_id = s.id
      WHERE s.slug = ? AND cm.slug != ?
      ORDER BY cm.name`, [subcategory_slug, commodity_slug]);    
    
    res.json({
      commodity: commodity[0], 
      price: price[0] || null, 
      relatedCommodities,
      productionData
    });
  } catch (error) {
    console.error('Error fetching commodity data:', error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;