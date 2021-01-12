<script lang="ts">
    export let segment: string;
    export let pageTransitionDuration: number;

    const backgroundsForSegment = {
        // these values correspond to the html background colors
        // defined in each file
        venue: "var(--c2)",
        hotels: "var(--c3)",
        registry: "var(--c4)",
    };

    $: backgroundColorValue = backgroundsForSegment[segment] ?? "var(--c1)";
    $: pageTransitionDurationValue = `${pageTransitionDuration}ms`;

    $: if (typeof window !== "undefined") {
        window.document.documentElement.style.setProperty(
            "--background-color",
            backgroundColorValue
        );
        window.document.documentElement.style.setProperty(
            "--page-transition-duration",
            pageTransitionDurationValue
        );
    }
</script>

<style>
    :global(body) {
        background-color: rgb(var(--background-color));
        transition: background-color var(--page-transition-duration) ease-in-out;
    }
</style>
