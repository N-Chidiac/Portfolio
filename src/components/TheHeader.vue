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
  max-width: 100vw;
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

@media (max-width: 1024px) {
  header {
    height: 320px;
  }

  .nav {
    padding: 35px 40px;
  }

  .hero-logo {
    height: 180px;
    width: 267px;
  }

  .title-container {
    .title h1 {
      font-size: 72px;
    }
    .subtitle h2 {
      font-size: 24px;
    }
  }
}

@media (max-width: 640px) {
  header {
    height: 240px;
  }

  .nav {
    padding: 24px 24px;
  }

  .nav img {
    height: 28px;
    width: auto;
  }

  .hero-logo {
    height: 120px;
    width: 178px;
  }

  .title-container {
    .title h1 {
      font-size: 42px;
    }
    .subtitle h2 {
      font-size: 16px;
    }
  }
}
</style>
