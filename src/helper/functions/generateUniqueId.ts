export const generateUniqueId = (prefix: string) => {
  const now = `${Date.now()}${Math.random().toString().replace(".", "")}`;

  // split into xxxx-xxxxxx-xxxx format
  const unique_id = [now.slice(0, 4), now.slice(4, 10), now.slice(10, 14)].join(
    "-"
  );
  return prefix ? `${prefix}-${unique_id}` : unique_id;
};
