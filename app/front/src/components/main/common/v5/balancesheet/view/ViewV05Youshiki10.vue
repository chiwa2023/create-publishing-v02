<script setup lang="ts">
import { AllSheet0710SpecificPartyDto, ShuushiDocV5YoushikiKbnConstants, type AllSheet0710SpecificPartyDtoInterface } from 'seijishikin-jp-normalize';
import { onMounted, ref, type Ref } from 'vue';
import getKingakuString from '../../../../utils/getKingakuString';
import RowV05Youshiki10 from '../row/RowV05Youshiki10.vue';
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
const viewDto: Ref<AllSheet0710SpecificPartyDtoInterface> = ref(new AllSheet0710SpecificPartyDto());

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
        その10
        <table>
            <tbody>
                <tr>
                    <td>&nbsp;</td>
                    <th colspan="6">(10){{ ShuushiDocV5YoushikiKbnConstants.TOKUTEI_PARTY_TEXT }}</th>
                </tr>
                <tr>
                    <th>行番号</th>
                    <th>パーティの名称</th>
                    <th>対価の金額</th>
                    <th>支払いをしたものの数</th>
                    <th>開催年月日</th>
                    <th>開催場所</th>
                    <th>備考</th>
                </tr>
                <tr v-for="rowDto in viewDto.sheet071000SpecificPartyDto.list">
                    <RowV05Youshiki10 :row-dto="rowDto"></RowV05Youshiki10>
                    <!--
                    <td>{{ rowDto.ichirenNo }}</td>
                    <td>{{ rowDto.partyName }}</td>
                    <td>{{ rowDto.kingaku }}</td>
                    <td>{{ rowDto.shiharaisu }}</td>
                    <td>{{ rowDto.accrualDate }}</td>
                    <td>{{ rowDto.kaisaiBasho }}</td>
                    <td>{{ rowDto.bikou }}</td>
                     -->
                </tr>
                <tr>
                    <td>&nbsp;</td>
                    <th>合計</th>
                    <td>{{ getKingakuString(viewDto.sheet071000SpecificPartyDto.pageTotal) }}</td>
                    <td colspan="4">&nbsp;</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<style scoped>
@import "../balancesheet_v05.css";
</style>
