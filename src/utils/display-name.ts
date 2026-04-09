/**
 * Derive a display name from a Cumulus component tag.
 * cs-radio-group → Radio group
 * cs-s3-resource-selector → S3 resource selector
 * cs-key-value-pairs → Key-value pairs
 */
export function displayName(tag: string): string {
  return tag
    .replace(/^cs-/, '')
    .replace(/\b\w/, c => c.toUpperCase())
    .replace(/-/g, ' ')
    .replace('key value', 'key-value')
    .replace('s3', 'S3');
}
