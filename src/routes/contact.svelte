<style>
  textarea {
    width: 100%;
    min-height: 5em;
  }
</style>

<svelte:head>
  <title>Kristin & Darius | Contact</title>
</svelte:head>
<h1>Get In Touch</h1>
<form name="contact" method="POST" data-netlify="true">
  <input type="hidden" name="form-name" value="contact" />
  <p><label>Your Name: <input type="text" name="name" /></label></p>
  <p><label>Your Email: <input type="email" name="email" /></label></p>
  <p><label>Message: <textarea name="message" /></label></p>
  <p><button type="submit">Send</button></p>
</form>
