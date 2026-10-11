/** Formats an ISO date (YYYY-MM-DD) as e.g. "October 11, 2026". */
export const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
