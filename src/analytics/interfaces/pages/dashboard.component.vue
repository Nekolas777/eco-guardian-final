<template>
  <div>
    <div v-if="isEnterprise || isDomestic" class="grid grid-cols-[2fr_1fr_1fr] grid-rows-auto gap-2 h-max py-3">
      <div class="flex flex-col gap-2">
        <lines-chart></lines-chart>
        <widgets-container></widgets-container>
      </div>
     <!--  <div v-if="isEnterprise">
        <devices-list></devices-list>
      </div> -->
      <div>
        <plants-list></plants-list>
      </div>
      <div class="flex flex-col gap-2 h-full">
        <tips-carousel></tips-carousel>
        <alerts-list></alerts-list>
      </div>
    </div>

    <div v-else class="grid grid-cols-3 gap-2 h-max py-3">
      <tips-carousel></tips-carousel>
      <tips-carousel></tips-carousel>
      <tips-carousel></tips-carousel>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '../../../iam/interfaces/store/auth-store.ts';
import AlertsList from '../../../monitoring/interfaces/alerts-list.component.vue';
import LinesChart from '../../../analytics/interfaces/components/line-chart.component.vue';

import TipsCarousel from '../../../crm/interfaces/components/tips-carousel.component.vue';
import WidgetsContainer from '../components/widgets-container.component.vue';
import PlantsList from '../../../monitoring/interfaces/components/plants-list.component.vue';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();
console.log('Dashboard component loaded with role:', authStore.role);
const isEnterprise = authStore.role === 'Business' || authStore.role === 'Admin';
const isDomestic = authStore.role === 'Domestic';


// TODO: revisar el login al parecer no se actualiza o no captura el role en base al token
// aplicamos reinicio forzado del dashboard para que se actualice el role
onMounted(() => {
  if (authStore.role === 'Specialist') {
    router.push('/consulting');
  }

  if (!localStorage.getItem('reloaded')) {
    localStorage.setItem('reloaded', 'true');
    window.location.reload();
  }
});
</script>
<style scoped></style>