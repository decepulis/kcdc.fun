<script lang="ts">
  import Form from "../components/Form.svelte";
  import Button from "../components/Button.svelte";

  import { rsvpList } from "../utilities/rsvp";

  let codeBird = "";
  $: codeBirdEntry = rsvpList[codeBird.toLowerCase()];
  $: maxGuestCount = codeBirdEntry?.maxGuests;

  let isAttendingGroup: string;
  let isAttendingTrue = "is-attending-true";
  let isAttendingFalse = "is-attending-false";
  $: isAttending = isAttendingGroup === isAttendingTrue;
  $: isNotAttending = isAttendingGroup === isAttendingFalse;

  let guestCount = "";
  $: {
    if (maxGuestCount === 1) {
      // in this case we don't even show the user the guestCount box
      guestCount = "1";
    }
  }

  $: isFormValid = isNotAttending || (isAttending && guestCount !== "");
  const handleOnSubmit = (e: Event) => {
    if (!isFormValid) {
      e.preventDefault();
    }
  };
</script>

<svelte:head>
  <title>Kristin & Darius | RSVP</title>
</svelte:head>

<h1>RSVP</h1>
<p>
  <img
    src="img/figures/rsvp.png"
    alt="A cute couple; he puts letters into a mailbox; she chases their dog running away with one"
    class="p-img p-img-200"
  />
</p>
<Form
  id="rsvp"
  name="rsvp"
  method="POST"
  data-netlify="true"
  on:submit={handleOnSubmit}
>
  <input type="hidden" id="formname" name="formname" value="rsvp" />

  <label for="rsvp-name">Your codebird</label>
  <input type="text" id="rsvp-name" name="name" bind:value={codeBird} />

  {#if typeof codeBirdEntry !== "undefined"}
    <div class="span-2 is-attending">
      <div>
        <input
          type="radio"
          id={isAttendingTrue}
          name="is-attending"
          value={isAttendingTrue}
          bind:group={isAttendingGroup}
        />
        <label for={isAttendingTrue}>Attending!</label>
      </div>
      <div>
        <input
          type="radio"
          id={isAttendingFalse}
          name="is-attending"
          value={isAttendingFalse}
          bind:group={isAttendingGroup}
        />
        <label for={isAttendingFalse}>Not Attending!</label>
      </div>
    </div>
  {/if}

  {#if isAttending && maxGuestCount > 1}
    <label for="rsvp-guest-count">How many guests are coming?</label>
    <select id="rsvp-guest-count" name="guest-count" bind:value={guestCount}>
      <option disabled selected value="">-</option>
      {#each [...Array(codeBirdEntry.maxGuests).keys()] as number}
        <option value={number + 1}>{number + 1}</option>
      {/each}
    </select>
  {/if}

  {#if isFormValid}
    <Button type="submit" class="span-2">RSVP</Button>
  {/if}
</Form>

<style>
  :global(html) {
    --ssr-color: var(--c2);
    background-color: rgb(var(--ssr-color));
  }

  h1,
  p {
    text-align: center;
  }

  .is-attending {
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;
  }
</style>
