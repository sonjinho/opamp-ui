<template>
  <div>
    <header>
      <nav>
        <NuxtLink to="/">Home</NuxtLink>
      </nav>
    </header>
    <slot />
    <footer>
      <p>&copy; 2025 My Nuxt App</p>
    </footer>
  </div>
</template>

<style scoped>
header {
  background-color: #f0f0f0;
  padding: 1rem;
}
footer {
  background-color: #f0f0f0;
  padding: 1rem;
  margin-top: 1rem;
}
</style>
