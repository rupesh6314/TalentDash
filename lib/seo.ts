export function generateOrganizationJsonLd(company: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: company.name,
    url: `https://talentdash.com/companies/${company.slug}`,
  };
}

export function generateDatasetJsonLd(name: string, description: string, count: number) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name,
    description,
    numberOfItems: count,
  };
}