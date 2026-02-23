/** Normalize product for consistent fields (discountPrice, stock, rating, etc.) */
function normalizeProduct(p) {
  if (!p) return null;
  return {
    ...p,
    discountPrice: p.discountPrice ?? p.price,
    stock: p.stock ?? 10,
    rating: p.rating ?? 4.5,
    reviews: p.reviews ?? 0,
    strapType: p.strapType ?? p.strap,
    tags: p.tags ?? [p.category, p.gender, p.strap, p.type, p.style].filter(Boolean),
  };
}

export const fetchProducts = async () => {
  const res = await import('../data/products.json');
  const list = res.default || res;
  return Array.isArray(list) ? list.map(normalizeProduct) : list;
};

export const fetchProductBySlug = async (slug) => {
  const products = await fetchProducts();
  const p = Array.isArray(products) ? products.find((x) => x.slug === slug) : null;
  return p ? normalizeProduct(p) : null;
};

export const fetchAccessories = async () => {
  const res = await import('../data/accessories.json');
  return res.default || res;
};
