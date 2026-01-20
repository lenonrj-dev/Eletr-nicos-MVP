export type Product = {
  id: string;
  slug: string;
  title: string;
  category: "Home" | "Music" | "Other";
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  gallery?: string[];
  badge?: string;
  description?: string;
  brand?: string;
  model?: string;
  warrantyMonths?: number;
  stockStatus?: "in_stock" | "low_stock" | "out_of_stock";
  specs?: {
    connectivity?: string;
    battery?: string;
    weight?: string;
    dimensions?: string;
    color?: string;
    power?: string;
    material?: string;
  };
  highlights?: string[];
  inTheBox?: string[];
};

function normalizeSlug(value: string) {
  const raw = value ?? "";
  try {
    return decodeURIComponent(raw).trim().toLowerCase();
  } catch {
    return raw.trim().toLowerCase();
  }
}

function dedupeProducts(list: Product[]) {
  const seenSlugs = new Set<string>();
  const seenIds = new Set<string>();

  return list.filter((item) => {
    const slugKey = normalizeSlug(item.slug);
    if (seenSlugs.has(slugKey) || seenIds.has(item.id)) {
      return false;
    }
    seenSlugs.add(slugKey);
    seenIds.add(item.id);
    return true;
  });
}

const products: Product[] = [
  {
    id: "p1",
    slug: "phone-holder-sakti",
    title: "Phone Holder Sakti",
    category: "Other",
    price: 29.9,
    rating: 5,
    reviews: 1200,
    image:
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1555617981-dac3880eac6c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=1200&q=80",
    ],
    badge: "Other",
    description:
      "Suporte minimalista e firme para manter seu smartphone sempre visível e no ângulo certo.",
  },
  {
    id: "p2",
    slug: "headsound",
    title: "Headsound",
    category: "Music",
    price: 12,
    rating: 5,
    reviews: 1200,
    image:
      "https://images.unsplash.com/photo-1585386959984-a41552231693?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1518441902117-f0a3bb6dbbbb?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1585386959984-a41552231693?auto=format&fit=crop&w=1200&q=80",
    ],
    badge: "Music",
    brand: "Ateliux",
    model: "HS-200",
    warrantyMonths: 12,
    stockStatus: "in_stock",
    highlights: [
      "Bluetooth 5.3",
      "Noise cancellation",
      "20h battery",
      "USB-C charging",
    ],
    specs: {
      connectivity: "Bluetooth 5.3",
      battery: "20h",
      weight: "220g",
      dimensions: "19 x 18 x 8 cm",
      color: "Black",
      power: "USB-C",
      material: "Aluminum",
    },
    inTheBox: ["Headphone", "USB-C cable", "Pouch", "Quick guide"],
    description:
      "Som equilibrado com visual clean — ideal para trabalho, estudo e rotina.",
  },
  {
    id: "p3",
    slug: "adudu-cleaner",
    title: "Adudu Cleaner",
    category: "Other",
    price: 29.9,
    rating: 4.4,
    reviews: 440,
    image:
      "https://images.unsplash.com/photo-1581579185169-0b0122b5c4a7?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1581579185169-0b0122b5c4a7?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1581579185169-0b0122b5c4a7?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1581579185169-0b0122b5c4a7?auto=format&fit=crop&w=1000&q=80",
    ],
    badge: "Other",
    description:
      "Limpeza prática e rápida para manter o ambiente com cara de novo.",
  },
  {
    id: "p4",
    slug: "cctv-maling",
    title: "CCTV Maling",
    category: "Home",
    price: 50,
    rating: 4.8,
    reviews: 120,
    image:
      "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=1000&q=80",
    ],
    badge: "Home",
    description:
      "Monitoramento inteligente com visual discreto e instalação simples.",
  },
  {
    id: "p5",
    slug: "stuffus-peker-32",
    title: "Stuffus Peker 32",
    category: "Other",
    price: 9.9,
    rating: 5,
    reviews: 1200,
    image:
      "https://images.unsplash.com/photo-1585314062604-1a357de8b000?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1585314062604-1a357de8b000?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1585314062604-1a357de8b000?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1585314062604-1a357de8b000?auto=format&fit=crop&w=1000&q=80",
    ],
    badge: "Other",
    description:
      "Design compacto com acabamento premium — perfeito para setups minimalistas.",
  },
  {
    id: "p6",
    slug: "stuffus-r175",
    title: "Stuffus R175",
    category: "Music",
    price: 34.1,
    rating: 4.8,
    reviews: 2400,
    image:
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1000&q=80",
    ],
    badge: "Music",
    description:
      "Fones compactos com performance consistente e encaixe confortável.",
  },
  {
    id: "p7",
    slug: "loose-fit-hoodie",
    title: "Loose Fit Hoodie",
    category: "Other",
    price: 24.99,
    oldPrice: 32.99,
    rating: 4.5,
    reviews: 50,
    image:
      "https://images.unsplash.com/photo-1520975661595-6453be3f7070?auto=format&fit=crop&w=1400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1520975661595-6453be3f7070?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1520975661595-6453be3f7070?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1520975661595-6453be3f7070?auto=format&fit=crop&w=1100&q=80",
    ],
    badge: "Man Fashion",
    description:
      "Moletom com caimento moderno, toque macio e estética limpa para o dia a dia.",
  },
  {
    id: "p8",
    slug: "tws-bujug",
    title: "TWS Bujug",
    category: "Music",
    price: 29.9,
    rating: 5,
    reviews: 1200,
    image:
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=900&q=80",
    ],
    badge: "Music",
    brand: "Ateliux",
    model: "TWS-53",
    warrantyMonths: 12,
    stockStatus: "low_stock",
    highlights: ["Bluetooth 5.3", "ANC", "24h case", "IPX4"],
    specs: {
      connectivity: "Bluetooth 5.3",
      battery: "6h + 18h case",
      weight: "48g",
      dimensions: "6 x 4 x 3 cm",
      color: "Graphite",
      power: "USB-C",
      material: "Polycarbonate",
    },
    inTheBox: ["Earbuds", "Charging case", "USB-C cable", "Ear tips"],
    description:
      "Fones TWS com estojo compacto, som limpo e conexão rápida.",
  },
  {
    id: "p9",
    slug: "headsound-baptis",
    title: "Headsound Baptis",
    category: "Music",
    price: 12,
    rating: 5,
    reviews: 1200,
    image:
      "https://images.unsplash.com/photo-1518441902117-f0a3bb6dbbbb?auto=format&fit=crop&w=1200&q=80",
    badge: "Music",
    description:
      "Headphone premium com presença forte e acabamento elegante.",
  },
  {
    id: "p10",
    slug: "piano-grand",
    title: "Grand Piano",
    category: "Music",
    price: 299.9,
    rating: 5,
    reviews: 220,
    image:
      "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=1200&q=80",
    badge: "Music",
    description:
      "Um clássico absoluto — estética de galeria com presença marcante.",
  },
  {
    id: "p11",
    slug: "polo-contrast-trims",
    title: "Polo with Contrast Trims",
    category: "Other",
    price: 212,
    oldPrice: 242,
    rating: 4,
    reviews: 120,
    image:
      "https://images.unsplash.com/photo-1520975852507-4c28a1a4d1a9?auto=format&fit=crop&w=1400&q=80",
    badge: "-20%",
    description:
      "Peça versátil com detalhes discretos — visual premium e fácil de combinar.",
  },
  {
    id: "p12",
    slug: "gradient-graphic-tshirt",
    title: "Gradient Graphic T-shirt",
    category: "Other",
    price: 145,
    rating: 3.5,
    reviews: 80,
    image:
      "https://images.unsplash.com/photo-1520975659959-ec5b3a0bc15b?auto=format&fit=crop&w=1400&q=80",
    description:
      "Camiseta com visual moderno e acabamento limpo para composições rápidas.",
  },
  {
    id: "p13",
    slug: "polo-tipping-details",
    title: "Polo with Tipping Details",
    category: "Other",
    price: 180,
    rating: 4.5,
    reviews: 210,
    image:
      "https://images.unsplash.com/photo-1520975656226-8ccf2f4c3f83?auto=format&fit=crop&w=1400&q=80",
    description:
      "Corte ajustado com presença — ideal para o casual premium.",
  },
  {
    id: "p14",
    slug: "striped-jacket",
    title: "Striped Jacket",
    category: "Other",
    price: 120,
    oldPrice: 160,
    rating: 5,
    reviews: 90,
    image:
      "https://images.unsplash.com/photo-1520975659381-9f463f4d6ac3?auto=format&fit=crop&w=1400&q=80",
    badge: "-30%",
    description:
      "Jaqueta com textura e presença — perfeita para elevar o look sem esforço.",
  },
  {
    id: "p15",
    slug: "instant-pot-duo",
    title: "Instant Pot Duo 7-in-1",
    category: "Home",
    price: 75.0,
    rating: 4.7,
    reviews: 980,
    image:
      "https://images.unsplash.com/photo-1589927986089-35812386f0f4?auto=format&fit=crop&w=1200&q=80",
    badge: "Home",
    description:
      "Praticidade no preparo — cozinha organizada e resultado consistente.",
  },
  {
    id: "p16",
    slug: "mini-mouse-wireless",
    title: "Xiaomi Wireless Mouse",
    category: "Other",
    price: 20.9,
    rating: 4.6,
    reviews: 1440,
    image:
      "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=1200&q=80",
    badge: "Other",
    brand: "Ateliux",
    model: "WM-10",
    warrantyMonths: 12,
    stockStatus: "in_stock",
    highlights: ["2.4G wireless", "Silent click", "1200 DPI", "AA battery"],
    specs: {
      connectivity: "2.4G wireless",
      battery: "Up to 12 months",
      weight: "78g",
      dimensions: "10 x 6 x 3.5 cm",
      color: "Black",
      power: "AA battery",
      material: "ABS",
    },
    inTheBox: ["Mouse", "USB receiver", "Quick guide"],
    description:
      "Mouse leve e confortável — perfeito para trabalho e setup minimalista.",
  },
];

