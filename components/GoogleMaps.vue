<template lang="pug">
  GmapMap(
    :center="{lat:10, lng:10}"
    :zoom="7"
    map-type-id="terrain"
    style="width: 500px; height: 300px"
  )
    GmapMarker(
      :key="index"
      v-for="(m, index) in markers"
      :position="m.position"
      :clickable="true"
      :draggable="true"
      @click="center=m.position"
    )
    //- GmapMarker(ref="myMarker"
    //-   :position="google && new google.maps.LatLng(1.38, 103.8)")
</template>
<script>
// import {gmapApi} from 'vue2-google-maps'
 
// export default {
//   computed: {
//     google: gmapApi
//   }
// }
</script>