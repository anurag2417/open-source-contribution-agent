const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchProfileAnalysis = async (username: string) => {
  const response = await fetch(
    `${API_URL}/github/analysis/${username}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch profile analysis");
  }

  return response.json();
};