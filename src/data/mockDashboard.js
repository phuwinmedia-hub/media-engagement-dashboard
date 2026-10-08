export const initialDashboard = {
  metrics: [
    { id: 'reach', label: 'Total Reach', value: 842000, delta: '+18.2%', format: 'number' },
    { id: 'mentions', label: 'Media Mentions', value: 128, delta: '+12.4%', format: 'number' },
    { id: 'engagement', label: 'Engagement Rate', value: 7.8, delta: '+1.9%', format: 'percent' },
    { id: 'shareOfVoice', label: 'Share of Voice', value: 31.4, delta: '+4.6%', format: 'percent' }
  ],
  rows: [
    { id: 1, title: 'Vogue', platform: 'Digital', tier: 'Premium', date: '2026-09-01', reach: 124000, sentiment: 92, mentions: 18, link: 'https://example.com/vogue' },
    { id: 2, title: 'Elle', platform: 'Print', tier: 'Premium', date: '2026-09-04', reach: 98000, sentiment: 88, mentions: 14, link: 'https://example.com/elle' },
    { id: 3, title: 'Instagram', platform: 'Social', tier: 'Mid-Tier', date: '2026-09-05', reach: 180000, sentiment: 91, mentions: 22, link: 'https://example.com/instagram' },
    { id: 4, title: 'Forbes', platform: 'Digital', tier: 'Premium', date: '2026-09-08', reach: 145000, sentiment: 86, mentions: 11, link: 'https://example.com/forbes' },
    { id: 5, title: 'Harper’s Bazaar', platform: 'Print', tier: 'Mid-Tier', date: '2026-09-10', reach: 64000, sentiment: 89, mentions: 9, link: 'https://example.com/hb' },
    { id: 6, title: 'TikTok', platform: 'Social', tier: 'Emerging', date: '2026-09-13', reach: 230000, sentiment: 94, mentions: 27, link: 'https://example.com/tiktok' }
  ],
  widgets: [
    { id: 'kpis', label: 'KPI Overview', visible: true },
    { id: 'chart', label: 'Engagement Trend', visible: true },
    { id: 'table', label: 'Coverage Log', visible: true }
  ]
};

export const platformOptions = ['All', 'Digital', 'Social', 'Print', 'TV'];
export const tierOptions = ['All', 'Premium', 'Mid-Tier', 'Emerging'];
export const dateRangeOptions = ['30d', '60d', '90d', 'YTD'];

export const chartSeries = [
  { month: 'Jan', value: 52 },
  { month: 'Feb', value: 58 },
  { month: 'Mar', value: 61 },
  { month: 'Apr', value: 67 },
  { month: 'May', value: 74 },
  { month: 'Jun', value: 81 },
  { month: 'Jul', value: 76 },
  { month: 'Aug', value: 89 },
  { month: 'Sep', value: 94 }
];
