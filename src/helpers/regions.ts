/**
 * https://vercel.com/docs/concepts/edge-network/regions#region-list
 *
* JSON.stringify(Array.from(document.querySelectorAll('tbody[role="rowgroup"]')[0].childNodes).reduce((result, current)=>{
      const nodes = current.childNodes;
      return {
          ...result,
          [nodes[0].innerText]:{
              "name": nodes[1].innerHTML,
              "region": nodes[2].innerHTML
          }
      }
  },{}))
 */
export const regions: Record<
  string,
  { name: string; region: string; emoji: string; coordinates: [number, number] }
> = {
  arn1: {
    name: 'eu-north-1',
    region: 'Stockholm, Sweden',
    emoji: '🇸🇪',
    coordinates: [59.3297, 18.0686],
  },
  bom1: {
    name: 'ap-south-1',
    region: 'Mumbai, India',
    emoji: '🇮🇳',
    coordinates: [19.076, 72.8777],
  },
  cdg1: {
    name: 'eu-west-3',
    region: 'Paris, France',
    emoji: '🇫🇷',
    coordinates: [48.8566, 2.3522],
  },
  cle1: {
    name: 'us-east-2',
    region: 'Cleveland, USA',
    emoji: '🇺🇸',
    coordinates: [41.4993, -81.6944],
  },
  cpt1: {
    name: 'af-south-1',
    region: 'Cape Town, South Africa',
    emoji: '🇿🇦',
    coordinates: [-33.9249, 18.4241],
  },
  dub1: {
    name: 'eu-west-1',
    region: 'Dublin, Ireland',
    emoji: '🇮🇪',
    coordinates: [53.3498, -6.2603],
  },
  fra1: {
    name: 'eu-central-1',
    region: 'Frankfurt, Germany',
    emoji: '🇩🇪',
    coordinates: [50.1109, 8.6821],
  },
  gru1: {
    name: 'sa-east-1',
    region: 'São Paulo, Brazil',
    emoji: '🇧🇷',
    coordinates: [-23.5505, -46.6333],
  },
  hkg1: {
    name: 'ap-east-1',
    region: 'Hong Kong',
    emoji: '🇭🇰',
    coordinates: [22.3964, 114.1095],
  },
  hnd1: {
    name: 'ap-northeast-1',
    region: 'Tokyo, Japan',
    emoji: '🇯🇵',
    coordinates: [35.6895, 139.6917],
  },
  iad1: {
    name: 'us-east-1',
    region: 'Washington, D.C., USA',
    emoji: '🇺🇸',
    coordinates: [38.9072, -77.0369],
  },
  icn1: {
    name: 'ap-northeast-2',
    region: 'Seoul, South Korea',
    emoji: '🇰🇷',
    coordinates: [37.5665, 126.978],
  },
  kix1: {
    name: 'ap-northeast-3',
    region: 'Osaka, Japan',
    emoji: '🇯🇵',
    coordinates: [34.6937, 135.5022],
  },
  lhr1: {
    name: 'eu-west-2',
    region: 'London, United Kingdom',
    emoji: '🇬🇧',
    coordinates: [51.5074, -0.1276],
  },
  pdx1: {
    name: 'us-west-2',
    region: 'Portland, USA',
    emoji: '🇺🇸',
    coordinates: [45.5122, -122.6765],
  },
  sfo1: {
    name: 'us-west-1',
    region: 'San Francisco, USA',
    emoji: '🇺🇸',
    coordinates: [37.7749, -122.4194],
  },
  sin1: {
    name: 'ap-southeast-1',
    region: 'Singapore',
    emoji: '🇸🇬',
    coordinates: [1.3521, 103.8198],
  },
  syd1: {
    name: 'ap-southeast-2',
    region: 'Sydney, Australia',
    emoji: '🇦🇺',
    coordinates: [-33.8688, 151.2093],
  },
}
