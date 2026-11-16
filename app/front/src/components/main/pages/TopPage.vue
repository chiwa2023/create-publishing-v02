<script setup lang="ts">
import RoutePathConstants from '../../../routePathConstants';
import router from '../../../router';

function onLogin(){
    router.push(RoutePathConstants.PAGE_MENU_TEMP);
}
</script>
<template>
    <div class="container">
        <div class="login-page">
            <div class="form-container">
                <h1>政治資金関連者標準化サイト(政治資金収支報告書作成)</h1>
                <h2>ユーザログイン</h2>

                <div class="form-group">
                    <label for="email">メールアドレス</label>
                    <input type="text" id="email">
                </div>

                <div class="form-group">
                    <label for="password">パスワード</label>
                    <div class="password-wrapper">
                        <input type="password" id="password" autocomplete="off">
                    </div>
                </div>

                <div class="form-options">
                    <input type="checkbox" id="rememberMe">
                    <label for="rememberMe">ログイン情報を記憶する</label>
                </div>

                <button @click="onLogin" class="login-button">ログイン</button>

                <div class="links">
                    <RouterLink :to="RoutePathConstants.PAGE_LOGIN">新規登録ですか?</RouterLink>
                    <RouterLink :to="RoutePathConstants.PAGE_LOGIN">※パスワードを忘れたので再発行</RouterLink>
                </div>

                <div class="links">
                    <div style="text-align: left;">
                        <ul>
                            <li><a href="https://www.houjin-bangou.nta.go.jp/webapi/index.html">法人番号システム
                                    Web-API</a>を利用した独自サービスを提供しています。このサービスは、国税庁法人番号システムのWeb-API機能を利用して取得した情報をもとに作成していますが、サービスの内容は国税庁によって保証されたものではありません
                            </li>
                            <li><a
                                    href="https://www.digital.go.jp/policies/base_registry_address">アドレス・ベース・レジストリ</a>を加工して作成したデータに基づき独自サービスを提供しています。サービスの内容はデジタル庁によって保証されたものではありません
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
        </div>

    </div>


        <!-- メッセージ表示 
        <div class="overMessage" v-if="messageType !== MessageConstants.VIEW_NONE">
            <MessageView :info-level="infoLevel" :message-type="messageType" :title="MESS_PAGE_NAME" :message="message"
                :caller="caller" @send-submit="recieveSubmit">
            </MessageView>
        </div>
        -->

</template>

<style scoped>
.login-page {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 80vh;
    background-color: #f4f4f4;
}

.form-container {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 600px;
    text-align: center;
}

h1 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
}

h2 {
    font-size: 1.2rem;
    color: #666;
    margin-bottom: 2rem;
}

.form-group {
    margin-bottom: 1.5rem;
    text-align: left;
}

.form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
}

.form-group input[type="text"],
.form-group input[type="password"] {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    /* paddingを含めてwidth 100%に */
}

.password-wrapper {
    position: relative;
    display: flex;
    align-items: center;
}

.password-wrapper input {
    padding-right: 2.5rem;
    /* アイコンのスペース確保 */
}

.password-toggle-icon {
    position: absolute;
    right: 0.75rem;
    cursor: pointer;
    height: 1.35em;
}

.password-toggle-icon img {
    height: 1.35em;
    width: auto;
}


.form-options {
    display: flex;
    align-items: center;
    margin-bottom: 1.5rem;
}

.form-options input[type="checkbox"] {
    margin-right: 0.5rem;
}

.login-button {
    width: 100%;
    padding: 0.75rem;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: white;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s;
}

.login-button:hover {
    background-color: #0056b3;
}

.links {
    margin-top: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.links a {
    color: #007bff;
    text-decoration: none;
}

.links a:hover {
    text-decoration: underline;
}

/* モーダルオーバーレイ */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-dialog {
    background: #ffffff;
    padding: 2rem;
    border-radius: 8px;
    max-width: 480px;
    width: 90%;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
    text-align: center;
}

.modal-header-icon {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
}

.modal-title {
    font-size: 1.25rem;
    margin-bottom: 1rem;
    color: #333;
}

.modal-desc {
    font-size: 0.95rem;
    color: #555;
    line-height: 1.6;
    margin-bottom: 1.2rem;
    text-align: left;
}

.modal-error {
    background-color: #ffebee;
    color: #c62828;
    padding: 0.75rem;
    border-radius: 4px;
    margin-bottom: 1rem;
    font-size: 0.88rem;
    text-align: left;
}

.modal-loading {
    color: #1565c0;
    margin-bottom: 1rem;
    font-weight: bold;
    font-size: 0.92rem;
}

.prompt-checkbox {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    margin-bottom: 1.2rem;
    font-size: 0.9rem;
    color: #666;
}

.modal-buttons {
    display: flex;
    justify-content: center;
    gap: 1rem;
    flex-wrap: wrap;
}

.auth-confirm-btn {
    background-color: #2e7d32;
    color: #fff;
}

.auth-confirm-btn:hover {
    background-color: #1b5e20;
}

.prompt-register-btn {
    background-color: #007bff;
    color: #fff;
}

.prompt-register-btn:hover {
    background-color: #0056b3;
}

.prompt-skip-btn {
    background-color: #6c757d;
    color: #fff;
}

.prompt-skip-btn:hover {
    background-color: #5a6268;
}
</style>
