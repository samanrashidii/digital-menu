<template>
  <div class="selected-items">
    <div class="overlay" :class="{'active' : getOrderStatus() === true}">
      <div class="alert-box">
        <h5 v-if="getLanguage() === 'English'">Do you want to submit this order?</h5>
        <h5 v-else-if="getLanguage() === 'Georgian'">გნებავთ წარმოადგინოთ ეს შეკვეთა?</h5>
        <p class="alert" v-if="getLanguage() === 'English'">If you submit this order, You can't cancel or remove items after that.</p>
        <p class="alert" v-if="getLanguage() === 'Georgian'">თუ თქვენ შეუკვეთეთ თქვენი ბრძანება, ამის შემდეგ არ შეგიძლიათ გააუქმოთ ან წაშალოთ ნივთები.</p>
        <div class="button-holder">
          <router-link class="bttn" to="/result">Yes I want to submit</router-link>
          <a href="javascript:void(0)" class="bttn site-2" @click="cancelSubmit()">No, I want to change it</a>
        </div>
      </div>
    </div>
    <div class="overlay" :class="{'active' : getAlertDialog() === 3}">
      <div class="alert-box">
        <h6 v-if="getLanguage() === 'English'">Please enter a valid Promo Code!</h6>
        <h6 v-else-if="getLanguage() === 'Georgian'">გთხოვთ შეიყვანოთ სწორი პრომო კოდექსი!</h6>
        <div class="button-holder">
          <a href="javascript:void(0)" class="bttn site" @click="alertControl(-1);">Okay</a>
        </div>
      </div>
    </div>
    <div class="overlay" :class="{'active' : getAlertDialog() === 4}">
      <div class="alert-box">
        <h6 v-if="getLanguage() === 'English'">Your Promo Code is wrong!</h6>
        <h6 v-else-if="getLanguage() === 'Georgian'">თქვენი პრომო კოდექსი არასწორია!</h6>
        <div class="button-holder">
          <a href="javascript:void(0)" class="bttn site" @click="alertControl(-1);">Okay</a>
        </div>
      </div>
    </div>
    <img :src="'./static/images/logo.png'" alt="Lidoma Logo" />
    <div class="language">
      <a href="javascript:void(0)" @click="langControl('English')" :class="{'active' : getLanguage() === 'English'}"><img src="@/assets/images/icons/english.png" alt="" /> <span>English</span></a>
      <a href="javascript:void(0)" @click="langControl('Georgian')" :class="{'active' : getLanguage() === 'Georgian'}"><img src="@/assets/images/icons/georgian.png" alt="" /> <span>ქართული</span></a>
    </div>
    <div class="receipt">
      <div class="inner-receipt">
        <table>
          <tr class="table-title">
            <td>Item</td>
            <td>Number</td>
            <td>Price</td>
          </tr>
          <tr v-for="(selectedItem, index) in getSelectedItems()" v-bind:key="index">
            <td><a href="javascript:void(0)" class="remove" @click="removeAll(selectedItem.name)"></a><b>{{ selectedItem.name }}</b></td>
            <td>x<span>{{ selectedItem.quantity }}</span></td>
            <td><strong>{{ selectedItem.price }}</strong> ₾</td>
          </tr>
          <tr itemname="discount" v-show="getPromo().activate === true">
            <td colspan="2"><b>{{ getPromo().type }} discount</b></td>
 						<td><strong>{{ getPromo().discount }}</strong></td>
          </tr>
        </table>
        <div class="clear-fix"></div>
        <div class="promo" v-show="getPromo().activate === false">
          <h6>
            <i v-if="getLanguage() === 'English'">Do you have a <b>Promo Code</b>? When your order is finished, You can use it to get discount on your total price.</i>
            <i v-else-if="getLanguage() === 'Georgian'">გაქვთ <b>პრომო კოდექსი</b>? როდესაც თქვენი შეკვეთა დასრულდა, თქვენ შეგიძლიათ გამოიყენოთ იგი ფასდაკლების მისაღებად თქვენი ჯამური ღირებულებით.</i>
          </h6>
          <input type="text" name="promo" v-model="promoCode" v-on:keyup.enter="promoCheck(promoCode)" placeholder="Promo Code" />
          <a href="javascript:void(0)" class="bttn" @click="promoCheck(promoCode)">Use Code</a>
        </div>
        <a href="javascript:void(0)" class="bttn site submit-bttn block-display has-small-top-margin" @click="submitMenu()">Submit Order</a>
        <div class="thank-you">
          <i v-if="getLanguage() === 'English'"><strong>Thanks, Your Order is submitted.</strong><br /> Please give tablet to the waitress so we can prepare your order as soon as possible <span class="icon smile"></span></i>
          <i v-else-if="getLanguage() === 'Georgian'"><strong>მადლობა, თქვენი შეკვეთა წარედგინება.</strong><br /> გთხოვთ მიაქციოთ ტაბლეტი მიმტანად, ასე რომ ჩვენ შეგვიძლია მოვამზადოთ თქვენი ბრძანება, რაც შეიძლება მალე <span class="icon smile"></span></i>
        </div>
      </div>
      <span class="thanks">
        <i>Thanks for choosing Lidoma Cafe</i><br />
        <i>Created by <a href="http://www.samanrashidi.com" target="_blank">Saman Rashidi</a></i>
      </span>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Sidebar',
  data() {
    return {
      promoCode : ''
    }
  },
  methods: {
    langControl: function(lang){
      this.$parent.langControl(lang);
    },
    alertControl: function(dialStatus){
      this.$parent.alertControl(dialStatus);
    },
    removeAll: function(itemName){
      this.$parent.removeAll(itemName);
    },
    submitMenu: function(){
      this.$parent.submitMenu();
    },
    cancelSubmit: function(){
      this.$parent.cancelSubmit();
    },
    getLanguage(){
      return this.$parent.$data.language;
    },
    getAlertDialog(){
      return this.$parent.$data.alertDialog;
    },
    getPromo(){
      return this.$parent.$data.promo;
    },
    getSelectedItems(){
      return this.$parent.$data.selectedItems;
    },
    getOrderStatus(){
      return this.$parent.$data.orderFinished;
    },
    promoCheck: function(promoCode){
      promoCode = promoCode.toLowerCase();
      if(promoCode === 'lovefamily'){
        promoCode = {
          type : 'Family',
          discount : '50%',
          activate : true
        }
        this.$parent.promoCheck(promoCode);
      } else if(promoCode === 'friendsftw'){
        promoCode = {
          type : 'Friends',
          discount : '30%',
          activate : true
        }
        this.$parent.promoCheck(promoCode);
      } else if(promoCode === 'lidoma'){
        promoCode = {
          type : 'Promotion',
          discount : '20%',
          activate : true
        }
        this.$parent.promoCheck(promoCode);
      } else if(promoCode === ''){
        this.alertControl(3);
      } else{
        this.alertControl(4);
      }
    }
  }
};
</script>