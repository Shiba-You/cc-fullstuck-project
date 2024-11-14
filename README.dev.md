# backend
migrationファイル作成
```bash
npx knex migrate:make create_pages_table
```

migrateのロールバック
```bash
npx knex migrate:rollback
```


seedファイル作成
```bash
npx knex seed:make initial_pages --timestamp-filename-prefix
```


## API定義
##### GET /api/pages
- 概要
  - 全てのpageを取得
- param
  ```json
  none
  ```
- return
  ```json
  {
    status: 200,
    pages: PageType[]
  }
  ```
- error
  - 通信エラー
    ```json
    {
      status: 500
      text: "Failed to get all pages"
    }
    ```


##### POST /api/pages
- 概要
  - pageを追加
- param
  ```json
  page: PageType
  ```
- return
  ```json
  {
    status: 201,
    id: <作成されたpageのid>
  }
  ```
- error
  - titleがない時
    ```json
    {
      status: 400
      text: "Title is required field"
    }
    ```
  - 通信エラー
    ```json
    {
      status: 500
      text: "Failed to create page"
    }
    ```

##### GET /api/pages/:id
- 概要
  - :idを持つpageを取得
- param
  ```json
  {
    id: number
  }
  ```
- return
  ```json
  {
    status: 200,
    page: PageType[]
  }
  ```
- error
  - :idのpageがない時
    ```json
    {
      status: 404
      text: "Request Page Not Found"
    }
    ```
  - 通信エラー
    ```json
    {
      status: 500
      text: "Failed to get page"
    }
    ```

##### PUT /api/pages/:id
- 概要
  - :idを持つpageを変更
- param
  ```json
  {
    page: PageType
  }
  ```
- return
  ```json
  {
    status: 200,
    page: PageType
  }
  ```
- error
  - :idのpageがない時
    ```json
    {
      status: 404
      text: "Request Page Not Found"
    }
    ```
  - id, title, createAtが空の時
    ```json
    {
      status: 400
      text: "Id, Title, createAt is required field"
    }
    ```
  - :idとbodyのidが一致しない時
    ```json
    {
      status: 400
      text: "Failed to update page"
    }
    ```
  - 通信エラー
    ```json
    {
      status: 500
      text: "Failed to update page"
    }
    ```

##### POST /api/gpt
- page.contentから画像を生成 
