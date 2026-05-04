<script setup>
import { ref } from "vue";
import TheFooter from "@/components/TheFooter.vue";
import TheHeader from "@/components/TheHeader.vue";

const name = ref("");
const email = ref("");
const message = ref("");

const status = ref(null); // 'success' | 'error' | null
const loading = ref(false);

async function submitForm() {
  loading.value = true;
  status.value = null;

  try {
    const response = await fetch("http://localhost:3001/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        message: message.value,
      }),
    });

    if (!response.ok) throw new Error("Server error");

    status.value = "success";
    name.value = "";
    email.value = "";
    message.value = "";
  } catch {
    status.value = "error";
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <header>
    <TheHeader>
      <template #title>CONTACT ME</template>
      <template #subtitle>SAY HELLO TO ME</template>
    </TheHeader>
  </header>

  <main>
    <form @submit.prevent="submitForm">
      <div>
        <label for="name">Naam</label>
        <input id="name" v-model="name" type="text" placeholder="Jouw naam" required />
      </div>

      <div>
        <label for="email">E-mail</label>
        <input id="email" v-model="email" type="email" placeholder="jouw@email.com" required />
      </div>

      <div>
        <label for="message">Bericht</label>
        <textarea
          id="message"
          v-model="message"
          placeholder="Schrijf hier je bericht..."
          required
        ></textarea>
      </div>

      <button type="submit" :disabled="loading">
        {{ loading ? "Verzenden..." : "Verstuur" }}
      </button>

      <p v-if="status === 'success'">Bericht verzonden! Ik neem zo snel mogelijk contact op.</p>
      <p v-if="status === 'error'">Er ging iets mis. Probeer het later opnieuw.</p>
    </form>
  </main>

  <footer>
    <TheFooter />
  </footer>
</template>
