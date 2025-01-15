export default function convertSlugToName(slug: string): string {
    // Replace hyphens with spaces
    const name = slug.replace(/-/g, ' ');

    // Capitalize the first letter of each word
    return name
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}