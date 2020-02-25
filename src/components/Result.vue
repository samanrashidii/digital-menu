<template>
  <div id="result" class="has-xxlarge-padding" :style="{background:`url(./static/images/result.jpg) no-repeat center`}">
    <h2 class="center-aligned">Your order is getting ready <span class="icon smile"></span></h2>
    <table class="table result-table has-xxlarge-top-margin">
      <tbody>
        <tr v-for="(selectedItem, index) in getSelectedItems()" v-bind:key="index">
          <td>{{ selectedItem.name }}</td>
          <td>x{{ selectedItem.quantity }}</td>
          <td>{{ selectedItem.price }} ₾</td>
        </tr>
        <tr v-show="getPromo().activate === true">
          <td><b>{{ getPromo().type }} discount</b></td>
 					<td colspan="2"><strong>{{ getPromo().discount }}</strong> off</td>
        </tr>
      </tbody>
    </table>
    <div class="center-aligned">
      <router-link class="bttn large has-top-margin" to="/"><span @click="cancelSubmit(), changeSelectedItems()">Add more items from the menu? Click here</span></router-link>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Result',
  data() {
    return {}
  },
  methods: {
    getSelectedItems(){
      return this.$parent.$data.selectedItems;
    },
    getPromo(){
      return this.$parent.$data.promo;
    },
    cancelSubmit: function(){
      this.$parent.cancelSubmit();
    },
    changeSelectedItems: function(){
      this.$parent.changeSelectedItems();
    }
  }
};
</script>