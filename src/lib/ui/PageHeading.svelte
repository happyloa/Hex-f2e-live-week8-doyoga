<script lang="ts">
  let { title, class: classes = '' }: { title: string; class?: string } = $props();
</script>

<h1 class="page-heading {classes}">{title}</h1>
