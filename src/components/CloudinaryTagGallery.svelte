<script lang="ts">
    import { onMount } from 'svelte';

    export let cloudName: string;
    export let tag: string;

    interface Resource {
        public_id: string,
        version: number,
        format: string,
        width: number,
        height: number,
        created_at: string,
        type: string
    }
    interface Photos {
        resources: Array<Resource>,
        updated_at: string
    }
    let photos: Photos | undefined = undefined;

    onMount(async () => {
        const res = await fetch(`https://res.cloudinary.com/${cloudName}/image/list/${tag}.json`)
        photos = await res.json()
    })
</script>

<!-- <img src="https://res.cloudinary.com/decepulis/image/upload/c_limit,h_150/e_blur:2000/q_auto/f_auto/v1/2021-05-08%20Wedding/429_of_429_ewzinz" alt="placeholder"/>
<img src="https://res.cloudinary.com/decepulis/image/upload/c_limit,h_150/q_auto/f_auto/v1/2021-05-08%20Wedding/429_of_429_ewzinz" alt="placeholder"/> -->

{#if typeof photos !== 'undefined'}
    <ul>
        {#each photos.resources as {public_id}}
            <li>{public_id}</li>
        {/each}
    </ul>
{:else}
    <p>
        ...loading
    </p>
{/if}