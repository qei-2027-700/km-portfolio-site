---
title: "中小企業DX支援Webプラットフォーム開発"
description: "Vue.js + PHPで構成された中小企業DX支援Webプラットフォーム開発"
category: "web"
status: "in-progress"
tags: ["Vue2 / Nuxt2", "Vuetify2", "TypeScript", "PostgreSQL", "PHP", "Laravel", "Web開発"]
technologies: ["Vue2 / Nuxt2", "Vuetify2", "TypeScript", "PostgreSQL", "PHP", "Laravel", "FuelPHP"]
github: ""
demo: ""
image: "/images/ecommerce-preview.jpg"
date: "2024-02-01"
order: 2
---

# 中小企業DX支援Webプラットフォーム開発

## プロジェクト概要
Vue.js2(一部v3)とPHPを利用した、中小企業DX支援Webプラットフォームアプリケーションの開発・運用

## 主な機能
- ビジネスマッチング
- チャット
- メール配信
- 福利厚生クーポン配信
- ホームページ作成機能

## 技術的な特徴
- Vue2.6 / Nuxt2 / Vuetify2 かつ composition-apiの構成。
- PHP / FuelPHPベースのレガシー・オリジナルフレームワーク。
- 1分と5分毎にバッチが動いている。
- 主に取引顧客ごとの同構成のDB（約80個）と、それらを統括するDBの２種類存在し、その２つの間で同期処理や「逆同期」といった処理が走っている。
- 一部、マイクロサービスとしてLaravelアプリケーションが切り出されている。
- DBはPostgreSQL。triggerなどが実装されており、アプリケーションコードから処理が追いづらい。
- デプロイ先はAWS ECS

## 開発期間
- 2024年2月〜2024年7月
- 2025年3月〜現在

## 体制
- PM1名、テックリード1名、開発メンバー約9名

