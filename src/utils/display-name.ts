/**
 * Derive a display name from a component slug.
 * radio-group → Radio group
 * s3-resource-selector → S3 resource selector
 * key-value-pairs → Key-value pairs
 */
export function displayName(slug: string): string {
  return slug
    .replace(/\b\w/, c => c.toUpperCase())
    .replace(/-/g, ' ')
    .replace('key value', 'key-value')
    .replace('s3', 'S3');
}
