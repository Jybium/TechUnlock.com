export const fetchToken = async () => {
  const response = await fetch("/api-frontend/get-cookie");
  const data = await response.json();
  return data.token;
};
