import { readSelection } from "#lib/reservation/booking.svelte.ts";
import type { PageLoad } from "./$types";

export const prerender = false;

export const load: PageLoad = ({ url }) => ({
  selection: readSelection(url.searchParams),
});
