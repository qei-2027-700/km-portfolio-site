# デザイン設計書

## 概要

個人紹介サイトは、NuxtContentを活用したマークダウンベースのコンテンツ管理システムを持つ、モダンなポートフォリオサイトです。ダークテーマをベースとし、深緑と茶色をアクセントカラーとした洗練されたデザインで、ITエンジニアの技術力と経験を効果的に紹介します。

## アーキテクチャ

### 技術スタック
- **フレームワーク**: Nuxt 3/4 (SSR)
- **言語**: TypeScript
- **スタイリング**: TailwindCSS + daisyUI
- **コンテンツ管理**: NuxtContent
- **ユーティリティ**: VueUse (responsive, breakpoint)
- **テスト**: Vitest
- **CI/CD**: GitHub Actions
- **デプロイ**: Vercel

### アーキテクチャ図

```mermaid
graph TB
    A[Nuxt 3 SSR] --> B[Pages Layer]
    A --> C[Components Layer]
    A --> D[Content Layer]
    
    B --> E[index.vue - トップページ]
    B --> F[[...slug].vue - 詳細ページ]
    
    C --> G[CardComponent - スキル/経験カード]
    C --> H[LayoutComponent - 共通レイアウト]
    C --> I[NavigationComponent - ナビゲーション]
    
    D --> J[NuxtContent]
    J --> K[skills/*.md - スキル詳細]
    J --> L[experiences/*.md - 経験詳細]
    J --> M[projects/*.md - プロジェクト詳細]
    
    N[TailwindCSS + daisyUI] --> C
    O[VueUse] --> C
```

## コンポーネント設計とインターフェース

### 1. レイアウトコンポーネント

#### DefaultLayout
```typescript
interface LayoutProps {
  title?: string;
  description?: string;
}
```

#### NavigationComponent
```typescript
interface NavigationItem {
  label: string;
  href: string;
  icon?: string;
}
```

### 2. コンテンツコンポーネント

#### CardComponent
```typescript
interface CardProps {
  title: string;
  description: string;
  category: 'skill' | 'experience' | 'project';
  slug: string;
  tags?: string[];
  image?: string;
  date?: string;
}
```

#### ContentRenderer
```typescript
interface ContentMeta {
  title: string;
  description: string;
  category: string;
  tags: string[];
  date: string;
  image?: string;
}
```

### 3. ページコンポーネント

#### IndexPage
- ヒーローセクション
- スキルカードグリッド
- 経験カードグリッド
- プロジェクトカードグリッド

#### DetailPage ([...slug].vue)
- コンテンツヘッダー
- マークダウンコンテンツ表示
- 関連コンテンツ

## データモデル

### コンテンツフロントマター構造

#### スキル (skills/*.md)
```yaml
---
title: "Vue/Nuxt"
description: "モダンなフロントエンド開発"
category: "frontend"
level: "advanced"
tags: ["JavaScript", "TypeScript", "Frontend"]
image: "/images/skills/vue.png"
date: "2024-01-01"
---
```

#### 経験 (experiences/*.md)
```yaml
---
title: "フロントエンドエンジニア"
company: "株式会社サンプル"
period: "2020-2024"
description: "Vueを使用したWebアプリケーション開発"
category: "work"
tags: ["Vue", "TypeScript", "AWS"]
image: "/images/experiences/company.png"
date: "2024-01-01"
---
```

#### プロジェクト (projects/*.md)
```yaml
---
title: "自社Saasサービスの運用"
description: "Nuxt.jsを使用した自社Saasサービスの運用の開発"
category: "web"
status: "completed"
tags: ["Nuxt.js", "Stripe", "PostgreSQL"]
github: "https://github.com/xxx/yyy"
demo: "https://project-demo.vercel.app"
image: "/images/projects/ecommerce.png"
date: "2024-01-01"
---
```

## カラーパレット設計

### メインカラー
```css
:root {
  /* 深緑系 */
  --color-primary: #1a4d3a;
  --color-primary-light: #2d6b4f;
  --color-primary-dark: #0f3329;
  
  /* 茶色系 */
  --color-secondary: #8b4513;
  --color-secondary-light: #a0522d;
  --color-secondary-dark: #654321;
  
  /* 黒系 */
  --color-dark: #1a1a1a;
  --color-dark-light: #2d2d2d;
  --color-dark-darker: #0d0d0d;
  
  /* 白系 */
  --color-light: #f8f9fa;
  --color-light-dark: #e9ecef;
  --color-light-darker: #dee2e6;
}
```

### TailwindCSS設定
```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1a4d3a',
          light: '#2d6b4f',
          dark: '#0f3329',
        },
        secondary: {
          DEFAULT: '#8b4513',
          light: '#a0522d',
          dark: '#654321',
        },
        dark: {
          DEFAULT: '#1a1a1a',
          light: '#2d2d2d',
          darker: '#0d0d0d',
        }
      }
    }
  }
}
```

## エラーハンドリング

### 1. コンテンツ取得エラー
- 404ページの表示
- フォールバック用のデフォルトコンテンツ
- エラーログの記録

### 2. 画像読み込みエラー
- プレースホルダー画像の表示
- 遅延読み込みの実装
- 画像最適化

### 3. ナビゲーションエラー
- 無効なルートへのリダイレクト処理
- ブレッドクラムナビゲーション

## レスポンシブデザイン戦略

### ブレークポイント設計
vueuse, tailwindcssを利用

```typescript
const breakpoints = {
  sm: '640px',   // モバイル
  md: '768px',   // タブレット
  lg: '1024px',  // デスクトップ
  xl: '1280px',  // 大画面
}
```

### レイアウト戦略
- **モバイル**: 1カラムレイアウト、スタックされたカード
- **タブレット**: 2カラムグリッド、サイドナビゲーション
- **デスクトップ**: 3-4カラムグリッド、固定ヘッダー

## テスト戦略

### 1. ユニットテスト (Vitest)
- コンポーネントの単体テスト
- ユーティリティ関数のテスト
- コンテンツパーサーのテスト

### 2. インテグレーションテスト
- ページ遷移のテスト
- コンテンツ表示のテスト
- レスポンシブ動作のテスト

## パフォーマンス最適化

### 1. 画像最適化
- WebP形式の使用
- 遅延読み込み (Lazy Loading)
- レスポンシブ画像

### 2. コード分割
- ページベースの分割
- コンポーネントの動的インポート
- ライブラリの最適化

### 3. SEO最適化
- メタタグの動的生成
- 構造化データの実装
- サイトマップの自動生成

## セキュリティ考慮事項

### 1. コンテンツセキュリティ
- マークダウンのサニタイゼーション
- XSS攻撃の防止
- CSPヘッダーの設定

### 2. デプロイセキュリティ
- 環境変数の適切な管理
- HTTPS強制
- セキュリティヘッダーの設定