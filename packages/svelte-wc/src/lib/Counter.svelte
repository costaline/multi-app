<svelte:options tag="my-counter" />

<script lang="ts">
	let count: number = 0
  const increment = () => {
    count += 1
  }
</script>

<style>
	button {
		margin: 1.25em;
		text-decoration: underline;
	}
</style>

<button on:click={increment}>
  count is {count}
</button>
