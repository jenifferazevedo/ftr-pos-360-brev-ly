import axios from "axios";
import type { Link, LinkSummary } from "../models/link.interface";
import { isShortLinkValid } from "../utils/is-short-link-valid";

export async function createLink(link: LinkSummary) {
  if(!isShortLinkValid(link.shortLink)) {
    return;
  }

  const response =  await axios.post<void>(
      `${import.meta.env.VITE_BACKEND_URL}links`,
      link,
  );

  return response.data;
}

export async function getAllLinks() {
  const response = await axios.get<{ links: Link[], total: number }>(
      `${import.meta.env.VITE_BACKEND_URL}links`
  );

  return response.data;
}

export async function accessLink(shortLink: string) {
  const response = await axios.patch<Link>(
      `${import.meta.env.VITE_BACKEND_URL}links/${shortLink}`
  );

  return response.data;
}

export async function deleteLink(shortLink: string) {
  const response = await axios.delete<void>(
      `${import.meta.env.VITE_BACKEND_URL}links/${shortLink}`
  );

  return response.data;
}