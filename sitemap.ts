import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://samadeyemi.dev";
  return [
    { url: base, lastModified: new Date(), priority: 1 },
    { url: `${base}/#about`, lastModified: new Date() },
    { url: `${base}/#services`, lastModified: new Date() },
    { url: `${base}/#experience`, lastModified: new Date() },
    { url: `${base}/#metrics`, lastModified: new Date() },
    { url: `${base}/#projects`, lastModified: new Date() },
    { url: `${base}/#publications`, lastModified: new Date() },
    { url: `${base}/#testimonials`, lastModified: new Date() },
    { url: `${base}/#contact`, lastModified: new Date() },
    { url: `${base}/projects/phhm`, lastModified: new Date(), priority: 0.9 },
    { url: `${base}/projects/tdct`, lastModified: new Date(), priority: 0.8 },
    { url: `${base}/projects/trialforge`, lastModified: new Date(), priority: 0.8 },
    { url: `${base}/projects/cv-builder`, lastModified: new Date(), priority: 0.8 },
	{ url: `${base}/projects/alphawings`, lastModified: new Date(), priority: 0.8 },
  ];
}
