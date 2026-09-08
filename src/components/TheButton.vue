<script setup>
import { useRouter } from "vue-router";

const props = defineProps({
  text: {
    type: String,
    default: "Click me",
  },
  color: {
    type: String,
    default: "#4e765d",
  },
  path: {
    type: String,
    required: true,
  },
  download: {
    type: String,
    default: null,
  },
});

const router = useRouter();

// Eén <button>-element in plaats van een <button> genest in een <a>/<RouterLink>
// (ongeldige HTML). Navigatie en download gaan nu via de klik-handler.
function handleClick() {
  if (props.download) {
    const link = document.createElement("a");
    link.href = props.path;
    link.download = props.download;
    document.body.appendChild(link);
    link.click();
    link.remove();
    return;
  }
  router.push(props.path);
}
</script>

<template>
  <button type="button" :style="{ backgroundColor: color }" @click="handleClick">{{ text }}</button>
</template>
<style scoped>
button {
  width: 150px;
  height: 50px;

  color: var(--white);
  border: none;
  border-radius: 0;

  cursor: pointer;
}

button:hover {
  box-shadow: var(--hover-shadow);
}

@media (max-width: 1024px) {
  button {
    width: 140px;
    height: 46px;
    font-size: 14px;
  }
}

@media (max-width: 640px) {
  button {
    width: 300px;
    height: 50px;
  }
}
</style>
