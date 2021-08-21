<template>
    <div>
      <h1 @click="increment">{{ x }}</h1>
      <hr/>
      <h2>vuex中的值🐻，{{ loading }}
      </h2>
      <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
    </el-table>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { computed, onMounted, ref, Ref, defineComponent } from '@vue/composition-api'
import { useMousePosition } from '@/components/hooks/QuestionHook'
import * as store from '@/store'
import { useState, useActions } from 'vuex-composition-helpers'

interface ItableData {
  date: string;
  name: string;
  address: string;
}
interface Iprops {
  articleId: string;
}
export default defineComponent({
  name: 'Question',
  // props: {
  //   articleId: ''
  // },
  setup (props: Iprops, { root }) {
    console.log('上下文: ', props, root)
    const { x } = useMousePosition()
    const tableData: Ref<ItableData[]> = ref([])
    const { getData } = useActions(['getData'])
    const { loading } = useState(['loading'])
    // const flag: Ref<boolean> = ref(true)
    // const flag = computed(() => root.$store.state.loading)
    console.log('🐻', x)
    const increment = () => {
      x.value += 2
      getData()
      // store.default.dispatch('getData')
      // flag.value = store.default.state.loading
      // store.default.state.loading = false
      // root.$store.dispatch('getData')
    }

    onMounted(() => {
      setTimeout(() => {
        tableData.value = [
          {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          },
          {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          },
          {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }
        ]
      }, 3000)
    })
    console.log('vue3中的this: ', store.default)
    // let tableData: ItableData[] = []
    return {
      x,
      tableData,
      loading,
      increment
    }
  }
})
</script>