const productsBySlug = new Map<string, Product>(
  dedupeProducts(products).map((p) => [normalizeSlug(p.slug), p])
);

export function getAllProducts() {
  return dedupeProducts(products);
}

export function getProductBySlug(slug: string) {
  return productsBySlug.get(normalizeSlug(slug));
}

export const SHOP_GRID: Product[] = dedupeProducts([
  productsBySlug.get("phone-holder-sakti")!,
  productsBySlug.get("headsound")!,
  productsBySlug.get("adudu-cleaner")!,
  productsBySlug.get("cctv-maling")!,
  productsBySlug.get("stuffus-peker-32")!,
  productsBySlug.get("stuffus-r175")!,
  productsBySlug.get("tws-bujug")!,
  productsBySlug.get("headsound-baptis")!,
  productsBySlug.get("piano-grand")!,
]);

export const RECOMMENDATIONS: Product[] = [
  productsBySlug.get("tws-bujug")!,
  productsBySlug.get("headsound-baptis")!,
  productsBySlug.get("piano-grand")!,
  productsBySlug.get("phone-holder-sakti")!,
];

export const ALSO_LIKE: Product[] = [
  productsBySlug.get("polo-contrast-trims")!,
  productsBySlug.get("gradient-graphic-tshirt")!,
  productsBySlug.get("polo-tipping-details")!,
  productsBySlug.get("striped-jacket")!,
];

