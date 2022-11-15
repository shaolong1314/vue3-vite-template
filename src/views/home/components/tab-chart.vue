<!--
 * @Author: shaolong
 * @Date: 2022-11-15 16:24:23
 * @LastEditors: shaolong
 * @LastEditTime: 2022-11-15 17:27:15
 * @Description: 
-->
<template>
  <div class="tab-chart">
    <div class="tab-chart__header">
      <ul class="tab-chart__tab">
        <li class="active">销售额</li>
        <li>访问量</li>
      </ul>
    </div>

    <div class="tab-chart__container">
      <div class="echarts" id="echarts_3"></div>
    </div>
  </div>
</template>

<script setup>
import * as echarts from "echarts/core";
import { GridComponent } from "echarts/components";
import { BarChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";
import { onMounted, onUnmounted } from "vue";

echarts.use([GridComponent, BarChart, CanvasRenderer]);

let myChart = null;

onMounted(() => {
  const chartDom = document.getElementById("echarts_3");
  myChart = echarts.init(chartDom);

  const option = {
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    },
    yAxis: {
      type: "value"
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: "bar",
        barWidth: "20%"
      }
    ]
  };

  option && myChart.setOption(option);
});

onUnmounted(() => {
  myChart.dispose();
  myChart = null;
});
</script>

<style lang="scss" scoped>
.tab-chart {
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 50px;
    padding: 0 20px;

    ul {
      li {
        list-style: none;
        float: left;
        margin-right: 20px;
        font-size: 15px;
        color: #dbdbdb;
        cursor: pointer;

        &.active {
          color: #000;
          font-weight: bold;
        }
      }
    }
  }

  &__year {
    font-size: 14px;
    position: relative;

    &::before {
      display: block;
      content: "";
      height: 8px;
      width: 8px;
      border-radius: 8px;
      background-color: #000;
      position: absolute;
      left: -15px;
      top: 4px;
    }
  }

  &__container {
    height: 500px;
    padding: 0 15px;

    .echarts {
      height: 100%;
      width: 100%;
    }
  }
}
</style>
