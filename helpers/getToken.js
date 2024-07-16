export const fetchToken = async () => {
  const response = await fetch("/api/get-token");
  const data = await response.json();
  return data.token;
};
