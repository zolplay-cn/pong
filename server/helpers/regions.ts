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
export const regions: Record<string, { name: string; location: string }> = {
  arn1: {
    name: "eu-north-1",
    location: "Stockholm, Sweden",
  },
  bom1: {
    name: "ap-south-1",
    location: "Mumbai, India",
  },
  cdg1: {
    name: "eu-west-3",
    location: "Paris, France",
  },
  cle1: {
    name: "us-east-2",
    location: "Cleveland, USA",
  },
  cpt1: {
    name: "af-south-1",
    location: "Cape Town, South Africa",
  },
  dub1: {
    name: "eu-west-1",
    location: "Dublin, Ireland",
  },
  fra1: {
    name: "eu-central-1",
    location: "Frankfurt, Germany",
  },
  gru1: {
    name: "sa-east-1",
    location: "São Paulo, Brazil",
  },
  hkg1: {
    name: "ap-east-1",
    location: "Hong Kong",
  },
  hnd1: {
    name: "ap-northeast-1",
    location: "Tokyo, Japan",
  },
  iad1: {
    name: "us-east-1",
    location: "Washington, D.C., USA",
  },
  icn1: {
    name: "ap-northeast-2",
    location: "Seoul, South Korea",
  },
  kix1: {
    name: "ap-northeast-3",
    location: "Osaka, Japan",
  },
  lhr1: {
    name: "eu-west-2",
    location: "London, United Kingdom",
  },
  pdx1: {
    name: "us-west-2",
    location: "Portland, USA",
  },
  sfo1: {
    name: "us-west-1",
    location: "San Francisco, USA",
  },
  sin1: {
    name: "ap-southeast-1",
    location: "Singapore",
  },
  syd1: {
    name: "ap-southeast-2",
    location: "Sydney, Australia",
  },
};
