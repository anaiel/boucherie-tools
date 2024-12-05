<script>
	import '../app.css';
</script>

<header class="bg-primary"><a href="/">⌂</a> Outils derby</header>

<main><slot></slot></main>

<style>
	header {
		padding-inline-start: 0.5rem;
		padding-block: 0;
		margin-bottom: 1rem;
		display: flex;
		align-items: center;
		gap: 1rem;
		color: white;
		font-size: 1rem;
		text-transform: uppercase;
		font-weight: 700;
		line-height: 0.75;
		letter-spacing: 8px;
	}

	header a {
		text-decoration: none;
		color: inherit;

		/* Optical alignment */
		position: relative;
		top: -2px;
	}
	header a:hover,
	header a:focus-visible {
		color: #dc0843;
		text-decoration: underline;
	}
</style>
