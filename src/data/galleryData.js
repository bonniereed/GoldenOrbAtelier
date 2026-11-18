// ─────────────────────────────────────────────────────────────
//  Gallery data — drop your image files into public/assets/gallery/
//  and update the `src` paths below.
// ─────────────────────────────────────────────────────────────

const base = import.meta.env.BASE_URL;

export const Artists = ["All", "Laura Weaver"];

// The order the style sections appear in on the Gallery page.
// A style used below but not listed here still shows up, after these.
export const STYLES = ["Illustrative Blackwork", "Color", "Glitter", "Patchwork", "Watercolor"];

const gallery = [
  { id: 11, Artists: "Laura Weaver", style: "Glitter", title: "Calcifer", src: `${base}assets/gallery/goa-11.jpg` },
  { id: 12, Artists: "Laura Weaver", style: "Glitter", title: "Mew", src: `${base}assets/gallery/goa-12.jpg` },
  { id: 13, Artists: "Laura Weaver", style: "Glitter", title: "Original Spooky Bear", src: `${base}assets/gallery/goa-13.jpg` },
  { id: 14, Artists: "Laura Weaver", style: "Glitter", title: "Kuromi", src: `${base}assets/gallery/goa-14.jpg` },
    { id: 20, Artists: "Laura Weaver", style: "Glitter", title: "Courage The Cowardly Dog", src: `${base}assets/gallery/goa-20.jpg` },
  { id: 15, Artists: "Laura Weaver", style: "Color", title: "Phasmaphobia and REPO Mashup", src: `${base}assets/gallery/goa-15.jpg` },
  { id: 16, Artists: "Laura Weaver", style: "Color", title: "Phasmaphobia and REPO Mashup", src: `${base}assets/gallery/goa-16.jpg` },
  { id: 17, Artists: "Laura Weaver", style: "Color", title: "Nightmare Before Christmas", src: `${base}assets/gallery/goa-17.jpg` },
  { id: 18, Artists: "Laura Weaver", style: "Color", title: "Nightmare Before Christmas", src: `${base}assets/gallery/goa-18.jpg` },
  { id: 22, Artists: "Laura Weaver", style: "Color", title: "Animal Crossing Tamagotchi Mashup", src: `${base}assets/gallery/goa-22.jpg` },
  { id: 23, Artists: "Laura Weaver", style: "Patchwork", title: "Frida Khalo", src: `${base}assets/gallery/goa-23.jpg` },
  { id: 24, Artists: "Laura Weaver", style: "Patchwork", title: "Link", src: `${base}assets/gallery/goa-24.jpg` },
  { id: 25, Artists: "Laura Weaver", style: "Watercolor", title: "Sun", src: `${base}assets/gallery/goa-25.jpg` },
  { id: 26, Artists: "Laura Weaver", style: "Watercolor", title: "Shark", src: `${base}assets/gallery/goa-26.jpg` },
  { id: 21, Artists: "Laura Weaver", style: "Illustrative Blackwork", title: "Spider", src: `${base}assets/gallery/goa-21.jpg` },
  { id: 19, Artists: "Laura Weaver", style: "Illustrative Blackwork", title: "Winged Woman", src: `${base}assets/gallery/goa-19.jpg` },
  { id: 10, Artists: "Laura Weaver", style: "Illustrative Blackwork", title: "Foliage", src: `${base}assets/gallery/goa-10.jpg` },
  { id: 2, Artists: "Laura Weaver", style: "Illustrative Blackwork", title: "Wild Skulls stacked", src: `${base}assets/gallery/goa-1.jpg` },
  { id: 3, Artists: "Laura Weaver", style: "Illustrative Blackwork", title: "The Witch", src: `${base}assets/gallery/goa-2.jpg` },
  { id: 4, Artists: "Laura Weaver", style: "Illustrative Blackwork", title: "Death Encapsulated", src: `${base}assets/gallery/goa-4.jpg` },
  { id: 5, Artists: "Laura Weaver", style: "Illustrative Blackwork", title: "Moon Woman", src: `${base}assets/gallery/goa-5.jpg` },
  { id: 6, Artists: "Laura Weaver", style: "Illustrative Blackwork", title: "Wechuge", src: `${base}assets/gallery/goa-6.jpg` },
  { id: 7, Artists: "Laura Weaver", style: "Illustrative Blackwork", title: "Trapped Soul & Forever Guardian", src: `${base}assets/gallery/goa-7.jpg` },
  { id: 8, Artists: "Laura Weaver", style: "Illustrative Blackwork", title: "Withered Snap Dragons", src: `${base}assets/gallery/goa-8.jpg` },
  { id: 9, Artists: "Laura Weaver", style: "Illustrative Blackwork", title: "Beast of Dreams and Flame", src: `${base}assets/gallery/goa-9.jpg` },
];

export default gallery;
