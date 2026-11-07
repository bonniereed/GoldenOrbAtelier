// ─────────────────────────────────────────────────────────────
//  Gallery data — drop your image files into public/assets/gallery/
//  and update the `src` paths below.
// ─────────────────────────────────────────────────────────────

const base = import.meta.env.BASE_URL;

export const Artists = ["All", "Laura Weaver"];

export const STYLES = ["All", "Fine Line", "Neo-Traditional", "Blackwork", "Illustrative", "Geometric", "MISC"];

const gallery = [
  { id: 1, Artists: "Laura Weaver", style: "Illustrative Blackwork", title: "Wild Skulls stacked", src: `${base}assets/gallery/goa-1.jpg` },
  { id: 2, Artists: "Laura Weaver", style: "Illustrative Blackwork", title: "The Witch", src: `${base}assets/gallery/goa-2.jpg` },
  { id: 3, Artists: "Laura Weaver", style: "Illustrative Blackwork", title: "The Witch", src: `${base}assets/gallery/goa-3.jpg` },
  { id: 4, Artists: "Laura Weaver", style: "Illustrative Blackwork", title: "Death Encapsulated", src: `${base}assets/gallery/goa-4.jpg` },
  { id: 5, Artists: "Laura Weaver", style: "Illustrative Blackwork", title: "Moon Woman", src: `${base}assets/gallery/goa-5.jpg` },
  { id: 6, Artists: "Laura Weaver", style: "Illustrative Blackwork", title: "Wechuge", src: `${base}assets/gallery/goa-6.jpg` },
  { id: 7, Artists: "Laura Weaver", style: "Illustrative Blackwork", title: "Trapped Soul & Forever Guardian", src: `${base}assets/gallery/goa-7.jpg` },
  { id: 8, Artists: "Laura Weaver", style: "Illustrative Blackwork", title: "Withered Snap Dragons", src: `${base}assets/gallery/goa-8.jpg` },
  { id: 9, Artists: "Laura Weaver", style: "Illustrative Blackwork", title: "Beast of Dreams and Flame", src: `${base}assets/gallery/goa-9.jpg` },
];

export default gallery;
