<header><a href="/">⌂</a> Outils derby</header>

<main><slot></slot></main>

<style>
	header {
		background-color: #0bae8c;
		padding: 16px;
		color: white;
		font-size: 1.5rem;
		margin-bottom: 32px;
		display: flex;
		align-items: center;
		gap: 16px;
	}

	header a {
		text-decoration: none;
		color: inherit;
	}
	header a:hover,
	header a:focus-visible {
		color: #dc0843;
		text-decoration: underline;
	}

	main {
		margin-inline: auto;
		max-width: 1000px;
		padding-inline: 16px;
	}
</style>
