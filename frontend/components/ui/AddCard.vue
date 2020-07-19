
<template>
  <div class="product-card">
    <router-link to="/add" title="Add new product">
      <i class="icon icon--add-circle"></i>
    </router-link>

    <h2 class="">add new product</h2>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.product-card {
  height: 100%;
  background-color: white;
  border-radius: 6px;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  
  > *:first-child {
    padding-top: 4rem;
  }
  > *:last-child {
    padding-bottom: 4rem;
  }
}

h2 {
  color: grey;
  padding-top: 3rem;
  font-style: italic;
}


.icon {
  font-size: 10rem;
  color: var(--color-background);
  color: grey;
}
</style>
