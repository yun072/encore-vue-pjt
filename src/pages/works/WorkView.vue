<template>
    <!--
        - 카드목록에서  선택되었을 때 해당 페이지가 로딩되고 
        - getWork() : axios 통신을 이용해서 데이터를 가져오고 
        - 데이터 출력 
        -<input type="text" 데이터 출력
        -객체 복사
        -복사된 객체의 속성을 비교하기 위해서  lodash
        -npm install lodash
    -->

    <h2>Work Read</h2>
    <div v-if ="loading"
      class="spinner-border text-secondary"
      role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
  <form v-else
        @submit.prevent="onUpdate">
    <div class="row">
      <div class="col-6">
        <div class="form-group">
          <label>Work Subject</label>
          <input type="text"
                  class="form-control"
                  v-model="work.subject" />
        </div>
      </div>
      <div class="col-6">
        <div class="form-group">
          <label>Work Status</label>
          <div>
            
            
            <button class="btn btn-success"
                    type="button"
                    :class="work.completed ? 'btn btn-success' : 'btn btn-danger'"
                    @click="toggleWorkStatus">
              {{work.completed ? 'Completed' :'Incompleted'}}
            </button>
          
          </div>
        </div>
      </div>
    </div> 
    <button class="btn btn-primary"
            :disabled="!workUpdated">Save</button>
    <button class="btn btn-outline-dark ml-2"
            @click="moveToWorkList">Cancle</button>

  </form>
  <Toast/>
</template>

<script>
import { useRoute, useRouter } from 'vue-router'; //라우터는 푸쉬를 위한 것 , 라우트는 파람값받는 것 
import { ref,computed }       from 'vue';
import axios from '@/axios';
import _     from 'lodash';

import Toast from "@/components/ToastComponent.vue" ;

export default {
  components:{
    Toast
  },
  setup() {
    const route = useRoute() ;
    const router = useRouter() ;

    console.log(route.params.id);
    
    /////////////////////////
    const loading = ref(true);
    
    ////원본
    const work = ref(null) ;
    //복사본
    const copyWork = ref(null);

    // toast 위한 변수 추가

    const showToast =ref(false);
    const toastMessage =ref('');
    const toastAlertType = ref('');

    const triggerToast = (message, type='success') => {
      showToast.value=true;
    }

    const getWork = async () => {
        try{
       const res = await axios.get(`works/${route.params.id}`);
       work.value = { ...res.data };   
        copyWork.value = { ...res.data} ;   
       loading.value = false;
        } catch(err) {
            console.log("View getWork err, " , err);
            loading.value = true;
        }
    }
    
    getWork() ;

    const moveToWorkList = () =>{
        router.push({
            name: 'Works'
        });
        
    }

    const toggleWorkStatus = () =>{
        console.log("work completed, " , work.value.completed);
        work.value.completed = !work.value.completed ;
        console.log("work completed, " , work.value.completed);
    }
    //서버 통신을 통해서 데이터 수정
    const onUpdate = async ()=>{
        //window.alert(">>>>>>click");

        try{
        const res = await axios.put(`works/${route.params.id}`, {
            subject : work.value.subject,
            completed : work.value.completed,
        });
        console.log(">>>>>>>outUpdate put res. ", res.data);
        router.push({
            name: 'Works'
        });
    } catch(err){
        console.log("update err, ", err);
        loading.value = true;
        triggerToast("Something To Wrong")
    }
        // save 버튼 누르면 리스트로 이동..?
        
    }



    
    const workUpdated = computed(() =>{
        //객체 내부의 모든 속성의 값이 일치하는지 확인
        return !_.isEqual(work.value, copyWork.value) ;

    })
    

    return {
          loading,
          work,
          copyWork,
          getWork,
          moveToWorkList,
          toggleWorkStatus,
          onUpdate,
          workUpdated,
          showToast,
          toastMessage, 
          toastAlertType,
          triggerToast

          


          
        }
  }
}
</script>

<style>

</style>