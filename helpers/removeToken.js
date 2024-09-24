export const removeToken = async () => {
  const response = await fetch("/api-frontend/remove-cookie");
  const data = await response.json();
  return data.message;
};
