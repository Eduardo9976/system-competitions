<template>
  <component :is="nome" v-bind="$props"></component>
</template>

<script>
import InputText from './InputText'

export default {
  components: { InputText },
  props: {
    nome: { type: String, required: true }
  }
}
</script>
