
<script setup lang="ts">
definePageMeta({
  title: 'テーマテスト'
})
</script>

<template>
    <div class="p-8">
        <h1 class="text-4xl font-bold text-green-500 mb-8">テーマテストページ</h1>

        <section class="mb-12">
            <h2 class="text-2xl font-bold mb-6">基本カラーテスト</h2>
            <div class="grid grid-cols-3 gap-4">
                <div class="bg-red-500 p-4 rounded text-white text-center">
                    <div class="font-bold">Red</div>
                </div>
                <div class="bg-green-500 p-4 rounded text-white text-center">
                    <div class="font-bold">Green</div>
                </div>
                <div class="bg-blue-500 p-4 rounded text-white text-center">
                    <div class="font-bold">Blue</div>
                </div>
            </div>
        </section>

        <section class="mb-12">
            <h2 class="text-2xl font-bold mb-6">ボタンテスト</h2>
            <div class="flex flex-wrap gap-4">
                <button class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">Blue Button</button>
                <button class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">Green Button</button>
                <button class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">Red Button</button>
            </div>
        </section>

        <div class="mt-8">
            <NuxtLink to="/" class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded inline-block">
                ホームに戻る
            </NuxtLink>
        </div>
    </div>
</template>