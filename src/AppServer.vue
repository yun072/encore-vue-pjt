
<template>
<!-- 요구사항
#######################################################
   가상의 DB 서버 json-server
   -npm install -g json-server@0.17.0
   -root -encore.json
   -json-server --watch encore.json
   -npm install axios
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

        <div class="error">
            {{ error }}
        </div>

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
import axios from "axios";

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
        const error = ref('');
        
        //let cnt =0 ;

        const onToggle = () => {
            toggle.value = !toggle.value;
        }
        
        
        //const addWork = (work) =>{
          //  console.log(">>>>>>>>>>>>emit work , ", work)
        // works.value.push(work) ;
        //}

        const addWork = async(work) =>{
            error.value='';
            try{
            const res = await axios.post('http://localhost:3000/works',{
                id: Date.now(),
                subject : work.subject,
                completed: false

            });
                
                works.value.push(res.data) ;

            }catch(err){
                error.value="Something to wrong";

            }
                
                
                
            }
        //index-배열 인덱스, 인덱스에 해당하는 객체의 id로 삭제
        //axios.delete();
        const deleteWork= async(index)=> {
            //console.log(`deletework click ${index}`);
            error.value='';
            const work_id = works.value[index].id ;
            //works.value.splice(index,1); //삭제 개수를 입력해야 함 
            //works.value.pop(index);

            try {
                await axios.delete(`http://localhost:3000/works/${work_id}`);
                works.value.splice(index,1);               
            } catch (err) {
                console.log(">>deletework err,", err);
                error.value="Something to wrong";
                
            }

        }

        const toggleWork=async(index) => {
            //console.log("work completed ", works.value[index].completed) ;
            //works.value[index].completed = !works.value[index].completed ;
            //console.log("work completed ", works.value[index].completed) ;
            error.value='' ;

            try {
                const work_id =works.value[index].id;
                await axios.patch(`http://localhost:3000/works/${work_id}`, {
                completed : !works.value[index].completed
            });
            works.value[index].completed = !works.value[index].completed;
           }catch (err) {
                console.log(">>togglework err,", err);
                error.value="Something to wrong";
                
            }
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
        //전체 데이터 가져오기 위한 통신
        const getWorks= async() => {
            try {
                const res = await axios.delete(`http://localhost:3000/works`);
                works.value = res.data;
            } catch (err) {
                console.log(">>deletework err,", err);
                error.value="Something to wrong";
            }

        }
        ////////////////
        getWorks();
        ///////////////
         return{
            
            works,
            toggle,
            onToggle,
            deleteWork,
            addWork,
            toggleWork,
            searchText,
            filterWorks,
            error
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
