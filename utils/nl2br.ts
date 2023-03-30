export const nl2br = (str: string) => (str ? '<p>' + str.replace(/([^>])\n/g, '$1</p><p>') + '</p>' : '');
