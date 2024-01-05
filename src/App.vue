<script setup>
import TheHeader from '@/layouts/TheHeader.vue';
import TheView from '@/layouts/TheView.vue';

/* 피니아 스토어로 리팩토링 하면서 주석처리 
import { useAlert } from './composables/alert';
const { alerts } = useAlert();
*/
</script>
<template>
  <TheHeader></TheHeader>
  <TheView></TheView>
  <!-- 피니아 스토어로 리팩토링 하면서 주석처리
  <AppAlertMulti :items="alerts" />
      -->
  <AppAlertMulti />
</template>
<style></style>
