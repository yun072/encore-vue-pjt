
<template>
<!-- 요구사항
#######################################################
   부모 컴포넌트와 자식 컴포넌트 사이에서 데이터 전송
   -setup(props, context)
   -context.emit() => 부모에 데이터 전달
   -props => 자식에게 데이터 전달
#######################################################
     -->

   <div class="container">
    <h2>encore work list</h2>
        <!--검색 기능 추가-->
        <input type ="text"
            placeholder="Search...."
            class="form-control"
            v-model="searchText"> <!--양 방향으로 데이터 관리= v modle-->

        <hr/>
        <!-- form -> workform.vue 으로 이동-->
        <WorkFrom @add-work="addWork" />


        <!-- 페이지 로딩 시 추가되는 코드-->
        <!--<div v-if="!works.length" class="error">
                등록한 일정이 존재하지 않습니다.
        </div>
        -->

        <!-- 검색 기능 추가하는 서치 바-->
        
        <div v-if="!filterWorks.length" class="error">
            필터링 결과가 존재하지 않습니다.
        </div>


        <WorkList :works="filterWorks" 
                   @toggle-work="toggleWork"  
                   @delete-work="deleteWork"/>


    
    
   
    </div>


</template>

<script>
/*
npm i axios
import axios from 'axios' ;
axios.get();
$.ajax();
*/
import {ref, computed} from 'vue';

import WorkFrom from "./components/WorkForm.vue" ;

import WorkList from "./components/WorkList.vue" ;

export default {
    components : {
        WorkFrom,
        WorkList
    },
    setup() {
        
        const works = ref([]);
        const toggle = ref(false);
        const searchText = ref('');
        
        //let cnt =0 ;

        const onToggle = () => {
            toggle.value = !toggle.value;
        }
        
        const addWork = (work) =>{
            console.log(">>>>>>>>>>>>emit work , ", work)
            works.value.push(work) ;
        }

        const deleteWork= (index)=> {
            console.log(`deletework click ${index}`);
            works.value.splice(index,1); //삭제 개수를 입력해야 함 
            //works.value.pop(index);

        }

        const toggleWork=(index) => {
            console.log("work completed ", works.value[index].completed) ;
            works.value[index].completed = !works.value[index].completed ;
            console.log("work completed ", works.value[index].completed) ;
        }
        //javascript- filter(), includes() 
        const filterWorks = computed(()=>{
            if(searchText.value) {
                return works.value.filter(work =>{
                    return work.subject.includes(searchText.value);
                })
            }
            return works.value ;

        }); 
         return{
            
            works,
            toggle,
            onToggle,
            deleteWork,
            addWork,
            toggleWork,
            searchText,
            filterWorks
         }
}
}
</script>

<style>
     .error{
        color: red ;
     }

     .works{
        color : green ;
        text-decoration: line-through ;
     }

</style>
