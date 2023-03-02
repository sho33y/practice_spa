<template>
    <div>
        <h1>トップページ</h1>
        <ul>
            <li>
                <router-link :to="{ name: 'tasks.index' }">
                    <button class="btn btn-success">タスク一覧</button>
                </router-link>
            </li>
            <li>
                <router-link :to="{ name: 'tasks.create' }">
                    <button class="btn btn-success">タスク登録</button>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
</script>
