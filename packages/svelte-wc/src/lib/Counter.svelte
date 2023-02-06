<svelte:options tag="my-counter" />

<script lang="ts">
	let count: number = 0
	const increment = () => {
		count += 1
	}
</script>

<button on:click={increment}>
	count is {count}
</button>

<style>
	button {
		margin: 1.25em;
		text-decoration: underline;
	}
</style>
