<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-sm-6">
                <form>
                    <div class="form-group row border-bottom">
                        <label for="id" class="col-sm-3 col-form-label">ID</label>
                        <input
                           type="text"
                           id="id"
                           class="col-sm-9 form-control-plaintext"
                           readonly
                           v-model="task.id"
                        >
                    </div>
                    <div class="form-group row border-bottom">
                        <label for="title" class="col-sm-3 col-form-label">Title</label>
                        <input
                            type="text"
                            id="title"
                            class="col-sm-9 form-control-plaintext"
                            readonly
                            v-model="task.title"
                        >
                    </div>
                    <div class="form-group row border-bottom">
                        <label for="content" class="col-sm-3 col-form-label">Content</label>
                        <input
                            type="text"
                            id="content"
                            class="col-sm-9 form-control-plaintext"
                            readonly
                            v-model="task.content"
                        >
                    </div>
                    <div class="form-group row border-bottom">
                        <label for="person-in-charge" class="col-sm-3 col-form-label">Person In Charge</label>
                        <input
                            type="text"
                            id="person-in-charge"
                            class="col-sm-9 form-control-plaintext"
                            readonly
                            v-model="task.person_in_charge"
                        >
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { pbStore } from '@/store/pb';

export default {
    props: {
        id: {
            type: String,
            required: true,
        }
    },
    setup(props, context) {
        const task = ref({});
        const pb = pbStore();

        const getTask = async () => {
            let response = await axios.get('/api/tasks/' + props.id);
            task.value = response.data.task;
            await pb.finish();
        }

        onMounted(async () => {
            await getTask();
        });

        return {
            task,
        }
    },
}
</script>
