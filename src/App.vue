<script setup>
import TheHeader from '@/layouts/TheHeader.vue';
import TheView from '@/layouts/TheView.vue';
import { useAlert } from './composables/alert';

const { alerts } = useAlert();
</script>
<template>
  <TheHeader></TheHeader>
  <TheView></TheView>
  <AppAlertMulti :items="alerts" />
</template>
<style></style>
