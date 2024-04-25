<template>
    <!--
      요구사항
      #########################################################
      - 카드 목록 선택 시 상세 페이지로 이동
      - 상세 페이지에서 데이터 수정 및 상태정보 수정발생했을 때 
      - json-server 통신을 통해 
      #########################################################
   
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

  <div class="container">
    <router-view />
  </div>

</template>
  
<script>
</script>
  
<style>
</style>

