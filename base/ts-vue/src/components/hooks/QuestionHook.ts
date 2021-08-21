import { ref, watch, onMounted } from '@vue/composition-api'

function useMousePosition () {
  const x = ref(0)
  const y = ref(0)
  watch(x, () => {
    console.log('Hooks Setup外部检测', x.value)
  })

  // onMounted(() => {})
  return {
    x, y
  }
}

export {
  useMousePosition
}
