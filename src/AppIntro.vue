
<template>
<!-- 요구사항
#######################################################
     -최초 페이지 로딩 시 입력된 work가 없습니다.
     -배열의 길이(length)를 체크 -v-if
#######################################################
     -카드 목록에 버튼(delete) - 이벤트 버블링 생각이 필요
     -->

   <div class="container">
    <h2>encore work list</h2>
        <!-- form -> workform.vue 으로 이동-->
        <WorkFrom/>


        <!-- 페이지 로딩 시 추가되는 코드-->
        <div v-if="!works.length" class="error">
                등록한 일정이 존재하지 않습니다.
        </div>


    <!-- vue v-for(반드시 기본키를 필요로 함!!!) -->
    
    <div class="card mt-2"
         v-for="(work,index) in works"
         :key="work.id">
        <div class="card-body p-2 d-flex align-items-center" >
            <div class="form-check flex-glow-1">
                <input  type="checkbox"
                        class="form-check-input"
                        v-model="work.completed">

                <label  class="form-check-label work"
                        :class="{ works:work.completed }">
                    {{ work.subject }}
                </label>            </div>

            <!-- 삭제를 위한 버튼 추가-->
            <div>
                <button 
                class="btn btn-danger btn-sm"
                @click="deleteWork(index)"> Delete</button>
            </div>
            
        </div>
    </div>

  </div>
</template>

<script>
/*
npm i axios
import axios from 'axios' ;
axios.get();
$.ajax();
*/
import {ref} from 'vue'
import WorkFrom from "./components/WorkForm.vue" ;
export default {
    components : {
        WorkFrom
    },
    setup() {
        const work = ref('');
        const works = ref([]);
        const toggle = ref(false);
        const hasError =ref(false);
        //let cnt =0 ;

        const onToggle = () => {
            toggle.value = !toggle.value;
        }
        const onSubmit = () =>{
            console.log(">>>>>>>>>>submit event") ;
            console.log(">>>>>>>>>", work.value) ;
            if(work.value === ''){
                hasError.value =true ;
            }else{
                
                works.value.push({
                idx: Date.now(),
                subject : work.value,
                completed: false
            
            });

            hasError.value = false ;
            work.value='';
         } 
         /*split*/
        }
        const deleteWork= (index)=> {
            console.log(`deletework click ${index}`);
            works.value.splice(index,1); //삭제 개수를 입력해야 함 
            //works.value.pop(index);

        }
         return{
            onSubmit,
            work,
            works,
            toggle,
            onToggle,
            hasError,
            deleteWork
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
