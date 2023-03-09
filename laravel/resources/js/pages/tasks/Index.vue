<template>
    <div class="container">
    <table class="table table-hover">
        <thead class="thead-light">
            <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Content</th>
                <th scope="col">Person In Charge</th>
                <th scope="col">Show</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(task, index) in tasks" :key="index">
                 <th scope="row">{{ task.id }}</th>
                 <td>{{ task.title }}</td>
                 <td>{{ task.content }}</td>
                 <td>{{ task.person_in_charge }}</td>
                 <td>
                     <router-link v-bind:to="{name: 'tasks.detail', params: {id: task.id }}">
                         <button class="btn btn-primary">Show</button>
                     </router-link>
                 </td>
                 <td>
                     <router-link v-bind:to="{name: 'tasks.edit', params: {id: task.id }}">
                         <button class="btn btn-success">Edit</button>
                     </router-link>
                 </td>
                 <td>
                     <button
                         class="btn btn-danger"
                         @click="deleteTask(task.id)"
                     >
                         Delete
                     </button>
                 </td>
             </tr>
        </tbody>
    </table>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { pbStore } from '@/store/progress-bar';

export default {
    setup(props, context) {
        const tasks = ref([]);
        const pb = pbStore();

        const getTasks = async () => {
            let response = await axios.get('/api/tasks');
            tasks.value = response.data.tasks;
            await pb.finish();
        }

        const deleteTask = async (id) => {
            await pb.start(100);
            await axios.delete('/api/tasks/' + id);
            await getTasks();
            await pb.finish();
        }

        onMounted(async () => {
            await getTasks();
        });

        return {
            tasks,
            deleteTask,
        }
    },
}
</script>
