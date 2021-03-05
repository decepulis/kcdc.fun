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
  <title>kcdc | RSVP</title>
</svelte:head>

<p>
  <img
    src="img/figures/rsvp.png"
    alt="A cute couple; he puts letters into a mailbox; she chases their dog running away with one"
    class="p-img p-img-150"
  />
</p>
<h2>COVID Guidelines</h2>
<p>
  As of the beginning of March, despite being on the decline, COVID-19 cases are
  still at similar levels to last summer's peak. We are aware that the pandemic
  is far from over, and we intend to take every precaution necessary to ensure
  the safety of you, our guests.
</p>
<p>
  To that end, we would like to share the safeguards we have established for our
  event in accordance with guidelines from the CDC and the State of Illinois.
  Please take the time to carefully review them before making an informed
  decision about your RSVP. We understand this is a challenging time and are
  happy to answer any questions you might have.
</p>
<ul>
  <li>
    <i>Vaccinations</i> &mdash; We encourage everyone who has any COVID-19 vaccine
    available to them to be vaccinated. Please remember that vaccines take about
    two weeks to build full immunity.
  </li>
  <li>
    <i>Testing</i> &mdash; We ask that all who don't yet have access to the vaccine
    to take a COVID-19 test in the days leading up to the wedding, and to minimize
    contact between the test and the event.
  </li>
  <li>
    <i>Masks</i> &mdash; We request that you keep your mask on for the duration of
    the event, unless eating or drinking. When not wearing your mask, please stay
    with members of your own household.
  </li>
  <li>
    <i>Ventilation</i> &mdash; COVID-19 is primarily transmitted via prolonged airborne
    contact. With that in mind, please maintain at least 6 feet of distance between
    yourself and guests outside your household, even if you're wearing a mask. If
    the weather allows we'll be holding our event outdoors as much as possible. Early-May
    evenings can get chilly &mdash; with temperatures typically around 50&deg;F &mdash;
    so please come prepared! That being said, our venue is well-ventilated and will
    be able to accommodate our guests indoors if necessary.
  </li>
</ul>
<h2>RSVP</h2>
<Form method="POST" netlify name="rsvp" onSubmit={handleOnSubmit}>
  <input type="hidden" name="form-name" value="rsvp" />

  <label for="rsvp-name">Your codebird</label>
  <input type="text" id="rsvp-name" name="name" bind:value={codeBird} />

  <div
    class="span-2 is-attending"
    class:d-none={typeof codeBirdEntry === "undefined"}
  >
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

  <label
    for="rsvp-guest-count"
    class:d-none={!isAttending || maxGuestCount <= 1}
  >
    How many guests are coming?
  </label>
  <select
    id="rsvp-guest-count"
    name="guest-count"
    bind:value={guestCount}
    class:d-none={!isAttending || maxGuestCount <= 1}
  >
    {#if maxGuestCount > 1}
      <option disabled selected value="">-</option>
      {#each [...Array(codeBirdEntry.maxGuests).keys()] as number}
        <option value={number + 1}>{number + 1}</option>
      {/each}
    {:else}
      <option selected value="1">1</option>
    {/if}
  </select>

  <Button type="submit" class={`span-2 ${!isFormValid ? "d-none" : ""}`}>
    RSVP
  </Button>
</Form>

<style>
  :global(html) {
    --ssr-color: var(--c2);
    background-color: rgb(var(--ssr-color));
  }

  .is-attending {
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;
  }
</style>
