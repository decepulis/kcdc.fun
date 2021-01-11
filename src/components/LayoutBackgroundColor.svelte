<script lang="ts">
    export let segment: string;
    export let transitionDuration: number;

    const backgroundsForSegment = {
        venue: "var(--c2)",
        hotels: "var(--c3)",
        registry: "var(--c4)",
    };

    $: backgroundColorValue = backgroundsForSegment[segment] ?? "var(--c1)";
    $: transitionDurationValue = `${transitionDuration}ms`;

    $: if (typeof window !== "undefined") {
        window.document.documentElement.style.setProperty(
            "--background-color",
            backgroundColorValue
        );
        window.document.documentElement.style.setProperty(
            "--transition-duration",
            transitionDurationValue
        );
    }
</script>

<style>
    :global(:root) {
        --background-color: var(--c1);
        --transition-duration: 0;
    }
    :global(body) {
        background-color: rgb(var(--background-color));
        transition: background-color var(--transition-duration) ease-in-out;
    }
</style>
