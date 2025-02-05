<template>
  <div class="bg-slate-900 text-slate-200">
    <Header />
    <HomeLayout>
      <RouterView />
    </HomeLayout>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router';
import Header from './components/Header.vue';
import HomeLayout from './layout/HomeLayout.vue';

</script>