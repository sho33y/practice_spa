<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-sm-6">
                <form @submit.prevent="save">
                    <div class="form-group row">
                        <label for="id" class="col-sm-3 col-form-label">ID</label>
                        <input
                            type="text"
                            class="col-sm-9 form-control-plaintext"
                            id="id"
                            readonly
                            v-model="task.id"
                        >
                    </div>
                    <div class="form-group row">
                        <label for="title" class="col-sm-3 col-form-label">Title</label>
                        <input
                            type="text"
                            class="col-sm-9 form-control"
                            id="title"
                            v-model="task.title"
                        >
                    </div>
                    <div class="form-group row">
                        <label for="content" class="col-sm-3 col-form-label">Content</label>
                        <input
                            type="text"
                            class="col-sm-9 form-control"
                            id="content"
                            v-model="task.content"
                        >
                    </div>
                    <div class="form-group row">
                        <label for="person-in-charge" class="col-sm-3 col-form-label">Person In Charge</label>
                        <input
                            type="text"
                            class="col-sm-9 form-control"
                            id="person-in-charge"
                            v-model="task.person_in_charge"
                        >
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { pbStore } from "@/store/progress-bar";

export default {
    props: {
        id: {
            type: String,
            required: true,
        }
    },
    setup(props, context) {
        const task = ref({});
        const errors = ref({});
        const router = useRouter();
        const pb = pbStore();

        const getTask = async () => {
            let response = await axios.get('/api/tasks/' + props.id);
            task.value = response.data.task;
            await pb.finish();
        }

        const save = async () => {
            try {
                await pb.start();
                await axios.patch('/api/tasks/' + props.id, task.value);
                await router.push({name: 'tasks.index'});
            } catch (error) {
                errors.value = error.response?.data?.errors;
                await pb.finish();
            }
        }

        onMounted(async () => {
            await getTask();
        });

        return {
            task,
            save,
        }
    },
}
</script>