export const HOME_PAGE = {
  hero: {
    title: "SHOP COMPUTERS\n& ACCESSORIES",
    subtitle:
      "Compre notebooks, monitores, tablets, PCs gamer e acessórios — prontos para elevar seu setup.",
    cta: "Ver ofertas",
    image:
      "https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?auto=format&fit=crop&w=1600&q=80",
    priceTag: {
      title: "JBL 1460BT Black",
      price: 125,
      oldPrice: 234,
      badge: "50%",
    },
  },
  categories: [
    {
      title: "Beauty picks",
      image:
        "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "Computer & Accessories",
      image:
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "Video games",
      image:
        "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "Toys & Games",
      image:
        "https://images.unsplash.com/photo-1581579185169-0b0122b5c4a7?auto=format&fit=crop&w=1200&q=80",
    },
  ],
  quickPicks: [
    {
      title: "Mais vistos",
      products: [
        productsBySlug.get("phone-holder-sakti")!,
        productsBySlug.get("headsound")!,
        productsBySlug.get("adudu-cleaner")!,
        productsBySlug.get("cctv-maling")!,
        productsBySlug.get("stuffus-peker-32")!,
      ],
    },
    {
      title: "Top sellers",
      products: [
        productsBySlug.get("stuffus-r175")!,
        productsBySlug.get("instant-pot-duo")!,
        productsBySlug.get("mini-mouse-wireless")!,
        productsBySlug.get("tws-bujug")!,
        productsBySlug.get("loose-fit-hoodie")!,
      ],
    },
  ],
  comfy: [
    {
      title: "Comfy styles for her",
      subtitle: "Macias, leves e prontas pro dia.",
      image:
        "https://images.unsplash.com/photo-1520975661595-6453be3f7070?auto=format&fit=crop&w=1400&q=80",
    },
    {
      title: "Comfy styles for him",
      subtitle: "Conforto com visual limpo.",
      image:
        "https://images.unsplash.com/photo-1520975659959-ec5b3a0bc15b?auto=format&fit=crop&w=1400&q=80",
    },
  ],
  mustHave: {
    title: "Itens que você precisa",
    products: [
      productsBySlug.get("mini-mouse-wireless")!,
      productsBySlug.get("stuffus-r175")!,
      productsBySlug.get("headsound")!,
      productsBySlug.get("phone-holder-sakti")!,
      productsBySlug.get("adudu-cleaner")!,
    ],
  },
};
