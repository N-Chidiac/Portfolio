<script setup>
import TheButton from "@/components/TheButton.vue";
import TheFooter from "@/components/TheFooter.vue";
import TheHeader from "@/components/TheHeader.vue";
</script>

<template>
  <header>
    <TheHeader>
      <template #title>404</template>
      <template #subtitle>PAGE NOT FOUND</template>
    </TheHeader>
  </header>

  <main>
    <p class="message">Deze pagina bestaat niet (meer) of de link klopt niet.</p>
    <div class="btns">
      <TheButton text="Home" color="#000000" path="/home" />
      <TheButton text="Contact me" color="#4e765d" path="/contact" />
    </div>
  </main>

  <footer>
    <TheFooter />
  </footer>
</template>

<style scoped>
main {
  padding: 110px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  text-align: center;
}

.message {
  font-family: var(--body-font);
  font-weight: 400;
  font-size: 18px;
  color: var(--secondary-color);
  max-width: 480px;
}

.btns {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
}

@media (max-width: 768px) {
  main {
    padding: 56px 20px;
  }

  .message {
    font-size: 16px;
  }
}
</style>
