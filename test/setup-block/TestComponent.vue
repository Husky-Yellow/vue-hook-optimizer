<script setup lang="ts">
const props = defineProps({
  msg: String
})

const emits = defineEmits(['update:msg'])

const route = useRoute();

const path = computed(() => route.path)

const lmsg = ref(props.msg)

watch(lmsg, (val) => {
  console.log(path.value)
  emits('update:msg', val)
})


const data = reactive({
  name: ''
})

const age = ref(18)

function addAge() {
  age.value++
}

const updateName = (e: Event) => {
  data.name = e.target.value
}

function funA() {
  const varB = ''
  return {
    varB
  }
}

const { varB } = funA()

function funC(varB) {
  const varD = 1
  const varE = 2
  return [varD, varE]
}

const [ varD, varE ] = funC(varB)

</script>

<template>
  <div>
    <input v-model="lmsg" />
    <div>{{ `path: ${path}` }}</div>
    {{ data.name }} / {{ age }}
    <input :value="data.name" @input="updateName" />
    <button @click="addAge"></button>
  </div>
</template>

<style scoped>

</style>