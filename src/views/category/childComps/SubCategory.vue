!<template>
  <div class='SubCategory'>
    <div :key="index" class="subcategoryItem" v-for="(item, index) in subCategory">
      <a :href="item.link"><img :src="item.image" alt="" /></a>
      <p>{{ item.title }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SubCategory',
  data(){
    return {}
  },
  props:{
    subCategory:{
      type:Array,
      default(){
        return []
      }
    }
  },
  computed:{},
  components: {},
  created(){},
  mounted(){},
  methods: {}
}
</script>
<style scoped>
.SubCategory {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  padding: 10px;
}

.subcategoryItem {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 80px;
  height: 100px;
  margin-bottom: 10px;
}

.subcategoryItem img {
  width: 65px;
  margin-bottom: 7px;
}

.subcategoryItem p {
  font-size: 14px;
}

</style>
