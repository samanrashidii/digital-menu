<template>
  <div class="categories" :class="{'hidden' : getActiveItem() != -1}">
    <a href="javascript:void(0)" v-for="(menuItem, index) in getMenuItems()" v-bind:key="index" @click="activeControl(index)" :style="{backgroundImage:`url(${menuItem.image})`}">
      <span>
        <i v-if="getLanguage() === 'English'">{{menuItem.name}}</i>
        <i v-else-if="getLanguage() === 'Georgian'">{{menuItem.geoName}}</i>
      </span>
    </a>
  </div>
</template>

<script>
export default {
  name: 'Categories',
  data() {
    return {}
  },
  methods: {
    activeControl(aNumber){
      this.$parent.activeControl(aNumber);
    },
    getActiveItem(){
      return this.$parent.$data.activeItem;
    },
    getLanguage(){
      return this.$parent.$data.language;
    },
    getMenuItems(){
      return this.$parent.$data.menuItems;
    }
  }
};
</script>