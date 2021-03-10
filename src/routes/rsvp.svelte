<script lang="ts">
  import confetti from "canvas-confetti";

  import Form from "../components/Form.svelte";
  import Button from "../components/Button.svelte";

  import { rsvpList } from "../utilities/rsvp";

  let codeBird = "";
  $: codeBirdEntry = rsvpList[codeBird.toLowerCase()];
  $: maxGuestCount = codeBirdEntry?.maxGuests;
  $: categories = codeBirdEntry?.categories;

  let isAttendingGroup: string;
  let isAttendingTrue = "is-attending-true";
  let isAttendingFalse = "is-attending-false";
  $: isAttending = isAttendingGroup === isAttendingTrue;
  $: isNotAttending = isAttendingGroup === isAttendingFalse;

  function onAttendingClick(event: MouseEvent) {
    const { clientX, clientY } = event;
    const { clientWidth, clientHeight } = document.documentElement;

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x: clientX / clientWidth, y: clientY / clientHeight },
      disableForReducedMotion: true,
    });
  }

  let guestCount = "";
  $: {
    if (maxGuestCount === 1) {
      // in this case we don't even show the user the guestCount box
      guestCount = "1";
    }
  }
  let podMembers = "";

  let formState = {
    showName: true,
    isNameComplete: false,
    showAttending: false,
    isAttendingComplete: false,
    showHooray: false,
    showFam: false,
    showFren: false,
    showAlso: false,
    showCount: false,
    isCountComplete: false,
    showPod: false,
    isPodComplete: false,
    showSubmit: false,
  };
  $: {
    // The form is completed in the following sequence
    // Fill out codebird
    const showName = true;
    const isNameComplete = typeof codeBirdEntry !== "undefined";
    // Choose attending or not attending
    const showAttending = isNameComplete;
    const isAttendingComplete = typeof isAttendingGroup !== "undefined";
    // Notify of additional events
    const showHooray = isAttendingComplete && isAttending;
    const showFam =
      categories?.includes("fam") && isAttendingComplete && isAttending;
    const showFren =
      categories?.includes("fren") && isAttendingComplete && isAttending;
    const showAlso = showFam && showFren;
    // Choose guest count
    const showCount =
      isNameComplete &&
      isAttendingComplete &&
      isAttending &&
      maxGuestCount !== 1;
    const isCountComplete = guestCount !== "";
    // Chose pod members
    const showPod =
      isNameComplete && isAttendingComplete && isAttending && isCountComplete;
    const isPodComplete = podMembers !== "";
    // Submit button
    const showSubmit =
      isNameComplete &&
      (isNotAttending ||
        (isAttendingComplete && isCountComplete && isPodComplete));

    formState = {
      showName,
      isNameComplete,
      showAttending,
      isAttendingComplete,
      showHooray,
      showFam,
      showFren,
      showAlso,
      showCount,
      isCountComplete,
      showPod,
      isPodComplete,
      showSubmit,
    };
  }

  const handleOnSubmit = (e: Event) => {
    if (!formState.showSubmit) {
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
  To that end, please take the time to carefully review the following
  information before making an informed decision about your RSVP. We understand
  this is a challenging time and are happy to answer any questions you might
  have.
</p>
<h3>Before the Event</h3>
<p>
  To those who have any COVID-19 vaccine available to them, we hope you will
  consider being vaccinated. Please remember that vaccines take about two weeks
  to build full immunity. Otherwise, we ask that you consider taking a COVID-19
  test in the days leading up to the wedding and to minimize contact between the
  test and the wedding.
</p>
<h3>At the Event</h3>
<p>
  COVID-19 is primarily transmitted via prolonged airborne contact. With that in
  mind, we request that you keep your mask on for the duration of the event,
  unless eating or drinking. When not wearing your mask, please stay with
  members of your own household.
</p>
<p>
  Finally, we will make an effort to hold as much of the event outdoors as
  possible. That being said, it's early-May so it's hard to predict what we'll
  get in terms of weather. (Past years have brought temperatures as low as
  30&deg; and as high as 90&deg;!) Rest assured that the venue is
  well-ventilated and will be able to accomodate you with ample room if
  necessary.
</p>
<h2>RSVP</h2>
<Form method="POST" netlify name="rsvp" onSubmit={handleOnSubmit}>
  <input type="hidden" name="form-name" value="rsvp" />

  <label for="rsvp-name">Your codebird</label>
  <input type="text" id="rsvp-name" name="name" bind:value={codeBird} />

  <div class="span-2 is-attending" class:d-none={!formState.showAttending}>
    <div>
      <input
        type="radio"
        id={isAttendingTrue}
        name="is-attending"
        value={isAttendingTrue}
        bind:group={isAttendingGroup}
        on:click={onAttendingClick}
      />
      <label for={isAttendingTrue} on:click={onAttendingClick}>Attending!</label
      >
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

  <p class:d-none={!formState.showHooray}>Hooray!</p>

  <p class:d-none={!formState.showFren}>
    By the way, we are hoping to hold some sort of bachelor/ette party on Friday
    night for us youths. Stay tuned for more info!
  </p>
  <p class:d-none={!formState.showAlso}>Also:</p>
  <p class:d-none={!formState.showFam}>
    We plan to hold a brunch for family on Sunday morning in lieu of a rehearsal
    dinner. We'll have more to say about that soon.
  </p>

  <label for="rsvp-guest-count" class:d-none={!formState.showCount}>
    How many guests are coming?
  </label>
  <select
    id="rsvp-guest-count"
    name="guest-count"
    bind:value={guestCount}
    class:d-none={!formState.showCount}
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

  <label for="rsvp-pod" class="span-2" class:d-none={!formState.showPod}>
    With whom would you be comfortable sitting for dinner?
  </label>
  <textarea
    id="rsvp-pod"
    name="pod"
    class="span-2"
    class:d-none={!formState.showPod}
    bind:value={podMembers}
  />

  <Button
    type="submit"
    class={`span-2 ${!formState.showSubmit ? "d-none" : ""}`}
  >
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
