<template>
      <div :class="['card', 'line-item', { open: isActionsShow }]">
        <div class="card__avatar" @click="edit()"></div>
        <div class="card__info" @click="edit()">
          <div class="card__tittle">
            <span>{{name}}&nbsp;</span>
            <span>{{surname}}</span>
          </div>
          <div class="card__subtittle">
            <span>{{position}}</span>
          </div>
        </div>
        <button class="card__menu-btn" @click="showActions()" @blur="blur()">
          <MoreIcon />
        </button>
        <div class="card__card-actions">
          <div class="card__action-btn" @click="remove()" >
            <TrashIcon />
          </div>
        </div>
      </div>
</template>

<script>
import MoreIcon from '@/assets/icons/more-vertical.svg';
import TrashIcon from '@/assets/icons/trash-2.svg';

export default {
  name: 'CardGroup',
  components: { MoreIcon, TrashIcon },
  props: {
    name: String,
    surname: String,
    position: String,
  },
  data: () => ({
    isActionsShow: false,
  }),
  methods: {
    edit() {
      this.$emit('edit');
      this.isActionsShow = false;
    },
    remove() {
      this.$emit('delete');
      this.isActionsShow = false;
    },
    blur() {
      this.isActionsShow = false;
    },
    showActions() {
      this.isActionsShow = true;
    },
  },
};
</script>

<style scoped lang="stylus">
@require './../theme/global.styl';

.card.line-item
  padding: var(--gutter-size-x) var(--gutter-size-x)

.card
  padding: 0;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-end;
  &.open
    .card__card-actions
      transform: translateX(0);
      transition: ease transform 0.1s;

  &__info
    padding: 0 var(--gutter-size-x);
    cursor: pointer;

  &__avatar
    background-color: var(--color-dark);
    width: 50px;
    height: 50px;
    cursor: pointer;
    border-radius: 50%;

  &__subtittle
    margin-top: 4px
    font-size: .8rem
    opacity: .7

  &__card-actions
    position: absolute;
    height: 100%;
    top: 0;
    right: 0;
    background-color: var(--color-dark);
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
    transform: translateX(100%);
    transition: ease transform 0.3s;

  &__menu-btn
    align-self: center
    cursor: pointer
    margin-left: auto;

  &__action-btn
    padding: var(--gutter-size-x);
    color: white;
    font-size: var(--font-size-xs);
    font-weight: bold;
    cursor: pointer;

  &__position
    font-size: var(--font-size-xs);

</style>
