<template>
  <div class="menu-sidebar" :class="{'active' : getActiveItem() != -1}">
    <a href="javascript:void(0)" v-for="(menuItem, index) in getMenuItems() " v-bind:key="index" @click="activeControl(index)" :class="{'active' : getActiveItem() === index}" :style="{backgroundImage:`url(${menuItem.image})`}">
      <span class="icon" :class="menuItem.icon"></span>
    </a>
  </div>
</template>

<script>
export default {
  name: 'SideCategories',
  data() {
    return {}
  },
  methods: {
    activeControl(aNumber){
      this.$parent.activeControl(aNumber);
    },
    getActiveItem(){
      return this.$parent.$data.activeItem
    },
    getMenuItems(){
      return this.$parent.$data.menuItems;
    }
  }
};
</script>