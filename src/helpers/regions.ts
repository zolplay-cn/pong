/**
 * https://vercel.com/docs/concepts/edge-network/regions#region-list
 *
* JSON.stringify(Array.from(document.querySelectorAll('tbody[role="rowgroup"]')[0].childNodes).reduce((result, current)=>{
      const nodes = current.childNodes;
      return {
          ...result,
          [nodes[0].innerText]:{
              "name": nodes[1].innerHTML,
              "location": nodes[2].innerHTML
          }
      }
  },{}))
 */
export const regions: Record<
  string,
  { name: string; location: string; emoji: string }
> = {
  arn1: {
    name: "eu-north-1",
    location: "Stockholm, Sweden",
    emoji: "🇸🇪",
  },
  bom1: {
    name: "ap-south-1",
    location: "Mumbai, India",
    emoji: "🇮🇳",
  },
  cdg1: {
    name: "eu-west-3",
    location: "Paris, France",
    emoji: "🇫🇷",
  },
  cle1: {
    name: "us-east-2",
    location: "Cleveland, USA",
    emoji: "🇺🇸",
  },
  cpt1: {
    name: "af-south-1",
    location: "Cape Town, South Africa",
    emoji: "🇿🇦",
  },
  dub1: {
    name: "eu-west-1",
    location: "Dublin, Ireland",
    emoji: "🇮🇪",
  },
  fra1: {
    name: "eu-central-1",
    location: "Frankfurt, Germany",
    emoji: "🇩🇪",
  },
  gru1: {
    name: "sa-east-1",
    location: "São Paulo, Brazil",
    emoji: "🇧🇷",
  },
  hkg1: {
    name: "ap-east-1",
    location: "Hong Kong",
    emoji: "🇭🇰",
  },
  hnd1: {
    name: "ap-northeast-1",
    location: "Tokyo, Japan",
    emoji: "🇯🇵",
  },
  iad1: {
    name: "us-east-1",
    location: "Washington, D.C., USA",
    emoji: "🇺🇸",
  },
  icn1: {
    name: "ap-northeast-2",
    location: "Seoul, South Korea",
    emoji: "🇰🇷",
  },
  kix1: {
    name: "ap-northeast-3",
    location: "Osaka, Japan",
    emoji: "🇯🇵",
  },
  lhr1: {
    name: "eu-west-2",
    location: "London, United Kingdom",
    emoji: "🇬🇧",
  },
  pdx1: {
    name: "us-west-2",
    location: "Portland, USA",
    emoji: "🇺🇸",
  },
  sfo1: {
    name: "us-west-1",
    location: "San Francisco, USA",
    emoji: "🇺🇸",
  },
  sin1: {
    name: "ap-southeast-1",
    location: "Singapore",
    emoji: "🇸🇬",
  },
  syd1: {
    name: "ap-southeast-2",
    location: "Sydney, Australia",
    emoji: "🇦🇺",
  },
};
