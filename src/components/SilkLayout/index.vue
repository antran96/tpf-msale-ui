<template>
  <div :class="[$props.className ? $props.className : '', 'layout-silk-container']" :style="styleDynamic">
    <div class="layout-silk layout-silk--1" />
    <div class="layout-silk layout-silk--2" />
    <div class="layout-silk layout-silk--3" />
    <!-- <div class="layout-silk layout-silk--4" /> -->
    <!-- <div class="layout-silk layout-silk--5" /> -->
  </div>
</template>

<script>
export default {
  name: 'SilkLayout',
  props: {
    height: { type: [String, Number], default: 100 },
    width: { type: [String, Number], default: 100 },
    color: { type: Array, default: function() {
      return [124, 77, 245]
    } },
    className: { type: String, default: '' }
  },
  computed: {
    styleDynamic: function() {
      const strColor = this.$props.color[0] + ',' + this.$props.color[1] + ',' + this.$props.color[2] + ','
      const objStyles = {
        'width':  this.$props.width,
        'height':  this.$props.height,
        '--clSilk100':  'rgba(' + strColor + '1)',
        '--clSilk50':   'rgba(' + strColor + '0.5)',
        '--clSilk10':   'rgba(' + strColor + '0.1)'
      }
      return objStyles
    }
  }
}
</script>

