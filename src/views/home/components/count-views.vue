<!--
 * @Author: shaolong
 * @Date: 2022-11-15 16:24:23
 * @LastEditors: shaolong
 * @LastEditTime: 2022-11-15 17:28:20
 * @Description: 
-->
<template>
  <div class="count-views">
    <div class="card">
      <div class="card__header">
        <span class="label">总访问量</span>
        <span class="value">8846</span>
      </div>

      <div class="card__container">
        <div id="echarts" class="echarts"></div>
      </div>

      <div class="card__footer">
        <span class="label">日访问量</span>
        <span class="value">1351</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import * as echarts from "echarts";
import { TitleComponent, ToolboxComponent, TooltipComponent, GridComponent, LegendComponent } from "echarts/components";
import { LineChart } from "echarts/charts";
import { UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
import { onMounted } from "vue";

echarts.use([TitleComponent, ToolboxComponent, TooltipComponent, GridComponent, LegendComponent, LineChart, CanvasRenderer, UniversalTransition]);

let myChart = null;
onMounted(() => {
  const chartDom = document.getElementById("echarts");
  myChart = echarts.init(chartDom);
  const option = {
    grid: {
      left: "0%",
      right: "0%",
      bottom: "0%",
      top: "0%"
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        show: false
      }
    ],
    yAxis: [
      {
        type: "value",
        show: false
      }
    ],
    series: [
      {
        name: "Line 1",
        type: "line",
        stack: "Total",
        smooth: true,
        lineStyle: {
          width: 2
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.1,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 0.5, [
            {
              offset: 0,
              color: "#5470c6"
            },
            {
              offset: 1,
              color: "#5470c6"
            }
          ])
        },
        emphasis: {
          focus: "series"
        },
        data: [140, 232, 101, 264, 90, 340, 250]
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
.count-views {
  .card {
    .echarts {
      height: 50px;
      width: 100%;
    }

    &__container {
      padding: 0;
    }

    &__footer {
      border-top: 0;
    }
  }
}
</style>
