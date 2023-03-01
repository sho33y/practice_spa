<template>
    <div>
        <h1>トップページ</h1>
        <router-link :to="{ name: 'posts.index' }">
            <button class="btn btn-success">投稿一覧</button>
        </router-link>
    </div>
</template>

<script>
</script>
