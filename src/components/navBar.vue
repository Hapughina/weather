<template>
  <div>
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <RouterLink to="/" >
          <a class="nav-link" :class="{ 'active': $route.path === '/' }">Weather</a>
        </RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink to="/history" >
          <a class="nav-link" :class="{ 'active': $route.path === '/history' }">Search history</a>
        </RouterLink>
      </li>
    </ul>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.active{
  font-weight: bold;
  transition: font-weight 2s ease;
}
.nav-link{
  color: #2d3a4f;
}

a {
  text-decoration: none;
  font-size: 1.2rem;
}

a:hover {
  text-decoration: underline;
  transition: text-decoration 2s ease;
}

</style>