import axios from "axios";

const API = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:5000/api",
});

export const fetchRepositories = async (
  difficulty: string,
) => {
  const response = await API.get(
    `/github/repositories?difficulty=${difficulty}`,
  );

  return response.data;
};

export const fetchIssues = async (
  owner: string,
  repo: string,
  difficulty: string,
) => {
  const response = await API.get(
    `/github/issues/${owner}/${repo}?difficulty=${difficulty}`,
  );

  return response.data;
};

export const fetchAISummary = async (
  owner: string,
  repo: string,
  issueNumber: number,
) => {
  const response = await API.get(
    `/github/issue-summary/${owner}/${repo}/${issueNumber}`,
  );

  return response.data;
};

export const fetchRoadmap = async (
  owner: string,
  repo: string,
  issueNumber: number,
) => {
  const response = await API.get(
    `/github/roadmap/${owner}/${repo}/${issueNumber}`,
  );

  return response.data;
};

export const fetchRecommendations = async (
  username: string,
) => {
  const response = await API.get(
    `/github/recommendations/${username}`,
  );

  return response.data;
};

export const fetchRepositoryAnalysis = async (
  owner: string,
  repo: string,
) => {
  const response = await API.get(
    `/github/repository-analysis/${owner}/${repo}`,
  );

  return response.data;
};

export const fetchImplementationStrategy =
  async (
    owner: string,
    repo: string,
    issueNumber: number,
  ) => {
    const response = await API.get(
      `/github/implementation-strategy/${owner}/${repo}/${issueNumber}`,
    );

    return response.data;
  };