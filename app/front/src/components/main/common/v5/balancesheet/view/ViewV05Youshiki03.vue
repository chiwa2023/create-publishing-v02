<script setup lang="ts">
import { useRoute } from 'vue-router';
import { onMounted, ref, type Ref } from 'vue';
import { AllSheet0703JournalAndOtherDto, ShuushiDocV5YoushikiKbnConstants, type AllSheet0703JournalAndOtherDtoInterface } from 'seijishikin-jp-normalize';
import RowV05Youshiki03 from '../row/RowV05Youshiki03.vue';
import getKingakuString from '../../../../utils/getKingakuString.ts';

// よく使う定数
// const BLANK: string = "";
// const INIT_NUMBER: number = 0;
// const INIT_BOOLEAN: boolean = false;
// const SERVER_STATUS_OK: number = 200;
// const SERVER_STATUS_ERROR: number = 400;
// const SEARCH_LIMIT: number = 20;
// メッセージ表示定数
// const INQUIRE_FLG: boolean = false;
// const ERR_MESS_ONLY: boolean = true;
// const MESS_PAGE_NAME: string = "フロア郵便番号追加";
// const INIT_CALLER: string = "no branch";
// const infoLevel: Ref<number> = ref(MessageConstants.LEVEL_NONE);
// const messageType: Ref<number> = ref(MessageConstants.VIEW_NONE);
// const caller: Ref<string> = ref(INIT_CALLER);
// const message: Ref<string> = ref(BLANK);

// Paging
// const pageNumber: Ref<number> = ref(INIT_NUMBER);
// const allCount: Ref<number> = ref(INIT_NUMBER);
// const limit: Ref<number> = ref(SEARCH_LIMIT);

const route = useRoute();
const viewDto: Ref<AllSheet0703JournalAndOtherDtoInterface> = ref(new AllSheet0703JournalAndOtherDto());

// queryを適用
onMounted(() => {
    if (route.query.data) {
        try {
            // 文字列からオブジェクトに復元
            viewDto.value = JSON.parse(route.query.data as string);
        } catch (e) {
            console.error('データのパースに失敗しました', e);
        }
    }
});

</script>
<template>
    <div>
        その3
        <table>
            <tbody>
                <tr>
                    <td>&nbsp;</td>
                    <th colspan="3">(3){{ ShuushiDocV5YoushikiKbnConstants.KIKANSHI_TEXT }}</th>
                </tr>
                <tr>
                    <th>行番号</th>
                    <th>事業の種類</th>
                    <th>金額</th>
                    <th>備考</th>
                </tr>
                <!-- 行処理 -->
                <tr v-for="dto in viewDto.sheet070300JournalAndOtherDto.list">
                    <RowV05Youshiki03 :row-dto="dto"></RowV05Youshiki03>
                </tr>
                <tr>
                    <td>&nbsp;</td>
                    <th>合計</th>
                    <td>{{ getKingakuString(viewDto.sheet070300JournalAndOtherDto.pageTotal) }}</td>
                    <td>&nbsp;</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<style scoped>
@import "../balancesheet_v05.css";
</style>
