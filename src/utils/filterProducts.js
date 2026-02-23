/**
 * Maps MegaMenu slugs to product filters.
 * Products use: category, gender, strap, type, style, price
 */
const PRICE_SLUGS = {
  'under-rs-1500': 1500,
  'under-rs-2000': 2000,
  'under-rs-3000': 3000,
  'under-rs-5000': 5000,
};

const STRAP_SLUG_MAP = {
  'silicone-watches': 'silicone',
  'leather-watches': 'leather',
  'steel-watches': 'steel',
  'nylon-watches': 'nylon',
};

const TYPE_SLUG_MAP = {
  'analog-digital-watches': 'analog-digital',
  'analog-watches': 'analog',
  'digital-watches': 'digital',
  'chronograph-watches': 'chronograph',
};

const STYLE_SLUG_MAP = {
  'sports-wear': 'sports',
  'sportswear': 'sports',
  'daily-wear': 'daily',
  'office-wear': 'office',
};

/** Returns true if product matches the given category slug from MegaMenu. */
export function productMatchesSlug(product, slug) {
  if (!slug || slug === 'view-all') return true;
  const s = slug.toLowerCase();

  if (PRICE_SLUGS[s] != null) {
    const maxPrice = PRICE_SLUGS[s];
    const price = product.discountPrice ?? product.price ?? 0;
    return price < maxPrice;
  }

  if (STRAP_SLUG_MAP[s]) {
    return (product.strapType ?? product.strap ?? '').toLowerCase() === STRAP_SLUG_MAP[s];
  }

  if (TYPE_SLUG_MAP[s]) {
    return (product.type ?? '').toLowerCase() === TYPE_SLUG_MAP[s];
  }

  if (STYLE_SLUG_MAP[s]) {
    return (product.style ?? '').toLowerCase() === STYLE_SLUG_MAP[s];
  }

  if (['men', 'women', 'unisex'].includes(s)) {
    return (product.gender ?? '').toLowerCase() === s;
  }

  if ((product.category ?? '').toLowerCase() === s) return true;
  if ((product.tags ?? []).some((t) => String(t).toLowerCase().replace(/\s+/g, '-') === s)) return true;

  const nameSlug = (product.name ?? '').toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  if (nameSlug.includes(s) || s.includes(nameSlug)) return true;

  return false;
}
