<script setup lang="ts">
import { AllSheet0712PartyMediationDto, ShuushiDocV5YoushikiEdaIncomeConstants, ShuushiDocV5YoushikiKbnConstants, type AllSheet0712PartyMediationDtoInterface } from 'seijishikin-jp-normalize';
import { onMounted, ref, type Ref } from 'vue';
import RowV05Youshiki12 from '../row/RowV05Youshiki12.vue';
import getKingakuString from '../../../../utils/getKingakuString.ts';
import { useRoute } from 'vue-router';

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
const viewDto: Ref<AllSheet0712PartyMediationDtoInterface> = ref(new AllSheet0712PartyMediationDto());

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
    <div v-for="sheet in viewDto.allSheetKbn071201Dto.list">
        その12
        <table>
            <tbody>
                <tr>
                    <td rowspan="2">&nbsp;</td>
                    <th rowspan="2" colspan="2">(12){{ ShuushiDocV5YoushikiKbnConstants.PARTY_ASSEN_TEXT }}</th>
                    <th colspan="3">政治資金パーティの名称</th>
                    <td colspan="2">{{ sheet.partyName }}</td>
                </tr>
                <tr>
                    <th colspan="3">対価の支払いをしたもの区分</th>
                    <th colspan="2">(1){{ ShuushiDocV5YoushikiEdaIncomeConstants.PERSON_TEXT }}</th>
                </tr>
                <tr>
                    <th>行番号</th>
                    <th>対価支払いの氏名</th>
                    <th>金額</th>
                    <th>年月日</th>
                    <th>集めた期間</th>
                    <th>住所</th>
                    <th>職業</th>
                    <th>備考</th>
                    <th class="no-print">通し番号</th>
                </tr>
                <tr v-for="rowDto in sheet.list">
                    <RowV05Youshiki12 :row-dto="rowDto"></RowV05Youshiki12>
                    <!-- 
                    <td>{{ rowDto.ichirenNo }}</td>
                    <td>{{ rowDto.kifusha }}</td>
                    <td>{{ rowDto.kingaku }}</td>
                    <td>{{ rowDto.accrualDate }}</td>
                    <td>{{ rowDto.jusho }}</td>
                    <td>{{ rowDto.shokugyou }}</td>
                    <td>{{ rowDto.bikou }}</td>
                    -->
                </tr>
                <tr>
                    <td>&nbsp;</td>
                    <th>合計</th>
                    <td>{{ getKingakuString(sheet.pageTotal) }}</td>
                    <td colspan="5">&nbsp;</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<style scoped>
@import "../balancesheet_v05.css";
</style>
