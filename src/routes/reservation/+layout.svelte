<script lang="ts">
  import { Booking, setBooking } from '#lib/reservation/booking.svelte.ts';
  let { children } = $props();
  setBooking(new Booking());
</script>

{@render children()}
