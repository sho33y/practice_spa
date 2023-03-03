<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-sm-6">
                <form @submit.prevent="save">
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
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { pbStore } from "@/store/pb";

export default {
    setup(props, context) {
        const task = ref({});
        const errors = ref({});
        const router = useRouter();
        const pb = pbStore();

        const save = async () => {
            try {
                await pb.start(40);
                await axios.post('/api/tasks/create', task.value);
                await router.push({name: 'tasks.index'});
            } catch (error) {
                errors.value = error.response?.data?.errors;
                await pb.finish();
            }
        }

        return {
            task,
            save,
        }
    },
}
</script>
