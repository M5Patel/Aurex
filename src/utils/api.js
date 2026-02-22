export const fetchProducts = async () => {
  const res = await import('../data/products.json');
  return res.default || res;
};

export const fetchProductBySlug = async (slug) => {
  const products = await fetchProducts();
  return Array.isArray(products) ? products.find((p) => p.slug === slug) || null : null;
};

export const fetchAccessories = async () => {
  const res = await import('../data/accessories.json');
  return res.default || res;
};
