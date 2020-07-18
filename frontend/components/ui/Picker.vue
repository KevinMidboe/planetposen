<template>
  <div class="dropdown">
    <select>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
    </select>
    <span aria-hidden="true" class="rs-quantity-icon form-icon icon icon--arrow-down"></span>
  </div>
</template>

<script>
  
</script>

<style lang="scss" scoped>
@import 'frontend/styles/variables'; 

.dropdown {
  top: -10%;
  left: 20%;
  position: relative;
}

select {
  margin: 0 auto;
  position: absolute;
  font-size: 24px;
  font-weight: 400;
  letter-spacing: .009em;

  color: #111;
  margin: 0;
  width: min-content;
  padding: 0;
  border: 0;
  display: inline-block;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  height: min-content;
  width: 4rem;
}

span {
  position: absolute;
  font-size:30px;
  font-weight: 600;
  letter-spacing: .009em;

  color: $green;
  margin: 0;
  padding: 0;
  border: 0;
  // display: inline-block;
  // float: right;
  width: 4rem;
  text-align: right;
  pointer-events: none;
}
</style>
