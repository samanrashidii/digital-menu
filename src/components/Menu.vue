<template>
  <div class="menu-box-wrapper">
    <div v-for="(menuBox, index) in menuBoxes" v-bind:key="index" class="menu-box" :class="{'active' : getActiveItem() === index}">

      <h3 class="relative-position center-aligned has-y-margin">
        <i v-if="getLanguage() === 'English'">{{getMenuItems()[index].name}}</i>
				<i v-else-if="getLanguage() === 'Georgian'">{{getMenuItems()[index].geoName}}</i>
        <a href="javascript:void(0)" class="back" @click="activeControl(-1)"><span class="icon left-arrow"></span></a>
      </h3>

      <div class="section-wrapper has-6-6-column has-small-x-padding">

        <div v-for="(menuBoxItem, index) in menuBox" v-bind:key="index" class="section">
          <div class="item" :class="{'recommended' : menuBoxItem.recommended === true, 'new' : menuBoxItem.new === true, 'vegan' : menuBoxItem.vegan === true}">
            <img :src="`./static/images/menu/${menuBoxItem.image}`" alt="" />
            <div class="inner-item">
              <h5 class="center-aligned">
                <i v-if="getLanguage() === 'English'">{{menuBoxItem.name}}</i>
                <i v-else-if="getLanguage() === 'Georgian'">{{menuBoxItem.geoName}}</i>
              </h5>
              <span class="item-description">
                <i v-if="getLanguage() === 'English'">( {{menuBoxItem.description}} )</i>
                <i v-else-if="getLanguage() === 'Georgian'">( {{menuBoxItem.geoDescription}} )</i>
              </span>
              <h4><span>{{menuBoxItem.price}}</span> ₾</h4>
              <a href="javascript:void(0)" class="remove-item" v-show="getQuantity(menuBoxItem.name) > 0" @click="removeItem(menuBoxItem.name, menuBoxItem.price)"><span class="icon minus"></span></a>
              <strong class="item-number" v-show="getQuantity(menuBoxItem.name) > 0">{{ getQuantity(menuBoxItem.name) }}</strong>
              <a href="javascript:void(0)" class="add-item" @click="addItem(menuBoxItem.name,menuBoxItem.price,menuBoxItem.quantity)"><span class="icon plus"></span></a>
            </div>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
import Menu from '../assets/data/menu.json';
export default {
  name: 'Menu',
  data() {
    return {
      menuBoxes: Menu
    }
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
    },
    addItem(itemName, itemPrice, itemQuantity){
      this.$parent.addItem(itemName, itemPrice, itemQuantity);
    },
    removeItem(itemName, itemPrice){
      this.$parent.removeItem(itemName, itemPrice);
    },
    getQuantity(itemName){
      return this.$parent.getQuantity(itemName);
    }
  }
};
</script>




