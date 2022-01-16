<script>
    export let url;

    import House from "svelte-bootstrap-icons/lib/House";
</script>

<style>

</style>

<header>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid d-flex justify-content-between">
            <a href="index.html" class="navbar-brand d-flex align-items-center">
                <House /> {url}
            </a>
        </div>
    </nav>
</header>
