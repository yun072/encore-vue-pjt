<template>
    <!--페이지 트랜지션 발생하려면
    router-view/> 기존 href속성을 사용해서는 안된다.
    to 속성으로 href대체
    <a> -> <router-link> : template
    router.push() : script
    //////////////이벤트 버블링
    -click.stop, prevent
    -->
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <router-link class="navbar-brand" :to="{ name : 'Home'}">Hanwha</router-link>
    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link class="nav-link active" aria-current="page" :to="{name:'Works'}">To-Work</router-link>
        </li>
        </ul>
    </div>
</nav>

<router-view />
</template>
  
<script>
</script>
  
<style>
</style>

