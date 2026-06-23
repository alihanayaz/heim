const HOSTNAME_LABEL_PATTERN = /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/i;

function isValidHostname(hostname: string): boolean {
  const hostnameLabels = hostname.split(".");
  return (
    hostnameLabels.length >= 2 &&
    hostnameLabels.every((label) => HOSTNAME_LABEL_PATTERN.test(label))
  );
}

export function normalizeUrl(rawUrl: string): string {
  const trimmedUrl = rawUrl.trim();
  if (!trimmedUrl) return "";
  const candidateUrl = /^[a-z][a-z0-9+-]*:/i.test(trimmedUrl)
    ? trimmedUrl
    : `https://${trimmedUrl}`;
  try {
    const parsedUrl = new URL(candidateUrl);
    if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:")
      return "";
    if (!isValidHostname(parsedUrl.hostname)) return "";
    return parsedUrl.href;
  } catch {
    return "";
  }
}

export function getHostname(urlString: string): string {
  try {
    return new URL(urlString).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

export function getFaviconUrl(urlString: string): string {
  return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(
    getHostname(urlString),
  )}&sz=64`;
}
