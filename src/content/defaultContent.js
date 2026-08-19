// Sitenin tüm içeriğinin varsayılan değerleri
// Admin panelinden değiştirilen içerik localStorage'a kaydedilir ve bu değerlerin önüne geçer

export const defaultContent = {
  hero: {
    name:       'Ramazan',
    surname:    'Utuş',
    title:      'Software Developer & Tech Entrepreneur',
    tagline:    '42 École mezunu. Full-stack sistemler, AI entegrasyonları ve 3D deneyimler tasarlıyorum.',
    ctaPrimary:   'View Work',
    ctaSecondary: 'About',
  },

  about: {
    label:   'About',
    heading: 'I build systems\nthat work at scale.',
    paragraphs: [
      '42 École Istanbul\'dan mezun oldum. Eğitim boyunca peer-to-peer yöntemle C, Unix, algoritmalar ve sistem programlaması öğrendim.',
      'Şu anda e-ticaret altyapıları, AI otomasyon iş akışları ve 3D web deneyimleri geliştiriyorum. Karmaşık problemleri zarif çözümlere dönüştürmek benim uğraşım.',
    ],
    facts: [
      { label: 'Based in',  value: 'Ankara, TR' },
      { label: 'Education', value: '42 École Istanbul' },
      { label: 'Focus',     value: 'Full Stack & AI Systems' },
      { label: 'Available', value: 'Open to opportunities' },
    ],
  },

  projects: [
    {
      id:    '01',
      num:   '01',
      title: 'Safir Store',
      sub:   'Advanced E-Commerce Platform',
      stack: 'Supabase · PayTR · Next.js · React',
      desc:  'Çok kategorili ürün yönetimi, gerçek zamanlı stok takibi, PayTR ödeme entegrasyonu ve Supabase tabanlı arka uç.',
      link:  '',
    },
    {
      id:    '02',
      num:   '02',
      title: 'RandevoPro',
      sub:   'Dynamic Reservation System',
      stack: 'Node.js · PostgreSQL · WebSocket',
      desc:  'İşletmelere özel dinamik randevu yönetimi — çakışma önleme, SMS bildirim, çoklu çalışan takvimi.',
      link:  '',
    },
    {
      id:    '03',
      num:   '03',
      title: 'Jewelry E-Commerce',
      sub:   'Live Gold Price Tracking & Custom Pricing',
      stack: 'React · Haremaltın API · Supabase',
      desc:  'Haremaltın API\'den canlı altın fiyatı çekerek anlık kuyum fiyatlandırması yapan e-ticaret platformu.',
      link:  '',
    },
  ],

  contact: {
    label:   'Contact',
    heading: 'Let\'s build\nsomething.',
    sub:     'Yeni bir proje veya iş birliği için doğrudan e-posta atabilirsiniz.',
    email:   'ramazanutus049@gmail.com',
    socials: [
      { label: 'GitHub',   href: 'https://github.com/ramazanutus' },
      { label: 'LinkedIn', href: 'https://linkedin.com/in/ramazanutus' },
      { label: 'Behance',  href: 'https://behance.net/ramazanutus' },
      { label: 'X',        href: 'https://x.com/ramazanutus' },
    ],
    footer: '© 2026 Ramazan Utuş',
  },
}
