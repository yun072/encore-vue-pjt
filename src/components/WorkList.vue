<template>
   <!-- vue v-for(반드시 기본키를 필요로 함!!!) -->
    
   <div  class="card mt-2"
         v-for="(work,index) in works"
         :key="work.id">
         <!--<router-link to=/works/1>-->
        <div class="card-body p-2 d-flex align-items-center" 
             style="cursor : pointer"
             @click="readWork(work.id)">
            <div class="form-check flex-glow-1">
                <input  type="checkbox"
                        class="form-check-input"
                        :value="work.completed"
                        @change="toggleWork(index, $event)"
                        @click.stop>

                <label  class="form-check-label work"
                        :class="{ works:work.completed }">
                    {{ work.subject }}
                </label>            
                </div>

            <!-- 삭제를 위한 버튼 추가-->
            <div>
                <button 
                class="btn btn-danger btn-sm"
                @click.stop="deleteWork(index)"> Delete</button>
            </div>
            
        </div>
    <!--</router-link>-->
    </div>

</template>

<script>
/*
props 사용시 주의점 
- One Way Data Flow(부모-> 자식 데이터 전달 x)
- 그래서 checkbox에서 completed 자식에서 변경해서는 안됨.
- 코드수정이 필요한데
- 데이터를 수정하려면 다시 부모에게 데이터 전달

*/ 
import { useRouter} from 'vue-router' ;
export default {
    props: {
        works: {
            type: Array,
            required : true
        }
    },
    emits: ["toggle-work","delete-work" ] ,
    setup(props, {emit}) {
        const toggleWork = (index) => {
            
            console.log(">> toggleWork target," , event.target);
            console.log(">> toggleWork target checked," , event.target.checked);

            console.log(">> toggleWork index,", index);
            emit("toggle-work", index, event.target.checked);
        }

        const deleteWork =(index) => {
            console.log(">>>>>deleteWork index, " , index);
            emit("delete-work", index);
        }

        const router = useRouter();
        const readWork = (work_id) =>{
            //window.alert("readWork>>>>>>id, " + work_id);
            //router.push("/works/" + work_id);
            router.push({
                name : "Work",
                params : {
                    id : work_id
                }
            });

        }
    

    return{
        toggleWork,
        deleteWork,
        readWork
    }
}
};
</script>

<style>

</style>