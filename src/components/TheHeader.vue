<template>
  <header>
    <div class="nav">
      <RouterLink to="/home"
        ><img src="../assets/Header/Logo-wit-header.png" alt="Logo" /></RouterLink
      ><RouterLink to="/"><img src="../assets/Header/menu.svg" alt="Logo" /></RouterLink>
    </div>
    <div class="hero">
      <img src="../assets/Header/Logo-grijs-header.png" alt="Logo" class="hero-logo" />
      <div class="title-container">
        <div class="title">
          <h1><slot name="title"></slot></h1>
        </div>
        <div class="subtitle">
          <h2><slot name="subtitle"></slot></h2>
          <h2><slot name="subtitle2"></slot></h2>
        </div>
      </div>
    </div>
  </header>
</template>
<style scoped>
header {
  width: 100%;
  height: 405px;
  background-color: var(--secondary-color);
  display: flex;
  flex-direction: column;
  position: relative;
}

.nav {
  padding: 50px 60px;
  display: flex;
  justify-content: space-between;
  z-index: 1;
}
.hero {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.hero-logo {
  height: 236px;
  width: 350px;
}

.title-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  white-space: nowrap;

  .title {
    h1 {
      color: var(--white);
      font-size: 96px;
      font-weight: 400;
      font-family: var(--title-font);
      letter-spacing: 0%;
      line-height: 100%;
      text-align: center;
    }
  }
  .subtitle {
    h2 {
      color: var(--accent-color);
      font-size: 32px;
      font-weight: 400;
      font-family: var(--subtitle-font);
      letter-spacing: 36%;
      line-height: 100%;
      text-align: center;
    }
  }
}
</style>
