# 使用コマンドと解説
## Rails new
```
docker compose run --rm rails rails new . --force --api --database=mysql --skip-action-cable --skip-sprockets --skip-turbolinks --skip-webpack-install --skip-test --skip-bundle
```
このコマンドは、Docker Composeを使用してRailsの新しいプロジェクトを作成するものです。各オプションの意味を詳しく説明します：

1. `docker compose run`: docker-compose.yml で設定された何らかのコンテナを起動し、そのコンテナ内で以下に続くコマンドを実行する、というコマンドです（--rmオプションは、コンテナ終了時に自動的にコンテナを削除するというオプションです）

2. `--rm`: コマンド実行後にコンテナを自動的に削除します。

3. `rails`: 実行するサービス名（Dockerfileで定義されたRailsサービス）。

4. `rails new .`: カレントディレクトリ(`.`)に新しいRailsプロジェクトを作成します。

5. `--force`: 既存のファイルがある場合、上書きします。

6. `--api`: APIモードでRailsアプリケーションを生成します（フロントエンド関連の機能を除外）。

7. `--database=mysql`: MySQLをデータベースとして使用するように設定します。

8. `--skip-action-cable`: Action Cableを除外します（リアルタイム機能）。

9. `--skip-sprockets`: アセットパイプラインを除外します。

10. `--skip-turbolinks`: Turbolinksを除外します（ページ遷移を高速化するJavaScriptライブラリ）。

11. `--skip-webpack-install`: Webpackのインストールをスキップします。

12. `--skip-test`: デフォルトのテストフレームワークを除外します。

13. `--skip-bundle`: 初期のbundle installコマンドの実行をスキップします。

このコマンドは、最小限の構成でAPIモードのRailsアプリケーションを作成します。フロントエンド関連の機能やテスト、アセット管理などを除外することで、APIとしての使用に特化したシンプルな構成となります。MySQLをデータベースとして使用し、Docker環境内で実行されるように設定されています。

## railsコンテナ内で$ bundle installを行い、gemの依存関係をGemfile.lockに記述。

```
docker compose run --rm rails bundle install
docker compose build --no-cache
docker compose up -d
```