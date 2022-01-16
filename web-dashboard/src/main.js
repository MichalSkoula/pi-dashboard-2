import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		name: 'lasena pi temperature dashboard',
		url: 'lasenapi.skoula.cz'
	}
});

export default app;
