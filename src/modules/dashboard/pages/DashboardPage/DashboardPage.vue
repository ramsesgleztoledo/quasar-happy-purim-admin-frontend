<template>
  <div>
    <div class="row">
      <div class="col-12 user-client-title-col">
        <p class="user-client-title">Demo Synagogue</p>
      </div>
    </div>
    <div class="row q-mt-sm">
      <div class="col-12 col-md-8 DashboardPage-left-container">
        <div class="row">
          <div class="col-12 col-md-4 q-mb-sm">
            <WidGet
              icon="discount"
              first-p="$24.82"
              second-p="Daily Total:"
              third-p="Wednesday July 17, 2024"
              icon-color="#3cd856"
              background-color="#dcfce7"
            ></WidGet>
          </div>
          <div class="col-12 col-md-4 q-mb-sm">
            <WidGet
              icon="signal_cellular_alt"
              first-p="$84,138.33"
              second-p="Running Total:"
              third-p="Wednesday July 17, 2024"
              icon-color="#5A65FA"
              background-color="#E2EAFF"
            ></WidGet>
          </div>
          <div class="col-12 col-md-4 q-mb-sm">
            <WidGet
              icon="group_add"
              first-p="21%"
              second-p="Participation Rate"
              third-p="0,5% from yesterday"
              icon-color="#BF83FF"
              background-color="#F3E8FF"
            ></WidGet>
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-md-6 q-mb-sm align-content-center">
            <div class="DashboardPage-members-stats-container">

              


              L1</div>
          </div>
          <div class="col-12 col-md-6 q-mb-sm align-content-center">
            <div
              style="
                border: solid 1px #dedede;
                height: 400px;
                border-radius: 5px;
                overflow: auto;
                width: 98%;
              "
            >
              L2
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12 q-mb-sm align-content-center">
            <div
              style="
                border: solid 1px #dedede;
                height: 400px;
                border-radius: 5px;
                overflow: auto;
                width: 99%;
              "
            >
              L3
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-4 DashboardPage-right-container">
        <div class="row q-mb-sm">
          <div class="col-12">
            <div
              style="border: solid 1px #dedede; height: 400px; border-radius: 5px; overflow: auto"
            >
              R1
            </div>
          </div>
        </div>
        <div class="row q-mb-sm">
          <div class="col-12">
            <div
              style="border: solid 1px #dedede; height: 600px; border-radius: 5px; overflow: auto"
            >
              R2
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import WidGet from '../../components/widget/WidGet.vue'
</script>

<style scoped lang="scss">
@import './DashboardPage.scss';
</style>
