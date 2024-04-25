<template>
  <div class="container">
  <h1>Encore-Work List</h1>
  <!-- 검색기능 추가 -->

  <input type="text"
          placeholder="Search..."
          class="form-control"
          v-model="searchText"/>

  <hr/>

  <!-- form -> WorkForm.vue로 이동 -->
  <WorkForm @add-work="addWork"/>

  <!-- 페이지 로딩시 추가되는 코드 -->
  <!-- <div v-if="!works.length" class="error">
    등록한 일정이 없음!
  </div> -->
  
  <div class="error">
    {{error}}
  </div>


  <!-- 검색 기능 추가하는 서치 바-->
  <div v-if="!filterWorks.length" class="error">
    필터링 결과가 존재하지 않습니다.
  </div>

  <!-- {{ works }} -->
  <!-- vue v-for 반드시 기본키가 필요-->
  <WorkList :works="filterWorks"
            @toggle-work="toggleWork"
            @delete-work="deleteWork"
            />

</div>
</template>

<script>

/*
npm i axios
import axios from 'axios';
axios.get();
$.ajax();
*/


import {ref, computed } from 'vue';
import axios from "@/axios";
import WorkForm from "@/components/WorkForm.vue" ;

import WorkList from "@/components/WorkList.vue" ;



export default {
  components :{
      WorkForm,
      WorkList,
      
  },

setup(){
  // const work = ref('');
  // const works = ref([]);
  // // let cnt = 0;
  // const toggle = ref(false);
  // const hasError = ref(false);

  const works = ref([]);
  const searchText = ref('');
  const error = ref('');

  // const onToggle = () => {
  //   toggle.value = !toggle.value;
  // }


  const addWork = async (work) => {

    // axios.post('http://localhost:3000/works',{
    //   id : Date.now(),
    //   subject : work.subject,
    //   completed: false
    // }).then( //정상적 통신될 때 수행
    //   res =>{
    //     console.log(res);
    //     console.log(res.data);
    //     works.value.push(res.data);
    //   }
    // ).catch( //예외처리
    //   err => {
    //     console.log(err);
    //     error.value = "Something to wrong"
    //   }
    // );

    error.value = '';

    try{
      const res = await axios.post(`works`,{
        id : Date.now(),
        subject : work.subject,
        completed: false
      });
      works.value.push(res.data);
    } catch(err){
      console.log(">> addWork err, ", err);
      error.value = "Something to wrong"
    }
  };

  const deleteWork = async (index) => {
      // console.log(`>>>>> deleteWork click! ${index}`);
      // works.value.splice(index,1);
      error.value = ''
      const work_id = works.value[index].id;

      try{
        await axios.delete(`works/${work_id}`);
        works.value.splice(index,1);
      } catch(err){
        console.log(">> deleteWork err, ", err);
        error.value = "Something to wrong"
      }

      
  };

  

  const toggleWork = async (index, checked) => {
    console.log(">>>>>>WorkIndex.vue toggleWork checked, " , checked);
    // console.log("work completed (before)", works.value[index] );
    // works.value[index].completed = !works.value[index].completed;
    // console.log("work completed (after)", works.value[index] );
    error.value = ''
    const work_id = works.value[index].id;
    
    try{
      await axios.patch(`works/${work_id}`,{
      completed: !works.value[index].completed
    });
    works.value[index].completed = checked 
    }catch(err){
      console.log(">> toggleWork err, ", err);
      error.value = "Something to wrong"
    }
  };

  //javascript - filter(), includes()
  const filterWorks = computed(()=>{
    if(searchText.value) {
      return works.value.filter(work => {
        return work.subject.includes(searchText.value);
      })
    }
    return works.value;
  });

  // 전체 데이터 가져오기 위한 통신
  const getWorks = async () => {
    error.value = ''

    try{
      const res = await axios.get(`works`);
      works.value = res.data;
    }catch(err){
      console.log(">> getWorks err, ", err);  
      error.value = "Something to wrong"
    }
  };

  getWorks();

  


  return {
    addWork,
    works,
    deleteWork,
    toggleWork,
    searchText,
    filterWorks,
    error,
    getWorks
  }

}

}
</script>

<style>
.error{
  color:red;
}
.workstyle{
  color:green;
  text-decoration: line-through;
}
</style>
