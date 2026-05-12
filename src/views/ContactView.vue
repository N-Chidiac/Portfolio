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

  <main class="contact-page">
    <div class="contact-wrapper">
      <div class="contact-container">
        <div class="contact-left">
          <div class="section-label">CONTACTEER MIJ VIA</div>

          <a href="mailto:nour.chidiac@hotmail.com" class="contact-card">
            <div class="icon-wrapper email">
              <span><img src="../assets/menu/contact-black.svg" alt="contact button" /></span>
            </div>
            <div class="card-content">
              <h3>Email me</h3>
              <p class="description">Stuur me een mailtje, ik antwoord snel!</p>
              <p class="value">nour.chidiac@hotmail.com</p>
            </div>
          </a>

          <a href="tel:+32472501231" class="contact-card">
            <div class="icon-wrapper call">
              <span><img src="../assets/menu/call.svg" alt="call button" /></span>
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
              <span><img src="../assets/menu/linkedin-black.svg" alt="linkedin button" /></span>
            </div>
            <div class="card-content">
              <h3>Chat with me</h3>
              <p class="description">Connect met me op LinkedIn</p>
              <p class="value">Nour Chidiac</p>
            </div>
          </a>
        </div>

        <div class="contact-right">
          <div class="right-inner">
            <h2>Let's team up!</h2>

            <p class="intro">
              Heb je een vraag, een interessant idee of een potentiële samenwerking? Ik sta altijd
              open voor nieuwe connecties en projecten.
            </p>

            <div class="divider"></div>

            <div class="status">
              <span class="dot"></span>
              <p><strong>Beschikbaar voor stage</strong></p>
            </div>

            <div class="response-time">
              <p>Ik antwoord meestal binnen 24 uur!</p>
            </div>

            <div class="divider"></div>

            <p class="cta">
              Stuur me gerust een bericht via e-mail of LinkedIn — ik kijk ernaar uit om van je te
              horen!
            </p>

            <div class="right-btn">
              <a href="mailto:nour.chidiac@hotmail.com" class="mail-btn">Email me</a>
            </div>
          </div>

          <div class="corner-accent"></div>
        </div>
      </div>
    </div>
  </main>

  <footer>
    <TheFooter />
  </footer>
</template>

<style scoped>
.contact-page {
  display: flex;
  flex-direction: column;
  color: var(--secondary-color);
  max-width: 100vw;
}

.contact-wrapper {
  position: relative;
  padding: 100px 110px 110px;
  overflow: hidden;
}

.contact-container {
  position: relative;
  z-index: 1;
  display: flex;
  gap: 5rem;
  align-items: flex-start;
  max-width: 1100px;
  margin: 0 auto;
}

.contact-left {
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
  flex: 1;
}

.section-label {
  font-family: var(--subtitle-font);
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0%;
  color: var(--accent-color);
  text-transform: uppercase;
  margin-bottom: 0.25rem;
}

.contact-card {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding: 1.25rem 1.5rem;
  background-color: var(--primary-color);
  border: 1px solid #e0e0e0;
  border-right: 4px solid var(--accent-color);
  border-radius: 30px 0 30px 0;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  font-family: var(--body-font);
  position: relative;
}

.contact-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(78, 118, 93, 0.18);
  border-right-color: var(--secondary-color);
}

.icon-wrapper {
  width: 52px;
  height: 52px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(78, 118, 93, 0.08);
  border-radius: 12px;
}

.card-content h3 {
  font-family: var(--subtitle-font);
  font-size: 1.2rem;
  margin-bottom: 0.25rem;
  color: var(--secondary-color);
}

.description {
  font-size: 0.9rem;
  color: #777;
  margin-bottom: 0.25rem;
  line-height: 1.4;
}

.value {
  font-weight: 700;
  color: var(--accent-color);
  font-size: 0.95rem;
  letter-spacing: 0.02em;
}

.contact-right {
  position: relative;
  background-color: var(--secondary-color);
  color: var(--white);
  border-radius: 40px 0 40px 0;
  max-width: 420px;
  width: 100%;
  overflow: hidden;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.18);
}

.right-inner {
  padding: 3rem 3.25rem;
  position: relative;
  z-index: 1;
}

.corner-accent {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100px;
  height: 100px;
  background-color: var(--accent-color);
  border-radius: 40px 0 0 0;
  opacity: 0.35;
  z-index: 0;
}

.contact-right h2 {
  font-family: var(--subtitle-font);
  font-size: 2.4rem;
  margin-bottom: 1.5rem;
  line-height: 1.1;
  color: var(--white);
}

.intro {
  font-family: var(--body-font);
  line-height: 1.7;
  margin-bottom: 0;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
}

.divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.15);
  margin: 1.75rem 0;
}

.status {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  font-size: 1rem;
  font-family: var(--body-font);
}

.status strong {
  color: var(--white);
}

.dot {
  width: 10px;
  height: 10px;
  background: #4ade80;
  border-radius: 50%;
  box-shadow: 0 0 0 3px rgba(74, 222, 128, 0.25);
  flex-shrink: 0;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%,
  100% {
    box-shadow: 0 0 0 3px rgba(74, 222, 128, 0.25);
  }
  50% {
    box-shadow: 0 0 0 6px rgba(74, 222, 128, 0.1);
  }
}

.response-time {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-family: var(--body-font);
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.7);
}

.cta {
  font-family: var(--body-font);
  font-style: italic;
  opacity: 0.8;
  line-height: 1.7;
  font-size: 0.95rem;
}

.right-btn {
  margin-top: 2rem;
  width: fit-content;
}

.right-btn:hover {
  box-shadow: var(--hover-shadow);
}
.mail-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 50px;
  background-color: #000000;
  color: var(--white);
  text-decoration: none;
  font-family: var(--body-font);
  font-size: 1rem;
  cursor: pointer;
}

@media (max-width: 1100px) {
  .contact-wrapper {
    padding: 72px 48px 80px;
  }

  .contact-container {
    gap: 3rem;
  }

  .watermark {
    width: 320px;
  }
}

@media (max-width: 992px) {
  .contact-wrapper {
    padding: 56px 24px 64px;
  }

  .contact-container {
    flex-direction: column;
    gap: 2.5rem;
  }

  .contact-right {
    max-width: 100%;
  }

  .watermark {
    width: 240px;
    bottom: -20px;
    right: -10px;
  }
}

@media (max-width: 640px) {
  .contact-wrapper {
    padding: 40px 20px 56px;
  }

  .right-inner {
    padding: 2.25rem 2rem;
  }

  .contact-right h2 {
    font-size: 1.9rem;
  }

  .watermark {
    width: 160px;
  }
}
</style>
