<template>
  <div id="app">
    <div class="overlay" :class="{'active' : alertDialog === 1}">
      <div class="alert-box">
        <h6 v-if="language === 'English'">Sorry you can't remove submitted order!</h6>
        <h6 v-else-if="language === 'Georgian'">სამწუხაროდ, ვერ შეაჩერეთ წარმოდგენილი ბრძანება!</h6>
        <div class="button-holder">
          <a href="javascript:void(0)" class="bttn site" @click="alertControl(-1);">Okay</a>
        </div>
      </div>
    </div>
    <div class="overlay" :class="{'active' : alertDialog === 2}">
      <div class="alert-box">
        <h6 v-if="language === 'English'">Please choose an item from menu then submit your order!</h6>
        <h6 v-else-if="language === 'Georgian'">გთხოვთ, აირჩიოთ პუნქტი მენიუდან შემდეგ თქვენი შეკვეთა!</h6>
        <div class="button-holder">
          <a href="javascript:void(0)" class="bttn site" @click="alertControl(-1);">Okay</a>
        </div>
      </div>
    </div>
    <router-view></router-view>
    <div class="menu">
      <router-view name="sidebar"></router-view>
      <div class="menu-items">
        <router-view name="sidecategories"></router-view>
        <router-view name="menu"></router-view>
      </div>
      <router-view name="result"></router-view>
    </div>
  </div>
</template>

<script>

require('./assets/css/samanira.css')
require('./assets/css/style.css')
import MenuItems from './assets/data/menuitems.json';

export default {
  name: 'App',
  data() {
    return {
      activeItem: -1,
      language: 'English',
      alertDialog: -1,
      orderFinished: false,
      promo: {
        type : 'No',
        discount : 0,
        activate : false,
      },
      selectedItems : [],
      menuItems: MenuItems
    }
  },
  methods: {
    langControl: function(lang){
      this.language = lang;
    },
    promoCheck: function(promoCode){
      this.promo = promoCode;
    },
    activeControl: function(aNumber){
      this.activeItem = aNumber;
    },
    alertControl: function(dialStatus){
      this.alertDialog = dialStatus;
    },
    addItem: function(itemName, itemPrice, itemQuantity){
      console.log('check');
      for (var i=0; i < this.selectedItems.length; i++) {
        if (this.selectedItems[i].name === itemName) {
          this.selectedItems[i].quantity ++;
          this.selectedItems[i].price = itemPrice * this.selectedItems[i].quantity;
          return true;
        }
      }
      this.selectedItems.push({name: itemName, price: itemPrice, quantity: itemQuantity, submitted: false});
    },
    removeItem: function(itemName, itemPrice){
      for (var i=0; i < this.selectedItems.length; i++) {
        if (this.selectedItems[i].name === itemName && this.selectedItems[i].submitted === false) {
          if(this.selectedItems[i].quantity > 1){
            this.selectedItems[i].quantity --;
            this.selectedItems[i].price = itemPrice * this.selectedItems[i].quantity;
          } else{
            this.selectedItems.splice(i, 1);
          }
        } else if(this.selectedItems[i].name === itemName && this.selectedItems[i].submitted === true){
          if(this.selectedItems[i].quantity > this.selectedItems[i].minQuantity){
            this.selectedItems[i].quantity --;
            this.selectedItems[i].price = itemPrice * this.selectedItems[i].quantity;
          } else{
            this.alertControl(1);
          }
        }
      }
    },
    getQuantity: function(itemName){
      for (var i=0; i < this.selectedItems.length; i++) {
        if (this.selectedItems[i].name === itemName) {
          return this.selectedItems[i].quantity;
        }
      }
    },
    removeAll: function(itemName){
      for (var i=0; i < this.selectedItems.length; i++) {
        if (this.selectedItems[i].name === itemName && this.selectedItems[i].submitted === false) {
          this.selectedItems.splice(i, 1);
        } else if(this.selectedItems[i].name === itemName && this.selectedItems[i].submitted === true){
          this.alertControl(1);
        }
      }
    },
    submitMenu: function(){
      if(this.selectedItems.length > 0){
        this.orderFinished = true;
        document.body.classList.add('mobile-scrollable');
      } else{
        this.alertControl(2);
      }
    },
    cancelSubmit: function(){
      this.orderFinished = false;
      document.body.classList.remove('mobile-scrollable');
    },
    changeSelectedItems: function(){
      for (var i=0; i < this.selectedItems.length; i++) {
          this.selectedItems[i].submitted = true;
          this.selectedItems[i].minQuantity = this.selectedItems[i].quantity;
      }
    }
  }
};

</script>