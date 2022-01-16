<script>
	export let name;
	export let url;

	import Footer from './components/Footer.svelte'
	import Header from './components/Header.svelte'
</script>

<style></style>



<main>
	<Header bind:url/>

	<div class="container-fluid">
		<h1>{name}!</h1>
		<p></p>
	</div>

	<Footer/>
</main>





