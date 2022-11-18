<!--
 * @Author: shaolong
 * @Date: 2022-11-15 16:24:23
 * @LastEditors: shaolong
 * @LastEditTime: 2022-11-18 11:02:13
 * @Description: 
-->
<template>
  <div class="count-paid">
    <div class="card">
      <div class="card__header">
        <span class="label">支付笔数</span>
        <span class="value">6560</span>
      </div>

      <div class="card__container">
        <div class="echarts" id="echarts_2"></div>
      </div>

      <div class="card__footer">
        <span class="label">转化率</span>
        <span class="value">60%</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import * as echarts from "echarts";
let myChart = null;
onMounted(() => {
  const chartDom = document.getElementById("echarts_2");
  myChart = echarts.init(chartDom);
  const option = {
    grid: {
      left: "5%",
      right: "5%",
      bottom: "0%",
      top: "0%"
    },
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      show: false
    },
    yAxis: {
      type: "value",
      show: false
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: "bar"
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
.count-paid {
  .card {
    .echarts {
      height: 50px;
      width: 100%;
    }

    &__container {
      padding: 0;
    }
  }
}
</style>
