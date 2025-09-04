# ルール・指示内容
- indentは必ず2にして。4にはしないで。
- gitのcommitやpushなど危険な操作以外は、基本的にuserに質問せずに勝手に進めてください（作業の進行が止まってしまうため）
  - 2. Yes, allow always ...

## Nuxt3についての規約です
- <script>タグ -> <template>タグの順番にして
- <script>タグは、必ず lang="ts"をつけて
- Nuxt3の場合は、vueのrefなどは自動的にoimportされるので、明示的な記載をしないでください
  - `import { ref } from 'vue'`