<style lang="scss" scoped>
.layout {
  &-silk-container {
    background-color: var(--clSilk70);
    overflow: hidden;
    position: absolute;
    z-index: -1;
    &.navbar {
      background-color: transparent;
      .layout-silk {
        height: 100%;
        width: 100%;
        position: absolute;
        background-color: var(--clSilk100);
        opacity: 0.3;
        position: absolute;
        z-index: 0;
        transition: all .28s;
        &--1 {
          -webkit-clip-path: polygon(53% 0, 100% 0, 100% 100%, 46% 100%);
          clip-path: polygon(53% 0, 100% 0, 100% 100%, 46% 100%);
        }
        &--2 {
          -webkit-clip-path: polygon(77% 0, 100% 0, 100% 100%, 68% 100%);
          clip-path: polygon(77% 0, 100% 0, 100% 100%, 68% 100%);
        }
        &--3 {
          -webkit-clip-path: polygon(0 0);
          clip-path: polygon(0 0);
        }
        &--4 {
          -webkit-clip-path: polygon(0 0);
          clip-path: polygon(0 0);
        }
        &--5 {
          -webkit-clip-path: polygon(0 0);
          clip-path: polygon(0 0);
        }
      }
    }
    &.menu {
      z-index: 0;
      transition: all .28s;
      background-color: transparent;
      .layout-silk {
        height: 100%;
        width: 100%;
        position: absolute;
        background-color: var(--clSilk100);
        opacity: 0.3;
        position: absolute;
        z-index: 0;
        &--1 {
          -webkit-clip-path: polygon(0 80%, 100% 60%, 100% 100%, 0% 100%);
          clip-path: polygon(0 80%, 100% 60%, 100% 100%, 0% 100%);
        }
        &--2 {
          -webkit-clip-path: polygon(0 80%, 100% 65%, 100% 100%, 0% 100%);
          clip-path: polygon(0 80%, 100% 65%, 100% 100%, 0% 100%);
        }
        &--3 {
          -webkit-clip-path: polygon(0 80%, 100% 69%, 100% 100%, 0% 100%);
          clip-path: polygon(0 80%, 100% 69%, 100% 100%, 0% 100%);
        }
        &--4 {
          -webkit-clip-path: polygon(0 80%, 100% 72%, 100% 100%, 0% 100%);
          clip-path: polygon(0 80%, 100% 72%, 100% 100%, 0% 100%);
        }
        &--5 {
          -webkit-clip-path: polygon(0 80%, 100% 74%, 100% 100%, 0% 100%);
          clip-path: polygon(0 80%, 100% 74%, 100% 100%, 0% 100%);
        }
      }
    }
    &.rightpanel {
      transition: all .28s;
      background-color: transparent;
      .layout-silk {
        transition: all .28s;
        height: 100%;
        width: 100%;
        background-color: var(--clSilk100);
        opacity: 0.3;
        position: absolute;
        z-index: 0;
        &--1 {
          -webkit-clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
          clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
        }
        &--2 {
          -webkit-clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
          clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
        }
        &--3 {
          -webkit-clip-path: polygon(0% 12%, 100% 0%, 100% 100%, 0% 100%);
          clip-path: polygon(0% 12%, 100% 0%, 100% 100%, 0% 100%);
        }
        &--4 {
          -webkit-clip-path: polygon(0 26%, 100% 18%, 100% 100%, 0% 100%);
          clip-path: polygon(0 26%, 100% 18%, 100% 100%, 0% 100%);
        }
        &--5 {
          -webkit-clip-path: polygon(0 45%, 100% 40%, 100% 100%, 0% 100%);
          clip-path: polygon(0 45%, 100% 40%, 100% 100%, 0% 100%);
        }
      }
    }
    .layout-silk {
      height: 100%;
      width: 100%;
      position: absolute;
      background-color: var(--clSilk100);
      opacity: 0.6;
      position: absolute;
      z-index: 1;
      &--1 {
        -webkit-clip-path: polygon(100% 100%, 35% 100%, 65% 32%, 55% 0, 100% 0);
        clip-path: polygon(100% 100%, 32% 100%, 58% 32%, 48% 0, 100% 0);
        // -webkit-clip-path: polygon(100% 100%, 61% 100%, 42% 35%, 53% 0, 100% 0);
        // clip-path: polygon(100% 100%, 61% 100%, 42% 35%, 53% 0, 100% 0);
      }
      &--2 {
        -webkit-clip-path: polygon(100% 100%, 35% 100%, 65% 32%, 55% 0, 100% 0);
        clip-path: polygon(100% 100%, 32% 100%, 54% 30%, 47% 0, 100% 0);
        // -webkit-clip-path: polygon(100% 100%, 61% 100%, 38% 34%, 47% 0, 100% 0);
        // clip-path: polygon(100% 100%, 61% 100%, 38% 34%, 47% 0, 100% 0);
      }
      &--3 {
        -webkit-clip-path: polygon(100% 100%, 35% 100%, 65% 32%, 55% 0, 100% 0);
        clip-path: polygon(100% 100%, 32% 100%, 50% 28%, 46% 0, 100% 0);
        // -webkit-clip-path: polygon(100% 100%, 61% 100%, 34% 36%, 41% 0, 100% 0);
        // clip-path: polygon(100% 100%, 61% 100%, 34% 36%, 41% 0, 100% 0);
      }
      &--4 {
        -webkit-clip-path: polygon(100% 100%, 35% 100%, 65% 32%, 55% 0, 100% 0);
        clip-path: polygon(100% 100%, 32% 100%, 40% 32%, 48% 0, 100% 0);
        // -webkit-clip-path: polygon(100% 100%, 61% 100%, 29% 39%, 35% 0, 100% 0);
        // clip-path: polygon(100% 100%, 61% 100%, 29% 39%, 35% 0, 100% 0);
      }
      &--5 {
        -webkit-clip-path: polygon(100% 100%, 35% 100%, 65% 32%, 55% 0, 100% 0);
        clip-path: polygon(100% 100%, 35% 100%, 65% 32%, 55% 0, 100% 0);
        // -webkit-clip-path: polygon(100% 100%, 61% 100%, 24% 43%, 28% 0, 100% 0);
        // clip-path: polygon(100% 100%, 61% 100%, 24% 43%, 28% 0, 100% 0);
      }
    }
  }
}
.hideSidebar {
  .layout {
    &-silk-container {
      &.navbar {
        .layout-silk {
          &--1 {
            -webkit-clip-path: polygon(24% 0, 100% 0, 100% 100%, 21.5% 100%);
            clip-path: polygon(24% 0, 100% 0, 100% 100%, 21.5% 100%);
          }
          &--2 {
            -webkit-clip-path: polygon(32.5% 0, 100% 0, 100% 100%, 29% 100%);
            clip-path: polygon(32.5% 0, 100% 0, 100% 100%, 29% 100%);
          }
          &--3 {
            -webkit-clip-path: polygon(48% 0, 100% 0, 100% 100%, 43% 100%);
            clip-path: polygon(48% 0, 100% 0, 100% 100%, 43% 100%);
          }
          &--4 {
            -webkit-clip-path: polygon(69% 0, 100% 0, 100% 100%, 62% 100%);
            clip-path: polygon(69% 0, 100% 0, 100% 100%, 62% 100%);
          }
          &--5 {
            -webkit-clip-path: polygon(90% 0, 100% 0, 100% 100%, 81% 100%);
            clip-path: polygon(90% 0, 100% 0, 100% 100%, 81% 100%);
          }
        }
      }
      &.rightpanel {
        .layout-silk {
          &--1 {
            -webkit-clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
            clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
          }
          &--2 {
            -webkit-clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
            clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
          }
          &--3 {
            -webkit-clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
            clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
          }
          &--4 {
            -webkit-clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
            clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
          }
          &--5 {
            -webkit-clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
            clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
          }
        }
      }
    }
  }
}
</style>
