<script setup>
import TheFooter from "@/components/TheFooter.vue";
import TheHeader from "@/components/TheHeader.vue";
</script>

<template>
  <header>
    <TheHeader>
      <template #title>CONTACT ME</template>
      <template #subtitle>SAY HELLO TO ME</template>
    </TheHeader>
  </header>

  <main class="contact-container">
    <div class="contact-left">
      <a href="mailto:nour.chidiac@hotmail.com" class="contact-card">
        <div class="icon-wrapper email">
          <span><img src="../assets/menu/contact-black.svg" alt="" /></span>
        </div>
        <div class="card-content">
          <h3>Email me</h3>
          <p class="description">Stuur me een mailtje, ik antwoord snel!</p>
          <p class="value">nour.chidiac@hotmail.com</p>
        </div>
      </a>

      <a href="tel:+32472501231" class="contact-card">
        <div class="icon-wrapper call">
          <span><img src="../assets/menu/call.svg" alt="" /></span>
        </div>
        <div class="card-content">
          <h3>Call me</h3>
          <p class="description">Bel me gerust, dat praat makkelijker.</p>
          <p class="value">0472 / 50.12.31</p>
        </div>
      </a>

      <a
        href="https://www.linkedin.com/in/nour-chidiac-41632a387/"
        target="_blank"
        class="contact-card"
      >
        <div class="icon-wrapper linkedin">
          <span><img src="../assets/menu/linkedin-black.svg" alt="" /></span>
        </div>
        <div class="card-content">
          <h3>Chat with me</h3>
          <p class="description">Connect met me op LinkedIn</p>
          <p class="value">Nour Chidiac</p>
        </div>
      </a>
    </div>

    <div class="contact-right">
      <h2>Let’s team up!</h2>

      <p class="intro">
        Heb je een vraag, een interessant idee of een potentiële samenwerking? Ik sta altijd open
        voor nieuwe connecties en projecten.
      </p>

      <div class="status">
        <span class="dot"></span>
        <p><strong>Beschikbaar voor stage</strong></p>
      </div>

      <div class="response-time">
        <p>✅ Ik antwoord meestal binnen 24 uur.</p>
      </div>

      <p class="cta">
        Stuur me gerust een bericht via e-mail of LinkedIn — ik kijk ernaar uit om van je te horen!
      </p>
    </div>
  </main>

  <footer>
    <TheFooter />
  </footer>
</template>

<style scoped>
.contact-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 5rem 2rem;
  gap: 5rem;
  max-width: 1200px;
  margin: 0 auto;
  color: var(--secondary-color);
}

.contact-left {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  min-width: 420px;
}

.contact-card {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding: 1.25rem 1.5rem;
  background-color: var(--primary-color);
  border: 1px solid #e0e0e0;
  border-radius: 20px 0 20px 0;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  font-family: var(--body-font);
}

.contact-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--hover-shadow);
}

.icon-wrapper {
  width: 52px;
  height: 52px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-content h3 {
  font-family: var(--subtitle-font);
  font-size: 1.35rem;
  margin-bottom: 0.35rem;
  color: var(--secondary-color);
}

.description {
  font-size: 0.95rem;
  color: #555;
  margin-bottom: 0.35rem;
  line-height: 1.4;
}

.value {
  font-weight: 600;
  color: var(--accent-color);
  font-size: 1rem;
}

.contact-right {
  background-color: var(--accent-color);
  color: white;
  padding: 3rem 3.25rem;
  border-radius: 40px 0 40px 0;
  max-width: 420px;
  box-shadow: 0 10px 30px rgba(78, 118, 93, 0.3);
}

.contact-right h2 {
  font-family: var(--subtitle-font);
  font-size: 2.4rem;
  margin-bottom: 1.5rem;
  line-height: 1.1;
}

.intro {
  font-family: var(--body-font);
  line-height: 1.7;
  margin-bottom: 2rem;
  font-size: 1.05rem;
}

.status {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.75rem;
  font-size: 1.1rem;
}

.dot {
  width: 12px;
  height: 12px;
  background: #4ade80;
  border-radius: 50%;
  box-shadow: 0 0 0 3px rgba(74, 222, 128, 0.3);
  flex-shrink: 0;
}

.response-time {
  background: rgba(255, 255, 255, 0.15);
  padding: 0.75rem 1rem;
  border-radius: 12px;
  margin-bottom: 1.5rem;
  font-size: 1rem;
}

.cta {
  font-style: italic;
  opacity: 0.95;
  line-height: 1.6;
}

@media (max-width: 992px) {
  .contact-container {
    flex-direction: column;
    gap: 3rem;
    padding: 3rem 1.5rem;
  }

  .contact-left {
    min-width: unset;
  }
}
</style>
