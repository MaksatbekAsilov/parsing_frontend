<template>
  <div>
    <PriceTable />
    <PriceFilter />
    <PriceSite/>
  </div>
</template>

<script>
import PriceTable from "@/components/PriceTable.vue";
import PriceFilter from "@/components/PriceFilter.vue";
import PriceSite from "@/components/PriceSite.vue";
import PriceConvert from "@/components/PriceConvert.vue";

export default {
  components: { PriceTable, PriceFilter, PriceSite, PriceConvert
    
   },
};
</script>
