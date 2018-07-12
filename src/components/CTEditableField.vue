<template>
  <div :class="['ct-editable-field', { borderless: label.length === 0 }, { editable: editable }, { focused : isFocused }]">
    <div class="ct-editable-field__label">
      {{label}}
    </div>
    <div class="ct-editable-field__edit-state" v-if="editable">
      <input
        :type="type"
        :value="value"
        @change="$emit('input', $event.target.value)"
        @focus="() => { isFocused = true }"
        @blur="() => { isFocused = false }"
        >
    </div>

    <div class="ct-editable-field__view-state" v-if="!editable">
      <div>{{value}}</div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'CTEditableField',
  props: {
    label: {
      type: String,
      default: '',
    },
    value: {
      type: [String, Number],
      required: true,
    },
    type: {
      type: String,
      default: 'text',
    },
    required: {
      type: Boolean,
      default: false,
    },
    editable: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    localValue: null,
    isFocused: false,
  }),
  methods: {},
};
</script>

<style scoped lang="stylus">
@require './../theme/global.styl';

.ct-editable-field {
  &:not(.editable) {
      margin: var(--gutter-size-x) 0;
  }
  &.editable:not(.borderless) {
    padding: var(--gutter-size-xs);
    border: var(--main-border-style);
    border-radius: var(--border-radius-x);
    margin: var(--gutter-size-xs) 0;

    input {
      margin-bottom: 0;
      border: 0;
      font-size: var(--font-size-x);
      color: var(--font-color);
      padding: 0;
      background-color: transparent;

      &:focus {
        outline: none;
        box-shadow: none;
      }
    }

    &.focused {
      box-shadow: inset 0px 0px 0px 1px var(--color-acent)
      border: 1px solid var(--color-acent);
    }
  }



}

.ct-editable-field {
  max-width: 320px;

  &__label {
    font-size: 0.8em;
    opacity: 0.6;
  }

  &__view-state {
    margin-top: var(--gutter-size-xs);
  }

}
</style>
