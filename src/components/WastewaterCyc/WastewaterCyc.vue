<template>
  <div>
    <DescriptionWWcyc></DescriptionWWcyc>
    <p></p>
    <el-tree default-expand-all :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
  </div>
</template>

<script setup>
const data = [
  {
    label: '预处理',
    children: [
      { label: '格栅|GeShan1' },
      {
        label: '沉砂池',
        children: [
          { label: '平流式沉砂池|ChenSha1' },
          { label: '竖流式沉砂池|ChenSha2' },
          { label: '曝气沉砂池|ChenSha3' }
        ]
      },
      {
        label: '初级沉淀池',
        children: [
          { label: '平流式初级沉淀池' },
          { label: '竖流式初级沉淀池' },
          { label: '辐流式初级沉淀池|ChuChen3' },
          { label: '斜板管初级沉淀池' }
        ]
      }
    ]
  },
  {
    label: '强化一级处理',
    children: [
      { label: '水解酸化' },
      { label: '化学絮凝强化' }
    ]
  },
  {
    label: '好氧污泥法',
    children: [
      {
        label: '传统活性污泥法',
        children: [
          { label: '推流式曝气池' },
          { label: '完全混合式曝气池' },
          { label: '阶段曝气活性污泥' },
          { label: '吸附再生活性污泥' }
        ]
      },
      {
        label: '脱氮除磷活性污泥法',
        children: [
          { label: 'A/O生物脱氮工艺' },
          { label: 'A2/O生物脱氮除磷工艺' },
          { label: '改良A2/O生物脱氮除磷工艺' }
        ]
      },
      {
        label: '吸附-生物降解活性污泥法',
        children: [
          { label: 'AB法工艺' }
        ]
      },
      {
        label: '氧化沟',
        children: [
          { label: '奥贝尔氧化沟' },
          { label: '帕斯维尔氧化沟' },
          { label: '三沟氧化沟' },
          { label: '改良卡鲁塞尔氧化沟' }
        ]
      },
      {
        label: '间歇式活性污泥',
        children: [
          { label: 'SBR' },
          { label: 'CASS' }
        ]
      },
      {
        label: '膜生物反应器',
        children: [
          { label: '浸没式SBR' }
        ]
      },
      {
        label: '复合生物反应器',
        children: [
          { label: '复合生物反应器' }
        ]
      }
    ]
  },
  {
    label: '生物膜法',
    children: [
      {
        label: '生物滤池',
        children: [
          { label: '普通生物滤池' },
          { label: '高负荷生物滤池' },
          { label: '塔式生物滤池' },
          { label: '生物滤池需氧量' },
          { label: '生物滤池污泥量' }
        ]
      },
      {
        label: '生物转盘',
        children: [
          { label: '生物转盘' }
        ]
      },
      {
        label: '生物接触氧化',
        children: [
          { label: '二段式生物接触氧化' },
          { label: '接触沉淀池' },
          { label: '生物接触氧化池' }
        ]
      },
      {
        label: '曝气生物滤池',
        children: [
          { label: 'DC型曝气生物滤池' },
          { label: 'N型曝气生物滤池' },
          { label: '分建式曝气生物滤池' },
          { label: '合建式曝气生物滤池' }
        ]
      },
      {
        label: '生物流化床',
        children: [
          { label: '好氧三项流化床' }
        ]
      }
    ]
  },
  {
    label: '二次沉淀池',
    children: [
      { label: '平流式二次沉淀池' },
      { label: '辐流式二次沉淀池' },
      { label: '斜管板二次沉淀池' }
    ]
  },
  {
    label: '消毒设施',
    children: [
      { label: '液氯消毒' },
      { label: '二氧化氯消毒' },
      { label: '臭氧消毒' },
      { label: '紫外线消毒' },
      { label: '接触池工艺' }
    ]
  },
  {
    label: '污泥处理',
    children: [
      { label: '污泥产量计算' },
      { label: '污泥浓缩' },
      { label: '厌氧消化' },
      { label: '好氧消化' },
      {
        label: '污泥干化与脱水',
        children: [
          { label: '污泥干化场' },
          { label: '污泥真空转鼓过滤脱水机' },
          { label: '污泥板框压滤机' },
          { label: '带式压滤机' }
        ]
      }
    ]
  },
  {
    label: '三级处理',
    children: [
      { label: '高密度沉淀池' },
      {
        label: '过滤',
        children: [
          { label: 'V型滤池' },
          { label: '流动床滤池' },
          { label: '表面过滤滤池' }
        ]
      },
      {
        label: '脱氮与化学除磷',
        children: [
          { label: '化学除磷设施' }
        ]
      }
    ]
  }
]
const defaultProps = {
  children: 'children',
  label: 'label'
}

import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import DescriptionWWcyc from '../shared/DescriptionWWcyc2.vue';
const rounter = useRouter()

function handleNodeClick(data) {
  if (!data.children) {
    if (data.label.includes('|')) {
      rounter.push(data.label.split('|')[1])
    } else {
      ElMessage({
        message: '暂未开通，敬请期待',
        type: 'warning'
      })
    }
  }
}

</script>
<style scoped></style>
