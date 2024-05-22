<template>
  <section class="sect-h1">
    <div class="sect-h1-text">
      Hệ thống cửa hàng
    </div>

    <div class="sect-h1-text">
      Hướng dẫn
    </div>

    <div class="sect-h1-text">
      Giới thiệu
    </div>
  </section>

  <section class="sect-h2">
    <div class="logo">
        <picture>
          <source media="(min-width: 1920px)" comp="auto" srcset="https://content.pancake.vn/1/s1050x700/fwebp/fc/e0/d4/19/b47dadb810fd9b0b56963ff1bc6a853f9e3161de7eb8ebf8b835027a.png">
          <source media="(min-width: 1680px) and (max-width: 1919px)" comp="auto" srcset="https://content.pancake.vn/1/s1050x700/fwebp/fc/e0/d4/19/b47dadb810fd9b0b56963ff1bc6a853f9e3161de7eb8ebf8b835027a.png">
          <source media="(min-width: 1024px) and (max-width: 1679px)" comp="auto" srcset="https://content.pancake.vn/1/s1050x700/fwebp/fc/e0/d4/19/b47dadb810fd9b0b56963ff1bc6a853f9e3161de7eb8ebf8b835027a.png">
          <source media="(max-width: 424px)" comp="auto" srcset="https://content.pancake.vn/1/s1050x700/fwebp/fc/e0/d4/19/b47dadb810fd9b0b56963ff1bc6a853f9e3161de7eb8ebf8b835027a.png">
          <source media="(min-width: 768px) and (max-width: 1023px)" comp="auto" srcset="https://content.pancake.vn/1/s1050x700/fwebp/fc/e0/d4/19/b47dadb810fd9b0b56963ff1bc6a853f9e3161de7eb8ebf8b835027a.png">
          <source media="(min-width: 425px) and (max-width: 767px)" comp="auto" srcset="https://content.pancake.vn/1/s1050x700/fwebp/fc/e0/d4/19/b47dadb810fd9b0b56963ff1bc6a853f9e3161de7eb8ebf8b835027a.png">

          <img x:visible="" src="https://content.pancake.vn/1/s900x900/fwebp/fc/e0/d4/19/b47dadb810fd9b0b56963ff1bc6a853f9e3161de7eb8ebf8b835027a.png" draggable="false" fetchpriority="high" class="w-full h-full">
        </picture>
    </div>
  </section>
</template>

<script>
export default {

}
</script>

<style lang="sass" scoped>
.sect-h1
  background-color: #00BCC2
  display: flex
  gap: 20px
  padding: .25rem .5rem

.sect-h2
  position: sticky
  top: 0px
  box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 10px
  display: grid
  grid-template-columns: 40px 160px 1fr 180px 40px
  grid-template-rows: minmax(107px, max-content)
  .logo
    align-self: center
    grid-column-end: 4
    grid-column-start: 2
    grid-row-end: 2
    grid-row-start: 1
    height: 65px
    justify-self: start
    margin-left: 0%
    margin-top: calc(0px* 2)
    width: 110px
</style>